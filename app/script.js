const LEGACY_PROFILES = {
  "08564152": {
    displayName: "Urban Management Solutions Limited",
    legalType: "Private limited company",
    registrationDate: "11.06.2013",
    registrationCountry: "England",
    vatRegistration: "316543708",
    vatScheme: "Cash Quarterly",
    bankAccount: "HSBC (GBP)",
    address: "3 Bailey Mews, London, England, W4 3PZ",
    industries: [
      "62090 - Other information technology service activities",
      "78109 - Other activities of employment placement agencies",
    ],
    legacyStatus: "Matched from legacy screenshots",
  },
  "12011913": {
    displayName: "Mooseberry Tech Ltd",
    legalType: "Private limited company",
    registrationDate: "22.05.2019",
    registrationCountry: "England",
    vatRegistration: "327642007",
    vatScheme: "Cash Quarterly",
    bankAccount: "Barclays / Barclays Savings (GBP)",
    address: "9 Marina Place, Old Bridge St, Hampton Wick, United Kingdom, KT1 4BH",
    industries: ["62020 - Information technology consultancy activities"],
    legacyStatus: "Matched from legacy screenshots",
  },
  "10534265": {
    displayName: "Malja Construction Limited",
    legalType: "Private limited company",
    registrationDate: "21.12.2016",
    registrationCountry: "England",
    vatRegistration: "None",
    vatScheme: "Not set",
    bankAccount: "HSBC / HSBC Savings (GBP)",
    address: "3 Bailey Mews, London, United Kingdom, W4 3PZ",
    industries: [
      "43110 - Demolition",
      "43290 - Other construction installation",
      "43390 - Other building completion and finishing",
    ],
    legacyStatus: "Matched from legacy screenshots",
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

const state = {
  companies: [],
  filteredCompanies: [],
  selectedCompany: null,
  selectedPerson: null,
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
  signalBar: document.getElementById("signalBar"),
  profileList: document.getElementById("profileList"),
  detailsList: document.getElementById("detailsList"),
  detailsNotes: document.getElementById("detailsNotes"),
  panelMetrics: document.getElementById("panelMetrics"),
  fileTableBody: document.getElementById("fileTableBody"),
  unreconciledSummary: document.getElementById("unreconciledSummary"),
  unreconciledList: document.getElementById("unreconciledList"),
  reconciledSummary: document.getElementById("reconciledSummary"),
  reconciledList: document.getElementById("reconciledList"),
  selfPersonName: document.getElementById("selfPersonName"),
  selfProfileList: document.getElementById("selfProfileList"),
  selfNotes: document.getElementById("selfNotes"),
  tabs: Array.from(document.querySelectorAll(".tab[data-panel]")),
  panels: Array.from(document.querySelectorAll(".panel-view")),
};

async function loadData() {
  const data = window.APP_DATA;
  if (!data) {
    throw new Error("Run scripts/analyze_export.py to regenerate app/dashboard-data.js.");
  }

  state.summary = data.summary;
  state.companies = data.companies.map(enrichCompany);
  state.filteredCompanies = state.companies;

  bindTabs();
  renderHeader(data);
  renderStats();
  renderCompanyList();
  renderSelfEmployedList();
}

function enrichCompany(company) {
  const legacy = LEGACY_PROFILES[company.company_number] || null;
  const displayName = legacy?.displayName || `Client ${company.company_number}`;
  const displaySubline = legacy
    ? "Legacy name recovered from screenshots"
    : "Legacy client name not yet mapped";

  return {
    ...company,
    legacy,
    displayName,
    displaySubline,
  };
}

function bindTabs() {
  elements.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      elements.tabs.forEach((item) => item.classList.remove("active"));
      elements.panels.forEach((panel) => panel.classList.add("hidden"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.panel).classList.remove("hidden");
    });
  });
}

function renderHeader(data) {
  elements.zipPath.textContent = data.summary.zip_path;
  elements.generatedAt.textContent = `Generated ${new Date(data.generated_at).toLocaleString("en-GB")}`;
}

function renderStats() {
  const summary = state.summary;
  const cards = [
    ["Clients", number.format(summary.distinct_company_numbers), "Recovered companies ready for rebuild"],
    ["Self employed", number.format(SELF_EMPLOYED_PEOPLE.length), "Separate personal records archive"],
    ["Transaction files", number.format(summary.transaction_csv_file_count), "Recovered bank and transaction CSVs"],
    ["Coverage window", Object.keys(summary.years_present).join(" - "), "Detected activity range"],
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
      const active = state.selectedCompany?.company_number === company.company_number ? "active" : "";
      return `
        <button class="company-button ${active}" data-company="${company.company_number}">
          <strong>${company.displayName}</strong>
          <span>${company.company_number}</span>
          <span>${number.format(company.csv_file_count)} files | ${number.format(company.row_count)} rows</span>
        </button>
      `;
    })
    .join("");

  elements.companyList.querySelectorAll(".company-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPerson = null;
      state.selectedCompany = state.companies.find(
        (item) => item.company_number === button.dataset.company,
      );
      renderCompanyList();
      renderSelfEmployedList();
      renderCompanyPanel();
    });
  });
}

