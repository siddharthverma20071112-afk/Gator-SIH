import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts';
import { 
  Coins, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  Percent, 
  PieChart as PieIcon, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { FinancialPlan, BusinessType } from '../types';

interface FinanceCalculatorProps {
  finance: FinancialPlan;
  businessType: BusinessType;
  onMarginChange?: (newMargin: number) => void;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
  finance,
  businessType,
  onMarginChange
}) => {
  const [localMargin, setLocalMargin] = useState<number>(finance.marginCapital);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLocalMargin(val);
    if (onMarginChange) {
      onMarginChange(val);
    }
  };

  const getRiskBadge = (level: FinancialPlan['defaultRiskLevel']) => {
    switch (level) {
      case 'Low':
        return {
          label: 'Low Default Risk (सुरक्षित ऋण)',
          cls: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'Moderate':
        return {
          label: 'Moderate Risk (संतोषजनक)',
          cls: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        };
      case 'High':
      default:
        return {
          label: 'High Risk (अतिरिक्त गारंटी)',
          cls: 'bg-rose-50 text-rose-700 border-rose-200'
        };
    }
  };

  const riskInfo = getRiskBadge(finance.defaultRiskLevel);

  return (
    <div className="space-y-6">
      {/* Module 4 Card Header */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                Module 4: Finance Engine
              </span>
              <span className="text-xs text-slate-400">• Inspired by LoanGuard-AI & FinVista</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              परियोजना लागत एवं ऋण व्यवहार्यता (Loan & Capital Appraisal)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Standard 90:10 debt-equity appraisal model with dynamic DSCR, EMI amortization & cash flow forecasting.
            </p>
          </div>

          {/* Interactive Margin Capital Slider */}
          <div className="w-full md:w-72 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-700">मार्जिन पूंजी (Your Equity):</span>
              <strong className="text-indigo-600 font-mono text-sm font-bold">
                ₹{localMargin.toLocaleString('en-IN')}
              </strong>
            </div>
            <input
              type="range"
              min="20000"
              max="300000"
              step="10000"
              value={localMargin}
              onChange={handleSliderChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>₹20k</span>
              <span>₹1 Lakh</span>
              <span>₹3 Lakh</span>
            </div>
          </div>
        </div>

        {/* 4 Core Financial Blocks (Prompt: Margin -> Project Cost -> Loan -> EMI) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* 1. Margin Capital */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Margin Capital (स्वयं की पूंजी)</span>
              <Coins className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
              ₹{(finance.marginCapital / 100000).toFixed(2)} <span className="text-sm font-normal text-slate-500 font-sans">लाख</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              10% Promoter Contribution (इक्विटी)
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              Debt-Equity: {finance.debtEquityRatio}
            </span>
          </div>

          {/* 2. Total Project Cost */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Project Cost (परियोजना लागत)</span>
              <Building2 className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
              ₹{(finance.projectCost / 100000).toFixed(2)} <span className="text-sm font-normal text-slate-500 font-sans">लाख</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">
              Formula: Margin / 10%
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
              CAPEX + Initial OPEX Buffer
            </span>
          </div>

          {/* 3. Recommended Loan Amount */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Bank Loan (ऋण राशि)</span>
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-indigo-600 font-['Space_Grotesk']">
              ₹{(finance.loanAmount / 100000).toFixed(2)} <span className="text-sm font-normal text-slate-500 font-sans">लाख</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              90% Term Loan under CGTMSE
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono bg-white text-indigo-700 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs font-semibold">
              Rate: {finance.interestRateAnnual}% p.a.
            </span>
          </div>

          {/* 4. Monthly Repayment / EMI */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-xs font-medium">Monthly EMI (मासिक किस्त)</span>
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
              ₹{finance.monthlyEmi.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Tenure: {finance.tenureMonths / 12} Years ({finance.tenureMonths} months)
            </p>
            <span className="inline-block mt-2 text-[10px] font-mono bg-white text-amber-700 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs font-semibold">
              {finance.moratoriumMonths} Month Moratorium
            </span>
          </div>
        </div>

        {/* LoanGuard-AI Risk Metric & FinVista DSCR Ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">DSCR (ऋण शोधन क्षमता)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">{finance.dscrRatio}x</span>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${finance.dscrRatio >= 1.5 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              {finance.dscrRatio >= 1.5 ? 'Strong (>1.5x)' : 'Borderline'}
            </span>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">Break-even Period (लागत वसूली)</span>
              <span className="text-lg font-bold text-slate-900 font-mono">{finance.breakEvenMonths} Months</span>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              Target Month {finance.breakEvenMonths}
            </span>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">LoanGuard Risk Rating</span>
              <span className="text-xs font-semibold font-mono text-slate-800">{riskInfo.label}</span>
            </div>
            <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg border ${riskInfo.cls}`}>
              Score: {finance.defaultRiskScore}/100
            </span>
          </div>
        </div>
      </div>

      {/* Itemized CAPEX Breakdown & 12-Month Cash Flow Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cost Breakdown Table (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
          <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-600" />
            <span>पूंजी उपयोग विवरण (CAPEX Breakdown)</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Auditable itemized utilization for bank credit officer
          </p>

          <div className="space-y-2.5">
            {finance.costBreakdown.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                  <span>{item.category}</span>
                  <span className="font-mono text-indigo-600 font-bold">₹{item.amount.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 12-Month Cash Flow Forecast (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>12-माह नकद प्रवाह अनुमान (FinVista Projections)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Simulated monthly revenue vs debt servicing (EMI)
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
              Month 1 to 12
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={finance.monthlyCashFlow} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tickFormatter={(m) => `M${m}`} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(val: any, name: string) => [
                    `₹${Number(val).toLocaleString('en-IN')}`, 
                    name === 'revenue' ? 'Revenue (आय)' : name === 'netProfit' ? 'Net Cash (शुद्ध बचत)' : name === 'emi' ? 'EMI' : name
                  ]}
                  labelFormatter={(m) => `Month ${m}`}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" name="revenue" />
                <Area type="monotone" dataKey="netProfit" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" name="netProfit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-indigo-600"></span>
              <span className="text-slate-600 font-medium">मासिक कुल आय (Revenue)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-500"></span>
              <span className="text-slate-600 font-medium">शुद्ध बचत / अधिशेष (Net Profit)</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              (महीने 1-{finance.moratoriumMonths} अधिस्थगन के बाद EMI)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
