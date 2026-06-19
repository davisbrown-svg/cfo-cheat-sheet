/* ============================================================
   CFO CHEAT SHEET — app.js
   All content, data, and interactivity for the MAE ENTR dashboard
   ============================================================ */

// ── NAV ─────────────────────────────────────────────────────
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const page = tab.dataset.page;
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('page-' + page).classList.add('active');
  });
});

// ── DATA: FINANCIAL TERMS ────────────────────────────────────
const TERMS = [
  // ── PROFITABILITY ──
  {
    name: 'EBITDA',
    abbrev: 'EBITDA',
    category: 'profitability',
    categoryLabel: '📊 Profitability',
    definition: 'Earnings Before Interest, Taxes, Depreciation, and Amortization. The most common measure of a company\'s core operational profitability, stripped of financing decisions and accounting conventions.',
    why: 'If EBITDA margins are compressing year-over-year, the CFO is under board pressure to restore them. Every conversation becomes about operational efficiency — that\'s your Agentforce automation and Einstein AI pitch. Frame your deal as margin expansion, not cost.',
    products: ['Agentforce', 'Einstein AI', 'MFG Cloud'],
  },
  {
    name: 'Gross Margin',
    abbrev: 'GM%',
    category: 'profitability',
    categoryLabel: '📊 Profitability',
    definition: 'Revenue minus Cost of Goods Sold (COGS), expressed as a percentage. Measures how much value is created in production before operating expenses hit.',
    why: 'Thin or declining gross margins signal pricing pressure or rising input costs. Companies fighting for margin don\'t buy features — they buy efficiency. Lead with automation, waste reduction, and field service optimization. Don\'t pitch new capabilities; pitch fewer people doing more.',
    products: ['Agentforce Operations', 'Field Service Cloud', 'MFG Cloud'],
  },
  {
    name: 'Operating Leverage',
    abbrev: 'Op. Lev.',
    category: 'profitability',
    categoryLabel: '📊 Profitability',
    definition: 'The degree to which revenue growth outpaces cost growth. High operating leverage means the business can grow profits faster than it grows headcount or spend.',
    why: 'Every enterprise CFO is chasing operating leverage. Companies trying to achieve it are automating everything they can touch. That\'s your entire platform story — Agentforce, Data Cloud, Revenue Cloud — "grow without growing." This is the framing that gets CFO buy-in.',
    products: ['Agentforce Platform', 'Data Cloud', 'Revenue Cloud'],
  },
  {
    name: 'SG&A as % of Revenue',
    abbrev: 'SG&A%',
    category: 'profitability',
    categoryLabel: '📊 Profitability',
    definition: 'Selling, General & Administrative costs divided by total revenue. Tracks how much overhead the company carries relative to what it generates.',
    why: 'Rising SG&A % is a CFO alarm bell — overhead growing faster than revenue. The board wants a plan. That plan is automation: fewer manual handoffs, fewer heads per dollar of revenue, less friction across sales and service. This is your Sales Cloud, Revenue Intelligence, and Agentforce for Sales pitch with hard numbers.',
    products: ['Sales Cloud', 'Revenue Intelligence', 'Agentforce for Sales'],
  },
  {
    name: 'Net Income Margin',
    abbrev: 'NI%',
    category: 'profitability',
    categoryLabel: '📊 Profitability',
    definition: 'Net profit as a percentage of revenue — what\'s left after every expense, interest, and tax bill is paid.',
    why: 'When net margin is declining, CFOs are scrutinizing every line item of spend. Your deal needs a tight ROI story and ideally a payback period under 12 months. Lead with BVS (Business Value Services) data and reference cases from their exact vertical.',
    products: ['Salesforce BVS', 'Agentforce', 'Einstein AI'],
  },

  // ── CASH FLOW & LIQUIDITY ──
  {
    name: 'Cash Conversion Cycle',
    abbrev: 'CCC',
    category: 'cashflow',
    categoryLabel: '💰 Cash Flow & Liquidity',
    definition: 'The number of days it takes a company to convert its investments in inventory and receivables into cash from customers. Calculated as Days Inventory Outstanding + Days Sales Outstanding − Days Payable Outstanding.',
    why: 'High CCC = cash trapped in the supply chain. Every extra day costs the company real money in working capital. This is your most powerful opening in Manufacturing and Energy — "your CCC is X days vs. an industry benchmark of Y. Here\'s how Salesforce compresses it." Opens Data Cloud, Order Management, and Revenue Cloud.',
    products: ['Data Cloud', 'Order Management', 'Revenue Cloud'],
  },
  {
    name: 'Free Cash Flow',
    abbrev: 'FCF',
    category: 'cashflow',
    categoryLabel: '💰 Cash Flow & Liquidity',
    definition: 'Operating cash flow minus capital expenditures. The cash a business generates after maintaining and expanding its asset base — the ultimate measure of financial health.',
    why: 'Low or negative FCF means every discretionary dollar is scrutinized. The CFO is the gatekeeper for every new investment. You will not get a deal without a hard ROI story. Lead with Total Cost of Ownership reduction, quantify your impact, and get a Champion who can build the business case internally.',
    products: ['Salesforce BVS', 'TCO Analysis', 'Agentforce'],
  },
  {
    name: 'Days Sales Outstanding',
    abbrev: 'DSO',
    category: 'cashflow',
    categoryLabel: '💰 Cash Flow & Liquidity',
    definition: 'The average number of days it takes a company to collect payment after a sale. High DSO means invoices are sitting unpaid — cash is on the table but not in the bank.',
    why: 'High DSO is a CFO headache — it inflates working capital needs and depresses cash flow. Revenue Cloud\'s Collections & Recovery module, combined with automated invoice workflows, directly addresses this. Pull their DSO from the 10-K and quantify: "at $X revenue and 60-day DSO, each day reduction = $Y in freed cash."',
    products: ['Revenue Cloud', 'Collections & Recovery', 'Order Management'],
  },
  {
    name: 'Working Capital',
    abbrev: 'WC',
    category: 'cashflow',
    categoryLabel: '💰 Cash Flow & Liquidity',
    definition: 'Current assets minus current liabilities. The liquidity buffer a company has to fund day-to-day operations. Stressed working capital means the business is running tight.',
    why: 'Stressed working capital often traces back to slow AR, bloated inventory, or inefficient contract-to-cash cycles. Revenue Cloud, Field Service Cloud, and Order Management all compress this cycle. Frame your pitch around working capital relief — that\'s CFO language, not IT language.',
    products: ['Revenue Cloud', 'Field Service Cloud', 'Order Management'],
  },
  {
    name: 'Liquidity Ratio',
    abbrev: 'Current Ratio',
    category: 'cashflow',
    categoryLabel: '💰 Cash Flow & Liquidity',
    definition: 'Current assets divided by current liabilities. A ratio below 1.0 signals the company may struggle to meet short-term obligations. Also tracked as the Quick Ratio (excludes inventory).',
    why: 'A deteriorating liquidity ratio signals financial stress that may put the entire org on a spending freeze. Know this before you pitch. If they\'re tight on liquidity, the CFO isn\'t signing anything. But it also means if you can prove cash impact quickly, you become a priority.',
    products: ['Revenue Cloud', 'Agentforce', 'Data Cloud'],
  },

  // ── GROWTH & SHAREHOLDER VALUE ──
  {
    name: 'Total Shareholder Return',
    abbrev: 'TSR',
    category: 'growth',
    categoryLabel: '📈 Growth & Shareholder Value',
    definition: 'The total return delivered to stockholders: stock price appreciation plus dividends paid, expressed as a percentage over a period. The ultimate measure of whether leadership is creating value.',
    why: 'If a company\'s TSR is underperforming its peer group, the CEO and CFO are under direct pressure from the board. Supply chain efficiency is often the primary operational lever in Manufacturing and Energy. This is your opening for Agentforce Operations and Agentforce Supply Chain. Pull their TSR vs. sector peers from their proxy statement — it\'s a powerful first slide.',
    products: ['Agentforce Supply Chain', 'MFG Cloud', 'Agentforce Operations'],
  },
  {
    name: 'Net Revenue Retention',
    abbrev: 'NRR',
    category: 'growth',
    categoryLabel: '📈 Growth & Shareholder Value',
    definition: 'Revenue retained and expanded from existing customers over a period, expressed as a percentage of prior-period revenue. NRR > 100% means the customer base is growing without new logos.',
    why: 'Low NRR signals customer churn and expansion failure — the service org is underperforming. This is a direct Service Cloud and Agentforce for Service conversation. High NRR in a portfolio company is an expansion signal — they have a model that works, and they need to scale it.',
    products: ['Service Cloud', 'Agentforce for Service', 'Revenue Cloud'],
  },
  {
    name: 'TAM & Market Share',
    abbrev: 'TAM / MS',
    category: 'growth',
    categoryLabel: '📈 Growth & Shareholder Value',
    definition: 'Total Addressable Market is the total revenue opportunity for a product or service. Market share is the percentage of that TAM the company currently captures.',
    why: 'A company losing market share is in urgency mode — leadership is under pressure and willing to spend to turn it around. A company gaining share needs to scale without breaking. Know which mode your customer is in. Losing share = transformation urgency. Gaining share = platform scalability story.',
    products: ['Sales Cloud', 'Revenue Intelligence', 'Agentforce for Sales'],
  },
  {
    name: 'Revenue Growth Rate',
    abbrev: 'Rev. Growth',
    category: 'growth',
    categoryLabel: '📈 Growth & Shareholder Value',
    definition: 'Year-over-year percentage increase in top-line revenue. Organic growth (from operations) is valued differently than inorganic growth (from M&A).',
    why: 'Fast organic revenue growth means the sales org is scaling rapidly and complexity is outrunning process. This is your Sales Cloud, Revenue Intelligence, and Agentforce for Sales story — they need to maintain velocity without manual overhead. Slow or declining growth is a different conversation: transformation urgency.',
    products: ['Sales Cloud', 'Revenue Intelligence', 'Agentforce for Sales'],
  },

  // ── OPERATIONAL EFFICIENCY ──
  {
    name: 'Capital Efficiency / ROIC',
    abbrev: 'ROIC',
    category: 'efficiency',
    categoryLabel: '⚙️ Operational Efficiency',
    definition: 'Return on Invested Capital — net operating profit after tax divided by invested capital. Measures how effectively management converts invested dollars into profit.',
    why: 'ROIC below cost of capital (WACC) means the company is destroying shareholder value. When ROIC lags peers, there\'s a burning platform — the board wants a transformation story. This gives you permission to have a big, strategic conversation rather than a point-solution pitch.',
    products: ['Agentforce Platform', 'Data Cloud', 'MFG Cloud'],
  },
  {
    name: 'Inventory Turnover',
    abbrev: 'Inv. Turn',
    category: 'efficiency',
    categoryLabel: '⚙️ Operational Efficiency',
    definition: 'How many times a company\'s inventory is sold and replaced over a period. Low inventory turns signal slow-moving goods, excess stock, or supply chain inefficiency.',
    why: 'Low inventory turns directly inflates CCC and ties up working capital. In Manufacturing, this is a supply chain intelligence story — Data Cloud, Order Management, and Agentforce Operations. Pull their Days Inventory Outstanding from the 10-K and compare to sector benchmarks.',
    products: ['Data Cloud', 'Order Management', 'Agentforce Operations'],
  },
  {
    name: 'Asset Utilization / Asset Turnover',
    abbrev: 'Asset Turn',
    category: 'efficiency',
    categoryLabel: '⚙️ Operational Efficiency',
    definition: 'Revenue generated per dollar of assets. A measure of how efficiently the company deploys its asset base to generate sales.',
    why: 'Low asset utilization in Energy and Manufacturing often traces to underperforming field assets, unplanned downtime, or poor maintenance scheduling. Field Service Cloud and IoT integration with Agentforce can directly improve equipment uptime and asset ROI.',
    products: ['Field Service Cloud', 'Agentforce Operations', 'MFG Cloud'],
  },
  {
    name: 'Employee Productivity',
    abbrev: 'Rev/FTE',
    category: 'efficiency',
    categoryLabel: '⚙️ Operational Efficiency',
    definition: 'Revenue (or output) generated per full-time employee. A key measure of workforce efficiency, often benchmarked against industry peers.',
    why: 'If revenue per employee is flat or declining while headcount is growing, the CFO sees it as a scaling problem. The answer is automation — Agentforce agents handling routine work so humans focus on high-value tasks. Use this metric to anchor your ROI story: "here\'s how many agents your team could deploy without hiring."',
    products: ['Agentforce', 'Einstein AI', 'Agentforce for Service'],
  },

  // ── RISK & PRESSURE SIGNALS ──
  {
    name: 'Debt Covenants',
    abbrev: 'Covenants',
    category: 'risk',
    categoryLabel: '⚠️ Risk & Pressure Signals',
    definition: 'Restrictions imposed by lenders on a company\'s behavior, typically tied to financial ratios (leverage, interest coverage, liquidity). Violating a covenant can trigger immediate debt repayment.',
    why: 'If a company is near covenant limits, the entire org may be on a de facto spending freeze. Every new spend needs CFO approval and a direct link to covenant-improving metrics. But it also means if you can prove your deal reduces costs fast, you become a priority. Know before you pitch — check their 10-K Item 7 and credit agency ratings.',
    products: ['Agentforce', 'Revenue Cloud', 'Salesforce Platform'],
  },
  {
    name: 'Peer Benchmarking / Relative Performance',
    abbrev: 'Peer Bench',
    category: 'risk',
    categoryLabel: '⚠️ Risk & Pressure Signals',
    definition: 'How a company\'s financial and operational metrics compare to its direct industry peers. Boards evaluate management almost entirely on relative performance.',
    why: 'Underperformance vs. peers is the single most powerful compelling event in enterprise sales. "Your CCC is 12 days higher than the sector median" or "your TSR trails peers by 18% over 3 years" puts the CFO in a defensive position — they need a plan. You are the plan. Always enter a meeting knowing where they stand vs. their 3–5 closest peers.',
    products: ['Databook Intelligence', 'Agentforce Supply Chain', 'Data Cloud'],
  },
  {
    name: 'Restructuring Charges',
    abbrev: 'Restr.',
    category: 'risk',
    categoryLabel: '⚠️ Risk & Pressure Signals',
    definition: 'One-time charges on the income statement associated with workforce reductions, facility closures, or business reorganization. A signal that management is actively cutting costs.',
    why: 'Restructuring = leadership already knows they have a problem and is acting on it. They are not in "explore" mode — they are in "execute" mode. You need to show up with a specific, quantified solution tied to their stated cost reduction program, not a vision deck.',
    products: ['Agentforce', 'Einstein AI', 'Salesforce Platform'],
  },
  {
    name: 'M&A Integration Complexity',
    abbrev: 'M&A',
    category: 'risk',
    categoryLabel: '⚠️ Risk & Pressure Signals',
    definition: 'The operational challenge of merging acquired companies\' systems, processes, and cultures. M&A integration failures are a leading cause of value destruction.',
    why: 'Post-acquisition chaos = proliferating systems, duplicated processes, and fragmented customer data. This is your platform consolidation story: "one CRM, one platform, one view of the customer across both entities." If your account has made a major acquisition in the last 18 months, lead with integration.',
    products: ['Salesforce Platform', 'Data Cloud', 'Agentforce Operations'],
  },
  {
    name: 'Regulatory / Compliance Exposure',
    abbrev: 'Reg. Risk',
    category: 'risk',
    categoryLabel: '⚠️ Risk & Pressure Signals',
    definition: 'The degree to which a company\'s operations are subject to government regulation, and the potential financial impact of non-compliance (fines, license revocation, reputational damage).',
    why: 'High compliance exposure — especially in Utilities and Energy — creates demand for audit trails, data governance, and access controls. Salesforce Shield, Trust & Compliance products, and Data Cloud governance features are direct answers to regulatory risk items listed in the 10-K.',
    products: ['Salesforce Shield', 'Data Cloud', 'Compliance Cloud'],
  },
  {
    name: 'Customer Concentration Risk',
    abbrev: 'Cust. Conc.',
    category: 'risk',
    categoryLabel: '⚠️ Risk & Pressure Signals',
    definition: 'The percentage of total revenue derived from a small number of customers. High concentration (e.g., top 3 customers = 40%+ of revenue) creates existential risk if any one churns.',
    why: 'Companies with high customer concentration are either desperately protecting those key accounts (Service Cloud, Agentforce for Service story) or actively diversifying their customer base (Sales Cloud, Revenue Intelligence for net new motion). Know which mode they\'re in before you enter the meeting.',
    products: ['Service Cloud', 'Sales Cloud', 'Revenue Intelligence'],
  },
  {
    name: 'Earnings Per Share vs. Guidance',
    abbrev: 'EPS vs. Guide',
    category: 'risk',
    categoryLabel: '⚠️ Risk & Pressure Signals',
    definition: 'The difference between what management told investors they would earn (guidance) and what they actually delivered. Missing guidance is a serious credibility event.',
    why: 'An earnings miss followed by a guidance cut is one of the highest-urgency scenarios in enterprise sales. Leadership is under maximum pressure. They need a credible transformation story to tell the street. You can be part of that story — but you need to move fast and lead with outcomes, not features.',
    products: ['Agentforce', 'Einstein AI', 'Revenue Intelligence'],
  },
];

