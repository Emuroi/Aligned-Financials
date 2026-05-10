const COMPANY_DIRECTORY_NAMES = {
  "08564152": "Urban Management Solutions Limited",
  "12011913": "Mooseberry Tech Ltd",
  "10534265": "Malja Construction Limited",
  "07726246": "A115 Limited",
  "08776214": "Aligned Financials Ltd",
  "11078138": "HCF Services Ltd",
  "09750360": "Ram Distribution Ltd",
  "11769803": "MyBabylonia Ltd",
  "09526995": "The Handbook Magazine Ltd",
  "10286464": "Ace Delivery Solutions Ltd",
  "06829418": "Chris Interiors Limited",
  "09394829": "Lozno Limited",
  "08307204": "Slavov Ltd",
  "08438306": "Emeralds BS Ltd",
  "06320286": "The Handbook UK Limited",
  "11239133": "Axiv Limited",
  "12707615": "Radi Group Limited",
  "12708357": "Stef Group Limited",
  "12883607": "Valentinom Ltd",
  "13466441": "NBNG Ltd",
  "13699791": "Automed Ltd",
  "13995186": "Denev Limited",
  "14185697": "Yellow Stone Technologies Ltd",
  "14518528": "VNS Drivers Limited",
  "14782597": "Choit Ltd",
  "15002181": "Croxio Limited",
  "15492410": "DZPRO Limited",
  "15607035": "7/8 Delivery Ltd",
  "15727305": "Nextwave Delivery Ltd",
  "15728507": "Next Day Ninja Limited",
  "15805017": "GR First Class Clean Ltd",
  "15969006": "Imperial Palace Ltd",
  "16024660": "Berk Logistics Ltd",
  "16429224": "Precision Transport Solutions Ltd",
  "16521065": "Valeri Ltd",
  "12776349": "RCKY Limited",
};

const LEGACY_PROFILES = window.LEGACY_PROFILES_PUBLIC || {};

const SELF_EMPLOYED_PEOPLE = [
  "Aleksander Borislavov Karakashev",
  "Azdha Ridvan Tahir",
  "Danail Emilov Zyumbyulev",
  "Daniel Abraha Ghebrat",
  "Desislava Vasileva Andonova",
  "Erik Bohlin",
  "Georgi Delchev Georgiev",
  "Goergi Zhelyazkov",
  "Iliyan Banchev",
  "Iliyana Krasimirova Bancheva",
  "Ivet Stefanova Kostadinova",
  "Kristian Plamenov Bonev",
  "Maria Koleva Georgieva",
  "Maya Dencheva Koleva",
  "Milena Angelova Rusinova",
  "Monika Szemraj",
  "Nadezhda Petrova",
  "Natalis Monastyrska",
  "Nikolina Nedyalkova Mitreva",
  "Penka Todorova Stancheva",
  "Pero Barbaric",
  "Petar Ivanov Georgiev",
  "Radi Hristev Dinkov",
  "Radoslav Stanchev",
  "Reni Ventsisslavova Tosheva Tsareva",
  "Stanislav Plamenov Denev",
  "Stefan Zdravkov Stoyanov",
  "Teodora Doncheva",
  "Tsvetomir Tsonev",
  "Valentin Ivanov Georgiev",
  "Veneta Stoeva Nikolova",
  "Ventsislava Mitkova Dinkova",
  "Viktorio Valentinov Slavchev",
  "Yordan Georgiev Hristov",
];

const COMPANY_STORAGE_KEY = "aligned-financials-company-records";
const PERSON_STORAGE_KEY = "aligned-financials-self-employed-records";
const CUSTOM_COMPANIES_KEY = "aligned-financials-custom-companies";
const CUSTOM_PEOPLE_KEY = "aligned-financials-custom-people";
const SETTINGS_STORAGE_KEY = "aligned-financials-settings";
const AUDIT_LOG_STORAGE_KEY = "aligned-financials-audit-log";
const SYNCED_COMPANY_SECRETS_STORAGE_KEY = "aligned-financials-synced-company-secrets";
const SYNCED_PERSON_SECRETS_STORAGE_KEY = "aligned-financials-synced-self-employed-secrets";
const SYNCED_SECRET_STORE_FORMAT = "aligned-financials-synced-secret-store-v1";
const SYNCED_SECRET_ITERATIONS = 200000;
const LEGACY_AUTH_STORAGE_KEY = "aligned-financials-auth";
const WIZARD_STEPS = ["identity", "tax", "contacts", "notes"];
const SENSITIVE_FIELD_NAMES = new Set([
  "vatRegistration",
  "utr",
  "payeReference",
  "accountOfficeReference",
  "companiesHouseCode",
  "gatewayId",
  "gatewayPassword",
  "nino",
  "password",
  "confirmPassword",
  "currentPassword",
  "newPassword",
]);
const COMPANY_SECRET_FIELDS = [
  "vatRegistration",
  "utr",
  "payeReference",
  "accountOfficeReference",
  "companiesHouseCode",
  "gatewayId",
  "gatewayPassword",
];
const PERSON_SECRET_FIELDS = [
  "utr",
  "nino",
  "gatewayId",
  "gatewayPassword",
];
const BOOKKEEPING_CATEGORIES = [
  "Needs review",
  "Sales income",
  "Other income",
  "Tax payment",
  "Payroll",
  "Rent",
  "Software",
  "Bank charges",
  "Transfer",
  "General admin expense",
];
const REVIEW_STATUS_OPTIONS = [
  "needs-review",
  "review",
  "ready",
];
const ROLE_ACCESS = {
  owner: 3,
  staff: 2,
  viewer: 1,
};

const state = {
  companies: [],
  filteredCompanies: [],
  selectedCompanyId: null,
  selectedPersonId: null,
  companyRecords: {},
  personRecords: {},
  activeCompanySecrets: {},
  activeCompanySecretsId: "",
  activePersonSecrets: {},
  activePersonSecretsId: "",
  customCompanies: [],
  customPeople: [],
  summary: null,
  authenticated: false,
  activeUser: "",
  activePassword: "",
  persistedData: {},
  lastRemoteSyncAt: "",
  offlineMode: false,
  supabaseConfigured: false,
  syncConflict: false,
  syncMessage: "",
  syncBusy: false,
  appMeta: null,
  updateState: null,
  companyWizardStep: "identity",
  personWizardStep: "identity",
  removeUpdateListener: null,
  settings: {},
  auditLog: [],
  companyFilters: {
    query: "",
    status: "all",
    bookkeeping: "all",
    archive: "active",
  },
  bankFilters: {
    search: "",
    review: "all",
    reconciled: "all",
  },
  sessionTimers: {
    autoLock: 0,
  },
};

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function bytesToBase64(bytes) {
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value || "");
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function randomBytes(length) {
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  return bytes;
}

function normalizeSecretRecord(fields, value) {
  return fields.reduce((accumulator, field) => {
    const text = String(value?.[field] || "").trim();
    if (text) accumulator[field] = text;
    return accumulator;
  }, {});
}

function isEncryptedSyncedSecretStore(value) {
  return Boolean(
    value
    && typeof value === "object"
    && value.format === SYNCED_SECRET_STORE_FORMAT
    && typeof value.salt === "string"
    && typeof value.iv === "string"
    && typeof value.content === "string",
  );
}

async function deriveSyncedSecretKey(password, saltBytes) {
  const material = await window.crypto.subtle.importKey(
    "raw",
    textEncoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: SYNCED_SECRET_ITERATIONS,
      hash: "SHA-256",
    },
    material,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"],
  );
}

async function encryptSyncedSecretStore(store, password) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = await deriveSyncedSecretKey(password, salt);
  const payload = textEncoder.encode(JSON.stringify(store || {}));
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    payload,
  );

  return {
    format: SYNCED_SECRET_STORE_FORMAT,
    updatedAt: new Date().toISOString(),
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    content: bytesToBase64(new Uint8Array(encrypted)),
  };
}

async function decryptSyncedSecretStore(envelope, password) {
  if (!isEncryptedSyncedSecretStore(envelope) || !password) return {};

  try {
    const salt = base64ToBytes(envelope.salt);
    const iv = base64ToBytes(envelope.iv);
    const content = base64ToBytes(envelope.content);
    const key = await deriveSyncedSecretKey(password, salt);
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      content,
    );
    return JSON.parse(textDecoder.decode(decrypted));
  } catch {
    return {};
  }
}

const number = new Intl.NumberFormat("en-GB");

const elements = {
  stats: document.getElementById("stats"),
  authShell: document.getElementById("authShell"),
  appShell: document.getElementById("appShell"),
  setupCard: document.getElementById("setupCard"),
  loginCard: document.getElementById("loginCard"),
  setupForm: document.getElementById("setupForm"),
  loginForm: document.getElementById("loginForm"),
  createAccessButton: document.getElementById("createAccessButton"),
  openLoginButton: document.getElementById("openLoginButton"),
  loginButton: document.getElementById("loginButton"),
  openSetupButton: document.getElementById("openSetupButton"),
  resetAccessButton: document.getElementById("resetAccessButton"),
  authMessage: document.getElementById("authMessage"),
  loginMessage: document.getElementById("loginMessage"),
  zipPath: document.getElementById("zipPath"),
  generatedAt: document.getElementById("generatedAt"),
  companySearch: document.getElementById("companySearch"),
  companyStatusFilter: document.getElementById("companyStatusFilter"),
  companyBookkeepingFilter: document.getElementById("companyBookkeepingFilter"),
  companyArchiveFilter: document.getElementById("companyArchiveFilter"),
  addCompanyButton: document.getElementById("addCompanyButton"),
  companyList: document.getElementById("companyList"),
  addSelfEmployedButton: document.getElementById("addSelfEmployedButton"),
  selfEmployedList: document.getElementById("selfEmployedList"),
  homePanel: document.getElementById("homePanel"),
  emptyState: document.getElementById("emptyState"),
  companyPanel: document.getElementById("companyPanel"),
  selfEmployedPanel: document.getElementById("selfEmployedPanel"),
  newCompanyPanel: document.getElementById("newCompanyPanel"),
  newPersonPanel: document.getElementById("newPersonPanel"),
  homeButton: document.getElementById("homeButton"),
  companiesButton: document.getElementById("companiesButton"),
  selfEmployedButton: document.getElementById("selfEmployedButton"),
  settingsButton: document.getElementById("settingsButton"),
  logoutButton: document.getElementById("logoutButton"),
  activeUser: document.getElementById("activeUser"),
  mastheadHomeButton: document.getElementById("mastheadHomeButton"),
  mastheadCompaniesButton: document.getElementById("mastheadCompaniesButton"),
  quickOpenCompanyButton: document.getElementById("quickOpenCompanyButton"),
  quickOpenSelfButton: document.getElementById("quickOpenSelfButton"),
  addCompanyForm: document.getElementById("addCompanyForm"),
  addPersonForm: document.getElementById("addPersonForm"),
  createCompanyButton: document.getElementById("createCompanyButton"),
  createPersonButton: document.getElementById("createPersonButton"),
  createCompanyState: document.getElementById("createCompanyState"),
  createPersonState: document.getElementById("createPersonState"),
  companyWizardSteps: Array.from(document.querySelectorAll("[data-company-step]")),
  companyWizardPanels: Array.from(document.querySelectorAll("[data-company-panel]")),
  companyWizardBack: document.getElementById("companyWizardBack"),
  companyWizardNext: document.getElementById("companyWizardNext"),
  personWizardSteps: Array.from(document.querySelectorAll("[data-person-step]")),
  personWizardPanels: Array.from(document.querySelectorAll("[data-person-panel]")),
  personWizardBack: document.getElementById("personWizardBack"),
  personWizardNext: document.getElementById("personWizardNext"),
  homeRouteCompanies: document.getElementById("homeRouteCompanies"),
  homeRouteSelf: document.getElementById("homeRouteSelf"),
  homeRouteImport: document.getElementById("homeRouteImport"),
  homeRouteSettings: document.getElementById("homeRouteSettings"),
  settingsPanel: document.getElementById("settingsPanel"),
  changePasswordForm: document.getElementById("changePasswordForm"),
  changePasswordButton: document.getElementById("changePasswordButton"),
  saveSecuritySettingsButton: document.getElementById("saveSecuritySettingsButton"),
  autoLockMinutes: document.getElementById("autoLockMinutes"),
  requirePasswordReveal: document.getElementById("requirePasswordReveal"),
  permissionRole: document.getElementById("permissionRole"),
  exportBackupButton: document.getElementById("exportBackupButton"),
  importBackupButton: document.getElementById("importBackupButton"),
  backupStatusText: document.getElementById("backupStatusText"),
  auditEmptyText: document.getElementById("auditEmptyText"),
  auditLogList: document.getElementById("auditLogList"),
  settingsSaveState: document.getElementById("settingsSaveState"),
  appVersionText: document.getElementById("appVersionText"),
  appPackageText: document.getElementById("appPackageText"),
  updateStatusText: document.getElementById("updateStatusText"),
  updateDetailText: document.getElementById("updateDetailText"),
  configPathText: document.getElementById("configPathText"),
  checkUpdatesButton: document.getElementById("checkUpdatesButton"),
  installUpdateButton: document.getElementById("installUpdateButton"),
  companyName: document.getElementById("companyName"),
  companyNumber: document.getElementById("companyNumber"),
  saveCompanyButton: document.getElementById("saveCompanyButton"),
  resetCompanyButton: document.getElementById("resetCompanyButton"),
  archiveCompanyButton: document.getElementById("archiveCompanyButton"),
  savePersonButton: document.getElementById("savePersonButton"),
  resetPersonButton: document.getElementById("resetPersonButton"),
  archivePersonButton: document.getElementById("archivePersonButton"),
  signalBar: document.getElementById("signalBar"),
  workflowBookkeepingStatus: document.getElementById("workflowBookkeepingStatus"),
  workflowAccountsStatus: document.getElementById("workflowAccountsStatus"),
  workflowVatCadence: document.getElementById("workflowVatCadence"),
  workflowPayrollStatus: document.getElementById("workflowPayrollStatus"),
  workflowNextVatPeriodEnd: document.getElementById("workflowNextVatPeriodEnd"),
  workflowCorporationTaxDue: document.getElementById("workflowCorporationTaxDue"),
  workflowPriority: document.getElementById("workflowPriority"),
  workflowAssignedTo: document.getElementById("workflowAssignedTo"),
  workflowNextAction: document.getElementById("workflowNextAction"),
  profileList: document.getElementById("profileList"),
  companyDetailsForm: document.getElementById("companyDetailsForm"),
  companyImportSummary: document.getElementById("companyImportSummary"),
  companyStatusSummary: document.getElementById("companyStatusSummary"),
  bankAccountLabel: document.getElementById("bankAccountLabel"),
  bankStatementFile: document.getElementById("bankStatementFile"),
  bankStatementFileName: document.getElementById("bankStatementFileName"),
  bankImportNotes: document.getElementById("bankImportNotes"),
  importBankStatementButton: document.getElementById("importBankStatementButton"),
  bankImportSummary: document.getElementById("bankImportSummary"),
  bankImportEmpty: document.getElementById("bankImportEmpty"),
  bankStatementList: document.getElementById("bankStatementList"),
  bankEntrySearch: document.getElementById("bankEntrySearch"),
  bankReviewFilter: document.getElementById("bankReviewFilter"),
  bankReconciledFilter: document.getElementById("bankReconciledFilter"),
  companyGeneralNotes: document.getElementById("companyGeneralNotes"),
  companyChartSummary: document.getElementById("companyChartSummary"),
  companyChartTableBody: document.getElementById("companyChartTableBody"),
  companyChartNotes: document.getElementById("companyChartNotes"),
  chartPresetSelect: document.getElementById("chartPresetSelect"),
  mapSalesIncome: document.getElementById("mapSalesIncome"),
  mapOtherIncome: document.getElementById("mapOtherIncome"),
  mapTaxPayment: document.getElementById("mapTaxPayment"),
  mapPayroll: document.getElementById("mapPayroll"),
  mapRent: document.getElementById("mapRent"),
  mapSoftware: document.getElementById("mapSoftware"),
  mapBankCharges: document.getElementById("mapBankCharges"),
  mapTransfer: document.getElementById("mapTransfer"),
  mapGeneralAdminExpense: document.getElementById("mapGeneralAdminExpense"),
  companyVatCards: document.getElementById("companyVatCards"),
  companyVatNotes: document.getElementById("companyVatNotes"),
  vatTreatmentSelect: document.getElementById("vatTreatmentSelect"),
  vatRateOverride: document.getElementById("vatRateOverride"),
  vatManualDueOverride: document.getElementById("vatManualDueOverride"),
  companyBalanceSummary: document.getElementById("companyBalanceSummary"),
  companyBalanceSheet: document.getElementById("companyBalanceSheet"),
  companyBalanceNotes: document.getElementById("companyBalanceNotes"),
  balanceBankClass: document.getElementById("balanceBankClass"),
  directorFundingOverride: document.getElementById("directorFundingOverride"),
  balanceExtraAssetLabel: document.getElementById("balanceExtraAssetLabel"),
  balanceExtraAssetValue: document.getElementById("balanceExtraAssetValue"),
  balanceExtraLiabilityLabel: document.getElementById("balanceExtraLiabilityLabel"),
  balanceExtraLiabilityValue: document.getElementById("balanceExtraLiabilityValue"),
  exportCompanyDetailsCsvButton: document.getElementById("exportCompanyDetailsCsvButton"),
  exportCompanyDetailsPdfButton: document.getElementById("exportCompanyDetailsPdfButton"),
  exportBankActivityCsvButton: document.getElementById("exportBankActivityCsvButton"),
  exportBankActivityPdfButton: document.getElementById("exportBankActivityPdfButton"),
  exportVatCsvButton: document.getElementById("exportVatCsvButton"),
  exportVatPdfButton: document.getElementById("exportVatPdfButton"),
  exportBalanceCsvButton: document.getElementById("exportBalanceCsvButton"),
  exportBalancePdfButton: document.getElementById("exportBalancePdfButton"),
  deadlineVatDue: document.getElementById("deadlineVatDue"),
  deadlineYearEnd: document.getElementById("deadlineYearEnd"),
  deadlineConfirmation: document.getElementById("deadlineConfirmation"),
  deadlineAccountsDue: document.getElementById("deadlineAccountsDue"),
  selfPersonName: document.getElementById("selfPersonName"),
  personDetailsForm: document.getElementById("personDetailsForm"),
  selfNotes: document.getElementById("selfNotes"),
  companySaveState: document.getElementById("companySaveState"),
  personSaveState: document.getElementById("personSaveState"),
  storageModeText: document.getElementById("storageModeText"),
  syncStatusText: document.getElementById("syncStatusText"),
  supabaseGuideText: document.getElementById("supabaseGuideText"),
  syncConflictText: document.getElementById("syncConflictText"),
  syncNowButton: document.getElementById("syncNowButton"),
  reconnectCloudButton: document.getElementById("reconnectCloudButton"),
  reloadRemoteButton: document.getElementById("reloadRemoteButton"),
  overwriteRemoteButton: document.getElementById("overwriteRemoteButton"),
  archivedCompanyEmpty: document.getElementById("archivedCompanyEmpty"),
  archivedCompanyList: document.getElementById("archivedCompanyList"),
  archivedPersonEmpty: document.getElementById("archivedPersonEmpty"),
  archivedPersonList: document.getElementById("archivedPersonList"),
  homeLinkButtons: Array.from(document.querySelectorAll(".home-link-button")),
  companyTabs: Array.from(document.querySelectorAll(".tab[data-view]")),
  companyViews: Array.from(document.querySelectorAll("#companyPanel .view-panel")),
};

function loadSavedRecords(key) {
  return structuredClone(state.persistedData[key] || {});
}

function defaultSecuritySettings() {
  return {
    autoLockMinutes: 15,
    requirePasswordReveal: false,
    permissionRole: "owner",
  };
}

function defaultAccountingOverrides() {
  return {
    chartPreset: "default",
    accountMappings: {},
    vatTreatment: "auto",
    vatRateOverride: "",
    vatManualDueOverride: "",
    balanceBankClass: "current-asset",
    directorFundingOverride: "",
    extraAssetLabel: "",
    extraAssetValue: "",
    extraLiabilityLabel: "",
    extraLiabilityValue: "",
  };
}

function normalizeSettings(settings) {
  return {
    security: {
      ...defaultSecuritySettings(),
      ...(settings?.security || {}),
    },
  };
}

function normalizeAccountingOverrides(overrides) {
  return {
    ...defaultAccountingOverrides(),
    ...(overrides || {}),
    accountMappings: {
      ...(defaultAccountingOverrides().accountMappings),
      ...(overrides?.accountMappings || {}),
    },
  };
}

function userRoleLevel() {
  return ROLE_ACCESS[state.settings?.security?.permissionRole] || ROLE_ACCESS.owner;
}

function canRevealSensitiveFields() {
  return userRoleLevel() >= ROLE_ACCESS.staff;
}

function canEditWorkspace() {
  return userRoleLevel() >= ROLE_ACCESS.staff;
}

function formatAuditChanges(changes) {
  if (!changes || !changes.length) return "No field detail recorded.";
  return changes.slice(0, 4).map((change) => `${change.label}: ${change.from} -> ${change.to}`).join(" | ");
}

function recordAuditEvent(entry) {
  state.auditLog.unshift({
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
    actor: state.activeUser || "local-user",
    ...entry,
  });
  state.auditLog = state.auditLog.slice(0, 200);
  saveRecords(AUDIT_LOG_STORAGE_KEY, state.auditLog);
  if (elements.settingsPanel && !elements.settingsPanel.classList.contains("hidden")) {
    renderAuditLog();
  }
}

