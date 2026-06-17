# CFO Cheat Sheet — MAE ENTR

Financial literacy dashboard for Account Executives in Mark Flynn's MAE ENTR org at Salesforce.

## Quick Start (no backend needed)

The app ships with all content and org62 data pre-loaded. Just open the HTML file:

```bash
cd cfo-cheat-sheet
open public/index.html
```

Or serve it locally:

```bash
npm install
npm start
# → http://localhost:3000
```

## With Live org62 Integration

Copy `.env.example` to `.env` and fill in your Salesforce credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `SF_LOGIN_URL` | `https://login.salesforce.com` |
| `SF_CLIENT_ID` | Connected App consumer key |
| `SF_CLIENT_SECRET` | Connected App consumer secret |
| `SF_USERNAME` | Your org62 username |
| `SF_PASSWORD` | Your org62 password |
| `SF_SECURITY_TOKEN` | Your security token (append to password if required) |

## What's Inside

| Page | Content |
|---|---|
| **Cheat Sheet** | 20 CFO financial terms with plain-English definitions and direct sales implications. Filterable by category. |
| **10-K Guide** | How to read an annual report as a seller — section by section, with "seller's lens" callouts and 10 signals to hunt in every filing. |
| **Account Intel** | Live account cards for all AEs in Flynn's MAE ENTR org. Click any account to see open pipeline, 10-K financial signal analysis, and scorecard metrics. |
| **Pain Mapper** | CFO pressure signal → what they say → what they mean → which Salesforce product. Plus conversation starters for every pressure type. |

## Accounts Covered with 10-K Analysis

- **Entergy Services** (ETR) — TSR pressure, O&M inefficiency, FCF constraint
- **Constellation NewEnergy** (CEG) — Growth mode, SG&A scaling, compliance complexity  
- **Veolia North America** (VIE) — CCC, EBITDA gap vs peers, M&A integration, working capital
- **Pacific Gas & Electric** (PCG) — Debt covenants, customer NPS risk, FCF constraint
- **Clean Harbors** (CLH) — Revenue growth, labor cost pressure, capex intensity
- **RWE Clean Energy** (RWE) — Renewables build-out, supply chain complexity, SG&A growth

## Stack

- Frontend: Vanilla HTML/CSS/JS (no build step, works offline)
- Backend: Node.js + Express (optional, for live org62 queries)
- Data: Pre-loaded from org62 + Slack research (June 2026)
