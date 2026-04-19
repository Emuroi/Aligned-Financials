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
};

const LEGACY_PROFILES = {
  "08564152": {
    displayName: "Urban Management Solutions Limited",
    legalName: "Urban Management Solutions Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "11.06.2013",
    registrationCountry: "England",
    vatRegistration: "316543708",
    vatScheme: "Cash Quarterly",
    bankAccount: "HSBC (GBP)",
    address: "3 Bailey Mews, London, England, W4 3PZ",
    industries: "62090 - Other information technology service activities\n78109 - Other activities of employment placement agencies",
    utr: "",
    payeReference: "",
    accountOfficeReference: "",
    deadlines: {
      vatDue: "",
      yearEnd: "",
      confirmation: "",
      accountsDue: "",
    },
    generalNotes: "",
  },
  "12011913": {
    displayName: "Mooseberry Tech Ltd",
    legalName: "Mooseberry Tech Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "22.05.2019",
    registrationCountry: "England",
    vatRegistration: "327642007",
    vatScheme: "Cash Quarterly",
    bankAccount: "Barclays savings account (GBP)\nBarclays (GBP)",
    address: "9 Marina Place\nOld Bridge St\nHampton Wick\nUnited Kingdom\nKT1 4BH",
    industries: "62020 - Information technology consultancy activities",
    utr: "",
    payeReference: "",
    accountOfficeReference: "",
    deadlines: {
      vatDue: "",
      yearEnd: "",
      confirmation: "",
      accountsDue: "",
    },
    generalNotes: "",
  },
  "10534265": {
    displayName: "Malja Construction Limited",
    legalName: "Malja Construction Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "21.12.2016",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "HSBC savings account (GBP)\nHSBC (GBP)",
    address: "3 Bailey Mews\nLondon\nUnited Kingdom\nW4 3PZ",
    industries: "43110 - Demolition\n43290 - Other construction installation\n43390 - Other building completion and finishing",
    utr: "",
    payeReference: "",
    accountOfficeReference: "",
    deadlines: {
      vatDue: "",
      yearEnd: "",
      confirmation: "",
      accountsDue: "",
    },
    generalNotes: "",
  },
};

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

const state = {
  companies: [],
  filteredCompanies: [],
  selectedCompanyId: null,
  selectedPersonId: null,
  companyRecords: {},
  personRecords: {},
  summary: null,
};

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

const number = new Intl.NumberFormat("en-GB");