function diffFields(before, after, labels) {
  return Object.entries(labels).reduce((changes, [field, label]) => {
    const from = String(before?.[field] ?? "").trim();
    const to = String(after?.[field] ?? "").trim();
    if (from !== to) {
      changes.push({ field, label, from: from || "blank", to: to || "blank" });
    }
    return changes;
  }, []);
}

function noteActivityReset() {
  window.clearTimeout(state.sessionTimers.autoLock);
  const minutes = Number(state.settings?.security?.autoLockMinutes || 0);
  if (!state.authenticated || !minutes) return;
  state.sessionTimers.autoLock = window.setTimeout(() => {
    setSaveState(elements.loginMessage, "Workspace locked after inactivity.");
    lockWorkspace();
  }, minutes * 60 * 1000);
}

function applySettingsToUi() {
  const security = normalizeSettings(state.settings).security;
  if (elements.autoLockMinutes) elements.autoLockMinutes.value = security.autoLockMinutes;
  if (elements.requirePasswordReveal) elements.requirePasswordReveal.checked = Boolean(security.requirePasswordReveal);
  if (elements.permissionRole) elements.permissionRole.value = security.permissionRole;
  const readOnly = !canEditWorkspace();
  [
    elements.saveCompanyButton,
    elements.savePersonButton,
    elements.archiveCompanyButton,
    elements.archivePersonButton,
    elements.importBankStatementButton,
    elements.createCompanyButton,
    elements.createPersonButton,
  ].forEach((button) => {
    if (button) button.disabled = readOnly;
  });
  noteActivityReset();
}

function persistSettings() {
  saveRecords(SETTINGS_STORAGE_KEY, state.settings);
  applySettingsToUi();
}

function renderAuditLog() {
  if (!elements.auditLogList || !elements.auditEmptyText) return;
  elements.auditEmptyText.textContent = state.auditLog.length ? "" : "No recent changes have been recorded yet.";
  elements.auditLogList.innerHTML = state.auditLog.slice(0, 20).map((entry) => `
    <article class="archive-item">
      <div>
        <strong>${escapeHtml(entry.title || entry.action || "Workspace change")}</strong>
        <p>${escapeHtml(formatAuditChanges(entry.changes || []))}</p>
        <span>${escapeHtml(formatDateTime(entry.at))}</span>
      </div>
    </article>
  `).join("");
}

function formatDateTime(value) {
  if (!value) return "Not synced yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB");
}

function syncStatusSummary() {
  if (!window.alignedDesktop?.isDesktop) {
    return {
      title: "Browser-only mode",
      note: "Changes stay in browser storage on this machine.",
      className: "",
    };
  }

  if (!state.supabaseConfigured) {
    return {
      title: "Local encrypted mode",
      note: "Changes save locally on this machine.",
      className: "",
    };
  }

  if (state.syncConflict) {
    return {
      title: "Sync conflict detected",
      note: state.syncMessage || "Another machine saved newer workspace data first.",
      className: "sync-warning",
    };
  }

  if (state.offlineMode) {
    return {
      title: "Offline cache active",
      note: state.syncMessage || "The encrypted local cache is open. Cloud sync will resume when sign-in can reach Supabase.",
      className: "sync-warning",
    };
  }

  return {
    title: state.lastRemoteSyncAt ? "Cloud sync active" : "Cloud sync ready",
    note: state.lastRemoteSyncAt
      ? `Auto-synced ${formatDateTime(state.lastRemoteSyncAt)}.`
      : "Signed in and ready to auto-sync on save.",
    className: "sync-ok",
  };
}

function normalizeUpdateState(payload) {
  return {
    currentVersion: state.appMeta?.version || "",
    availableVersion: "",
    downloadedVersion: "",
    status: "idle",
    message: "Updates check automatically when the installed desktop app opens.",
    percent: 0,
    checking: false,
    updateAvailable: false,
    updateDownloaded: false,
    lastCheckedAt: "",
    ...(payload || {}),
  };
}

function getUpdateStatusLabel(updater) {
  if (updater.updateDownloaded) return "Update ready to install";
  if (updater.status === "downloading") return "Downloading update";
  if (updater.status === "checking" || updater.checking) return "Checking for updates";
  if (updater.status === "up-to-date") return "Up to date";
  if (updater.status === "disabled") return "Updates unavailable in this mode";
  if (updater.status === "error") return "Update check unavailable";
  if (updater.updateAvailable) return "Update available";
  return "Ready to check for updates";
}

function isSensitiveFieldName(fieldName) {
  return SENSITIVE_FIELD_NAMES.has(String(fieldName || ""));
}

function maskSensitiveValue(value) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  if (text.length <= 4) return "Hidden";
  return `${"*".repeat(Math.max(4, text.length - 2))}${text.slice(-2)}`;
}

function getLegacyProfile(companyId) {
  return LEGACY_PROFILES[companyId] || {};
}

function getCompanySecretSnapshot(record, companyId = state.selectedCompanyId) {
  const fromState = state.activeCompanySecretsId === companyId ? state.activeCompanySecrets : {};
  return COMPANY_SECRET_FIELDS.reduce((accumulator, field) => {
    accumulator[field] = String(fromState[field] || record?.[field] || "");
    return accumulator;
  }, {});
}

function getSyncedCompanySecretsEnvelope() {
  const value = state.persistedData[SYNCED_COMPANY_SECRETS_STORAGE_KEY];
  return isEncryptedSyncedSecretStore(value) ? value : null;
}

async function readSyncedCompanySecretsStore() {
  if (!state.activePassword) return {};
  return decryptSyncedSecretStore(getSyncedCompanySecretsEnvelope(), state.activePassword);
}

async function writeSyncedCompanySecretsStore(store) {
  if (!state.activePassword) {
    return { ok: false, message: "A signed-in desktop session is required." };
  }

  state.persistedData[SYNCED_COMPANY_SECRETS_STORAGE_KEY] = await encryptSyncedSecretStore(store, state.activePassword);
  return { ok: true };
}

async function getSyncedCompanySecretRecord(companyId) {
  if (!companyId) return {};
  const store = await readSyncedCompanySecretsStore();
  return normalizeSecretRecord(COMPANY_SECRET_FIELDS, store?.[companyId]);
}

function getPersonSecretSnapshot(person, personId = state.selectedPersonId) {
  const fromState = state.activePersonSecretsId === personId ? state.activePersonSecrets : {};
  return PERSON_SECRET_FIELDS.reduce((accumulator, field) => {
    accumulator[field] = String(fromState[field] || person?.[field] || "");
    return accumulator;
  }, {});
}

function getSyncedPersonSecretsEnvelope() {
  const value = state.persistedData[SYNCED_PERSON_SECRETS_STORAGE_KEY];
  return isEncryptedSyncedSecretStore(value) ? value : null;
}

async function readSyncedPersonSecretsStore() {
  if (!state.activePassword) return {};
  return decryptSyncedSecretStore(getSyncedPersonSecretsEnvelope(), state.activePassword);
}

async function writeSyncedPersonSecretsStore(store) {
  if (!state.activePassword) {
    return { ok: false, message: "A signed-in desktop session is required." };
  }

  state.persistedData[SYNCED_PERSON_SECRETS_STORAGE_KEY] = await encryptSyncedSecretStore(store, state.activePassword);
  return { ok: true };
}

async function getSyncedPersonSecretRecord(personId) {
  if (!personId) return {};
  const store = await readSyncedPersonSecretsStore();
  return normalizeSecretRecord(PERSON_SECRET_FIELDS, store?.[personId]);
}

function refreshAboutSurface() {
  const meta = state.appMeta;
  const updater = normalizeUpdateState(state.updateState);

  if (elements.appVersionText) {
    elements.appVersionText.textContent = meta?.version
      ? `Version ${meta.version}`
      : "Version information will appear here once the desktop app is connected.";
  }

  if (elements.appPackageText) {
    elements.appPackageText.textContent = "";
  }

  if (elements.updateStatusText) {
    elements.updateStatusText.textContent = getUpdateStatusLabel(updater);
  }

  if (elements.updateDetailText) {
    elements.updateDetailText.textContent = updater.lastCheckedAt
      ? `Last checked ${formatDateTime(updater.lastCheckedAt)}`
      : "No update check has completed yet.";
  }

  if (elements.configPathText) {
    if (!window.alignedDesktop?.isDesktop) {
      elements.configPathText.textContent = "Desktop Supabase config paths are only shown in the desktop app.";
    } else if (meta?.hasExternalConfig) {
      elements.configPathText.textContent = "External Supabase config is loaded on this machine.";
    } else if (meta?.configured) {
      elements.configPathText.textContent = "Supabase config is available for this desktop build.";
    } else {
      elements.configPathText.textContent = "No external Supabase config is loaded yet. Add an .env next to the installed app or in the desktop data folder.";
    }
  }

  if (elements.checkUpdatesButton) {
    elements.checkUpdatesButton.disabled = !window.alignedDesktop?.isDesktop || updater.checking;
  }

  if (elements.installUpdateButton) {
    elements.installUpdateButton.classList.toggle("hidden", !updater.updateDownloaded);
    elements.installUpdateButton.disabled = !updater.updateDownloaded;
  }
}

function refreshSyncSurface() {
  const summary = syncStatusSummary();

  if (elements.storageModeText) {
    elements.storageModeText.textContent = !window.alignedDesktop?.isDesktop
      ? "Browser storage is active on this machine."
      : state.supabaseConfigured
        ? "Encrypted local cache with cloud sync."
        : "Encrypted local desktop file.";
  }

  if (elements.syncStatusText) {
    elements.syncStatusText.textContent = summary.note;
  }

  if (elements.supabaseGuideText) {
    elements.supabaseGuideText.textContent = state.supabaseConfigured
      ? "Changes save automatically."
      : "Saving locally on this machine.";
  }

  if (elements.syncConflictText) {
    elements.syncConflictText.textContent = state.syncConflict
      ? `${state.syncMessage} Use "Reload latest" to pull the newest saved version, or "Use this copy" only if this machine should replace it.`
      : state.lastRemoteSyncAt
        ? `Last remote sync: ${formatDateTime(state.lastRemoteSyncAt)}.`
        : "No remote sync has completed yet.";
  }

  if (elements.reconnectCloudButton) {
    elements.reconnectCloudButton.disabled =
      state.syncBusy ||
      !window.alignedDesktop?.isDesktop ||
      !state.activeUser ||
      !state.supabaseConfigured ||
      !state.offlineMode;
  }

  if (elements.reloadRemoteButton) {
    elements.reloadRemoteButton.disabled =
      state.syncBusy ||
      !window.alignedDesktop?.isDesktop ||
      !state.activeUser ||
      !state.supabaseConfigured;
  }

  if (elements.overwriteRemoteButton) {
    elements.overwriteRemoteButton.classList.toggle("hidden", !state.syncConflict);
    elements.overwriteRemoteButton.disabled = state.syncBusy || !state.syncConflict;
  }

  renderArchivedRecords();
  refreshAboutSurface();
}

function handleSyncResult(result) {
  if (!result) {
    refreshSyncSurface();
    return;
  }

  if (result.remoteUpdatedAt) {
    state.lastRemoteSyncAt = result.remoteUpdatedAt;
  }
  if (typeof result.offline === "boolean") {
    state.offlineMode = result.offline;
  }

  if (result.conflict) {
    state.syncConflict = true;
    state.syncMessage =
      result.message || "Remote workspace changed on another machine. Local backup was kept.";
  } else if (result.ok) {
    state.syncConflict = false;
    state.syncMessage = result.offline
      ? result.message || "Saved to the encrypted local cache."
      : result.source === "remote"
        ? `Synced to cloud at ${formatDateTime(result.remoteUpdatedAt)}.`
        : result.message || "";
  } else if (result.message) {
    state.syncMessage = result.message;
  }

  updateActiveUserLabel();
  refreshSyncSurface();
}

function handleUpdateState(payload) {
  state.updateState = normalizeUpdateState(payload);
  refreshAboutSurface();
}

async function hydrateDesktopMeta() {
  if (!window.alignedDesktop?.isDesktop) {
    state.appMeta = null;
    state.updateState = normalizeUpdateState();
    refreshAboutSurface();
    return;
  }

  const meta = await window.alignedDesktop.appMeta();
  state.appMeta = meta;
  state.updateState = normalizeUpdateState(meta?.updateState);
  refreshAboutSurface();
}

async function checkForUpdatesNow() {
  if (!window.alignedDesktop?.isDesktop) return;
  const result = await window.alignedDesktop.checkForUpdates();
  if (!result.ok && result.message) {
    setSaveState(elements.settingsSaveState, result.message);
  } else {
    setSaveState(elements.settingsSaveState, "Checking for updates");
  }
}

async function installDownloadedUpdate() {
  if (!window.alignedDesktop?.isDesktop) return;
  const result = await window.alignedDesktop.installUpdateNow();
  if (!result.ok && result.message) {
    setSaveState(elements.settingsSaveState, result.message);
  }
}

async function persistDesktopData(options = {}) {
  if (!window.alignedDesktop?.isDesktop || !state.activeUser || !state.activePassword) return;
  state.syncBusy = true;
  refreshSyncSurface();
  const result = await window.alignedDesktop.saveData({
    username: state.activeUser,
    password: state.activePassword,
    data: state.persistedData,
    lastKnownRemoteAt: state.lastRemoteSyncAt,
    force: Boolean(options.force),
  });
  state.syncBusy = false;
  handleSyncResult(result);
  return result;
}

function saveRecords(key, value) {
  state.persistedData[key] = structuredClone(value);
  if (window.alignedDesktop?.isDesktop && state.activeUser && state.activePassword) {
    void persistDesktopData().then((result) => {
      if (result?.conflict) {
        const message = "Remote workspace changed on another machine. Local backup was kept.";
        setSaveState(elements.settingsSaveState, message);
        setSaveState(elements.companySaveState, message);
      }
    });
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}

function loadLegacyBrowserAuth() {
  try {
    return JSON.parse(localStorage.getItem(LEGACY_AUTH_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function setAuthMessage(element, message) {
  element.textContent = message;
}

function showAuth(setupMode) {
  state.authenticated = false;
  state.activePassword = "";
  state.lastRemoteSyncAt = "";
  state.offlineMode = false;
  state.syncConflict = false;
  state.syncMessage = "";
  elements.appShell.classList.add("hidden");
  elements.authShell.classList.remove("hidden");
  elements.setupCard.classList.toggle("hidden", !setupMode);
  elements.loginCard.classList.toggle("hidden", setupMode);
  setAuthMessage(elements.authMessage, "");
  setAuthMessage(elements.loginMessage, "");
  resetSensitiveFields(elements.setupForm, "setup");
  resetSensitiveFields(elements.loginForm, "login");
  refreshSyncSurface();
}

function updateActiveUserLabel() {
  if (!state.activeUser) {
    elements.activeUser.textContent = "";
    return;
  }

  elements.activeUser.textContent = state.offlineMode
    ? `Signed in as ${state.activeUser} (offline cache)`
    : `Signed in as ${state.activeUser}`;
}

function unlockWorkspace(username) {
  state.authenticated = true;
  state.activeUser = username;
  updateActiveUserLabel();
  elements.authShell.classList.add("hidden");
  elements.appShell.classList.remove("hidden");
  if (elements.changePasswordForm) {
    elements.changePasswordForm.elements.username.value = username;
  }
  applySettingsToUi();
  refreshSyncSurface();
  showHomePanel();
}

async function openWorkspaceSession(username, password, options = {}) {
  state.activeUser = username;
  state.activePassword = password;
  state.offlineMode = Boolean(options.offline);
  state.syncConflict = false;
  state.syncMessage = options.message || "";
  await hydrateEncryptedData();
  await hydrateLegacySecrets();
  initializeRecords(window.APP_DATA);
  await migrateStoredCompanySecrets();
  await syncLocalCompanySecretsToWorkspace();
  await migrateStoredPersonSecrets();
  await syncLocalPersonSecretsToWorkspace();
  renderCompanyList();
  renderSelfEmployedList();
  unlockWorkspace(username);
}

function companyDefaults(company) {
  const legacy = getLegacyProfile(company.company_number);
  const recoveredName = COMPANY_DIRECTORY_NAMES[company.company_number] || "";
  return {
    id: company.company_number,
    displayName: legacy.displayName || recoveredName || `Company ${company.company_number}`,
    legalName: legacy.legalName || recoveredName || "",
    companyNumber: company.company_number,
    entityType: legacy.entityType || "Private limited company",
    companyStatus: legacy.companyStatus || "Not confirmed",
    registrationDate: legacy.registrationDate || "",
    registrationCountry: legacy.registrationCountry || "",
    vatRegistration: legacy.vatRegistration || "",
    vatScheme: legacy.vatScheme || "",
    utr: legacy.utr || "",
    payeReference: legacy.payeReference || "",
    accountOfficeReference: legacy.accountOfficeReference || "",
    companiesHouseCode: legacy.companiesHouseCode || "",
    gatewayId: legacy.gatewayId || "",
    gatewayPassword: legacy.gatewayPassword || "",
    bankAccount: legacy.bankAccount || "",
    address: legacy.address || "",
    industries: legacy.industries || "",
    deadlines: {
      vatDue: legacy.deadlines?.vatDue || "",
      yearEnd: legacy.deadlines?.yearEnd || "",
      confirmation: legacy.deadlines?.confirmation || "",
      accountsDue: legacy.deadlines?.accountsDue || "",
    },
    archivedAt: "",
    archivedReason: "",
    generalNotes: legacy.generalNotes || "",
    workflow: defaultWorkflow(),
    bankImports: [],
  };
}

function applyLegacyCompanyBackfill(companyId, record) {
  const legacy = getLegacyProfile(companyId);
  if (!record || !legacy) return record;

  const nextRecord = { ...record };
  const directFields = [
    "displayName",
    "legalName",
    "entityType",
    "companyStatus",
    "registrationDate",
    "registrationCountry",
    "vatRegistration",
    "vatScheme",
    "utr",
    "payeReference",
    "accountOfficeReference",
    "companiesHouseCode",
    "gatewayId",
    "gatewayPassword",
    "bankAccount",
    "address",
    "industries",
  ];

  directFields.forEach((field) => {
    if (!String(nextRecord[field] || "").trim() && String(legacy[field] || "").trim()) {
      nextRecord[field] = legacy[field];
    }
  });

  nextRecord.deadlines = {
    ...(nextRecord.deadlines || {}),
  };

  ["vatDue", "yearEnd", "confirmation", "accountsDue"].forEach((field) => {
    if (!String(nextRecord.deadlines[field] || "").trim() && String(legacy.deadlines?.[field] || "").trim()) {
      nextRecord.deadlines[field] = legacy.deadlines[field];
    }
  });

  return nextRecord;
}

function buildLegacyOnlyCompanies(existingCompanies) {
  const existingIds = new Set(existingCompanies.map((company) => company.company_number));
  return Object.entries(LEGACY_PROFILES)
    .filter(([companyNumber]) => !existingIds.has(companyNumber))
    .map(([companyNumber]) => ({
      company_number: companyNumber,
      csv_file_count: 0,
      row_count: 0,
      net_amount: 0,
      paid_in_total: 0,
      paid_out_total: 0,
      years_present: [],
      files: [],
      isCustom: true,
    }));
}

function personDefaults(fullName) {
  return {
    id: fullName,
    fullName,
    tradingName: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    archivedAt: "",
    archivedReason: "",
    notes: "",
  };
}

function customCompanyDefaults(displayName, companyNumber, note) {
  return {
    company_number: companyNumber,
    csv_file_count: 0,
    row_count: 0,
    net_amount: 0,
    paid_in_total: 0,
    paid_out_total: 0,
    years_present: [],
    files: [],
    isCustom: true,
    company_note: note || "",
    display_name: displayName,
  };
}

function getSelfEmployedPeople() {
  return [...SELF_EMPLOYED_PEOPLE, ...state.customPeople];
}

function getCompanyRecord(companyId) {
  return state.companyRecords[companyId];
}

function defaultWorkflow() {
  return {
    bookkeepingStatus: "",
    accountsStatus: "",
    vatCadence: "",
    payrollStatus: "",
    nextVatPeriodEnd: "",
    corporationTaxDue: "",
    priority: "",
    assignedTo: "",
    nextAction: "",
  };
}

function normalizeWorkflow(workflow) {
  return {
    ...defaultWorkflow(),
    ...(workflow || {}),
  };
}

function sanitizeCompanyData(company) {
  return {
    ...company,
    csv_file_count: 0,
    row_count: 0,
    net_amount: 0,
    paid_in_total: 0,
    paid_out_total: 0,
    years_present: [],
    files: [],
  };
}

function getSelectedCompany() {
  return state.companies.find((company) => company.company_number === state.selectedCompanyId) || null;
}

function getSelectedPersonRecord() {
  return state.personRecords[state.selectedPersonId] || null;
}

function normalizeArchivedState(record) {
  return {
    archivedAt: "",
    archivedReason: "",
    ...(record || {}),
  };
}

function isCompanyArchived(companyId) {
  return Boolean(state.companyRecords[companyId]?.archivedAt);
}

function isPersonArchived(personId) {
  return Boolean(state.personRecords[personId]?.archivedAt);
}

function getActiveCompanies() {
  return state.companies.filter((company) => !isCompanyArchived(company.company_number));
}

function getArchivedCompanies() {
  return state.companies.filter((company) => isCompanyArchived(company.company_number));
}

function getActiveSelfEmployedPeople() {
  return getSelfEmployedPeople().filter((personId) => !isPersonArchived(personId));
}

function getArchivedSelfEmployedPeople() {
  return getSelfEmployedPeople().filter((personId) => isPersonArchived(personId));
}

function getStatementCategoryOptions() {
  return BOOKKEEPING_CATEGORIES;
}

function getReviewStatusOptions() {
  return REVIEW_STATUS_OPTIONS;
}

function getStatementEntries(record) {
  return (record.bankImports || [])
    .flatMap((statement) => (statement.entries || []).map(hydrateStatementEntry));
}

function formatCompactDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB");
}

function getChartAccountDefinitions() {
  return {
    bank: { code: "1200", name: "Bank current account", type: "Asset", normal: "debit" },
    transfer: { code: "1280", name: "Transfer clearing", type: "Asset", normal: "debit" },
    suspense: { code: "1299", name: "Suspense / review queue", type: "Asset", normal: "debit" },
    vatControl: { code: "2201", name: "VAT control", type: "Liability", normal: "credit" },
    sales: { code: "4000", name: "Sales income", type: "Income", normal: "credit" },
    otherIncome: { code: "4900", name: "Other income", type: "Income", normal: "credit" },
    payroll: { code: "7000", name: "Payroll", type: "Expense", normal: "debit" },
    rent: { code: "7300", name: "Rent", type: "Expense", normal: "debit" },
    software: { code: "7600", name: "Software and subscriptions", type: "Expense", normal: "debit" },
    bankCharges: { code: "7900", name: "Bank charges", type: "Expense", normal: "debit" },
    adminExpense: { code: "7990", name: "General admin expense", type: "Expense", normal: "debit" },
  };
}

function getAccountMappings(record) {
  const overrides = normalizeAccountingOverrides(record?.accountingOverrides);
  const presetMappings = {
    default: {},
    conservative: {
      "Other income": "suspense",
      "Transfer": "transfer",
    },
    "cash-heavy": {
      "Other income": "sales",
      "General admin expense": "adminExpense",
    },
  };
  return {
    ...presetMappings[overrides.chartPreset || "default"],
    ...(overrides.accountMappings || {}),
  };
}

function resolveChartAccountKey(entry, record) {
  const category = String(entry.category || "").trim();
  const mapping = getAccountMappings(record)[category];
  if (mapping) return mapping;
  if (category === "Sales income") return "sales";
  if (category === "Other income") return "otherIncome";
  if (category === "Tax payment") return "vatControl";
  if (category === "Payroll") return "payroll";
  if (category === "Rent") return "rent";
  if (category === "Software") return "software";
  if (category === "Bank charges") return "bankCharges";
  if (category === "Transfer") return "transfer";
  if (category === "General admin expense") return "adminExpense";
  if (category === "Needs review") return "suspense";
  return entry.amount > 0 ? "otherIncome" : "adminExpense";
}

function postAmount(account, amount) {
  const value = Math.abs(amount);
  if (!value) return;

  if (account.normal === "debit") {
    if (amount >= 0) {
      account.debit += value;
    } else {
      account.credit += value;
    }
    account.balance = account.debit - account.credit;
    return;
  }

  if (amount >= 0) {
    account.credit += value;
  } else {
    account.debit += value;
  }
  account.balance = account.credit - account.debit;
}

function buildCompanyChart(record) {
  const definitions = getChartAccountDefinitions();
  const accounts = Object.entries(definitions).reduce((accumulator, [key, definition]) => {
    accumulator[key] = {
      ...definition,
      debit: 0,
      credit: 0,
      balance: 0,
    };
    return accumulator;
  }, {});

  getStatementEntries(record).forEach((entry) => {
    if (!entry.amount) return;
    postAmount(accounts.bank, entry.amount);
    postAmount(accounts[resolveChartAccountKey(entry, record)], entry.amount);
  });

  return Object.values(accounts)
    .filter((account) => account.debit || account.credit || account.code === "1200")
    .sort((left, right) => left.code.localeCompare(right.code));
}

function parseVatRate(vatScheme) {
  const match = String(vatScheme || "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) / 100 : null;
}

function buildVatReport(record, secrets = {}) {
  const overrides = normalizeAccountingOverrides(record?.accountingOverrides);
  const entries = getStatementEntries(record);
  const taxableSales = entries
    .filter((entry) => entry.category === "Sales income" && entry.amount > 0 && entry.reviewStatus === "ready")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const taxPayments = entries
    .filter((entry) => entry.category === "Tax payment" && entry.amount < 0 && entry.reviewStatus === "ready")
    .reduce((sum, entry) => sum + Math.abs(entry.amount), 0);
  const isRegistered = overrides.vatTreatment === "registered"
    ? true
    : overrides.vatTreatment === "not-registered"
      ? false
      : Boolean(String(secrets.vatRegistration || "").trim());
  const isFlatRate = String(record.vatScheme || "").toLowerCase().includes("flat");
  const flatRate = parseVatRate(record.vatScheme);
  const overrideRate = Number(overrides.vatRateOverride || 0);
  const workingRate = overrideRate > 0
    ? overrideRate / 100
    : isFlatRate
      ? (flatRate || 0)
      : (isRegistered ? (1 / 6) : 0);
  const estimatedVatDue = Number(overrides.vatManualDueOverride || 0) || (taxableSales * workingRate);
  const position = estimatedVatDue - taxPayments;

  return {
    isRegistered,
    isFlatRate,
    flatRate,
    taxableSales,
    taxPayments,
    estimatedVatDue,
    position,
    reconciledCount: entries.filter((entry) => entry.reconciled).length,
    reviewQueueCount: entries.filter((entry) => entry.reviewStatus !== "ready").length,
  };
}

function buildBalanceSheet(record, secrets = {}) {
  const overrides = normalizeAccountingOverrides(record?.accountingOverrides);
  const entries = getStatementEntries(record);
  const chart = buildCompanyChart(record);
  const vat = buildVatReport(record, secrets);
  const netCash = entries.reduce((sum, entry) => sum + (entry.amount || 0), 0);
  const income = chart
    .filter((account) => account.type === "Income")
    .reduce((sum, account) => sum + account.balance, 0);
  const expenses = chart
    .filter((account) => account.type === "Expense")
    .reduce((sum, account) => sum + account.balance, 0);
  const tradingResult = income - expenses;
  const currentAssets = [
    ["Bank current accounts", overrides.balanceBankClass === "current-liability" ? 0 : Math.max(netCash, 0)],
    ["VAT receivable", Math.max(vat.taxPayments - vat.estimatedVatDue, 0)],
  ];
  const currentLiabilities = [
    ["Bank overdraft", overrides.balanceBankClass === "current-liability" ? Math.max(Math.abs(netCash), 0) : Math.max(-netCash, 0)],
    ["VAT payable", Math.max(vat.estimatedVatDue - vat.taxPayments, 0)],
  ];
  if (overrides.extraAssetLabel && Number(overrides.extraAssetValue || 0)) {
    currentAssets.push([overrides.extraAssetLabel, Number(overrides.extraAssetValue || 0)]);
  }
  if (overrides.extraLiabilityLabel && Number(overrides.extraLiabilityValue || 0)) {
    currentLiabilities.push([overrides.extraLiabilityLabel, Number(overrides.extraLiabilityValue || 0)]);
  }
  const totalAssets = currentAssets.reduce((sum, [, value]) => sum + value, 0);
  const totalLiabilities = currentLiabilities.reduce((sum, [, value]) => sum + value, 0);
  const equityLines = [
    ["Current period result", tradingResult],
    ["Director / owner funding", Number(overrides.directorFundingOverride || 0) || (totalAssets - totalLiabilities - tradingResult)],
  ];
  const totalEquity = equityLines.reduce((sum, [, value]) => sum + value, 0);

  return {
    netCash,
    tradingResult,
    totalAssets,
    totalLiabilities,
    totalEquity,
    currentAssets,
    currentLiabilities,
    equityLines,
  };
}

function bindCompanyTabs() {
  elements.companyTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      elements.companyTabs.forEach((item) => item.classList.remove("active"));
      elements.companyViews.forEach((panel) => panel.classList.add("hidden"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.view).classList.remove("hidden");
    });
  });
}

function setDefaultCompanyView() {
  elements.companyTabs.forEach((tab, index) => tab.classList.toggle("active", index === 0));
  elements.companyViews.forEach((panel, index) => panel.classList.toggle("hidden", index !== 0));
}

function getActiveCompanyView() {
  return elements.companyTabs.find((tab) => tab.classList.contains("active"))?.dataset.view || "company-overview";
}

function setCompanyView(viewId) {
  elements.companyTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === viewId));
  elements.companyViews.forEach((panel) => panel.classList.toggle("hidden", panel.id !== viewId));
}

