create extension if not exists "pgcrypto";

create or replace function public.aligned_shared_workspace_id()
returns uuid
language sql
immutable
as $$
  select 'b1ac0f5c-6b28-4eaa-8329-9ce844ec55b0'::uuid;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  workspace_name text not null default 'Aligned Financials Workspace',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (owner_id)
);

create table if not exists public.workspace_members (
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null default 'staff' check (role in ('owner', 'staff', 'viewer')),
  created_at timestamptz not null default timezone('utc', now()),
  primary key (workspace_id, user_id)
);

create table if not exists public.workspace_snapshots (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  schema_version integer not null default 1,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (workspace_id)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(coalesce(new.email, ''), '@', 1))
  )
  on conflict (id) do nothing;

  insert into public.workspaces (owner_id)
  values (new.id)
  on conflict (owner_id) do nothing;

  insert into public.workspace_snapshots (workspace_id)
  select id
  from public.workspaces
  where owner_id = new.id
  on conflict (workspace_id) do nothing;

  insert into public.workspace_members (workspace_id, user_id, role)
  select id, new.id, 'owner'
  from public.workspaces
  where owner_id = new.id
  on conflict (workspace_id, user_id) do nothing;

  insert into public.workspace_members (workspace_id, user_id, role)
  select
    public.aligned_shared_workspace_id(),
    new.id,
    case when lower(coalesce(new.email, '')) = 'david@sidra78.com' then 'owner' else 'staff' end
  where exists (
    select 1
    from public.workspaces
    where id = public.aligned_shared_workspace_id()
  )
  on conflict (workspace_id, user_id) do update
  set role = case
    when public.workspace_members.role = 'owner' then public.workspace_members.role
    else excluded.role
  end;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.workspace_snapshots enable row level security;

insert into public.workspace_members (workspace_id, user_id, role)
select id, owner_id, 'owner'
from public.workspaces
on conflict (workspace_id, user_id) do nothing;

insert into public.profiles (id, email, display_name)
select
  auth.users.id,
  auth.users.email,
  coalesce(auth.users.raw_user_meta_data ->> 'display_name', split_part(coalesce(auth.users.email, ''), '@', 1))
from auth.users
on conflict (id) do nothing;

insert into public.workspace_members (workspace_id, user_id, role)
select
  public.aligned_shared_workspace_id(),
  profiles.id,
  case when lower(coalesce(profiles.email, '')) = 'david@sidra78.com' then 'owner' else 'staff' end
from public.profiles
where exists (
  select 1
  from public.workspaces
  where id = public.aligned_shared_workspace_id()
)
on conflict (workspace_id, user_id) do update
set role = case
  when public.workspace_members.role = 'owner' then public.workspace_members.role
  else excluded.role
end;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "workspaces_select_own" on public.workspaces;
drop policy if exists "workspaces_select_member" on public.workspaces;
create policy "workspaces_select_member"
on public.workspaces
for select
to authenticated
using (
  auth.uid() = owner_id
  or exists (
    select 1
    from public.workspace_members
    where public.workspace_members.workspace_id = workspaces.id
      and public.workspace_members.user_id = auth.uid()
  )
);

drop policy if exists "workspaces_update_own" on public.workspaces;
drop policy if exists "workspaces_update_member" on public.workspaces;
create policy "workspaces_update_member"
on public.workspaces
for update
to authenticated
using (
  auth.uid() = owner_id
  or exists (
    select 1
    from public.workspace_members
    where public.workspace_members.workspace_id = workspaces.id
      and public.workspace_members.user_id = auth.uid()
      and public.workspace_members.role in ('owner', 'staff')
  )
)
with check (
  auth.uid() = owner_id
  or exists (
    select 1
    from public.workspace_members
    where public.workspace_members.workspace_id = workspaces.id
      and public.workspace_members.user_id = auth.uid()
      and public.workspace_members.role in ('owner', 'staff')
  )
);

drop policy if exists "workspace_members_select_own" on public.workspace_members;
create policy "workspace_members_select_own"
on public.workspace_members
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "workspace_snapshots_select_own" on public.workspace_snapshots;
drop policy if exists "workspace_snapshots_select_member" on public.workspace_snapshots;
create policy "workspace_snapshots_select_member"
on public.workspace_snapshots
for select
to authenticated
using (
  exists (
    select 1
    from public.workspace_members
    where public.workspace_members.workspace_id = workspace_snapshots.workspace_id
      and public.workspace_members.user_id = auth.uid()
  )
);

drop policy if exists "workspace_snapshots_insert_own" on public.workspace_snapshots;
drop policy if exists "workspace_snapshots_insert_member" on public.workspace_snapshots;
create policy "workspace_snapshots_insert_member"
on public.workspace_snapshots
for insert
to authenticated
with check (
  exists (
    select 1
    from public.workspace_members
    where public.workspace_members.workspace_id = workspace_snapshots.workspace_id
      and public.workspace_members.user_id = auth.uid()
      and public.workspace_members.role in ('owner', 'staff')
  )
);

drop policy if exists "workspace_snapshots_update_own" on public.workspace_snapshots;
drop policy if exists "workspace_snapshots_update_member" on public.workspace_snapshots;
create policy "workspace_snapshots_update_member"
on public.workspace_snapshots
for update
to authenticated
using (
  exists (
    select 1
    from public.workspace_members
    where public.workspace_members.workspace_id = workspace_snapshots.workspace_id
      and public.workspace_members.user_id = auth.uid()
      and public.workspace_members.role in ('owner', 'staff')
  )
)
with check (
  exists (
    select 1
    from public.workspace_members
    where public.workspace_members.workspace_id = workspace_snapshots.workspace_id
      and public.workspace_members.user_id = auth.uid()
      and public.workspace_members.role in ('owner', 'staff')
  )
);
