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
  emptyState: document.getElementById("emptyState"),
  companyPanel: document.getElementById("companyPanel"),
  selfEmployedPanel: document.getElementById("selfEmployedPanel"),
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
  elements.emptyState.classList.add("hidden");
  elements.companyPanel.classList.add("hidden");
  elements.selfEmployedPanel.classList.add("hidden");
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

function setSaveState(element, message) {
  element.textContent = message;
  window.clearTimeout(element._saveTimer);
  if (!message) return;
  element._saveTimer = window.setTimeout(() => {
    element.textContent = "";
  }, 2800);
}

function renderCompanyPanel() {
  const company = getSelectedCompany();
  if (!company) {
    elements.emptyState.classList.remove("hidden");
    elements.companyPanel.classList.add("hidden");
    elements.selfEmployedPanel.classList.add("hidden");
    return;
  }

  const record = getCompanyRecord(company.company_number);
  hideAllPanels();
  elements.companyPanel.classList.remove("hidden");
  elements.companyName.textContent = record.displayName;
  elements.companyNumber.textContent = record.companyNumber;
  setDefaultCompanyView();
  renderSignalBar(company, record);
  renderCompanyOverview(company, record);
  renderCompanyDetails(company, record);
  renderCompanyWorkflow(company, record);
  renderCompanyNotes(record);
}

function renderSelfEmployedPanel() {
  const person = getSelectedPersonRecord();
  if (!person) {
    elements.emptyState.classList.remove("hidden");
    elements.companyPanel.classList.add("hidden");
    elements.selfEmployedPanel.classList.add("hidden");
    return;
  }

  hideAllPanels();
  elements.selfEmployedPanel.classList.remove("hidden");
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

  elements.saveCompanyButton.addEventListener("click", applyCompanyEdits);
  elements.resetCompanyButton.addEventListener("click", resetCurrentCompanyView);
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
  renderCompanyPanel();
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
