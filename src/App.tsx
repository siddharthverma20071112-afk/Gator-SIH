import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VoiceCallSimulator } from './components/VoiceCallSimulator';
import { FeasibilityMeter } from './components/FeasibilityMeter';
import { FinanceCalculator } from './components/FinanceCalculator';
import { SchemeCard } from './components/SchemeCard';
import { WhatsAppSimulator } from './components/WhatsAppSimulator';
import { AdminAuditDashboard } from './components/AdminAuditDashboard';
import { DossierModal } from './components/DossierModal';
import { EnterpriseLocationMap } from './components/EnterpriseLocationMap';
import { SAMPLE_PRESETS } from './data/samplePresets';
import { 
  ExtractedFacts, 
  LocalDataEngineResult, 
  FeasibilityScores, 
  FinancialPlan, 
  EligibleScheme, 
  BusinessDossier,
  ChatMessage 
} from './types';
import { 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  MapPin,
  BarChart3, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  CheckCircle,
  Building2,
  RefreshCw
} from 'lucide-react';

import { Locale } from './components/Navbar';

export default function App() {
  const [locale, setLocale] = useState<Locale>('hi');
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'call' | 'map' | 'feasibility' | 'finance' | 'whatsapp' | 'admin' | 'dossier'>('call');

  // Core Pipeline State initialized with default Barabanki Dairy preset
  const defaultPreset = SAMPLE_PRESETS[0];
  const [currentFacts, setCurrentFacts] = useState<ExtractedFacts>(defaultPreset.facts);
  const [isProcessingPipeline, setIsProcessingPipeline] = useState<boolean>(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState<boolean>(false);
  const [savedDossiers, setSavedDossiers] = useState<BusinessDossier[]>([]);

  // Initial State Data Models
  const [localData, setLocalData] = useState<LocalDataEngineResult>({
    village: 'Haidergarh',
    block: 'Haidergarh',
    district: 'Barabanki',
    state: 'Uttar Pradesh',
    population: 21500,
    households: 4130,
    competitorsCount: 3,
    competitorsList: [
      'Barabanki Cooperative Chilling Center (3.8 km)',
      'Shree Shyam Milk Collection Booth (1.2 km)',
      'Local Dudhiya aggregator route'
    ],
    marketDistanceKm: 6,
    roadAccess: true,
    electricityHoursPerDay: 19,
    mandiPriceBenchmark: {
      item: 'Fresh Buffalo & Cow Milk',
      wholesaleRate: '₹40 - ₹44 / Liter',
      retailRate: '₹64 - ₹68 / Liter',
      marginPercent: 37
    },
    weatherAndClimate: {
      seasonalRisk: 'Medium',
      description: 'Moderate seasonal rainfall; optimal for agro-allied supply chains.',
      monsoonStatus: 'Normal forecast (IMD Agro-met Bulletin)'
    },
    dataSourceNotes: {
      census: 'Census of India & data.gov.in (GP: Haidergarh, Population: 21,500)',
      osm: 'OpenStreetMap Point-of-Interest query (Radius 5km, 3 entities detected)',
      agmarknet: 'AGMARKNET Daily Mandi Wholesale Price Bulletin (Barabanki APMC)',
      imd: 'India Meteorological Department District Agro-advisory bulletin'
    }
  });

  const [feasibility, setFeasibility] = useState<FeasibilityScores>({
    demandScore: 82,
    competitionScore: 68,
    supplyScore: 78,
    infrastructureScore: 76,
    riskPenaltyScore: 36,
    overallScore: 76,
    category: 'Moderate',
    categoryHi: 'संतोषजनक व्यवहार्यता',
    confidencePercent: 78,
    keyDrivers: [
      'मजबूत ग्रामीण उपभोक्ता आधार (~21,500 निवासी)',
      'मंडी मूल्य और खुदरा दरों में 37% का आकर्षक मार्जिन',
      'पक्की सड़क एवं सुगम माल ढुलाई पहुंच'
    ],
    keyBottlenecks: [
      'कच्चे माल की मौसमी कीमत में उतार-चढ़ाव',
      'स्थानीय प्रतिस्पर्धियों से मूल्य प्रतियोगिता'
    ]
  });

  const [finance, setFinance] = useState<FinancialPlan>({
    marginCapital: 100000,
    projectCost: 1000000,
    loanAmount: 900000,
    debtEquityRatio: '90:10',
    interestRateAnnual: 9.5,
    tenureMonths: 60,
    moratoriumMonths: 6,
    monthlyEmi: 18910,
    estimatedMonthlyRevenue: 150000,
    estimatedMonthlyOpex: 102000,
    estimatedMonthlyNetProfit: 29090,
    dscrRatio: 2.54,
    breakEvenMonths: 8,
    defaultRiskLevel: 'Low',
    defaultRiskScore: 18,
    costBreakdown: [
      { category: 'Milch Animals (Cattle)', amount: 600000, description: 'Purchase of 6-8 high-yield Murrah Buffaloes / HF Cows' },
      { category: 'Cattle Shed & Flooring', amount: 200000, description: 'Ventilated concrete shed, mangers, and water troughs' },
      { category: 'Chaff Cutter & Equipment', amount: 100000, description: 'Electric chaff cutter, milking cans & testing kit' },
      { category: 'Working Capital & Feed', amount: 100000, description: 'Initial 2-month cattle feed, medicines & insurance' }
    ],
    monthlyCashFlow: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      revenue: 110000 + i * 5000,
      opex: 75000 + i * 2500,
      emi: i < 6 ? 0 : 18910,
      netProfit: (110000 + i * 5000) - (75000 + i * 2500) - (i < 6 ? 0 : 18910),
      cumulativeCash: 30000 + i * 20000
    }))
  });

  const [schemes, setSchemes] = useState<EligibleScheme[]>([
    {
      id: 'pmegp-term-loan',
      name: 'PMEGP (Prime Minister Employment Generation Programme)',
      nameHi: 'प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)',
      agency: 'KVIC / DIC / MSME',
      type: 'Term Loan',
      subsidyPercentage: 35,
      subsidyAmount: 350000,
      effectiveLoanAmount: 550000,
      interestRate: '9.0% - 10.5% p.a.',
      maxTenureYears: 5,
      collateralRequirement: 'Nil (Covered under CGTMSE guarantee scheme)',
      eligibilityDescription: 'High subsidy flag: 35% capital subsidy for rural area applicants.',
      requiredDocuments: [
        'Detailed Project Report (DPR) / Feasibility Note',
        'Aadhaar Card & PAN Card',
        'Caste/Category certificate (for 35% subsidy)',
        'Education / Skill certificate',
        'Land possession / Lease agreement / Gram Pradhan NOC',
        'Machinery supplier quotations'
      ]
    },
    {
      id: 'nabard-deds',
      name: 'NABARD Dairy Entrepreneurship Scheme / AHIDF',
      nameHi: 'नाबार्ड डेयरी उद्यमिता विकास योजना',
      agency: 'NABARD & Dept of Animal Husbandry',
      type: 'Term Loan',
      subsidyPercentage: 25,
      subsidyAmount: 250000,
      effectiveLoanAmount: 650000,
      interestRate: '3% Interest Subvention (Net ~6.5% - 7.5%)',
      maxTenureYears: 7,
      collateralRequirement: 'Hypothecation of cattle + Shed charge',
      eligibilityDescription: 'Financing for 2 to 10 milch cattle with interest subvention rebate.',
      requiredDocuments: [
        'Veterinary Health fitness certificate of cattle',
        'Land possession certificate / Shed layout map',
        'Aadhaar & Bank statements',
        'Milk cooperative membership book'
      ]
    }
  ]);

  const [dossier, setDossier] = useState<BusinessDossier>({
    id: `dossier-init-101`,
    timestamp: new Date().toISOString(),
    applicant: defaultPreset.facts,
    localData,
    feasibility,
    finance,
    schemes,
    swotAnalysis: {
      strengths: [
        'पर्याप्त स्वयं की पूंजी (मार्जिन): ₹1,00,000',
        'स्थानीय बाजार में दैनिक दूध मांग और 37% का स्वस्थ सकल मार्जिन',
        'पक्की सड़क संपर्क और 19 घंटे विद्युत आपूर्ति'
      ],
      weaknesses: [
        'सीमित कार्यशील पूंजी बफर; पहले 3 महीनों में नकदी प्रवाह पर सख्त निगरानी जरूरी',
        'कच्चे माल व चारे के परिवहन हेतु स्थानीय बिचौलियों पर निर्भरता'
      ],
      opportunities: [
        'सरकारी योजना (PMEGP / NABARD) के तहत 35% अनुदान और क्रेडिट गारंटी का लाभ',
        'आस-पास के 3 गांवों में मांग विस्तार और सीधे दुग्ध संघ से अनुबंध'
      ],
      threats: [
        'मौसम एवं बेमौसम बीमारी से संबंधित पशु स्वास्थ्य जोखिम',
        'गर्मी में चारे की कीमतों में अप्रत्याशित वृद्धि'
      ]
    },
    strategicRisks: [
      {
        risk: 'Feed / Raw Material Availability & Price Spikes',
        mitigation: 'स्थानीय किसान उत्पादक संगठन (FPO) के साथ 3 महीने का अग्रिम आपूर्ति अनुबंध करें।',
        severity: 'Medium'
      },
      {
        risk: 'Working Capital Drying during Initial Gestation',
        mitigation: 'प्रथम 6 माह के अधिस्थगन (Moratorium) का लाभ लें और आकस्मिक लिक्विडिटी सुरक्षित रखें।',
        severity: 'High'
      }
    ],
    actionPlan30_60_90: {
      day30: [
        'उद्यम आधार (Udyam Registration) एवं ग्राम पंचायत अनापत्ति (NOC) प्राप्त करें',
        'चयनित पशु आपूर्तिकर्ताओं से पक्के कोटेशन प्राप्त कर बैंक शाखा प्रबंधक से संपर्क करें',
        'PMEGP पोर्टल पर 35% अनुदान हेतु ऑनलाइन आवेदन दर्ज करें'
      ],
      day60: [
        'बैंक ऋण स्वीकृति उपरांत शेड की विद्युत फिटिंग और उपकरण संस्थापन पूर्ण करें',
        'पशु आहार की 45 दिवसीय अग्रिम खेप का भंडारण करें',
        'स्थानीय ग्राम दुग्ध संघ में पंजीकरण पूर्ण करें'
      ],
      day90: [
        'नियमित दुग्ध उत्पादन व दैनिक बिक्री बहीखाते का डिजिटाइजेशन शुरू करें',
        'मासिक ईएमआई (EMI) का ऑटो-डेबिट खाता सुचारू रखें',
        'दूसरे चरण के विस्तार हेतु 1 अतिरिक्त सहायक को रोजगार दें'
      ]
    },
    whatsAppMessage: `📊 *ग्रामीण सेतु AI - व्यवसाय एवं ऋण व्यवहार्यता रिपोर्ट*
━━━━━━━━━━━━━━━━━━━━
🏢 *व्यवसाय (Business):* DAIRY
📍 *स्थान (Location):* Haidergarh, Barabanki
━━━━━━━━━━━━━━━━━━━━
📈 *व्यवहार्यता स्कोर (Feasibility):* 76 / 100 (Moderate)
🎯 *आकलन विश्वास (Confidence):* 78%
━━━━━━━━━━━━━━━━━━━━
💰 *कुल परियोजना लागत (Project Cost):* ₹10.00 लाख
💳 *अनुशंसित ऋण (Recommended Loan):* ₹9.00 लाख
💵 *मासिक ईएमआई (EMI):* ₹18,910/माह
🏛️ *पात्र योजना (Eligible Scheme):* PMEGP (35% Subsidy)
🎁 *अनुदान (Subsidy):* ₹3.50 लाख (35%)
━━━━━━━━━━━━━━━━━━━━
⚠️ *प्रमुख जोखिम (Identified Risks):*
1. Feed availability & seasonal price spikes
2. Initial milk yield gestation

✅ *अनुशंसित तुरंत कदम (Recommended Actions):*
1. FPO के साथ 3 माह का अग्रिम पशु आहार अनुबंध करें
2. ग्राम स्तर पर अग्रिम दुग्ध ग्राहक एवं संघ से संपर्क बनाएं
3. आवश्यक दस्तावेजों के साथ PMEGP योजना में आवेदन करें

📄 *पूर्ण बैंक फाइल एवं विश्लेषण डाउनलोड करें:*
https://graminsetu.gov.in/dossier/101
━━━━━━━━━━━━━━━━━━━━
_सशक्त गांव, समृद्ध भारत | Smart India Hackathon_`,
    bankLoanAppraisalSummary: 'The project for establishment of Dairy by applicant Rameshwar Yadav at Haidergarh, Barabanki has been evaluated using GraminSetu Multi-Factor Feasibility Engine. With a DSCR of 2.54x and 76/100 feasibility index under 90:10 debt-equity, the proposal represents a bankable micro-credit proposition under PMEGP.'
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'user',
      text: defaultPreset.voiceScriptHi,
      timestamp: '11:42 AM'
    },
    {
      id: 'init-2',
      sender: 'ai',
      text: 'बहुत बढ़िया! आपकी सारी जानकारी दर्ज हो चुकी है। अब हमारा डाटा और फिजिबिलिटी इंजन आपके क्षेत्र के आंकड़े जुटाकर रिपोर्ट तैयार कर रहा है। बस 5 सेकंड रुकिए, आपकी रिपोर्ट स्क्रीन और व्हाट्सएप पर आ रही है।',
      timestamp: '11:43 AM'
    }
  ]);

  // Execute full automated pipeline
  const runFullPipeline = async (facts: ExtractedFacts) => {
    setIsProcessingPipeline(true);
    try {
      const bType = facts.business || 'dairy';
      const margin = facts.marginCapital || 100000;

      // 1. Module 2: Data Engine Fetch
      const dataRes = await fetch('/api/data-engine/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          village: facts.village || 'Haidergarh',
          block: facts.block || 'Haidergarh',
          district: facts.district || 'Barabanki',
          state: facts.state || 'Uttar Pradesh',
          businessType: bType,
          latitude: facts.latitude,
          longitude: facts.longitude,
          formattedAddress: facts.formattedAddress
        })
      });
      const localDataFetched: LocalDataEngineResult = await dataRes.json();
      setLocalData(localDataFetched);

      // 2. Module 3: Feasibility Engine Calculation
      const feasRes = await fetch('/api/feasibility/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          localData: localDataFetched,
          businessType: bType,
          experienceYears: facts.experienceYears ?? 3,
          hasLandOrShop: facts.hasLandOrShop ?? true
        })
      });
      const feasibilityCalculated: FeasibilityScores = await feasRes.json();
      setFeasibility(feasibilityCalculated);

      // 3. Module 4: Finance Engine Calculation
      const finRes = await fetch('/api/finance/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marginCapital: margin,
          businessType: bType,
          feasibilityScore: feasibilityCalculated.overallScore
        })
      });
      const financeCalculated: FinancialPlan = await finRes.json();
      setFinance(financeCalculated);

      // 4. Module 5: Scheme Router
      const schemeRes = await fetch('/api/schemes/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectCost: financeCalculated.projectCost,
          businessType: bType,
          isRural: true
        })
      });
      const schemesRouted: EligibleScheme[] = await schemeRes.json();
      setSchemes(schemesRouted);

      // 5. Final Dossier & WhatsApp Generator
      const dosRes = await fetch('/api/dossier/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicant: facts,
          localData: localDataFetched,
          feasibility: feasibilityCalculated,
          finance: financeCalculated,
          schemes: schemesRouted,
          locale
        })
      });
      const compiledDossier: BusinessDossier = await dosRes.json();
      setDossier(compiledDossier);

      // Save to audit history
      setSavedDossiers((prev) => [compiledDossier, ...prev.slice(0, 9)]);

      setIsProcessingPipeline(false);
    } catch {
      setIsProcessingPipeline(false);
    }
  };

  // Preset switch
  const handleSelectPreset = (presetId: string) => {
    const preset = SAMPLE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setCurrentFacts(preset.facts);
    setChatHistory([
      {
        id: `chat-${Date.now()}-1`,
        sender: 'user',
        text: preset.voiceScriptHi,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: `chat-${Date.now()}-2`,
        sender: 'ai',
        text: `नमस्ते ${preset.facts.applicantName || 'भैया'}! आपका ${preset.title} का प्रस्ताव दर्ज कर लिया गया है। चलिए आपके क्षेत्र का डाटा और ऋण व्यवहार्यता की गणना करते हैं।`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    runFullPipeline(preset.facts);
  };

  // Dynamic recalculation when margin slider moves
  const handleMarginChange = async (newMargin: number) => {
    try {
      const bType = currentFacts.business || 'dairy';
      const finRes = await fetch('/api/finance/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marginCapital: newMargin,
          businessType: bType,
          feasibilityScore: feasibility.overallScore
        })
      });
      const newPlan: FinancialPlan = await finRes.json();
      setFinance(newPlan);

      // Recalculate scheme eligibility with new project cost
      const schemeRes = await fetch('/api/schemes/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectCost: newPlan.projectCost,
          businessType: bType,
          isRural: true
        })
      });
      const newSchemes: EligibleScheme[] = await schemeRes.json();
      setSchemes(newSchemes);

      // Update current facts
      setCurrentFacts((prev) => ({ ...prev, marginCapital: newMargin }));
    } catch {
      // Graceful fallback on recalculation
    }
  };

  // Handler when user selects or pinpoints a location on Google Maps
  const handleLocationSelect = async (loc: {
    village: string;
    block: string;
    district: string;
    state: string;
    latitude: number;
    longitude: number;
    formattedAddress: string;
  }) => {
    const updatedFacts: ExtractedFacts = {
      ...currentFacts,
      village: loc.village,
      block: loc.block,
      district: loc.district,
      state: loc.state,
      latitude: loc.latitude,
      longitude: loc.longitude,
      formattedAddress: loc.formattedAddress
    };
    setCurrentFacts(updatedFacts);
    await runFullPipeline(updatedFacts);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Top Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectPreset={handleSelectPreset}
        isEvaluating={isProcessingPipeline}
        locale={locale}
        setLocale={setLocale}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Quick SIH Vision Flow Tracker */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="font-semibold text-slate-800 flex items-center gap-2 font-['Space_Grotesk'] text-xs whitespace-nowrap">
              <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200/60 text-slate-700">📞 Villager Calls</span>
              <span className="text-slate-300">→</span>
              <span className="px-2 py-0.5 bg-indigo-50 rounded-md border border-indigo-200/60 text-indigo-700">🤖 Voice AI</span>
              <span className="text-slate-300">→</span>
              <button
                onClick={() => setActiveTab('map')}
                className="px-2 py-0.5 bg-sky-50 hover:bg-sky-100 rounded-md border border-sky-200/60 text-sky-700 font-semibold cursor-pointer transition-colors"
                title="Google Maps Enterprise Pinpointer"
              >
                🗺️ Location Map
              </button>
              <span className="text-slate-300">→</span>
              <span className="px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/60 text-slate-700">📊 Local Data</span>
              <span className="text-slate-300">→</span>
              <span className="px-2 py-0.5 bg-violet-50 rounded-md border border-violet-200/60 text-violet-700">⚖️ Feasibility</span>
              <span className="text-slate-300">→</span>
              <span className="px-2 py-0.5 bg-amber-50 rounded-md border border-amber-200/60 text-amber-700">💰 Loan Appraisal</span>
              <span className="text-slate-300">→</span>
              <span className="px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-200/60 text-emerald-700 font-bold">📱 WhatsApp Report</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => runFullPipeline(currentFacts)}
              disabled={isProcessingPipeline}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessingPipeline ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Computing Engine...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Recalculate All Engines</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsDossierModalOpen(true)}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-200/80 shadow-2xs transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Full Appraisal Note</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Voice AI Call Agent Simulator */}
        {activeTab === 'call' && (
          <div className="space-y-6">
            <VoiceCallSimulator
              currentFacts={currentFacts}
              setCurrentFacts={setCurrentFacts}
              onPipelineTrigger={runFullPipeline}
              isProcessingPipeline={isProcessingPipeline}
              onViewReport={() => setActiveTab('whatsapp')}
              onOpenMap={() => setActiveTab('map')}
              locale={locale}
            />

            {/* Quick preview of Feasibility and WhatsApp under the call */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  <span>Computed Feasibility & Credit Output</span>
                </h3>
                <button
                  onClick={() => setActiveTab('feasibility')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Full Engine Deep-Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <FeasibilityMeter
                feasibility={feasibility}
                localData={localData}
                businessType={currentFacts.business || 'dairy'}
                onOpenMap={() => setActiveTab('map')}
              />
            </div>
          </div>
        )}

        {/* TAB 2: Google Maps Location Pinpointer */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <EnterpriseLocationMap
              currentFacts={currentFacts}
              localData={localData}
              onLocationSelect={handleLocationSelect}
              onNavigateToTab={setActiveTab}
            />
          </div>
        )}

        {/* TAB 3: Feasibility & Finance Engine */}
        {activeTab === 'feasibility' && (
          <div className="space-y-6">
            <FeasibilityMeter
              feasibility={feasibility}
              localData={localData}
              businessType={currentFacts.business || 'dairy'}
              onOpenMap={() => setActiveTab('map')}
            />

            <FinanceCalculator
              finance={finance}
              businessType={currentFacts.business || 'dairy'}
              onMarginChange={handleMarginChange}
            />

            <SchemeCard
              schemes={schemes}
              projectCost={finance.projectCost}
            />
          </div>
        )}

        {/* TAB 3: Finance Engine only */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <FinanceCalculator
              finance={finance}
              businessType={currentFacts.business || 'dairy'}
              onMarginChange={handleMarginChange}
            />

            <SchemeCard
              schemes={schemes}
              projectCost={finance.projectCost}
            />
          </div>
        )}

        {/* TAB 4: WhatsApp Report Simulator */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6">
            <WhatsAppSimulator
              dossier={dossier}
              onOpenDossier={() => setIsDossierModalOpen(true)}
            />

            <SchemeCard
              schemes={schemes}
              projectCost={finance.projectCost}
            />
          </div>
        )}

        {/* TAB 5: SIH Admin & Evaluator Audit Dashboard */}
        {activeTab === 'admin' && (
          <AdminAuditDashboard
            dossier={dossier}
            chatHistory={chatHistory}
            savedDossiers={savedDossiers}
          />
        )}

        {/* TAB 6: Bank Dossier View */}
        {activeTab === 'dossier' && (
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Official Bank Appraisal Dossier</h3>
                <p className="text-xs text-slate-500">Standard appraisal note ready for bank branch manager review and credit audit</p>
              </div>
              <button
                onClick={() => setIsDossierModalOpen(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Open Printable Dossier</span>
              </button>
            </div>

            <div className="border border-slate-200/80 rounded-xl p-5 bg-slate-50/70 font-mono text-xs space-y-4">
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-600">Dossier ID: <strong className="text-slate-900">{dossier.id}</strong></span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">STATUS: RECOMMENDED</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-slate-700">
                <div><span className="text-slate-400 block text-[11px]">Applicant:</span> <strong className="text-slate-900">{dossier.applicant.applicantName || 'Rural Entrepreneur'}</strong></div>
                <div><span className="text-slate-400 block text-[11px]">Business:</span> <strong className="text-slate-900">{dossier.applicant.business?.toUpperCase()}</strong></div>
                <div><span className="text-slate-400 block text-[11px]">Location:</span> <strong className="text-slate-900">{dossier.localData.village}, {dossier.localData.district}</strong></div>
                <div><span className="text-slate-400 block text-[11px]">Project Cost:</span> <strong className="text-slate-900">₹{(dossier.finance.projectCost / 100000).toFixed(2)} Lakh</strong></div>
                <div><span className="text-slate-400 block text-[11px]">Loan Amount:</span> <strong className="text-slate-900">₹{(dossier.finance.loanAmount / 100000).toFixed(2)} Lakh</strong></div>
                <div><span className="text-slate-400 block text-[11px]">Monthly EMI:</span> <strong className="text-slate-900">₹{dossier.finance.monthlyEmi.toLocaleString('en-IN')}</strong></div>
              </div>
              <p className="italic text-slate-600 border-t border-slate-200 pt-3 font-sans leading-relaxed">
                "{dossier.bankLoanAppraisalSummary}"
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-900" />
            <span className="font-bold text-slate-800">ग्रामीण सेतु AI</span>
            <span className="text-slate-400">• SIH Rural Enterprise & Micro-Credit Decision Support System</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Gemini 3.8 Flash</span>
            <span>•</span>
            <span>Census of India</span>
            <span>•</span>
            <span>OpenStreetMap</span>
            <span>•</span>
            <span>AGMARKNET Mandi</span>
          </div>
        </div>
      </footer>

      {/* Fullscreen Bank Loan Appraisal Dossier Modal */}
      <DossierModal
        dossier={dossier}
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
      />
    </div>
  );
}
