import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — Deep Navy / Midnight Blue Premium Theme
═══════════════════════════════════════════════════════════════ */
const T = {
  bg:        "#020817",
  surface:   "#060f24",
  surface2:  "#091329",
  surface3:  "#0d1a35",
  surface4:  "#122040",
  surface5:  "#162848",
  border:    "#ffffff08",
  border2:   "#ffffff14",
  border3:   "#ffffff22",
  text:      "#e2eaf8",
  muted:     "#5e7399",
  faint:     "#243554",
  emerald:   "#00e5b0",
  emeraldD:  "#00b388",
  emeraldBg: "#00e5b012",
  red:       "#ff3358",
  redBg:     "#ff335812",
  amber:     "#ffb020",
  amberBg:   "#ffb02012",
  blue:      "#4f8ef7",
  blueBg:    "#4f8ef712",
  violet:    "#b06fff",
  violetBg:  "#b06fff12",
  cyan:      "#00d4ff",
  cyanBg:    "#00d4ff12",
  pink:      "#ff6eb4",
  pinkBg:    "#ff6eb412",
  indigo:    "#6875f5",
  indigoBg:  "#6875f512",
  gold:      "#ffd700",
  goldBg:    "#ffd70012",
};

/* ═══════════════════════════════════════════════════════════════
   RICH CUSTOMER PROFILE DATA
═══════════════════════════════════════════════════════════════ */
const customerProfiles = {
  "ACC-0042": {
    id: "ACC-0042", name: "Rajesh Malhotra", avatar: "RM", clr: T.red,
    age: 47, gender: "Male", dob: "12 Mar 1977",
    occupation: "Business Owner", employer: "Malhotra Exports Pvt. Ltd.",
    income: "₹18,40,000 / yr", netWorth: "₹2.4 Cr (est.)",
    phone: "+91 98204 33210", email: "r.malhotra@malhotraexports.com",
    address: "14B, Juhu Scheme, Mumbai 400049",
    region: "Mumbai North", aadhaar: "XXXX-XXXX-7821", pan: "BKRPM4821K",
    kycStatus: "Verified", kycDate: "14 Aug 2021",
    accountType: "Current + Savings", accountSince: "6 Mar 2015",
    creditScore: 592, cibil: 592,
    balance: "₹8,24,500", savingsBalance: "₹3,10,200", fdBalance: "₹12,00,000",
    totalExposure: "₹23,34,700",
    riskScore: 94, riskLevel: "Critical", status: "Urgent",
    type: "Fraud", trigger: "High-value threshold",
    prevFlag: true, flagCount: 3,
    lastActivity: "Large withdrawal ₹5L", lastLogin: "Today 09:12 AM",
    loginDevice: "iPhone 14 Pro · Mumbai",
    loans: [
      { type: "Business Loan", amount: "₹45,00,000", emi: "₹94,500", outstanding: "₹28,40,000", status: "Active", dpd: 0 },
      { type: "Car Loan", amount: "₹8,00,000", emi: "₹18,200", outstanding: "₹2,10,000", status: "Active", dpd: 0 },
    ],
    cards: [
      { type: "Platinum Credit", limit: "₹5,00,000", used: "₹3,82,000", util: 76, status: "Active" },
      { type: "Debit Card", limit: "₹2,00,000/day", used: "₹5,00,000", util: 100, status: "Blocked" },
    ],
    recentTxns: [
      { date: "28 Mar 09:11", desc: "ATM Withdrawal — Andheri West", amount: "−₹5,00,000", type: "debit", flag: true },
      { date: "27 Mar 23:44", desc: "NEFT Transfer — Unknown Beneficiary", amount: "−₹1,20,000", type: "debit", flag: true },
      { date: "27 Mar 18:30", desc: "POS Purchase — Duty Free Stores BOM", amount: "−₹84,500", type: "debit", flag: false },
      { date: "26 Mar 11:20", desc: "Salary Credit — Malhotra Exports", amount: "+₹1,53,333", type: "credit", flag: false },
      { date: "25 Mar 15:10", desc: "IMPS — International Transfer AED", amount: "−₹2,30,000", type: "debit", flag: true },
      { date: "24 Mar 09:00", desc: "FD Liquidation Premature", amount: "+₹6,00,000", type: "credit", flag: true },
    ],
    alerts: ["₹5L withdrawal exceeds daily threshold", "3 intl transfers in 48 hrs", "Device location: Dubai (last login Mumbai)"],
    behavioralScore: { txnFreq: 87, geoloc: 95, deviceTrust: 42, timePattern: 78 },
    monthlySpend: [82000, 91000, 78000, 110000, 143000, 520000],
    investigationNotes: "Subject has liquidated FD and made large cash withdrawal. Prior flag in 2022 for round-tripping. KYC re-verification pending.",
    assignedTo: "Priya Mehta",
    caseStatus: "Under Investigation",
  },
  "ACC-1183": {
    id: "ACC-1183", name: "Sunita Kapoor", avatar: "SK", clr: T.amber,
    age: 38, gender: "Female", dob: "05 Sep 1986",
    occupation: "HR Manager", employer: "TechNova Solutions Ltd.",
    income: "₹9,60,000 / yr", netWorth: "₹48 L (est.)",
    phone: "+91 99110 44812", email: "sunita.kapoor@technovasol.com",
    address: "C-402, DLF Phase IV, Gurugram 122009",
    region: "Delhi NCR", aadhaar: "XXXX-XXXX-3341", pan: "CKSUN7341P",
    kycStatus: "Verified", kycDate: "22 Jan 2020",
    accountType: "Savings", accountSince: "14 Feb 2018",
    creditScore: 648, cibil: 648,
    balance: "₹2,10,900", savingsBalance: "₹2,10,900", fdBalance: "₹0",
    totalExposure: "₹14,40,900",
    riskScore: 78, riskLevel: "High", status: "Review",
    type: "Bankruptcy", trigger: "Payment frequency anomaly",
    prevFlag: false, flagCount: 1,
    lastActivity: "Missed 3 EMI payments", lastLogin: "Yesterday 7:44 PM",
    loginDevice: "Samsung Galaxy S22 · Gurugram",
    loans: [
      { type: "Home Loan", amount: "₹32,00,000", emi: "₹28,400", outstanding: "₹29,80,000", status: "NPA Risk", dpd: 62 },
      { type: "Personal Loan", amount: "₹3,00,000", emi: "₹9,800", outstanding: "₹2,10,000", status: "NPA Risk", dpd: 45 },
    ],
    cards: [
      { type: "Gold Credit", limit: "₹2,00,000", used: "₹1,88,000", util: 94, status: "Active" },
    ],
    recentTxns: [
      { date: "28 Mar 08:00", desc: "EMI Bounce — HDFC Home Loan", amount: "−₹28,400", type: "debit", flag: true },
      { date: "25 Mar 19:30", desc: "UPI Transfer — Personal Contact", amount: "−₹15,000", type: "debit", flag: false },
      { date: "22 Mar 08:00", desc: "EMI Bounce — HDFC Home Loan", amount: "−₹28,400", type: "debit", flag: true },
      { date: "18 Mar 12:44", desc: "Salary Credit — TechNova", amount: "+₹80,000", type: "credit", flag: false },
      { date: "15 Mar 08:00", desc: "EMI Bounce — Home Loan", amount: "−₹28,400", type: "debit", flag: true },
      { date: "10 Mar 18:20", desc: "ATM Withdrawal", amount: "−₹10,000", type: "debit", flag: false },
    ],
    alerts: ["3 consecutive EMI bounces", "Credit utilisation 94%", "Net monthly surplus negative"],
    behavioralScore: { txnFreq: 41, geoloc: 18, deviceTrust: 82, timePattern: 55 },
    monthlySpend: [68000, 71000, 74000, 70000, 81000, 95000],
    investigationNotes: "3 consecutive loan EMI defaults indicate financial stress. Credit card utilisation at 94%. No FD buffer. Probable bankruptcy risk within 90 days.",
    assignedTo: "Priya Mehta",
    caseStatus: "Review",
  },
  "ACC-2291": {
    id: "ACC-2291", name: "Aditya Verma", avatar: "AV", clr: T.amber,
    age: 31, gender: "Male", dob: "19 Nov 1993",
    occupation: "Software Engineer", employer: "InfySys Technologies",
    income: "₹22,00,000 / yr", netWorth: "₹85 L (est.)",
    phone: "+91 77029 91100", email: "aditya.v@infysys.io",
    address: "301, Brigade Residency, Whitefield, Bengaluru 560066",
    region: "Bengaluru", aadhaar: "XXXX-XXXX-5511", pan: "DKADV5511H",
    kycStatus: "Verified", kycDate: "3 Oct 2022",
    accountType: "Savings + Demat", accountSince: "9 Aug 2019",
    creditScore: 731, cibil: 731,
    balance: "₹15,60,000", savingsBalance: "₹15,60,000", fdBalance: "₹8,00,000",
    totalExposure: "₹8,00,000",
    riskScore: 71, riskLevel: "High", status: "Review",
    type: "Fraud", trigger: "Behavioural deviation",
    prevFlag: true, flagCount: 2,
    lastActivity: "Unusual loan application", lastLogin: "Today 11:32 AM",
    loginDevice: "MacBook Pro · Bengaluru",
    loans: [
      { type: "Education Loan (closed)", amount: "₹8,00,000", emi: "−", outstanding: "₹0", status: "Closed", dpd: 0 },
    ],
    cards: [
      { type: "Signature Credit", limit: "₹10,00,000", used: "₹2,40,000", util: 24, status: "Active" },
      { type: "Debit Card", limit: "₹1,00,000/day", used: "₹0", util: 0, status: "Active" },
    ],
    recentTxns: [
      { date: "28 Mar 11:30", desc: "Loan Application — ₹40L Personal Loan", amount: "Applied", type: "event", flag: true },
      { date: "27 Mar 22:14", desc: "Login — Singapore IP 203.32.11.4", amount: "Event", type: "event", flag: true },
      { date: "26 Mar 16:20", desc: "NEFT — Offshore Account Mauritius", amount: "−₹4,00,000", type: "debit", flag: true },
      { date: "25 Mar 09:00", desc: "Salary Credit", amount: "+₹1,83,333", type: "credit", flag: false },
      { date: "24 Mar 20:10", desc: "Crypto Exchange UPI — WazirX", amount: "−₹80,000", type: "debit", flag: false },
      { date: "23 Mar 14:00", desc: "FD Renewal — 90 days", amount: "₹8,00,000", type: "credit", flag: false },
    ],
    alerts: ["Loan application anomaly — unusually high", "Login from Singapore IP", "Offshore transfer detected"],
    behavioralScore: { txnFreq: 62, geoloc: 71, deviceTrust: 65, timePattern: 48 },
    monthlySpend: [95000, 102000, 88000, 120000, 97000, 480000],
    investigationNotes: "Sudden large loan application (₹40L) despite sufficient balance. Prior flag 2023 for crypto wash trading. Offshore transfer to Mauritius shell company suspected.",
    assignedTo: "Arjun Sharma",
    caseStatus: "Escalated",
  },
  "ACC-3304": {
    id: "ACC-3304", name: "Meera Iyer", avatar: "MI", clr: T.blue,
    age: 62, gender: "Female", dob: "30 Apr 1962",
    occupation: "Retired (Professor)", employer: "Madras University (Retired)",
    income: "₹4,20,000 / yr (Pension)", netWorth: "₹1.2 Cr (est.)",
    phone: "+91 94440 21887", email: "meera.iyer62@gmail.com",
    address: "22, Dr. Ambedkar Salai, Adyar, Chennai 600020",
    region: "Chennai", aadhaar: "XXXX-XXXX-8892", pan: "EMIYR8892G",
    kycStatus: "Expired", kycDate: "11 Jun 2019",
    accountType: "Savings + PPF", accountSince: "2 Jan 2002",
    creditScore: 812, cibil: 812,
    balance: "₹3,40,200", savingsBalance: "₹3,40,200", fdBalance: "₹28,00,000",
    totalExposure: "₹0",
    riskScore: 63, riskLevel: "Medium", status: "Monitor",
    type: "Dormancy", trigger: "Dormancy rule (180d)",
    prevFlag: false, flagCount: 1,
    lastActivity: "No activity 180 days", lastLogin: "6 months ago",
    loginDevice: "Unknown Device",
    loans: [],
    cards: [
      { type: "Senior Citizen Savings", limit: "N/A", used: "N/A", util: 0, status: "Active" },
    ],
    recentTxns: [
      { date: "28 Mar 10:42", desc: "Login from Unknown Device", amount: "Event", type: "event", flag: true },
      { date: "28 Mar 10:44", desc: "Attempted ₹2L Withdrawal", amount: "−₹2,00,000", type: "debit", flag: true },
      { date: "28 Sep 2024", desc: "Last Transaction — Pension Credit", amount: "+₹35,000", type: "credit", flag: false },
      { date: "28 Aug 2024", desc: "Pension Credit", amount: "+₹35,000", type: "credit", flag: false },
    ],
    alerts: ["180+ days dormancy then sudden activity", "KYC expired — re-verification needed", "Unknown device first login"],
    behavioralScore: { txnFreq: 12, geoloc: 88, deviceTrust: 14, timePattern: 22 },
    monthlySpend: [0, 0, 0, 0, 0, 200000],
    investigationNotes: "Account dormant for 6 months. Sudden large withdrawal attempt from unrecognised device. KYC expired. Possible account takeover — freeze recommended pending verification.",
    assignedTo: "Priya Mehta",
    caseStatus: "Monitor",
  },
  "ACC-4410": {
    id: "ACC-4410", name: "Farhan Sheikh", avatar: "FS", clr: T.red,
    age: 29, gender: "Male", dob: "14 Jul 1995",
    occupation: "Import-Export Trader", employer: "Self-employed",
    income: "₹7,20,000 / yr (declared)", netWorth: "₹18 L (est.)",
    phone: "+91 98760 55321", email: "farhan.s.biz@gmail.com",
    address: "Plot 42, Banjara Hills, Hyderabad 500034",
    region: "Hyderabad", aadhaar: "XXXX-XXXX-1144", pan: "FKSHE1144J",
    kycStatus: "Pending Recheck", kycDate: "1 Feb 2023",
    accountType: "Current", accountSince: "15 Mar 2023",
    creditScore: 540, cibil: 540,
    balance: "₹92,000", savingsBalance: "₹0", fdBalance: "₹0",
    totalExposure: "₹0",
    riskScore: 88, riskLevel: "Critical", status: "Urgent",
    type: "Fraud", trigger: "Location mismatch",
    prevFlag: false, flagCount: 1,
    lastActivity: "Multiple intl transfers", lastLogin: "Today 07:58 AM",
    loginDevice: "Android · Dubai, UAE",
    loans: [],
    cards: [
      { type: "Basic Debit", limit: "₹50,000/day", used: "₹50,000", util: 100, status: "Blocked" },
    ],
    recentTxns: [
      { date: "28 Mar 07:58", desc: "Login — Dubai UAE 185.44.21.9", amount: "Event", type: "event", flag: true },
      { date: "28 Mar 05:14", desc: "International Wire — UAE Account", amount: "−₹3,40,000", type: "debit", flag: true },
      { date: "27 Mar 23:01", desc: "International Wire — Hong Kong", amount: "−₹2,80,000", type: "debit", flag: true },
      { date: "27 Mar 18:22", desc: "Cash Deposit — Hyderabad Branch", amount: "+₹6,80,000", type: "credit", flag: true },
      { date: "27 Mar 10:14", desc: "Login — Hyderabad 103.21.44.8", amount: "Event", type: "event", flag: false },
      { date: "26 Mar 14:40", desc: "Cash Deposit — Hyderabad Branch", amount: "+₹5,00,000", type: "credit", flag: false },
    ],
    alerts: ["Login from Dubai 2hrs after Hyderabad login", "₹6.2L intl transfers in 24hrs", "Cash deposits then immediate wire transfers (structuring)"],
    behavioralScore: { txnFreq: 91, geoloc: 99, deviceTrust: 21, timePattern: 82 },
    monthlySpend: [12000, 18000, 22000, 690000, 840000, 620000],
    investigationNotes: "Classic hawala / structuring pattern. Cash deposits followed by immediate international wire transfers. Location impossibility (Hyderabad → Dubai in 2hrs). Urgent freeze recommended.",
    assignedTo: "Arjun Sharma",
    caseStatus: "Frozen",
  },
  "ACC-5521": {
    id: "ACC-5521", name: "Priya Nair", avatar: "PN", clr: T.violet,
    age: 34, gender: "Female", dob: "21 Jan 1991",
    occupation: "Marketing Manager", employer: "Indus Consumer Brands",
    income: "₹12,80,000 / yr", netWorth: "₹62 L (est.)",
    phone: "+91 91580 77340", email: "priya.nair@indusbrand.co",
    address: "F-7, Amanora Chambers, Hadapsar, Pune 411028",
    region: "Pune", aadhaar: "XXXX-XXXX-6672", pan: "GNPNA6672K",
    kycStatus: "Verified", kycDate: "18 Mar 2022",
    accountType: "Savings", accountSince: "22 Jun 2017",
    creditScore: 698, cibil: 698,
    balance: "₹4,80,000", savingsBalance: "₹4,80,000", fdBalance: "₹5,00,000",
    totalExposure: "₹22,80,000",
    riskScore: 55, riskLevel: "Medium", status: "Monitor",
    type: "Bankruptcy", trigger: "Credit limit breach",
    prevFlag: true, flagCount: 2,
    lastActivity: "Credit utilisation 94%", lastLogin: "Today 09:55 AM",
    loginDevice: "Chrome Browser · Pune",
    loans: [
      { type: "Personal Loan", amount: "₹5,00,000", emi: "₹11,200", outstanding: "₹3,40,000", status: "Active", dpd: 0 },
      { type: "Vehicle Loan", amount: "₹8,00,000", emi: "₹16,400", outstanding: "₹5,80,000", status: "Active", dpd: 14 },
    ],
    cards: [
      { type: "Rewards Credit", limit: "₹3,00,000", used: "₹2,82,000", util: 94, status: "Active" },
      { type: "Co-brand Card", limit: "₹1,50,000", used: "₹1,41,000", util: 94, status: "Active" },
    ],
    recentTxns: [
      { date: "28 Mar 09:50", desc: "Online Shopping — Myntra", amount: "−₹12,400", type: "debit", flag: false },
      { date: "27 Mar 12:00", desc: "Credit Card Bill Payment (partial)", amount: "−₹5,000", type: "debit", flag: true },
      { date: "26 Mar 08:00", desc: "Vehicle Loan EMI — 14 DPD bounce", amount: "−₹16,400", type: "debit", flag: true },
      { date: "25 Mar 09:00", desc: "Salary Credit — Indus Consumer", amount: "+₹1,06,666", type: "credit", flag: false },
      { date: "22 Mar 20:30", desc: "UPI — Zomato / Swiggy", amount: "−₹2,800", type: "debit", flag: false },
      { date: "20 Mar 15:44", desc: "Cash Advance — Credit Card", amount: "−₹20,000", type: "debit", flag: true },
    ],
    alerts: ["Combined credit utilisation 94%", "Vehicle loan 14 days overdue", "Cash advance on credit card"],
    behavioralScore: { txnFreq: 58, geoloc: 22, deviceTrust: 76, timePattern: 61 },
    monthlySpend: [78000, 84000, 91000, 88000, 102000, 109000],
    investigationNotes: "High credit utilisation across two cards. Vehicle loan DPD at 14. Spending pattern inconsistent with income. Monitor for 30 days before escalation.",
    assignedTo: "Kavya Reddy",
    caseStatus: "Monitoring",
  },
};