function collectCompanyFormData() {
  const formData = new FormData(elements.companyDetailsForm);
  return {
    displayName: String(formData.get("displayName") || ""),
    legalName: String(formData.get("legalName") || ""),
    companyNumber: String(formData.get("companyNumber") || ""),
    entityType: String(formData.get("entityType") || ""),
    companyStatus: String(formData.get("companyStatus") || ""),
    registrationDate: String(formData.get("registrationDate") || ""),
    registrationCountry: String(formData.get("registrationCountry") || ""),
    vatScheme: String(formData.get("vatScheme") || ""),
    bankAccount: String(formData.get("bankAccount") || ""),
    address: String(formData.get("address") || ""),
    industries: String(formData.get("industries") || ""),
    deadlines: {
      vatDue: elements.deadlineVatDue.value.trim(),
      yearEnd: elements.deadlineYearEnd.value.trim(),
      confirmation: elements.deadlineConfirmation.value.trim(),
      accountsDue: elements.deadlineAccountsDue.value.trim(),
    },
    workflow: {
      bookkeepingStatus: elements.workflowBookkeepingStatus.value.trim(),
      accountsStatus: elements.workflowAccountsStatus.value.trim(),
      vatCadence: elements.workflowVatCadence.value.trim(),
      payrollStatus: elements.workflowPayrollStatus.value.trim(),
      nextVatPeriodEnd: elements.workflowNextVatPeriodEnd.value.trim(),
      corporationTaxDue: elements.workflowCorporationTaxDue.value.trim(),
      priority: elements.workflowPriority.value.trim(),
      assignedTo: elements.workflowAssignedTo.value.trim(),
      nextAction: elements.workflowNextAction.value.trim(),
    },
    generalNotes: elements.companyGeneralNotes.value.trim(),
  };
}

function collectCompanySecretData() {
  const formData = new FormData(elements.companyDetailsForm);
  return {
    vatRegistration: String(formData.get("vatRegistration") || ""),
    utr: String(formData.get("utr") || ""),
    payeReference: String(formData.get("payeReference") || ""),
    accountOfficeReference: String(formData.get("accountOfficeReference") || ""),
    companiesHouseCode: String(formData.get("companiesHouseCode") || ""),
    gatewayId: String(formData.get("gatewayId") || ""),
    gatewayPassword: String(formData.get("gatewayPassword") || ""),
  };
}

function collectAccountingOverridesData() {
  return normalizeAccountingOverrides({
    chartPreset: elements.chartPresetSelect?.value || "default",
    accountMappings: {
      "Sales income": elements.mapSalesIncome?.value || "",
      "Other income": elements.mapOtherIncome?.value || "",
      "Tax payment": elements.mapTaxPayment?.value || "",
      Payroll: elements.mapPayroll?.value || "",
      Rent: elements.mapRent?.value || "",
      Software: elements.mapSoftware?.value || "",
      "Bank charges": elements.mapBankCharges?.value || "",
      Transfer: elements.mapTransfer?.value || "",
      "General admin expense": elements.mapGeneralAdminExpense?.value || "",
    },
    vatTreatment: elements.vatTreatmentSelect?.value || "auto",
    vatRateOverride: elements.vatRateOverride?.value || "",
    vatManualDueOverride: elements.vatManualDueOverride?.value || "",
    balanceBankClass: elements.balanceBankClass?.value || "current-asset",
    directorFundingOverride: elements.directorFundingOverride?.value || "",
    extraAssetLabel: elements.balanceExtraAssetLabel?.value || "",
    extraAssetValue: elements.balanceExtraAssetValue?.value || "",
    extraLiabilityLabel: elements.balanceExtraLiabilityLabel?.value || "",
    extraLiabilityValue: elements.balanceExtraLiabilityValue?.value || "",
  });
}

function renderAccountingOverrides(record) {
  const overrides = normalizeAccountingOverrides(record?.accountingOverrides);
  const accounts = getChartAccountDefinitions();
  const renderOptions = (selected) => Object.entries(accounts)
    .map(([key, account]) => `<option value="${escapeAttribute(key)}" ${selected === key ? "selected" : ""}>${escapeHtml(`${account.code} ${account.name}`)}</option>`)
    .join("");

  if (elements.chartPresetSelect) elements.chartPresetSelect.value = overrides.chartPreset;
  if (elements.mapSalesIncome) elements.mapSalesIncome.innerHTML = renderOptions(overrides.accountMappings["Sales income"] || "sales");
  if (elements.mapOtherIncome) elements.mapOtherIncome.innerHTML = renderOptions(overrides.accountMappings["Other income"] || "otherIncome");
  if (elements.mapTaxPayment) elements.mapTaxPayment.innerHTML = renderOptions(overrides.accountMappings["Tax payment"] || "vatControl");
  if (elements.mapPayroll) elements.mapPayroll.innerHTML = renderOptions(overrides.accountMappings.Payroll || "payroll");
  if (elements.mapRent) elements.mapRent.innerHTML = renderOptions(overrides.accountMappings.Rent || "rent");
  if (elements.mapSoftware) elements.mapSoftware.innerHTML = renderOptions(overrides.accountMappings.Software || "software");
  if (elements.mapBankCharges) elements.mapBankCharges.innerHTML = renderOptions(overrides.accountMappings["Bank charges"] || "bankCharges");
  if (elements.mapTransfer) elements.mapTransfer.innerHTML = renderOptions(overrides.accountMappings.Transfer || "transfer");
  if (elements.mapGeneralAdminExpense) elements.mapGeneralAdminExpense.innerHTML = renderOptions(overrides.accountMappings["General admin expense"] || "adminExpense");
  if (elements.vatTreatmentSelect) elements.vatTreatmentSelect.value = overrides.vatTreatment;
  if (elements.vatRateOverride) elements.vatRateOverride.value = overrides.vatRateOverride;
  if (elements.vatManualDueOverride) elements.vatManualDueOverride.value = overrides.vatManualDueOverride;
  if (elements.balanceBankClass) elements.balanceBankClass.value = overrides.balanceBankClass;
  if (elements.directorFundingOverride) elements.directorFundingOverride.value = overrides.directorFundingOverride;
  if (elements.balanceExtraAssetLabel) elements.balanceExtraAssetLabel.value = overrides.extraAssetLabel;
  if (elements.balanceExtraAssetValue) elements.balanceExtraAssetValue.value = overrides.extraAssetValue;
  if (elements.balanceExtraLiabilityLabel) elements.balanceExtraLiabilityLabel.value = overrides.extraLiabilityLabel;
  if (elements.balanceExtraLiabilityValue) elements.balanceExtraLiabilityValue.value = overrides.extraLiabilityValue;
}

function collectPersonFormData() {
  const formData = new FormData(elements.personDetailsForm);
  return {
    fullName: String(formData.get("fullName") || ""),
    tradingName: String(formData.get("tradingName") || ""),
    dateOfBirth: String(formData.get("dateOfBirth") || ""),
    nationality: String(formData.get("nationality") || ""),
    address: String(formData.get("address") || ""),
    notes: String(formData.get("notes") || ""),
  };
}

function collectPersonSecretData() {
  const formData = new FormData(elements.personDetailsForm);
  return {
    utr: String(formData.get("utr") || ""),
    nino: String(formData.get("nino") || ""),
    gatewayId: String(formData.get("gatewayId") || ""),
    gatewayPassword: String(formData.get("gatewayPassword") || ""),
  };
}

function updateCompanyRecordField(companyId, updater) {
  const current = structuredClone(state.companyRecords[companyId]);
  updater(current);
  state.companyRecords[companyId] = current;
  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
}

function renderHeader(data) {
  if (elements.generatedAt) {
    elements.generatedAt.textContent = "";
  }
  if (elements.zipPath) {
    elements.zipPath.textContent = "";
  }
}

function copyFieldValue(scope, fieldName) {
  if (!canRevealSensitiveFields()) {
    setSaveState(
      scope === "company" ? elements.companySaveState : elements.personSaveState,
      "Your current role cannot copy sensitive fields.",
    );
    return;
  }
  const form = getFormForScope(scope);
  const input = form?.elements?.[fieldName];
  const value = String(input?.value || "").trim();

  if (!value) {
    setSaveState(
      scope === "company" ? elements.companySaveState : elements.personSaveState,
      "Nothing to copy in that field",
    );
    return;
  }

  navigator.clipboard.writeText(value)
    .then(() => {
      const friendlyLabel = fieldName
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (char) => char.toUpperCase());
      setSaveState(
        scope === "company" ? elements.companySaveState : elements.personSaveState,
        `${friendlyLabel} copied`,
      );
    })
    .catch(() => {
      setSaveState(
        scope === "company" ? elements.companySaveState : elements.personSaveState,
        "Copy failed",
      );
    });
}

function confirmSensitiveReveal() {
  if (!state.settings?.security?.requirePasswordReveal) return true;
  const confirmation = window.prompt("Re-enter the workspace password to reveal this field.");
  if (confirmation === null) return false;
  return confirmation === state.activePassword;
}

function getFormForScope(scope) {
  switch (scope) {
    case "company":
      return elements.companyDetailsForm;
    case "person":
      return elements.personDetailsForm;
    case "setup":
      return elements.setupForm;
    case "login":
      return elements.loginForm;
    default:
      return null;
  }
}

function toggleSensitiveField(scope, fieldName, button) {
  if (!canRevealSensitiveFields()) {
    setSaveState(
      scope === "company" ? elements.companySaveState : elements.personSaveState,
      "Your current role cannot reveal sensitive fields.",
    );
    return;
  }
  const form = getFormForScope(scope);
  const input = form?.elements?.[fieldName];
  if (!input) return;

  const isHidden = input.type === "password";
  if (isHidden && !confirmSensitiveReveal()) {
    setSaveState(
      scope === "company" ? elements.companySaveState : elements.personSaveState,
      "Password confirmation did not match.",
    );
    return;
  }
  window.clearTimeout(input._hideTimer);
  input.type = isHidden ? "text" : "password";
  button.textContent = isHidden ? "Hide" : "Show";

  if (!input.dataset.hideBound) {
    input.addEventListener("blur", () => {
      input.type = "password";
      const revealButton = form.querySelector(`[data-reveal-field="${scope}:${fieldName}"]`);
      if (revealButton) revealButton.textContent = "Show";
    });
    input.dataset.hideBound = "true";
  }

  if (isHidden) {
    input._hideTimer = window.setTimeout(() => {
      input.type = "password";
      button.textContent = "Show";
    }, 15000);
  }
}

function resetSensitiveFields(form, scope) {
  if (!form) return;

  form.querySelectorAll(`[data-reveal-field^="${scope}:"]`).forEach((button) => {
    const [, fieldName] = String(button.dataset.revealField || "").split(":");
    const input = fieldName ? form.elements?.[fieldName] : null;
    if (!input) return;
    window.clearTimeout(input._hideTimer);
    input.type = "password";
    button.textContent = "Show";
  });
}

function updateBankStatementFileName() {
  if (!elements.bankStatementFileName) return;
  const file = elements.bankStatementFile.files?.[0];
  elements.bankStatementFileName.textContent = file ? file.name : "No file selected";
}

function hardenSensitiveInputs() {
  document.querySelectorAll('input[type="password"]').forEach((input) => {
    input.autocomplete = "off";
    input.spellcheck = false;
    input.autocapitalize = "off";
  });
}

function renderStats() {
  const activeCompanyIds = new Set(getActiveCompanies().map((company) => company.company_number));
  const activeRecords = Object.entries(state.companyRecords)
    .filter(([companyId]) => activeCompanyIds.has(companyId))
    .map(([, record]) => record);
  const bankImportCount = activeRecords.reduce(
    (total, record) => total + (record.bankImports || []).length,
    0,
  );
  const reviewQueueCount = activeRecords.reduce(
    (total, record) => total + (record.bankImports || []).reduce(
      (statementTotal, statement) => statementTotal + ((statement.summary?.reviewNeededCount) || 0),
      0,
    ),
    0,
  );
  const activeWorkflowCount = activeRecords.filter((record) =>
    normalizeWorkflow(record.workflow).nextAction || normalizeWorkflow(record.workflow).priority,
  ).length;
  const cards = [
    ["Live clients", number.format(getActiveCompanies().length), "Active company records"],
    ["Statements", number.format(bankImportCount), "Saved bank imports"],
    ["To review", number.format(reviewQueueCount), "Bank lines needing attention"],
    ["Next actions", number.format(activeWorkflowCount), "Clients with live workflow notes"],
  ];

  elements.stats.innerHTML = cards
    .map(
      ([label, value, subtext]) => `
        <article class="stat-card">
          <p class="section-kicker">${label}</p>
          <p class="stat-value">${value}</p>
          <p class="stat-subtext">${subtext}</p>
        </article>
      `,
    )
    .join("");
}

