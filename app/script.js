const state = {
  companies: [],
  filteredCompanies: [],
  selectedCompany: null,
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
  emptyState: document.getElementById("emptyState"),
  companyPanel: document.getElementById("companyPanel"),
  companyNumber: document.getElementById("companyNumber"),
  signalBar: document.getElementById("signalBar"),
  profileList: document.getElementById("profileList"),
  panelMetrics: document.getElementById("panelMetrics"),
  fileTableBody: document.getElementById("fileTableBody"),
};

async function loadData() {
  const data = window.APP_DATA;
  if (!data) {
    throw new Error("Run scripts/analyze_export.py to regenerate app/dashboard-data.js.");
  }

  state.summary = data.summary;
  state.companies = data.companies;
  state.filteredCompanies = data.companies;

  renderHeader(data);
  renderStats();
  renderCompanyList();
}

function renderHeader(data) {
  elements.zipPath.textContent = data.summary.zip_path;
  elements.generatedAt.textContent = `Generated ${new Date(data.generated_at).toLocaleString("en-GB")}`;
}

function renderStats() {
  const summary = state.summary;
  const cards = [
    ["Clients", number.format(summary.distinct_company_numbers), "Recovered companies ready for rebuild"],
    ["Transaction files", number.format(summary.transaction_csv_file_count), "Recovered bank and transaction CSVs"],
    ["Database dumps", number.format(summary.dump_files.length), "Historic system snapshots"],
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
          <strong>${company.company_number}</strong>
          <span>${number.format(company.csv_file_count)} files | ${number.format(company.row_count)} rows</span>
        </button>
      `;
    })
    .join("");

  elements.companyList.querySelectorAll(".company-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCompany = state.companies.find(
        (item) => item.company_number === button.dataset.company,
      );
      renderCompanyList();
      renderCompanyPanel();
    });
  });
}

function renderCompanyPanel() {
  const company = state.selectedCompany;
  if (!company) {
    elements.emptyState.classList.remove("hidden");
    elements.companyPanel.classList.add("hidden");
    return;
  }

  elements.emptyState.classList.add("hidden");
  elements.companyPanel.classList.remove("hidden");
  elements.companyNumber.textContent = company.company_number;
  renderSignalBar(company);
  renderProfile(company);
  renderMetrics(company);
  renderFileTable(company);
}

function renderSignalBar(company) {
  const firstFile = company.files[0];
  const lastFile = company.files[company.files.length - 1];
  const signals = [
    ["Coverage years", company.years_present.join(", "), "Historic periods currently detected"],
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
    ["Entity type", "Recovered company workspace"],
    ["Company number", company.company_number],
    ["Years detected", company.years_present.join(", ")],
    ["Source files", number.format(company.csv_file_count)],
    ["Total rows", number.format(company.row_count)],
    ["Rebuild status", "Imported archive only"],
  ];

  elements.profileList.innerHTML = profileRows
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
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
  const query = event.target.value.trim();
  state.filteredCompanies = state.companies.filter((company) =>
    company.company_number.includes(query),
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