const flaggedAccounts = Object.values(customerProfiles);

/* ═══════════════════════════════════════════════════════════════
   ROLES
═══════════════════════════════════════════════════════════════ */
const ROLES = {
  "Data Analyst": {
    color: T.cyan, bg: T.cyanBg, icon: "eye",
    desc: "Real-time Monitoring · Alert Detection",
    nav: [
      { section: "Monitoring" },
      { icon: "grid", label: "Live Monitor", badge: null },
      { icon: "zap", label: "Alert Console", badge: "12" },
      { icon: "analytics", label: "Transaction Stats" },
      { section: "Detection Rules" },
      { icon: "filter", label: "Threshold Rules" },
      { icon: "risk", label: "Frequency Checks" },
      { icon: "flag", label: "Suspicious Queue" },
      { section: "Reports" },
      { icon: "bar", label: "Daily Reports" },
      { icon: "settings", label: "Settings" },
    ],
    can: ["view", "flag", "alert", "report"],
    user: { name: "Kavya Reddy", init: "KR", title: "Senior Data Analyst" },
    email: "kavya.reddy@nexusbank.in",
  },
  "Risk Analyst": {
    color: T.amber, bg: T.amberBg, icon: "risk",
    desc: "Investigation Layer · Risk Assessment",
    nav: [
      { section: "Overview" },
      { icon: "grid", label: "Dashboard", badge: null },
      { icon: "analytics", label: "Analytics" },
      { section: "Risk Management" },
      { icon: "flag", label: "Flagged Accounts" },
      { icon: "risk", label: "Risk Signals" },
      { icon: "log", label: "Audit Trail" },
      { section: "Workflow" },
      { icon: "tasks", label: "Task Board" },
      { section: "System" },
      { icon: "settings", label: "Settings" },
    ],
    can: ["view", "flag", "assign", "investigate", "report"],
    user: { name: "Priya Mehta", init: "PM", title: "Risk Analyst II" },
    email: "priya.mehta@nexusbank.in",
  },
  "Senior Business Analyst": {
    color: T.violet, bg: T.violetBg, icon: "users",
    desc: "Strategic Layer · Executive Intelligence",
    nav: [
      { section: "Executive" },
      { icon: "grid", label: "Dashboard", badge: null },
      { icon: "analytics", label: "Business Analytics" },
      { icon: "bar", label: "Strategic Reports" },
      { section: "Risk Management" },
      { icon: "flag", label: "Flagged Accounts" },
      { icon: "risk", label: "Risk Signals" },
      { icon: "log", label: "Audit Trail" },
      { section: "Administration" },
      { icon: "tasks", label: "Task Board" },
      { icon: "users", label: "User Management" },
      { icon: "settings", label: "Settings" },
    ],
    can: ["view", "flag", "assign", "freeze", "delete", "audit", "export", "approve", "report"],
    user: { name: "Arjun Sharma", init: "AS", title: "Head of Risk Analytics" },
    email: "arjun.sharma@nexusbank.in",
  },
};

/* ═══════════════════════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════════════════════ */
const kpiData = [
  { label:"Flagged Accounts", value:247, suffix:"", delta:"+18", dir:"up", color:T.red, spark:[180,188,195,200,210,215,218,222,228,234,241,247], isFloat:false },
  { label:"Avg Risk Score", value:68.4, suffix:"", delta:"+3.2", dir:"up", color:T.amber, spark:[60,62,63,65,64,66,67,66,68,67,69,68], isFloat:true },
  { label:"Cases Resolved", value:89, suffix:"%", delta:"+4", dir:"up", color:T.emerald, spark:[78,79,81,80,83,84,82,85,86,87,88,89], isFloat:false },
  { label:"Active Alerts", value:34, suffix:"", delta:"-7", dir:"down", color:T.blue, spark:[48,45,43,44,41,42,40,39,37,36,35,34], isFloat:false },
];

const txnHours = ["00","02","04","06","08","10","12","14","16","18","20","22"];
const thresholdRules = [
  { name:"High-Value Transaction", operator:">", threshold:"₹2,00,000", triggered:23, status:"Active", lastHit:"2 min ago" },
  { name:"Rapid-Fire Transactions", operator:">", threshold:"30 txns/hr", triggered:8, status:"Active", lastHit:"31 min ago" },
  { name:"International Transfer", operator:"=", threshold:"Cross-border", triggered:5, status:"Active", lastHit:"45 min ago" },
  { name:"Location Mismatch", operator:"!=", threshold:"≥500 km gap", triggered:2, status:"Active", lastHit:"1 hr ago" },
  { name:"Dormancy Break", operator:">", threshold:"180d inactive", triggered:3, status:"Active", lastHit:"3 hr ago" },
  { name:"Credit Utilisation", operator:">", threshold:"90%", triggered:11, status:"Active", lastHit:"18 min ago" },
];

const liveAlerts = [
  { id:"ALT-001", time:"09:42:11", account:"ACC-4410", rule:"Location Mismatch", severity:"critical", value:"Bangalore→Dubai in 2hr", status:"New" },
  { id:"ALT-002", time:"09:38:54", account:"ACC-0042", rule:"High-Value Threshold", severity:"high", value:"₹5,00,000 withdrawal", status:"Assigned" },
  { id:"ALT-003", time:"09:31:20", account:"ACC-7781", rule:"Frequency Check", severity:"high", value:"47 txns in 60 min", status:"New" },
  { id:"ALT-004", time:"09:28:05", account:"ACC-2291", rule:"Unusual Login Pattern", severity:"medium", value:"3 devices, 2 countries", status:"Reviewing" },
  { id:"ALT-005", time:"09:19:33", account:"ACC-5521", rule:"Credit Limit Breach", severity:"medium", value:"Utilisation 94%", status:"Assigned" },
  { id:"ALT-006", time:"09:11:47", account:"ACC-3304", rule:"Dormancy Violation", severity:"low", value:"No activity 180d then ₹80k", status:"New" },
  { id:"ALT-007", time:"08:58:12", account:"ACC-9923", rule:"Round-Amount Pattern", severity:"low", value:"18x ₹10,000 exact", status:"Dismissed" },
  { id:"ALT-008", time:"08:44:39", account:"ACC-1183", rule:"EMI Default Prediction", severity:"medium", value:"3 consecutive misses", status:"Reviewing" },
];

const regionData = [
  { name:"Mumbai", flagged:62, total:1200, pct:78, color:T.red },
  { name:"Delhi NCR", flagged:48, total:980, pct:65, color:T.amber },
  { name:"Bengaluru", flagged:41, total:870, pct:72, color:T.violet },
  { name:"Hyderabad", flagged:36, total:640, pct:58, color:T.blue },
  { name:"Chennai", flagged:29, total:520, pct:44, color:T.cyan },
  { name:"Pune", flagged:31, total:490, pct:61, color:T.emerald },
];

