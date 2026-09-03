import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  isLive?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  isLive = false,
  className = ''
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8 rounded-lg', icon: 32 },
    md: { box: 'w-10 h-10 rounded-xl', icon: 40 },
    lg: { box: 'w-12 h-12 rounded-2xl', icon: 48 }
  };

  const { box, icon } = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`relative group shrink-0 ${box} bg-gradient-to-br from-slate-900 via-indigo-950 to-emerald-950 p-1 border border-indigo-500/30 shadow-md flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-emerald-400/50 hover:shadow-emerald-500/10 ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-amber-400/15 pointer-events-none" />

      {/* Subtle animated pulse ring if live */}
      {isLive && (
        <span className="absolute inset-0 rounded-[inherit] border border-emerald-400/40 animate-ping pointer-events-none opacity-40" />
      )}

      {/* Custom Vector Emblem: Gramin (Sprout) + Setu (Bridge Arch) + AI (Voice Waves & Spark) */}
      <svg
        width={icon - 8}
        height={icon - 8}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-sm"
      >
        <defs>
          {/* Bridge Gradient */}
          <linearGradient id="setuBridgeGrad" x1="4" y1="32" x2="36" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          {/* Sprout & Leaf Gradient */}
          <linearGradient id="graminSproutGrad" x1="20" y1="14" x2="20" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="40%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* AI Spark Star Gradient */}
          <linearGradient id="aiSparkGrad" x1="20" y1="4" x2="20" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Voice Wave Gradient */}
          <linearGradient id="voiceWaveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 1. Subtle Soundwave / AI Network pillars behind bridge */}
        <g opacity="0.4">
          <rect x="8" y="16" width="2" height="10" rx="1" fill="url(#voiceWaveGrad)" />
          <rect x="13" y="11" width="2" height="15" rx="1" fill="url(#voiceWaveGrad)" />
          <rect x="25" y="11" width="2" height="15" rx="1" fill="url(#voiceWaveGrad)" />
          <rect x="30" y="16" width="2" height="10" rx="1" fill="url(#voiceWaveGrad)" />
        </g>

        {/* 2. The Setu Bridge (Graceful connecting arch connecting rural to capital) */}
        {/* Bridge deck base */}
        <path
          d="M5 31C12 31 16 29 20 29C24 29 28 31 35 31"
          stroke="url(#setuBridgeGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Bridge Main Suspension Curve */}
        <path
          d="M6 31C10 21 16 19 20 19C24 19 30 21 34 31"
          stroke="url(#setuBridgeGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Vertical suspension stay cables */}
        <line x1="12" y1="26" x2="12" y2="30" stroke="#818CF8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="16" y1="21" x2="16" y2="29" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="24" y1="21" x2="24" y2="29" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="28" y1="26" x2="28" y2="30" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

        {/* 3. Rural Growth Sprout (Gramin / Harvest emerging upward through the bridge) */}
        {/* Center stem */}
        <path
          d="M20 28V15"
          stroke="url(#graminSproutGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Left organic leaf (Wheat/Sprout) */}
        <path
          d="M20 21C16.5 21 14.5 18 15 15C17.5 15.5 19.5 18 20 21Z"
          fill="url(#graminSproutGrad)"
        />

        {/* Right organic leaf */}
        <path
          d="M20 18C23.5 18 25.5 15 25 12C22.5 12.5 20.5 15 20 18Z"
          fill="url(#graminSproutGrad)"
        />

        {/* 4. AI Intelligence Spark (Four-point star at top representing Gemini AI & guidance) */}
        <path
          d="M20 4C20.4 6.8 21.2 7.6 24 8C21.2 8.4 20.4 9.2 20 12C19.6 9.2 18.8 8.4 16 8C18.8 7.6 19.6 6.8 20 4Z"
          fill="url(#aiSparkGrad)"
        />

        {/* Foundation bridge piers */}
        <circle cx="6" cy="31" r="1.5" fill="#818CF8" />
        <circle cx="34" cy="31" r="1.5" fill="#34D399" />
      </svg>
    </div>
  );
};
