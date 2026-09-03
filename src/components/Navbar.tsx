import React from 'react';
import { 
  PhoneCall, 
  MapPin,
  BarChart3, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Building2,
  ChevronDown
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/samplePresets';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeTab: 'call' | 'map' | 'feasibility' | 'finance' | 'whatsapp' | 'admin' | 'dossier';
  setActiveTab: (tab: 'call' | 'map' | 'feasibility' | 'finance' | 'whatsapp' | 'admin' | 'dossier') => void;
  onSelectPreset: (presetId: string) => void;
  isEvaluating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onSelectPreset,
  isEvaluating
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top SIH / National Intelligence Header */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5 font-medium">
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-semibold px-2 py-0.5 rounded-md text-[10px] tracking-wider uppercase">
            SIH 2024-2026
          </span>
          <span className="text-slate-200 font-semibold">Rural Enterprise & Loan Feasibility Consultant</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline text-slate-400">Voice AI • Local Data Engine • Scheme Routing</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-emerald-400">Gemini 3.8 Flash Active</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300 font-mono">Helpline: 1800-889-SETU</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <BrandLogo size="md" isLive={isEvaluating} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-['Space_Grotesk']">
                  ग्रामीण सेतु <span className="text-indigo-600">AI</span>
                </span>
                <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/80">
                  GraminSetu
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Voice-First Rural Enterprise Consultant & Micro-Credit Router
              </p>
            </div>
          </div>

          {/* Quick Preset Selector for SIH Evaluators */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 px-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Presets:
            </span>
            <div className="flex items-center gap-1">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset.id)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-2xs border border-transparent hover:border-slate-200 transition-all cursor-pointer whitespace-nowrap"
                  title={preset.tagline}
                >
                  {preset.businessType === 'dairy' && '🥛 '}
                  {preset.businessType === 'grocery' && '🛒 '}
                  {preset.businessType === 'tailoring' && '✂️ '}
                  {preset.businessType === 'mobile_repair' && '📱 '}
                  {preset.businessType === 'food_processing' && '🌾 '}
                  {preset.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('call')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'call'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Voice AI Call</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Location Map</span>
            </button>

            <button
              onClick={() => setActiveTab('feasibility')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'feasibility'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Feasibility & Finance</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Report</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SIH Admin Audit</span>
            </button>

            <button
              onClick={() => setActiveTab('dossier')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dossier'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Bank Dossier</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