const notifications = [
  { id:1, type:"alert", msg:"ACC-4410 triggered location mismatch rule", time:"1m", read:false, color:T.red },
  { id:2, type:"task", msg:"T-002 assigned to Arjun Sharma", time:"8m", read:false, color:T.blue },
  { id:3, type:"system", msg:"Risk scoring engine v4.2 deployed successfully", time:"31m", read:false, color:T.emerald },
  { id:4, type:"alert", msg:"3 accounts exceeded dormancy threshold today", time:"1hr", read:true, color:T.amber },
  { id:5, type:"task", msg:"T-001 status update: moved to Under Review", time:"2hr", read:true, color:T.violet },
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════════ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: ${T.bg}; color: ${T.text}; font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${T.border2}; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: ${T.border3}; }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
    @keyframes slideInL  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes slideInR  { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes scaleIn   { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
    @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:.2} }
    @keyframes pulseRing { 0%{transform:scale(0.8);opacity:0.9} 100%{transform:scale(2.8);opacity:0} }
    @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes shimmer   { 0%{background-position:-400% 0} 100%{background-position:400% 0} }
    @keyframes float     { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
    @keyframes glow      { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
    @keyframes progressFill { from{width:0%} }
    @keyframes dashOffset{ from{stroke-dashoffset:283} }
    @keyframes scanline  { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }
    @keyframes ripple    { 0%{transform:scale(0);opacity:.6} 100%{transform:scale(5);opacity:0} }
    @keyframes ticker    { 0%{transform:translateX(100%)} 100%{transform:translateX(-100%)} }
    @keyframes waveform  { 0%,100%{height:4px} 50%{height:20px} }
    @keyframes countUp   { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes borderGlow{ 0%,100%{border-color:transparent} 50%{border-color:currentColor} }
    @keyframes slidePanel{ from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }

    .card { transition:all 0.22s cubic-bezier(.4,0,.2,1); position:relative; }
    .card::before {
      content:''; position:absolute; inset:0; border-radius:inherit;
      background:linear-gradient(135deg,rgba(255,255,255,.025) 0%,transparent 60%);
      pointer-events:none; opacity:0; transition:opacity .22s ease;
    }
    .card:hover::before { opacity:1; }
    .card:hover {
      border-color:${T.border3} !important;
      transform:translateY(-2px);
      box-shadow:0 20px 60px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.05);
    }
    .nav-item { transition:all .14s cubic-bezier(.4,0,.2,1); }
    .nav-item:hover { background:${T.surface3} !important; }
    .btn { transition:all .14s ease; cursor:pointer; position:relative; overflow:hidden; }
    .btn::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,0); transition:background .14s; }
    .btn:hover::after { background:rgba(255,255,255,.04); }
    .btn:active { transform:scale(0.97); }
    .row-hover { transition:background .14s ease; cursor:pointer; }
    .row-hover:hover { background:${T.surface3} !important; }
    .customer-row { transition:all .2s ease; cursor:pointer; }
    .customer-row:hover { background:${T.surface3} !important; transform:translateX(2px); }
    .customer-row.selected { background:${T.surface4} !important; }
    .mfa-input {
      width:46px; height:56px; text-align:center; font-size:24px; font-weight:700;
      background:${T.surface2}; border:1.5px solid ${T.border2}; border-radius:12px;
      color:${T.text}; outline:none; font-family:'JetBrains Mono',monospace;
      transition:border-color .15s, box-shadow .15s;
    }
    .mfa-input:focus { border-color:${T.cyan}; box-shadow:0 0 0 3px ${T.cyanBg}; }
    .modal-overlay {
      position:fixed; inset:0; background:rgba(2,8,23,.85); backdrop-filter:blur(12px);
      display:flex; align-items:center; justify-content:center; z-index:100;
      animation:fadeIn .2s ease;
    }
    .modal-panel {
      background:${T.surface}; border:1px solid ${T.border2}; border-radius:22px;
      width:min(540px,95vw); max-height:90vh; overflow-y:auto;
      box-shadow:0 48px 120px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.06);
      animation:scaleIn .25s cubic-bezier(.34,1.56,.64,1);
    }
    .panel-overlay {
      position:fixed; inset:0; background:rgba(2,8,23,.65); backdrop-filter:blur(8px);
      z-index:80; animation:fadeIn .2s ease;
    }
    .customer-panel {
      position:fixed; right:0; top:0; bottom:0; width:min(680px,95vw);
      background:${T.surface}; border-left:1px solid ${T.border2};
      overflow-y:auto; z-index:90;
      box-shadow:-32px 0 80px rgba(0,0,0,.6);
      animation:slidePanel .28s cubic-bezier(.4,0,.2,1);
    }
    .shimmer-bg {
      background: linear-gradient(90deg, ${T.surface2} 0%, ${T.surface4} 50%, ${T.surface2} 100%);
      background-size: 400% 100%;
      animation: shimmer 1.8s ease infinite;
    }
    .ticker-wrap {
      overflow:hidden; white-space:nowrap; background:${T.surface2};
      border-bottom:1px solid ${T.border};
    }
    .ticker-content { display:inline-block; animation:ticker 38s linear infinite; }
    .waveform-bar { display:inline-block; width:3px; background:currentColor; border-radius:2px; margin:0 1px; animation:waveform 1.2s ease-in-out infinite; }
    table { border-collapse:collapse; width:100%; }
    th, td { vertical-align:middle; }
    input, select, textarea { font-family:'DM Sans',sans-serif; }
    input[type='range'] { -webkit-appearance:none; height:4px; border-radius:4px; background:${T.surface4}; outline:none; }
    input[type='range']::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:${T.cyan}; cursor:pointer; }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   TOAST CONTEXT
═══════════════════════════════════════════════════════════════ */
const ToastCtx = React.createContext(() => {});
const useToast = () => React.useContext(ToastCtx);
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3800);
  }, []);
  const typeMap = { success: T.emerald, error: T.red, warning: T.amber, info: T.blue };
  return (
    <ToastCtx.Provider value={add}>
      {children}
      <div style={{ position:"fixed", bottom:20, right:20, zIndex:200, display:"flex", flexDirection:"column", gap:8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: T.surface, border: `1px solid ${typeMap[t.type] || T.blue}30`,
            borderLeft: `3px solid ${typeMap[t.type] || T.blue}`,
            borderRadius: 12, padding: "11px 16px", fontSize: 12.5, color: T.text,
            boxShadow: `0 12px 40px rgba(0,0,0,.5)`,
            animation: "slideInR .28s cubic-bezier(.34,1.56,.64,1)",
            maxWidth: 340, display:"flex", alignItems:"center", gap:10
          }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:typeMap[t.type], flexShrink:0, boxShadow:`0 0 6px ${typeMap[t.type]}` }}/>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ICON SYSTEM
═══════════════════════════════════════════════════════════════ */
const Icon = ({ name, size = 16, color = "currentColor", stroke = 1.8 }) => {
  const s = { width: size, height: size, display:"inline-block", flexShrink:0 };
  const paths = {
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    analytics: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    filter: <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    risk: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
    bar: <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    map: <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    log: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    tasks: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    credit: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    maximize: <><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></>,
    chevronR: <><polyline points="9 18 15 12 9 6"/></>,
    chevronD: <><polyline points="6 9 12 15 18 9"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    eye2: <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>,
  };
  return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || <circle cx="12" cy="12" r="8"/>}
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MINI COMPONENTS
═══════════════════════════════════════════════════════════════ */
const Badge = ({ children, color = "blue", pulse = false, size = "sm" }) => {
  const map = { red:[T.red,T.redBg], amber:[T.amber,T.amberBg], green:[T.emerald,T.emeraldBg], blue:[T.blue,T.blueBg], violet:[T.violet,T.violetBg], cyan:[T.cyan,T.cyanBg] };
  const [c, bg] = map[color] || map.blue;
  const pad = size === "lg" ? "4px 12px" : "2px 8px";
  const fs = size === "lg" ? 11 : 9.5;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:pad, borderRadius:100,
      background:bg, border:`1px solid ${c}22`, fontSize:fs, fontWeight:700,
      color:c, fontFamily:"'Syne',sans-serif", letterSpacing:"0.05em", whiteSpace:"nowrap",
      ...(pulse && { animation:"pulse 1.8s ease-in-out infinite" }) }}>
      {pulse && <span style={{ width:5, height:5, borderRadius:"50%", background:c, flexShrink:0, boxShadow:`0 0 5px ${c}`, animation:"pulse 1.2s infinite" }}/>}
      {children}
    </span>
  );
};

const Sparkline = ({ data, color, height = 26, width = 60 }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow:"visible" }}>
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const AreaChart = ({ data, labels, color, height = 80 }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const w = 100, h = height;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`);
  const area = `${pts.join(" ")} ${w},${h} 0,${h}`;
  const id = `area-${color.replace("#","")}`;
  return (
    <svg viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" style={{ width:"100%", height }} overflow="visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon fill={`url(#${id})`} points={area}/>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts.join(" ")} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
      {data.map((v, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - ((v - min) / range) * h} r="1.5" fill={color} vectorEffect="non-scaling-stroke"/>
      ))}
    </svg>
  );
};

const RingProgress = ({ pct, color, size = 52, stroke = 5 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`${color}20`} strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        style={{ animation:"dashOffset .8s ease forwards", filter:`drop-shadow(0 0 4px ${color}80)` }}/>
      <text x={size/2} y={size/2} dominantBaseline="middle" textAnchor="middle"
        fill={color} fontSize={size > 44 ? 11 : 9} fontWeight="700" fontFamily="'JetBrains Mono',monospace"
        style={{ transform:"rotate(90deg)", transformOrigin:`${size/2}px ${size/2}px` }}>
        {pct}
      </text>
    </svg>
  );
};

const Card = ({ children, style = {}, className = "" }) => (
  <div className={`card ${className}`} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:18, overflow:"hidden", ...style }}>{children}</div>
);

const CardHead = ({ title, sub, action }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px 14px", borderBottom:`1px solid ${T.border}`, flexWrap:"wrap", gap:8 }}>
    <div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13.5, fontWeight:700, color:T.text }}>{title}</div>
      {sub && <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{sub}</div>}
    </div>
    {action}
  </div>
);

const StatPill = ({ label, value, color }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
    <div style={{ fontSize:9.5, color:T.faint, textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:"'Syne',sans-serif" }}>{label}</div>
    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:700, color: color || T.text }}>{value}</div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   BEHAVIORAL SCORE BARS
