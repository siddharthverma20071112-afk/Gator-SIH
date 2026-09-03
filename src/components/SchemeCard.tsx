import React, { useState } from 'react';
import { 
  Building, 
  Gift, 
  FileCheck, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Percent,
  Clock,
  Coins
} from 'lucide-react';
import { EligibleScheme } from '../types';

interface SchemeCardProps {
  schemes: EligibleScheme[];
  projectCost: number;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  schemes,
  projectCost
}) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({ ...prev, [doc]: !prev[doc] }));
  };

  const isMicroFinance = projectCost <= 140000;

  return (
    <div className="space-y-6">
      {/* Module 5 Header & Logic Branch Indicator */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-2 py-0.5 rounded-md">
                Module 5: Scheme Router
              </span>
              <span className="text-xs text-slate-400">• Government of India / State Schemes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              पात्र सरकारी ऋण एवं अनुदान योजनाएं (Scheme Routing)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Deterministic routing logic based on project cost thresholds, business sector, and rural entrepreneur subsidies.
            </p>
          </div>

          {/* Logic Visualizer Badge */}
          <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-200/80 text-xs shadow-2xs">
            <span className="text-slate-500 block mb-1 font-medium">Router Decision Trigger:</span>
            <div className="flex items-center gap-2 font-semibold">
              <span className={isMicroFinance ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md' : 'text-slate-400'}>
                ≤ ₹1.4L: Micro Finance
              </span>
              <span className="text-slate-400">→</span>
              <span className={!isMicroFinance ? 'text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md' : 'text-slate-400'}>
                &gt; ₹1.4L: Term Loan
              </span>
            </div>
          </div>
        </div>

        {/* Schemes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {schemes.map((scheme, idx) => {
            const isPrimary = idx === 0;
            return (
              <div
                key={scheme.id}
                className={`rounded-2xl p-5 border transition-all ${
                  isPrimary
                    ? 'bg-white border-indigo-600/60 shadow-xs relative overflow-hidden'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                {isPrimary && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-semibold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Best Match / Primary Recommendation</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-1">
                  <Building className="w-3.5 h-3.5" />
                  <span>{scheme.agency}</span>
                  <span className="text-slate-300">•</span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] border border-slate-200/80">
                    {scheme.type}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {scheme.name}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  {scheme.nameHi}
                </p>

                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                  {scheme.eligibilityDescription}
                </p>

                {/* Key Benefit Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                  <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/70 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block">Interest Rate</span>
                    <strong className="text-slate-900 font-mono">{scheme.interestRate}</strong>
                  </div>

                  <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/70 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block">Max Tenure</span>
                    <strong className="text-slate-900 font-mono">{scheme.maxTenureYears} Years</strong>
                  </div>

                  <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/70 col-span-2 sm:col-span-1 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block">Subsidy Grant</span>
                    <strong className="text-emerald-700 font-mono">
                      {scheme.subsidyPercentage > 0
                        ? `₹${(scheme.subsidyAmount / 100000).toFixed(2)}L (${scheme.subsidyPercentage}%)`
                        : 'Nil (Low Int)'}
                    </strong>
                  </div>
                </div>

                {/* Collateral Waiver */}
                <div className="mt-3 text-[11px] text-slate-600 flex items-center gap-1.5 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Collateral: <strong className="text-slate-900">{scheme.collateralRequirement}</strong></span>
                </div>

                {/* Required Documents Checklist */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1 mb-2">
                    <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                    <span>आवश्यक दस्तावेज सूची (Required Document Checklist):</span>
                  </h4>
                  <div className="space-y-1.5">
                    {scheme.requiredDocuments.map((doc, dIdx) => {
                      const isChecked = Boolean(checkedDocs[`${scheme.id}-${dIdx}`]);
                      return (
                        <div
                          key={dIdx}
                          onClick={() => toggleDoc(`${scheme.id}-${dIdx}`)}
                          className="flex items-start gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          )}
                          <span className={isChecked ? 'line-through text-slate-400' : ''}>
                            {doc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