// ── DATA: 10-K STRUCTURE ─────────────────────────────────────
const TENK_STRUCTURE = [
  {
    num: 'Item 1',
    title: 'Business',
    desc: 'Products, services, business segments, customers, and competitive landscape. How the company makes money and who it competes with.',
    lens: 'Who are their customers? What\'s their business model? Are they product-led or services-led? This tells you which Salesforce clouds are relevant and how to frame your value proposition.',
  },
  {
    num: 'Item 1A',
    title: 'Risk Factors',
    desc: 'Management\'s disclosure of the key risks that could materially affect the business. Required by the SEC — lawyers review every word.',
    lens: 'This is your compelling event menu. Read every single one. "Supply chain disruption risk" = your supply chain pitch. "Difficulty attracting and retaining talent" = your Agentforce automation story. "Customer retention risk" = Service Cloud. Mine this section before every call.',
  },
  {
    num: 'Item 1B',
    title: 'Unresolved Staff Comments',
    desc: 'SEC comments on prior filings that haven\'t been resolved. Usually blank, but when it\'s not — pay attention.',
    lens: 'Rarely relevant to sellers, but non-blank entries can signal deeper accounting or compliance issues worth knowing.',
  },
  {
    num: 'Item 7',
    title: 'MD&A — Management Discussion & Analysis',
    desc: 'The narrative section where management explains the year\'s results, challenges, and strategic direction. This is the CFO talking directly to investors.',
    lens: 'This is the richest section for sellers. Every euphemism for "we had a bad year" is in here. "Operational challenges" = process failures. "Investments in efficiency" = they\'re spending. "Headwinds from supply chain" = your supply chain story. Read this like a journalist looking for the subtext.',
  },
  {
    num: 'Item 7A',
    title: 'Quantitative & Qualitative Disclosures About Market Risk',
    desc: 'Exposure to interest rates, foreign exchange, commodity prices, and other market risks.',
    lens: 'For energy and manufacturing companies, commodity price risk disclosures can tell you whether they\'re hedged or exposed. Exposed companies have volatile cash flows — which affects how aggressively they invest in new tech.',
  },
  {
    num: 'Item 8',
    title: 'Financial Statements',
    desc: 'The formal income statement, balance sheet, cash flow statement, and footnotes. Audited by a public accounting firm.',
    lens: 'Don\'t just look at the latest year — compare 3 years minimum. Trends matter more than snapshots. YoY comparison reveals pressure before it shows up in headlines. The footnotes often contain the most important information: debt covenants, contingent liabilities, related-party transactions.',
  },
  {
    num: 'Item 9A',
    title: 'Controls & Procedures',
    desc: 'Management\'s assessment of internal controls over financial reporting (SOX compliance). Any material weaknesses must be disclosed.',
    lens: 'Material weakness disclosures are gold for compliance-adjacent conversations. A company that just disclosed a material weakness in their financial controls is buying governance, audit trail, and access management technology. That\'s Salesforce Shield, Compliance Cloud, and Data Cloud governance.',
  },
];

// ── DATA: 10-K SIGNALS ───────────────────────────────────────
const TENK_SIGNALS = [
  {
    icon: '🔴',
    trigger: 'Restructuring charges on income statement',
    action: '<strong>Cost-cutting mode → automation urgency.</strong> They already know they have a problem. Come with a specific cost-reduction number, not a vision.',
  },
  {
    icon: '🟢',
    trigger: '"Investments in digital transformation" mentioned in MD&A',
    action: '<strong>Budget is moving → get on the list.</strong> If they\'re talking about it in the 10-K, the board approved spending. Find out who owns the program.',
  },
  {
    icon: '🔴',
    trigger: 'Rising Days Inventory Outstanding (DIO) vs. prior year',
    action: '<strong>Supply chain inefficiency → your supply chain story.</strong> Pull the number from the cash flow statement: (Avg Inventory / COGS) × 365.',
  },
  {
    icon: '🟡',
    trigger: 'Multiple CFO changes in the last 2 years',
    action: '<strong>Instability → tread carefully, but also opportunity.</strong> New CFO = new priorities, fresh ear, potential to reshape the vendor relationship. Get in early.',
  },
  {
    icon: '🔴',
    trigger: 'Negative free cash flow + new debt issuance',
    action: '<strong>Burning platform → every investment needs air cover.</strong> Get a Champion with budget authority. Proof of concept with fast payback is the only way in.',
  },
  {
    icon: '🟢',
    trigger: '"Operational efficiency" or "cost optimization" in MD&A',
    action: '<strong>Your opening.</strong> They\'re signaling to investors they\'re cutting waste. Agentforce automation is the mechanism. Come with a specific efficiency number.',
  },
  {
    icon: '🔴',
    trigger: 'Earnings miss + guidance cut in same quarter',
    action: '<strong>Maximum leadership pressure → move fast.</strong> A miss + guide-down is a credibility crisis. They need a plan. You can be part of the transformation story.',
  },
  {
    icon: '🟡',
    trigger: 'SG&A rising faster than revenue (widening as % of revenue)',
    action: '<strong>Overhead scaling problem → Agentforce automation, Sales Cloud.</strong> Calculate SG&A bps change YoY and put it in your first slide.',
  },
  {
    icon: '🟢',
    trigger: 'Major acquisition completed in past 12–18 months',
    action: '<strong>Integration chaos → platform consolidation story.</strong> "One CRM" is your hook. Fragmented systems and duplicated processes are guaranteed post-deal.',
  },
  {
    icon: '🔴',
    trigger: 'Covenant compliance disclosures with thin headroom',
    action: '<strong>Spending freeze risk → OpEx model is critical.</strong> Frame as OpEx (subscription), not capex. Emphasize fast payback. Get CFO engagement early.',
  },
];

// ── DATA: PAIN MAPPER ────────────────────────────────────────
const PAIN_MAP = [
  {
    signal: 'High Cash Conversion Cycle',
    says: '"We have working capital challenges"',
    means: 'Cash trapped in supply chain — inventory and AR are eating liquidity',
    solutions: ['Data Cloud', 'Order Management', 'Revenue Cloud'],
    convo: 'Walk me through your order-to-cash cycle today. Where does the most time get lost?',
    convoWhy: 'Gets them to self-identify the bottleneck, which you already know from their CCC data.',
    icon: '💰',
  },
  {
    signal: 'SG&A % Rising',
    says: '"We\'re focused on operational efficiency"',
    means: 'Overhead growing faster than revenue — board is asking questions',
    solutions: ['Agentforce', 'Einstein AI', 'Sales Cloud'],
    convo: 'If your sales and service teams could handle 30% more volume without adding headcount, what would that be worth to the business?',
    convoWhy: 'Anchors the ROI conversation in their language (operating leverage) before you\'ve mentioned a product.',
    icon: '⚙️',
  },
  {
    signal: 'Low / Negative Free Cash Flow',
    says: '"Every investment needs to show ROI"',
    means: 'CFO is the gatekeeper — no discretionary spend without hard numbers',
    solutions: ['Salesforce BVS', 'TCO Story', 'Agentforce'],
    convo: 'What does your internal business case process look like for technology investments? Who owns that?',
    convoWhy: 'Surfaces the CFO\'s approval process early so you can build the right narrative and get the right Champion.',
    icon: '📉',
  },
  {
    signal: 'TSR Underperforming Peers',
    says: '"We need to drive shareholder value"',
    means: 'Leadership under board pressure — transformation story needed for investor relations',
    solutions: ['Agentforce Supply Chain', 'MFG Cloud', 'Data Cloud'],
    convo: 'When you look at what your best-performing competitors are doing operationally, what\'s the gap you\'re most focused on closing?',
    convoWhy: 'Forces them to name the operational gap without you having to — then you map Salesforce to it.',
    icon: '📈',
  },
  {
    signal: 'Low NRR / Customer Churn',
    says: '"Customer retention is a top priority"',
    means: 'Service org is failing — customers are leaving at a rate that threatens the growth story',
    solutions: ['Service Cloud', 'Agentforce for Service', 'Revenue Cloud'],
    convo: 'When a customer churns or reduces their contract, what\'s typically the root cause? Is it product, service, or relationship?',
    convoWhy: 'If the answer is service or relationship, you have a direct Service Cloud and Agentforce for Service play.',
    icon: '🔁',
  },
  {
    signal: 'Revenue Concentration / Diversification',
    says: '"We\'re diversifying our customer base"',
    means: 'Top customers represent dangerous concentration — new market or segment entry underway',
    solutions: ['Sales Cloud', 'Revenue Intelligence', 'Agentforce for Sales'],
    convo: 'As you move into new segments, how are you equipping your sales team to replicate what works in your core market?',
    convoWhy: 'New segment entry = Sales Cloud + Revenue Intelligence. They need a playbook, not just a list of prospects.',
    icon: '🎯',
  },
  {
    signal: 'M&A Integration Activity',
    says: '"Integration is a key priority"',
    means: 'Fragmented systems, duplicated processes, siloed customer data from the acquisition',
    solutions: ['Salesforce Platform', 'Data Cloud', 'Agentforce Operations'],
    convo: 'Post-acquisition, how many CRM systems is the combined entity running today? What\'s the plan to consolidate?',
    convoWhy: 'Surfaces the "One CRM" pain directly. If they\'re on multiple systems, you have a platform consolidation story.',
    icon: '🔀',
  },
  {
    signal: 'EBITDA Margin Compression',
    says: '"We\'re focused on cost discipline"',
    means: 'Operating costs accelerating beyond revenue growth — board wants a margin restoration plan',
    solutions: ['Agentforce', 'Einstein AI', 'Revenue Intelligence'],
    convo: 'If you could eliminate one category of manual work across your sales and service teams, what would have the highest dollar impact?',
    convoWhy: 'Gets them to self-prioritize where automation ROI is highest — then you build the business case around their answer.',
    icon: '📊',
  },
  {
    signal: 'High DSO',
    says: '"We\'re working on improving our collections process"',
    means: 'Invoices aging, AR team overwhelmed, cash sitting uncollected on the balance sheet',
    solutions: ['Revenue Cloud', 'Collections & Recovery', 'Order Management'],
    convo: 'What\'s your average time from delivering a project or service to receiving payment? Where does the process break down?',
    convoWhy: 'Revenue Cloud and Collections & Recovery directly compress the invoice-to-cash window.',
    icon: '🧾',
  },
  {
    signal: 'Debt Covenant Pressure',
    says: '"We\'re being thoughtful about our balance sheet"',
    means: 'Near covenant limits — spending is constrained, every new commitment reviewed at CFO level',
    solutions: ['Agentforce (OpEx model)', 'Salesforce Platform', 'BVS ROI Framing'],
    convo: 'For a deal like this, what does the approval process look like given your current financial priorities?',
    convoWhy: 'Surfaces the covenant constraint early so you don\'t waste time building a deal that can\'t get signed.',
    icon: '⚠️',
  },
  {
    signal: 'Regulatory / Compliance Risk',
    says: '"We\'re investing in governance and controls"',
    means: 'Audit findings, regulatory scrutiny, or compliance gaps creating organizational risk',
    solutions: ['Salesforce Shield', 'Compliance Cloud', 'Data Cloud'],
    convo: 'How are you managing audit trails and data access controls across your customer and operational data today?',
    convoWhy: 'Direct entry to Shield, Compliance Cloud, and Data Cloud governance features.',
    icon: '🔐',
  },
  {
    signal: 'Restructuring / Cost-Cutting Program',
    says: '"We\'re streamlining the organization"',
    means: 'Headcount reductions, business unit consolidations — surviving teams expected to do more with less',
    solutions: ['Agentforce', 'Einstein AI', 'Agentforce for Service'],
    convo: 'As you reduce headcount in certain areas, how are you thinking about maintaining service levels and sales capacity?',
    convoWhy: 'Agentforce directly addresses the "more with less" mandate that follows every restructuring announcement.',
    icon: '✂️',
  },
];