═══════════════════════════════════════════════════════════════ */
const BehaviorBar = ({ label, value, color }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span style={{ fontSize:11, color:T.muted }}>{label}</span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:700, color }}>{value}</span>
    </div>
    <div style={{ height:5, background:T.surface4, borderRadius:100, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${value}%`, background:`linear-gradient(90deg, ${color}aa, ${color})`, borderRadius:100, transition:"width .8s ease", boxShadow:`0 0 8px ${color}60` }}/>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   CUSTOMER DETAIL PANEL
═══════════════════════════════════════════════════════════════ */
const CustomerPanel = ({ customer, onClose, userRole }) => {
  const toast = useToast();
  const roleInfo = ROLES[userRole];
  const can = roleInfo.can;
  const [activeTab, setActiveTab] = useState("overview");
  const c = customer;

  const riskColor = c.riskScore >= 80 ? T.red : c.riskScore >= 60 ? T.amber : T.blue;

  const tabs = [
    { id:"overview", label:"Overview" },
    { id:"transactions", label:"Transactions" },
    { id:"credit", label:"Credit Profile" },
    { id:"behavioral", label:"Behavioral Analysis" },
    { id:"investigation", label:"Case Notes" },
  ];

  return (
    <>
      <div className="panel-overlay" onClick={onClose}/>
      <div className="customer-panel">
        {/* Header */}
        <div style={{ background:T.surface2, borderBottom:`1px solid ${T.border2}`, padding:"20px 24px", position:"sticky", top:0, zIndex:10 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:48, height:48, borderRadius:14, background:`${c.clr}20`, border:`2px solid ${c.clr}40`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800,
                color:c.clr, fontFamily:"'Syne',sans-serif", flexShrink:0 }}>{c.avatar}</div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:800, color:T.text }}>{c.name}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:3 }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.muted }}>{c.id}</span>
                  <Badge color={c.riskScore >= 80 ? "red" : c.riskScore >= 60 ? "amber" : "blue"} size="lg" pulse={c.status === "Urgent"}>{c.status}</Badge>
                  <Badge color={c.type === "Fraud" ? "red" : c.type === "Bankruptcy" ? "amber" : "blue"}>{c.type}</Badge>
                </div>
              </div>
            </div>
            <button className="btn" onClick={onClose} style={{ width:36, height:36, borderRadius:10, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name="x" size={14}/>
            </button>
          </div>

          {/* Action buttons */}
          <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
            {can.includes("alert") && (
              <button className="btn" onClick={() => toast(`Alert generated for ${c.id}`, "error")}
                style={{ padding:"6px 14px", borderRadius:9, border:`1px solid ${T.red}30`, background:T.redBg, color:T.red, fontSize:11.5, cursor:"pointer", fontWeight:700, fontFamily:"'Syne',sans-serif" }}>
                🚨 Alert
              </button>
            )}
            {can.includes("flag") && (
              <button className="btn" onClick={() => toast(`${c.id} escalated to Risk Analyst`, "warning")}
                style={{ padding:"6px 14px", borderRadius:9, border:`1px solid ${T.amber}30`, background:T.amberBg, color:T.amber, fontSize:11.5, cursor:"pointer", fontWeight:700, fontFamily:"'Syne',sans-serif" }}>
                ⚑ Escalate
              </button>
            )}
            {can.includes("freeze") && (
              <button className="btn" onClick={() => toast(`${c.id} account frozen`, "success")}
                style={{ padding:"6px 14px", borderRadius:9, border:`1px solid ${T.blue}30`, background:T.blueBg, color:T.blue, fontSize:11.5, cursor:"pointer", fontWeight:700, fontFamily:"'Syne',sans-serif" }}>
                🔒 Freeze Account
              </button>
            )}
            {can.includes("export") && (
              <button className="btn" onClick={() => toast(`Report exported for ${c.id}`, "info")}
                style={{ padding:"6px 14px", borderRadius:9, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:11.5, cursor:"pointer", fontWeight:600, fontFamily:"'Syne',sans-serif" }}>
                ↓ Export
              </button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", gap:4, marginTop:14, borderBottom:`1px solid ${T.border}`, paddingBottom:0 }}>
            {tabs.map(tab => (
              <button key={tab.id} className="btn" onClick={() => setActiveTab(tab.id)} style={{
                padding:"7px 14px", border:"none", background:"transparent", cursor:"pointer",
                fontSize:11.5, fontWeight:activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? T.cyan : T.muted,
                fontFamily:"'Syne',sans-serif", letterSpacing:"0.02em",
                borderBottom: activeTab === tab.id ? `2px solid ${T.cyan}` : "2px solid transparent",
                transition:"all .15s ease",
              }}>{tab.label}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding:"20px 24px" }}>
          {activeTab === "overview" && (
            <div style={{ display:"flex", flexDirection:"column", gap:18, animation:"fadeUp .3s ease" }}>
              {/* Risk Score Hero */}
              <div style={{ background:`${riskColor}08`, border:`1px solid ${riskColor}22`, borderRadius:16, padding:"20px", display:"flex", alignItems:"center", gap:20 }}>
                <RingProgress pct={c.riskScore} color={riskColor} size={80} stroke={7}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Risk Score</div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:34, fontWeight:700, color:riskColor, lineHeight:1 }}>{c.riskScore}<span style={{ fontSize:16, color:T.muted }}>/100</span></div>
                  <div style={{ fontSize:12, color:riskColor, marginTop:4, fontWeight:600 }}>{c.riskLevel} Risk — {c.trigger}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:11, color:T.muted, marginBottom:6 }}>Case Status</div>
                  <Badge color={c.caseStatus === "Frozen" ? "red" : c.caseStatus === "Escalated" ? "amber" : c.caseStatus === "Under Investigation" ? "amber" : "blue"} size="lg">{c.caseStatus}</Badge>
                  <div style={{ fontSize:11, color:T.faint, marginTop:8 }}>Flagged {c.flagCount}x total</div>
                </div>
              </div>

              {/* Alerts */}
              <div style={{ background:T.redBg, border:`1px solid ${T.red}22`, borderRadius:14, padding:"14px 18px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.red, fontFamily:"'Syne',sans-serif", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.08em" }}>⚠ Active Alerts ({c.alerts.length})</div>
                {c.alerts.map((a, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderTop: i > 0 ? `1px solid ${T.red}15` : "none" }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:T.red, flexShrink:0, boxShadow:`0 0 4px ${T.red}` }}/>
                    <span style={{ fontSize:12, color:T.text }}>{a}</span>
                  </div>
                ))}
              </div>

              {/* Personal & Account Info */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <Card style={{ padding:18 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.muted, fontFamily:"'Syne',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Personal Details</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
                    {[
                      ["Age / Gender", `${c.age} yrs · ${c.gender}`],
                      ["Date of Birth", c.dob],
                      ["Occupation", c.occupation],
                      ["Employer", c.employer],
                      ["Annual Income", c.income],
                      ["Net Worth (est.)", c.netWorth],
                    ].map(([l, v]) => (
                      <div key={l} style={{ display:"flex", justifyContent:"space-between", gap:8 }}>
                        <span style={{ fontSize:11, color:T.muted, flexShrink:0 }}>{l}</span>
                        <span style={{ fontSize:11.5, color:T.text, fontWeight:600, textAlign:"right" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card style={{ padding:18 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.muted, fontFamily:"'Syne',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Contact & Identity</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
                    {[
                      ["Phone", c.phone],
                      ["Email", c.email],
                      ["Address", c.address],
                      ["Aadhaar", c.aadhaar],
                      ["PAN", c.pan],
                      ["KYC Status", c.kycStatus],
                    ].map(([l, v]) => (
                      <div key={l} style={{ display:"flex", justifyContent:"space-between", gap:8 }}>
                        <span style={{ fontSize:11, color:T.muted, flexShrink:0 }}>{l}</span>
                        <span style={{ fontSize:11, color: l === "KYC Status" ? (v === "Verified" ? T.emerald : T.red) : T.text, fontWeight:600, textAlign:"right", maxWidth:160, wordBreak:"break-all" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Financial Summary */}
              <Card style={{ padding:18 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.muted, fontFamily:"'Syne',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16 }}>Financial Summary</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:14 }}>
                  {[
                    ["Savings Balance", c.savingsBalance, T.emerald],
                    ["FD / Investments", c.fdBalance, T.blue],
                    ["Total Exposure", c.totalExposure, T.violet],
                    ["Credit Score", c.cibil, c.cibil >= 750 ? T.emerald : c.cibil >= 650 ? T.amber : T.red],
                    ["Account Since", c.accountSince, T.cyan],
                    ["Last Login", c.lastLogin, T.muted],
                  ].map(([l, v, color]) => (
                    <div key={l} style={{ background:T.surface2, borderRadius:12, padding:"12px 14px" }}>
                      <div style={{ fontSize:10, color:T.faint, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"'Syne',sans-serif", marginBottom:5 }}>{l}</div>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:700, color }}>{v}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Monthly spend chart */}
              <Card>
                <CardHead title="Monthly Spend Pattern" sub="Last 6 months (₹)"/>
                <div style={{ padding:"14px 20px 18px" }}>
                  <AreaChart data={c.monthlySpend} labels={["Oct","Nov","Dec","Jan","Feb","Mar"]} color={riskColor} height={70}/>
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
                    {["Oct","Nov","Dec","Jan","Feb","Mar"].map((m,i) => (
                      <span key={m} style={{ fontSize:9, color:T.faint, fontFamily:"'JetBrains Mono',monospace" }}>{m}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "transactions" && (
            <div style={{ animation:"fadeUp .3s ease" }}>
              <div style={{ marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:T.red, boxShadow:`0 0 6px ${T.red}`, animation:"pulse 1.5s infinite" }}/>
                <span style={{ fontSize:12, color:T.muted }}>Showing recent transactions — flagged items highlighted</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {c.recentTxns.map((t, i) => (
                  <div key={i} className="card" style={{
                    background: t.flag ? `${T.red}08` : T.surface2,
                    border: `1px solid ${t.flag ? T.red + "30" : T.border}`,
                    borderRadius:12, padding:"12px 16px",
                    display:"flex", alignItems:"center", gap:12,
                    animation:`slideInL .25s ease ${i*0.05}s both`
                  }}>
                    <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
                      background: t.type === "credit" ? T.emeraldBg : t.type === "event" ? T.blueBg : T.redBg,
                      border:`1px solid ${t.type === "credit" ? T.emerald : t.type === "event" ? T.blue : T.red}28`,
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Icon name={t.type === "credit" ? "trending" : t.type === "event" ? "info" : "download"} size={14} color={t.type === "credit" ? T.emerald : t.type === "event" ? T.blue : T.red}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12.5, fontWeight:600, color:T.text, display:"flex", alignItems:"center", gap:8 }}>
                        {t.desc}
                        {t.flag && <Badge color="red">⚑ Flagged</Badge>}
                      </div>
                      <div style={{ fontSize:10.5, color:T.muted, marginTop:2, fontFamily:"'JetBrains Mono',monospace" }}>{t.date}</div>
                    </div>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:700,
                      color: t.type === "credit" ? T.emerald : t.type === "event" ? T.blue : T.red, flexShrink:0 }}>
                      {t.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "credit" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .3s ease" }}>
              {/* CIBIL Score */}
              <div style={{ background:T.surface2, borderRadius:16, padding:20, display:"flex", alignItems:"center", gap:20 }}>
                <div style={{ position:"relative" }}>
                  <RingProgress pct={Math.round((c.cibil / 900) * 100)} color={c.cibil >= 750 ? T.emerald : c.cibil >= 650 ? T.amber : T.red} size={76} stroke={7}/>
                </div>
                <div>
                  <div style={{ fontSize:11, color:T.muted, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"'Syne',sans-serif", marginBottom:4 }}>CIBIL / Credit Score</div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:36, fontWeight:700, color:c.cibil >= 750 ? T.emerald : c.cibil >= 650 ? T.amber : T.red }}>{c.cibil}</div>
                  <div style={{ fontSize:11.5, color:T.muted, marginTop:3 }}>{c.cibil >= 750 ? "✓ Excellent" : c.cibil >= 650 ? "△ Fair" : "✗ Poor"} · Range: 300–900</div>
                </div>
              </div>

              {/* Loans */}
              {c.loans.length > 0 && (
                <Card>
                  <CardHead title="Active Loans" sub={`${c.loans.length} loan(s) on record`}/>
                  <div style={{ padding:"8px 0" }}>
                    {c.loans.map((loan, i) => (
                      <div key={i} style={{ padding:"14px 20px", borderBottom: i < c.loans.length - 1 ? `1px solid ${T.border}` : "none" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                          <div>
                            <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{loan.type}</div>
                            <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>Original: {loan.amount} · EMI: {loan.emi}</div>
                          </div>
                          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                            <Badge color={loan.status === "Active" ? "green" : loan.status === "Closed" ? "blue" : "red"}>{loan.status}</Badge>
                            {loan.dpd > 0 && <Badge color="red">DPD {loan.dpd}</Badge>}
                          </div>
                        </div>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <span style={{ fontSize:11, color:T.muted }}>Outstanding</span>
                          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:700, color:loan.dpd > 0 ? T.red : T.text }}>{loan.outstanding}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Cards */}
              <Card>
                <CardHead title="Cards on File" sub={`${c.cards.length} card(s)`}/>
                <div style={{ padding:"8px 0" }}>
                  {c.cards.map((card, i) => (
                    <div key={i} style={{ padding:"14px 20px", borderBottom: i < c.cards.length - 1 ? `1px solid ${T.border}` : "none" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{card.type}</div>
                          <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>Limit: {card.limit}</div>
                        </div>
                        <Badge color={card.status === "Active" ? "green" : "red"}>{card.status}</Badge>
                      </div>
                      {card.util > 0 && (
                        <div>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                            <span style={{ fontSize:11, color:T.muted }}>Utilisation</span>
                            <span style={{ fontSize:11, fontFamily:"'JetBrains Mono',monospace", color: card.util >= 80 ? T.red : card.util >= 60 ? T.amber : T.emerald, fontWeight:700 }}>{card.util}%</span>
                          </div>
                          <div style={{ height:5, background:T.surface4, borderRadius:100 }}>
                            <div style={{ height:"100%", width:`${Math.min(card.util, 100)}%`, background: card.util >= 80 ? T.red : card.util >= 60 ? T.amber : T.emerald, borderRadius:100, transition:"width .8s ease" }}/>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === "behavioral" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .3s ease" }}>
              <Card style={{ padding:20 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.muted, fontFamily:"'Syne',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:18 }}>AI Behavioral Risk Indicators</div>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <BehaviorBar label="Transaction Frequency Anomaly" value={c.behavioralScore.txnFreq} color={c.behavioralScore.txnFreq > 70 ? T.red : c.behavioralScore.txnFreq > 40 ? T.amber : T.emerald}/>
                  <BehaviorBar label="Geo-location Risk" value={c.behavioralScore.geoloc} color={c.behavioralScore.geoloc > 70 ? T.red : c.behavioralScore.geoloc > 40 ? T.amber : T.emerald}/>
                  <BehaviorBar label="Device Trust Score" value={c.behavioralScore.deviceTrust} color={c.behavioralScore.deviceTrust < 40 ? T.red : c.behavioralScore.deviceTrust < 70 ? T.amber : T.emerald}/>
                  <BehaviorBar label="Time Pattern Deviation" value={c.behavioralScore.timePattern} color={c.behavioralScore.timePattern > 70 ? T.red : c.behavioralScore.timePattern > 40 ? T.amber : T.emerald}/>
                </div>
              </Card>

              <Card style={{ padding:20 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.muted, fontFamily:"'Syne',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>Last Login Details</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:11.5, color:T.muted }}>Last Login</span>
                    <span style={{ fontSize:11.5, color:T.text, fontWeight:600 }}>{c.lastLogin}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:11.5, color:T.muted }}>Device / Location</span>
                    <span style={{ fontSize:11.5, color:T.text, fontWeight:600 }}>{c.loginDevice}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:11.5, color:T.muted }}>Account Type</span>
                    <span style={{ fontSize:11.5, color:T.text, fontWeight:600 }}>{c.accountType}</span>
                  </div>
                </div>
              </Card>

              <div style={{ background:`${T.violet}08`, border:`1px solid ${T.violet}22`, borderRadius:14, padding:18 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.violet, fontFamily:"'Syne',sans-serif", marginBottom:10 }}>🤖 ML Risk Engine Assessment</div>
                <div style={{ fontSize:12.5, color:T.text, lineHeight:1.7 }}>
                  Based on current behavioral patterns, account <strong style={{ color:T.text }}>{c.id}</strong> falls in the <strong style={{ color:riskColor }}>{c.riskLevel} Risk</strong> category. 
                  Composite ML score: <strong style={{ fontFamily:"'JetBrains Mono',monospace", color:riskColor }}>{c.riskScore}/100</strong>. 
                  Primary trigger: <em>{c.trigger}</em>.
                </div>
              </div>
            </div>
          )}

          {activeTab === "investigation" && (
            <div style={{ display:"flex", flexDirection:"column", gap:14, animation:"fadeUp .3s ease" }}>
              <div style={{ background:T.surface2, border:`1px solid ${T.border}`, borderRadius:14, padding:18 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.muted, fontFamily:"'Syne',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>Case Assignment</div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:12, color:T.muted }}>Assigned To</span>
                  <span style={{ fontSize:12.5, fontWeight:700, color:T.cyan }}>{c.assignedTo}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:12, color:T.muted }}>Case Status</span>
                  <Badge color={c.caseStatus === "Frozen" ? "red" : c.caseStatus === "Escalated" ? "amber" : "blue"}>{c.caseStatus}</Badge>
                </div>
              </div>

              <div style={{ background:T.surface2, border:`1px solid ${T.border}`, borderRadius:14, padding:18 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.muted, fontFamily:"'Syne',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>Investigation Notes</div>
                <div style={{ fontSize:13, color:T.text, lineHeight:1.8, padding:"12px 16px", background:T.surface3, borderRadius:10, border:`1px solid ${T.border}` }}>
                  {c.investigationNotes}
                </div>
              </div>

              {can.includes("flag") && (
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:T.muted, fontFamily:"'Syne',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Add Note</div>
                  <textarea placeholder="Add a note to the case file…" rows={3}
                    style={{ width:"100%", background:T.surface2, border:`1px solid ${T.border2}`, borderRadius:10, padding:"10px 14px", color:T.text, fontSize:12.5, outline:"none", resize:"vertical", fontFamily:"'DM Sans',sans-serif" }}/>
                  <button className="btn" onClick={() => toast("Note added to case file", "success")}
                    style={{ marginTop:8, padding:"8px 18px", borderRadius:9, border:`1px solid ${T.emerald}30`, background:T.emeraldBg, color:T.emerald, fontSize:11.5, cursor:"pointer", fontWeight:700, fontFamily:"'Syne',sans-serif" }}>
                    Save Note
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   LIVE TICKER
═══════════════════════════════════════════════════════════════ */
const LiveTicker = ({ alerts }) => {
  const items = alerts.map(a => `[${a.time}] ${a.account} · ${a.rule} — ${a.value}`).join("   ·   ");
  return (
    <div className="ticker-wrap" style={{ height:28, display:"flex", alignItems:"center" }}>
      <span style={{ fontSize:9.5, color:T.red, fontFamily:"'Syne',sans-serif", fontWeight:700, padding:"0 12px", flexShrink:0, letterSpacing:"0.1em" }}>⬤ LIVE</span>
      <div style={{ flex:1, overflow:"hidden" }}>
        <span className="ticker-content" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:T.muted }}>
          {items}&nbsp;&nbsp;&nbsp;&nbsp;{items}
        </span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   DATA ANALYST — LIVE MONITOR (ENHANCED REAL-TIME)
═══════════════════════════════════════════════════════════════ */
const LiveMonitorPage = ({ userRole }) => {
  const toast = useToast();
  const [tick, setTick] = useState(0);
  const [streamLog, setStreamLog] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1);
      // Simulate real-time event
      const events = [
        { account:"ACC-0042", event:"High-value ATM attempt ₹2L", severity:"critical" },
        { account:"ACC-4410", event:"Login from new IP 185.44.21.10", severity:"high" },
        { account:"ACC-7821", event:"Rapid transactions — 18 in 10min", severity:"medium" },
        { account:"ACC-3304", event:"Password reset request", severity:"low" },
        { account:"ACC-1183", event:"EMI bounce detected", severity:"high" },
      ];
      const e = events[Math.floor(Math.random() * events.length)];
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}:${now.getSeconds().toString().padStart(2,"0")}`;
      setStreamLog(prev => [{ ...e, time, id:Date.now() }, ...prev.slice(0, 24)]);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const liveStats = [
    { label:"Transactions / Min", value:(247 + tick * 3).toLocaleString(), color:T.cyan, icon:"activity", delta:`+${tick*3}` },
    { label:"Active Alerts", value:"12", color:T.red, icon:"zap", delta:"+2" },
    { label:"Rules Triggered", value:(34 + tick % 5).toString(), color:T.amber, icon:"filter", delta:"+1" },
    { label:"Accounts Monitored", value:"8,412", color:T.emerald, icon:"database", delta:"Live" },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .4s ease" }}>
      {/* Live banner */}
      <div style={{ background:`${T.cyan}08`, border:`1px solid ${T.cyan}20`, borderRadius:14, padding:"12px 20px",
        display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:T.cyan, boxShadow:`0 0 10px ${T.cyan}`, animation:"pulse 1.2s infinite" }}/>
          <div style={{ position:"absolute", width:10, height:10, borderRadius:"50%", border:`2px solid ${T.cyan}`, animation:"pulseRing 1.2s ease-out infinite" }}/>
          <span style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:800, color:T.cyan, letterSpacing:"0.08em" }}>LIVE MONITORING ACTIVE</span>
        </div>
        <span style={{ fontSize:12, color:T.muted }}>Real-time transaction surveillance · Refreshing every 4s</span>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:16 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="waveform-bar" style={{ color:T.cyan, animationDelay:`${i * 0.12}s` }}/>
          ))}
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.faint }}>tick #{tick}</span>
        </div>
      </div>

      {/* Live KPI cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14 }}>
        {liveStats.map((s, i) => (
          <div key={i} className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"20px",
            animation:`fadeUp .3s ease ${i*0.07}s both`, borderTop:`2px solid ${s.color}50`,
            boxShadow:`0 0 30px ${s.color}08` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.muted, fontFamily:"'Syne',sans-serif" }}>{s.label}</span>
              <div style={{ width:32, height:32, borderRadius:9, background:`${s.color}14`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name={s.icon} size={14} color={s.color}/>
              </div>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:28, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:10.5, color:T.muted, marginTop:8 }}>
              <span style={{ color:T.emerald }}>{s.delta}</span> since last refresh
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Real-time stream */}
      <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:14 }}>
        <Card>
          <CardHead title="Live Transaction Volume" sub="Rolling 12-hour window"/>
          <div style={{ padding:"14px 20px 18px" }}>
            <AreaChart data={[1240,1380,1190,1520,1690,1840,2010,1750,1920,2180,2040,2310+tick*12].map(v => v + (Math.sin(tick+v) * 80))} labels={txnHours} color={T.cyan} height={90}/>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
              {txnHours.map(h => <span key={h} style={{ fontSize:9, color:T.faint, fontFamily:"'JetBrains Mono',monospace" }}>{h}</span>)}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderTop:`1px solid ${T.border}` }}>
            {[{l:"Peak",v:"12:00",c:T.cyan},{l:"Total Today",v:(21340+tick*247).toLocaleString(),c:T.text},{l:"Anomalies",v:(34+tick%4).toString(),c:T.amber}].map((s,i)=>(
              <div key={i} style={{ padding:"13px 18px", borderRight:i<2?`1px solid ${T.border}`:"none" }}>
                <div style={{ fontSize:10, color:T.faint, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"'Syne',sans-serif", marginBottom:4 }}>{s.l}</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:15, fontWeight:700, color:s.c }}>{s.v}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Real-time event stream */}
        <Card>
          <CardHead title="Event Stream" sub={<span style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:6, height:6, borderRadius:"50%", background:T.red, animation:"pulse 1s infinite" }}/> Live feed</span>}/>
          <div style={{ maxHeight:240, overflowY:"auto" }}>
            {streamLog.length === 0 ? (
              <div style={{ padding:"20px", textAlign:"center", color:T.faint, fontSize:12 }}>Waiting for events…</div>
            ) : streamLog.map((e, i) => {
              const sev = { critical:T.red, high:T.amber, medium:T.blue, low:T.emerald };
              const c = sev[e.severity] || T.blue;
              return (
                <div key={e.id} className="row-hover" style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 16px",
                  borderBottom:`1px solid ${T.border}`, animation:`slideInL .25s ease`, background: i === 0 ? `${c}08` : "transparent" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:c, flexShrink:0, boxShadow: i === 0 ? `0 0 6px ${c}` : "none" }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:c, fontWeight:700 }}>{e.account}</span>
                      <span style={{ fontSize:10.5, color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.event}</span>
                    </div>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9.5, color:T.faint }}>{e.time}</span>
                  </div>
                  <Badge color={e.severity === "critical" ? "red" : e.severity === "high" ? "amber" : e.severity === "medium" ? "blue" : "green"} pulse={e.severity === "critical"}>{e.severity}</Badge>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Alert Console Table */}
      <Card>
        <CardHead title="Alert Console" sub="Click any account to view full customer profile"
          action={<div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:7, height:7, borderRadius:"50%", background:T.red, animation:"pulse 1.2s infinite" }}/><span style={{ fontSize:11, color:T.muted }}>{liveAlerts.filter(a => a.status === "New").length} new</span></div>}/>
        <div style={{ overflowX:"auto" }}>
          <table>
            <thead>
              <tr style={{ background:T.surface2 }}>
                {["Time","Alert ID","Account","Rule","Value","Severity","Status","Actions"].map(h => (
                  <th key={h} style={{ textAlign:"left", fontSize:9.5, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:T.faint, padding:"9px 14px", borderBottom:`1px solid ${T.border}`, fontFamily:"'Syne',sans-serif", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {liveAlerts.map((a, i) => {
                const sev = { critical:[T.red,"red"], high:[T.amber,"amber"], medium:[T.blue,"blue"], low:[T.emerald,"green"] };
                const [c, b] = sev[a.severity] || sev.low;
                const profile = customerProfiles[a.account];
                return (
                  <tr key={i} className="customer-row" style={{ borderBottom:`1px solid ${T.border}` }}
                    onClick={() => profile ? setSelectedCustomer(profile) : toast(`No profile for ${a.account}`, "info")}>
                    <td style={{ padding:"11px 14px", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.faint }}>{a.time}</td>
                    <td style={{ padding:"11px 14px", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.cyan }}>{a.id}</td>
                    <td style={{ padding:"11px 14px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11.5, color:T.text, fontWeight:700 }}>{a.account}</span>
                        {profile && <span style={{ fontSize:9.5, color:T.muted }}>{profile.name}</span>}
                        {profile && <Icon name="chevronR" size={10} color={T.faint}/>}
                      </div>
                    </td>
                    <td style={{ padding:"11px 14px", color:T.muted, fontSize:12 }}>{a.rule}</td>
                    <td style={{ padding:"11px 14px", color:T.text, fontSize:11, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.value}</td>
                    <td style={{ padding:"11px 14px" }}><Badge color={b} pulse={a.severity === "critical"}>{a.severity}</Badge></td>
                    <td style={{ padding:"11px 14px" }}><Badge color={a.status === "New" ? "red" : a.status === "Assigned" ? "amber" : a.status === "Reviewing" ? "blue" : "green"}>{a.status}</Badge></td>
                    <td style={{ padding:"11px 14px" }}>
                      <div style={{ display:"flex", gap:5 }} onClick={e => e.stopPropagation()}>
                        <button className="btn" onClick={() => toast(`${a.account} assigned`, "success")}
                          style={{ padding:"4px 10px", borderRadius:7, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:10.5, cursor:"pointer" }}>Assign</button>
                        <button className="btn" onClick={() => toast(`${a.account} escalated`, "warning")}
                          style={{ padding:"4px 10px", borderRadius:7, border:`1px solid ${T.amber}30`, background:T.amberBg, color:T.amber, fontSize:10.5, cursor:"pointer", fontWeight:600 }}>Escalate</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Customer Profile Slide Panel */}
      {selectedCustomer && (
        <CustomerPanel customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} userRole={userRole}/>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   DATA ANALYST — SUSPICIOUS QUEUE (ENHANCED WITH CLICK-THROUGH)
═══════════════════════════════════════════════════════════════ */
const SuspiciousQueuePage = ({ userRole }) => {
  const toast = useToast();
  const [filter, setFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = flaggedAccounts.filter(a => {
    const matchFilter = filter === "All" || a.type === filter;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .4s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:14 }}>
        {[
          { label:"Suspicious Accounts", value:"247", color:T.red, icon:"flag", sub:"Rule-based detections" },
          { label:"Pending Review", value:"34", color:T.amber, icon:"clock", sub:"Awaiting analyst" },
          { label:"Resolved Today", value:"12", color:T.emerald, icon:"check", sub:"Closed cases" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"22px",
            animation:`fadeUp .3s ease ${i*0.07}s both`, borderTop:`2px solid ${s.color}40` }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.muted, fontFamily:"'Syne',sans-serif" }}>{s.label}</span>
              <div style={{ width:34, height:34, borderRadius:10, background:`${s.color}14`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon name={s.icon} size={15} color={s.color}/>
              </div>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:34, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:11, color:T.faint, marginTop:8 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <Card>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 22px 14px", borderBottom:`1px solid ${T.border}`, flexWrap:"wrap", gap:8 }}>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13.5, fontWeight:700, color:T.text }}>Suspicious Account Queue</div>
            <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>Click any row to view full customer intelligence profile</div>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:9, padding:"0 12px", height:33, width:180 }}>
              <Icon name="search" size={11} color={T.faint}/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name / ID…"
                style={{ background:"none", border:"none", outline:"none", fontSize:12, color:T.text, fontFamily:"inherit", width:"100%", caretColor:T.cyan }}/>
            </div>
            {["All","Fraud","Bankruptcy","Dormancy"].map(f => (
              <button key={f} className="btn" onClick={() => setFilter(f)} style={{ padding:"5px 13px", borderRadius:8, cursor:"pointer", fontFamily:"'Syne',sans-serif", fontWeight:700,
                border:`1px solid ${filter === f ? T.cyan : T.border}`, fontSize:11,
                background:filter === f ? T.cyanBg : "transparent", color:filter === f ? T.cyan : T.muted }}>{f}</button>
            ))}
          </div>
        </div>
        <div>
          {filtered.map((acc, i) => (
            <div key={i} className={`customer-row ${selectedCustomer?.id === acc.id ? "selected" : ""}`}
              style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 22px",
                borderBottom:i < filtered.length - 1 ? `1px solid ${T.border}` : "none",
                animation:`slideInL .3s ease ${i*0.05}s both` }}
              onClick={() => setSelectedCustomer(acc)}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <RingProgress pct={acc.riskScore} color={acc.riskScore >= 80 ? T.red : acc.riskScore >= 60 ? T.amber : T.blue} size={50} stroke={5}/>
              </div>
              <div style={{ width:40, height:40, borderRadius:12, background:`${acc.clr}18`, border:`1px solid ${acc.clr}30`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800,
                color:acc.clr, fontFamily:"'Syne',sans-serif", flexShrink:0 }}>{acc.avatar}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:13.5, fontWeight:700, color:T.text }}>{acc.name}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:T.faint }}>{acc.id}</span>
                  {acc.prevFlag && <Badge color="amber">Repeat</Badge>}
                </div>
                <div style={{ fontSize:11.5, color:T.muted }}>{acc.lastActivity}</div>
                <div style={{ fontSize:10.5, color:T.faint, marginTop:3, fontFamily:"'JetBrains Mono',monospace" }}>Trigger: {acc.trigger}</div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <Badge color={acc.status === "Urgent" ? "red" : acc.status === "Review" ? "amber" : "blue"} pulse={acc.status === "Urgent"}>{acc.status}</Badge>
                <div style={{ fontSize:10.5, color:T.faint, marginTop:5 }}>{acc.region}</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.muted, marginTop:2 }}>{acc.balance}</div>
              </div>
              <div style={{ display:"flex", gap:6, flexShrink:0 }} onClick={e => e.stopPropagation()}>
                <button className="btn" onClick={() => toast(`Alert generated for ${acc.id}`, "error")}
                  style={{ padding:"6px 12px", borderRadius:8, border:`1px solid ${T.red}30`, background:T.redBg, color:T.red, fontSize:11, cursor:"pointer", fontWeight:700 }}>Alert</button>
                <button className="btn" onClick={() => toast(`${acc.id} escalated to Risk Analyst`, "warning")}
                  style={{ padding:"6px 12px", borderRadius:8, border:`1px solid ${T.amber}30`, background:T.amberBg, color:T.amber, fontSize:11, cursor:"pointer", fontWeight:700 }}>Escalate</button>
              </div>
              <Icon name="chevronR" size={14} color={T.faint}/>
            </div>
          ))}
        </div>
      </Card>

      {selectedCustomer && (
        <CustomerPanel customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} userRole={userRole}/>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD PAGE (Shared Risk + SBA)
═══════════════════════════════════════════════════════════════ */
const DashboardPage = ({ userRole }) => {
  const toast = useToast();
  const roleInfo = ROLES[userRole];
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = flaggedAccounts.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()) || a.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .4s ease" }}>
      {/* KPI Row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:14 }}>
        {kpiData.map((k, i) => (
          <div key={i} className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"20px",
            animation:`fadeUp .3s ease ${i*0.07}s both`, borderTop:`2px solid ${k.color}40` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.muted, fontFamily:"'Syne',sans-serif", lineHeight:1.3 }}>{k.label}</span>
              <span style={{ fontSize:10.5, color:k.dir === "up" ? (k.label === "Active Alerts" ? T.emerald : T.red) : T.emerald, fontFamily:"'JetBrains Mono',monospace", fontWeight:700, background:T.surface2, padding:"2px 7px", borderRadius:6 }}>{k.delta}</span>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:30, fontWeight:700, color:k.color, lineHeight:1 }}>{k.value}{k.suffix}</div>
            <div style={{ marginTop:12 }}>
              <Sparkline data={k.spark} color={k.color} width={90} height={22}/>
            </div>
          </div>
        ))}
      </div>

      {/* Flagged Accounts Table */}
      <Card>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 22px 14px", borderBottom:`1px solid ${T.border}`, flexWrap:"wrap", gap:8 }}>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13.5, fontWeight:700, color:T.text }}>Flagged Accounts</div>
            <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>Click any row to open full customer intelligence profile</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:9, padding:"0 12px", height:33, width:180 }}>
              <Icon name="search" size={11} color={T.faint} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                style={{ background:"none", border:"none", outline:"none", fontSize:12, color:T.text, fontFamily:"inherit", width:"100%", caretColor:roleInfo.color }}/>
            </div>
            {roleInfo.can.includes("export") && (
              <button className="btn" onClick={() => toast("Report exported","info")}
                style={{ padding:"7px 14px", borderRadius:9, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:11, cursor:"pointer", fontWeight:600, fontFamily:"'Syne',sans-serif", display:"flex", alignItems:"center", gap:6 }}>
                <Icon name="download" size={12} color={T.muted}/> Export
              </button>
            )}
          </div>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table>
            <thead>
              <tr style={{ background:T.surface2 }}>
                {["Account","Region","Balance","Risk Score","Type","Status","Last Activity","Actions"].map(h => (
                  <th key={h} style={{ textAlign:"left", fontSize:9.5, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:T.faint, padding:"9px 16px", borderBottom:`1px solid ${T.border}`, fontFamily:"'Syne',sans-serif", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((acc, i) => (
                <tr key={i} className={`customer-row ${selectedCustomer?.id === acc.id ? "selected" : ""}`}
                  style={{ borderBottom:`1px solid ${T.border}` }}
                  onClick={() => setSelectedCustomer(acc)}>
                  <td style={{ padding:"13px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:10, background:`${acc.clr}18`, border:`1px solid ${acc.clr}28`,
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:acc.clr, fontFamily:"'Syne',sans-serif", flexShrink:0 }}>{acc.avatar}</div>
                      <div>
                        <div style={{ fontSize:12.5, fontWeight:700, color:T.text }}>{acc.name}</div>
                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:T.faint, marginTop:1 }}>{acc.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"13px 16px", fontSize:12, color:T.muted }}>{acc.region}</td>
                  <td style={{ padding:"13px 16px", fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:T.text, fontWeight:600 }}>{acc.balance}</td>
                  <td style={{ padding:"13px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <RingProgress pct={acc.riskScore} color={acc.riskScore >= 80 ? T.red : acc.riskScore >= 60 ? T.amber : T.blue} size={38} stroke={4}/>
                    </div>
                  </td>
                  <td style={{ padding:"13px 16px" }}>
                    <Badge color={acc.type === "Fraud" ? "red" : acc.type === "Bankruptcy" ? "amber" : "blue"}>{acc.type}</Badge>
                  </td>
                  <td style={{ padding:"13px 16px" }}>
                    <Badge color={acc.status === "Urgent" ? "red" : acc.status === "Review" ? "amber" : "blue"} pulse={acc.status === "Urgent"}>{acc.status}</Badge>
                  </td>
                  <td style={{ padding:"13px 16px", fontSize:11.5, color:T.muted, maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{acc.lastActivity}</td>
                  <td style={{ padding:"13px 16px" }}>
                    <div style={{ display:"flex", gap:5 }} onClick={e => e.stopPropagation()}>
                      {roleInfo.can.includes("flag") && (
                        <button className="btn" onClick={() => toast(`${acc.id} flagged`, "error")}
                          style={{ padding:"5px 10px", borderRadius:7, border:`1px solid ${T.red}30`, background:T.redBg, color:T.red, fontSize:10.5, cursor:"pointer", fontWeight:600 }}>Flag</button>
                      )}
                      {roleInfo.can.includes("freeze") && (
                        <button className="btn" onClick={() => toast(`${acc.id} frozen`, "success")}
                          style={{ padding:"5px 10px", borderRadius:7, border:`1px solid ${T.blue}30`, background:T.blueBg, color:T.blue, fontSize:10.5, cursor:"pointer", fontWeight:600 }}>Freeze</button>
                      )}
                      <button className="btn" style={{ padding:"5px 10px", borderRadius:7, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:10.5, cursor:"pointer" }}
                        onClick={() => setSelectedCustomer(acc)}>
                        <Icon name="eye" size={11} color={T.muted}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Region Heat Map */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <Card>
          <CardHead title="Risk by Region" sub="Geographic distribution of flagged accounts"/>
          <div style={{ padding:"14px 20px 18px" }}>
            {regionData.map((r, i) => (
              <div key={i} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:12, color:T.text, fontWeight:600 }}>{r.name}</span>
                  <div style={{ display:"flex", gap:10 }}>
                    <span style={{ fontSize:11, color:T.muted }}>{r.flagged} flagged</span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:r.color, fontWeight:700 }}>{r.pct}%</span>
                  </div>
                </div>
                <div style={{ height:6, background:T.surface4, borderRadius:100, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${r.pct}%`, background:`linear-gradient(90deg, ${r.color}80, ${r.color})`, borderRadius:100, transition:"width .8s ease", boxShadow:`0 0 6px ${r.color}60`, animation:"progressFill .8s ease" }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Risk Distribution" sub="By score band"/>
          <div style={{ padding:"20px" }}>
            {[
              { label:"Critical (90–100)", count:28, total:247, color:T.red },
              { label:"High (70–89)", count:74, total:247, color:T.amber },
              { label:"Medium (50–69)", count:96, total:247, color:T.blue },
              { label:"Low (< 50)", count:49, total:247, color:T.emerald },
            ].map((r, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:r.color, flexShrink:0, boxShadow:`0 0 6px ${r.color}` }}/>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:11.5, color:T.text }}>{r.label}</span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:700, color:r.color }}>{r.count}</span>
                  </div>
                  <div style={{ height:5, background:T.surface4, borderRadius:100 }}>
                    <div style={{ height:"100%", width:`${(r.count/r.total)*100}%`, background:r.color, borderRadius:100 }}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {selectedCustomer && (
        <CustomerPanel customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} userRole={userRole}/>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   THRESHOLD RULES PAGE
═══════════════════════════════════════════════════════════════ */
const ThresholdRulesPage = () => {
  const toast = useToast();
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .4s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:14 }}>
        {[
          { label:"Active Rules", value:"6", color:T.emerald, desc:"Monitoring 24/7" },
          { label:"Total Triggers", value:"52", color:T.amber, desc:"Last 24 hours" },
          { label:"Alerts Generated", value:"12", color:T.red, desc:"Pending assignment" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"22px", animation:`fadeUp .3s ease ${i*0.07}s both` }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.muted, marginBottom:12, fontFamily:"'Syne',sans-serif" }}>{s.label}</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:36, fontWeight:700, color:s.color, lineHeight:1, marginBottom:6 }}>{s.value}</div>
            <div style={{ fontSize:12, color:T.muted }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <Card>
        <CardHead title="Active Detection Rules" sub="Real-time rule engine · Applied to all transactions"
          action={
            <button className="btn" onClick={() => toast("Rule editor opening…","info")} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:9, border:`1px solid ${T.cyan}30`, background:T.cyanBg, color:T.cyan, fontSize:11, cursor:"pointer", fontWeight:700, fontFamily:"'Syne',sans-serif" }}>
              <Icon name="plus" size={12} color={T.cyan}/> Add Rule
            </button>
          }/>
        <div style={{ overflowX:"auto" }}>
          <table>
            <thead>
              <tr style={{ background:T.surface2 }}>
                {["Rule Name","Operator","Threshold","Triggered (24h)","Last Hit","Status","Actions"].map(h => (
                  <th key={h} style={{ textAlign:"left", fontSize:9.5, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:T.faint, padding:"9px 18px", borderBottom:`1px solid ${T.border}`, fontFamily:"'Syne',sans-serif", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {thresholdRules.map((r, i) => (
                <tr key={i} className="row-hover" style={{ borderBottom:`1px solid ${T.border}` }}>
                  <td style={{ padding:"13px 18px", color:T.text, fontWeight:600 }}>{r.name}</td>
                  <td style={{ padding:"13px 18px" }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:T.violet, background:T.violetBg, padding:"2px 8px", borderRadius:6 }}>{r.operator}</span>
                  </td>
                  <td style={{ padding:"13px 18px", fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:T.cyan }}>{r.threshold}</td>
                  <td style={{ padding:"13px 18px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:14, fontWeight:700, color:r.triggered > 15 ? T.red : r.triggered > 5 ? T.amber : T.emerald }}>{r.triggered}</span>
                      <Sparkline data={[r.triggered-3,r.triggered-1,r.triggered,r.triggered-2,r.triggered+1,r.triggered]} color={T.cyan} height={18} width={50}/>
                    </div>
                  </td>
                  <td style={{ padding:"13px 18px", fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>{r.lastHit}</td>
                  <td style={{ padding:"13px 18px" }}><Badge color="green">{r.status}</Badge></td>
                  <td style={{ padding:"13px 18px" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      <button className="btn" onClick={() => toast(`${r.name} paused`,"warning")} style={{ padding:"5px 10px", borderRadius:7, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:11, cursor:"pointer" }}>Pause</button>
                      <button className="btn" onClick={() => toast(`Editing ${r.name}`,"info")} style={{ padding:"5px 10px", borderRadius:7, border:`1px solid ${T.blue}30`, background:T.blueBg, color:T.blue, fontSize:11, cursor:"pointer" }}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ALERT CONSOLE PAGE
═══════════════════════════════════════════════════════════════ */
const AlertConsolePage = ({ userRole }) => {
  const toast = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 5000); return () => clearInterval(id); }, []);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .4s ease" }}>
      <div style={{ background:`${T.red}08`, border:`1px solid ${T.red}20`, borderRadius:14, padding:"12px 20px",
        display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:10, height:10, borderRadius:"50%", background:T.red, boxShadow:`0 0 10px ${T.red}`, animation:"pulse 1s infinite" }}/>
        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:800, color:T.red }}>ALERT CONSOLE — {12 - tick % 3} ACTIVE</span>
        <span style={{ fontSize:12, color:T.muted }}>Click any account to view complete customer intelligence</span>
      </div>
      <Card>
        <CardHead title="Live Alert Feed" sub="Click account to open full profile"/>
        <div style={{ overflowX:"auto" }}>
          <table>
            <thead>
              <tr style={{ background:T.surface2 }}>
                {["Time","ID","Account","Rule","Value","Severity","Status","Action"].map(h => (
                  <th key={h} style={{ textAlign:"left", fontSize:9.5, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:T.faint, padding:"9px 14px", borderBottom:`1px solid ${T.border}`, fontFamily:"'Syne',sans-serif", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {liveAlerts.map((a, i) => {
                const sev = { critical:[T.red,"red"], high:[T.amber,"amber"], medium:[T.blue,"blue"], low:[T.emerald,"green"] };
                const [c, b] = sev[a.severity] || sev.low;
                const profile = customerProfiles[a.account];
                return (
                  <tr key={i} className="customer-row" style={{ borderBottom:`1px solid ${T.border}`, background: a.severity === "critical" ? `${T.red}05` : "transparent" }}
                    onClick={() => profile ? setSelectedCustomer(profile) : toast(`No profile found for ${a.account}`,"info")}>
                    <td style={{ padding:"11px 14px", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.faint }}>{a.time}</td>
                    <td style={{ padding:"11px 14px", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.cyan }}>{a.id}</td>
                    <td style={{ padding:"11px 14px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:T.text, fontWeight:700 }}>{a.account}</span>
                        {profile && <><span style={{ fontSize:11, color:T.muted }}>{profile.name}</span><Icon name="chevronR" size={10} color={T.faint}/></>}
                      </div>
                    </td>
                    <td style={{ padding:"11px 14px", color:T.muted, fontSize:12 }}>{a.rule}</td>
                    <td style={{ padding:"11px 14px", color:T.text, fontSize:11.5, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.value}</td>
                    <td style={{ padding:"11px 14px" }}><Badge color={b} pulse={a.severity === "critical"}>{a.severity}</Badge></td>
                    <td style={{ padding:"11px 14px" }}><Badge color={a.status === "New" ? "red" : a.status === "Assigned" ? "amber" : a.status === "Reviewing" ? "blue" : "green"}>{a.status}</Badge></td>
                    <td style={{ padding:"11px 14px" }}>
                      <div style={{ display:"flex", gap:5 }} onClick={e => e.stopPropagation()}>
                        <button className="btn" onClick={() => toast(`${a.account} assigned`,"success")} style={{ padding:"4px 10px", borderRadius:7, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:10.5, cursor:"pointer" }}>Assign</button>
                        <button className="btn" onClick={() => toast(`${a.account} escalated`,"warning")} style={{ padding:"4px 10px", borderRadius:7, border:`1px solid ${T.amber}30`, background:T.amberBg, color:T.amber, fontSize:10.5, cursor:"pointer", fontWeight:600 }}>Escalate</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      {selectedCustomer && (
        <CustomerPanel customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} userRole={userRole}/>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SETTINGS PAGE
═══════════════════════════════════════════════════════════════ */
const SettingsPage = ({ userRole, onLogout }) => {
  const roleInfo = ROLES[userRole];
  const toast = useToast();
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .4s ease" }}>
      <Card style={{ padding:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:22 }}>
          <div style={{ width:60, height:60, borderRadius:18, background:`${roleInfo.color}18`, border:`2px solid ${roleInfo.color}30`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:800, color:roleInfo.color, fontFamily:"'Syne',sans-serif" }}>{roleInfo.user.init}</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:T.text }}>{roleInfo.user.name}</div>
            <div style={{ fontSize:13, color:T.muted, marginTop:3 }}>{roleInfo.user.title} · {userRole}</div>
            <div style={{ fontSize:12, color:T.faint, marginTop:2 }}>{roleInfo.email}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {roleInfo.can.map(p => <Badge key={p} color="cyan">{p}</Badge>)}
        </div>
      </Card>
      <Card style={{ padding:24 }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", marginBottom:16 }}>Session Management</div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn" onClick={() => toast("Password change email sent","success")} style={{ padding:"9px 18px", borderRadius:10, border:`1px solid ${T.border}`, background:T.surface2, color:T.muted, fontSize:12, cursor:"pointer", fontWeight:600 }}>Change Password</button>
          <button className="btn" onClick={onLogout} style={{ padding:"9px 18px", borderRadius:10, border:`1px solid ${T.red}30`, background:T.redBg, color:T.red, fontSize:12, cursor:"pointer", fontWeight:700, fontFamily:"'Syne',sans-serif" }}>Sign Out</button>
        </div>
      </Card>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FALLBACK PAGE
═══════════════════════════════════════════════════════════════ */
const FallbackPage = ({ page }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:320, gap:14, animation:"fadeUp .4s ease" }}>
    <div style={{ width:56, height:56, borderRadius:16, background:T.surface2, border:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Icon name="layers" size={22} color={T.faint}/>
    </div>
    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:T.muted }}>{page}</div>
    <div style={{ fontSize:12, color:T.faint, textAlign:"center", maxWidth:280 }}>This module is fully operational. Content is loading for the selected view.</div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   ROLE CARD
═══════════════════════════════════════════════════════════════ */
const RoleCard = ({ roleKey, role, selected, onSelect }) => (
  <button className="btn" onClick={() => onSelect(roleKey)} style={{
    display:"flex", alignItems:"center", gap:12, padding:"12px 16px",
    borderRadius:12, border:`1.5px solid ${selected ? role.color : T.border}`,
    background:selected ? `${role.color}08` : "transparent",
    cursor:"pointer", textAlign:"left", width:"100%",
    boxShadow:selected ? `0 8px 28px ${role.color}15` : "none",
    transition:"all .18s ease",
  }}>
    <div style={{ width:38, height:38, borderRadius:11, background:selected ? `${role.color}20` : T.surface4,
      border:`1px solid ${selected ? role.color : T.border}`,
      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <Icon name={role.icon} size={17} color={selected ? role.color : T.muted}/>
    </div>
    <div>
      <div style={{ fontSize:13, fontWeight:700, color:selected ? T.text : T.muted, fontFamily:"'Syne',sans-serif" }}>{roleKey}</div>
      <div style={{ fontSize:10.5, color:selected ? role.color : T.faint, marginTop:2 }}>{role.desc}</div>
    </div>
    {selected && <div style={{ marginLeft:"auto", width:7, height:7, borderRadius:"50%", background:role.color, boxShadow:`0 0 8px ${role.color}` }}/>}
  </button>
);

/* ═══════════════════════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════════════════════ */
const LoginPage = ({ onLogin }) => {
  const [step, setStep] = useState("login");
  const [role, setRole] = useState("Data Analyst");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfa, setMfa] = useState(["","","","","",""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const roleInfo = ROLES[role];
  useEffect(() => { setEmail(roleInfo.email); }, [role]);

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true); setError("");
    setTimeout(() => { setLoading(false); setStep("mfa"); }, 1100);
  };

  const handleMfa = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...mfa]; next[i] = val; setMfa(next);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
    if (next.every(d => d) && i === 5) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (next.join("") === "123456") { onLogin(role); }
        else { setError("Invalid code. Demo: 123456"); setMfa(["","","","","",""]); inputRefs.current[0]?.focus(); }
      }, 800);
    }
  };

  const handleMfaKey = (i, e) => { if (e.key === "Backspace" && !mfa[i] && i > 0) inputRefs.current[i - 1]?.focus(); };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:T.bg, position:"relative", overflow:"hidden", fontFamily:"'DM Sans',sans-serif" }}>
      {/* Grid background */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.border} 1px,transparent 1px),linear-gradient(90deg,${T.border} 1px,transparent 1px)`, backgroundSize:"72px 72px" }}/>
      {/* Glow orbs */}
      <div style={{ position:"absolute", top:"10%", left:"5%", width:600, height:600, background:`radial-gradient(circle,${roleInfo.color}09 0%,transparent 70%)`, pointerEvents:"none", transition:"background .5s" }}/>
      <div style={{ position:"absolute", bottom:"10%", right:"5%", width:500, height:500, background:`radial-gradient(circle,${T.violet}07 0%,transparent 70%)`, pointerEvents:"none" }}/>

      <div style={{ width:"100%", maxWidth:480, padding:"0 20px", animation:"fadeUp .4s ease", zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:64, height:64, borderRadius:20, marginBottom:16,
            background:`linear-gradient(135deg,${T.emerald},${T.blue})`, boxShadow:`0 0 50px ${T.emerald}30, 0 0 100px ${T.blue}20`, animation:"float 4s ease-in-out infinite" }}>
            <Icon name="shield" size={28} color="#000" stroke={2.5}/>
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:30, fontWeight:800, color:T.text, letterSpacing:"-0.03em" }}>
            NexusBank<span style={{ color:T.emerald }}>.</span>Risk
          </div>
          <div style={{ fontSize:13, color:T.muted, marginTop:4 }}>Intelligence Platform · v4.3.0</div>
        </div>

        <div style={{ background:T.surface, border:`1px solid ${T.border2}`, borderRadius:24, overflow:"hidden",
          boxShadow:`0 48px 120px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04)` }}>

          {step === "login" ? (
            <div style={{ padding:32 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, marginBottom:6, color:T.text }}>Welcome back</div>
              <div style={{ fontSize:13, color:T.muted, marginBottom:26 }}>Select your access level and authenticate.</div>

              <div style={{ marginBottom:22 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10, fontFamily:"'Syne',sans-serif" }}>Access Level</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {Object.entries(ROLES).map(([k, v]) => <RoleCard key={k} roleKey={k} role={v} selected={role === k} onSelect={setRole}/>)}
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:T.muted, letterSpacing:"0.08em", textTransform:"uppercase", display:"block", marginBottom:7, fontFamily:"'Syne',sans-serif" }}>Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
                    style={{ width:"100%", background:T.surface2, border:`1px solid ${T.border2}`, borderRadius:11, padding:"11px 14px", color:T.text, fontSize:14, outline:"none", transition:"border-color .15s" }}/>
                </div>
                <div style={{ marginBottom:22 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:T.muted, letterSpacing:"0.08em", textTransform:"uppercase", display:"block", marginBottom:7, fontFamily:"'Syne',sans-serif" }}>Password</label>
                  <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••"
                    style={{ width:"100%", background:T.surface2, border:`1px solid ${T.border2}`, borderRadius:11, padding:"11px 14px", color:T.text, fontSize:14, outline:"none" }}/>
                </div>
                <button type="submit" className="btn" disabled={loading} style={{
                  width:"100%", padding:"13px", borderRadius:13, border:"none", cursor:"pointer",
                  background:`linear-gradient(135deg,${roleInfo.color},${roleInfo.color}cc)`,
                  color:"#000", fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:800,
                  letterSpacing:"0.03em", boxShadow:`0 8px 32px ${roleInfo.color}30`, opacity:loading ? 0.7 : 1 }}>
                  {loading ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                    <div style={{ width:14, height:14, border:`2px solid rgba(0,0,0,.3)`, borderTopColor:"rgba(0,0,0,.8)", borderRadius:"50%", animation:"spin .6s linear infinite" }}/> Authenticating…
                  </span> : "Continue to MFA →"}
                </button>
              </form>
              <div style={{ marginTop:16, padding:"11px 14px", background:T.surface2, borderRadius:10, border:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:10 }}>
                <Icon name="shield" size={12} color={T.emerald}/>
                <span style={{ fontSize:11, color:T.muted }}>SSO · MFA · E2E Encrypted · SOC 2 Type II</span>
              </div>
            </div>
          ) : (
            <div style={{ padding:32, textAlign:"center" }}>
              <div style={{ width:56, height:56, borderRadius:18, background:T.amberBg, border:`1px solid ${T.amber}28`,
                display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px", animation:"float 3s ease-in-out infinite" }}>
                <Icon name="lock" size={24} color={T.amber}/>
              </div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:19, fontWeight:800, marginBottom:8, color:T.text }}>Two-Factor Auth</div>
              <div style={{ fontSize:13, color:T.muted, marginBottom:10, lineHeight:1.6 }}>Enter the 6-digit code from your authenticator app.</div>
              <div style={{ display:"inline-block", padding:"5px 12px", borderRadius:8, background:T.emeraldBg, border:`1px solid ${T.emerald}28`, marginBottom:22 }}>
                <span style={{ fontSize:11, color:T.emerald, fontFamily:"'JetBrains Mono',monospace", fontWeight:600 }}>Demo: 1 2 3 4 5 6</span>
              </div>
              <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:22 }}>
                {mfa.map((d, i) => (
                  <input key={i} ref={el => inputRefs.current[i] = el} value={d}
                    onChange={e => handleMfa(i, e.target.value)} onKeyDown={e => handleMfaKey(i, e)}
                    className="mfa-input" maxLength={1} inputMode="numeric" autoFocus={i === 0}/>
                ))}
              </div>
              {error && <div style={{ color:T.red, fontSize:12, marginBottom:14, background:T.redBg, border:`1px solid ${T.red}28`, borderRadius:8, padding:"8px 12px" }}>{error}</div>}
              {loading && <div style={{ color:T.emerald, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:12 }}>
                <div style={{ width:13, height:13, border:`2px solid ${T.emerald}30`, borderTopColor:T.emerald, borderRadius:"50%", animation:"spin .6s linear infinite" }}/> Verifying…
              </div>}
              <button onClick={() => { setStep("login"); setMfa(["","","","","",""]); setError(""); }}
                style={{ background:"none", border:"none", color:T.muted, fontSize:12, cursor:"pointer", textDecoration:"underline" }}>← Back to login</button>
            </div>
          )}
        </div>
        <div style={{ textAlign:"center", marginTop:14, fontSize:11, color:T.faint }}>Session expires after 30 min · Protected by enterprise-grade encryption</div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   NOTIFICATION PANEL
═══════════════════════════════════════════════════════════════ */
const NotifPanel = ({ notifs, onClose, onMarkRead }) => (
  <div style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:350, background:T.surface,
    border:`1px solid ${T.border2}`, borderRadius:18, overflow:"hidden", zIndex:50,
    boxShadow:`0 24px 72px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04)`,
    animation:"scaleIn .22s cubic-bezier(.34,1.56,.64,1)" }}>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderBottom:`1px solid ${T.border}` }}>
      <span style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:T.text }}>Notifications</span>
      <button onClick={onMarkRead} style={{ background:"none", border:"none", color:T.emerald, fontSize:11, cursor:"pointer", fontWeight:700 }}>Mark all read</button>
    </div>
    {notifs.map((n, i) => (
      <div key={n.id} className="row-hover" style={{ display:"flex", gap:10, padding:"11px 18px",
        borderBottom:i < notifs.length - 1 ? `1px solid ${T.border}` : "none",
        background:n.read ? "transparent" : `${n.color}06`, opacity:n.read ? 0.55 : 1 }}>
        <div style={{ width:7, height:7, borderRadius:"50%", background:n.read ? T.faint : n.color, flexShrink:0, marginTop:5, boxShadow:n.read ? "none" : `0 0 5px ${n.color}` }}/>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, color:T.text, marginBottom:2, lineHeight:1.4 }}>{n.msg}</div>
          <div style={{ fontSize:10, color:T.faint, fontFamily:"'JetBrains Mono',monospace" }}>{n.time} ago</div>
        </div>
      </div>
    ))}
    <div style={{ padding:"11px 18px", borderTop:`1px solid ${T.border}`, textAlign:"center" }}>
      <button onClick={onClose} style={{ background:"none", border:"none", color:T.muted, fontSize:12, cursor:"pointer" }}>View all →</button>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("Data Analyst");
  const [page, setPage] = useState("");
  const [liveTime, setLiveTime] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifList, setNotifList] = useState(notifications);
  const [globalSearch, setGlobalSearch] = useState("");
  const [sessionWarning, setSessionWarning] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setLiveTime(d.toLocaleTimeString("en-IN", { hour12:false, hour:"2-digit", minute:"2-digit", second:"2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSessionWarning(true), 25 * 60 * 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = e => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogin = role => {
    setUserRole(role);
    const defaultPage = { "Data Analyst":"Live Monitor", "Risk Analyst":"Dashboard", "Senior Business Analyst":"Dashboard" };
    setPage(defaultPage[role]);
    setLoggedIn(true);
  };

  const handleLogout = () => { setLoggedIn(false); setUserRole("Data Analyst"); setPage(""); };
  const markAllRead = () => setNotifList(n => n.map(x => ({ ...x, read:true })));
  const unread = notifList.filter(n => !n.read).length;

  const roleInfo = ROLES[userRole] || ROLES["Data Analyst"];
  const navItems = roleInfo.nav;

  const renderPage = () => {
    const p = page;
    const isDA = userRole === "Data Analyst";
    if (p === "Live Monitor") return <LiveMonitorPage userRole={userRole}/>;
    if (p === "Alert Console") return <AlertConsolePage userRole={userRole}/>;
    if (p === "Suspicious Queue") return <SuspiciousQueuePage userRole={userRole}/>;
    if (p === "Threshold Rules") return <ThresholdRulesPage/>;
    if (p === "Dashboard") return <DashboardPage userRole={userRole}/>;
    if (p === "Flagged Accounts") return <SuspiciousQueuePage userRole={userRole}/>;
    if (p === "Settings") return <SettingsPage userRole={userRole} onLogout={handleLogout}/>;
    return <FallbackPage page={p}/>;
  };

  const pageMeta = {
    "Live Monitor":      { title:"Live Monitor", sub:"Real-time transaction surveillance" },
    "Alert Console":     { title:"Alert Console", sub:"Active alerts · Click account for full profile" },
    "Transaction Stats": { title:"Transaction Analytics", sub:"Statistical analysis of transaction patterns" },
    "Threshold Rules":   { title:"Detection Rules", sub:"Rule-based fraud detection engine" },
    "Frequency Checks":  { title:"Frequency Anomalies", sub:"Transaction rate analysis" },
    "Suspicious Queue":  { title:"Suspicious Queue", sub:"Accounts flagged for review" },
    "Daily Reports":     { title:"Daily Reports", sub:"Automated analysis reports" },
    "Dashboard":         { title:"Risk Dashboard", sub:"Account intelligence overview" },
    "Analytics":         { title:"Analytics", sub:"Deep risk analysis" },
    "Flagged Accounts":  { title:"Flagged Accounts", sub:"Click any account to view full customer profile" },
    "Risk Signals":      { title:"Risk Signals", sub:"Early warning indicators" },
    "Audit Trail":       { title:"Audit Trail", sub:"Complete system event log" },
    "Task Board":        { title:"Task Board", sub:"Workflow management" },
    "Business Analytics":{ title:"Business Analytics", sub:"Strategic intelligence" },
    "Strategic Reports": { title:"Strategic Reports", sub:"Executive-level analysis" },
    "User Management":   { title:"User Management", sub:"Team access & permissions" },
    "Settings":          { title:"Settings", sub:"Profile & preferences" },
  };
  const info = pageMeta[page] || { title:page, sub:"" };

  if (!loggedIn) return (
    <ToastProvider>
      <GlobalStyle/>
      <LoginPage onLogin={handleLogin}/>
    </ToastProvider>
  );

  return (
    <ToastProvider>
      <GlobalStyle/>
      <div style={{ fontFamily:"'DM Sans',sans-serif", display:"grid", gridTemplateColumns:"244px 1fr",
        minHeight:"100vh", background:T.bg, color:T.text, fontSize:14 }}>

        {/* ── Sidebar ── */}
        <aside style={{ background:T.surface, borderRight:`1px solid ${T.border}`,
          display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>

          {/* Logo */}
          <div style={{ padding:"20px 16px 16px", borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:40, height:40, borderRadius:12, flexShrink:0,
                background:`linear-gradient(135deg,${T.emerald},${T.blue})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:`0 0 20px ${T.emerald}30` }}>
                <Icon name="shield" size={19} color="#000" stroke={2.5}/>
              </div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:14.5, fontWeight:800, color:T.text, letterSpacing:"-0.02em" }}>NexusBank</div>
                <div style={{ fontSize:9, color:T.faint, letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"'Syne',sans-serif" }}>Risk Intelligence</div>
              </div>
            </div>
          </div>

          {/* Role indicator */}
          <div style={{ padding:"10px 14px", borderBottom:`1px solid ${T.border}`, background:`${roleInfo.color}06`, flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:roleInfo.color, boxShadow:`0 0 8px ${roleInfo.color}`, animation:"pulse 2s infinite" }}/>
              <span style={{ fontSize:10, fontWeight:800, color:roleInfo.color, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"'Syne',sans-serif" }}>{userRole}</span>
            </div>
            <div style={{ fontSize:10, color:T.faint, marginTop:3, marginLeft:14 }}>{roleInfo.desc}</div>
          </div>

          {/* Nav */}
          <nav style={{ flex:1, padding:"10px 9px", display:"flex", flexDirection:"column", gap:1, overflowY:"auto" }}>
            {navItems.map((item, i) => {
              if (item.section) return (
                <div key={i} style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase",
                  color:T.faint, padding:"13px 10px 5px", fontFamily:"'Syne',sans-serif" }}>{item.section}</div>
              );
              const isActive = page === item.label;
              return (
                <button key={i} className="nav-item" onClick={() => setPage(item.label)} style={{
                  display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:11, fontSize:12.5,
                  fontWeight:isActive ? 700 : 400, color:isActive ? T.text : T.muted,
                  background:isActive ? T.surface2 : "transparent",
                  border:isActive ? `1px solid ${T.border2}` : "1px solid transparent",
                  cursor:"pointer", width:"100%", textAlign:"left", fontFamily:"inherit" }}>
                  <Icon name={item.icon} size={14} color={isActive ? roleInfo.color : T.faint} stroke={isActive ? 2.2 : 1.6}/>
                  <span style={{ flex:1 }}>{item.label}</span>
                  {item.badge && <span style={{ background:T.red, borderRadius:100, fontSize:9, padding:"1px 7px", fontWeight:700, color:"#fff", animation:"pulse 1.5s infinite" }}>{item.badge}</span>}
                </button>
              );
            })}
          </nav>

          {/* User footer */}
          <div className="nav-item" style={{ padding:"12px 14px", borderTop:`1px solid ${T.border}`,
            display:"flex", alignItems:"center", gap:10, cursor:"pointer", flexShrink:0 }}
            onClick={() => setPage("Settings")}>
            <div style={{ width:36, height:36, borderRadius:11, flexShrink:0,
              background:`${roleInfo.color}18`, border:`1.5px solid ${roleInfo.color}28`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:12, fontWeight:800, color:roleInfo.color, fontFamily:"'Syne',sans-serif" }}>{roleInfo.user.init}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{roleInfo.user.name}</div>
              <div style={{ fontSize:10, color:T.faint, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{roleInfo.user.title}</div>
            </div>
            <div style={{ width:7, height:7, borderRadius:"50%", background:T.emerald, boxShadow:`0 0 7px ${T.emerald}`, animation:"pulse 2s ease-in-out infinite", flexShrink:0 }}/>
          </div>
        </aside>

        {/* ── Main ── */}
        <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", overflow:"hidden" }}>

          {/* Live ticker */}
          <LiveTicker alerts={liveAlerts}/>

          {/* Topbar */}
          <header style={{ background:T.surface, borderBottom:`1px solid ${T.border}`,
            display:"flex", alignItems:"center", gap:14, padding:"0 26px", height:56,
            position:"sticky", top:28, zIndex:20, flexShrink:0 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15.5, fontWeight:800, color:T.text, letterSpacing:"-0.02em", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{info.title}</div>
              {info.sub && <div style={{ fontSize:10, color:T.faint, marginTop:1 }}>{info.sub}</div>}
            </div>

            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.faint,
              background:T.surface2, border:`1px solid ${T.border}`, borderRadius:8, padding:"4px 10px", letterSpacing:"0.04em", flexShrink:0 }}>{liveTime}</div>

            <div style={{ display:"flex", alignItems:"center", gap:7, background:T.surface2, border:`1px solid ${T.border}`, borderRadius:10, padding:"0 12px", height:34, width:180, flexShrink:0 }}>
              <Icon name="search" size={12} color={T.faint}/>
              <input value={globalSearch} onChange={e => setGlobalSearch(e.target.value)} placeholder="Search accounts…"
                style={{ background:"none", border:"none", outline:"none", fontSize:12, color:T.text, fontFamily:"inherit", width:"100%", caretColor:roleInfo.color }}/>
            </div>

            <div ref={notifRef} style={{ position:"relative", flexShrink:0 }}>
              <button className="btn" onClick={() => setNotifOpen(o => !o)} style={{
                position:"relative", width:36, height:36, borderRadius:10,
                border:`1px solid ${notifOpen ? T.border2 : T.border}`,
                background:T.surface2, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                <Icon name="bell" size={15} color={unread > 0 ? T.amber : T.muted}/>
                {unread > 0 && <>
                  <span style={{ position:"absolute", top:8, right:8, width:7, height:7, borderRadius:"50%", background:T.red, border:`1.5px solid ${T.surface}`, animation:"pulse 1.5s ease-in-out infinite" }}/>
                  <span style={{ position:"absolute", inset:-2, borderRadius:12, border:`2px solid ${T.red}`, animation:"pulseRing 1.5s ease-out infinite", pointerEvents:"none" }}/>
                </>}
              </button>
              {notifOpen && <NotifPanel notifs={notifList} onClose={() => setNotifOpen(false)} onMarkRead={markAllRead}/>}
            </div>
          </header>

          {sessionWarning && (
            <div style={{ background:`${T.amber}0a`, borderBottom:`1px solid ${T.amber}22`, padding:"8px 26px",
              display:"flex", alignItems:"center", justifyContent:"space-between", animation:"slideInL .3s ease", flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <Icon name="lock" size={12} color={T.amber}/>
                <span style={{ fontSize:12, color:T.amber, fontWeight:600 }}>Session expiring in 5 minutes due to inactivity</span>
              </div>
              <div style={{ display:"flex", gap:7 }}>
                <button className="btn" onClick={() => setSessionWarning(false)} style={{ padding:"4px 13px", borderRadius:7, border:`1px solid ${T.amber}38`, background:T.amberBg, color:T.amber, fontSize:11, cursor:"pointer", fontWeight:600 }}>Extend</button>
                <button className="btn" onClick={handleLogout} style={{ padding:"4px 13px", borderRadius:7, border:`1px solid ${T.border}`, background:"transparent", color:T.muted, fontSize:11, cursor:"pointer" }}>Sign Out</button>
              </div>
            </div>
          )}

          <main style={{ padding:"22px 26px 56px", flex:1, overflowY:"auto" }}>
            {renderPage()}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
