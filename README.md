# 🌾 ग्रामीण सेतु AI (GraminSetu AI)
### *Next-Generation Voice-First Rural Enterprise Feasibility & Bank Loan Appraisal Engine*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.8_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](#)

---

## 📌 Executive Summary

Over **65% of rural micro-enterprise loan applications in India face rejection or prolonged delays** at the branch level due to:
1. **The DPR Gap**: Lack of structured, bank-grade Detailed Project Reports (DPR).
2. **Language & Literacy Barriers**: Complex paperwork in English with inaccessible financial jargon.
3. **Information Asymmetry**: Absence of local market validation (competitor saturation, mandi spreads, climate risk).
4. **Scheme Confusion**: Unfamiliarity with government capital subsidies like **PMEGP (up to 35%)**, **MUDRA**, or **PMFME**.

**GraminSetu AI** bridges this divide. It listens to rural entrepreneurs speaking in natural colloquial Hindi or Hinglish, extracts core business parameters, enriches them with real-time geospatial and economic indicators, executes rigorous deterministic credit mathematics, and outputs an **RBI-compliant, bank-ready Loan Appraisal Dossier** in under 60 seconds.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Rural Entrepreneur (Voice / Audio)                    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Web Speech API / Audio Stream
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Stage 1: Conversational AI                           │
│  • Gemini 3.8 Flash + Multi-tier Fallback (Gemini 3.1 Flash-Lite)           │
│  • Hindi/English Natural Language Understanding & Entity Extraction         │
│  • Captures: Business Type, Equity Capital, Village, District, Experience   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Structured Parameters
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 Stage 2: Hyper-Local Geospatial & Market Engine             │
│  • Census of India / data.gov.in : Village population, household density   │
│  • OpenStreetMap (OSM)           : Competitor density within 5km radius     │
│  • AGMARKNET Mandi Benchmarks    : Wholesale vs. retail spreads & margins   │
│  • IMD Climate Intelligence      : Seasonal flood/drought risk factors     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Validated Environmental Vectors
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│            Stage 3: Deterministic Feasibility & LoanGuard Engine            │
│  • Zero-Hallucination Feasibility Index (Demand, Competition, Infra)        │
│  • 90:10 RBI Debt-Equity Structuring & Amortization Formula                 │
│  • DSCR (Debt Service Coverage Ratio) & Risk Tiering                        │
│  • Scheme Routing (PMEGP 35% subsidy, MUDRA Kishore/Tarun, PMFME)          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Complete Loan Package
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                  Stage 4: Multi-Channel Deliverables & Audit                │
│  • Interactive Scenario Sandbox (Dynamic Margin Sliders & Live Recalcs)     │
│  • Printable Bank Appraisal Note & SWOT Matrix (PDF / Physical Print)       │
│  • Instant WhatsApp Digest for Rural Borrowers                              │
│  • End-to-End Audit Portal with Raw JSON Inspection for Credit Officers    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Key Capabilities

### 1. 🎙️ Vernacular Voice Consultation
- Speaks and understands natural colloquial Hindi and Hinglish.
- Real-time Speech-to-Text (`webkitSpeechRecognition`) and Speech Synthesis (`SpeechSynthesisUtterance`).
- Multi-turn fact gathering with conversational confirmations and smart field prompting.

### 2. 🗺️ Google Maps Enterprise Location Pinpointing & Ground Truth Data
- **Interactive Google Maps Pinpointer**: Search any rural village or district, drag the marker directly to pinpoint the planned enterprise site, or use geolocation.
- **Reverse Geocoding Proxy**: Resolves precise village, block, district, state, and pincode coordinates via `/api/maps/reverse-geocode` and `/api/maps/geocode`.
- **Rural Infrastructure Proximity Engine**: Computes distance to key operational hubs:
  - 🌾 *Nearest Agricultural Mandi (APMC)* for raw material sourcing and wholesale liquidation.
  - 🏦 *Nearest Public Sector Bank / Gramin Bank Branch* for loan disbursement and subsidy processing.
  - 🛣️ *State/National Highway Connectivity* for all-weather freight logistics.
  - ⚡ *3-Phase Grid Substation* for industrial power stability.
