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
    utr: "623/7325306396",
    payeReference: "",
    accountOfficeReference: "",
    companiesHouseCode: "",
    gatewayId: "565964467335",
    gatewayPassword: "Spetrova47m",
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
    utr: "623/7991827431",
    payeReference: "120/ZE01863",
    accountOfficeReference: "120PE01934246",
    companiesHouseCode: "DKEGL3",
    gatewayId: "167734964362",
    gatewayPassword: "Adriana1985",
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
    companiesHouseCode: "",
    gatewayId: "",
    gatewayPassword: "",
    deadlines: {
      vatDue: "",
      yearEnd: "",
      confirmation: "",
      accountsDue: "",
    },
    generalNotes: "",
  },
  "11239133": {
    displayName: "Axiv Limited",
    legalName: "Axiv Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "07.03.2018",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "",
    address: "3 Conolly Road\nLondon\nEngland\nW7 3JW",
    industries: "59112 - Video production activities",
    utr: "623/2529107302",
    payeReference: "120/ZB83450",
    accountOfficeReference: "120PZ01697673",
    companiesHouseCode: "A45204",
    gatewayId: "772362822984",
    gatewayPassword: "Terziev1980",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "12707615": {
    displayName: "Radi Group Limited",
    legalName: "Radi Group Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "30.06.2020",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "Lloyds (GBP)\nMetro Bank current account (GBP)",
    address: "441a Uxbridge Road\nSouthall\nEngland\nUB1 3ET",
    industries: "81299 - Other cleaning services",
    utr: "623/1273927823",
    payeReference: "120/GE40713",
    accountOfficeReference: "120PD02526914",
    companiesHouseCode: "Y699P9",
    gatewayId: "902257073940",
    gatewayPassword: "dinkov2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "12708357": {
    displayName: "Stef Group Limited",
    legalName: "Stef Group Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "30.06.2020",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "Lloyds (GBP)",
    address: "441a Uxbridge Road\nSouthall\nEngland\nUB1 3ET",
    industries: "81299 - Other cleaning services",
    utr: "623/4635100935",
    payeReference: "475/LE66860",
    accountOfficeReference: "475PQ01678440",
    companiesHouseCode: "UD2K2D",
    gatewayId: "644245942540",
    gatewayPassword: "stoyanov2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "12883607": {
    displayName: "Valentinom Ltd",
    legalName: "Valentinom Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "16.09.2020",
    registrationCountry: "England",
    vatRegistration: "413083139",
    vatScheme: "Cash Quarterly",
    bankAccount: "Tide (GBP)",
    address: "3 Conolly Road\nLondon\nEngland\nW7 3JW",
    industries: "43390 - Other building completion and finishing\n43999 - Other specialised construction activities not elsewhere classified\n81210 - General cleaning of buildings\n81221 - Window cleaning services",
    utr: "623/1468117533",
    payeReference: "475/AE20988",
    accountOfficeReference: "475PL01542853",
    companiesHouseCode: "XYM2QD",
    gatewayId: "733361022473",
    gatewayPassword: "valentin2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "13466441": {
    displayName: "NBNG Ltd",
    legalName: "NBNG Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "20.06.2021",
    registrationCountry: "England",
    vatRegistration: "466574551",
    vatScheme: "Cash Quarterly",
    bankAccount: "",
    address: "107 Alexander Square\nEastleigh\nEngland\nSO50 4BX",
    industries: "49410 - Freight transport by road\n52290 - Other transportation support activities",
    utr: "623/3184115855",
    payeReference: "120/SE59901",
    accountOfficeReference: "120PJ02861611",
    companiesHouseCode: "CHGXCP",
    gatewayId: "997701879336",
    gatewayPassword: "TSVETOMIR@NBNGLTD",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "13699791": {
    displayName: "Automed Ltd",
    legalName: "Automed Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "23.10.2021",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "",
    address: "68 George Street\nWeston-Super-Mare\nEngland\nBS23 3AS",
    industries: "45112 - Sale of used cars and light motor vehicles\n45200 - Maintenance and repair of motor vehicles",
    utr: "623/5936228962",
    payeReference: "120/KE89885",
    accountOfficeReference: "120PZ03384914",
    companiesHouseCode: "62GCYF",
    gatewayId: "373474152574",
    gatewayPassword: "Rado_850928.",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "13995186": {
    displayName: "Denev Limited",
    legalName: "Denev Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "22.03.2022",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "Other (not listed) current account (GBP)",
    address: "3 Bailey Mews\nLondon\nEngland\nW4 3PZ",
    industries: "49410 - Freight transport by road",
    utr: "623/5353812435",
    payeReference: "120/YE49600",
    accountOfficeReference: "120PD02680522",
    companiesHouseCode: "TU68X3",
    gatewayId: "196724926567",
    gatewayPassword: "plamenov2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "14185697": {
    displayName: "Yellow Stone Technologies Ltd",
    legalName: "Yellow Stone Technologies Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "21.06.2022",
    registrationCountry: "England",
    vatRegistration: "417743781",
    vatScheme: "Cash Quarterly",
    bankAccount: "HSBC current account (GBP)\nTide current account (GBP)",
    address: "Flat 25 Marie Lloyd House\nMurray Grove\nLondon\nEngland\nN1 7PU",
    industries: "62020 - Information technology consultancy activities",
    utr: "623/1122620747",
    payeReference: "120/SE51007",
    accountOfficeReference: "120PE02704864",
    companiesHouseCode: "26M93H",
    gatewayId: "753216276921",
    gatewayPassword: "Ghebrat2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "14518528": {
    displayName: "VNS Drivers Limited",
    legalName: "VNS Drivers Limited",
    entityType: "Private limited company",
    companyStatus: "Liquidation",
    registrationDate: "01.12.2022",
    registrationCountry: "England",
    vatRegistration: "437406985",
    vatScheme: "Cash Quarterly",
    bankAccount: "Barclays current account (GBP)",
    address: "C/O Inquesta Corporate Recovery & Insolvency\nSt John's Terrace\n11-15 New Road\nManchester\nM26 1LS",
    industries: "49410 - Freight transport by road",
    utr: "623/4312327588",
    payeReference: "120/TE57964",
    accountOfficeReference: "120PY02827256",
    companiesHouseCode: "2RLB2B",
    gatewayId: "539742550044",
    gatewayPassword: "Viktorio2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "14782597": {
    displayName: "Choit Ltd",
    legalName: "Choit Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "05.04.2023",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "",
    address: "7 Angelica Drive\nBridgwater\nEngland\nTA5 2GL",
    industries: "47910 - Retail sale via mail order houses or via Internet\n47990 - Other retail sale not in stores, stalls or markets\n56290 - Other food services\n90030 - Artistic creation",
    utr: "623/4819813959",
    payeReference: "",
    accountOfficeReference: "",
    companiesHouseCode: "YKJ4UG",
    gatewayId: "380751080981",
    gatewayPassword: "KOSTADINOVA2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "15002181": {
    displayName: "Croxio Limited",
    legalName: "Croxio Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "13.07.2023",
    registrationCountry: "England",
    vatRegistration: "446851763",
    vatScheme: "Cash Quarterly",
    bankAccount: "Other (not listed) current account (GBP)",
    address: "12 Myrtle Road\nLondon\nEngland\nW3 6EA",
    industries: "62012 - Business and domestic software development\n62020 - Information technology consultancy activities",
    utr: "623/8677424387",
    payeReference: "",
    accountOfficeReference: "",
    companiesHouseCode: "D7JHBJ",
    gatewayId: "892695860030",
    gatewayPassword: "maitland2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "15492410": {
    displayName: "DZPRO Limited",
    legalName: "DZPRO Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "15.02.2024",
    registrationCountry: "England",
    vatRegistration: "465447859",
    vatScheme: "Cash Quarterly",
    bankAccount: "",
    address: "Flat 1 77 Bath Road\nBridgwater\nUnited Kingdom\nTA6 4PN",
    industries: "49410 - Freight transport by road",
    utr: "623/4666429076",
    payeReference: "",
    accountOfficeReference: "",
    companiesHouseCode: "WH66BV",
    gatewayId: "232309668146",
    gatewayPassword: "Lgcinema3d",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "15607035": {
    displayName: "7/8 Delivery Ltd",
    legalName: "7/8 Delivery Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "31.03.2024",
    registrationCountry: "England",
    vatRegistration: "466490364",
    vatScheme: "Cash Quarterly",
    bankAccount: "HSBC (GBP)",
    address: "50 Princes Street\nIpswich\nEngland\nIP1 1RJ",
    industries: "49410 - Freight transport by road",
    utr: "623/4116621702",
    payeReference: "475/WE78857",
    accountOfficeReference: "475PM01711086",
    companiesHouseCode: "U8XKU9",
    gatewayId: "270760753172",
    gatewayPassword: "powerboss1980",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "15727305": {
    displayName: "Nextwave Delivery Ltd",
    legalName: "Nextwave Delivery Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "18.05.2024",
    registrationCountry: "England",
    vatRegistration: "467630862",
    vatScheme: "Cash Quarterly",
    bankAccount: "Other (not listed) current account (GBP)",
    address: "441a Uxbridge Road\nSouthall\nEngland\nUB1 3ET",
    industries: "49410 - Freight transport by road",
    utr: "623/7565601402",
    payeReference: "",
    accountOfficeReference: "",
    companiesHouseCode: "",
    gatewayId: "389945157378",
    gatewayPassword: "gutenmorgen",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "15728507": {
    displayName: "Next Day Ninja Limited",
    legalName: "Next Day Ninja Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "18.05.2024",
    registrationCountry: "England",
    vatRegistration: "467539840",
    vatScheme: "Cash Quarterly",
    bankAccount: "Other (not listed) current account (GBP)",
    address: "30 Spencer Road\nLondon\nEngland\nW4 3SP",
    industries: "49410 - Freight transport by road",
    utr: "623/4138721856",
    payeReference: "120/YF05166",
    accountOfficeReference: "120PW03668043",
    companiesHouseCode: "VYB8H9",
    gatewayId: "553838918419",
    gatewayPassword: "",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "15805017": {
    displayName: "GR First Class Clean Ltd",
    legalName: "GR First Class Clean Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "26.06.2024",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "",
    address: "441a Uxbridge Road\nSouthall\nEngland\nUB1 3ET",
    industries: "81210 - General cleaning of buildings",
    utr: "623/9101113836",
    payeReference: "120/VE89614",
    accountOfficeReference: "120PY03379843",
    companiesHouseCode: "4VPMM7",
    gatewayId: "648635298471",
    gatewayPassword: "dinkov2024",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "15969006": {
    displayName: "Imperial Palace Ltd",
    legalName: "Imperial Palace Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "20.09.2024",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "",
    address: "190a Bushey Mill Lane\nWatford\nEngland\nWD24 7PE",
    industries: "64306 - Activities of real estate investment trusts\n68310 - Real estate agencies\n68320 - Management of real estate on a fee or contract basis",
    utr: "",
    payeReference: "",
    accountOfficeReference: "",
    companiesHouseCode: "V6TP4M",
    gatewayId: "",
    gatewayPassword: "",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "16024660": {
    displayName: "Berk Logistics Ltd",
    legalName: "Berk Logistics Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "17.10.2024",
    registrationCountry: "England",
    vatRegistration: "478275152",
    vatScheme: "Cash Quarterly",
    bankAccount: "Other (not listed) current account (GBP)",
    address: "12 Pymmes Close\nLondon\nUnited Kingdom\nN13 4NJ",
    industries: "49410 - Freight transport by road",
    utr: "623/2032502642",
    payeReference: "120/JE87737",
    accountOfficeReference: "120PK03344972",
    companiesHouseCode: "LMMR8M",
    gatewayId: "731966837539",
    gatewayPassword: "angelov2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "16429224": {
    displayName: "Precision Transport Solutions Ltd",
    legalName: "Precision Transport Solutions Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "05.05.2025",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "",
    address: "44 Abingdon Street\nBurnham-On-Sea\nEngland\nTA8 1PJ",
    industries: "52290 - Other transportation support activities",
    utr: "",
    payeReference: "",
    accountOfficeReference: "",
    companiesHouseCode: "",
    gatewayId: "778244435074",
    gatewayPassword: "jonjodunne2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "16521065": {
    displayName: "Valeri Ltd",
    legalName: "Valeri Ltd",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "16.06.2025",
    registrationCountry: "England",
    vatRegistration: "",
    vatScheme: "Not set",
    bankAccount: "",
    address: "66 Grove Road\nHounslow\nEngland\nTW3 3PT",
    industries: "96020 - Hairdressing and other beauty treatment",
    utr: "",
    payeReference: "120/UE99586",
    accountOfficeReference: "120PQ03563629",
    companiesHouseCode: "",
    gatewayId: "964357931023",
    gatewayPassword: "dimitrova2007",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
    generalNotes: "",
  },
  "12776349": {
    displayName: "RCKY Limited",
    legalName: "RCKY Limited",
    entityType: "Private limited company",
    companyStatus: "Active",
    registrationDate: "29.07.2020",
    registrationCountry: "England",
    vatRegistration: "354894065",
    vatScheme: "Cash Quarterly",
    bankAccount: "",
    address: "6 Rembrandt Court\nEpsom\nEngland\nKT19 0SB",
    industries: "53202 - Unlicensed carrier",
    utr: "623/1701901794",
    payeReference: "120/BE18163",
    accountOfficeReference: "120PS02164772",
    companiesHouseCode: "FE29B4",
    gatewayId: "534217554883",
    gatewayPassword: "payrollbonev2025",
    deadlines: { vatDue: "", yearEnd: "", confirmation: "", accountsDue: "" },
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
const CUSTOM_COMPANIES_KEY = "aligned-financials-custom-companies";
const CUSTOM_PEOPLE_KEY = "aligned-financials-custom-people";
const LEGACY_AUTH_STORAGE_KEY = "aligned-financials-auth";
const WIZARD_STEPS = ["identity", "tax", "contacts", "notes"];

const state = {
  companies: [],
  filteredCompanies: [],
  selectedCompanyId: null,
  selectedPersonId: null,
  companyRecords: {},
  personRecords: {},
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
  companyWizardStep: "identity",
  personWizardStep: "identity",
};

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

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
  settingsSaveState: document.getElementById("settingsSaveState"),
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
  companyGeneralNotes: document.getElementById("companyGeneralNotes"),
  companyChartSummary: document.getElementById("companyChartSummary"),
  companyChartTableBody: document.getElementById("companyChartTableBody"),
  companyChartNotes: document.getElementById("companyChartNotes"),
  companyVatCards: document.getElementById("companyVatCards"),
  companyVatNotes: document.getElementById("companyVatNotes"),
  companyBalanceSummary: document.getElementById("companyBalanceSummary"),
  companyBalanceSheet: document.getElementById("companyBalanceSheet"),
  companyBalanceNotes: document.getElementById("companyBalanceNotes"),
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

function refreshSyncSurface() {
  const summary = syncStatusSummary();

  if (elements.storageModeText) {
    elements.storageModeText.textContent = !window.alignedDesktop?.isDesktop
      ? "Client records, self employed profiles, notes, and bank statement imports are stored in browser storage on this machine."
      : state.supabaseConfigured
        ? "Client records, self employed profiles, notes, and bank statement imports are stored in an encrypted local desktop cache with optional Supabase sync."
        : "Client records, self employed profiles, notes, and bank statement imports are stored in an encrypted local desktop file until Supabase is configured.";
  }

  if (elements.syncStatusText) {
    elements.syncStatusText.textContent = summary.note;
  }

  if (elements.supabaseGuideText) {
    elements.supabaseGuideText.textContent = state.supabaseConfigured
      ? "Changes save automatically. The encrypted local cache stays in place as the fallback and recovery layer."
      : "This workspace is saving locally on this machine.";
  }

  if (elements.syncConflictText) {
    elements.syncConflictText.textContent = state.syncConflict
      ? `${state.syncMessage} Use "Reload latest" to pull the newest saved version, or "Use this copy" only if this machine should replace it.`
      : state.lastRemoteSyncAt
        ? `Last remote sync: ${formatDateTime(state.lastRemoteSyncAt)}.`
        : "No remote sync has completed yet.";
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
  refreshSyncSurface();
  showHomePanel();
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
  const legacy = LEGACY_PROFILES[companyId] || {};
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
    utr: "",
    nino: "",
    dateOfBirth: "",
    nationality: "",
    gatewayId: "",
    gatewayPassword: "",
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

function resolveChartAccountKey(entry) {
  const category = String(entry.category || "").trim();
  if (category === "Sales income") return "sales";
  if (category === "Tax payment") return "vatControl";
  if (category === "Payroll") return "payroll";
  if (category === "Rent") return "rent";
  if (category === "Software") return "software";
  if (category === "Bank charges") return "bankCharges";
  if (category === "Transfer") return "transfer";
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
    postAmount(accounts[resolveChartAccountKey(entry)], entry.amount);
  });

  return Object.values(accounts)
    .filter((account) => account.debit || account.credit || account.code === "1200")
    .sort((left, right) => left.code.localeCompare(right.code));
}

function parseVatRate(vatScheme) {
  const match = String(vatScheme || "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) / 100 : null;
}

function buildVatReport(record) {
  const entries = getStatementEntries(record);
  const taxableSales = entries
    .filter((entry) => entry.category === "Sales income" && entry.amount > 0)
    .reduce((sum, entry) => sum + entry.amount, 0);
  const taxPayments = entries
    .filter((entry) => entry.category === "Tax payment" && entry.amount < 0)
    .reduce((sum, entry) => sum + Math.abs(entry.amount), 0);
  const isRegistered = Boolean(String(record.vatRegistration || "").trim());
  const isFlatRate = String(record.vatScheme || "").toLowerCase().includes("flat");
  const flatRate = parseVatRate(record.vatScheme);
  const workingRate = isFlatRate ? (flatRate || 0) : (isRegistered ? (1 / 6) : 0);
  const estimatedVatDue = taxableSales * workingRate;
  const position = estimatedVatDue - taxPayments;

  return {
    isRegistered,
    isFlatRate,
    flatRate,
    taxableSales,
    taxPayments,
    estimatedVatDue,
    position,
  };
}

function buildBalanceSheet(record) {
  const entries = getStatementEntries(record);
  const chart = buildCompanyChart(record);
  const vat = buildVatReport(record);
  const netCash = entries.reduce((sum, entry) => sum + (entry.amount || 0), 0);
  const income = chart
    .filter((account) => account.type === "Income")
    .reduce((sum, account) => sum + account.balance, 0);
  const expenses = chart
    .filter((account) => account.type === "Expense")
    .reduce((sum, account) => sum + account.balance, 0);
  const tradingResult = income - expenses;
  const currentAssets = [
    ["Bank current accounts", Math.max(netCash, 0)],
    ["VAT receivable", Math.max(vat.taxPayments - vat.estimatedVatDue, 0)],
  ];
  const currentLiabilities = [
    ["Bank overdraft", Math.max(-netCash, 0)],
    ["VAT payable", Math.max(vat.estimatedVatDue - vat.taxPayments, 0)],
  ];
  const totalAssets = currentAssets.reduce((sum, [, value]) => sum + value, 0);
  const totalLiabilities = currentLiabilities.reduce((sum, [, value]) => sum + value, 0);
  const equityLines = [
    ["Current period result", tradingResult],
    ["Director / owner funding", totalAssets - totalLiabilities - tradingResult],
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
  if (elements.generatedAt) {
    elements.generatedAt.textContent = "";
  }
  if (elements.zipPath) {
    elements.zipPath.textContent = "";
  }
}

function copyFieldValue(scope, fieldName) {
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
  const form = getFormForScope(scope);
  const input = form?.elements?.[fieldName];
  if (!input) return;

  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  button.textContent = isHidden ? "Hide" : "Show";
}

function resetSensitiveFields(form, scope) {
  if (!form) return;

  form.querySelectorAll(`[data-reveal-field^="${scope}:"]`).forEach((button) => {
    const [, fieldName] = String(button.dataset.revealField || "").split(":");
    const input = fieldName ? form.elements?.[fieldName] : null;
    if (!input) return;
    input.type = "password";
    button.textContent = "Show";
  });
}

function updateBankStatementFileName() {
  if (!elements.bankStatementFileName) return;
  const file = elements.bankStatementFile.files?.[0];
  elements.bankStatementFileName.textContent = file ? file.name : "No file selected";
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
    ["Companies", number.format(getActiveCompanies().length), "Active client records"],
    ["Bank imports", number.format(bankImportCount), "Statements saved across all companies"],
    ["Review queue", number.format(reviewQueueCount), "Imported lines still needing attention"],
    ["Next actions", number.format(activeWorkflowCount), "Companies with a live workflow note"],
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
      state.selectedCompanyId = null;
      state.selectedPersonId = button.dataset.person;
      renderCompanyList();
      renderSelfEmployedList();
      renderSelfEmployedPanel();
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
    const result = await window.alignedDesktop.createAccess({ username, password });
    if (!result.ok) {
      setAuthMessage(elements.authMessage, result.message);
      return;
    }
    if (result.requiresConfirmation) {
      elements.setupForm.reset();
      resetSensitiveFields(elements.setupForm, "setup");
      elements.loginForm.elements.username.value = username;
      showAuth(false);
      setAuthMessage(elements.loginMessage, result.message);
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
  state.activeUser = username;
  state.activePassword = password;
  state.offlineMode = false;
  state.syncConflict = false;
  state.syncMessage = state.supabaseConfigured
    ? "Account created and ready to save."
    : "Account created.";
  await hydrateEncryptedData();
  initializeRecords(window.APP_DATA);
  renderCompanyList();
  renderSelfEmployedList();
  unlockWorkspace(username);
}

async function loginLocalAccess() {
  const formData = new FormData(elements.loginForm);
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (window.alignedDesktop?.isDesktop) {
    const result = await window.alignedDesktop.login({ username, password });
    if (!result.ok) {
      setAuthMessage(elements.loginMessage, result.message);
      return;
    }
    state.offlineMode = Boolean(result.offline);
    if (result.message) {
      setAuthMessage(elements.loginMessage, result.message);
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
  state.activeUser = username;
  state.activePassword = password;
  await hydrateEncryptedData();
  initializeRecords(window.APP_DATA);
  renderCompanyList();
  renderSelfEmployedList();
  unlockWorkspace(username);
}

function lockWorkspace() {
  state.authenticated = false;
  state.activeUser = "";
  state.activePassword = "";
  state.lastRemoteSyncAt = "";
  state.offlineMode = false;
  state.syncConflict = false;
  state.syncMessage = "";
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
      <p>The chart is generated from imported statement lines, suggested categories, and a working bank control line for the selected company.</p>
    </article>
    <article class="note-card">
      <h4>What still needs review</h4>
      <p>${reviewQueue ? `${number.format(reviewQueue)} imported entries are still in review or suspense.` : "The imported lines currently map cleanly into the working chart."}</p>
    </article>
  `;
}

function renderVatReport(record) {
  const vat = buildVatReport(record);
  const effectiveRate = vat.isFlatRate
    ? `${((vat.flatRate || 0) * 100).toFixed(2)}% flat rate`
    : vat.isRegistered
      ? "Standard-rate estimate"
      : "Not VAT registered";
  const cards = [
    ["VAT registration", record.vatRegistration || "Not set", "Registration number on file"],
    ["Scheme", record.vatScheme || "Not set", "Current VAT method"],
    ["Next period end", normalizeWorkflow(record.workflow).nextVatPeriodEnd || "Not set", "Workflow planning field"],
    ["Due before", record.deadlines.vatDue || "Not set", "Deadline in the compliance timeline"],
    ["Imported taxable sales", formatCurrency(vat.taxableSales), "Money-in lines mapped to sales income"],
    ["Working VAT due", formatCurrency(vat.estimatedVatDue), effectiveRate],
    ["VAT payments found", formatCurrency(vat.taxPayments), "HMRC and VAT-tagged payments in imported activity"],
    ["Estimated position", formatCurrency(vat.position), vat.position > 0 ? "Still due" : vat.position < 0 ? "Paid ahead" : "Currently even"],
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
      <p>${vat.taxableSales ? "Review the sales lines and VAT payments before using this figure in any submission work." : "Import or categorise statement activity to build the VAT position."}</p>
    </article>
  `;
}

function renderBalanceSheet(record) {
  const sheet = buildBalanceSheet(record);
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
  `;
}

function renderBankImportSummary(record) {
  const imports = record.bankImports || [];
  const entries = imports.flatMap((statement) => (statement.entries || []).map(hydrateStatementEntry));
  const moneyIn = entries.reduce((sum, entry) => sum + (entry.moneyIn || 0), 0);
  const moneyOut = entries.reduce((sum, entry) => sum + (entry.moneyOut || 0), 0);
  const reviewNeeded = entries.filter((entry) => entry.reviewStatus !== "ready").length;
  const cards = [
    ["Statements", number.format(imports.length), "Imported CSV files for this company"],
    ["Rows", number.format(entries.length), "Normalized statement lines saved locally"],
    ["Money in", formatCurrency(moneyIn), "Positive or credit values detected"],
    ["Money out", formatCurrency(moneyOut), "Negative or debit values detected"],
    ["Review queue", number.format(reviewNeeded), "Entries that still need manual categorisation or checking"],
    ["Categorised", number.format(entries.length - reviewNeeded), "Entries with a suggested bookkeeping category"],
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
                  <th>Category</th>
                  <th>Review</th>
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
                        <td>${escapeHtml(entry.category || "Needs review")}</td>
                        <td>${escapeHtml(entry.reviewStatus || "needs-review")}</td>
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
  renderBankImports(record);
  renderCompanyChart(record);
  renderVatReport(record);
  renderBalanceSheet(record);
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
    category: entry.category || categoryInfo.category,
    reviewStatus: entry.reviewStatus || categoryInfo.reviewStatus,
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
      categorizedCount: 0,
      reviewNeededCount: 0,
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
    updateBankStatementFileName();
    renderStats();
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

  renderStats();
  renderCompanyPanel("company-bank-import");
  setSaveState(elements.companySaveState, "Statement removed");
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
    workflow: normalizeWorkflow(edits.workflow),
    companyNumber: edits.companyNumber || company.company_number,
  };
  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  renderStats();
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
  renderSelfEmployedList();
  renderStats();
  renderArchivedRecords();
  if (elements.settingsPanel.classList.contains("hidden")) {
    state.selectedPersonId = personId;
    renderSelfEmployedPanel();
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
  state.selectedCompanyId = null;
  state.selectedPersonId = firstPerson;
  renderCompanyList();
  renderSelfEmployedList();
  renderSelfEmployedPanel();
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
    state.syncMessage = result.offline
      ? result.message || "Opened the encrypted local cache."
      : result.remoteUpdatedAt
        ? `Loaded cloud workspace from ${formatDateTime(result.remoteUpdatedAt)}.`
        : "";
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
    state.selectedPersonId = previousPersonId;
    state.selectedCompanyId = null;
    renderCompanyList();
    renderSelfEmployedList();
    renderSelfEmployedPanel();
    return;
  }

  renderCompanyList();
  renderSelfEmployedList();
}

async function syncWorkspaceNow(force = false) {
  if (!window.alignedDesktop?.isDesktop || !state.activeUser || !state.activePassword) return;
  const result = await persistDesktopData({ force });
  if (result?.ok) {
    setSaveState(elements.settingsSaveState, force ? "Cloud workspace overwritten from this machine" : "Workspace saved");
  } else if (result?.message) {
    setSaveState(elements.settingsSaveState, result.message);
  }
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
  setSaveState(elements.settingsSaveState, "Password updated");
  refreshSyncSurface();
}

function createCompanyRecord() {
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
    vatRegistration,
    vatScheme,
    utr,
    address,
    generalNotes: [contactName, contactNote, yearEndNote, note].filter(Boolean).join("\n"),
  };

  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  saveRecords(CUSTOM_COMPANIES_KEY, state.customCompanies);
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
  setSaveState(elements.createCompanyState, `Created ${displayName}`);
}

function createPersonRecord() {
  const formData = new FormData(elements.addPersonForm);
  const fullName = String(formData.get("fullName") || "").trim();
  const tradingName = String(formData.get("tradingName") || "").trim();
  const utr = String(formData.get("utr") || "").trim();
  const nino = String(formData.get("nino") || "").trim();
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
    utr,
    nino,
    dateOfBirth,
    nationality,
    address,
    notes,
  };

  saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  saveRecords(CUSTOM_PEOPLE_KEY, state.customPeople);
  elements.addPersonForm.reset();
  setPersonWizardStep("identity");
  state.selectedCompanyId = null;
  state.selectedPersonId = fullName;
  renderStats();
  renderCompanyList();
  renderSelfEmployedList();
  renderSelfEmployedPanel();
  setSaveState(elements.createPersonState, `Created ${fullName}`);
}

function filterCompanies(query) {
  const lowered = query.trim().toLowerCase();
  state.filteredCompanies = getActiveCompanies().filter((company) => {
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
  state.summary = {
    ...data.summary,
    transaction_csv_file_count: 0,
    years_present: {},
  };
  state.companyRecords = loadSavedRecords(COMPANY_STORAGE_KEY);
  state.personRecords = loadSavedRecords(PERSON_STORAGE_KEY);
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
  });
  getSelfEmployedPeople().forEach((person) => {
    state.personRecords[person] ??= personDefaults(person);
    state.personRecords[person] = normalizeArchivedState(state.personRecords[person]);
  });

  saveRecords(COMPANY_STORAGE_KEY, state.companyRecords);
  saveRecords(PERSON_STORAGE_KEY, state.personRecords);
  state.filteredCompanies = getActiveCompanies();
  state.selectedCompanyId = getActiveCompanies()[0]?.company_number || null;
  refreshSyncSurface();
}

function bindEvents() {
  bindCompanyTabs();

  elements.companySearch.addEventListener("input", (event) => {
    filterCompanies(event.target.value);
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
  elements.savePersonButton.addEventListener("click", applyPersonEdits);
  elements.resetPersonButton.addEventListener("click", resetCurrentPersonView);
  elements.archivePersonButton.addEventListener("click", archiveSelectedPerson);

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
}

async function loadApp() {
  const data = window.APP_DATA;
  if (!data) {
    throw new Error("Run scripts/analyze_export.py to regenerate app/dashboard-data.js.");
  }

  initializeRecords(data);
  bindEvents();
  setCompanyWizardStep("identity");
  setPersonWizardStep("identity");
  renderHeader(data);
  renderStats();
  renderCompanyList();
  renderSelfEmployedList();
  renderArchivedRecords();
  refreshSyncSurface();
  if (window.alignedDesktop?.isDesktop) {
    const status = await window.alignedDesktop.authStatus();
    state.supabaseConfigured = Boolean(status.configured);
    showAuth(status.configured ? false : !status.hasAccess);
    if (status.username) {
      elements.loginForm.elements.username.value = status.username;
    }
    if (status.username && elements.changePasswordForm) {
      elements.changePasswordForm.elements.username.value = status.username;
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