// ── RENDER: CHEAT SHEET ──────────────────────────────────────
function renderCheatSheet() {
  const grid = document.getElementById('terms-grid');
  grid.innerHTML = TERMS.map(term => `
    <div class="term-card cat-${term.category}" data-category="${term.category}" tabindex="0">
      <div class="term-card-header">
        <div>
          <span class="term-category-badge">${term.categoryLabel}</span>
          <div class="term-name">${term.name}</div>
        </div>
        <span class="term-abbrev">${term.abbrev}</span>
      </div>
      <p class="term-definition">${term.definition}</p>
      <div class="term-why">
        <div class="term-why-label">⚡ Why it matters for you</div>
        <div class="term-why-text">${term.why}</div>
      </div>
      <div class="term-products">
        ${term.products.map(p => `<span class="product-tag">${p}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Filter logic
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.term-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
    });
  });
});

// ── RENDER: 10-K PAGE ────────────────────────────────────────
function renderTenkPage() {
  document.getElementById('tenk-structure').innerHTML = TENK_STRUCTURE.map(item => `
    <div class="tenk-item">
      <div class="tenk-item-header">
        <span class="tenk-item-num">${item.num}</span>
        <span class="tenk-item-title">${item.title}</span>
      </div>
      <p class="tenk-item-desc">${item.desc}</p>
      <div class="tenk-seller-lens">
        <div class="tenk-seller-lens-label">🔍 Seller's Lens</div>
        ${item.lens}
      </div>
    </div>
  `).join('');

  document.getElementById('tenk-signals').innerHTML = TENK_SIGNALS.map(s => `
    <div class="signal-card">
      <span class="signal-icon">${s.icon}</span>
      <div class="signal-body">
        <div class="signal-trigger">You see: <code>${s.trigger}</code></div>
        <div class="signal-action">${s.action}</div>
      </div>
    </div>
  `).join('');
}

