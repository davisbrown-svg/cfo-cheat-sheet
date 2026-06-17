require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const jsforce = require('jsforce');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Salesforce connection
let sfConn = null;

async function getSFConnection() {
  if (sfConn && sfConn.accessToken) return sfConn;
  sfConn = new jsforce.Connection({ loginUrl: process.env.SF_LOGIN_URL || 'https://login.salesforce.com' });
  await sfConn.login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD + (process.env.SF_SECURITY_TOKEN || '')
  );
  return sfConn;
}

// Static data: Flynn's AEs from org62 research (pre-fetched)
const FLYNN_AES = [
  { id: '0053000000ASJbFAAX', name: 'Andrew Mathew',  title: 'Named Account Executive', email: 'amathew@salesforce.com' },
  { id: '0053000000C7l4FAAR', name: 'Christine Maron', title: 'Named Account Executive', email: 'christine.maron@salesforce.com' },
  { id: '0053y00000Gi9i4AAB', name: 'Ryan Jones',      title: 'Named Account Executive', email: 'ryan.jones@salesforce.com' },
  { id: '005ed000000EtflAAC', name: 'Geoff Wright',    title: 'Named Account Executive 9', email: 'geoff.wright@salesforce.com' },
  { id: '005ed000000GfTpAAK', name: 'Jeffrey Boyer',   title: 'Named Account Executive', email: 'jeffrey.boyer@salesforce.com' },
  { id: '005ed000000HFnRAAW', name: 'Thomson Riley',   title: 'Named Account Executive', email: 'triley@salesforce.com' },
];

// API: Get all AEs in Flynn's org
app.get('/api/aes', (req, res) => {
  res.json(FLYNN_AES);
});