function renderCompanyList() {
  const companiesToRender = state.filteredCompanies;
  if (!companiesToRender.length) {
    elements.companyList.innerHTML = `
      <article class="note-card rail-empty">
        <h4>No live companies</h4>
        <p>Try a different search, restore an archived client in Settings, or add a new company.</p>
      </article>
    `;
    return;
  }

  elements.companyList.innerHTML = companiesToRender
    .map((company) => {
      const record = getCompanyRecord(company.company_number);
      const active = state.selectedCompanyId === company.company_number ? "active" : "";
      const bankImportCount = (record.bankImports || []).length;
      const archiveMeta = record.archivedAt
        ? `<span class="company-archive-flag">Archived ${escapeHtml(formatCompactDate(record.archivedAt))}</span>`
        : "";
      return `
        <button class="company-button ${active}" data-company="${company.company_number}">
          <strong class="company-title">${record.displayName}</strong>
          <span class="company-reference">${record.companyNumber}</span>
          <span class="company-meta">${record.companyStatus || "Client record"} | ${record.entityType || "Company"}</span>
          <span class="company-imports">${number.format(bankImportCount)} bank imports</span>
          ${archiveMeta}
        </button>
      `;
    })
    .join("");

  elements.companyList.querySelectorAll(".company-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPersonId = null;
      state.selectedCompanyId = button.dataset.company;
      renderCompanyList();
      renderSelfEmployedList();
      renderCompanyPanel();
    });
  });
}

function renderSelfEmployedList() {
  const peopleToRender = getActiveSelfEmployedPeople();
  if (!peopleToRender.length) {
    elements.selfEmployedList.innerHTML = `
      <article class="note-card rail-empty">
        <h4>No live self employed records</h4>
        <p>Restore an archived person in Settings or add a new sole trader record.</p>
      </article>
    `;
    return;
  }

  elements.selfEmployedList.innerHTML = peopleToRender
    .map((personId) => {
      const person = state.personRecords[personId];
      const active = state.selectedPersonId === personId ? "active" : "";
      return `
        <button class="company-button ${active}" data-person="${personId}">
          <strong>${person.fullName}</strong>
          <span>${person.tradingName || "Self employed record"}</span>
        </button>
      `;
    })
    .join("");

  elements.selfEmployedList.querySelectorAll(".company-button").forEach((button) => {
    button.addEventListener("click", () => {
      openPersonRecord(button.dataset.person);
    });
  });
}

function renderArchivedRecords() {
  const archivedCompanies = getArchivedCompanies();
  const archivedPeople = getArchivedSelfEmployedPeople();

  if (elements.archivedCompanyEmpty) {
    elements.archivedCompanyEmpty.textContent = archivedCompanies.length ? "" : "No archived companies.";
  }
  if (elements.archivedPersonEmpty) {
    elements.archivedPersonEmpty.textContent = archivedPeople.length ? "" : "No archived self employed records.";
  }

  if (elements.archivedCompanyList) {
    elements.archivedCompanyList.innerHTML = archivedCompanies
      .map((company) => {
        const record = getCompanyRecord(company.company_number);
        return `
          <div class="archive-row">
            <div>
              <strong>${escapeHtml(record.displayName)}</strong>
              <p>${escapeHtml(record.companyNumber)} | Archived ${escapeHtml(formatCompactDate(record.archivedAt))}</p>
            </div>
            <button class="mini-button" type="button" data-restore-company="${escapeAttribute(company.company_number)}">Restore</button>
          </div>
        `;
      })
      .join("");
    elements.archivedCompanyList.querySelectorAll("[data-restore-company]").forEach((button) => {
      button.addEventListener("click", () => {
        restoreCompanyRecord(button.dataset.restoreCompany);
      });
    });
  }

  if (elements.archivedPersonList) {
    elements.archivedPersonList.innerHTML = archivedPeople
      .map((personId) => {
        const record = state.personRecords[personId];
        return `
          <div class="archive-row">
            <div>
              <strong>${escapeHtml(record.fullName)}</strong>
              <p>${escapeHtml(record.tradingName || "Self employed record")} | Archived ${escapeHtml(formatCompactDate(record.archivedAt))}</p>
            </div>
            <button class="mini-button" type="button" data-restore-person="${escapeAttribute(personId)}">Restore</button>
          </div>
        `;
      })
      .join("");
    elements.archivedPersonList.querySelectorAll("[data-restore-person]").forEach((button) => {
      button.addEventListener("click", () => {
        restorePersonRecord(button.dataset.restorePerson);
      });
    });
  }
}

function hideAllPanels() {
  elements.homePanel.classList.add("hidden");
  elements.emptyState.classList.add("hidden");
  elements.companyPanel.classList.add("hidden");
  elements.selfEmployedPanel.classList.add("hidden");
  elements.settingsPanel.classList.add("hidden");
  elements.newCompanyPanel.classList.add("hidden");
  elements.newPersonPanel.classList.add("hidden");
}

function updatePrimaryNav(active) {
  [
    ["home", elements.homeButton],
    ["companies", elements.companiesButton],
    ["self", elements.selfEmployedButton],
    ["settings", elements.settingsButton],
  ].forEach(([key, button]) => {
    button.classList.toggle("active", key === active);
  });
}

function syncWizardUI(step, stepButtons, panels, backButton, nextButton) {
  stepButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.companyStep === step || button.dataset.personStep === step);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.companyPanel !== step && panel.dataset.personPanel !== step);
  });

  const stepIndex = WIZARD_STEPS.indexOf(step);
  if (backButton) {
    backButton.disabled = stepIndex <= 0;
    backButton.style.visibility = stepIndex <= 0 ? "hidden" : "visible";
  }
  if (nextButton) {
    const isLastStep = stepIndex >= WIZARD_STEPS.length - 1;
    nextButton.disabled = isLastStep;
    nextButton.textContent = isLastStep ? "Final step" : "Next";
  }
}

function setCompanyWizardStep(step) {
  if (!WIZARD_STEPS.includes(step)) return;
  state.companyWizardStep = step;
  syncWizardUI(
    step,
    elements.companyWizardSteps,
    elements.companyWizardPanels,
    elements.companyWizardBack,
    elements.companyWizardNext,
  );
}

function moveCompanyWizard(direction) {
  const currentIndex = WIZARD_STEPS.indexOf(state.companyWizardStep);
  const nextIndex = Math.max(0, Math.min(WIZARD_STEPS.length - 1, currentIndex + direction));
  setCompanyWizardStep(WIZARD_STEPS[nextIndex]);
}

function setPersonWizardStep(step) {
  if (!WIZARD_STEPS.includes(step)) return;
  state.personWizardStep = step;
  syncWizardUI(
    step,
    elements.personWizardSteps,
    elements.personWizardPanels,
    elements.personWizardBack,
    elements.personWizardNext,
  );
}

function movePersonWizard(direction) {
  const currentIndex = WIZARD_STEPS.indexOf(state.personWizardStep);
  const nextIndex = Math.max(0, Math.min(WIZARD_STEPS.length - 1, currentIndex + direction));
  setPersonWizardStep(WIZARD_STEPS[nextIndex]);
}

function showHomePanel() {
  hideAllPanels();
  elements.homePanel.classList.remove("hidden");
  updatePrimaryNav("home");
}

function showSettingsPanel() {
  hideAllPanels();
  elements.settingsPanel.classList.remove("hidden");
  updatePrimaryNav("settings");
  refreshSyncSurface();
  renderArchivedRecords();
  applySettingsToUi();
  renderAuditLog();
}

function showNewCompanyPanel() {
  hideAllPanels();
  elements.newCompanyPanel.classList.remove("hidden");
  setCompanyWizardStep("identity");
  updatePrimaryNav("companies");
}

function showNewPersonPanel() {
  hideAllPanels();
  elements.newPersonPanel.classList.remove("hidden");
  setPersonWizardStep("identity");
  updatePrimaryNav("self");
}

async function createLocalAccess() {
  const formData = new FormData(elements.setupForm);
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  const remember = String(formData.get("rememberLogin") || "") === "on";
  let authResult = { offline: false, offlineOnly: false };

  if (!username || !password) {
    setAuthMessage(elements.authMessage, "Enter an email address and password.");
    return;
  }

  if (password.length < 8) {
    setAuthMessage(elements.authMessage, "Use at least 8 characters for the password.");
    return;
  }

  if (password !== confirmPassword) {
    setAuthMessage(elements.authMessage, "The passwords do not match.");
    return;
  }

  if (window.alignedDesktop?.isDesktop) {
    authResult = await window.alignedDesktop.createAccess({ username, password, remember });
    if (!authResult.ok) {
      setAuthMessage(elements.authMessage, authResult.message);
      return;
    }
    if (authResult.requiresConfirmation) {
      elements.setupForm.reset();
      resetSensitiveFields(elements.setupForm, "setup");
      elements.loginForm.elements.username.value = username;
      showAuth(false);
      setAuthMessage(elements.loginMessage, authResult.message);
      return;
    }
  } else {
    localStorage.setItem(
      LEGACY_AUTH_STORAGE_KEY,
      JSON.stringify({ username, password, createdAt: new Date().toISOString() }),
    );
  }
  elements.setupForm.reset();
  resetSensitiveFields(elements.setupForm, "setup");
  setAuthMessage(elements.authMessage, "Account created. Opening workspace...");
  try {
    await openWorkspaceSession(
      username,
      password,
      {
        offline: Boolean(authResult.offline || authResult.offlineOnly),
        message: authResult.message || (state.supabaseConfigured ? "Account created and ready to save." : "Account created."),
      },
    );
  } catch (error) {
    setAuthMessage(elements.authMessage, error?.message || "Account was created, but the workspace could not be opened.");
  }
}

async function loginLocalAccess() {
  const formData = new FormData(elements.loginForm);
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const remember = String(formData.get("rememberLogin") || "") === "on";
  let authResult = { offline: false, message: "" };

  if (window.alignedDesktop?.isDesktop) {
    authResult = await window.alignedDesktop.login({ username, password, remember });
    if (!authResult.ok) {
      setAuthMessage(elements.loginMessage, authResult.message);
      return;
    }
    if (authResult.message) {
      setAuthMessage(elements.loginMessage, authResult.message);
    }
  } else {
    const authConfig = loadLegacyBrowserAuth();
    if (!authConfig) {
      showAuth(true);
      return;
    }
    if (username !== authConfig.username || password !== authConfig.password) {
      setAuthMessage(elements.loginMessage, "Incorrect username or password.");
      return;
    }
  }

  elements.loginForm.reset();
  resetSensitiveFields(elements.loginForm, "login");
  try {
    await openWorkspaceSession(username, password, authResult);
  } catch (error) {
    setAuthMessage(elements.loginMessage, error?.message || "Signed in, but the workspace could not be opened.");
  }
}

async function tryAutoLogin() {
  if (!window.alignedDesktop?.isDesktop || !window.alignedDesktop.autoLogin) return false;

  const result = await window.alignedDesktop.autoLogin();
  if (!result.ok) return false;

  try {
    setAuthMessage(elements.loginMessage, result.message || "Opened saved workspace.");
    await openWorkspaceSession(result.username, result.password, result);
    return true;
  } catch (error) {
    setAuthMessage(elements.loginMessage, error?.message || "Saved login worked, but the workspace could not be opened.");
    return false;
  }
}

function lockWorkspace() {
  state.authenticated = false;
  state.activeUser = "";
  state.activePassword = "";
  state.activeCompanySecrets = {};
  state.activeCompanySecretsId = "";
  state.activePersonSecrets = {};
  state.activePersonSecretsId = "";
  state.lastRemoteSyncAt = "";
  state.offlineMode = false;
  state.syncConflict = false;
  state.syncMessage = "";
  window.clearTimeout(state.sessionTimers.autoLock);
  elements.activeUser.textContent = "";
  elements.loginForm.reset();
  resetSensitiveFields(elements.loginForm, "login");
  showAuth(false);
}

async function resetLocalAccess() {
  if (window.alignedDesktop?.isDesktop) {
    await window.alignedDesktop.resetAccess();
  } else {
    localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
  }
  state.authenticated = false;
  state.activeUser = "";
  state.activePassword = "";
  state.activeCompanySecrets = {};
  state.activeCompanySecretsId = "";
  state.activePersonSecrets = {};
  state.activePersonSecretsId = "";
  state.lastRemoteSyncAt = "";
  state.offlineMode = false;
  state.syncConflict = false;
  state.syncMessage = "";
  state.persistedData = {};
  elements.activeUser.textContent = "";
  elements.loginForm.reset();
  elements.setupForm.reset();
  resetSensitiveFields(elements.loginForm, "login");
  resetSensitiveFields(elements.setupForm, "setup");
  showAuth(true);
}

function renderSignalBar(company, record) {
  const workflow = normalizeWorkflow(record.workflow);
  const sync = syncStatusSummary();
  const signals = [
    ["Display name", record.displayName || company.company_number, "Live saved company label"],
    ["Workspace mode", "Fresh record", "Legacy year and file history has been removed from this company workspace."],
    ["Bank imports", number.format((record.bankImports || []).length), "Fresh statement imports attached to this client"],
    ["Sync", sync.title, sync.note, sync.className],
    ["Priority", workflow.priority || "Not set", workflow.nextAction || "Add the next action for this client."],
  ];

  elements.signalBar.innerHTML = signals
    .map(
      ([title, value, note, className = ""]) => `
        <article class="signal-card ${className}">
          <p class="signal-title">${title}</p>
          <p class="signal-value">${escapeHtml(value)}</p>
          <p class="signal-note">${escapeHtml(note)}</p>
        </article>
      `,
    )
    .join("");
}

function renderCompanyOverview(company, record) {
  const workflow = normalizeWorkflow(record.workflow);
  elements.profileList.innerHTML = [
    ["Display name", record.displayName || ""],
    ["Legal name", record.legalName || ""],
    ["Company number", record.companyNumber || ""],
    ["Company status", record.companyStatus || "Not confirmed"],
    ["VAT scheme", record.vatScheme || "Not set"],
    ["Record mode", "Fresh operating record"],
    ["Bank imports", number.format((record.bankImports || []).length)],
    ["Bookkeeping", workflow.bookkeepingStatus || "Not set"],
    ["Accounts", workflow.accountsStatus || "Not set"],
    ["Record type", company.isCustom ? "Manually added client" : "Recovered client profile"],
  ]
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join("");

  elements.deadlineVatDue.value = record.deadlines.vatDue;
  elements.deadlineYearEnd.value = record.deadlines.yearEnd;
  elements.deadlineConfirmation.value = record.deadlines.confirmation;
  elements.deadlineAccountsDue.value = record.deadlines.accountsDue;
  elements.workflowBookkeepingStatus.value = workflow.bookkeepingStatus;
  elements.workflowAccountsStatus.value = workflow.accountsStatus;
  elements.workflowVatCadence.value = workflow.vatCadence;
  elements.workflowPayrollStatus.value = workflow.payrollStatus;
  elements.workflowNextVatPeriodEnd.value = workflow.nextVatPeriodEnd;
  elements.workflowCorporationTaxDue.value = workflow.corporationTaxDue;
  elements.workflowPriority.value = workflow.priority;
  elements.workflowAssignedTo.value = workflow.assignedTo;
  elements.workflowNextAction.value = workflow.nextAction;
}

function renderCompanyDetails(company, record) {
  const workflow = normalizeWorkflow(record.workflow);
  const latestImport = (record.bankImports || [])[0] || null;
  const activeSecrets = state.activeCompanySecretsId === company.company_number ? state.activeCompanySecrets : {};
  elements.companyDetailsForm.elements.displayName.value = record.displayName;
  elements.companyDetailsForm.elements.legalName.value = record.legalName;
  elements.companyDetailsForm.elements.companyNumber.value = record.companyNumber;
  elements.companyDetailsForm.elements.entityType.value = record.entityType;
  elements.companyDetailsForm.elements.companyStatus.value = record.companyStatus;
  elements.companyDetailsForm.elements.registrationDate.value = record.registrationDate;
  elements.companyDetailsForm.elements.registrationCountry.value = record.registrationCountry;
  elements.companyDetailsForm.elements.vatRegistration.value = activeSecrets.vatRegistration || "";
  elements.companyDetailsForm.elements.vatScheme.value = record.vatScheme;
  elements.companyDetailsForm.elements.utr.value = activeSecrets.utr || "";
  elements.companyDetailsForm.elements.payeReference.value = activeSecrets.payeReference || "";
  elements.companyDetailsForm.elements.accountOfficeReference.value = activeSecrets.accountOfficeReference || "";
  elements.companyDetailsForm.elements.companiesHouseCode.value = activeSecrets.companiesHouseCode || "";
  elements.companyDetailsForm.elements.gatewayId.value = activeSecrets.gatewayId || "";
  elements.companyDetailsForm.elements.gatewayPassword.value = activeSecrets.gatewayPassword || "";
  elements.companyDetailsForm.elements.bankAccount.value = record.bankAccount;
  elements.companyDetailsForm.elements.address.value = record.address;
  elements.companyDetailsForm.elements.industries.value = record.industries;
  resetSensitiveFields(elements.companyDetailsForm, "company");

  elements.companyImportSummary.textContent =
    latestImport
      ? `Latest bank import: ${latestImport.fileName} on ${new Date(latestImport.importedAt).toLocaleString("en-GB")}.`
      : "No bank imports yet for this company. Add a statement to start building the working file.";
  elements.companyStatusSummary.textContent =
    `${record.archivedAt ? `This company is archived from the live desk since ${formatCompactDate(record.archivedAt)}. ` : "This company record is live and editable. "}${state.supabaseConfigured ? "The encrypted local cache stays in sync with the cloud workspace when available." : "The encrypted local cache is the current working store."} Bookkeeping is ${workflow.bookkeepingStatus || "not set"}, accounts are ${workflow.accountsStatus || "not set"}, and the next action is ${workflow.nextAction || "still to be defined"}.`;
  if (elements.archiveCompanyButton) {
    elements.archiveCompanyButton.textContent = record.archivedAt ? "Restore company" : "Archive company";
  }
}

function renderCompanyNotes(record) {
  elements.companyGeneralNotes.value = record.generalNotes;
}

function renderCompanyChart(record) {
  const accounts = buildCompanyChart(record);
  const reviewQueue = getStatementEntries(record).filter((entry) => entry.reviewStatus !== "ready").length;
  renderAccountingOverrides(record);

  elements.companyChartSummary.textContent = accounts.length > 1
    ? `Working postings built from imported bank activity. ${number.format(reviewQueue)} entries still sit outside a clean bookkeeping finish.`
    : "No accounting activity yet. Import a bank statement to start building the ledger view.";
  elements.companyChartTableBody.innerHTML = accounts
    .map((account) => `
      <tr>
        <td>${escapeHtml(account.code)}</td>
        <td>${escapeHtml(account.name)}</td>
        <td>${escapeHtml(account.type)}</td>
        <td>${formatCurrency(account.debit)}</td>
        <td>${formatCurrency(account.credit)}</td>
        <td class="${amountClass(account.balance)}">${formatCurrency(account.balance)}</td>
      </tr>
    `)
    .join("");
  elements.companyChartNotes.innerHTML = `
    <article class="note-card">
      <h4>How this is built</h4>
      <p>The chart is generated from imported statement lines, saved category edits, and a working bank control line for the selected company.</p>
    </article>
    <article class="note-card">
      <h4>What still needs review</h4>
      <p>${reviewQueue ? `${number.format(reviewQueue)} imported entries are still in review or suspense.` : "The imported lines currently map cleanly into the working chart."}</p>
    </article>
    <article class="note-card">
      <h4>Mapping mode</h4>
      <p>${escapeHtml(normalizeAccountingOverrides(record.accountingOverrides).chartPreset)} mapping is active for this company.</p>
    </article>
  `;
}

function renderVatReport(record) {
  const secrets = getCompanySecretSnapshot(record);
  const vat = buildVatReport(record, secrets);
  const effectiveRate = vat.isFlatRate
    ? `${((vat.flatRate || 0) * 100).toFixed(2)}% flat rate`
    : vat.isRegistered
      ? "Standard-rate estimate"
      : "Not VAT registered";
  const cards = [
    ["VAT registration", secrets.vatRegistration || "Not set", "Registration number on file"],
    ["Scheme", record.vatScheme || "Not set", "Current VAT method"],
    ["Next period end", normalizeWorkflow(record.workflow).nextVatPeriodEnd || "Not set", "Workflow planning field"],
    ["Due before", record.deadlines.vatDue || "Not set", "Deadline in the compliance timeline"],
    ["Imported taxable sales", formatCurrency(vat.taxableSales), "Money-in lines mapped to sales income"],
    ["Working VAT due", formatCurrency(vat.estimatedVatDue), effectiveRate],
    ["VAT payments found", formatCurrency(vat.taxPayments), "HMRC and VAT-tagged payments in imported activity"],
    ["Estimated position", formatCurrency(vat.position), vat.position > 0 ? "Still due" : vat.position < 0 ? "Paid ahead" : "Currently even"],
    ["Reconciled lines", number.format(vat.reconciledCount), "Imported entries marked as matched"],
    ["Review queue", number.format(vat.reviewQueueCount), "Imported entries still not marked ready"],
  ];

  elements.companyVatCards.innerHTML = cards
    .map(([label, value, subtext]) => `
      <article class="metric-card">
        <p class="metric-label">${escapeHtml(label)}</p>
        <p class="metric-value">${escapeHtml(value)}</p>
        <p class="metric-subtext">${escapeHtml(subtext)}</p>
      </article>
    `)
    .join("");
  elements.companyVatNotes.innerHTML = `
    <article class="note-card">
      <h4>Working estimate</h4>
      <p>This VAT view is generated from imported bank activity and the saved VAT scheme. It is a bookkeeping guide, not a filing-ready return.</p>
    </article>
    <article class="note-card">
      <h4>Suggested next step</h4>
      <p>${vat.taxableSales ? "Review the sales lines, mark matched entries as reconciled, and confirm VAT payments before using this figure in any submission work." : "Import or categorise statement activity to build the VAT position."}</p>
    </article>
    <article class="note-card">
      <h4>Override mode</h4>
      <p>${escapeHtml(normalizeAccountingOverrides(record.accountingOverrides).vatTreatment === "auto" ? "Using saved company defaults." : "VAT treatment is being overridden for this working report.")}</p>
    </article>
  `;
}

