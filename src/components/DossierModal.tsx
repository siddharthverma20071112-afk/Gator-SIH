import React from 'react';
import { 
  FileText, 
  Printer, 
  X, 
  Download, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  Coins, 
  Award,
  ChevronRight
} from 'lucide-react';
import { BusinessDossier } from '../types';
import { BrandLogo } from './BrandLogo';

interface DossierModalProps {
  dossier: BusinessDossier;
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  dossier,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden my-auto">
        {/* Modal Toolbar (hidden during print) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0 print:hidden border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-sm sm:text-base">
              Detailed Bank Loan Appraisal Note & Enterprise Feasibility Dossier
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto print:p-0 print:overflow-visible space-y-8 text-slate-800 font-['Plus_Jakarta_Sans']">
          {/* Official Letterhead */}
          <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BrandLogo size="sm" />
                <span className="text-xl font-bold tracking-tight text-slate-900 font-['Space_Grotesk']">
                  ग्रामीण सेतु AI (GraminSetu)
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                National Rural Enterprise & Micro-Credit Decision Support System
              </p>
              <p className="text-[11px] text-slate-400">
                In Alignment with PMEGP, MUDRA & Reserve Bank Priority Sector Guidelines
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-slate-600 space-y-0.5">
              <p>Dossier ID: <strong className="text-slate-900">{dossier.id}</strong></p>
              <p>Appraisal Date: {new Date(dossier.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              <p className="text-emerald-700 font-semibold">Status: RECOMMENDED FOR APPRAISAL</p>
            </div>
          </div>

          {/* Section 1: Executive Applicant & Project Profile */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
              1. Enterprise & Promoter Profile
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs shadow-2xs">
              <div>
                <span className="text-slate-500 block font-medium">Promoter / Applicant:</span>
                <strong className="text-slate-900">{dossier.applicant.applicantName || 'Rural Entrepreneur'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Business Proposed:</span>
                <strong className="text-slate-900 uppercase font-mono">{dossier.applicant.business}</strong>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Proposed Location:</span>
                <strong className="text-slate-900">{dossier.localData.village}, {dossier.localData.district}</strong>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Prior Experience:</span>
                <strong className="text-slate-900">{dossier.applicant.experienceYears ?? 3} Years</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Financial Structure & Loan Terms */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
              2. Project Cost & Credit Terms (90:10 Structure)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs font-mono shadow-2xs">
              <div className="border-r border-slate-200 pr-2">
                <span className="text-slate-500 text-[11px] block font-medium">Total Project Cost</span>
                <strong className="text-lg text-slate-900 font-bold">
                  ₹{(dossier.finance.projectCost / 100000).toFixed(2)} Lakh
                </strong>
              </div>
              <div className="border-r border-slate-200 pr-2">
                <span className="text-slate-500 text-[11px] block font-medium">Promoter Margin (10%)</span>
                <strong className="text-lg text-slate-900 font-bold">
                  ₹{(dossier.finance.marginCapital / 100000).toFixed(2)} Lakh
                </strong>
              </div>
              <div className="border-r border-slate-200 pr-2">
                <span className="text-slate-500 text-[11px] block font-medium">Bank Loan Requested (90%)</span>
                <strong className="text-lg text-indigo-600 font-bold">
                  ₹{(dossier.finance.loanAmount / 100000).toFixed(2)} Lakh
                </strong>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block font-medium">Estimated Monthly EMI</span>
                <strong className="text-lg text-slate-900 font-bold">
                  ₹{dossier.finance.monthlyEmi.toLocaleString('en-IN')}
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs p-2.5 bg-slate-50/80 rounded-xl text-slate-600 font-mono border border-slate-200/80 shadow-2xs">
              <div>DSCR: <strong className="text-slate-900">{dossier.finance.dscrRatio}x</strong></div>
              <div>Interest: <strong className="text-slate-900">{dossier.finance.interestRateAnnual}% p.a.</strong></div>
              <div>Moratorium: <strong className="text-slate-900">{dossier.finance.moratoriumMonths} Months</strong></div>
            </div>
          </div>

          {/* Section 3: SWOT Matrix (AI Assisted Grounded Strategic Analysis) */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
              3. Strategic SWOT Analysis (व्यावसायिक सामर्थ्य एवं चुनौतियां)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Strengths */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 shadow-2xs">
                <h5 className="font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strengths (सामर्थ्य)</span>
                </h5>
                <ul className="space-y-1 text-slate-700">
                  {dossier.swotAnalysis.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 shadow-2xs">
                <h5 className="font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Weaknesses (कमजोरियां)</span>
                </h5>
                <ul className="space-y-1 text-slate-700">
                  {dossier.swotAnalysis.weaknesses.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 shadow-2xs">
                <h5 className="font-bold text-indigo-900 flex items-center gap-1.5 mb-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Opportunities (अवसर)</span>
                </h5>
                <ul className="space-y-1 text-slate-700">
                  {dossier.swotAnalysis.opportunities.map((o, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Threats */}
              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/80 shadow-2xs">
                <h5 className="font-bold text-rose-900 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>Threats & Risk Mitigation (जोखिम)</span>
                </h5>
                <ul className="space-y-1 text-slate-700">
                  {dossier.swotAnalysis.threats.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: 30-60-90 Day Execution Milestones */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
              4. 30-60-90 Day Execution Milestones
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
                <span className="font-bold text-slate-900 block mb-2 font-mono text-emerald-800">
                  DAY 1 - 30: SETUP & LICENSES
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  {dossier.actionPlan30_60_90.day30.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
                <span className="font-bold text-slate-900 block mb-2 font-mono text-indigo-800">
                  DAY 31 - 60: PROCUREMENT & TRIAL
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  {dossier.actionPlan30_60_90.day60.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
                <span className="font-bold text-slate-900 block mb-2 font-mono text-slate-800">
                  DAY 61 - 90: FULL COMMERCIAL OP
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  {dossier.actionPlan30_60_90.day90.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: Official Bank Appraisal Note & Signoff */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs space-y-2 shadow-2xs">
            <span className="font-bold text-slate-900 block font-mono">
              5. Lead Credit Appraisal Officer Conclusion:
            </span>
            <p className="text-slate-700 leading-relaxed italic">
              "{dossier.bankLoanAppraisalSummary}"
            </p>
            <div className="pt-4 flex items-center justify-between text-slate-500 font-mono text-[11px] border-t border-slate-200/80">
              <div>
                <span>Automated Signature: </span>
                <strong className="text-slate-800">GraminSetu Automated Credit Engine v2.4</strong>
              </div>
              <div>
                <span>Audit Ref: </span>
                <strong className="text-slate-800">SIH-BHT-{dossier.id.slice(-6)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
