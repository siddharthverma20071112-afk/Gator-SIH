import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Users, 
  Store, 
  Truck, 
  CloudSun, 
  Zap, 
  Info,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { FeasibilityScores, LocalDataEngineResult, BusinessType } from '../types';

interface FeasibilityMeterProps {
  feasibility: FeasibilityScores;
  localData: LocalDataEngineResult;
  businessType: BusinessType;
  onOpenMap?: () => void;
}

export const FeasibilityMeter: React.FC<FeasibilityMeterProps> = ({
  feasibility,
  localData,
  businessType,
  onOpenMap
}) => {
  const scoreData = [
    { name: 'Demand (मांग)', score: feasibility.demandScore, weight: '28%', color: '#10B981', desc: 'उपभोक्ता संख्या व क्रय शक्ति' },
    { name: 'Competition (प्रतिस्पर्धा)', score: feasibility.competitionScore, weight: '22%', color: '#3B82F6', desc: 'बाजार संतृप्ति व प्रतिस्पर्धी दूरी' },
    { name: 'Supply (कच्चा माल)', score: feasibility.supplyScore, weight: '20%', color: '#F59E0B', desc: 'मंडी भाव व आपूर्तिकर्ता मार्जिन' },
    { name: 'Infrastructure (सुविधा)', score: feasibility.infrastructureScore, weight: '20%', color: '#8B5CF6', desc: 'पक्की सड़क एवं 18+ घंटे बिजली' },
    { name: 'Risk (जोखिम पेनल्टी)', score: feasibility.riskPenaltyScore, weight: '-8%', color: '#EF4444', desc: 'मौसम व मांग में अस्थिरता' }
  ];

  const getCategoryColor = (cat: FeasibilityScores['category']) => {
    switch (cat) {
      case 'Strong':
        return 'text-emerald-700 bg-emerald-50 border-emerald-300';
      case 'Moderate':
        return 'text-indigo-700 bg-indigo-50 border-indigo-300';
      case 'Weak':
        return 'text-amber-700 bg-amber-50 border-amber-300';
      case 'Poor':
      default:
        return 'text-rose-700 bg-rose-50 border-rose-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Module 2 + Module 3 Synthesis Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-2 py-0.5 rounded-md">
                Module 3: Feasibility Engine
              </span>
              <span className="text-xs text-slate-400">• Ground Truth Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              समग्र व्यवसाय व्यवहार्यता सूचकांक (Feasibility Index)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Deterministic scoring based on localized census demographics, competitor saturation, mandi prices, and infrastructure.
            </p>
          </div>

          {/* Primary Big Score Badge */}
          <div className="flex items-center gap-4 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="relative flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke={
                    feasibility.overallScore >= 80
                      ? '#10B981'
                      : feasibility.overallScore >= 60
                      ? '#6366F1'
                      : feasibility.overallScore >= 40
                      ? '#F59E0B'
                      : '#EF4444'
                  }
                  strokeWidth="8"
                  strokeDasharray={213}
                  strokeDashoffset={213 - (213 * feasibility.overallScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-extrabold text-slate-900 font-['Space_Grotesk']">{feasibility.overallScore}</span>
                <span className="text-[10px] text-slate-400 font-medium">/ 100</span>
              </div>
            </div>

            <div>
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg border ${getCategoryColor(feasibility.category)}`}>
                {feasibility.category} ({feasibility.categoryHi})
              </span>
              <p className="text-xs text-slate-500 mt-1.5">
                मॉडल विश्वास (Confidence): <strong className="text-slate-900">{feasibility.confidencePercent}%</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Benchmark: 80+ Strong | 60-80 Moderate
              </p>
            </div>
          </div>
        </div>

        {/* Mathematical Formula Transparency Callout */}
        <div className="mt-4 bg-slate-900 text-slate-200 rounded-xl p-3.5 text-xs font-mono flex flex-wrap items-center justify-between gap-2 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 font-bold">Algorithm:</span>
            <span className="text-slate-300">Overall Feasibility = (Demand × 0.28) + (Competition × 0.22) + (Supply × 0.20) + (Infra × 0.20) - (Risk × 0.08)</span>
          </div>
          <span className="text-[10px] bg-slate-800 text-indigo-300 border border-slate-700 px-2 py-0.5 rounded">
            Deterministic Math Engine (Zero Hallucination)
          </span>
        </div>

        {/* 5 Dimensional Score Bar Chart & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Chart (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>5-Dimensional Component Scoring</span>
              <span className="text-[11px] font-normal text-slate-500 font-mono">Scale: 0 - 100</span>
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#334155' }} width={120} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-2.5 rounded-xl shadow-md border border-slate-200 text-xs">
                            <p className="font-bold text-slate-900">{data.name}</p>
                            <p className="text-indigo-600 font-semibold">Score: {data.score} / 100</p>
                            <p className="text-slate-500">Weight: {data.weight}</p>
                            <p className="text-slate-400 text-[10px] mt-1">{data.desc}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Drivers & Key Bottlenecks (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-200/80">
              <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>सकारात्मक चालक (Key Drivers)</span>
              </h4>
              <ul className="space-y-1.5">
                {feasibility.keyDrivers.map((driver, idx) => (
                  <li key={idx} className="text-xs text-emerald-950 flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/80">
              <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>संभावित बाधाएं व जोखिम (Key Bottlenecks)</span>
              </h4>
              <ul className="space-y-1.5">
                {feasibility.keyBottlenecks.map((bot, idx) => (
                  <li key={idx} className="text-xs text-amber-950 flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{bot}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 2: Local Data Engine Feed (Census, OSM, Mandi, Weather) */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200/80 px-2 py-0.5 rounded-md">
              Module 2: Data Engine
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              स्थानीय जमीनी आंकड़े (Real Local Intelligence Feed)
            </h3>
            <p className="text-xs text-slate-500">
              Geographic & market parameters fetched for: <strong className="text-slate-800">{localData.village}</strong> (Block: {localData.block}, Dist: {localData.district}, {localData.state})
            </p>
          </div>

          <div className="flex items-center gap-2">
            {localData.latitude && localData.longitude && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-mono">
                📍 {localData.latitude.toFixed(4)}, {localData.longitude.toFixed(4)}
              </span>
            )}
            {onOpenMap && (
              <button
                onClick={onOpenMap}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                title="Google Maps पर देखें और स्थान बदलें"
              >
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>Open in Map</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Core Data Source Blocks as in Module 2 of Prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Population (Census) */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Population (जनसंख्या)</span>
              <Users className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
              {localData.population.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Households: ~{localData.households.toLocaleString('en-IN')} परिवारों का आधार
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              Source: Census / data.gov.in
            </span>
          </div>

          {/* 2. Competitors (OpenStreetMap) */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Competitors (प्रतिस्पर्धी)</span>
              <Store className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
              {localData.competitorsCount} <span className="text-xs font-normal text-slate-500 font-sans">within 5 km</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 truncate" title={localData.competitorsList[0]}>
              Nearest: {localData.competitorsList[0] || 'None in immediate vicinity'}
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              Source: OpenStreetMap POI
            </span>
          </div>

          {/* 3. Market Distance & Road (OSM/Gov) */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Market & Roads (मंडी दूरी)</span>
              <Truck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
              {localData.marketDistanceKm} km
            </div>
            <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              {localData.roadAccess ? 'पक्की ऑल-वेदर सड़क उपलब्ध' : 'कच्चा मार्ग'}
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              Source: PMGSY / GIS Route
            </span>
          </div>

          {/* 4. Mandi Prices & Weather (AGMARKNET & IMD) */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">AGMARKNET & IMD</span>
              <CloudSun className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-sm font-bold text-slate-900 truncate">
              {localData.mandiPriceBenchmark.retailRate}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Wholesale: {localData.mandiPriceBenchmark.wholesaleRate}
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono bg-white text-amber-700 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs font-semibold">
              Spread: {localData.mandiPriceBenchmark.marginPercent}% margin
            </span>
          </div>
        </div>

        {/* Detailed Competitor POI audit list */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>OpenStreetMap entities mapped: </span>
            <span className="text-slate-800 font-medium">
              {localData.competitorsList.join(' • ')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>3-Phase Grid Power: <strong>{localData.electricityHoursPerDay} hrs/day</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