function renderBalanceSheet(record) {
  const sheet = buildBalanceSheet(record, getCompanySecretSnapshot(record));
  const renderLines = (lines, emptyLabel) => lines
    .filter(([, value]) => value)
    .map(([label, value]) => `<div class="balance-line"><dt>${escapeHtml(label)}</dt><dd class="${amountClass(value)}">${formatCurrency(value)}</dd></div>`)
    .join("") || `<div class="balance-line"><dt>${escapeHtml(emptyLabel)}</dt><dd>${formatCurrency(0)}</dd></div>`;

  elements.companyBalanceSummary.textContent = sheet.totalAssets || sheet.totalLiabilities || sheet.totalEquity
    ? "Working balance sheet generated from imported cash movement, VAT position, and categorised bookkeeping lines."
    : "No balance sheet movement yet. Import statements to start building the position.";
  elements.companyBalanceSheet.innerHTML = `
    <article class="note-card balance-card">
      <h4>Current assets</h4>
      <dl>${renderLines(sheet.currentAssets, "No current assets yet")}</dl>
      <div class="balance-total"><span>Total assets</span><strong>${formatCurrency(sheet.totalAssets)}</strong></div>
    </article>
    <article class="note-card balance-card">
      <h4>Current liabilities</h4>
      <dl>${renderLines(sheet.currentLiabilities, "No current liabilities yet")}</dl>
      <div class="balance-total"><span>Total liabilities</span><strong>${formatCurrency(sheet.totalLiabilities)}</strong></div>
    </article>
    <article class="note-card balance-card">
      <h4>Equity</h4>
      <dl>${renderLines(sheet.equityLines, "No equity movement yet")}</dl>
      <div class="balance-total"><span>Total equity</span><strong>${formatCurrency(sheet.totalEquity)}</strong></div>
    </article>
  `;
  elements.companyBalanceNotes.innerHTML = `
    <article class="note-card">
      <h4>Current period result</h4>
      <p>${sheet.tradingResult ? `Imported trading activity currently shows ${formatCurrency(sheet.tradingResult)} for the period.` : "There is no categorised trading result yet for this company."}</p>
    </article>
    <article class="note-card">
      <h4>Balance sheet scope</h4>
      <p>This is a working balance sheet from imported bank movements only. It does not yet include debtors, creditors, fixed assets, or journals outside the workspace.</p>
    </article>
    <article class="note-card">
      <h4>Override mode</h4>
      <p>${escapeHtml(normalizeAccountingOverrides(record.accountingOverrides).directorFundingOverride ? "A director funding override is applied." : "No manual balance sheet override is currently applied.")}</p>
    </article>
  `;
}

function renderBankImportSummary(record) {
  const imports = record.bankImports || [];
  const entries = imports.flatMap((statement) => (statement.entries || []).map(hydrateStatementEntry));
  const moneyIn = entries.reduce((sum, entry) => sum + (entry.moneyIn || 0), 0);
  const moneyOut = entries.reduce((sum, entry) => sum + (entry.moneyOut || 0), 0);
  const reviewNeeded = entries.filter((entry) => entry.reviewStatus !== "ready").length;
  const reconciled = entries.filter((entry) => entry.reconciled).length;
  const cards = [
    ["Statements", number.format(imports.length), "Imported CSV files for this company"],
    ["Rows", number.format(entries.length), "Normalized statement lines saved locally"],
    ["Money in", formatCurrency(moneyIn), "Positive or credit values detected"],
    ["Money out", formatCurrency(moneyOut), "Negative or debit values detected"],
    ["Review queue", number.format(reviewNeeded), "Entries that still need manual categorisation or checking"],
    ["Categorised", number.format(entries.length - reviewNeeded), "Entries with a suggested or confirmed bookkeeping category"],
    ["Reconciled", number.format(reconciled), "Entries marked as matched against the working file"],
  ];

  elements.bankImportSummary.innerHTML = cards
    .map(
      ([label, value, subtext]) => `
        <article class="metric-card">
          <p class="metric-label">${label}</p>
          <p class="metric-value">${value}</p>
          <p class="metric-subtext">${subtext}</p>
        </article>
      `,
    )
    .join("");
}

function renderBankImports(record) {
  const imports = (record.bankImports || []).map((statement) => ({
    ...statement,
    entries: (statement.entries || []).map(hydrateStatementEntry),
    summary: summarizeStatement((statement.entries || []).map(hydrateStatementEntry)),
  }));
  renderBankImportSummary(record);

  elements.bankImportEmpty.textContent = imports.length
    ? ""
    : "No bank statements imported yet for this company. Add the first CSV above to start the working file.";

  elements.bankStatementList.innerHTML = imports
    .map((statement) => {
      const visibleEntries = statement.entries.filter(statementMatchesFilters);
      return `
        <article class="statement-card">
          <div class="statement-head">
            <div>
              <h4>${escapeHtml(statement.accountLabel || "Imported statement")}</h4>
              <p class="statement-meta">
                ${escapeHtml(statement.fileName)} | Imported ${escapeHtml(
                  new Date(statement.importedAt).toLocaleString("en-GB"),
                )}${statement.note ? ` | ${escapeHtml(statement.note)}` : ""}${statement.closedAt ? ` | Closed ${escapeHtml(formatDateTime(statement.closedAt))}` : ""}
              </p>
            </div>
            <div class="statement-actions">
              <button class="mini-button" data-close-statement="${escapeAttribute(statement.id)}">${statement.closedAt ? "Reopen period" : "Close period"}</button>
              <button class="mini-button danger" data-remove-statement="${escapeAttribute(statement.id)}">Remove</button>
            </div>
          </div>
          <div class="statement-grid">
            <article class="metric-card">
              <p class="metric-label">Rows</p>
              <p class="metric-value">${number.format(statement.summary.rowCount)}</p>
              <p class="metric-subtext">Normalized entries in this statement</p>
            </article>
            <article class="metric-card">
              <p class="metric-label">Money In</p>
              <p class="metric-value">${formatCurrency(statement.summary.moneyIn)}</p>
              <p class="metric-subtext">${number.format(statement.summary.positiveCount)} positive entries</p>
            </article>
            <article class="metric-card">
              <p class="metric-label">Money Out</p>
              <p class="metric-value">${formatCurrency(statement.summary.moneyOut)}</p>
              <p class="metric-subtext">${number.format(statement.summary.negativeCount)} negative entries</p>
            </article>
            <article class="metric-card">
              <p class="metric-label">Zero Value</p>
              <p class="metric-value">${number.format(statement.summary.zeroCount)}</p>
              <p class="metric-subtext">Rows with no signed amount</p>
            </article>
            <article class="metric-card">
              <p class="metric-label">Reconciled</p>
              <p class="metric-value">${number.format(statement.summary.reconciledCount || 0)}</p>
              <p class="metric-subtext">Lines marked as matched</p>
            </article>
            <article class="metric-card">
              <p class="metric-label">Review queue</p>
              <p class="metric-value">${number.format(statement.summary.reviewNeededCount || 0)}</p>
              <p class="metric-subtext">Lines still needing bookkeeping review</p>
            </article>
          </div>
          <div class="statement-preview">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Review</th>
                  <th>Reconciled</th>
                  <th>Amount</th>
                  <th>Money In</th>
                  <th>Money Out</th>
                  <th>Direction</th>
                </tr>
              </thead>
              <tbody>
                ${statement.entries
                  .filter(statementMatchesFilters)
                  .map(
                    (entry) => `
                      <tr>
                        <td>${escapeHtml(entry.date || "")}</td>
                        <td>${escapeHtml(entry.description || "")}</td>
                        <td>
                          <select class="table-select" data-entry-category="${escapeAttribute(statement.id)}::${escapeAttribute(entry.id)}">
                            ${getStatementCategoryOptions()
                              .map((option) => `<option value="${escapeAttribute(option)}" ${entry.category === option ? "selected" : ""}>${escapeHtml(option)}</option>`)
                              .join("")}
                          </select>
                        </td>
                        <td>
                          <select class="table-select" data-entry-review="${escapeAttribute(statement.id)}::${escapeAttribute(entry.id)}">
                            ${getReviewStatusOptions()
                              .map((option) => `<option value="${escapeAttribute(option)}" ${entry.reviewStatus === option ? "selected" : ""}>${escapeHtml(option)}</option>`)
                              .join("")}
                          </select>
                        </td>
                        <td>
                          <label class="reconcile-toggle">
                            <input type="checkbox" data-entry-reconciled="${escapeAttribute(statement.id)}::${escapeAttribute(entry.id)}" ${entry.reconciled ? "checked" : ""}>
                            <span>${entry.reconciled ? "Matched" : "Open"}</span>
                          </label>
                        </td>
                        <td class="${amountClass(entry.amount)}">${formatCurrency(entry.amount)}</td>
                        <td>${formatCurrency(entry.moneyIn)}</td>
                        <td>${formatCurrency(entry.moneyOut)}</td>
                        <td><span class="direction-pill ${escapeAttribute(entry.direction)}">${escapeHtml(entry.direction)}</span></td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
            ${!visibleEntries.length ? `<p class="workflow-summary">No imported rows match the current filters for this statement.</p>` : ""}
          </div>
        </article>
      `;
    })
    .join("");

  elements.bankStatementList.querySelectorAll("[data-close-statement]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleStatementClosed(button.dataset.closeStatement);
    });
  });
  elements.bankStatementList.querySelectorAll("[data-remove-statement]").forEach((button) => {
    button.addEventListener("click", () => {
      removeBankStatement(button.dataset.removeStatement);
    });
  });
  elements.bankStatementList.querySelectorAll("[data-entry-category]").forEach((select) => {
    select.addEventListener("change", () => {
      const [statementId, entryId] = String(select.dataset.entryCategory || "").split("::");
      if (!statementId || !entryId) return;
      updateStatementEntryField(statementId, entryId, "category", select.value);
    });
  });
  elements.bankStatementList.querySelectorAll("[data-entry-review]").forEach((select) => {
    select.addEventListener("change", () => {
      const [statementId, entryId] = String(select.dataset.entryReview || "").split("::");
      if (!statementId || !entryId) return;
      updateStatementEntryField(statementId, entryId, "reviewStatus", select.value);
    });
  });
  elements.bankStatementList.querySelectorAll("[data-entry-reconciled]").forEach((input) => {
    input.addEventListener("change", () => {
      const [statementId, entryId] = String(input.dataset.entryReconciled || "").split("::");
      if (!statementId || !entryId) return;
      updateStatementEntryField(statementId, entryId, "reconciled", input.checked);
    });
  });
}

function setSaveState(element, message) {
  element.textContent = message;
  window.clearTimeout(element._saveTimer);
  if (!message) return;
  element._saveTimer = window.setTimeout(() => {
    element.textContent = "";
  }, 2800);
}

function renderCompanyPanel(viewId = getActiveCompanyView()) {
  const company = getSelectedCompany();
  if (!company) {
    hideAllPanels();
    elements.emptyState.classList.remove("hidden");
    return;
  }

  const record = getCompanyRecord(company.company_number);
  hideAllPanels();
  elements.companyPanel.classList.remove("hidden");
  updatePrimaryNav("companies");
  elements.companyName.textContent = record.displayName;
  elements.companyNumber.textContent = record.companyNumber;
  setCompanyView(viewId);
  renderSignalBar(company, record);
  renderCompanyOverview(company, record);
  renderCompanyDetails(company, record);
  renderBankImports(record);
  renderCompanyChart(record);
  renderVatReport(record);
  renderBalanceSheet(record);
  renderCompanyNotes(record);

  void loadCompanySecrets(company.company_number).then(() => {
    if (state.selectedCompanyId !== company.company_number) return;
    renderCompanyDetails(company, getCompanyRecord(company.company_number));
  });
}

function renderSelfEmployedPanel() {
  const person = getSelectedPersonRecord();
  if (!person) {
    hideAllPanels();
    elements.emptyState.classList.remove("hidden");
    return;
  }

  hideAllPanels();
  elements.selfEmployedPanel.classList.remove("hidden");
  updatePrimaryNav("self");
  elements.selfPersonName.textContent = person.fullName;
  const activeSecrets = state.activePersonSecretsId === person.fullName ? state.activePersonSecrets : {};

  elements.personDetailsForm.elements.fullName.value = person.fullName;
  elements.personDetailsForm.elements.tradingName.value = person.tradingName;
  elements.personDetailsForm.elements.utr.value = activeSecrets.utr || "";
  elements.personDetailsForm.elements.nino.value = activeSecrets.nino || "";
  elements.personDetailsForm.elements.dateOfBirth.value = person.dateOfBirth;
  elements.personDetailsForm.elements.nationality.value = person.nationality;
  elements.personDetailsForm.elements.gatewayId.value = activeSecrets.gatewayId || "";
  elements.personDetailsForm.elements.gatewayPassword.value = activeSecrets.gatewayPassword || "";
  elements.personDetailsForm.elements.address.value = person.address;
  elements.personDetailsForm.elements.notes.value = person.notes;
  resetSensitiveFields(elements.personDetailsForm, "person");
  if (elements.archivePersonButton) {
    elements.archivePersonButton.textContent = person.archivedAt ? "Restore person" : "Archive person";
  }

  elements.selfNotes.innerHTML = `
    <article class="note-card">
      <h4>Separate section</h4>
      <p>Self employed records sit outside the limited company workspace and can carry their own tax, identity, and notes profile.</p>
    </article>
    <article class="note-card">
      <h4>Editable record</h4>
      <p>Use this page to maintain the person details you need for the rebuild, then click \`Save person\`.</p>
    </article>
    <article class="note-card">
      <h4>Record state</h4>
      <p>${person.archivedAt ? `This self employed record is archived from the live desk since ${formatCompactDate(person.archivedAt)}.` : "This self employed record is active and visible on the live desk."}</p>
    </article>
  `;
}

function readFileText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error(`Unable to read ${file.name}.`));
    reader.readAsText(file);
  });
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const next = line[index + 1];

    if (character === "\"") {
      if (inQuotes && next === "\"") {
        current += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current);
  return values.map((value) => value.trim());
}

function parseCsvText(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter((line) => line.trim());
  if (lines.length < 2) {
    throw new Error("The CSV needs a header row and at least one transaction row.");
  }

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const row = parseCsvLine(line);
    return headers.reduce((record, header, index) => {
      record[header] = row[index] || "";
      return record;
    }, {});
  });
}

function findColumnName(row, candidates) {
  const loweredCandidates = candidates.map((candidate) => candidate.toLowerCase());
  return Object.keys(row).find((key) => loweredCandidates.includes(key.trim().toLowerCase())) || null;
}

function parseAmount(value) {
  if (value == null) return 0;
  const normalized = String(value).replace(/,/g, "").replace(/[^0-9().-]/g, "").trim();
  if (!normalized) return 0;
  if (/^\(.*\)$/.test(normalized)) {
    return -Number(normalized.slice(1, -1));
  }
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : 0;
}

function categorizeStatementEntry(description, amount) {
  const text = String(description || "").toLowerCase();

  if (!text) return { category: "Needs review", reviewStatus: "needs-review" };
  if (text.includes("vat") || text.includes("hmrc")) return { category: "Tax payment", reviewStatus: "ready" };
  if (text.includes("salary") || text.includes("payroll") || text.includes("wages")) {
    return { category: "Payroll", reviewStatus: "ready" };
  }
  if (text.includes("rent")) return { category: "Rent", reviewStatus: "ready" };
  if (text.includes("stripe") || text.includes("paypal") || text.includes("sale") || amount > 0) {
    return { category: "Sales income", reviewStatus: "ready" };
  }
  if (text.includes("transfer") || text.includes("faster payment")) {
    return { category: "Transfer", reviewStatus: "review" };
  }
  if (text.includes("fee") || text.includes("charge")) return { category: "Bank charges", reviewStatus: "ready" };
  if (text.includes("software") || text.includes("google") || text.includes("microsoft") || text.includes("adobe")) {
    return { category: "Software", reviewStatus: "ready" };
  }

  return { category: "Needs review", reviewStatus: "needs-review" };
}

function hydrateStatementEntry(entry) {
  const categoryInfo = categorizeStatementEntry(entry.description, entry.amount);
  return {
    ...entry,
    id: entry.id || `entry-${Math.random().toString(36).slice(2, 10)}`,
    category: entry.category || categoryInfo.category,
    reviewStatus: entry.reviewStatus || categoryInfo.reviewStatus,
    reconciled: Boolean(entry.reconciled),
  };
}

function normalizeStatementRows(rows) {
  return rows
    .map((row, index) => {
      const dateKey = findColumnName(row, ["Date", "Transaction Date", "Posted Date", "Booking Date"]);
      const descriptionKey = findColumnName(row, ["Description", "Transaction Description", "Memo", "Reference", "Type"]);
      const amountKey = findColumnName(row, ["Amount", "Value"]);
      const paidInKey = findColumnName(row, ["Paid In", "Paid in", "Credit Amount", "Money In", "Credit"]);
      const paidOutKey = findColumnName(row, ["Paid Out", "Paid out", "Debit Amount", "Money Out", "Debit", "Value Debit"]);

      let amount = amountKey ? parseAmount(row[amountKey]) : 0;
      const moneyIn = paidInKey ? Math.abs(parseAmount(row[paidInKey])) : 0;
      const moneyOut = paidOutKey ? Math.abs(parseAmount(row[paidOutKey])) : 0;

      if (!amount && (moneyIn || moneyOut)) {
        amount = moneyIn - moneyOut;
      }

      const direction = amount > 0 ? "in" : amount < 0 ? "out" : "zero";
      const categoryInfo = categorizeStatementEntry(descriptionKey ? row[descriptionKey] : "", amount);
      return {
        id: `entry-${index + 1}`,
        date: dateKey ? row[dateKey] : "",
        description: descriptionKey ? row[descriptionKey] : "",
        amount,
        moneyIn: amount > 0 ? Math.abs(amount) : moneyIn,
        moneyOut: amount < 0 ? Math.abs(amount) : moneyOut,
        direction,
        category: categoryInfo.category,
        reviewStatus: categoryInfo.reviewStatus,
        reconciled: false,
      };
    })
    .filter((entry) => entry.date || entry.description || entry.amount || entry.moneyIn || entry.moneyOut);
}

function summarizeStatement(entries) {
  return entries.reduce(
    (summary, entry) => {
      const normalizedEntry = hydrateStatementEntry(entry);
      summary.rowCount += 1;
      summary.moneyIn += normalizedEntry.moneyIn || 0;
      summary.moneyOut += normalizedEntry.moneyOut || 0;
      if (normalizedEntry.direction === "in") summary.positiveCount += 1;
      if (normalizedEntry.direction === "out") summary.negativeCount += 1;
      if (normalizedEntry.direction === "zero") summary.zeroCount += 1;
      if (normalizedEntry.reconciled) summary.reconciledCount += 1;
      if (normalizedEntry.reviewStatus === "ready") summary.categorizedCount += 1;
      else summary.reviewNeededCount += 1;
      return summary;
    },
    {
      rowCount: 0,
      moneyIn: 0,
      moneyOut: 0,
      positiveCount: 0,
      negativeCount: 0,
      zeroCount: 0,
      reconciledCount: 0,
      categorizedCount: 0,
      reviewNeededCount: 0,
    },
  );
}

function statementMatchesFilters(entry) {
  const search = String(state.bankFilters.search || "").trim().toLowerCase();
  const reviewFilter = state.bankFilters.review || "all";
  const reconciledFilter = state.bankFilters.reconciled || "all";

  if (search) {
    const haystack = `${entry.date || ""} ${entry.description || ""} ${entry.category || ""}`.toLowerCase();
    if (!haystack.includes(search)) return false;
  }
  if (reviewFilter !== "all" && entry.reviewStatus !== reviewFilter) return false;
  if (reconciledFilter === "open" && entry.reconciled) return false;
  if (reconciledFilter === "matched" && !entry.reconciled) return false;
  return true;
}

async function importBankStatement() {
  if (!canEditWorkspace()) {
    setSaveState(elements.companySaveState, "Your current role cannot import statements.");
    return;
  }
  const company = getSelectedCompany();
  const file = elements.bankStatementFile.files?.[0];
  if (!company || !file) {
    setSaveState(elements.companySaveState, "Choose a statement CSV first");
    return;
  }

  const accountLabel = elements.bankAccountLabel.value.trim() || `${getCompanyRecord(company.company_number).displayName} bank account`;
  const note = elements.bankImportNotes.value.trim();

  try {
    const text = await readFileText(file);
    const rows = parseCsvText(text);
    const entries = normalizeStatementRows(rows);

    if (!entries.length) {
      throw new Error("No usable transaction rows were found in that CSV.");
    }

    updateCompanyRecordField(company.company_number, (recordState) => {
      recordState.bankImports ??= [];
      recordState.bankImports.unshift({
        id: `statement-${Date.now()}`,
        accountLabel,
        fileName: file.name,
        note,
        importedAt: new Date().toISOString(),
        summary: summarizeStatement(entries),
        entries,
      });
    });

    elements.bankAccountLabel.value = "";
    elements.bankImportNotes.value = "";
    elements.bankStatementFile.value = "";
    updateBankStatementFileName();
    renderStats();
    renderCompanyPanel("company-bank-import");
    recordAuditEvent({
      action: "statement-import",
      title: `Imported ${file.name}`,
      entityType: "company",
      entityId: company.company_number,
      changes: [{ label: "Statement", from: "not imported", to: file.name }],
    });
    setSaveState(elements.companySaveState, `Imported ${file.name}`);
  } catch (error) {
    setSaveState(elements.companySaveState, error.message);
  }
}