- **Graceful Multi-Tier Fallback**: Automatically switches to an interactive Canvas Map mode with simulated satellite and infrastructure radiuses when running in restricted environments or without an active API key.
- **Census 2011 & data.gov.in**: Village demographics, household purchasing power proxies, and road accessibility.
- **OpenStreetMap (OSM)**: 5km radius point-of-interest (POI) analysis to calculate competitor saturation.
- **AGMARKNET Real-time Mandi Spreads**: Farmgate wholesale prices vs. consumer retail rates to calculate gross profit margins.
- **India Meteorological Dept (IMD)**: Seasonal climate risk ratings (monsoon, flood, heatwave) for agricultural and perishable ventures.

### 3. 🧮 Zero-Hallucination Deterministic Math
Unlike generic LLM text generators, GraminSetu AI computes all financial figures using strict banking formulas:
- **Project Financing**: Strictly adheres to the **90% Bank Loan : 10% Promoter Margin** guideline.
- **Monthly EMI**:
  $$\text{EMI} = \frac{P \cdot r \cdot (1 + r)^n}{(1 + r)^n - 1}$$
- **Debt Service Coverage Ratio (DSCR)**:
  $$\text{DSCR} = \frac{\text{Net Operating Income}}{\text{Annual Debt Service}}$$
- **Weighted Feasibility Score (0–100)**:
  $$\text{Score} = (0.28 \cdot \text{Demand}) + (0.22 \cdot \text{Competition}) + (0.20 \cdot \text{Infrastructure}) + (0.18 \cdot \text{Supply}) - (0.08 \cdot \text{Risk})$$