function renderSelfEmployedList() {
  elements.selfEmployedList.innerHTML = SELF_EMPLOYED_PEOPLE
    .map((person) => {
      const active = state.selectedPerson === person ? "active" : "";
      return `
        <button class="company-button person-button ${active}" data-person="${person}">
          <strong>${person}</strong>
          <span>Self employed record</span>
        </button>
      `;
    })
    .join("");

  elements.selfEmployedList.querySelectorAll(".person-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCompany = null;
      state.selectedPerson = button.dataset.person;
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

function renderCompanyPanel() {
  const company = state.selectedCompany;
  if (!company) {
    elements.emptyState.classList.remove("hidden");
    elements.companyPanel.classList.add("hidden");
    elements.selfEmployedPanel.classList.add("hidden");
    return;
  }

  hideAllPanels();
  elements.companyPanel.classList.remove("hidden");
  elements.companyName.textContent = company.displayName;
  elements.companyNumber.textContent = company.company_number;

  elements.tabs.forEach((tab, index) => tab.classList.toggle("active", index === 0));
  elements.panels.forEach((panel, index) => panel.classList.toggle("hidden", index !== 0));

  renderSignalBar(company);
  renderProfile(company);
  renderDetails(company);
  renderMetrics(company);
  renderFileTable(company);
  renderWorkflow(company);
}

function renderSelfEmployedPanel() {
  const person = state.selectedPerson;
  if (!person) {
    elements.emptyState.classList.remove("hidden");
    elements.companyPanel.classList.add("hidden");
    elements.selfEmployedPanel.classList.add("hidden");
    return;
  }

  hideAllPanels();
  elements.selfEmployedPanel.classList.remove("hidden");
  elements.selfPersonName.textContent = person;
  elements.selfProfileList.innerHTML = [
    ["Record type", "Self employed"],
    ["Display name", person],
    ["Source", "Legacy screenshot archive"],
    ["Accounting treatment", "Personal / sole trader workflow"],
    ["Import status", "Awaiting dedicated self-employed import mapping"],
    ["Section split", "Kept separate from limited companies"],
  ]
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join("");

  const notes = [
    {
      title: "Separate workflow",
      body: "These records should live outside the company workspace because they represent individuals rather than limited companies.",
    },
    {
      title: "Future build path",
      body: "The next version can give self-employed profiles their own tax, expenses, and submission workflow instead of company accounting tabs.",
    },
    {
      title: "Current source",
      body: "These names come directly from the legacy SELF EMPLOYED screenshot folder and are being carried into the rebuilt software as a distinct section.",
    },
  ];

  elements.selfNotes.innerHTML = notes
    .map(
      (note) => `
        <article class="note-card">
          <h4>${note.title}</h4>
          <p>${note.body}</p>
        </article>
      `,
    )
    .join("");
}

function renderSignalBar(company) {
  const firstFile = company.files[0];
  const lastFile = company.files[company.files.length - 1];
  const signals = [
    ["Client identity", company.displaySubline, "Legacy naming state"],
    ["Import runway", `${company.csv_file_count} file batches`, "Recovered imports available for rebuild"],
    ["Earliest trace", firstFile?.first_date || "Not available", "First dated entry seen in the files"],
    ["Latest trace", lastFile?.last_date || "Not available", "Latest dated entry seen in the files"],
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

function renderProfile(company) {
  const profileRows = [
    ["Display name", company.displayName],
    ["Company number", company.company_number],
    ["Entity type", company.legacy?.legalType || "Recovered company workspace"],
    ["Years detected", company.years_present.join(", ")],
    ["Source files", number.format(company.csv_file_count)],
    ["Rebuild status", company.legacy?.legacyStatus || "Waiting for name verification"],
  ];

  elements.profileList.innerHTML = profileRows
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join("");
}

function renderDetails(company) {
  const legacy = company.legacy;
  const detailRows = [
    ["Legal name", legacy?.displayName || "Not yet confirmed from source screenshots"],
    ["Registration country", legacy?.registrationCountry || "Not yet mapped"],
    ["Date of creation", legacy?.registrationDate || "Not yet mapped"],
    ["VAT registration", legacy?.vatRegistration || "Not yet mapped"],
    ["VAT scheme", legacy?.vatScheme || "Not yet mapped"],
    ["Primary bank", legacy?.bankAccount || "Recovered from CSVs only"],
    ["Address", legacy?.address || "Legacy address not linked yet"],
    ["Industries", legacy?.industries?.join(" | ") || "Not yet mapped"],
  ];

  elements.detailsList.innerHTML = detailRows
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join("");

  const notes = [
    {
      title: "Client name handling",
      body: legacy
        ? "This entity has a verified legacy name from the screenshot archive and it is now shown throughout the workspace."
        : "This entity still needs a screenshot or source-system match before we replace the company number with a verified client name.",
    },
    {
      title: "Security posture",
      body: "Sensitive credentials from the old system are intentionally excluded from this rebuild view. The new app should use secure storage and role-based access instead.",
    },
    {
      title: "Details page direction",
      body: "This panel is the first pass of the company details page and is ready to expand with VAT deadlines, bank accounts, notes, and contact records.",
    },
  ];

  elements.detailsNotes.innerHTML = notes
    .map(
      (note) => `
        <article class="note-card">
          <h4>${note.title}</h4>
          <p>${note.body}</p>
        </article>
      `,
    )
    .join("");
}

function renderMetrics(company) {
  const metrics = [
    ["Net movement", formatCurrency(company.net_amount), "Estimated from available columns"],
    ["Paid in", formatCurrency(company.paid_in_total), "Detected on bank-style exports"],
    ["Paid out", formatCurrency(company.paid_out_total), "Detected on bank-style exports"],
    ["Transaction rows", number.format(company.row_count), "Across all recovered files"],
  ];

  elements.panelMetrics.innerHTML = metrics
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

function renderFileTable(company) {
  elements.fileTableBody.innerHTML = company.files
    .map(
      (file) => `
        <tr>
          <td class="period-cell">
            <strong>${file.year} / ${file.month}</strong>
            <span class="path-cell">${file.path}</span>
          </td>
          <td>${number.format(file.row_count)}</td>
          <td class="${amountClass(file.amount_total)}">${formatCurrency(file.amount_total)}</td>
          <td>${formatCurrency(file.paid_in_total)}</td>
          <td>${formatCurrency(file.paid_out_total)}</td>
          <td>${formatDateRange(file.first_date, file.last_date)}</td>
        </tr>
      `,
    )
    .join("");
}

function renderWorkflow(company) {
  const workflow = deriveWorkflow(company);
  elements.unreconciledSummary.textContent =
    `${workflow.unreconciled.length} file sets need review because they have rows but no usable money movement totals yet.`;
  elements.reconciledSummary.textContent =
    `${workflow.reconciled.length} file sets already contain enough structured movement data to carry forward into the next import layer.`;

  elements.unreconciledList.innerHTML = workflow.unreconciled.length
    ? workflow.unreconciled.map(renderWorkflowItem).join("")
    : `<article class="workflow-item"><h4>No unreconciled file sets</h4><p>Every recovered file for this client currently looks structured enough for the next step.</p></article>`;

  elements.reconciledList.innerHTML = workflow.reconciled.length
    ? workflow.reconciled.map(renderWorkflowItem).join("")
    : `<article class="workflow-item"><h4>No reconciled-ready file sets</h4><p>This client needs more import normalization before reconciliation can begin.</p></article>`;
}

function deriveWorkflow(company) {
  const unreconciled = [];
  const reconciled = [];

  company.files.forEach((file) => {
    const hasMovement =
      Math.abs(file.amount_total) > 0 ||
      Math.abs(file.paid_in_total) > 0 ||
      Math.abs(file.paid_out_total) > 0;
    const item = {
      title: `${file.year} / ${file.month}`,
      subtitle: `${number.format(file.row_count)} rows | ${formatDateRange(file.first_date, file.last_date)}`,
      path: file.path,
      status: hasMovement ? "Ready for reconciliation" : "Needs parsing review",
      tone: hasMovement ? "success" : "warning",
    };

    if (hasMovement) {
      reconciled.push(item);
    } else {
      unreconciled.push(item);
    }
  });

  return { unreconciled, reconciled };
}

function renderWorkflowItem(item) {
  return `
    <article class="workflow-item">
      <h4>${item.title}</h4>
      <p>${item.subtitle}</p>
      <span class="path-cell">${item.path}</span>
      <span class="status-pill ${item.tone}">${item.status}</span>
    </article>
  `;
}

function amountClass(value) {
  if (value > 0) return "amount-positive";
  if (value < 0) return "amount-negative";
  return "";
}

function formatCurrency(value) {
  return currency.format(value || 0);
}

function formatDateRange(firstDate, lastDate) {
  if (!firstDate && !lastDate) return "Not available";
  if (firstDate === lastDate) return firstDate;
  return `${firstDate || "?"} to ${lastDate || "?"}`;
}

elements.companySearch.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  state.filteredCompanies = state.companies.filter((company) =>
    company.company_number.includes(query) || company.displayName.toLowerCase().includes(query),
  );
  renderCompanyList();
});

loadData().catch((error) => {
  elements.emptyState.classList.remove("hidden");
  elements.emptyState.innerHTML = `
    <p class="section-kicker">Dashboard unavailable</p>
    <h2>App data could not be loaded.</h2>
    <p>${error.message}</p>
  `;
});