function removeBankStatement(statementId) {
  if (!canEditWorkspace()) {
    setSaveState(elements.companySaveState, "Your current role cannot remove statements.");
    return;
  }
  const company = getSelectedCompany();
  if (!company) return;

  updateCompanyRecordField(company.company_number, (recordState) => {
    recordState.bankImports = (recordState.bankImports || []).filter((statement) => statement.id !== statementId);
  });

  renderStats();
  renderCompanyPanel("company-bank-import");
  recordAuditEvent({
    action: "statement-remove",
    title: "Bank statement removed",
    entityType: "company",
    entityId: company.company_number,
    changes: [{ label: "Statement", from: statementId, to: "removed" }],
  });
  setSaveState(elements.companySaveState, "Statement removed");
}

function toggleStatementClosed(statementId) {
  if (!canEditWorkspace()) {
    setSaveState(elements.companySaveState, "Your current role cannot close statement periods.");
    return;
  }
  const company = getSelectedCompany();
  if (!company) return;
  updateCompanyRecordField(company.company_number, (recordState) => {
    recordState.bankImports = (recordState.bankImports || []).map((statement) => (
      statement.id !== statementId
        ? statement
        : {
          ...statement,
          closedAt: statement.closedAt ? "" : new Date().toISOString(),
        }
    ));
  });
  const record = getCompanyRecord(company.company_number);
  renderBankImports(record);
  renderStats();
  const statement = (record.bankImports || []).find((item) => item.id === statementId);
  recordAuditEvent({
    action: "statement-close",
    title: statement?.closedAt ? "Statement period closed" : "Statement period reopened",
    entityType: "company",
    entityId: company.company_number,
    changes: [{ label: "Statement", from: statementId, to: statement?.closedAt ? "closed" : "reopened" }],
  });
  setSaveState(elements.companySaveState, "Statement reconciliation status updated");
}

function updateStatementEntryField(statementId, entryId, field, value) {
  const company = getSelectedCompany();
  if (!company) return;
  const existingRecord = getCompanyRecord(company.company_number);
  const lockedStatement = (existingRecord.bankImports || []).find((statement) => statement.id === statementId && statement.closedAt);
  if (lockedStatement) {
    setSaveState(elements.companySaveState, "Reopen the statement period before changing those lines.");
    return;
  }

  updateCompanyRecordField(company.company_number, (recordState) => {
    recordState.bankImports = (recordState.bankImports || []).map((statement) => {
      if (statement.id !== statementId) return statement;
      const entries = (statement.entries || []).map((entry) => {
        if (entry.id !== entryId) return entry;
        return {
          ...entry,
          [field]: value,
        };
      });
      return {
        ...statement,
        entries,
        summary: summarizeStatement(entries),
      };
    });
  });

  const record = getCompanyRecord(company.company_number);
  renderStats();
  renderBankImports(record);
  renderCompanyChart(record);
  renderVatReport(record);
  renderBalanceSheet(record);
  recordAuditEvent({
    action: "statement-edit",
    title: "Bank line updated",
    entityType: "company",
    entityId: company.company_number,
    changes: [{ label: field, from: "previous value", to: String(value) }],
  });
  setSaveState(elements.companySaveState, "Bookkeeping row updated");
}

function slugifyFilePart(value) {
  return String(value || "aligned-financials")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "aligned-financials";
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, "\"\"")}"`;
  }
  return text;
}

function makeCsv(rows) {
  return rows
    .map((row) => row.map((value) => escapeCsvValue(value)).join(","))
    .join("\n");
}

function buildExportDocument(title, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(title)}</title>
    <style>
      @page {
        margin: 18mm;
      }
      body {
        font-family: "Segoe UI", Arial, sans-serif;
        color: #1a1c20;
        margin: 0;
        line-height: 1.5;
        font-size: 13px;
      }
      h1, h2, h3 {
        margin: 0 0 10px;
        color: #111111;
      }
      h1 {
        font-size: 26px;
      }
      h2 {
        font-size: 16px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      p {
        margin: 0 0 10px;
      }
      .sheet {
        border: 1px solid #e6dcc3;
        border-radius: 18px;
        overflow: hidden;
      }
      .sheet-head {
        padding: 20px 24px;
        background: linear-gradient(135deg, #1b1a17, #312714);
        color: #f8f3e6;
      }
      .sheet-head p {
        color: #e8d6a0;
      }
      .sheet-body {
        padding: 22px 24px 28px;
        background: #fffdf8;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 18px;
      }
      th, td {
        border: 1px solid #d1d5db;
        padding: 8px 10px;
        text-align: left;
        vertical-align: top;
      }
      th {
        background: #f3f4f6;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.06em;
      }
      .muted {
        color: #6b7280;
      }
      .section {
        margin-top: 24px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px 20px;
      }
      .pill {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 999px;
        background: #f3f4f6;
      }
      .footer {
        margin-top: 28px;
        padding-top: 16px;
        border-top: 1px solid #eadfcb;
        color: #6b7280;
        font-size: 11px;
      }
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="sheet-head">
        <h1>Aligned Financials</h1>
        <p>Working export generated from the desktop workspace</p>
      </div>
      <div class="sheet-body">
        ${body}
        <p class="footer">Prepared ${escapeHtml(formatDateTime(new Date().toISOString()))}</p>
      </div>
    </div>
  </body>
</html>`;
}

async function saveTextExport({ suggestedName, content, title, filters }) {
  if (window.alignedDesktop?.isDesktop) {
    return window.alignedDesktop.saveExportFile({ suggestedName, content, title, filters });
  }

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = suggestedName;
  link.click();
  URL.revokeObjectURL(url);
  return { ok: true, browserDownload: true };
}

async function savePdfExport({ suggestedName, html, title }) {
  if (window.alignedDesktop?.isDesktop) {
    return window.alignedDesktop.saveExportPdf({ suggestedName, html, title });
  }

  const popup = window.open("", "_blank");
  if (popup) {
    popup.document.write(html);
    popup.document.close();
    popup.focus();
    popup.print();
  }
  return { ok: true, browserPreview: true };
}

function buildCompanyDetailsCsv(record, secrets = {}) {
  return makeCsv([
    ["Field", "Value"],
    ["Display name", record.displayName],
    ["Legal name", record.legalName],
    ["Company number", record.companyNumber],
    ["Entity type", record.entityType],
    ["Company status", record.companyStatus],
    ["Registration date", record.registrationDate],
    ["Registration country", record.registrationCountry],
    ["VAT registration", maskSensitiveValue(secrets.vatRegistration)],
    ["VAT scheme", record.vatScheme],
    ["Company UTR", maskSensitiveValue(secrets.utr)],
    ["PAYE reference", maskSensitiveValue(secrets.payeReference)],
    ["Account office reference", maskSensitiveValue(secrets.accountOfficeReference)],
    ["Companies House code", maskSensitiveValue(secrets.companiesHouseCode)],
    ["Government gateway ID", maskSensitiveValue(secrets.gatewayId)],
    ["Government gateway password", "Hidden in export"],
    ["Bank accounts", record.bankAccount],
    ["Address", record.address],
    ["Industries", record.industries],
    ["Next VAT due", record.deadlines?.vatDue || ""],
    ["Year end", record.deadlines?.yearEnd || ""],
    ["Confirmation statement", record.deadlines?.confirmation || ""],
    ["Accounts due", record.deadlines?.accountsDue || ""],
    ["Bookkeeping status", normalizeWorkflow(record.workflow).bookkeepingStatus],
    ["Accounts status", normalizeWorkflow(record.workflow).accountsStatus],
    ["VAT cadence", normalizeWorkflow(record.workflow).vatCadence],
    ["Payroll status", normalizeWorkflow(record.workflow).payrollStatus],
    ["Next VAT period end", normalizeWorkflow(record.workflow).nextVatPeriodEnd],
    ["Corporation tax due", normalizeWorkflow(record.workflow).corporationTaxDue],
    ["Priority", normalizeWorkflow(record.workflow).priority],
    ["Assigned to", normalizeWorkflow(record.workflow).assignedTo],
    ["Next action", normalizeWorkflow(record.workflow).nextAction],
    ["Notes", record.generalNotes],
  ]);
}

function buildCompanyDetailsPdf(record, secrets = {}) {
  const workflow = normalizeWorkflow(record.workflow);
  const rows = [
    ["Display name", record.displayName],
    ["Legal name", record.legalName],
    ["Company number", record.companyNumber],
    ["Entity type", record.entityType],
    ["Company status", record.companyStatus],
    ["Registration date", record.registrationDate],
    ["Registration country", record.registrationCountry],
    ["VAT registration", maskSensitiveValue(secrets.vatRegistration)],
    ["VAT scheme", record.vatScheme],
    ["Company UTR", maskSensitiveValue(secrets.utr)],
    ["PAYE reference", maskSensitiveValue(secrets.payeReference)],
    ["Account office reference", maskSensitiveValue(secrets.accountOfficeReference)],
    ["Companies House code", maskSensitiveValue(secrets.companiesHouseCode)],
    ["Government gateway ID", maskSensitiveValue(secrets.gatewayId)],
    ["Government gateway password", "Hidden in export"],
  ];
  const workflowRows = [
    ["Bookkeeping status", workflow.bookkeepingStatus],
    ["Accounts status", workflow.accountsStatus],
    ["VAT cadence", workflow.vatCadence],
    ["Payroll status", workflow.payrollStatus],
    ["Next VAT period end", workflow.nextVatPeriodEnd],
    ["Corporation tax due", workflow.corporationTaxDue],
    ["Priority", workflow.priority],
    ["Assigned to", workflow.assignedTo],
    ["Next action", workflow.nextAction],
  ];

  return buildExportDocument(
    `${record.displayName} client details`,
    `
      <h1>${escapeHtml(record.displayName)}</h1>
      <p class="muted">Client details export generated from the Aligned Financials workspace.</p>
      <div class="section">
        <table>
          <thead><tr><th>Field</th><th>Value</th></tr></thead>
          <tbody>${rows.map(([label, value]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value || "")}</td></tr>`).join("")}</tbody>
        </table>
      </div>
      <div class="section">
        <h2>Workflow</h2>
        <table>
          <thead><tr><th>Field</th><th>Value</th></tr></thead>
          <tbody>${workflowRows.map(([label, value]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value || "")}</td></tr>`).join("")}</tbody>
        </table>
      </div>
      <div class="section">
        <h2>Notes</h2>
        <p>${escapeHtml(record.generalNotes || "No notes saved.")}</p>
      </div>
    `,
  );
}

function getBankActivityRows(record) {
  return (record.bankImports || []).flatMap((statement) =>
    (statement.entries || []).map((entry) => {
      const hydrated = hydrateStatementEntry(entry);
      return [
        statement.accountLabel || "Imported statement",
        statement.fileName || "",
        hydrated.date || "",
        hydrated.description || "",
        hydrated.category || "",
        hydrated.reviewStatus || "",
        hydrated.reconciled ? "Yes" : "No",
        hydrated.direction || "",
        hydrated.amount || 0,
        hydrated.moneyIn || 0,
        hydrated.moneyOut || 0,
      ];
    }),
  );
}

function buildBankActivityCsv(record) {
  return makeCsv([
    ["Statement", "File", "Date", "Description", "Category", "Review", "Reconciled", "Direction", "Amount", "Money In", "Money Out"],
    ...getBankActivityRows(record),
  ]);
}

function buildBankActivityPdf(record) {
  const rows = getBankActivityRows(record);
  return buildExportDocument(
    `${record.displayName} bank activity`,
    `
      <h1>${escapeHtml(record.displayName)} bank activity</h1>
      <p class="muted">Imported bank activity with bookkeeping category, review, and reconciliation state.</p>
      <table>
        <thead>
          <tr>
            <th>Statement</th>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Review</th>
            <th>Reconciled</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr><td>${escapeHtml(row[0])}</td><td>${escapeHtml(row[2])}</td><td>${escapeHtml(row[3])}</td><td>${escapeHtml(row[4])}</td><td>${escapeHtml(row[5])}</td><td>${escapeHtml(row[6])}</td><td>${escapeHtml(formatCurrency(row[8]))}</td></tr>`).join("")}
        </tbody>
      </table>
    `,
  );
}

function buildVatCsv(record, secrets = {}) {
  const vat = buildVatReport(record, secrets);
  return makeCsv([
    ["Field", "Value", "Note"],
    ["VAT registration", secrets.vatRegistration || "Not set", "Registration number on file"],
    ["Scheme", record.vatScheme || "Not set", "Current VAT method"],
    ["Next period end", normalizeWorkflow(record.workflow).nextVatPeriodEnd || "Not set", "Workflow planning field"],
    ["Due before", record.deadlines?.vatDue || "Not set", "Deadline in the compliance timeline"],
    ["Imported taxable sales", vat.taxableSales, "Money-in lines mapped to sales income"],
    ["Working VAT due", vat.estimatedVatDue, vat.isFlatRate ? `${((vat.flatRate || 0) * 100).toFixed(2)}% flat rate` : vat.isRegistered ? "Standard-rate estimate" : "Not VAT registered"],
    ["VAT payments found", vat.taxPayments, "HMRC and VAT-tagged payments in imported activity"],
    ["Estimated position", vat.position, vat.position > 0 ? "Still due" : vat.position < 0 ? "Paid ahead" : "Currently even"],
    ["Reconciled lines", vat.reconciledCount, "Imported entries marked reconciled"],
    ["Review queue", vat.reviewQueueCount, "Imported entries still not ready"],
  ]);
}

function buildVatPdf(record, secrets = {}) {
  const vat = buildVatReport(record, secrets);
  return buildExportDocument(
    `${record.displayName} VAT report`,
    `
      <h1>${escapeHtml(record.displayName)} VAT report</h1>
      <p class="muted">Working VAT report generated from imported bank activity.</p>
      <table>
        <thead><tr><th>Field</th><th>Value</th><th>Note</th></tr></thead>
        <tbody>
          ${[
            ["VAT registration", secrets.vatRegistration || "Not set", "Registration number on file"],
            ["Scheme", record.vatScheme || "Not set", "Current VAT method"],
            ["Next period end", normalizeWorkflow(record.workflow).nextVatPeriodEnd || "Not set", "Workflow planning field"],
            ["Due before", record.deadlines?.vatDue || "Not set", "Deadline in the compliance timeline"],
            ["Imported taxable sales", formatCurrency(vat.taxableSales), "Money-in lines mapped to sales income"],
            ["Working VAT due", formatCurrency(vat.estimatedVatDue), vat.isFlatRate ? `${((vat.flatRate || 0) * 100).toFixed(2)}% flat rate` : vat.isRegistered ? "Standard-rate estimate" : "Not VAT registered"],
            ["VAT payments found", formatCurrency(vat.taxPayments), "HMRC and VAT-tagged payments in imported activity"],
            ["Estimated position", formatCurrency(vat.position), vat.position > 0 ? "Still due" : vat.position < 0 ? "Paid ahead" : "Currently even"],
            ["Reconciled lines", number.format(vat.reconciledCount), "Imported entries marked reconciled"],
            ["Review queue", number.format(vat.reviewQueueCount), "Imported entries still not ready"],
          ].map(([label, value, note]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td><td>${escapeHtml(note)}</td></tr>`).join("")}
        </tbody>
      </table>
    `,
  );
}

function buildBalanceCsv(record, secrets = {}) {
  const sheet = buildBalanceSheet(record, secrets);
  return makeCsv([
    ["Section", "Line", "Value"],
    ...sheet.currentAssets.map(([label, value]) => ["Current assets", label, value]),
    ["Current assets", "Total assets", sheet.totalAssets],
    ...sheet.currentLiabilities.map(([label, value]) => ["Current liabilities", label, value]),
    ["Current liabilities", "Total liabilities", sheet.totalLiabilities],
    ...sheet.equityLines.map(([label, value]) => ["Equity", label, value]),
    ["Equity", "Total equity", sheet.totalEquity],
    ["Summary", "Trading result", sheet.tradingResult],
    ["Summary", "Net cash", sheet.netCash],
  ]);
}

function buildBalancePdf(record, secrets = {}) {
  const sheet = buildBalanceSheet(record, secrets);
  const renderRows = (lines) => lines.map(([label, value]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(formatCurrency(value))}</td></tr>`).join("");
  return buildExportDocument(
    `${record.displayName} balance sheet`,
    `
      <h1>${escapeHtml(record.displayName)} balance sheet</h1>
      <p class="muted">Working balance sheet generated from imported cash movement and saved bookkeeping categories.</p>
      <div class="section">
        <h2>Current assets</h2>
        <table><thead><tr><th>Line</th><th>Value</th></tr></thead><tbody>${renderRows(sheet.currentAssets)}<tr><td>Total assets</td><td>${escapeHtml(formatCurrency(sheet.totalAssets))}</td></tr></tbody></table>
      </div>
      <div class="section">
        <h2>Current liabilities</h2>
        <table><thead><tr><th>Line</th><th>Value</th></tr></thead><tbody>${renderRows(sheet.currentLiabilities)}<tr><td>Total liabilities</td><td>${escapeHtml(formatCurrency(sheet.totalLiabilities))}</td></tr></tbody></table>
      </div>
      <div class="section">
        <h2>Equity</h2>
        <table><thead><tr><th>Line</th><th>Value</th></tr></thead><tbody>${renderRows(sheet.equityLines)}<tr><td>Total equity</td><td>${escapeHtml(formatCurrency(sheet.totalEquity))}</td></tr></tbody></table>
      </div>
    `,
  );
}

async function exportCompanySection(section, format) {
  const company = getSelectedCompany();
  if (!company) return;
  const record = getCompanyRecord(company.company_number);
  const secrets = getCompanySecretSnapshot(record, company.company_number);
  const slug = slugifyFilePart(record.displayName || company.company_number);

  const exporters = {
    details: {
      csv: {
        fileName: `${slug}-client-details.csv`,
        title: "Save client details CSV",
        content: buildCompanyDetailsCsv(record, secrets),
      },
      pdf: {
        fileName: `${slug}-client-details.pdf`,
        title: "Save client details PDF",
        html: buildCompanyDetailsPdf(record, secrets),
      },
    },
    bank: {
      csv: {
        fileName: `${slug}-bank-activity.csv`,
        title: "Save bank activity CSV",
        content: buildBankActivityCsv(record),
      },
      pdf: {
        fileName: `${slug}-bank-activity.pdf`,
        title: "Save bank activity PDF",
        html: buildBankActivityPdf(record),
      },
    },
    vat: {
      csv: {
        fileName: `${slug}-vat-report.csv`,
        title: "Save VAT report CSV",
        content: buildVatCsv(record, secrets),
      },
      pdf: {
        fileName: `${slug}-vat-report.pdf`,
        title: "Save VAT report PDF",
        html: buildVatPdf(record, secrets),
      },
    },
    balance: {
      csv: {
        fileName: `${slug}-balance-sheet.csv`,
        title: "Save balance sheet CSV",
        content: buildBalanceCsv(record, secrets),
      },
      pdf: {
        fileName: `${slug}-balance-sheet.pdf`,
        title: "Save balance sheet PDF",
        html: buildBalancePdf(record, secrets),
      },
    },
  };

  const config = exporters[section]?.[format];
  if (!config) return;

  const result = format === "pdf"
    ? await savePdfExport({
      suggestedName: config.fileName,
      html: config.html,
      title: config.title,
    })
    : await saveTextExport({
      suggestedName: config.fileName,
      content: config.content,
      title: config.title,
      filters: [{ name: "CSV", extensions: ["csv"] }],
    });

  if (result?.ok) {
    setSaveState(elements.companySaveState, `${section.charAt(0).toUpperCase() + section.slice(1)} export ready`);
  }
}

function amountClass(value) {
  if (value > 0) return "amount-positive";
  if (value < 0) return "amount-negative";
  return "";
}

function formatCurrency(value) {
  return currency.format(value || 0);
}

function escapeHtml(value) {
  return escapeAttribute(value);
}