const elements = {
  stats: document.getElementById("stats"),
  zipPath: document.getElementById("zipPath"),
  generatedAt: document.getElementById("generatedAt"),
  companySearch: document.getElementById("companySearch"),
  companyList: document.getElementById("companyList"),
  selfEmployedList: document.getElementById("selfEmployedList"),
  homePanel: document.getElementById("homePanel"),
  emptyState: document.getElementById("emptyState"),
  companyPanel: document.getElementById("companyPanel"),
  selfEmployedPanel: document.getElementById("selfEmployedPanel"),
  homeButton: document.getElementById("homeButton"),
  companiesButton: document.getElementById("companiesButton"),
  selfEmployedButton: document.getElementById("selfEmployedButton"),
  mastheadHomeButton: document.getElementById("mastheadHomeButton"),
  mastheadCompaniesButton: document.getElementById("mastheadCompaniesButton"),
  quickOpenCompanyButton: document.getElementById("quickOpenCompanyButton"),
  quickOpenSelfButton: document.getElementById("quickOpenSelfButton"),
  homeRouteCompanies: document.getElementById("homeRouteCompanies"),
  homeRouteSelf: document.getElementById("homeRouteSelf"),
  homeRouteImport: document.getElementById("homeRouteImport"),
  homeRouteWorkflow: document.getElementById("homeRouteWorkflow"),
  companyName: document.getElementById("companyName"),
  companyNumber: document.getElementById("companyNumber"),
  saveCompanyButton: document.getElementById("saveCompanyButton"),
  resetCompanyButton: document.getElementById("resetCompanyButton"),
  savePersonButton: document.getElementById("savePersonButton"),
  resetPersonButton: document.getElementById("resetPersonButton"),
  signalBar: document.getElementById("signalBar"),
  profileList: document.getElementById("profileList"),
  companyDetailsForm: document.getElementById("companyDetailsForm"),
  companyImportSummary: document.getElementById("companyImportSummary"),
  companyStatusSummary: document.getElementById("companyStatusSummary"),
  workflowSummary: document.getElementById("workflowSummary"),
  workflowTableBody: document.getElementById("workflowTableBody"),
  bankAccountLabel: document.getElementById("bankAccountLabel"),
  bankStatementFile: document.getElementById("bankStatementFile"),
  bankImportNotes: document.getElementById("bankImportNotes"),
  importBankStatementButton: document.getElementById("importBankStatementButton"),
  bankImportSummary: document.getElementById("bankImportSummary"),
  bankImportEmpty: document.getElementById("bankImportEmpty"),
  bankStatementList: document.getElementById("bankStatementList"),
  companyGeneralNotes: document.getElementById("companyGeneralNotes"),
  deadlineVatDue: document.getElementById("deadlineVatDue"),
  deadlineYearEnd: document.getElementById("deadlineYearEnd"),
  deadlineConfirmation: document.getElementById("deadlineConfirmation"),
  deadlineAccountsDue: document.getElementById("deadlineAccountsDue"),
  selfPersonName: document.getElementById("selfPersonName"),
  personDetailsForm: document.getElementById("personDetailsForm"),
  selfNotes: document.getElementById("selfNotes"),
  companySaveState: document.getElementById("companySaveState"),
  personSaveState: document.getElementById("personSaveState"),
  homeLinkButtons: Array.from(document.querySelectorAll(".home-link-button")),
  companyTabs: Array.from(document.querySelectorAll(".tab[data-view]")),
  companyViews: Array.from(document.querySelectorAll("#companyPanel .view-panel")),
};

function loadSavedRecords(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function saveRecords(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function companyDefaults(company) {
  const legacy = LEGACY_PROFILES[company.company_number] || {};
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
    gatewayId: "",
    gatewayPassword: "",
    bankAccount: legacy.bankAccount || "",
    address: legacy.address || "",
    industries: legacy.industries || "",
    deadlines: {
      vatDue: legacy.deadlines?.vatDue || "",
      yearEnd: legacy.deadlines?.yearEnd || "",
      confirmation: legacy.deadlines?.confirmation || "",
      accountsDue: legacy.deadlines?.accountsDue || "",
    },
    generalNotes: legacy.generalNotes || "",
    workflow: {},
    bankImports: [],
  };
}

function personDefaults(fullName) {
  return {
    id: fullName,
    fullName,
    tradingName: "",
    utr: "",
    nino: "",
    dateOfBirth: "",
    nationality: "",
    gatewayId: "",
    gatewayPassword: "",
    address: "",
    notes: "",
  };
}

function getCompanyRecord(companyId) {
  return state.companyRecords[companyId];
}

function getSelectedCompany() {
  return state.companies.find((company) => company.company_number === state.selectedCompanyId) || null;
}

function getSelectedPersonRecord() {
  return state.personRecords[state.selectedPersonId] || null;
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
    vatRegistration: String(formData.get("vatRegistration") || ""),
    vatScheme: String(formData.get("vatScheme") || ""),
    utr: String(formData.get("utr") || ""),
    payeReference: String(formData.get("payeReference") || ""),
    accountOfficeReference: String(formData.get("accountOfficeReference") || ""),
    companiesHouseCode: String(formData.get("companiesHouseCode") || ""),
    gatewayId: String(formData.get("gatewayId") || ""),
    gatewayPassword: String(formData.get("gatewayPassword") || ""),
    bankAccount: String(formData.get("bankAccount") || ""),
    address: String(formData.get("address") || ""),
    industries: String(formData.get("industries") || ""),
    deadlines: {
      vatDue: elements.deadlineVatDue.value.trim(),
      yearEnd: elements.deadlineYearEnd.value.trim(),
      confirmation: elements.deadlineConfirmation.value.trim(),
      accountsDue: elements.deadlineAccountsDue.value.trim(),
    },
    generalNotes: elements.companyGeneralNotes.value.trim(),
  };
}