### 4. 🏛️ Central & State Scheme Eligibility Engine
- **PMEGP (Prime Minister's Employment Generation Programme)**:
  - Up to **35% capital subsidy** for rural/special category applicants.
  - Generates exact subsidy entitlement and net effective loan burden.
- **PM MUDRA Yojana**:
  - Auto-categorizes into **Shishu** (<₹50k), **Kishore** (₹50k–₹5L), or **Tarun** (₹5L–₹10L) with zero collateral requirement.
- **PMFME (PM Formalisation of Micro food processing Enterprises)**:
  - 35% credit-linked capital subsidy for agro-processing and spice milling units.
- **NABARD DEDS (Dairy Entrepreneurship Development Scheme)**:
  - Back-ended capital subsidy for milch cattle procurement and clean milk production.

### 5. 🎛️ Interactive Financial Sandbox
- Live slider allowing borrowers or bank loan officers to test different equity margins (₹25,000 to ₹5,00,000).
- Instant, non-blocking recalculations of Project Cost, Term Loan, Monthly EMI, and Subsidy amounts.

### 6. 📄 Official Bank Appraisal Note & Printable Dossier
- Complete letterhead-ready document formatted for direct submission to District Lead Bank / NABARD officers.
- Comprehensive **SWOT Analysis** (Strengths, Weaknesses, Opportunities, Threats).
- Step-by-step **30-60-90 Day Execution Milestones**.
- Direct browser print styling (`print:hidden` controls, high-contrast monochrome PDF layout).

### 7. 🔍 SIH Credit Officer & Judge Audit Dashboard
- Full transparency across all 5 verification stages:
  1. Voice Transcript & Dialog History
  2. Entity Extraction Log
  3. External Government & Geospatial Feeds
  4. Mathematical Calculation Proof
  5. Final Dispatched Artifacts
- **One-Click JSON Audit Export**: Complete telemetry for integration with Core Banking Systems (CBS).

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend UI** | React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts |
| **Geospatial & Maps** | Google Maps Platform, `@vis.gl/react-google-maps`, AdvancedMarker, Geocoding API |
| **Animation & Motion** | Motion (`motion/react`) |
| **Backend API** | Node.js, Express 4.21, `tsx` (runtime TypeScript) |
| **Artificial Intelligence** | `@google/genai` (Gemini 3.8 Flash, Gemini 3.1 Flash-Lite fallback) |
| **Data Visualization** | Custom SVG radial gauges, interactive Recharts cash-flow charts |
| **Compilation & Bundle** | Vite 6, esbuild (CommonJS target bundle) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **bun**
- **Gemini API Key**: Obtainable from [Google AI Studio](https://aistudio.google.com/)
- *(Optional)* **Google Maps API Key**: For live satellite tiles and real-time geocoding (built-in interactive fallback mode included)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-repo/graminsetu-ai.git
cd graminsetu-ai
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_MAPS_API_KEY=your_maps_key_optional
PORT=3000
```

*(If no API key is provided, the application runs on built-in deterministic trade intelligence and verified rural benchmarks without crashing).*

### 3. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📱 Supported Rural Enterprise Verticals

| Vertical | Benchmark Margin | Key Local Datasets Evaluated | Typical Matched Scheme |
| :--- | :--- | :--- | :--- |
| **Dairy Farming (दुग्ध उत्पादन)** | 35% – 42% | Chilled milk centers, cattle fodder mandis, veterinary centers | PMEGP / NABARD DEDS |
| **Kirana / Retail (किराना दुकान)** | 18% – 25% | Household density, village connectivity, digital payment penetration | PM MUDRA (Kishore) |
| **Tailoring & Boutique (सिलाई केंद्र)** | 30% – 38% | Local schools, SHG clusters, 3-phase electricity availability | Stand-Up India / PMEGP |
| **Mobile & Solar Repair (रिपेयर सेंटर)** | 45% – 55% | Telecom signal coverage, nearby town distance, spare-parts access | PM MUDRA (Shishu/Kishore) |
| **Food Processing & Flour Mill (खाद्य प्रसंस्करण)** | 28% – 36% | Farmgate grain prices, FSSAI compliance, AGMARKNET crop yields | PMFME / PMEGP |

---

## 📋 API Reference

### `POST /api/voice/chat`
Handles natural voice conversations, entity extraction, and missing-field dialog.
```json
// Request
{
  "transcript": "मुझे बाराबंकी में 1 लाख रुपये से डेयरी का काम शुरू करना है",
  "currentFacts": {}
}

// Response
{
  "replyText": "बहुत बढ़िया! ₹1,00,000 की पूंजी से बाराबंकी में डेयरी का काम बहुत अच्छा रहेगा। क्या आपके पास पहले से गाय या भैंस पालने का अनुभव है?",
  "extracted": {
    "business": "dairy",
    "marginCapital": 100000,
    "district": "Barabanki"
  },
  "isComplete": false,
  "missingFields": ["experienceYears", "village"]
}
```

### `POST /api/dossier/generate`
Generates the comprehensive appraisal dossier, SWOT matrix, and loan parameters.
```json
// Request: { applicant, localData, feasibility, finance, schemes }
// Response: Returns complete BusinessDossier object with DSCR, SWOT, and WhatsApp digest.
```

### `GET /api/maps/reverse-geocode?lat={latitude}&lng={longitude}`
Reverse geocodes latitude and longitude coordinates into administrative village, block, district, state, and formatted postal address with rural regional fallback.

### `GET /api/maps/geocode?address={query}`
Geocodes rural addresses, village names, and APMC markets into geographic latitude and longitude coordinates.

### `GET /api/health`
Health check endpoint returning system status and timestamp.

---

## 🏅 Smart India Hackathon (SIH) Evaluation Mapping

| SIH Evaluation Criteria | How GraminSetu AI Solves It |
| :--- | :--- |
| **Ground-Level Practicality** | Directly targets rural borrowers with low literacy through colloquial voice interviews. |
| **Zero-Hallucination Banking** | Decouples creative LLM text from financial math; all EMI, DSCR, and scores are computed deterministically. |
| **Multi-Source Data Fusion** | Synthesizes Census 2011, OpenStreetMap POIs, AGMARKNET mandis, and IMD climate risks. |
| **Institutional Readiness** | Generates an official, printable Bank Credit Appraisal Note with DSCR and risk-tier certifications. |
| **Affirmative Scheme Routing** | Automatically calculates capital subsidies (up to 35%) under PMEGP and MUDRA to minimize credit risk. |

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
Built with ❤️ for rural entrepreneurs and financial inclusion across India.