function escapeAttribute(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function applyCompanyEdits() {
  const company = getSelectedCompany();
  if (!company) return;
  if (!canEditWorkspace()) {
    setSaveState(elements.companySaveState, "Your current role cannot edit company records.");
    return;
  }

  const current = getCompanyRecord(company.company_number);
  const edits = collectCompanyFormData();
  const secretEdits = collectCompanySecretData();
  const accountingOverrides = collectAccountingOverridesData();
  state.companyRecords[company.company_number] = {
    ...current,
    ...edits,
    workflow: normalizeWorkflow(edits.workflow),
    accountingOverrides,
    companyNumber: edits.companyNumber || company.company_number,
  };
  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  const secretResult = await saveCompanySecrets(company.company_number, secretEdits);
  if (secretResult?.ok === false && secretResult?.message) {
    setSaveState(elements.companySaveState, secretResult.message);
    return;
  }
  const changes = diffFields(current, state.companyRecords[company.company_number], {
    displayName: "Display name",
    legalName: "Legal name",
    companyStatus: "Company status",
    vatScheme: "VAT scheme",
    bankAccount: "Bank account",
  });
  if (changes.length) {
    recordAuditEvent({
      action: "company-save",
      title: `Updated ${state.companyRecords[company.company_number].displayName}`,
      entityType: "company",
      entityId: company.company_number,
      changes,
    });
  }
  renderStats();
  renderCompanyList();
  renderCompanyPanel();
  setSaveState(elements.companySaveState, `Saved ${state.companyRecords[company.company_number].displayName}`);
}

async function applyPersonEdits() {
  const personId = state.selectedPersonId;
  if (!personId) return;
  if (!canEditWorkspace()) {
    setSaveState(elements.personSaveState, "Your current role cannot edit self employed records.");
    return;
  }

  const current = state.personRecords[personId];
  const edits = collectPersonFormData();
  const secretEdits = collectPersonSecretData();
  state.personRecords[personId] = {
    ...current,
    ...edits,
  };
  saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  const secretResult = await savePersonSecrets(personId, secretEdits);
  if (secretResult?.ok === false && secretResult?.message) {
    setSaveState(elements.personSaveState, secretResult.message);
    return;
  }
  const changes = diffFields(current, state.personRecords[personId], {
    fullName: "Full name",
    tradingName: "Trading name",
    dateOfBirth: "Date of birth",
    nationality: "Nationality",
    address: "Address",
  });
  if (changes.length) {
    recordAuditEvent({
      action: "person-save",
      title: `Updated ${state.personRecords[personId].fullName}`,
      entityType: "person",
      entityId: personId,
      changes,
    });
  }
  renderArchivedRecords();
  renderSelfEmployedList();
  renderSelfEmployedPanel();
  setSaveState(elements.personSaveState, `Saved ${state.personRecords[personId].fullName}`);
}

function archiveCompanyRecord(companyId) {
  if (!companyId || !state.companyRecords[companyId]) return;
  state.companyRecords[companyId] = {
    ...normalizeArchivedState(state.companyRecords[companyId]),
    archivedAt: new Date().toISOString(),
    archivedReason: "Archived from the live desk",
  };
  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  recordAuditEvent({
    action: "company-archive",
    title: `Archived ${state.companyRecords[companyId].displayName}`,
    entityType: "company",
    entityId: companyId,
    changes: [{ label: "Archive status", from: "live", to: "archived" }],
  });
  filterCompanies(elements.companySearch.value);
  renderStats();
  renderArchivedRecords();
  renderCompanyPanel();
  setSaveState(elements.companySaveState, `Archived ${state.companyRecords[companyId].displayName}`);
}

function restoreCompanyRecord(companyId) {
  if (!companyId || !state.companyRecords[companyId]) return;
  state.companyRecords[companyId] = {
    ...normalizeArchivedState(state.companyRecords[companyId]),
    archivedAt: "",
    archivedReason: "",
  };
  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  recordAuditEvent({
    action: "company-restore",
    title: `Restored ${state.companyRecords[companyId].displayName}`,
    entityType: "company",
    entityId: companyId,
    changes: [{ label: "Archive status", from: "archived", to: "live" }],
  });
  filterCompanies(elements.companySearch.value);
  renderStats();
  renderArchivedRecords();
  if (elements.settingsPanel.classList.contains("hidden")) {
    state.selectedCompanyId = companyId;
    renderCompanyPanel();
  }
  setSaveState(elements.settingsSaveState, `Restored ${state.companyRecords[companyId].displayName}`);
}

function archiveSelectedCompany() {
  const companyId = state.selectedCompanyId;
  if (!companyId) return;
  const record = state.companyRecords[companyId];

  if (record.archivedAt) {
    restoreCompanyRecord(companyId);
    setSaveState(elements.companySaveState, `Restored ${record.displayName}`);
    return;
  }

  if (!window.confirm(`Archive ${record.displayName} from the live desk? You can restore it later in Settings.`)) {
    return;
  }

  archiveCompanyRecord(companyId);
}

function archivePersonRecord(personId) {
  if (!personId || !state.personRecords[personId]) return;
  state.personRecords[personId] = {
    ...normalizeArchivedState(state.personRecords[personId]),
    archivedAt: new Date().toISOString(),
    archivedReason: "Archived from the live desk",
  };
  saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  recordAuditEvent({
    action: "person-archive",
    title: `Archived ${state.personRecords[personId].fullName}`,
    entityType: "person",
    entityId: personId,
    changes: [{ label: "Archive status", from: "live", to: "archived" }],
  });
  renderSelfEmployedList();
  renderStats();
  renderArchivedRecords();
  renderSelfEmployedPanel();
  setSaveState(elements.personSaveState, `Archived ${state.personRecords[personId].fullName}`);
}

function restorePersonRecord(personId) {
  if (!personId || !state.personRecords[personId]) return;
  state.personRecords[personId] = {
    ...normalizeArchivedState(state.personRecords[personId]),
    archivedAt: "",
    archivedReason: "",
  };
  saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  recordAuditEvent({
    action: "person-restore",
    title: `Restored ${state.personRecords[personId].fullName}`,
    entityType: "person",
    entityId: personId,
    changes: [{ label: "Archive status", from: "archived", to: "live" }],
  });
  renderSelfEmployedList();
  renderStats();
  renderArchivedRecords();
  if (elements.settingsPanel.classList.contains("hidden")) {
    openPersonRecord(personId);
  }
  setSaveState(elements.settingsSaveState, `Restored ${state.personRecords[personId].fullName}`);
}

function archiveSelectedPerson() {
  const personId = state.selectedPersonId;
  if (!personId) return;
  const record = state.personRecords[personId];

  if (record.archivedAt) {
    restorePersonRecord(personId);
    setSaveState(elements.personSaveState, `Restored ${record.fullName}`);
    return;
  }

  if (!window.confirm(`Archive ${record.fullName} from the live desk? You can restore this record later in Settings.`)) {
    return;
  }

  archivePersonRecord(personId);
}

function resetCurrentCompanyView() {
  renderCompanyPanel();
}

function resetCurrentPersonView() {
  renderSelfEmployedPanel();
}

function openFirstCompany(viewId = "company-overview") {
  const firstCompany = state.filteredCompanies[0] || getActiveCompanies()[0];
  if (!firstCompany) {
    hideAllPanels();
    elements.emptyState.classList.remove("hidden");
    return;
  }
  state.selectedPersonId = null;
  state.selectedCompanyId = firstCompany.company_number;
  renderCompanyList();
  renderSelfEmployedList();
  renderCompanyPanel(viewId);
}

function openFirstSelfEmployed() {
  const firstPerson = getActiveSelfEmployedPeople()[0];
  if (!firstPerson) {
    hideAllPanels();
    elements.emptyState.classList.remove("hidden");
    return;
  }
  openPersonRecord(firstPerson);
}

function openPersonRecord(personId) {
  if (!personId) return;
  state.selectedCompanyId = null;
  state.selectedPersonId = personId;
  renderCompanyList();
  renderSelfEmployedList();
  renderSelfEmployedPanel();
  void loadPersonSecrets(personId).then(() => {
    if (state.selectedPersonId !== personId) return;
    renderSelfEmployedPanel();
  });
}

async function hydrateEncryptedData() {
  if (window.alignedDesktop?.isDesktop && state.activeUser && state.activePassword) {
    const result = await window.alignedDesktop.loadData({
      username: state.activeUser,
      password: state.activePassword,
    });
    if (!result.ok) {
      throw new Error(result.message);
    }
    state.persistedData = result.data || {};
    state.lastRemoteSyncAt = result.remoteUpdatedAt || "";
    state.offlineMode = Boolean(result.offline || result.source === "local");
    state.syncConflict = false;
    state.syncMessage = result.message || (result.offline
      ? result.message || "Opened the encrypted local cache."
      : result.remoteUpdatedAt
        ? `Loaded cloud workspace from ${formatDateTime(result.remoteUpdatedAt)}.`
        : "");
    refreshSyncSurface();
    return;
  }

  try {
    state.persistedData = {
      [COMPANY_STORAGE_KEY]: JSON.parse(localStorage.getItem(COMPANY_STORAGE_KEY) || "{}"),
      [PERSON_STORAGE_KEY]: JSON.parse(localStorage.getItem(PERSON_STORAGE_KEY) || "{}"),
      [CUSTOM_COMPANIES_KEY]: JSON.parse(localStorage.getItem(CUSTOM_COMPANIES_KEY) || "[]"),
      [CUSTOM_PEOPLE_KEY]: JSON.parse(localStorage.getItem(CUSTOM_PEOPLE_KEY) || "[]"),
    };
  } catch {
    state.persistedData = {};
  }
  refreshSyncSurface();
}

function applyLoadedWorkspaceData(data) {
  const previousCompanyId = state.selectedCompanyId;
  const previousPersonId = state.selectedPersonId;
  state.activeCompanySecrets = {};
  state.activeCompanySecretsId = "";
  state.activePersonSecrets = {};
  state.activePersonSecretsId = "";
  state.persistedData = data || {};
  initializeRecords(window.APP_DATA);
  renderStats();

  if (previousCompanyId && state.companyRecords[previousCompanyId]) {
    state.selectedCompanyId = previousCompanyId;
    state.selectedPersonId = null;
    renderCompanyList();
    renderSelfEmployedList();
    renderCompanyPanel(getActiveCompanyView());
    return;
  }

  if (previousPersonId && state.personRecords[previousPersonId]) {
    openPersonRecord(previousPersonId);
    return;
  }

  renderCompanyList();
  renderSelfEmployedList();
}

function applyLegacySecretsToCurrentRecords() {
  if (!state.companies.length) return;

  state.companies.forEach((company) => {
    state.companyRecords[company.company_number] ??= companyDefaults(company);
    state.companyRecords[company.company_number] = applyLegacyCompanyBackfill(
      company.company_number,
      state.companyRecords[company.company_number],
    );
  });

  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
}

async function hydrateLegacySecrets() {
  state.activeCompanySecrets = {};
  state.activeCompanySecretsId = "";
}

async function loadLocalCompanySecrets(companyId) {
  if (!companyId) return {};
  if (!window.alignedDesktop?.isDesktop || !window.alignedDesktop.getLegacyCompanySecretRecord) {
    return {};
  }

  try {
    const secrets = await window.alignedDesktop.getLegacyCompanySecretRecord({
      companyId,
      username: state.activeUser,
      password: state.activePassword,
    });
    return normalizeSecretRecord(COMPANY_SECRET_FIELDS, secrets);
  } catch {
    return {};
  }
}

async function loadCompanySecrets(companyId) {
  if (!companyId) return {};
  if (state.activeCompanySecretsId === companyId) {
    return state.activeCompanySecrets;
  }

  const syncedSecrets = await getSyncedCompanySecretRecord(companyId);
  const localSecrets = await loadLocalCompanySecrets(companyId);
  state.activeCompanySecrets = {
    ...syncedSecrets,
    ...localSecrets,
  };
  state.activeCompanySecretsId = companyId;
  return state.activeCompanySecrets;
}

async function persistSyncedCompanySecrets(companyId, secrets) {
  const syncable = normalizeSecretRecord(COMPANY_SECRET_FIELDS, secrets);
  const currentStore = await readSyncedCompanySecretsStore();
  if (Object.keys(syncable).length) {
    currentStore[companyId] = syncable;
  } else {
    delete currentStore[companyId];
  }

  const writeResult = await writeSyncedCompanySecretsStore(currentStore);
  if (!writeResult.ok) return writeResult;

  if (window.alignedDesktop?.isDesktop && state.activeUser && state.activePassword) {
    const syncResult = await persistDesktopData();
    if (syncResult?.ok === false) {
      return {
        ok: false,
        message: syncResult.message || "The encrypted secret sync could not be saved.",
        conflict: Boolean(syncResult.conflict),
      };
    }
  }

  return { ok: true };
}

async function saveCompanySecrets(companyId, secrets) {
  if (!companyId) return { ok: false };
  const normalizedSecrets = normalizeSecretRecord(COMPANY_SECRET_FIELDS, secrets);

  if (!window.alignedDesktop?.isDesktop || !window.alignedDesktop.saveLegacyCompanySecretRecord) {
    state.activeCompanySecrets = { ...normalizedSecrets };
    state.activeCompanySecretsId = companyId;
    return { ok: true };
  }

  const localResult = await window.alignedDesktop.saveLegacyCompanySecretRecord({
    companyId,
    username: state.activeUser,
    password: state.activePassword,
    secrets: normalizedSecrets,
  });

  if (!localResult?.ok) {
    return localResult;
  }

  const syncedResult = await persistSyncedCompanySecrets(companyId, normalizedSecrets);
  if (syncedResult?.ok) {
    state.activeCompanySecrets = { ...normalizedSecrets };
    state.activeCompanySecretsId = companyId;
  }

  return syncedResult;
}

async function migrateStoredCompanySecrets() {
  if (!window.alignedDesktop?.isDesktop || !state.activeUser || !state.activePassword) return;

  let changed = false;
  for (const [companyId, record] of Object.entries(state.companyRecords)) {
    const extractedSecrets = COMPANY_SECRET_FIELDS.reduce((accumulator, field) => {
      const value = String(record[field] || "").trim();
      if (value) accumulator[field] = value;
      return accumulator;
    }, {});

    if (!Object.keys(extractedSecrets).length) continue;

    const existingSecrets = await loadCompanySecrets(companyId);
    const nextSecrets = {
      ...extractedSecrets,
      ...existingSecrets,
    };
    const result = await saveCompanySecrets(companyId, nextSecrets);
    if (!result?.ok) continue;

    COMPANY_SECRET_FIELDS.forEach((field) => {
      if (record[field]) {
        record[field] = "";
        changed = true;
      }
    });
  }

  if (changed) {
    saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  }

  const currentCompanyId = state.selectedCompanyId || "";
  if (currentCompanyId) {
    state.activeCompanySecretsId = "";
    await loadCompanySecrets(currentCompanyId);
  } else {
    state.activeCompanySecrets = {};
    state.activeCompanySecretsId = "";
  }
}

async function syncLocalCompanySecretsToWorkspace() {
  if (!window.alignedDesktop?.isDesktop || !state.activeUser || !state.activePassword) return;

  const syncedStore = await readSyncedCompanySecretsStore();
  let changed = false;

  for (const companyId of Object.keys(state.companyRecords)) {
    const localSecrets = await loadLocalCompanySecrets(companyId);
    if (!Object.keys(localSecrets).length) continue;
    const existing = normalizeSecretRecord(COMPANY_SECRET_FIELDS, syncedStore[companyId]);
    const merged = {
      ...existing,
      ...localSecrets,
    };
    if (JSON.stringify(existing) !== JSON.stringify(merged)) {
      syncedStore[companyId] = merged;
      changed = true;
    }
  }

  if (!changed) return;

  const writeResult = await writeSyncedCompanySecretsStore(syncedStore);
  if (writeResult.ok) {
    await persistDesktopData();
  }
}

async function loadLocalPersonSecrets(personId) {
  if (!personId) return {};
  if (!window.alignedDesktop?.isDesktop || !window.alignedDesktop.getSelfEmployedSecretRecord) {
    return {};
  }

  try {
    const secrets = await window.alignedDesktop.getSelfEmployedSecretRecord({
      personId,
      username: state.activeUser,
      password: state.activePassword,
    });
    return normalizeSecretRecord(PERSON_SECRET_FIELDS, secrets);
  } catch {
    return {};
  }
}

async function loadPersonSecrets(personId) {
  if (!personId) return {};
  if (state.activePersonSecretsId === personId) {
    return state.activePersonSecrets;
  }

  const syncedSecrets = await getSyncedPersonSecretRecord(personId);
  const localSecrets = await loadLocalPersonSecrets(personId);
  state.activePersonSecrets = {
    ...syncedSecrets,
    ...localSecrets,
  };
  state.activePersonSecretsId = personId;
  return state.activePersonSecrets;
}

async function persistSyncedPersonSecrets(personId, secrets) {
  const syncable = normalizeSecretRecord(PERSON_SECRET_FIELDS, secrets);
  const currentStore = await readSyncedPersonSecretsStore();
  if (Object.keys(syncable).length) {
    currentStore[personId] = syncable;
  } else {
    delete currentStore[personId];
  }

  const writeResult = await writeSyncedPersonSecretsStore(currentStore);
  if (!writeResult.ok) return writeResult;

  if (window.alignedDesktop?.isDesktop && state.activeUser && state.activePassword) {
    const syncResult = await persistDesktopData();
    if (syncResult?.ok === false) {
      return {
        ok: false,
        message: syncResult.message || "The encrypted secret sync could not be saved.",
        conflict: Boolean(syncResult.conflict),
      };
    }
  }

  return { ok: true };
}

async function savePersonSecrets(personId, secrets) {
  if (!personId) return { ok: false };
  const normalizedSecrets = normalizeSecretRecord(PERSON_SECRET_FIELDS, secrets);

  if (!window.alignedDesktop?.isDesktop || !window.alignedDesktop.saveSelfEmployedSecretRecord) {
    state.activePersonSecrets = { ...normalizedSecrets };
    state.activePersonSecretsId = personId;
    return { ok: true };
  }

  const localResult = await window.alignedDesktop.saveSelfEmployedSecretRecord({
    personId,
    username: state.activeUser,
    password: state.activePassword,
    secrets: normalizedSecrets,
  });

  if (!localResult?.ok) {
    return localResult;
  }

  const syncedResult = await persistSyncedPersonSecrets(personId, normalizedSecrets);
  if (syncedResult?.ok) {
    state.activePersonSecrets = { ...normalizedSecrets };
    state.activePersonSecretsId = personId;
  }

  return syncedResult;
}

async function migrateStoredPersonSecrets() {
  if (!window.alignedDesktop?.isDesktop || !state.activeUser || !state.activePassword) return;

  let changed = false;
  for (const [personId, record] of Object.entries(state.personRecords)) {
    const extractedSecrets = PERSON_SECRET_FIELDS.reduce((accumulator, field) => {
      const value = String(record[field] || "").trim();
      if (value) accumulator[field] = value;
      return accumulator;
    }, {});

    if (!Object.keys(extractedSecrets).length) continue;

    const existingSecrets = await loadPersonSecrets(personId);
    const nextSecrets = {
      ...extractedSecrets,
      ...existingSecrets,
    };
    const result = await savePersonSecrets(personId, nextSecrets);
    if (!result?.ok) continue;

    PERSON_SECRET_FIELDS.forEach((field) => {
      if (record[field]) {
        record[field] = "";
        changed = true;
      }
    });
  }

  if (changed) {
    saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  }

  const currentPersonId = state.selectedPersonId || "";
  if (currentPersonId) {
    state.activePersonSecretsId = "";
    await loadPersonSecrets(currentPersonId);
  } else {
    state.activePersonSecrets = {};
    state.activePersonSecretsId = "";
  }
}

async function syncLocalPersonSecretsToWorkspace() {
  if (!window.alignedDesktop?.isDesktop || !state.activeUser || !state.activePassword) return;

  const syncedStore = await readSyncedPersonSecretsStore();
  let changed = false;

  for (const personId of getSelfEmployedPeople()) {
    const localSecrets = await loadLocalPersonSecrets(personId);
    if (!Object.keys(localSecrets).length) continue;
    const existing = normalizeSecretRecord(PERSON_SECRET_FIELDS, syncedStore[personId]);
    const merged = {
      ...existing,
      ...localSecrets,
    };
    if (JSON.stringify(existing) !== JSON.stringify(merged)) {
      syncedStore[personId] = merged;
      changed = true;
    }
  }

  if (!changed) return;

  const writeResult = await writeSyncedPersonSecretsStore(syncedStore);
  if (writeResult.ok) {
    await persistDesktopData();
  }
}

async function syncWorkspaceNow(force = false) {
  if (!window.alignedDesktop?.isDesktop || !state.activeUser || !state.activePassword) return;
  const result = await persistDesktopData({ force });
  if (result?.ok) {
    setSaveState(elements.settingsSaveState, force ? "Cloud workspace overwritten from this machine" : "Workspace saved");
  } else if (result?.message) {
    setSaveState(elements.settingsSaveState, result.message);
  }
  return result;
}

async function reconnectCloudSync() {
  if (!window.alignedDesktop?.isDesktop || !state.activeUser || !state.activePassword) return;

  state.syncBusy = true;
  refreshSyncSurface();
  const result = await window.alignedDesktop.login({
    username: state.activeUser,
    password: state.activePassword,
  });
  state.syncBusy = false;

  if (!result.ok) {
    setSaveState(elements.settingsSaveState, result.message || "Could not reconnect cloud sync");
    refreshSyncSurface();
    return;
  }

  state.offlineMode = Boolean(result.offline);
  state.syncConflict = false;
  state.syncMessage = result.message || "";
  refreshSyncSurface();

  if (result.offline) {
    setSaveState(elements.settingsSaveState, result.message || "Cloud sync is still unavailable");
    return;
  }

  const syncResult = await syncWorkspaceNow();
  if (!syncResult?.ok) {
    handleSyncResult(syncResult);
    setSaveState(elements.settingsSaveState, syncResult.message || "Cloud connection returned, but sync still needs attention.");
    return;
  }

  setSaveState(elements.settingsSaveState, "Cloud sync reconnected");
}

async function reloadCloudWorkspace() {
  if (!window.alignedDesktop?.isDesktop || !state.activeUser || !state.activePassword) return;

  state.syncBusy = true;
  refreshSyncSurface();
  const result = await window.alignedDesktop.loadData({
    username: state.activeUser,
    password: state.activePassword,
  });
  state.syncBusy = false;

  if (!result.ok) {
    handleSyncResult(result);
    setSaveState(elements.settingsSaveState, result.message || "Could not reload the workspace");
    return;
  }

  applyLoadedWorkspaceData(result.data || {});
  handleSyncResult({
    ok: true,
    source: result.source,
    offline: Boolean(result.offline || result.source === "local"),
    remoteUpdatedAt: result.remoteUpdatedAt || "",
    message: result.offline
      ? result.message || "Reloaded the encrypted local cache."
      : "Reloaded the latest cloud workspace.",
  });
  setSaveState(elements.settingsSaveState, result.offline ? "Reloaded local cache" : "Reloaded cloud copy");
}

async function changeLocalPassword() {
  const formData = new FormData(elements.changePasswordForm);
  const username = String(formData.get("username") || "").trim();
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (newPassword !== confirmPassword) {
    setSaveState(elements.settingsSaveState, "New passwords do not match");
    return;
  }

  if (newPassword.length < 8) {
    setSaveState(elements.settingsSaveState, "Use at least 8 characters");
    return;
  }

  if (window.alignedDesktop?.isDesktop) {
    const result = await window.alignedDesktop.changePassword({
      username,
      currentPassword,
      newPassword,
    });
    if (!result.ok) {
      setSaveState(elements.settingsSaveState, result.message);
      return;
    }
  } else {
    const authConfig = loadLegacyBrowserAuth();
    if (!authConfig || authConfig.username !== username || authConfig.password !== currentPassword) {
      setSaveState(elements.settingsSaveState, "Current credentials are incorrect");
      return;
    }
    localStorage.setItem(
      LEGACY_AUTH_STORAGE_KEY,
      JSON.stringify({ ...authConfig, username, password: newPassword, updatedAt: new Date().toISOString() }),
    );
  }

  state.activeUser = username;
  state.activePassword = newPassword;
  updateActiveUserLabel();
  state.syncMessage = state.supabaseConfigured
    ? "Password updated for local access and Supabase sign-in."
    : "Local password updated.";
  elements.changePasswordForm.reset();
  elements.changePasswordForm.elements.username.value = username;
  recordAuditEvent({
    action: "password-change",
    title: "Password updated",
    entityType: "workspace",
    entityId: username,
    changes: [{ label: "Password", from: "old password", to: "new password" }],
  });
  setSaveState(elements.settingsSaveState, "Password updated");
  refreshSyncSurface();
}

function saveSecuritySettings() {
  state.settings = normalizeSettings({
    ...state.settings,
    security: {
      autoLockMinutes: Math.max(1, Math.min(240, Number(elements.autoLockMinutes?.value || 15))),
      requirePasswordReveal: Boolean(elements.requirePasswordReveal?.checked),
      permissionRole: elements.permissionRole?.value || "owner",
    },
  });
  persistSettings();
  recordAuditEvent({
    action: "security-settings",
    title: "Security settings updated",
    entityType: "workspace",
    entityId: "settings",
    changes: [
      { label: "Auto-lock", from: "previous", to: `${state.settings.security.autoLockMinutes} minutes` },
      { label: "Reveal confirmation", from: "previous", to: state.settings.security.requirePasswordReveal ? "Required" : "Not required" },
      { label: "Role", from: "previous", to: state.settings.security.permissionRole },
    ],
  });
  setSaveState(elements.settingsSaveState, "Security settings saved");
}

async function exportEncryptedBackup() {
  if (!window.alignedDesktop?.isDesktop) {
    setSaveState(elements.settingsSaveState, "Backups are available in the desktop app only");
    return;
  }
  const result = await window.alignedDesktop.exportEncryptedBackup({
    username: state.activeUser,
    password: state.activePassword,
  });
  if (result?.ok) {
    if (elements.backupStatusText) {
      elements.backupStatusText.textContent = `Encrypted backup exported to ${result.filePath}.`;
    }
    recordAuditEvent({
      action: "backup-export",
      title: "Encrypted backup exported",
      entityType: "workspace",
      entityId: "backup",
      changes: [{ label: "Backup file", from: "not exported", to: result.filePath }],
    });
    setSaveState(elements.settingsSaveState, "Encrypted backup exported");
    return;
  }
  setSaveState(elements.settingsSaveState, result?.message || "Backup export cancelled");
}

async function importEncryptedBackup() {
  if (!window.alignedDesktop?.isDesktop) {
    setSaveState(elements.settingsSaveState, "Backup restore is available in the desktop app only");
    return;
  }
  const result = await window.alignedDesktop.importEncryptedBackup({
    username: state.activeUser,
    password: state.activePassword,
  });
  if (result?.ok) {
    applyLoadedWorkspaceData(result.data || {});
    if (elements.backupStatusText) {
      elements.backupStatusText.textContent = `Encrypted backup restored from ${result.filePath}.`;
    }
    recordAuditEvent({
      action: "backup-import",
      title: "Encrypted backup restored",
      entityType: "workspace",
      entityId: "backup",
      changes: [{ label: "Backup file", from: "previous workspace", to: result.filePath }],
    });
    setSaveState(elements.settingsSaveState, "Encrypted backup restored");
    renderAuditLog();
    return;
  }
  setSaveState(elements.settingsSaveState, result?.message || "Backup restore cancelled");
}

async function createCompanyRecord() {
  if (!canEditWorkspace()) {
    setSaveState(elements.createCompanyState, "Your current role cannot create company records.");
    return;
  }
  const formData = new FormData(elements.addCompanyForm);
  const displayName = String(formData.get("displayName") || "").trim();
  const legalName = String(formData.get("legalName") || "").trim();
  const suppliedNumber = String(formData.get("companyNumber") || "").trim();
  const entityType = String(formData.get("entityType") || "").trim();
  const vatRegistration = String(formData.get("vatRegistration") || "").trim();
  const utr = String(formData.get("utr") || "").trim();
  const vatScheme = String(formData.get("vatScheme") || "").trim();
  const yearEndNote = String(formData.get("yearEndNote") || "").trim();
  const contactName = String(formData.get("contactName") || "").trim();
  const contactNote = String(formData.get("contactNote") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const note = String(formData.get("notes") || "").trim();

  if (!displayName) {
    setCompanyWizardStep("identity");
    setSaveState(elements.createCompanyState, "Enter a company name");
    return;
  }

  const companyNumber = suppliedNumber || `CUSTOM-${Date.now()}`;
  if (state.companies.some((company) => company.company_number === companyNumber)) {
    setSaveState(elements.createCompanyState, "Company number already exists");
    return;
  }

  const customCompany = customCompanyDefaults(displayName, companyNumber, note);
  state.customCompanies.unshift(customCompany);
  state.persistedData[CUSTOM_COMPANIES_KEY] = structuredClone(state.customCompanies);
  state.companyRecords[companyNumber] = {
    ...companyDefaults(customCompany),
    displayName,
    legalName: legalName || displayName,
    companyNumber,
    entityType: entityType || "Private limited company",
    vatScheme,
    address,
    generalNotes: [contactName, contactNote, yearEndNote, note].filter(Boolean).join("\n"),
  };

  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  saveRecords(CUSTOM_COMPANIES_KEY, state.customCompanies);
  const secretResult = await saveCompanySecrets(companyNumber, {
    vatRegistration,
    utr,
  });
  if (secretResult?.ok === false && secretResult?.message) {
    setSaveState(elements.createCompanyState, secretResult.message);
    return;
  }
  state.companies = [...state.customCompanies, ...state.companies.filter((company) => !company.isCustom)];
  filterCompanies(elements.companySearch.value);
  elements.addCompanyForm.reset();
  setCompanyWizardStep("identity");
  state.selectedPersonId = null;
  state.selectedCompanyId = companyNumber;
  renderStats();
  renderCompanyList();
  renderSelfEmployedList();
  renderCompanyPanel();
  recordAuditEvent({
    action: "company-create",
    title: `Created ${displayName}`,
    entityType: "company",
    entityId: companyNumber,
    changes: [{ label: "Record", from: "not present", to: displayName }],
  });
  setSaveState(elements.createCompanyState, `Created ${displayName}`);
}

async function createPersonRecord() {
  if (!canEditWorkspace()) {
    setSaveState(elements.createPersonState, "Your current role cannot create self employed records.");
    return;
  }
  const formData = new FormData(elements.addPersonForm);
  const fullName = String(formData.get("fullName") || "").trim();
  const tradingName = String(formData.get("tradingName") || "").trim();
  const utr = String(formData.get("utr") || "").trim();
  const nino = String(formData.get("nino") || "").trim();
  const gatewayId = String(formData.get("gatewayId") || "").trim();
  const gatewayPassword = String(formData.get("gatewayPassword") || "").trim();
  const dateOfBirth = String(formData.get("dateOfBirth") || "").trim();
  const nationality = String(formData.get("nationality") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!fullName) {
    setPersonWizardStep("identity");
    setSaveState(elements.createPersonState, "Enter a full name");
    return;
  }

  if (getSelfEmployedPeople().includes(fullName)) {
    setSaveState(elements.createPersonState, "That self employed record already exists");
    return;
  }

  state.customPeople.unshift(fullName);
  state.persistedData[CUSTOM_PEOPLE_KEY] = structuredClone(state.customPeople);
  state.personRecords[fullName] = {
    ...personDefaults(fullName),
    tradingName,
    dateOfBirth,
    nationality,
    address,
    notes,
  };

  saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  saveRecords(CUSTOM_PEOPLE_KEY, state.customPeople);
  const secretResult = await savePersonSecrets(fullName, {
    utr,
    nino,
    gatewayId,
    gatewayPassword,
  });
  if (secretResult?.ok === false && secretResult?.message) {
    setSaveState(elements.createPersonState, secretResult.message);
    return;
  }
  elements.addPersonForm.reset();
  setPersonWizardStep("identity");
  renderStats();
  renderCompanyList();
  renderSelfEmployedList();
  openPersonRecord(fullName);
  recordAuditEvent({
    action: "person-create",
    title: `Created ${fullName}`,
    entityType: "person",
    entityId: fullName,
    changes: [{ label: "Record", from: "not present", to: fullName }],
  });
  setSaveState(elements.createPersonState, `Created ${fullName}`);
}

function filterCompanies(query) {
  state.companyFilters.query = query;
  const lowered = query.trim().toLowerCase();
  const archiveFilter = state.companyFilters.archive || "active";
  const sourceCompanies = archiveFilter === "archived"
    ? getArchivedCompanies()
    : archiveFilter === "all"
      ? state.companies
      : getActiveCompanies();

  state.filteredCompanies = sourceCompanies.filter((company) => {
    const record = getCompanyRecord(company.company_number);
    const matchesSearch = (
      record.displayName.toLowerCase().includes(lowered) ||
      record.companyNumber.toLowerCase().includes(lowered) ||
      record.legalName.toLowerCase().includes(lowered)
    );
    const matchesStatus = state.companyFilters.status === "all"
      || String(record.companyStatus || "").toLowerCase() === state.companyFilters.status;
    const matchesBookkeeping = state.companyFilters.bookkeeping === "all"
      || String(normalizeWorkflow(record.workflow).bookkeepingStatus || "").toLowerCase() === state.companyFilters.bookkeeping;
    return matchesSearch && matchesStatus && matchesBookkeeping;
  });
  renderCompanyList();
}

function initializeRecords(data) {
  state.summary = {
    ...data.summary,
    transaction_csv_file_count: 0,
    years_present: {},
  };
  state.companyRecords = loadSavedRecords(COMPANY_STORAGE_KEY);
  state.personRecords = loadSavedRecords(PERSON_STORAGE_KEY);
  state.settings = normalizeSettings(loadSavedRecords(SETTINGS_STORAGE_KEY));
  state.auditLog = Array.isArray(state.persistedData[AUDIT_LOG_STORAGE_KEY]) ? state.persistedData[AUDIT_LOG_STORAGE_KEY] : [];
  state.customCompanies = state.persistedData[CUSTOM_COMPANIES_KEY] || [];
  state.customPeople = state.persistedData[CUSTOM_PEOPLE_KEY] || [];

  state.customCompanies = state.customCompanies.map((company) => sanitizeCompanyData(company));
  const importedCompanies = data.companies.map((company) => sanitizeCompanyData(company));
  const legacyOnlyCompanies = buildLegacyOnlyCompanies([...state.customCompanies, ...importedCompanies]);
  state.companies = [...state.customCompanies, ...legacyOnlyCompanies, ...importedCompanies];
  state.companies.forEach((company) => {
    state.companyRecords[company.company_number] ??= companyDefaults(company);
    state.companyRecords[company.company_number] = normalizeArchivedState(state.companyRecords[company.company_number]);
    state.companyRecords[company.company_number] = applyLegacyCompanyBackfill(
      company.company_number,
      state.companyRecords[company.company_number],
    );
    state.companyRecords[company.company_number].bankImports ??= [];
    state.companyRecords[company.company_number].workflow = normalizeWorkflow(
      state.companyRecords[company.company_number].workflow,
    );
    state.companyRecords[company.company_number].accountingOverrides = normalizeAccountingOverrides(
      state.companyRecords[company.company_number].accountingOverrides,
    );
  });
  getSelfEmployedPeople().forEach((person) => {
    state.personRecords[person] ??= personDefaults(person);
    state.personRecords[person] = normalizeArchivedState(state.personRecords[person]);
  });

  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  saveRecords(SETTINGS_STORAGE_KEY, state.settings);
  state.filteredCompanies = getActiveCompanies();
  state.selectedCompanyId = getActiveCompanies()[0]?.company_number || null;
  refreshSyncSurface();
}

function bindEvents() {
  bindCompanyTabs();

  elements.companySearch.addEventListener("input", (event) => {
    filterCompanies(event.target.value);
  });
  elements.companyStatusFilter?.addEventListener("change", (event) => {
    state.companyFilters.status = event.target.value;
    filterCompanies(elements.companySearch.value);
  });
  elements.companyBookkeepingFilter?.addEventListener("change", (event) => {
    state.companyFilters.bookkeeping = event.target.value;
    filterCompanies(elements.companySearch.value);
  });
  elements.companyArchiveFilter?.addEventListener("change", (event) => {
    state.companyFilters.archive = event.target.value;
    filterCompanies(elements.companySearch.value);
  });

  elements.addCompanyButton.addEventListener("click", showNewCompanyPanel);
  elements.addSelfEmployedButton.addEventListener("click", showNewPersonPanel);
  elements.homeButton.addEventListener("click", showHomePanel);
  elements.companiesButton.addEventListener("click", () => openFirstCompany());
  elements.selfEmployedButton.addEventListener("click", openFirstSelfEmployed);
  elements.settingsButton.addEventListener("click", showSettingsPanel);
  elements.mastheadHomeButton.addEventListener("click", showHomePanel);
  elements.mastheadCompaniesButton.addEventListener("click", () => openFirstCompany());
  elements.quickOpenCompanyButton.addEventListener("click", () => openFirstCompany());
  elements.quickOpenSelfButton.addEventListener("click", openFirstSelfEmployed);
  elements.homeRouteCompanies.addEventListener("click", () => openFirstCompany());
  elements.homeRouteSelf.addEventListener("click", openFirstSelfEmployed);
  elements.homeRouteImport.addEventListener("click", () => openFirstCompany("company-bank-import"));
  elements.homeRouteSettings.addEventListener("click", showSettingsPanel);
  elements.homeLinkButtons.forEach((button) => button.addEventListener("click", showHomePanel));
  document.querySelectorAll("[data-copy-field]").forEach((button) => {
    button.addEventListener("click", () => {
      const [scope, fieldName] = String(button.dataset.copyField || "").split(":");
      if (!scope || !fieldName) return;
      copyFieldValue(scope, fieldName);
    });
  });
  document.querySelectorAll("[data-reveal-field]").forEach((button) => {
    button.addEventListener("click", () => {
      const [scope, fieldName] = String(button.dataset.revealField || "").split(":");
      if (!scope || !fieldName) return;
      toggleSensitiveField(scope, fieldName, button);
    });
  });
  elements.openLoginButton?.addEventListener("click", () => showAuth(false));
  elements.openSetupButton?.addEventListener("click", () => showAuth(true));
  elements.companyWizardSteps.forEach((button) => {
    button.addEventListener("click", () => setCompanyWizardStep(button.dataset.companyStep));
  });
  elements.companyWizardBack.addEventListener("click", () => moveCompanyWizard(-1));
  elements.companyWizardNext.addEventListener("click", () => moveCompanyWizard(1));
  elements.personWizardSteps.forEach((button) => {
    button.addEventListener("click", () => setPersonWizardStep(button.dataset.personStep));
  });
  elements.personWizardBack.addEventListener("click", () => movePersonWizard(-1));
  elements.personWizardNext.addEventListener("click", () => movePersonWizard(1));
  elements.createCompanyButton.addEventListener("click", createCompanyRecord);
  elements.createPersonButton.addEventListener("click", createPersonRecord);
  elements.createAccessButton.addEventListener("click", createLocalAccess);
  elements.loginButton.addEventListener("click", loginLocalAccess);
  elements.resetAccessButton.addEventListener("click", resetLocalAccess);
  elements.logoutButton.addEventListener("click", lockWorkspace);
  elements.changePasswordButton.addEventListener("click", changeLocalPassword);
  elements.saveSecuritySettingsButton?.addEventListener("click", saveSecuritySettings);
  elements.exportBackupButton?.addEventListener("click", () => {
    void exportEncryptedBackup();
  });
  elements.importBackupButton?.addEventListener("click", () => {
    void importEncryptedBackup();
  });
  elements.checkUpdatesButton?.addEventListener("click", () => {
    void checkForUpdatesNow();
  });
  elements.installUpdateButton?.addEventListener("click", () => {
    void installDownloadedUpdate();
  });
  elements.reconnectCloudButton?.addEventListener("click", () => {
    void reconnectCloudSync();
  });
  elements.reloadRemoteButton?.addEventListener("click", () => {
    void reloadCloudWorkspace();
  });
  elements.overwriteRemoteButton?.addEventListener("click", () => {
    void syncWorkspaceNow(true);
  });
  elements.saveCompanyButton.addEventListener("click", applyCompanyEdits);
  elements.resetCompanyButton.addEventListener("click", resetCurrentCompanyView);
  elements.archiveCompanyButton.addEventListener("click", archiveSelectedCompany);
  elements.importBankStatementButton.addEventListener("click", importBankStatement);
  elements.bankStatementFile.addEventListener("change", updateBankStatementFileName);
  elements.bankEntrySearch?.addEventListener("input", (event) => {
    state.bankFilters.search = event.target.value;
    const company = getSelectedCompany();
    if (company) renderBankImports(getCompanyRecord(company.company_number));
  });
  elements.bankReviewFilter?.addEventListener("change", (event) => {
    state.bankFilters.review = event.target.value;
    const company = getSelectedCompany();
    if (company) renderBankImports(getCompanyRecord(company.company_number));
  });
  elements.bankReconciledFilter?.addEventListener("change", (event) => {
    state.bankFilters.reconciled = event.target.value;
    const company = getSelectedCompany();
    if (company) renderBankImports(getCompanyRecord(company.company_number));
  });
  elements.exportCompanyDetailsCsvButton?.addEventListener("click", () => {
    void exportCompanySection("details", "csv");
  });
  elements.exportCompanyDetailsPdfButton?.addEventListener("click", () => {
    void exportCompanySection("details", "pdf");
  });
  elements.exportBankActivityCsvButton?.addEventListener("click", () => {
    void exportCompanySection("bank", "csv");
  });
  elements.exportBankActivityPdfButton?.addEventListener("click", () => {
    void exportCompanySection("bank", "pdf");
  });
  elements.exportVatCsvButton?.addEventListener("click", () => {
    void exportCompanySection("vat", "csv");
  });
  elements.exportVatPdfButton?.addEventListener("click", () => {
    void exportCompanySection("vat", "pdf");
  });
  elements.exportBalanceCsvButton?.addEventListener("click", () => {
    void exportCompanySection("balance", "csv");
  });
  elements.exportBalancePdfButton?.addEventListener("click", () => {
    void exportCompanySection("balance", "pdf");
  });
  elements.savePersonButton.addEventListener("click", applyPersonEdits);
  elements.resetPersonButton.addEventListener("click", resetCurrentPersonView);
  elements.archivePersonButton.addEventListener("click", archiveSelectedPerson);

  if (window.alignedDesktop?.onUpdateStatus && !state.removeUpdateListener) {
    state.removeUpdateListener = window.alignedDesktop.onUpdateStatus((payload) => {
      handleUpdateState(payload);
    });
  }

  elements.setupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createLocalAccess();
  });
  updateBankStatementFileName();

  elements.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginLocalAccess();
  });

  elements.changePasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    changeLocalPassword();
  });

  elements.addCompanyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createCompanyRecord();
  });

  elements.addPersonForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createPersonRecord();
  });

  ["click", "keydown", "pointerdown"].forEach((eventName) => {
    document.addEventListener(eventName, () => {
      noteActivityReset();
    }, true);
  });
}