function collectPersonFormData() {
  const formData = new FormData(elements.personDetailsForm);
  return {
    fullName: String(formData.get("fullName") || ""),
    tradingName: String(formData.get("tradingName") || ""),
    utr: String(formData.get("utr") || ""),
    nino: String(formData.get("nino") || ""),
    dateOfBirth: String(formData.get("dateOfBirth") || ""),
    nationality: String(formData.get("nationality") || ""),
    gatewayId: String(formData.get("gatewayId") || ""),
    gatewayPassword: String(formData.get("gatewayPassword") || ""),
    address: String(formData.get("address") || ""),
    notes: String(formData.get("notes") || ""),
  };
}

function updateCompanyRecordField(companyId, updater) {
  const current = structuredClone(state.companyRecords[companyId]);
  updater(current);
  state.companyRecords[companyId] = current;
  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
}

function renderHeader(data) {
  elements.zipPath.textContent = data.summary.zip_path;
  elements.generatedAt.textContent = `Generated ${new Date(data.generated_at).toLocaleString("en-GB")}`;
}

function renderStats() {
  const summary = state.summary;
  const cards = [
    ["Companies", number.format(summary.distinct_company_numbers), "Recovered company records available"],
    ["Self employed", number.format(SELF_EMPLOYED_PEOPLE.length), "Separate personal records available"],
    ["Transaction files", number.format(summary.transaction_csv_file_count), "Imported CSV batches"],
    ["Coverage", Object.keys(summary.years_present).join(" - "), "Detected archive activity range"],
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
  elements.companyList.innerHTML = state.filteredCompanies
    .map((company) => {
      const record = getCompanyRecord(company.company_number);
      const active = state.selectedCompanyId === company.company_number ? "active" : "";
      return `
        <button class="company-button ${active}" data-company="${company.company_number}">
          <strong>${record.displayName}</strong>
          <span>${record.companyNumber}</span>
          <span>${number.format(company.csv_file_count)} files | ${number.format(company.row_count)} rows</span>
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
  elements.selfEmployedList.innerHTML = SELF_EMPLOYED_PEOPLE
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
      state.selectedCompanyId = null;
      state.selectedPersonId = button.dataset.person;
      renderCompanyList();
      renderSelfEmployedList();
      renderSelfEmployedPanel();
    });
  });
}

function hideAllPanels() {
  elements.homePanel.classList.add("hidden");
  elements.emptyState.classList.add("hidden");
  elements.companyPanel.classList.add("hidden");
  elements.selfEmployedPanel.classList.add("hidden");
}

function updatePrimaryNav(active) {
  [
    ["home", elements.homeButton],
    ["companies", elements.companiesButton],
    ["self", elements.selfEmployedButton],
  ].forEach(([key, button]) => {
    button.classList.toggle("active", key === active);
  });
}

function showHomePanel() {
  hideAllPanels();
  elements.homePanel.classList.remove("hidden");
  updatePrimaryNav("home");
}

function renderSignalBar(company, record) {
  const firstFile = company.files[0];
  const lastFile = company.files[company.files.length - 1];
  const signals = [
    ["Display name", record.displayName || company.company_number, "Live saved company label"],
    ["Imported files", `${company.csv_file_count} file batches`, "Recovered file groups for this record"],
    ["Earliest trace", firstFile?.first_date || "Not available", "First dated entry seen in the archive"],
    ["Latest trace", lastFile?.last_date || "Not available", "Latest dated entry seen in the archive"],
  ];

  elements.signalBar.innerHTML = signals
    .map(
      ([title, value, note]) => `
        <article class="signal-card">
          <p class="signal-title">${title}</p>
          <p class="signal-value">${value}</p>
          <p class="signal-note">${note}</p>
        </article>
      `,
    )
    .join("");
}

function renderCompanyOverview(company, record) {
  elements.profileList.innerHTML = [
    ["Display name", record.displayName || ""],
    ["Legal name", record.legalName || ""],
    ["Company number", record.companyNumber || ""],
    ["Company status", record.companyStatus || "Not confirmed"],
    ["VAT scheme", record.vatScheme || "Not set"],
    ["Source files", number.format(company.csv_file_count)],
    ["Imported rows", number.format(company.row_count)],
  ]
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join("");

  elements.deadlineVatDue.value = record.deadlines.vatDue;
  elements.deadlineYearEnd.value = record.deadlines.yearEnd;
  elements.deadlineConfirmation.value = record.deadlines.confirmation;
  elements.deadlineAccountsDue.value = record.deadlines.accountsDue;
}

function renderCompanyDetails(company, record) {
  elements.companyDetailsForm.elements.displayName.value = record.displayName;
  elements.companyDetailsForm.elements.legalName.value = record.legalName;
  elements.companyDetailsForm.elements.companyNumber.value = record.companyNumber;
  elements.companyDetailsForm.elements.entityType.value = record.entityType;
  elements.companyDetailsForm.elements.companyStatus.value = record.companyStatus;
  elements.companyDetailsForm.elements.registrationDate.value = record.registrationDate;
  elements.companyDetailsForm.elements.registrationCountry.value = record.registrationCountry;
  elements.companyDetailsForm.elements.vatRegistration.value = record.vatRegistration;
  elements.companyDetailsForm.elements.vatScheme.value = record.vatScheme;
  elements.companyDetailsForm.elements.utr.value = record.utr;
  elements.companyDetailsForm.elements.payeReference.value = record.payeReference;
  elements.companyDetailsForm.elements.accountOfficeReference.value = record.accountOfficeReference;
  elements.companyDetailsForm.elements.companiesHouseCode.value = record.companiesHouseCode;
  elements.companyDetailsForm.elements.gatewayId.value = record.gatewayId;
  elements.companyDetailsForm.elements.gatewayPassword.value = record.gatewayPassword;
  elements.companyDetailsForm.elements.bankAccount.value = record.bankAccount;
  elements.companyDetailsForm.elements.address.value = record.address;
  elements.companyDetailsForm.elements.industries.value = record.industries;

  elements.companyImportSummary.textContent =
    `${company.csv_file_count} file batches and ${number.format(company.row_count)} imported rows are currently attached to this company.`;
  elements.companyStatusSummary.textContent =
    `This company record is editable and saved locally. Update legal, tax, bank, address, and compliance details as you rebuild the software around the handover data.`;
}

function renderCompanyWorkflow(company, record) {
  const workflowEntries = company.files.map((file) => {
    const saved = record.workflow[file.path] || {
      status: defaultWorkflowStatus(file),
      note: "",
    };
    return { file, saved };
  });

  const reconciledCount = workflowEntries.filter((entry) => entry.saved.status === "reconciled").length;
  elements.workflowSummary.textContent =
    `${reconciledCount} of ${workflowEntries.length} imported file batches are currently marked as reconciled.`;

  elements.workflowTableBody.innerHTML = workflowEntries
    .map(
      ({ file, saved }) => `
        <tr>
          <td>
            <strong>${file.year} / ${file.month}</strong>
            <span class="path-cell">${file.path}</span>
          </td>
          <td>${number.format(file.row_count)}</td>
          <td class="${amountClass(file.amount_total)}">${formatCurrency(file.amount_total)}</td>
          <td>
            <select class="status-select" data-file-path="${escapeAttribute(file.path)}">
              ${renderStatusOptions(saved.status)}
            </select>
          </td>
          <td>
            <input class="notes-input" data-file-note="${escapeAttribute(file.path)}" type="text" value="${escapeAttribute(saved.note)}" placeholder="Review note">
          </td>
        </tr>
      `,
    )
    .join("");

  elements.workflowTableBody.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", () => {
      updateCompanyRecordField(state.selectedCompanyId, (recordState) => {
        recordState.workflow[select.dataset.filePath] ??= { status: "", note: "" };
        recordState.workflow[select.dataset.filePath].status = select.value;
      });
      renderCompanyWorkflow(company, getCompanyRecord(state.selectedCompanyId));
    });
  });

  elements.workflowTableBody.querySelectorAll(".notes-input").forEach((input) => {
    input.addEventListener("change", () => {
      updateCompanyRecordField(state.selectedCompanyId, (recordState) => {
        recordState.workflow[input.dataset.fileNote] ??= { status: "", note: "" };
        recordState.workflow[input.dataset.fileNote].note = input.value.trim();
      });
    });
  });
}

function renderCompanyNotes(record) {
  elements.companyGeneralNotes.value = record.generalNotes;
}

function renderBankImportSummary(record) {
  const imports = record.bankImports || [];
  const entries = imports.flatMap((statement) => statement.entries || []);
  const moneyIn = entries.reduce((sum, entry) => sum + (entry.moneyIn || 0), 0);
  const moneyOut = entries.reduce((sum, entry) => sum + (entry.moneyOut || 0), 0);
  const cards = [
    ["Statements", number.format(imports.length), "Imported CSV files for this company"],
    ["Rows", number.format(entries.length), "Normalized statement lines saved locally"],
    ["Money in", formatCurrency(moneyIn), "Positive or credit values detected"],
    ["Money out", formatCurrency(moneyOut), "Negative or debit values detected"],
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
  const imports = record.bankImports || [];
  renderBankImportSummary(record);

  elements.bankImportEmpty.textContent = imports.length
    ? ""
    : "No bank statements imported yet for this company.";

  elements.bankStatementList.innerHTML = imports
    .map((statement) => {
      const previewRows = statement.entries.slice(0, 12);
      return `
        <article class="statement-card">
          <div class="statement-head">
            <div>
              <h4>${escapeHtml(statement.accountLabel || "Imported statement")}</h4>
              <p class="statement-meta">
                ${escapeHtml(statement.fileName)} | Imported ${escapeHtml(
                  new Date(statement.importedAt).toLocaleString("en-GB"),
                )}${statement.note ? ` | ${escapeHtml(statement.note)}` : ""}
              </p>
            </div>
            <div class="statement-actions">
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
          </div>
          <div class="statement-preview">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Money In</th>
                  <th>Money Out</th>
                  <th>Direction</th>
                </tr>
              </thead>
              <tbody>
                ${previewRows
                  .map(
                    (entry) => `
                      <tr>
                        <td>${escapeHtml(entry.date || "")}</td>
                        <td>${escapeHtml(entry.description || "")}</td>
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
          </div>
        </article>
      `;
    })
    .join("");

  elements.bankStatementList.querySelectorAll("[data-remove-statement]").forEach((button) => {
    button.addEventListener("click", () => {
      removeBankStatement(button.dataset.removeStatement);
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
  renderCompanyWorkflow(company, record);
  renderBankImports(record);
  renderCompanyNotes(record);
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

  elements.personDetailsForm.elements.fullName.value = person.fullName;
  elements.personDetailsForm.elements.tradingName.value = person.tradingName;
  elements.personDetailsForm.elements.utr.value = person.utr;
  elements.personDetailsForm.elements.nino.value = person.nino;
  elements.personDetailsForm.elements.dateOfBirth.value = person.dateOfBirth;
  elements.personDetailsForm.elements.nationality.value = person.nationality;
  elements.personDetailsForm.elements.gatewayId.value = person.gatewayId;
  elements.personDetailsForm.elements.gatewayPassword.value = person.gatewayPassword;
  elements.personDetailsForm.elements.address.value = person.address;
  elements.personDetailsForm.elements.notes.value = person.notes;

  elements.selfNotes.innerHTML = `
    <article class="note-card">
      <h4>Separate workflow</h4>
      <p>Self employed records sit outside the limited company workspace and can carry their own tax, identity, and notes profile.</p>
    </article>
    <article class="note-card">
      <h4>Editable record</h4>
      <p>Use this page to maintain the person details you need for the rebuild, then click \`Save person\`.</p>
    </article>
    <article class="note-card">
      <h4>Next build path</h4>
      <p>The next product step can add sole trader expenses, submissions, and year summaries here without mixing them into company records.</p>
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
      return {
        id: `entry-${index + 1}`,
        date: dateKey ? row[dateKey] : "",
        description: descriptionKey ? row[descriptionKey] : "",
        amount,
        moneyIn: amount > 0 ? Math.abs(amount) : moneyIn,
        moneyOut: amount < 0 ? Math.abs(amount) : moneyOut,
        direction,
      };
    })
    .filter((entry) => entry.date || entry.description || entry.amount || entry.moneyIn || entry.moneyOut);
}

function summarizeStatement(entries) {
  return entries.reduce(
    (summary, entry) => {
      summary.rowCount += 1;
      summary.moneyIn += entry.moneyIn || 0;
      summary.moneyOut += entry.moneyOut || 0;
      if (entry.direction === "in") summary.positiveCount += 1;
      if (entry.direction === "out") summary.negativeCount += 1;
      if (entry.direction === "zero") summary.zeroCount += 1;
      return summary;
    },
    {
      rowCount: 0,
      moneyIn: 0,
      moneyOut: 0,
      positiveCount: 0,
      negativeCount: 0,
      zeroCount: 0,
    },
  );
}

async function importBankStatement() {
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
    renderCompanyPanel("company-bank-import");
    setSaveState(elements.companySaveState, `Imported ${file.name}`);
  } catch (error) {
    setSaveState(elements.companySaveState, error.message);
  }
}

function removeBankStatement(statementId) {
  const company = getSelectedCompany();
  if (!company) return;

  updateCompanyRecordField(company.company_number, (recordState) => {
    recordState.bankImports = (recordState.bankImports || []).filter((statement) => statement.id !== statementId);
  });

  renderCompanyPanel("company-bank-import");
  setSaveState(elements.companySaveState, "Statement removed");
}

function defaultWorkflowStatus(file) {
  if (Math.abs(file.amount_total) > 0 || Math.abs(file.paid_in_total) > 0 || Math.abs(file.paid_out_total) > 0) {
    return "reconciled";
  }
  return "unreconciled";
}

function renderStatusOptions(current) {
  const statuses = [
    ["unreconciled", "Unreconciled"],
    ["reconciled", "Reconciled"],
    ["hold", "On Hold"],
    ["archived", "Archived"],
  ];
  return statuses
    .map(([value, label]) => `<option value="${value}" ${value === current ? "selected" : ""}>${label}</option>`)
    .join("");
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

function applyCompanyEdits() {
  const company = getSelectedCompany();
  if (!company) return;

  const current = getCompanyRecord(company.company_number);
  const edits = collectCompanyFormData();
  state.companyRecords[company.company_number] = {
    ...current,
    ...edits,
    companyNumber: edits.companyNumber || company.company_number,
  };
  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  renderCompanyList();
  renderCompanyPanel();
  setSaveState(elements.companySaveState, `Saved ${state.companyRecords[company.company_number].displayName}`);
}

function applyPersonEdits() {
  const personId = state.selectedPersonId;
  if (!personId) return;

  const current = state.personRecords[personId];
  const edits = collectPersonFormData();
  state.personRecords[personId] = {
    ...current,
    ...edits,
  };
  saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  renderSelfEmployedList();
  renderSelfEmployedPanel();
  setSaveState(elements.personSaveState, `Saved ${state.personRecords[personId].fullName}`);
}

function resetCurrentCompanyView() {
  renderCompanyPanel();
}

function resetCurrentPersonView() {
  renderSelfEmployedPanel();
}

function openFirstCompany(viewId = "company-overview") {
  const firstCompany = state.filteredCompanies[0] || state.companies[0];
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
  const firstPerson = SELF_EMPLOYED_PEOPLE[0];
  if (!firstPerson) {
    hideAllPanels();
    elements.emptyState.classList.remove("hidden");
    return;
  }
  state.selectedCompanyId = null;
  state.selectedPersonId = firstPerson;
  renderCompanyList();
  renderSelfEmployedList();
  renderSelfEmployedPanel();
}

function filterCompanies(query) {
  const lowered = query.trim().toLowerCase();
  state.filteredCompanies = state.companies.filter((company) => {
    const record = getCompanyRecord(company.company_number);
    return (
      record.displayName.toLowerCase().includes(lowered) ||
      record.companyNumber.toLowerCase().includes(lowered) ||
      record.legalName.toLowerCase().includes(lowered)
    );
  });
  renderCompanyList();
}

function initializeRecords(data) {
  state.summary = data.summary;
  state.companyRecords = loadSavedRecords(COMPANY_STORAGE_KEY);
  state.personRecords = loadSavedRecords(PERSON_STORAGE_KEY);

  state.companies = data.companies;
  state.companies.forEach((company) => {
    state.companyRecords[company.company_number] ??= companyDefaults(company);
    state.companyRecords[company.company_number].bankImports ??= [];
    state.companyRecords[company.company_number].workflow ??= {};
  });
  SELF_EMPLOYED_PEOPLE.forEach((person) => {
    state.personRecords[person] ??= personDefaults(person);
  });

  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  state.filteredCompanies = state.companies;
  state.selectedCompanyId = state.companies[0]?.company_number || null;
}

function bindEvents() {
  bindCompanyTabs();

  elements.companySearch.addEventListener("input", (event) => {
    filterCompanies(event.target.value);
  });

  elements.homeButton.addEventListener("click", showHomePanel);
  elements.companiesButton.addEventListener("click", () => openFirstCompany());
  elements.selfEmployedButton.addEventListener("click", openFirstSelfEmployed);
  elements.mastheadHomeButton.addEventListener("click", showHomePanel);
  elements.mastheadCompaniesButton.addEventListener("click", () => openFirstCompany());
  elements.quickOpenCompanyButton.addEventListener("click", () => openFirstCompany());
  elements.quickOpenSelfButton.addEventListener("click", openFirstSelfEmployed);
  elements.homeRouteCompanies.addEventListener("click", () => openFirstCompany());
  elements.homeRouteSelf.addEventListener("click", openFirstSelfEmployed);
  elements.homeRouteImport.addEventListener("click", () => openFirstCompany("company-bank-import"));
  elements.homeRouteWorkflow.addEventListener("click", () => openFirstCompany("company-workflow"));
  elements.homeLinkButtons.forEach((button) => button.addEventListener("click", showHomePanel));
  elements.saveCompanyButton.addEventListener("click", applyCompanyEdits);
  elements.resetCompanyButton.addEventListener("click", resetCurrentCompanyView);
  elements.importBankStatementButton.addEventListener("click", importBankStatement);
  elements.savePersonButton.addEventListener("click", applyPersonEdits);
  elements.resetPersonButton.addEventListener("click", resetCurrentPersonView);
}

function loadApp() {
  const data = window.APP_DATA;
  if (!data) {
    throw new Error("Run scripts/analyze_export.py to regenerate app/dashboard-data.js.");
  }

  initializeRecords(data);
  bindEvents();
  renderHeader(data);
  renderStats();
  renderCompanyList();
  renderSelfEmployedList();
  showHomePanel();
}

try {
  loadApp();
} catch (error) {
  elements.emptyState.classList.remove("hidden");
  elements.emptyState.innerHTML = `
    <p class="section-kicker">Dashboard unavailable</p>
    <h2>App data could not be loaded.</h2>
    <p>${error.message}</p>
  `;
}
