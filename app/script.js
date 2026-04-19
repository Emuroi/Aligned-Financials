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
  yearChips: document.getElementById("yearChips"),
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
    ["Companies", number.format(summary.distinct_company_numbers), "Distinct company numbers"],
    ["CSV Files", number.format(summary.transaction_csv_file_count), "Transaction exports in archive"],
    ["Dump Files", number.format(summary.dump_files.length), "PostgreSQL handover dumps"],
    ["Years", Object.keys(summary.years_present).join(", "), "Transaction activity detected"],
  ];

  elements.stats.innerHTML = cards
    .map(
      ([label, value, subtext]) => `
        <article class="stat-card">
          <p class="metric-label">${label}</p>
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
      const company = state.companies.find(
        (item) => item.company_number === button.dataset.company,
      );
      state.selectedCompany = company;
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
  elements.yearChips.innerHTML = company.years_present
    .map((year) => `<span class="year-chip">${year}</span>`)
    .join("");

  const metrics = [
    ["CSV Files", number.format(company.csv_file_count), "Files linked to this company"],
    ["Rows", number.format(company.row_count), "Transaction rows detected"],
    ["Net Movement", formatCurrency(company.net_amount), "Across the available CSVs"],
    ["Gross Out", formatCurrency(company.paid_out_total), "Paid Out columns where available"],
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

  elements.fileTableBody.innerHTML = company.files
    .map(
      (file) => `
        <tr>
          <td>${file.year}</td>
          <td>${file.month}</td>
          <td>${number.format(file.row_count)}<div class="path-cell">${file.path}</div></td>
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
    <h2>Dashboard data unavailable</h2>
    <p>${error.message}</p>
  `;
});