async function loadApp() {
  const data = window.APP_DATA;
  if (!data) {
    throw new Error("Run scripts/analyze_export.py to regenerate app/dashboard-data.js.");
  }

  initializeRecords(data);
  bindEvents();
  hardenSensitiveInputs();
  setCompanyWizardStep("identity");
  setPersonWizardStep("identity");
  renderHeader(data);
  renderStats();
  renderCompanyList();
  renderSelfEmployedList();
  renderArchivedRecords();
  refreshSyncSurface();
  await hydrateDesktopMeta();
  if (window.alignedDesktop?.isDesktop) {
    const status = await window.alignedDesktop.authStatus();
    state.supabaseConfigured = Boolean(status.configured);
    state.appMeta = {
      ...(state.appMeta || {}),
      configured: status.configured,
      hasExternalConfig: Boolean(status.hasExternalConfig),
    };
    refreshAboutSurface();
    showAuth(status.configured ? false : !status.hasAccess);
    if (status.rememberedUsername || status.username) {
      elements.loginForm.elements.username.value = status.rememberedUsername || status.username;
    }
    if (status.username && elements.changePasswordForm) {
      elements.changePasswordForm.elements.username.value = status.username;
    }
    if (status.canAutoLogin) {
      const autoOpened = await tryAutoLogin();
      if (autoOpened) return;
    }
    return;
  }

  const authConfig = loadLegacyBrowserAuth();
  showAuth(!authConfig?.username);
  refreshSyncSurface();
}

try {
  void loadApp();
} catch (error) {
  elements.emptyState.classList.remove("hidden");
  elements.emptyState.innerHTML = `
    <p class="section-kicker">Dashboard unavailable</p>
    <h2>App data could not be loaded.</h2>
    <p>${error.message}</p>
  `;
}