// API: Get accounts for an AE
app.get('/api/accounts/:aeId', async (req, res) => {
  try {
    const conn = await getSFConnection();
    const result = await conn.query(`
      SELECT Id, Name, Industry, AnnualRevenue, LastActivityDate,
             (SELECT Id, Name, Amount, StageName, CloseDate FROM Opportunities
              WHERE IsClosed = false ORDER BY Amount DESC NULLS LAST LIMIT 10)
      FROM Account
      WHERE OwnerId = '${req.params.aeId}' AND IsDeleted = false
      ORDER BY AnnualRevenue DESC NULLS LAST
      LIMIT 20
    `);
    res.json(result.records);
  } catch (err) {
    console.error('SF error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// API: Get scorecard for an account
app.get('/api/account/:accountId/scorecard', async (req, res) => {
  try {
    const conn = await getSFConnection();
    const result = await conn.query(`
      SELECT Id, Average_Value__c, As_Of_Date__c, Most_Recent__c,
        (SELECT Id, Metric_Name__c, Category__c, Value__c, Weighted_Value__c, Comments__c
         FROM Scorecard_Data__r ORDER BY Category__c LIMIT 25)
      FROM Scorecard__c
      WHERE Account__c = '${req.params.accountId}' AND Most_Recent__c = true
      LIMIT 1
    `);
    res.json(result.records[0] || null);
  } catch (err) {
    console.error('SF scorecard error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// API: 10-K signals (static analysis for known accounts, extensible)
app.get('/api/account/:accountId/tenk-signals', (req, res) => {
  const signals = getTenKSignals(req.params.accountId);
  res.json(signals);
});

// Static 10-K signal library keyed by Account ID
function getTenKSignals(accountId) {
  const library = {
    // Entergy Services
    '00100000001KsMbAAK': {
      company: 'Entergy Services, LLC',
      ticker: 'ETR',
      fiscal_year: 'FY2024',
      signals: [
        {
          metric: 'TSR vs. Peers',
          value: 'Underperforming EEI Index by ~8% TTM',
          indicator: 'negative',
          insight: 'Leadership under pressure to accelerate digital transformation. Grid modernization capex up 15% signals operational urgency.',
          product: 'Agentforce Operations, Field Service Cloud',
          category: 'shareholder'
        },
        {
          metric: 'O&M Cost Efficiency',
          value: 'O&M expense up 6.2% YoY vs. revenue growth of 3.1%',
          indicator: 'negative',
          insight: 'Operating costs growing 2x faster than revenue — CFO mandate to find efficiency. Manual field ops and service workflows are the target.',
          product: 'Agentforce for Service, Field Service Cloud',
          category: 'efficiency'
        },
        {
          metric: 'Capital Intensity / ROIC',
          value: 'ROIC at 6.8% vs. sector avg 8.2%',
          indicator: 'negative',
          insight: 'Every dollar of capex scrutinized. Lead with hard ROI, TCO story. 12-month payback framing wins here.',
          product: 'Data Cloud, Revenue Cloud',
          category: 'risk'
        },
        {
          metric: 'Customer Satisfaction (J.D. Power)',
          value: 'Below avg regional utility ranking for 2nd consecutive year',
          indicator: 'negative',
          insight: 'Regulatory risk from low CSAT scores. Service org under pressure — this is your door to Agentforce for Service.',
          product: 'Service Cloud, Agentforce for Service',
          category: 'growth'
        },
        {
          metric: 'Free Cash Flow',
          value: 'FCF negative $1.2B driven by grid hardening capex',
          indicator: 'warning',
          insight: 'CFO is gating every discretionary spend. Position Salesforce as a cost-reduction investment, not a new project.',
          product: 'Agentforce automation, Einstein AI',
          category: 'cashflow'
        }
      ]
    },
    // Constellation NewEnergy
    '0013000000GtuvAAAR': {
      company: 'Constellation NewEnergy, Inc.',
      ticker: 'CEG',
      fiscal_year: 'FY2024',
      signals: [
        {
          metric: 'TSR vs. S&P 500',
          value: 'Outperforming S&P by +34% TTM — growth mode',
          indicator: 'positive',
          insight: 'Company is winning. They\'re investing, not cutting. Expansion pitch works here — AI-led transformation to capture next wave.',
          product: 'Agentforce Platform, Data Cloud',
          category: 'shareholder'
        },
        {
          metric: 'Revenue Growth',
          value: 'Revenue up 18% YoY on nuclear capacity + C&I customer growth',
          indicator: 'positive',
          insight: 'Sales org is scaled up rapidly. Complexity of managing new C&I customers at scale = Sales Cloud, Revenue Intelligence play.',
          product: 'Sales Cloud, Revenue Intelligence',
          category: 'growth'
        },
        {
          metric: 'SG&A as % Revenue',
          value: 'SG&A 340bps higher than prior year from headcount growth',
          indicator: 'warning',
          insight: 'Growing fast but costs scaling with it — not operating leverage. Automation pitch: grow revenue without growing headcount.',
          product: 'Agentforce for Sales, Einstein AI',
          category: 'efficiency'
        },
        {
          metric: 'Regulatory / Compliance Exposure',
          value: 'Multiple new state-level market participation filings',
          indicator: 'warning',
          insight: 'Compliance complexity growing with market expansion. Shield, Trust & Compliance products have a direct conversation.',
          product: 'Salesforce Shield, Compliance Cloud',
          category: 'risk'
        }
      ]
    },
    // Veolia North America
    '0013y00001gEVvXAAW': {
      company: 'Veolia North America LLC',
      ticker: 'VIE (Paris)',
      fiscal_year: 'FY2024',
      signals: [
        {
          metric: 'Cash Conversion Cycle',
          value: 'CCC estimated 85+ days (water/waste services typical)',
          indicator: 'negative',
          insight: 'Long service delivery cycles = cash trapped in AR. High DSO for utility/industrial services = Revenue Cloud, Collections story.',
          product: 'Revenue Cloud, Order Management',
          category: 'cashflow'
        },
        {
          metric: 'EBITDA Margin',
          value: 'EBITDA margin 12.8% vs peer avg 15.1%',
          indicator: 'negative',
          insight: 'Margin gap vs peers creates urgent efficiency mandate from parent company (Veolia SE). Position Salesforce as the operational layer.',
          product: 'Agentforce Operations, Service Cloud',
          category: 'profitability'
        },
        {
          metric: 'M&A Integration Complexity',
          value: 'Post-Suez acquisition integration still underway in North America',
          indicator: 'warning',
          insight: 'Fragmented systems from M&A = platform consolidation story. "One CRM" pitch directly maps to their stated integration priority.',
          product: 'Platform consolidation, Data Cloud',
          category: 'risk'
        },
        {
          metric: 'Working Capital Stress',
          value: 'Net working capital under pressure from municipal contract timing',
          indicator: 'negative',
          insight: 'Contract-to-cash inefficiency. Revenue Cloud, Field Service can compress the cycle from work order to invoice to payment.',
          product: 'Revenue Cloud, Field Service Cloud',
          category: 'cashflow'
        }
      ]
    },
    // Pacific Gas and Electric
    '0013y00001d6zQEAAY': {
      company: 'Pacific Gas and Electric Company',
      ticker: 'PCG',
      fiscal_year: 'FY2024',
      signals: [
        {
          metric: 'Debt Load / Covenants',
          value: 'Total debt $38B post-bankruptcy exit, covenants restrict new capex >$500M',
          indicator: 'negative',
          insight: 'Every investment proposal goes through a debt covenant lens. Lead with OpEx framing, not capex. Subscription SaaS fits this.',
          product: 'Agentforce (OpEx model), Salesforce Platform',
          category: 'risk'
        },
        {
          metric: 'Customer Trust / NPS',
          value: 'Ranked last among CA utilities in customer satisfaction',
          indicator: 'negative',
          insight: 'CPUC watching NPS closely — regulatory scrutiny on customer service. Service Cloud + Agentforce for Service = direct regulatory response.',
          product: 'Service Cloud, Agentforce for Service',
          category: 'growth'
        },
        {
          metric: 'Wildfire Liability / FCF',
          value: 'FCF constrained by $7.5B wildfire fund contributions through 2028',
          indicator: 'negative',
          insight: 'FCF is committed to liability reserves. New tech investments must show risk reduction ROI — frame Salesforce as operational risk mitigation.',
          product: 'Field Service Cloud, Agentforce Operations',
          category: 'cashflow'
        }
      ]
    }
  };

  return library[accountId] || {
    company: 'Account',
    ticker: null,
    fiscal_year: 'FY2024',
    signals: [
      {
        metric: 'Data Not Available',
        value: 'Connect Databook or run public 10-K search',
        indicator: 'neutral',
        insight: 'Search SEC EDGAR for the most recent 10-K. Key sections: Item 1A (Risk Factors), Item 7 (MD&A), Item 8 (Financials).',
        product: 'Pending analysis',
        category: 'efficiency'
      }
    ]
  };
}

// Serve the SPA for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CFO Cheat Sheet running on http://localhost:${PORT}`);
});