// ── RENDER: PAIN MAPPER ──────────────────────────────────────
function renderPainMapper() {
  const table = document.getElementById('pain-map-table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>CFO Pain Signal</th>
        <th>What They Say</th>
        <th>What They Mean</th>
        <th>Salesforce Solution</th>
      </tr>
    </thead>
    <tbody>
      ${PAIN_MAP.map(row => `
        <tr>
          <td class="pain-signal-cell">
            <span class="signal-indicator"></span>${row.signal}
          </td>
          <td class="pain-what-they-say">${row.says}</td>
          <td class="pain-what-they-mean">${row.means}</td>
          <td>
            <div class="pain-solutions">
              ${row.solutions.map(s => `<span class="pain-solution-tag">${s}</span>`).join('')}
            </div>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;

  document.getElementById('convo-cards').innerHTML = PAIN_MAP.map(row => `
    <div class="convo-card">
      <div class="convo-card-trigger">
        <span class="convo-card-icon">${row.icon}</span>
        <span class="convo-card-signal">${row.signal}</span>
      </div>
      <div class="convo-question">${row.convo}</div>
      <div class="convo-why">${row.convoWhy}</div>
    </div>
  `).join('');
}

// ── ACCOUNTS PAGE ────────────────────────────────────────────
let accountsInitialized = false;

// Pre-loaded AE list from org62 research
const AES = [
  { id: '0053000000ASJbFAAX', name: 'Andrew Mathew' },
  { id: '0053000000C7l4FAAR', name: 'Christine Maron' },
  { id: '0053y00000Gi9i4AAB', name: 'Ryan Jones' },
  { id: '005ed000000EtflAAC', name: 'Geoff Wright' },
  { id: '005ed000000GfTpAAK', name: 'Jeffrey Boyer' },
  { id: '005ed000000HFnRAAW', name: 'Thomson Riley' },
];

// Static account + opportunity data pulled from org62
const STATIC_ACCOUNTS = {
  '0053000000ASJbFAAX': {
    ae: 'Andrew Mathew',
    accounts: [
      {
        id: '00130000002Fov9AAC',
        name: 'Veolia North America, LLC',
        industry: 'MAE',
        revenue: 1159656000,
        lastActivity: '2027-07-07',
        opps: [
          { id: '006ed00000WUf9lAAD', name: 'Veolia WTS "One CRM" - ASLM & DC & AF', amount: 1600000, stage: '02 - Determining Problem', closeDate: '2027-01-30' },
          { id: '006ed00000WUsi5AAD', name: 'Veolia WTS Wholistic Contracting - RCA', amount: 1500000, stage: '02 - Determining Problem', closeDate: '2027-01-30' },
          { id: '006ed00000WULhKAAX', name: 'Veolia NA Project Liberty - DC & AF', amount: 1250000, stage: '02 - Determining Problem', closeDate: '2027-01-30' },
          { id: '006ed00000VX9AkAAL', name: 'VNA New Org Marketing - MCE+', amount: 450000, stage: '02 - Determining Problem', closeDate: '2026-11-30' },
          { id: '006ed00000VpBFiAAN', name: 'Veolia North America LLC - Regrello', amount: 250000, stage: '02 - Determining Problem', closeDate: '2026-11-30' },
        ],
      },
      {
        id: '0013000000M1ZBaAAN',
        name: 'Veolia WTS USA, Inc.',
        industry: 'MAE',
        revenue: 34656000,
        lastActivity: '2027-07-06',
        opps: [
          { id: '006ed00000WUr7hAAD', name: 'Veolia NA Sales Excellence - CRM', amount: 1200000, stage: '02 - Determining Problem', closeDate: '2027-01-30' },
          { id: '006ed00000e6hWHAAY', name: 'Veolia WTZ - Data Masking & Seeding Expansion', amount: 320000, stage: '01 - Identifying', closeDate: '2026-08-31' },
          { id: '006ed00000e6Y81AAE', name: 'Veolia WTZ - B&R & Archive Renewal FY27', amount: 300000, stage: '01 - Identifying', closeDate: '2026-09-01' },
        ],
      },
      {
        id: '00100000001L6qjAAC',
        name: 'Ameren Services Company',
        industry: 'MAE',
        revenue: null,
        lastActivity: null,
        opps: [
          { id: '006ed00000RhfpxAAB', name: 'Ameren Next Gen Service - A4S, AF-Flex, DC', amount: 521808, stage: '06 - Finalizing Closure', closeDate: '2026-07-15' },
        ],
      },
    ],
  },
  '0053000000C7l4FAAR': {
    ae: 'Christine Maron',
    accounts: [
      {
        id: '0013y00001d6zQEAAY',
        name: 'Pacific Gas and Electric Company',
        industry: 'MAE',
        revenue: 17090000000,
        lastActivity: null,
        opps: [],
      },
      {
        id: '0013y00001d6xhcAAA',
        name: 'Pacific Gas And Electric Co',
        industry: 'MAE',
        revenue: 18469000000,
        lastActivity: null,
        opps: [],
      },
    ],
  },
  '0053y00000Gi9i4AAB': {
    ae: 'Ryan Jones',
    accounts: [
      {
        id: '00100000000M1KCAA0',
        name: 'Vulcan Materials Company',
        industry: 'Agriculture & Mining',
        revenue: 5552200000,
        lastActivity: '2027-07-06',
        opps: [],
      },
      {
        id: '001ed00000nBwe1AAC',
        name: 'Osaka Gas USA',
        industry: 'MAE',
        revenue: 13841867250,
        lastActivity: null,
        opps: [],
      },
      {
        id: '001ed00000J1MJnAAN',
        name: 'Kentucky Power',
        industry: 'MAE',
        revenue: 659547828,
        lastActivity: null,
        opps: [],
      },
      {
        id: '0013y00001dKzmsAAC',
        name: 'Kansas City Power & Light Company',
        industry: 'MAE',
        revenue: 5586700000,
        lastActivity: null,
        opps: [],
      },
    ],
  },
  '005ed000000EtflAAC': {
    ae: 'Geoff Wright',
    accounts: [
      {
        id: '00130000004DKtcAAG',
        name: 'Clean Harbors Environmental Services Inc.',
        industry: 'Engineering & Construction',
        revenue: 3805566000,
        lastActivity: '2028-10-12',
        opps: [
          { id: '006ed00000Kk24wAAB', name: 'Clean Harbors - A1E Service Upgrade', amount: 825000, stage: '02 - Determining Problem', closeDate: '2028-01-31' },
        ],
      },
      {
        id: '0013000000GtuvAAAR',
        name: 'Constellation NewEnergy, Inc.',
        industry: 'MAE',
        revenue: 63998209,
        lastActivity: '2027-07-07',
        opps: [
          { id: '006ed00000XTs21AAD', name: 'Constellation Agentforce Operations', amount: 500000, stage: '02 - Determining Problem', closeDate: '2027-01-31' },
          { id: '006ed00000Kg9hhAAB', name: 'Constellation AF Service EUC Upgrade', amount: 413080, stage: '03 - Validating Benefits', closeDate: '2027-01-29' },
          { id: '006ed00000NHe8fAAD', name: 'Constellation ITSM', amount: 449500, stage: '02 - Determining Problem', closeDate: '2027-09-30' },
          { id: '006ed00000HCMnlAAH', name: 'Constellation Employee Service', amount: 270000, stage: '02 - Determining Problem', closeDate: '2027-07-31' },
          { id: '006ed00000GylAxAAJ', name: 'Constellation NewEnergy - Shield', amount: 346113, stage: '02 - Determining Problem', closeDate: '2027-04-30' },
        ],
      },
      {
        id: '0013000000LD7CJAA1',
        name: 'Champion Energy Services, LLC',
        industry: 'MAE',
        revenue: null,
        lastActivity: null,
        opps: [
          { id: '006ed00000eaVxVAAU', name: 'Champion Energy - Revenue Management Advanced NB', amount: 400000, stage: '02 - Determining Problem', closeDate: '2027-01-31' },
        ],
      },
    ],
  },
  '005ed000000GfTpAAK': {
    ae: 'Jeffrey Boyer',
    accounts: [
      {
        id: '00100000001KsMbAAK',
        name: 'Entergy Services, LLC',
        industry: 'MAE',
        revenue: 12494921000,
        lastActivity: '2027-07-14',
        opps: [
          { id: '006ed00000UxYArAAN', name: 'Entergy Big Bet ph.2 - A4S, SCV, DC', amount: 900000, stage: '02 - Determining Problem', closeDate: '2027-01-29' },
          { id: '006ed00000bFoDiAAK', name: 'Entergy Data Cloud #AELA', amount: 850000, stage: '02 - Determining Problem', closeDate: '2027-01-19' },
          { id: '006ed00000VntccAAB', name: 'Entergy Agentforce', amount: 800025, stage: '02 - Determining Problem', closeDate: '2027-01-20' },
          { id: '006ed00000VmyL1AAJ', name: 'Agentforce Supply Chain - Regrello', amount: 500000, stage: '02 - Determining Problem', closeDate: '2027-01-25' },
        ],
      },
      {
        id: '001ed00000LsEMsAAN',
        name: 'Entergy New Orleans LLC',
        industry: 'MAE',
        revenue: 810564000,
        lastActivity: null,
        opps: [],
      },
      {
        id: '00100000001DW2yAAG',
        name: 'Evergy',
        industry: 'MAE',
        revenue: null,
        lastActivity: null,
        opps: [
          { id: '006ed00000ZTnArAAL', name: 'MC - Evergy - RFP Marketing', amount: 820000, stage: '02 - Determining Problem', closeDate: '2026-10-30' },
          { id: '006ed00000bEhnmAAC', name: 'MC - Evergy - RFP Upside SFP+MI', amount: 500000, stage: '02 - Determining Problem', closeDate: '2026-10-31' },
        ],
      },
    ],
  },
  '005ed000000HFnRAAW': {
    ae: 'Thomson Riley',
    accounts: [
      {
        id: '0010M00001WJjHWQA1',
        name: 'RWE Clean Energy Services, LLC',
        industry: 'MAE',
        revenue: null,
        lastActivity: null,
        opps: [
          { id: '006ed00000dQviXAAS', name: 'RWE - Regrello', amount: 750000, stage: '01 - Identifying', closeDate: '2027-01-29' },
          { id: '006ed00000dQvyfAAC', name: 'RWE - Agentforce', amount: 500000, stage: '01 - Identifying', closeDate: '2027-01-29' },
          { id: '006ed00000Jdf3aAAB', name: 'RWE Field Service', amount: 288000, stage: '02 - Determining Problem', closeDate: '2026-12-31' },
        ],
      },
      {
        id: '0013y00001d0sYOAAY',
        name: 'Oncourse',
        industry: 'MAE',
        revenue: null,
        lastActivity: null,
        opps: [
          { id: '006ed00000SJTnlAAH', name: 'OnCourse - CTO', amount: 572000, stage: '01 - Identifying', closeDate: '2026-07-24' },
        ],
      },
      {
        id: '0013y00001dKzmsAAC',
        name: 'Kansas City Power & Light Company',
        industry: 'MAE',
        revenue: 5586700000,
        lastActivity: null,
        opps: [],
      },
    ],
  },
};

// 10-K signals library (same data as server, duplicated for offline use)
const TENK_ACCOUNT_SIGNALS = {
  '00100000001KsMbAAK': {
    ticker: 'ETR', fy: 'FY2024',
    signals: [
      { metric: 'TSR vs. EEI Index', value: 'Underperforming EEI by ~8% TTM', indicator: 'negative', insight: 'Leadership under board pressure. Grid modernization capex up 15% signals operational urgency — transformation story is needed for investor relations.', product: 'Agentforce Operations, Field Service Cloud' },
      { metric: 'O&M Cost Efficiency', value: 'O&M expense +6.2% YoY vs. revenue +3.1%', indicator: 'negative', insight: 'Operating costs growing 2× faster than revenue. CFO mandate is efficiency. Manual field ops and service workflows are the target.', product: 'Agentforce for Service, Field Service Cloud' },
      { metric: 'ROIC vs. Sector', value: '6.8% vs. sector avg 8.2%', indicator: 'negative', insight: 'Every capex dollar scrutinized. Lead with hard ROI and 12-month payback. TCO story wins here — not product capability.', product: 'Data Cloud, Revenue Cloud' },
      { metric: 'Customer Satisfaction', value: 'Below avg J.D. Power regional utility ranking, 2nd consecutive year', indicator: 'negative', insight: 'Regulatory risk from low CSAT. Service org under direct pressure — your door to Agentforce for Service.', product: 'Service Cloud, Agentforce for Service' },
      { metric: 'Free Cash Flow', value: 'FCF negative $1.2B from grid hardening capex', indicator: 'warning', insight: 'CFO is gating every discretionary spend. Frame Salesforce as cost-reduction, not a new project.', product: 'Agentforce automation, Einstein AI' },
    ],
  },
  '0013000000GtuvAAAR': {
    ticker: 'CEG', fy: 'FY2024',
    signals: [
      { metric: 'TSR vs. S&P 500', value: 'Outperforming S&P by +34% TTM', indicator: 'positive', insight: 'Company is winning and investing. Expansion pitch works — AI-led transformation to capture next wave of nuclear + C&I growth.', product: 'Agentforce Platform, Data Cloud' },
      { metric: 'Revenue Growth', value: '+18% YoY on nuclear capacity + C&I customer growth', indicator: 'positive', insight: 'Sales org scaled rapidly. Complexity of managing new C&I customers at scale = Sales Cloud, Revenue Intelligence play.', product: 'Sales Cloud, Revenue Intelligence' },
      { metric: 'SG&A as % Revenue', value: '+340bps YoY from headcount growth', indicator: 'warning', insight: 'Growing fast but costs scaling with revenue — no operating leverage yet. Automation pitch: grow revenue without growing headcount.', product: 'Agentforce for Sales, Einstein AI' },
      { metric: 'Regulatory Complexity', value: 'Multiple new state-level market participation filings', indicator: 'warning', insight: 'Compliance complexity growing with market expansion. Shield and Compliance Cloud have a direct conversation here.', product: 'Salesforce Shield, Compliance Cloud' },
    ],
  },
  '0013y00001gEVvXAAW': {
    ticker: 'VIE (Paris)', fy: 'FY2024',
    signals: [
      { metric: 'Cash Conversion Cycle', value: 'CCC estimated 85+ days (water/waste services)', indicator: 'negative', insight: 'Long service delivery cycles = cash trapped in AR. High DSO for industrial services = Revenue Cloud, Collections story.', product: 'Revenue Cloud, Order Management' },
      { metric: 'EBITDA Margin', value: '12.8% vs. peer avg 15.1%', indicator: 'negative', insight: 'Margin gap vs. peers creates urgent efficiency mandate from parent Veolia SE. Position Salesforce as the operational layer.', product: 'Agentforce Operations, Service Cloud' },
      { metric: 'M&A Integration', value: 'Post-Suez acquisition integration still underway in North America', indicator: 'warning', insight: 'Fragmented systems from M&A = platform consolidation story. "One CRM" pitch maps directly to their stated integration priority.', product: 'Salesforce Platform, Data Cloud' },
      { metric: 'Working Capital', value: 'Net WC under pressure from municipal contract timing', indicator: 'negative', insight: 'Contract-to-cash inefficiency. Revenue Cloud + Field Service can compress the cycle from work order to invoice to payment.', product: 'Revenue Cloud, Field Service Cloud' },
    ],
  },
  '0013y00001d6zQEAAY': {
    ticker: 'PCG', fy: 'FY2024',
    signals: [
      { metric: 'Debt Covenants', value: 'Total debt $38B post-bankruptcy, covenants restrict new capex >$500M', indicator: 'negative', insight: 'Every proposal goes through a covenant lens. Lead with OpEx framing — subscription SaaS fits where capex doesn\'t.', product: 'Agentforce (OpEx model), Salesforce Platform' },
      { metric: 'Customer NPS / CSAT', value: 'Ranked last among CA utilities in J.D. Power satisfaction', indicator: 'negative', insight: 'CPUC watching NPS closely — regulatory risk on customer service. Service Cloud + Agentforce for Service = direct regulatory response.', product: 'Service Cloud, Agentforce for Service' },
      { metric: 'Free Cash Flow', value: 'FCF constrained by $7.5B wildfire fund contributions through 2028', indicator: 'negative', insight: 'FCF committed to liability reserves. New tech must show risk reduction ROI — frame Salesforce as operational risk mitigation.', product: 'Field Service Cloud, Agentforce Operations' },
    ],
  },
  '00130000004DKtcAAG': {
    ticker: 'CLH', fy: 'FY2024',
    signals: [
      { metric: 'Revenue Growth', value: '+8.4% YoY, driven by industrial services and Safety-Kleen', indicator: 'positive', insight: 'Growing through acquisition and organic expansion. Complexity scaling ahead of process maturity = platform play.', product: 'Sales Cloud, Service Cloud, Data Cloud' },
      { metric: 'EBITDA Margin', value: 'Adj. EBITDA margin 19.2% — strong but under pressure from labor costs', indicator: 'warning', insight: 'Labor inflation eating into strong margins. Field service automation and routing optimization are direct ROI plays.', product: 'Field Service Cloud, Agentforce Operations' },
      { metric: 'Capital Intensity', value: 'Capex as % revenue elevated at 9.1% for fleet/facility expansion', indicator: 'warning', insight: 'High capex mode — new investments need to show fast operational returns. Field Service ROI with asset utilization story.', product: 'Field Service Cloud, MFG Cloud' },
    ],
  },
  '0010M00001WJjHWQA1': {
    ticker: 'RWE (Frankfurt)', fy: 'FY2024',
    signals: [
      { metric: 'Renewable Energy Growth', value: 'US renewables portfolio expanding 40%+ through 2027', indicator: 'positive', insight: 'Massive build-out = project complexity, contractor coordination, and asset management at scale. Agentforce Operations and Field Service are direct fits.', product: 'Agentforce Operations, Field Service Cloud' },
      { metric: 'Project Management Complexity', value: 'Managing 50+ concurrent renewable construction projects in US', indicator: 'warning', insight: 'Supply chain coordination for renewable projects is the Regrello/Agentforce Operations story — cycle times, approvals, compliance tracking.', product: 'Agentforce Supply Chain (Regrello)' },
      { metric: 'SG&A Growth', value: 'US SG&A scaling with headcount as ops expand', indicator: 'warning', insight: 'Operating leverage not yet achieved as US business scales. Automation story: handle growth without proportional headcount growth.', product: 'Agentforce, Einstein AI' },
    ],
  },
};

function initAccountsPage() {
  accountsInitialized = true;
  const sel = document.getElementById('ae-selector');
  AES.forEach(ae => {
    const opt = document.createElement('option');
    opt.value = ae.id;
    opt.textContent = ae.name;
    sel.appendChild(opt);
  });

  sel.addEventListener('change', () => {
    const aeId = sel.value;
    if (!aeId) {
      document.getElementById('accounts-grid').style.display = 'none';
      document.getElementById('accounts-empty').style.display = '';
      return;
    }
    loadAccounts(aeId);
  });
}

function loadAccounts(aeId) {
  const data = STATIC_ACCOUNTS[aeId];
  if (!data) return;

  document.getElementById('accounts-empty').style.display = 'none';
  const grid = document.getElementById('accounts-grid');
  grid.style.display = 'grid';

  grid.innerHTML = data.accounts.map(acc => {
    const totalPipeline = acc.opps.reduce((sum, o) => sum + (o.amount || 0), 0);
    const topOpps = acc.opps.slice(0, 3);
    const hasSignals = !!TENK_ACCOUNT_SIGNALS[acc.id];

    return `
      <div class="account-card" data-account-id="${acc.id}" onclick="openAccountModal('${acc.id}')">
        <div class="account-card-header">
          <div class="account-name">${acc.name}</div>
          <span class="account-industry-badge">${acc.industry || 'MAE'}</span>
        </div>
        <div class="account-metrics">
          <div class="account-metric">
            <div class="account-metric-label">Annual Revenue</div>
            <div class="account-metric-value">${acc.revenue ? formatRevenue(acc.revenue) : '—'}</div>
          </div>
          <div class="account-metric">
            <div class="account-metric-label">Open Pipeline</div>
            <div class="account-metric-value ${totalPipeline > 0 ? 'positive' : ''}">${totalPipeline > 0 ? formatCurrency(totalPipeline) : '—'}</div>
          </div>
          <div class="account-metric">
            <div class="account-metric-label">Open Opps</div>
            <div class="account-metric-value">${acc.opps.length}</div>
          </div>
          <div class="account-metric">
            <div class="account-metric-label">10-K Signals</div>
            <div class="account-metric-value ${hasSignals ? 'positive' : ''}">${hasSignals ? '✓ Available' : 'Run Search'}</div>
          </div>
        </div>
        ${topOpps.length > 0 ? `
          <div class="account-opps-preview">
            ${topOpps.map(o => `
              <div class="opp-preview-item">
                <span class="opp-preview-name">${o.name}</span>
                <span class="opp-preview-amount">${formatCurrency(o.amount)}</span>
              </div>
            `).join('')}
          </div>
        ` : '<div class="account-opps-preview" style="color:var(--text-dim);font-size:11px;">No open opportunities</div>'}
        <button class="account-view-btn">View Account Intel →</button>
      </div>
    `;
  }).join('');
}

function openAccountModal(accountId) {
  // Find account across all AEs
  let account = null;
  let ae = null;
  for (const [aeId, aeData] of Object.entries(STATIC_ACCOUNTS)) {
    const found = aeData.accounts.find(a => a.id === accountId);
    if (found) { account = found; ae = aeData.ae; break; }
  }
  if (!account) return;

  const totalPipeline = account.opps.reduce((sum, o) => sum + (o.amount || 0), 0);
  const signals = TENK_ACCOUNT_SIGNALS[accountId];

  document.getElementById('modal-account-name').textContent = account.name;
  document.getElementById('modal-account-meta').textContent =
    `AE: ${ae} · ${account.industry || 'MAE'} · Revenue: ${account.revenue ? formatRevenue(account.revenue) : 'Private'} · Pipeline: ${formatCurrency(totalPipeline)}`;

  const body = document.getElementById('modal-body');
  body.innerHTML = `
    ${account.opps.length > 0 ? `
      <div class="modal-section">
        <div class="modal-section-title">Open Opportunities</div>
        <table class="opp-table">
          <thead>
            <tr>
              <th>Opportunity</th>
              <th>Stage</th>
              <th>Amount</th>
              <th>Close Date</th>
            </tr>
          </thead>
          <tbody>
            ${account.opps.map(o => `
              <tr>
                <td class="opp-name-cell">${o.name}</td>
                <td><span class="stage-badge ${stageClass(o.stage)}">${o.stage}</span></td>
                <td class="amount-cell">${formatCurrency(o.amount)}</td>
                <td style="font-family:var(--mono);font-size:12px;">${o.closeDate}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    <div class="modal-section">
      <div class="modal-section-title">
        📊 10-K Financial Signal Analysis
        ${signals ? `<span style="font-size:10px;color:var(--accent-green);margin-left:8px;">${signals.ticker} · ${signals.fy}</span>` : ''}
      </div>
      ${signals ? signals.signals.map(s => `
        <div class="tenk-signal-item ${s.indicator}">
          <div class="tenk-signal-top">
            <div class="tenk-signal-metric">${s.metric}</div>
            <div class="tenk-signal-value">${s.value}</div>
          </div>
          <div class="tenk-signal-insight">${s.insight}</div>
          <span class="tenk-signal-product">⚡ ${s.product}</span>
        </div>
      `).join('') : `
        <div class="tenk-signal-item neutral">
          <div class="tenk-signal-top">
            <div class="tenk-signal-metric">10-K Analysis Not Available</div>
          </div>
          <div class="tenk-signal-insight">Search SEC EDGAR for this company's most recent 10-K. Key sections to read: Item 1A (Risk Factors), Item 7 (MD&A), and the Cash Flow Statement in Item 8. Use the 10-K Guide tab for a full breakdown of what to look for.</div>
          <span class="tenk-signal-product">🔍 SEC EDGAR · Databook</span>
        </div>
      `}
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Scorecard</div>
      <div class="scorecard-grid">
        <div class="scorecard-item">
          <div class="scorecard-metric">Define Business Problem</div>
          <div class="scorecard-value ${scoreColor(account.opps.length > 0 ? 7 : 0)}">${account.opps.length > 0 ? '7.2' : '—'}</div>
        </div>
        <div class="scorecard-item">
          <div class="scorecard-metric">Compelling Event</div>
          <div class="scorecard-value ${scoreColor(signals ? 6.5 : 0)}">${signals ? '6.5' : '—'}</div>
        </div>
        <div class="scorecard-item">
          <div class="scorecard-metric">Funding & CFO Approval</div>
          <div class="scorecard-value ${scoreColor(totalPipeline > 500000 ? 5 : 0)}">${totalPipeline > 500000 ? '5.0' : '—'}</div>
        </div>
        <div class="scorecard-item">
          <div class="scorecard-metric">Decision Process</div>
          <div class="scorecard-value ${scoreColor(account.opps.length > 2 ? 6 : 0)}">${account.opps.length > 2 ? '6.0' : '—'}</div>
        </div>
        <div class="scorecard-item">
          <div class="scorecard-metric">Unique Business Value</div>
          <div class="scorecard-value ${scoreColor(signals ? 7 : 0)}">${signals ? '7.0' : '—'}</div>
        </div>
        <div class="scorecard-item">
          <div class="scorecard-metric">Overall Pipeline Health</div>
          <div class="scorecard-value ${scoreColor(totalPipeline > 1000000 ? 8 : totalPipeline > 500000 ? 6 : 3)}">${totalPipeline > 1000000 ? '8.1' : totalPipeline > 500000 ? '6.0' : '3.0'}</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('account-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}


// ── HELPERS ──────────────────────────────────────────────────
function formatCurrency(n) {
  if (!n || n === 0) return '$0';
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return '$' + Math.round(n / 1000) + 'K';
  return '$' + Math.round(n).toLocaleString();
}

function formatRevenue(n) {
  if (!n) return '—';
  if (n >= 1000000000) return '$' + (n / 1000000000).toFixed(1) + 'B';
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(0) + 'M';
  return '$' + Math.round(n / 1000) + 'K';
}

function stageClass(stage) {
  if (!stage) return '';
  const s = stage.toLowerCase();
  if (s.includes('06') || s.includes('close') || s.includes('final')) return 'stage-late';
  if (s.includes('03') || s.includes('04') || s.includes('05') || s.includes('validat')) return 'stage-mid';
  return 'stage-early';
}

function scoreColor(val) {
  if (!val || val === 0) return '';
  if (val >= 7) return 'high';
  if (val >= 5) return 'mid';
  return 'low';
}

// ── 10-K ANALYZER ────────────────────────────────────────────

// Each rule: { signal, keywords[], color ('red'|'yellow'|'green'), category, soWhat, product }
const ANALYZER_RULES = [
  // ── RED FLAGS ──
  {
    signal: 'Restructuring Charges',
    keywords: ['restructuring', 'restructuring charge', 'severance', 'workforce reduction', 'headcount reduction', 'reduction in force', 'rif '],
    color: 'red',
    category: 'Cost Pressure',
    soWhat: 'Leadership is already cutting. Come with a specific cost-reduction ROI — not a vision deck. Automation urgency is high.',
    product: 'Agentforce, Einstein AI',
  },
  {
    signal: 'Earnings Miss / Guidance Cut',
    keywords: ['below expectations', 'missed guidance', 'revised guidance downward', 'lowered guidance', 'guidance reduction', 'shortfall', 'below our expectations'],
    color: 'red',
    category: 'Shareholder Pressure',
    soWhat: 'Maximum leadership pressure. They need a credible transformation story. Move fast and lead with outcomes.',
    product: 'Agentforce Platform, Revenue Intelligence',
  },
  {
    signal: 'Negative / Declining Free Cash Flow',
    keywords: ['negative free cash flow', 'cash flow decreased', 'cash used in operations', 'cash constraints', 'liquidity concerns', 'cash burn'],
    color: 'red',
    category: 'Cash Flow Risk',
    soWhat: 'CFO is gating every discretionary spend. Lead with TCO reduction and 12-month payback framing. Get a champion with budget authority early.',
    product: 'Salesforce BVS, Agentforce',
  },
  {
    signal: 'Supply Chain Disruption Risk',
    keywords: ['supply chain disruption', 'supply chain risk', 'supplier concentration', 'single source', 'supply constraints', 'inventory shortages', 'procurement challenges', 'logistics disruption'],
    color: 'red',
    category: 'Supply Chain',
    soWhat: 'Direct door to Agentforce Operations and Supply Chain. They know they have a fragility problem — you have the solution.',
    product: 'Agentforce Operations, Agentforce Supply Chain',
  },
  {
    signal: 'Customer Retention / Churn Risk',
    keywords: ['customer attrition', 'customer churn', 'loss of customers', 'customer retention', 'customer satisfaction declined', 'customer complaints', 'net promoter', 'service levels declined'],
    color: 'red',
    category: 'Revenue Risk',
    soWhat: 'Service org is underperforming. Service Cloud and Agentforce for Service are direct responses to what\'s disclosed here.',
    product: 'Service Cloud, Agentforce for Service',
  },
  {
    signal: 'Regulatory / Compliance Risk',
    keywords: ['regulatory risk', 'regulatory compliance', 'regulatory changes', 'government regulation', 'compliance requirements', 'regulatory penalties', 'fines and penalties', 'sec investigation', 'audit findings', 'material weakness'],
    color: 'red',
    category: 'Compliance',
    soWhat: 'Shield, Compliance Cloud, and Data Cloud governance have a direct conversation here. Pull the exact regulation cited and map your solution to it.',
    product: 'Salesforce Shield, Compliance Cloud',
  },
  {
    signal: 'Cybersecurity / Data Breach Risk',
    keywords: ['cybersecurity', 'data breach', 'cyberattack', 'ransomware', 'data security', 'unauthorized access', 'information security risk', 'data privacy'],
    color: 'red',
    category: 'Risk',
    soWhat: 'Security risk disclosures open conversations about data governance, access controls, and Shield. Also signals IT/CISO as a potential sponsor.',
    product: 'Salesforce Shield, Data Cloud',
  },
  {
    signal: 'Debt Covenant / Leverage Risk',
    keywords: ['covenant', 'debt covenant', 'leverage ratio', 'interest coverage', 'credit facility', 'debt compliance', 'waiver', 'default risk', 'credit agreement'],
    color: 'red',
    category: 'Financial Risk',
    soWhat: 'Spending may be constrained by covenant limits. Frame your deal as OpEx (subscription), not capex. Emphasize fast payback and cost reduction impact.',
    product: 'Agentforce (OpEx model), Salesforce Platform',
  },
  {
    signal: 'Rising SG&A / Operating Cost Pressure',
    keywords: ['selling general and administrative', 'sg&a increased', 'operating expenses increased', 'cost of revenue increased', 'overhead increased', 'administrative costs', 'cost inflation'],
    color: 'red',
    category: 'Cost Pressure',
    soWhat: 'Overhead growing faster than revenue — CFO needs a plan. Calculate the SG&A bps change and use it in your first slide as a hook.',
    product: 'Agentforce, Einstein AI, Sales Cloud',
  },
  {
    signal: 'Declining Gross Margin',
    keywords: ['gross margin decreased', 'gross margin declined', 'gross profit decreased', 'margin compression', 'pricing pressure', 'cost of goods increased', 'input cost'],
    color: 'red',
    category: 'Profitability',
    soWhat: 'Thin or declining margins mean the CFO isn\'t buying features — they\'re buying efficiency. Lead with automation and waste reduction.',
    product: 'Agentforce Operations, Field Service Cloud',
  },
  {
    signal: 'Workforce / Talent Risk',
    keywords: ['talent retention', 'key personnel', 'labor shortage', 'difficulty attracting', 'employee turnover', 'labor costs increased', 'skilled workforce', 'talent acquisition'],
    color: 'red',
    category: 'Operational Risk',
    soWhat: 'Labor cost and retention pressures are a direct Agentforce automation story — do more with the workforce you have, reduce dependency on hard-to-hire skills.',
    product: 'Agentforce, Einstein AI',
  },

  // ── YELLOW FLAGS ──
  {
    signal: 'Digital Transformation Mentioned',
    keywords: ['digital transformation', 'digitalization', 'digital initiatives', 'technology modernization', 'modernize our systems', 'digital strategy', 'technology investment'],
    color: 'yellow',
    category: 'Investment Signal',
    soWhat: 'Budget is moving toward technology. If they\'re disclosing it, the board approved it. Find out who owns the program and get on the list.',
    product: 'Agentforce Platform, Data Cloud',
  },
  {
    signal: 'M&A / Integration Activity',
    keywords: ['acquisition', 'acquired', 'merger', 'integration', 'business combination', 'post-acquisition', 'divest', 'divestiture'],
    color: 'yellow',
    category: 'Strategic Change',
    soWhat: 'Post-M&A = fragmented systems and duplicated processes. Your platform consolidation story — "One CRM" — maps directly to their integration mandate.',
    product: 'Salesforce Platform, Data Cloud, Agentforce Operations',
  },
  {
    signal: 'Competition / Market Share Pressure',
    keywords: ['competitive pressure', 'increased competition', 'market share', 'competitors', 'pricing competition', 'competitive landscape', 'loss of market share'],
    color: 'yellow',
    category: 'Growth Risk',
    soWhat: 'Competitive pressure creates urgency around sales effectiveness and customer experience. Revenue Intelligence and Agentforce for Sales are direct responses.',
    product: 'Sales Cloud, Revenue Intelligence, Agentforce for Sales',
  },
  {
    signal: 'Customer Concentration Risk',
    keywords: ['customer concentration', 'significant customer', 'major customer', 'largest customer', 'top customer', 'single customer represents'],
    color: 'yellow',
    category: 'Revenue Risk',
    soWhat: 'Either protect the key account (Service Cloud) or diversify the base (Sales Cloud for new segment entry). Know which mode they\'re in.',
    product: 'Service Cloud, Sales Cloud',
  },
  {
    signal: 'Foreign Exchange / Macro Exposure',
    keywords: ['foreign exchange', 'currency risk', 'macroeconomic', 'inflation risk', 'interest rate risk', 'economic conditions', 'recessionary'],
    color: 'yellow',
    category: 'Market Risk',
    soWhat: 'Macro volatility makes CFOs cautious on new spend. Acknowledge the environment in your pitch and anchor on cost certainty and fast payback.',
    product: 'Salesforce BVS, TCO Analysis',
  },
  {
    signal: 'Inventory Build / Working Capital Stress',
    keywords: ['inventory increased', 'inventory build', 'days inventory', 'working capital', 'accounts receivable increased', 'days sales outstanding', 'collections', 'cash conversion'],
    color: 'yellow',
    category: 'Cash Flow',
    soWhat: 'Cash trapped in inventory or AR = working capital stress. Order Management, Revenue Cloud, and Collections & Recovery directly address this.',
    product: 'Order Management, Revenue Cloud, Collections & Recovery',
  },
  {
    signal: 'New Market / Geographic Expansion',
    keywords: ['expand into', 'new markets', 'geographic expansion', 'international expansion', 'new geographies', 'entering new', 'market entry'],
    color: 'yellow',
    category: 'Growth Mode',
    soWhat: 'Expansion mode = scaling complexity ahead of process maturity. Sales Cloud and Revenue Intelligence help them replicate what works without breaking.',
    product: 'Sales Cloud, Revenue Intelligence',
  },
  {
    signal: 'CFO / Executive Leadership Change',
    keywords: ['chief financial officer', 'new cfo', 'appointed as cfo', 'executive transition', 'management changes', 'new chief executive', 'leadership transition'],
    color: 'yellow',
    category: 'Relationship Signal',
    soWhat: 'New CFO = new priorities, fresh ear on vendor relationships. Get in early — within the first 90 days is the window to shape their agenda.',
    product: 'All — relationship reset opportunity',
  },
  {
    signal: 'ESG / Sustainability Commitments',
    keywords: ['esg', 'environmental social governance', 'sustainability', 'carbon neutral', 'net zero', 'carbon emissions', 'climate risk', 'decarbonization'],
    color: 'yellow',
    category: 'Strategic Priority',
    soWhat: 'ESG mandates often require data governance, reporting infrastructure, and supply chain visibility — all Salesforce plays. Especially relevant in Energy.',
    product: 'Data Cloud, Agentforce Operations, Net Zero Cloud',
  },

  // ── GREEN LIGHTS ──
  {
    signal: 'Strong Revenue Growth',
    keywords: ['revenue increased', 'revenue grew', 'revenue growth', 'top-line growth', 'record revenue', 'strong demand', 'revenue up'],
    color: 'green',
    category: 'Growth Signal',
    soWhat: 'Growth mode — they\'re scaling and complexity is increasing. Platform and automation sell well here. Lead with "how do you maintain this without proportional headcount growth?"',
    product: 'Sales Cloud, Agentforce, Revenue Cloud',
  },
  {
    signal: 'Investment in Technology / Innovation',
    keywords: ['technology investment', 'investing in technology', 'innovation', 'r&d investment', 'capital investment in technology', 'it modernization', 'platform investment', 'cloud migration'],
    color: 'green',
    category: 'Investment Signal',
    soWhat: 'Active tech investment signals a receptive buyer. Budget is moving. Get into the technology roadmap conversation before priorities are locked.',
    product: 'Agentforce Platform, Data Cloud',
  },
  {
    signal: 'Customer Experience / Satisfaction Focus',
    keywords: ['customer experience', 'customer satisfaction', 'customer success', 'nps improvement', 'customer engagement', 'improving customer service', 'customer-centric'],
    color: 'green',
    category: 'CX Priority',
    soWhat: 'CX as a stated priority opens every Service Cloud and Agentforce for Service conversation. They want to invest here — you have the product.',
    product: 'Service Cloud, Agentforce for Service',
  },
  {
    signal: 'Operational Efficiency Focus',
    keywords: ['operational efficiency', 'cost optimization', 'process improvement', 'streamline operations', 'automation', 'efficiency initiatives', 'reduce costs', 'cost reduction program'],
    color: 'green',
    category: 'Efficiency Priority',
    soWhat: 'Stated efficiency mandate gives you executive air cover. Lead with Agentforce automation ROI tied directly to their disclosed program.',
    product: 'Agentforce, Einstein AI, Agentforce Operations',
  },
  {
    signal: 'Strong Balance Sheet / Cash Position',
    keywords: ['strong balance sheet', 'cash and equivalents increased', 'strong liquidity', 'debt reduction', 'deleveraged', 'strong cash position', 'excess cash'],
    color: 'green',
    category: 'Buying Power',
    soWhat: 'Healthy balance sheet = genuine buying capacity. TCO and value story still matter, but you have a willing financial partner. Aim high on deal size.',
    product: 'Full platform, enterprise deal structure',
  },
  {
    signal: 'Agentforce / AI Readiness Signals',
    keywords: ['artificial intelligence', 'machine learning', 'ai strategy', 'generative ai', 'large language model', 'ai investment', 'automation strategy', 'intelligent automation'],
    color: 'green',
    category: 'AI Readiness',
    soWhat: 'They\'re already talking about AI to investors. Agentforce conversation walks in with a tailwind — align your demo to their disclosed AI priorities.',
    product: 'Agentforce, Einstein AI, Data Cloud',
  },
];

function extractEvidence(text, keywords) {
  const lowerText = text.toLowerCase();
  for (const kw of keywords) {
    const idx = lowerText.indexOf(kw.toLowerCase());
    if (idx !== -1) {
      // Find sentence boundaries around the match
      const start = Math.max(0, text.lastIndexOf('.', idx - 1) + 1);
      const endDot = text.indexOf('.', idx + kw.length);
      const end = endDot !== -1 ? Math.min(endDot + 1, idx + 300) : Math.min(idx + 300, text.length);
      let sentence = text.slice(start, end).trim();
      if (sentence.length > 280) sentence = sentence.slice(0, 280) + '…';
      return { keyword: kw, excerpt: sentence };
    }
  }
  return null;
}

function runAnalyzer() {
  const text = document.getElementById('tenk-input').value.trim();
  if (!text || text.length < 50) return;

  const resultsEl = document.getElementById('analyzer-results');
  const red = [], yellow = [], green = [];

  for (const rule of ANALYZER_RULES) {
    const evidence = extractEvidence(text, rule.keywords);
    if (evidence) {
      const hit = { ...rule, evidence };
      if (rule.color === 'red') red.push(hit);
      else if (rule.color === 'yellow') yellow.push(hit);
      else green.push(hit);
    }
  }

  const total = red.length + yellow.length + green.length;
  if (total === 0) {
    resultsEl.style.display = 'block';
    resultsEl.innerHTML = `<div class="no-signals-msg">No signals detected. Try pasting Item 1A (Risk Factors) or Item 7 (MD&A) for richer results.</div>`;
    return;
  }

  // Build verdict
  let verdict = '';
  if (red.length >= 4) verdict = `<strong>High-pressure account.</strong> ${red.length} risk signals detected — this CFO is dealing with real operational and financial stress. Lead with specific, quantified ROI. Don't pitch features.`;
  else if (red.length >= 2) verdict = `<strong>Moderate pressure.</strong> ${red.length} risk signals alongside ${green.length} investment indicators. Mix of defensive and growth plays available.`;
  else if (green.length >= 3) verdict = `<strong>Growth mode.</strong> Strong investment signals with limited risk flags. Expansion and platform story lead here — they\'re buying, not just considering.`;
  else verdict = `<strong>${total} signals detected.</strong> Review the breakdown below and map each finding to your opening question.`;

  const renderGroup = (items, colorClass, label, icon) => {
    if (!items.length) return '';
    return `
      <div class="results-group">
        <div class="results-group-heading ${colorClass}">${icon} ${label} (${items.length})</div>
        ${items.map(item => `
          <div class="result-item ${colorClass}">
            <div class="result-item-top">
              <div class="result-signal-name">${item.signal}</div>
              <span class="result-category-tag">${item.category}</span>
            </div>
            <div class="result-evidence">"…${item.evidence.excerpt}…"</div>
            <div class="result-so-what">⚡ ${item.soWhat}</div>
            <div class="result-product-tag">${item.product}</div>
          </div>
        `).join('')}
      </div>
    `;
  };

  resultsEl.style.display = 'block';
  resultsEl.innerHTML = `
    <div class="results-summary-bar">
      <div class="summary-pill red"><span class="summary-pill-count">${red.length}</span> Risk Signals</div>
      <div class="summary-pill yellow"><span class="summary-pill-count">${yellow.length}</span> Cautions</div>
      <div class="summary-pill green"><span class="summary-pill-count">${green.length}</span> Green Lights</div>
    </div>
    <div class="results-company-header">
      <div class="results-company-label">Seller's Briefing</div>
      <div class="results-verdict">${verdict}</div>
    </div>
    ${renderGroup(red, 'red', 'Risk Signals — Lead with urgency', '🔴')}
    ${renderGroup(yellow, 'yellow', 'Cautions — Qualify carefully', '🟡')}
    ${renderGroup(green, 'green', 'Green Lights — Buying signals', '🟢')}
  `;

  document.getElementById('analyzer-clear').style.display = '';
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Wire up analyzer
document.getElementById('analyze-btn').addEventListener('click', runAnalyzer);

document.getElementById('tenk-input').addEventListener('input', function () {
  const len = this.value.length;
  const hint = document.getElementById('analyzer-char-count');
  hint.textContent = len > 0 ? `${len.toLocaleString()} characters` : '';
});

document.getElementById('tenk-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runAnalyzer();
});

document.getElementById('analyzer-clear').addEventListener('click', () => {
  document.getElementById('tenk-input').value = '';
  document.getElementById('analyzer-results').style.display = 'none';
  document.getElementById('analyzer-char-count').textContent = '';
  document.getElementById('analyzer-clear').style.display = 'none';
});

// ── DATA: SVP SUPPLY CHAIN ───────────────────────────────────
const SC_TERMS = [
  {
    name: 'Cash Conversion Cycle (CCC)',
    abbrev: 'CCC',
    category: 'cost',
    categoryLabel: '💰 Cost',
    definition: 'Days Inventory Outstanding + Days Sales Outstanding − Days Payable Outstanding. The number of days cash is trapped between paying suppliers and collecting from customers.',
    why: 'This is the supply chain exec\'s most watched metric. Every extra day costs the company real working capital. Pull their CCC from the 10-K, compare to sector peers, and open with: "Your CCC is X days vs. Y for your closest competitors — here\'s where Salesforce compresses it."',
    products: ['Data Cloud', 'Order Management', 'Agentforce Operations'],
  },
  {
    name: 'Inventory Turnover / Days Inventory Outstanding',
    abbrev: 'DIO / Inv. Turn',
    category: 'efficiency',
    categoryLabel: '⚙️ Efficiency',
    definition: 'How many times inventory is sold and replaced in a period. DIO = (Avg Inventory / COGS) × 365. Low turns mean excess stock, obsolescence risk, and cash trapped on warehouse shelves.',
    why: 'Low inventory turns signal either poor demand forecasting or supply chain rigidity. Your pitch: Data Cloud + Agentforce Operations enabling real-time demand signals that feed directly into replenishment decisions — eliminating the manual spreadsheet loop they\'re almost certainly running today.',
    products: ['Data Cloud', 'Agentforce Operations', 'MFG Cloud'],
  },
  {
    name: 'Supplier On-Time Delivery (OTD)',
    abbrev: 'OTD %',
    category: 'resilience',
    categoryLabel: '🛡️ Resilience',
    definition: 'The percentage of supplier deliveries that arrive on the promised date and in full. A leading indicator of production line stoppages and customer service failures downstream.',
    why: 'Low OTD forces buffer inventory and reactive firefighting. The CSCO is almost always chasing this metric. Agentforce Operations can automate supplier follow-ups, escalation workflows, and exception handling — converting a manual daily war room into an automated process.',
    products: ['Agentforce Operations', 'MuleSoft', 'Manufacturing Cloud'],
  },
  {
    name: 'Demand Forecast Accuracy',
    abbrev: 'Forecast Acc.',
    category: 'visibility',
    categoryLabel: '📡 Visibility',
    definition: 'How closely predicted demand matches actual demand. Typically measured as 1 − (Mean Absolute Percentage Error). Poor forecast accuracy causes either stockouts or overstock — both destroy margin.',
    why: 'Most supply chain teams are forecasting in Excel or legacy ERP. Data Cloud unifies CRM pipeline data, sales history, and external signals into a live demand picture. The CSCO doesn\'t know that their sales team\'s CRM data could dramatically improve their forecast — this is your insight.',
    products: ['Data Cloud', 'Einstein AI', 'Agentforce Operations'],
  },
  {
    name: 'Order-to-Cash (OTC) Cycle Time',
    abbrev: 'OTC',
    category: 'efficiency',
    categoryLabel: '⚙️ Efficiency',
    definition: 'The end-to-end time from a customer placing an order to the company receiving payment. Longer OTC = more working capital consumed, more errors, more customer frustration.',
    why: 'OTC slowdowns are usually caused by manual handoffs between sales, supply chain, and finance. Order Management + Revenue Cloud automates the handoffs, catches exceptions before they become escalations, and gives every team a unified view of each order\'s status.',
    products: ['Order Management', 'Revenue Cloud', 'Agentforce'],
  },
  {
    name: 'Supply Chain Resilience / SCRM',
    abbrev: 'SCRM',
    category: 'resilience',
    categoryLabel: '🛡️ Resilience',
    definition: 'Supply Chain Risk Management — the capability to identify, assess, and respond to disruptions across the supply network. Increasingly driven by AI-based scenario modeling.',
    why: 'Post-COVID, every board is asking about supply chain resilience. CSCOs need to show a credible answer. Agentforce Operations + Data Cloud enables real-time supplier risk scoring, automated scenario modeling, and proactive escalation before a disruption becomes a crisis.',
    products: ['Agentforce Operations', 'Data Cloud', 'MuleSoft'],
  },
  {
    name: 'Total Cost of Ownership (TCO) — Procurement',
    abbrev: 'TCO',
    category: 'cost',
    categoryLabel: '💰 Cost',
    definition: 'The full lifecycle cost of a purchased input: unit price + freight + quality rework + inventory carrying cost + supplier management overhead. Purchasing decisions made on unit price alone consistently miss the real cost.',
    why: 'Most procurement organizations optimize on price. CSCOs know the real cost is total lifecycle. Data Cloud enables a TCO view across all supplier inputs — surfacing the hidden cost drivers that no ERP shows natively.',
    products: ['Data Cloud', 'Agentforce Operations', 'Manufacturing Cloud'],
  },
  {
    name: 'Landed Cost & Trade Compliance',
    abbrev: 'Landed Cost',
    category: 'cost',
    categoryLabel: '💰 Cost',
    definition: 'The total cost of a product delivered to a facility, including freight, tariffs, customs duties, insurance, and handling. In a tariff-volatile environment, this changes daily.',
    why: 'With tariff volatility at record highs, landed cost calculations are being redone constantly. The supply chain exec who has real-time landed cost visibility has a competitive advantage in sourcing decisions. This is a Data Cloud + integration story that very few AEs bring to this buyer.',
    products: ['Data Cloud', 'MuleSoft', 'Agentforce Operations'],
  },
  {
    name: 'Operational Equipment Effectiveness (OEE)',
    abbrev: 'OEE',
    category: 'visibility',
    categoryLabel: '📡 Visibility',
    definition: 'Availability × Performance × Quality — the gold standard for measuring manufacturing productivity. 100% OEE means running at full speed with zero downtime and zero defects. World class = 85%.',
    why: 'Low OEE in manufacturing is often a maintenance data problem — reactive maintenance instead of predictive. Field Service Cloud with IoT integration enables predictive maintenance workflows that prevent unplanned downtime. Frame it as: "What\'s one point of OEE worth to your throughput?"',
    products: ['Field Service Cloud', 'Manufacturing Cloud', 'Agentforce Operations'],
  },
];

const SC_OPENERS = [
  {
    question: 'Your CCC is X days vs. Y for your closest competitors. Walk me through where you think the most time gets lost — is it on the inventory side, the AR side, or somewhere in the middle?',
    why: 'Uses their own public data to anchor the conversation. Forces them to name the bottleneck before you pitch.',
  },
  {
    question: 'When your demand forecast misses — which direction does it usually miss in? Overstock or stockout?',
    why: 'Overstock = inventory visibility problem (Data Cloud story). Stockout = demand sensing problem (Einstein AI). The answer tells you exactly which product to lead with.',
  },
  {
    question: 'How much of your supplier communication and exception management is still running on email today?',
    why: 'Almost universally the answer is "too much." Opens Agentforce Operations — automated supplier follow-up, exception handling, escalation workflows.',
  },
  {
    question: 'If your sales team\'s pipeline data could feed your demand forecast in real time, what would that change about how you run your S&OP process?',
    why: 'Most CSCOs have never been told their CRM data could improve their forecast. This is an insight that immediately differentiates you from every other vendor in the room.',
  },
];

const SC_AVOID = [
  {
    text: '"We can do everything" — leading with product breadth',
    instead: 'Lead with one specific metric from their 10-K (CCC, DIO, OTD) and show you\'ve done the math.',
  },
  {
    text: '"Our CRM can help your supply chain" without specifics',
    instead: 'Name the specific integration: "Data Cloud unifies your ERP demand data with your CRM pipeline to produce a real-time forecast."',
  },
  {
    text: '"We integrate with everything" as a feature',
    instead: 'The CSCO doesn\'t care about integration capability — they care about outcomes. "Companies running this model reduced their DIO by X days."',
  },
  {
    text: 'Talking about Marketing Cloud or Service Cloud in the opening',
    instead: 'Stay in their world: inventory, suppliers, demand, fulfillment. Cross-sell only after you\'ve solved their problem.',
  },
];

const SC_PAIN_MAP = [
  { signal: 'High Inventory / Low Turns', says: '"We have too much working capital tied up"', means: 'Poor demand forecasting or supply planning rigidity', solutions: ['Data Cloud', 'Agentforce Operations', 'Einstein AI'] },
  { signal: 'Supplier OTD Failures', says: '"Our supply chain is too fragile"', means: 'Manual exception management; no proactive supplier visibility', solutions: ['Agentforce Operations', 'MuleSoft', 'Manufacturing Cloud'] },
  { signal: 'Forecast Accuracy Misses', says: '"We\'re always firefighting"', means: 'Sales and supply chain data are siloed — no unified demand picture', solutions: ['Data Cloud', 'Einstein AI', 'Agentforce'] },
  { signal: 'Manual S&OP Process', says: '"Our planning process takes too long"', means: 'Excel-based S&OP with week-long cycles and stale data', solutions: ['Agentforce Operations', 'Data Cloud', 'Einstein Forecasting'] },
  { signal: 'High Landed Cost / Tariff Exposure', says: '"We\'re dealing with tariff volatility"', means: 'No real-time landed cost visibility; sourcing decisions made on stale data', solutions: ['Data Cloud', 'MuleSoft', 'Agentforce Operations'] },
  { signal: 'Long Order-to-Cash Cycle', says: '"Customers complain about order visibility"', means: 'Manual handoffs between supply chain, sales, and finance', solutions: ['Order Management', 'Revenue Cloud', 'Agentforce'] },
];

// ── DATA: CMO ─────────────────────────────────────────────────
const CMO_TERMS = [
  {
    name: 'Marketing ROI / ROAS',
    abbrev: 'MROI / ROAS',
    category: 'measurement',
    categoryLabel: '📊 Measurement',
    definition: 'Return on Marketing Investment / Return on Ad Spend. The revenue generated per dollar of marketing investment. The CMO\'s most watched metric — and the one most CFOs are demanding accountability on.',
    why: 'Per Salesforce\'s own research (FY26), measuring marketing impact is CMOs\' #1 pain point. The CFO wants hard attribution numbers. Marketing Cloud + Data Cloud closes the loop between campaign spend and closed revenue — showing exactly which campaigns drove pipeline and closed deals.',
    products: ['Marketing Cloud', 'Data Cloud', 'Agentforce for Marketing'],
  },
  {
    name: 'Marketing-Attributed Pipeline',
    abbrev: 'MAP %',
    category: 'pipeline',
    categoryLabel: '📈 Pipeline',
    definition: 'The percentage of total sales pipeline that originated from or was influenced by marketing activities. A KPI used to justify marketing budget and demonstrate cross-functional contribution.',
    why: 'CMOs live and die by their pipeline contribution number. If marketing and sales run on disconnected systems, marketing can\'t prove attribution. Marketing Cloud + Sales Cloud on one platform = the only way to show the CFO that marketing is creating pipeline, not just impressions.',
    products: ['Marketing Cloud', 'Sales Cloud', 'Einstein Attribution'],
  },
  {
    name: 'Customer Acquisition Cost (CAC)',
    abbrev: 'CAC',
    category: 'measurement',
    categoryLabel: '📊 Measurement',
    definition: 'Total sales and marketing spend divided by number of new customers acquired in a period. Measures how efficiently the company is converting marketing investment into new logos.',
    why: 'Rising CAC is a board-level alarm. If it takes $50k to acquire a customer who generates $40k in year-one revenue, the math doesn\'t work. Marketing Cloud helps CMOs reduce CAC by targeting higher-propensity buyers and eliminating wasted spend on low-intent audiences.',
    products: ['Marketing Cloud', 'Data Cloud', 'Einstein AI'],
  },
  {
    name: 'Marketing Tech Stack Sprawl',
    abbrev: 'MarTech',
    category: 'ai',
    categoryLabel: '🤖 AI & Data',
    definition: 'The proliferation of point solutions across the marketing organization: separate tools for email, social, ads, analytics, ABM, events, and more. Most enterprise marketing orgs run 30–50 tools.',
    why: 'FY26 research shows CMOs rank MarTech consolidation as a top priority. Every disconnected tool is a data silo that prevents personalization and attribution. Salesforce\'s pitch: replace 5–10 tools with Marketing Cloud + Data Cloud, recover the integration cost, and get a unified customer view for free.',
    products: ['Marketing Cloud', 'Data Cloud', 'Agentforce for Marketing'],
  },
  {
    name: 'Personalization at Scale',
    abbrev: 'P@S',
    category: 'personalization',
    categoryLabel: '🎯 Personalization',
    definition: 'The ability to deliver individually tailored content, offers, and experiences to each customer in real time — across email, web, ads, and in-person channels — without manual segmentation.',
    why: 'CMOs want to personalize but are doing manual segmentation that takes days. Data Cloud unified profiles + Agentforce for Marketing = real-time, AI-driven 1:1 personalization at any scale. Lead with: "Up to 40% increase in marketing team productivity" from the Salesforce research data.',
    products: ['Data Cloud', 'Marketing Cloud', 'Agentforce for Marketing'],
  },
  {
    name: 'Demand Generation Efficiency',
    abbrev: 'DemandGen',
    category: 'pipeline',
    categoryLabel: '📈 Pipeline',
    definition: 'The ability to generate qualified sales pipeline from marketing spend. The CMO owns top-of-funnel — their job is to fill the sales team\'s pipeline with quality leads, not just any leads.',
    why: 'One of CMOs\' biggest complaints: running acquisition campaigns to existing customers because the data is fragmented. Data Cloud solves this — unified customer profiles mean marketing always knows who is already a customer and who is a net-new prospect.',
    products: ['Data Cloud', 'Marketing Cloud', 'Sales Cloud'],
  },
  {
    name: 'Sales-Marketing Alignment',
    abbrev: 'SMarketing',
    category: 'pipeline',
    categoryLabel: '📈 Pipeline',
    definition: 'The degree to which sales and marketing teams share common goals, data, and processes. Misalignment causes lead leakage, duplicated effort, and attribution disputes.',
    why: 'The handoff between marketing and sales is where pipeline goes to die. If marketing passes a lead and sales doesn\'t see it for 3 days, the deal is cold. Marketing Cloud + Sales Cloud on the same platform = instant, automated lead routing with full visibility for both teams.',
    products: ['Marketing Cloud', 'Sales Cloud', 'Agentforce'],
  },
  {
    name: 'AI-Powered Content & Campaign Creation',
    abbrev: 'GenAI Marketing',
    category: 'ai',
    categoryLabel: '🤖 AI & Data',
    definition: 'Using generative AI to produce on-brand content, personalized email copy, ad variants, and campaign assets at speed and scale — reducing dependence on agency or in-house creative resources.',
    why: 'FY26 research shows marketing teams are actively experimenting with AI workflows but don\'t have a governed enterprise approach. Agentforce for Marketing provides AI content generation within the Einstein Trust Layer — so the CMO can scale content production without security or brand risk.',
    products: ['Agentforce for Marketing', 'Marketing Cloud', 'Einstein Trust Layer'],
  },
];

const CMO_OPENERS = [
  {
    question: 'When the CFO asks you to show marketing\'s contribution to revenue, what does that conversation look like today — and where does the data fall short?',
    why: 'CMOs universally struggle with attribution. Opens the Data Cloud + Einstein Attribution story without you having to pitch it.',
  },
  {
    question: 'How many tools is your marketing team managing today? And how many of those talk to each other without manual intervention?',
    why: 'Opens MarTech consolidation. The answer is almost always painful. Let them say it before you offer a solution.',
  },
  {
    question: 'When a lead comes in from marketing and nothing happens on the sales side for 48 hours, what\'s the process — and whose problem is it?',
    why: 'Surfaces sales-marketing alignment failures. If they laugh, that\'s your Sales Cloud + Marketing Cloud same-platform story.',
  },
  {
    question: 'How are you thinking about using AI in your marketing org — and where are you most nervous about brand safety or compliance risk?',
    why: 'FY26 data shows CMOs are experimenting but cautious. Einstein Trust Layer + Agentforce for Marketing is the answer to both halves of that question.',
  },
];

const CMO_AVOID = [
  {
    text: 'Opening with "We have a great email platform"',
    instead: 'Lead with attribution and pipeline contribution — that\'s what the CMO\'s CFO is asking about.',
  },
  {
    text: 'Talking about Marketing Cloud without Data Cloud',
    instead: 'In FY26, personalization and attribution without unified data is table stakes. Always pair Marketing Cloud + Data Cloud.',
  },
  {
    text: '"We can replace your marketing stack"',
    instead: '"We can consolidate your most fragmented tools and give you a unified customer view" — specific is credible, vague is threatening.',
  },
  {
    text: 'Ignoring the CFO relationship',
    instead: 'CMOs report to CEOs but are increasingly pressured by CFOs. Frame every marketing investment as revenue impact, not campaign performance.',
  },
];

const CMO_PAIN_MAP = [
  { signal: 'Can\'t Prove Marketing ROI', says: '"The CFO keeps asking me to justify spend"', means: 'Disconnected tools block full-funnel attribution', solutions: ['Marketing Cloud', 'Data Cloud', 'Einstein Attribution'] },
  { signal: 'Running Campaigns to Existing Customers', says: '"Our data quality is a problem"', means: 'Fragmented customer data — no unified profile', solutions: ['Data Cloud', 'Marketing Cloud', 'Agentforce'] },
  { signal: 'MarTech Sprawl / High Tool Costs', says: '"We have too many tools that don\'t talk"', means: 'Point solution accumulation with no single source of truth', solutions: ['Marketing Cloud', 'Data Cloud', 'Platform Consolidation'] },
  { signal: 'Lead Leakage at Handoff', says: '"Marketing and sales aren\'t aligned"', means: 'Manual lead routing creates 48–72 hour delays and lost pipeline', solutions: ['Marketing Cloud', 'Sales Cloud', 'Agentforce'] },
  { signal: 'Slow Content Production', says: '"We can\'t produce content fast enough"', means: 'In-house or agency bottleneck limits campaign velocity', solutions: ['Agentforce for Marketing', 'Marketing Cloud', 'Einstein Trust Layer'] },
  { signal: 'AI Adoption Pressure', says: '"Leadership wants AI in our marketing"', means: 'CEO/CTO mandate but no governed enterprise approach yet', solutions: ['Agentforce for Marketing', 'Einstein Trust Layer', 'Data Cloud'] },
];

// ── DATA: CIO ─────────────────────────────────────────────────
const CIO_TERMS = [
  {
    name: 'Agentic AI / Digital Labor',
    abbrev: 'Agentforce',
    category: 'ai',
    categoryLabel: '🤖 AI & Data',
    definition: 'AI agents that autonomously complete multi-step tasks — not just answering questions, but taking actions, making decisions, and collaborating with humans across business processes.',
    why: 'Per Salesforce CIO research (FY26), 50% of CIOs are already investing in Agentic AI and 24% are experimenting. The CIO is being asked to make AI "real." Your job: transition the conversation from "AI vision" to "AI implementation" — data readiness, governance, and practical deployment timelines.',
    products: ['Agentforce', 'Einstein Trust Layer', 'Data Cloud'],
  },
  {
    name: 'Data Readiness for AI',
    abbrev: 'Data Readiness',
    category: 'ai',
    categoryLabel: '🤖 AI & Data',
    definition: 'The degree to which an organization\'s data is clean, unified, governed, and accessible enough to power AI use cases. Without it, AI produces inaccurate or harmful outputs.',
    why: 'FY26 research: 94% of CIOs feel confident about AI steps but only 53% have their data prepared. This gap is your entry. "Your AI roadmap is only as good as your data foundation" — Data Cloud closes the gap between where they are and where AI needs them to be.',
    products: ['Data Cloud', 'Agentforce', 'MuleSoft'],
  },
  {
    name: 'IT Simplification / Platform Consolidation',
    abbrev: 'IT Simplification',
    category: 'simplification',
    categoryLabel: '🧹 Simplification',
    definition: 'The strategic reduction of the number of technology platforms, vendors, and integrations an organization manages. The antidote to point-solution sprawl and its associated integration cost, security risk, and operational overhead.',
    why: 'CIOs rank managing too many point solutions as a top pain. Salesforce moved from 6th to 1st in CIO preference for this category in FY26. Your message: "One platform for AI, CRM, data, and automation — replacing 4–6 point solutions that each have their own integration, support contract, and security posture."',
    products: ['Salesforce Platform', 'Agentforce', 'MuleSoft'],
  },
  {
    name: 'Security & AI Governance',
    abbrev: 'AI Governance',
    category: 'security',
    categoryLabel: '🔐 Security',
    definition: 'The policies, controls, and technical safeguards that ensure AI systems operate safely, accurately, and in compliance with data privacy regulations. The #1 blocker for enterprise AI adoption.',
    why: 'CIOs name security as the #1 thing keeping them up at night — and AI is intensifying it. Einstein Trust Layer addresses this with zero data retention, prompt injection protection, and complete audit trails. This is table stakes to get through IT procurement — lead with it, don\'t save it.',
    products: ['Einstein Trust Layer', 'Salesforce Shield', 'Data Cloud'],
  },
  {
    name: 'Legacy Technical Debt',
    abbrev: 'Tech Debt',
    category: 'simplification',
    categoryLabel: '🧹 Simplification',
    definition: 'The accumulated cost of previous technology decisions that now slow down new development — outdated systems, custom integrations, unsupported frameworks, and unmaintained code.',
    why: 'CIOs know tech debt is slowing them down but often feel trapped by it. MuleSoft\'s API-led connectivity lets them decouple from legacy systems without a full rip-and-replace. Position Salesforce as "the new layer on top" — not a reason to throw away existing investments.',
    products: ['MuleSoft', 'Salesforce Platform', 'Agentforce'],
  },
  {
    name: 'Implementation & Time-to-Value',
    abbrev: 'TTV',
    category: 'delivery',
    categoryLabel: '🚀 Delivery',
    definition: 'How quickly a technology investment begins delivering measurable business value after go-live. CIOs are evaluated on delivery speed — and burned by overpromised timelines.',
    why: 'Per Salesforce CIO research: "A partner told us a project would take 4 months — it\'s taken 14 months." Transparency on implementation timelines is non-negotiable. Lead with realistic timelines, Signature Success, and reference customers in their vertical who went live in comparable timeframes.',
    products: ['Signature Success', 'Agentforce', 'Professional Services'],
  },
  {
    name: 'IT Budget Optimization (CapEx vs. OpEx)',
    abbrev: 'IT Budget',
    category: 'delivery',
    categoryLabel: '🚀 Delivery',
    definition: 'How technology spend is classified and managed — capital expenditures (long-term assets) vs. operating expenses (recurring subscriptions). CIOs and CFOs often disagree on classification, affecting what\'s fundable.',
    why: 'CIOs increasingly prefer OpEx models (subscriptions) that convert unpredictable project costs into predictable run rates. Salesforce\'s subscription model + AI acceleration (2x faster ROI vs. custom builds) resonates when you frame it as CapEx avoidance: "Here\'s what you would have spent building this internally."',
    products: ['Agentforce', 'Salesforce Platform', 'TCO Analysis'],
  },
  {
    name: 'Change Management & AI Adoption',
    abbrev: 'Change Mgmt',
    category: 'delivery',
    categoryLabel: '🚀 Delivery',
    definition: 'The organizational process of helping employees adapt to new technologies, processes, and ways of working. The most common reason technology projects fail — not the technology, but the adoption.',
    why: 'CIOs in FY26 research listed "educating the org on AI while maintaining workflows" as their #3 priority (up from #5). This is your Salesforce-as-partner story — not just software but enablement, training, and change management resources that reduce adoption risk.',
    products: ['Salesforce Trailhead', 'Signature Success', 'Agentforce'],
  },
];

const CIO_OPENERS = [
  {
    question: 'When your CEO says "we need to be an AI company" — what does that actually mean for your team\'s roadmap over the next 12 months? Where do you start?',
    why: 'Surfaces the gap between mandate and execution. Opens your "practical AI implementation, not hype" positioning.',
  },
  {
    question: 'How many point solutions is your organization managing today, and what percentage of your team\'s time goes to keeping integrations working vs. building new capabilities?',
    why: 'Almost universally painful. Opens platform consolidation and MuleSoft without you needing to pitch it.',
  },
  {
    question: 'When you think about deploying AI across business teams, what\'s your biggest concern — is it more about the data foundation, the security posture, or the change management challenge?',
    why: 'Three-part question that routes to Einstein Trust Layer, Data Cloud, or Signature Success depending on the answer.',
  },
  {
    question: 'What was the last technology project that came in on time and on budget? What made that one different?',
    why: 'Opens implementation credibility conversation. Lets them name what success looks like — then you position Signature Success as how you deliver it.',
  },
];

const CIO_AVOID = [
  {
    text: 'Overpromising implementation timelines',
    instead: 'CIOs have been burned by this. Be specific, reference comparable implementations, lead with Signature Success.',
  },
  {
    text: '"We\'re the AI company" without specifics',
    instead: 'CIOs need nuts and bolts: data readiness, deployment timeline, governance controls. Substance over aspiration.',
  },
  {
    text: 'Cold outreach / generic emails',
    instead: 'FY26 research: CIOs respond to peer referrals, Gartner/Forrester, and trusted advisors (Bain, Accenture, Deloitte). Warm intro always.',
  },
  {
    text: 'Selling to the CIO without considering end users',
    instead: 'CIOs explicitly said this is a turnoff. Always demo end-user workflows, not admin consoles. Show what the rep/agent/service team sees.',
  },
];

const CIO_PAIN_MAP = [
  { signal: 'Under Pressure to Deliver AI', says: '"The CEO wants AI now"', means: 'Mandate without roadmap — needs a practical starting point', solutions: ['Agentforce', 'Data Cloud', 'Einstein Trust Layer'] },
  { signal: 'Data Not Ready for AI', says: '"Our data is a mess"', means: 'Fragmented systems; no unified data layer; AI blocked', solutions: ['Data Cloud', 'MuleSoft', 'Informatica MDM'] },
  { signal: 'Too Many Point Solutions', says: '"We have too much tech debt"', means: 'Integration costs are consuming engineering capacity', solutions: ['Salesforce Platform', 'MuleSoft', 'Agentforce'] },
  { signal: 'Security / AI Governance Concerns', says: '"We can\'t let AI touch customer data"', means: 'Data privacy, compliance, and prompt security are blockers', solutions: ['Einstein Trust Layer', 'Salesforce Shield', 'Data Cloud'] },
  { signal: 'Failed / Over-Budget Implementations', says: '"Our last implementation was a disaster"', means: 'Burned by prior vendor overpromises; trust must be rebuilt', solutions: ['Signature Success', 'Professional Services', 'Phased Delivery'] },
  { signal: 'Legacy System Lock-in', says: '"We can\'t rip and replace"', means: 'Investment in legacy creates inertia; needs additive approach', solutions: ['MuleSoft', 'Salesforce Platform', 'Agentforce'] },
];

// ── DATA: CEO ─────────────────────────────────────────────────
const CEO_TERMS = [
  {
    name: 'Competitive Advantage / Market Position',
    abbrev: 'Competitive Edge',
    category: 'competition',
    categoryLabel: '🏆 Competition',
    definition: 'The capabilities, assets, or structural advantages that allow a company to outperform its peers in a given market. The CEO\'s ultimate responsibility: protecting and extending the moat.',
    why: 'CEOs are not buying software. They\'re buying competitive advantage. Frame every Salesforce conversation as: "Your competition is moving faster because of X. Here\'s how you close or extend that gap." Use publicly available peer data — growth rates, margins, analyst reports — to make it concrete.',
    products: ['Agentforce', 'Data Cloud', 'Manufacturing Cloud'],
  },
  {
    name: 'Organic Revenue Growth',
    abbrev: 'Organic Growth',
    category: 'growth',
    categoryLabel: '📈 Growth',
    definition: 'Revenue growth generated from the company\'s existing operations and customer base — not from acquisitions. The purest signal of business health and competitive execution.',
    why: 'If organic growth is flat or declining while a competitor is surging, the CEO is in transformation urgency mode. They need to show the board a credible plan. "How Salesforce is accelerating revenue growth for comparable companies" is your opening — not product features.',
    products: ['Sales Cloud', 'Revenue Cloud', 'Agentforce for Sales'],
  },
  {
    name: 'Digital Transformation ROI',
    abbrev: 'Digital ROI',
    category: 'transformation',
    categoryLabel: '🔄 Transformation',
    definition: 'The measurable business value delivered by technology-driven transformation initiatives — revenue growth, cost reduction, and productivity gains attributable to digital investments.',
    why: 'CEOs approved transformation spend and now want proof it worked. Salesforce delivers $5–7 return per $1 invested over 3 years (Forrester TEI). Lead with customer stories from their exact vertical — a Medtronic or RealTruck example lands harder than abstract ROI statistics.',
    products: ['Salesforce Platform', 'Agentforce', 'Data Cloud'],
  },
  {
    name: 'Operational Excellence / "Doing More with Less"',
    abbrev: 'Op. Excellence',
    category: 'execution',
    categoryLabel: '⚡ Execution',
    definition: 'The consistent ability to execute strategy efficiently — hitting targets, managing costs, and scaling operations without proportional headcount increases. Every CEO wants it; most struggle to achieve it post-growth.',
    why: 'CEOs under analyst or activist pressure (like Elliott at Medtronic) need an "operational excellence" story. Agentforce is the mechanism: 68% of interactions resolved without human involvement, 25–30% reduction in cost-to-serve. This is the CEO\'s "Simplify" mandate made real.',
    products: ['Agentforce', 'Agentforce Operations', 'Einstein AI'],
  },
  {
    name: 'M&A Value Creation',
    abbrev: 'M&A Value',
    category: 'growth',
    categoryLabel: '📈 Growth',
    definition: 'The ability to realize synergies and revenue upside from acquisitions quickly. Most M&A value destruction happens in the integration phase — systems fragmentation, cultural friction, and duplicated processes.',
    why: 'For CEOs running acquisition-led growth strategies, integration speed is a competitive differentiator. The company that integrates in 6 months beats the one that takes 24. MuleSoft + Salesforce Platform compresses integration timelines from 18–24 months to 6–8.',
    products: ['MuleSoft', 'Salesforce Platform', 'Data Cloud'],
  },
  {
    name: 'Talent & Workforce Strategy',
    abbrev: 'Workforce',
    category: 'execution',
    categoryLabel: '⚡ Execution',
    definition: 'How the company attracts, develops, deploys, and retains talent in an environment where AI is changing what work looks like. CEOs are navigating "AI + humans" workforce strategy at the board level.',
    why: 'The CEO needs an "AI + humans" story for the board, investors, and employees. Agentforce enables the narrative: "We\'re not replacing people — we\'re freeing them for higher-value work." 31,000 leads handled by Agentforce generating $1.1M in pipeline while the team focused on closing.',
    products: ['Agentforce', 'Agentforce for Sales', 'Agentforce for Service'],
  },
  {
    name: 'Board & Investor Confidence',
    abbrev: 'Board Story',
    category: 'transformation',
    categoryLabel: '🔄 Transformation',
    definition: 'The CEO\'s ability to present a credible transformation narrative to the board, institutional investors, and analysts — including a clear technology roadmap that supports the financial strategy.',
    why: 'CEOs need to show investors a technology story that justifies valuation. "We are deploying Agentforce across our commercial operations" is a boardroom statement. Give the CEO the language and the data to tell that story — specific metrics, comparable customers, and a credible roadmap.',
    products: ['Agentforce', 'Data Cloud', 'Salesforce BVS'],
  },
  {
    name: 'Customer Experience as Strategic Moat',
    abbrev: 'CX Strategy',
    category: 'competition',
    categoryLabel: '🏆 Competition',
    definition: 'Using superior customer experience as a durable competitive advantage — making it expensive and friction-filled for customers to switch to a competitor, while increasing their spend over time.',
    why: 'CEOs who\'ve built their brand on CX (and those whose CX is destroying it — see Medtronic/Comcast comparison) have a burning platform. Service Cloud + Agentforce for Service enables 24/7 AI-powered CX that scales without headcount. For a CEO under margin pressure, better CX at lower cost-per-interaction is the rare double win.',
    products: ['Service Cloud', 'Agentforce for Service', 'Einstein AI'],
  },
];

const CEO_OPENERS = [
  {
    question: 'When you look at what your best-performing competitor is doing operationally that you\'re not — what\'s the gap you\'re most focused on closing this year?',
    why: 'Forces them to name the competitive gap themselves. You then map Salesforce to it — don\'t map it in advance.',
  },
  {
    question: 'Your board wants a technology transformation story. What does that narrative look like today — and where is the evidence of ROI that makes it credible?',
    why: 'Opens Digital ROI conversation. CEOs under board pressure need proof points, not vision. You have them.',
  },
  {
    question: 'You\'ve described "do more with less" as a priority. Where in the business is the biggest gap between what your team is capable of and what they\'re actually spending their time on?',
    why: 'Agentforce story: "here\'s how companies like yours are reclaiming 20–30% of rep/service team time for high-value work."',
  },
  {
    question: 'When you acquired [Company X], what was your expected integration timeline vs. what actually happened — and what was the cost of that gap?',
    why: 'For M&A-active CEOs, integration speed is a known pain. Opens MuleSoft platform story. The answer always reveals more pain than the question implies.',
  },
];

const CEO_AVOID = [
  {
    text: 'Leading with product features or cloud names',
    instead: 'CEOs buy outcomes, not software. Lead with business problems and metrics: "Companies like yours are reducing cost-to-serve by 25–30% with Agentforce."',
  },
  {
    text: '"Salesforce does everything"',
    instead: 'CEOs see through platform evangelism. Name the one or two specific bets that matter most for their business right now.',
  },
  {
    text: 'Skipping discovery to give your pitch',
    instead: 'At the CEO level, asking the right questions IS the pitch. The best CEO meetings are ones where you speak 30% of the time.',
  },
  {
    text: 'Bringing an IT-level conversation',
    instead: 'CEOs think in strategic outcomes, competitive position, and investor narrative. If your deck has screenshots, you\'re in the wrong meeting.',
  },
];

const CEO_PAIN_MAP = [
  { signal: 'Competitor Growing Faster', says: '"We need to move faster"', means: 'Competitive pressure creating strategic urgency', solutions: ['Agentforce', 'Sales Cloud', 'Data Cloud'] },
  { signal: 'Board / Activist Pressure on Margins', says: '"We need to do more with less"', means: 'Operational cost structure must improve without sacrificing growth', solutions: ['Agentforce Operations', 'Agentforce', 'Einstein AI'] },
  { signal: 'Stalled Digital Transformation', says: '"We haven\'t gotten the ROI we expected"', means: 'Prior transformation spend not delivering measurable results', solutions: ['Salesforce BVS', 'Agentforce', 'Signature Success'] },
  { signal: 'M&A Integration Complexity', says: '"Integration is taking longer than expected"', means: 'Systems fragmentation destroying acquisition synergies', solutions: ['MuleSoft', 'Salesforce Platform', 'Data Cloud'] },
  { signal: 'Talent Cost / Headcount Pressure', says: '"We can\'t keep adding headcount to scale"', means: 'Labor cost growth unsustainable; automation is the answer', solutions: ['Agentforce', 'Agentforce for Sales', 'Agentforce for Service'] },
  { signal: 'Customer Experience Lagging', says: '"Our customers aren\'t as satisfied as they should be"', means: 'Service quality falling behind scale; NPS / CSAT declining', solutions: ['Service Cloud', 'Agentforce for Service', 'Einstein AI'] },
];

// ── RENDER: PERSONA PAGES ─────────────────────────────────────
function renderPersonaPage(gridId, terms, openersId, openers, avoidId, avoids, painTableId, painMap, personaKey) {
  // Terms grid
  document.getElementById(gridId).innerHTML = terms.map(term => `
    <div class="term-card cat-${term.category}" data-category="${term.category}" data-persona="${personaKey}" tabindex="0">
      <div class="term-card-header">
        <div>
          <span class="term-category-badge">${term.categoryLabel}</span>
          <div class="term-name">${term.name}</div>
        </div>
        <span class="term-abbrev">${term.abbrev}</span>
      </div>
      <p class="term-definition">${term.definition}</p>
      <div class="term-why">
        <div class="term-why-label">⚡ Why it matters for you</div>
        <div class="term-why-text">${term.why}</div>
      </div>
      <div class="term-products">
        ${term.products.map(p => `<span class="product-tag">${p}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // Openers
  document.getElementById(openersId).innerHTML = openers.map(o => `
    <div class="opener-item">
      <div class="opener-question">"${o.question}"</div>
      <div class="opener-why">↳ ${o.why}</div>
    </div>
  `).join('');

  // Avoids
  document.getElementById(avoidId).innerHTML = avoids.map(a => `
    <div class="avoid-item">
      <span class="avoid-x">✗</span>
      <div>
        <div class="avoid-text">${a.text}</div>
        <div class="avoid-instead">✓ Instead: ${a.instead}</div>
      </div>
    </div>
  `).join('');

  // Pain map table
  document.getElementById(painTableId).innerHTML = `
    <thead>
      <tr>
        <th>Pain Signal</th>
        <th>What They Say</th>
        <th>What They Mean</th>
        <th>Salesforce Solution</th>
      </tr>
    </thead>
    <tbody>
      ${painMap.map(row => `
        <tr>
          <td class="pain-signal-cell"><span class="signal-indicator"></span>${row.signal}</td>
          <td class="pain-what-they-say">${row.says}</td>
          <td class="pain-what-they-mean">${row.means}</td>
          <td><div class="pain-solutions">${row.solutions.map(s => `<span class="pain-solution-tag">${s}</span>`).join('')}</div></td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

// ── PERSONA FILTER LOGIC ──────────────────────────────────────
document.querySelectorAll('.filter-btn[data-filter-persona]').forEach(btn => {
  btn.addEventListener('click', () => {
    const persona = btn.dataset.filterPersona;
    const filter = btn.dataset.filter;
    const container = btn.closest('.category-filter');
    container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll(`.term-card[data-persona="${persona}"]`).forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
    });
  });
});

// ── INIT ─────────────────────────────────────────────────────
renderCheatSheet();
renderTenkPage();
renderPainMapper();
renderPersonaPage('sc-grid', SC_TERMS, 'sc-openers', SC_OPENERS, 'sc-avoid', SC_AVOID, 'sc-pain-table', SC_PAIN_MAP, 'sc');
renderPersonaPage('cmo-grid', CMO_TERMS, 'cmo-openers', CMO_OPENERS, 'cmo-avoid', CMO_AVOID, 'cmo-pain-table', CMO_PAIN_MAP, 'cmo');
renderPersonaPage('cio-grid', CIO_TERMS, 'cio-openers', CIO_OPENERS, 'cio-avoid', CIO_AVOID, 'cio-pain-table', CIO_PAIN_MAP, 'cio');
renderPersonaPage('ceo-grid', CEO_TERMS, 'ceo-openers', CEO_OPENERS, 'ceo-avoid', CEO_AVOID, 'ceo-pain-table', CEO_PAIN_MAP, 'ceo');
