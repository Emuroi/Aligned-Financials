# Supabase Shared Workspace

Use this when more than one login should see the same Aligned Financials client data.

## Why this is needed

Supabase Auth creates a different user ID for every email address. Without workspace membership, each email gets its own empty workspace. That is why a second login can open successfully but show missing company and self-employed data.

## One-time setup

1. Open Supabase.
2. Go to SQL Editor.
3. Run the full contents of `supabase/schema.sql` again.

This adds `workspace_members`, keeps Row Level Security on, and backfills the existing owner as a workspace member.

## Add another login to the same workspace

The second user must have signed into the app at least once so they exist in `profiles`.

First find the existing workspace:

```sql
select
  w.id as workspace_id,
  w.workspace_name,
  p.email as owner_email,
  w.created_at
from public.workspaces w
join public.profiles p on p.id = w.owner_id
order by w.created_at;
```

Then add the extra user to the correct workspace:

```sql
insert into public.workspace_members (workspace_id, user_id, role)
select
  'PASTE_WORKSPACE_ID_HERE'::uuid,
  p.id,
  'staff'
from public.profiles p
where lower(p.email) = lower('svetlana@78delivery.com')
on conflict (workspace_id, user_id)
do update set role = excluded.role;
```

## Optional fixed workspace setting

To force every installed app to use one workspace, add this to the local `.env` beside the installed app or in the desktop data folder:

```text
SUPABASE_WORKSPACE_ID=PASTE_WORKSPACE_ID_HERE
```

Restart the app after changing `.env`.
