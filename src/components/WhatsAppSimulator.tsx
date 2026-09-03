import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  Phone, 
  CheckCheck, 
  ArrowRight,
  FileText,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { BusinessDossier } from '../types';

interface WhatsAppSimulatorProps {
  dossier: BusinessDossier;
  onOpenDossier: () => void;
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({
  dossier,
  onOpenDossier
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [customPhone, setCustomPhone] = useState<string>(dossier.applicant.applicantPhone || '+91 98391 24789');

  const handleCopy = () => {
    navigator.clipboard.writeText(dossier.whatsAppMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareToWhatsApp = () => {
    const encoded = encodeURIComponent(dossier.whatsAppMessage);
    const cleanPhone = customPhone.replace(/[^0-9]/g, '');
    const url = cleanPhone.length >= 10
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: WhatsApp Interactive Smartphone View (6 cols) */}
      <div className="lg:col-span-6 flex justify-center">
        <div className="w-full max-w-sm bg-[#EFEAE2] rounded-3xl shadow-xl border-4 border-slate-800 overflow-hidden flex flex-col h-[640px]">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white p-3 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#075E54] font-bold text-sm shadow-xs">
                🌾
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs sm:text-sm tracking-tight truncate max-w-[150px]">
                    ग्रामीण सेतु AI (GraminSetu)
                  </h4>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[9px]">
                    ✓
                  </span>
                </div>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  <span>Official Business Account</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/90">
              <button onClick={onOpenDossier} className="p-1 hover:bg-white/10 rounded-full cursor-pointer" title="View Dossier">
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body Wallpaper with subtle pattern */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {/* Timestamp pill */}
            <div className="flex justify-center">
              <span className="bg-white/90 text-slate-500 text-[10px] px-2.5 py-0.5 rounded-full shadow-2xs font-medium">
                TODAY • 1800-889-SETU IVR DISPATCH
              </span>
            </div>

            {/* AI Automated Delivered WhatsApp Card */}
            <div className="bg-white rounded-xl rounded-tl-none p-3.5 shadow-sm max-w-[95%] border border-slate-200/50 space-y-2">
              <div className="border-b border-slate-100 pb-2">
                <div className="flex items-center justify-between text-slate-500 text-[10px] mb-1">
                  <span className="font-semibold text-emerald-800 uppercase tracking-wide">
                    SIH Rural Enterprise Report
                  </span>
                  <span>Just now</span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm">
                  {dossier.applicant.businessName || `${dossier.applicant.business?.toUpperCase()} Project`}
                </h5>
                <p className="text-[11px] text-slate-600">
                  📍 {dossier.localData.village}, {dossier.localData.district}
                </p>
              </div>

              {/* Feasibility & Confidence */}
              <div className="bg-emerald-50 rounded-lg p-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 block">व्यवहार्यता (Feasibility)</span>
                  <strong className="text-emerald-900 text-sm">{dossier.feasibility.overallScore} / 100</strong>
                  <span className="text-[10px] text-emerald-700 ml-1">({dossier.feasibility.category})</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-800 block">विश्वास (Confidence)</span>
                  <strong className="text-emerald-900 text-sm">{dossier.feasibility.confidencePercent}%</strong>
                </div>
              </div>

              {/* Financial Snapshot */}
              <div className="space-y-1 text-[11px] bg-slate-50 p-2 rounded-lg text-slate-700 font-mono">
                <div className="flex justify-between">
                  <span>Project Cost:</span>
                  <strong className="text-slate-900">₹{(dossier.finance.projectCost / 100000).toFixed(2)} Lakh</strong>
                </div>
                <div className="flex justify-between">
                  <span>Recommended Loan:</span>
                  <strong className="text-emerald-700">₹{(dossier.finance.loanAmount / 100000).toFixed(2)} Lakh</strong>
                </div>
                <div className="flex justify-between">
                  <span>Monthly EMI:</span>
                  <strong className="text-slate-900">₹{dossier.finance.monthlyEmi.toLocaleString('en-IN')}/mo</strong>
                </div>
                <div className="flex justify-between">
                  <span>Scheme:</span>
                  <span className="text-indigo-700 font-semibold truncate max-w-[140px]">
                    {dossier.schemes[0]?.name.split('(')[0] || 'Term Loan'}
                  </span>
                </div>
              </div>

              {/* Key Identified Risks as in Module 6 prompt */}
              <div className="text-[11px] text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">⚠️ Identified Risks:</span>
                <p className="text-slate-600 pl-1.5 border-l-2 border-amber-400">
                  1. {dossier.strategicRisks[0]?.risk || 'Feed / raw material availability'}
                </p>
                <p className="text-slate-600 pl-1.5 border-l-2 border-amber-400">
                  2. {dossier.strategicRisks[1]?.risk || 'Local competitor saturation'}
                </p>
              </div>

              {/* Recommended Actions */}
              <div className="text-[11px] text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">✅ Recommended Actions:</span>
                <p className="text-emerald-800 pl-1.5 border-l-2 border-emerald-500">
                  1. Secure supplier advance contracts
                </p>
                <p className="text-emerald-800 pl-1.5 border-l-2 border-emerald-500">
                  2. Connect with village self-help groups & buyers
                </p>
                <p className="text-emerald-800 pl-1.5 border-l-2 border-emerald-500">
                  3. Apply with project DPR to bank under {dossier.schemes[0]?.name.split(' ')[0] || 'Scheme'}
                </p>
              </div>

              {/* Action Buttons in WhatsApp */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <button
                  onClick={onOpenDossier}
                  className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Full Bank Dossier</span>
                </button>
              </div>

              {/* Double Blue Tick footer */}
              <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-1">
                <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
              </div>
            </div>
          </div>

          {/* Fake WhatsApp Message Input */}
          <div className="bg-[#F0F2F5] p-2 flex items-center gap-2 shrink-0 border-t border-slate-300">
            <input
              type="text"
              readOnly
              value="Message generated automatically by GraminSetu AI"
              className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-slate-400 border border-slate-200 outline-hidden"
            />
            <button
              onClick={handleShareToWhatsApp}
              className="w-8 h-8 rounded-full bg-[#00A884] text-white flex items-center justify-center hover:bg-[#075E54] cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Share Actions & Raw Formatted Text (6 cols) */}
      <div className="lg:col-span-6 space-y-4">
        {/* Share & Send Controls */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                Module 6: WhatsApp Dispatch
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                व्हाट्सएप रिपोर्ट प्रेषण (Instant Message Dispatch)
              </h3>
            </div>
            <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center font-bold text-sm">
              📱
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Immediately upon completion of the voice call and feasibility analysis, the server dispatches this formatted summary directly to the villager's WhatsApp number.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                प्राप्तकर्ता मोबाइल नंबर (Recipient WhatsApp Phone):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3 py-2 text-xs font-mono text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <button
                onClick={handleShareToWhatsApp}
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-slate-950 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Open in WhatsApp Web / App</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 bg-white hover:bg-slate-50 active:scale-98 text-slate-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200/80 shadow-2xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy WhatsApp Text'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Formatted Text Preview Card */}
        <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 shadow-xs border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-400 font-mono">
              PREVIEW: EXACT MESSAGE PAYLOAD
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
          <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-72 border border-slate-800/80">
            {dossier.whatsAppMessage}
          </pre>
        </div>

        {/* Bank Dossier Link Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xs border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-white">पूर्ण बैंक ऋण मूल्यांकन फ़ाइल (Full Loan Dossier)</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Includes SWOT matrix, 30-60-90 day roadmap, and official credit appraisal note.
            </p>
          </div>
          <button
            onClick={onOpenDossier}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Open Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
