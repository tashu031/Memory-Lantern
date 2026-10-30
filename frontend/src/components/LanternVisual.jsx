import React from 'react';

export default function LanternVisual({ size = 'lg', isLit = true }) {
  const sizeClasses = {
    sm: 'w-24 h-36',
    md: 'w-40 h-56',
    lg: 'w-56 h-80 sm:w-72 sm:h-96',
    xl: 'w-72 h-[420px] sm:w-96 sm:h-[480px]',
  }[size] || 'w-56 h-80';

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses} select-none`}>
      {/* Background warm radial light burst */}
      {isLit && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4/5 h-4/5 rounded-full bg-amber-500/20 blur-3xl animate-pulse-aura" />
          <div className="w-1/2 h-1/2 rounded-full bg-yellow-400/25 blur-2xl animate-pulse" />
        </div>
      )}

      {/* SVG Lantern */}
      <svg
        viewBox="0 0 200 300"
        className="w-full h-full drop-shadow-2xl z-10 animate-float"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="lanternGlow" cx="50%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FBBF24" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#EA580C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="brassDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="45%" stopColor="#78350F" />
            <stop offset="85%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#291102" />
          </linearGradient>
          <linearGradient id="brassHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="glassPane" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Hanging Ring */}
        <circle
          cx="100"
          cy="32"
          r="22"
          stroke="url(#brassHighlight)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Top Finial / Cap */}
        <path
          d="M75 52 L125 52 L115 62 L85 62 Z"
          fill="url(#brassDark)"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />

        {/* Lantern Dome Roof */}
        <path
          d="M50 82 L150 82 L125 60 L75 60 Z"
          fill="url(#brassDark)"
          stroke="#D97706"
          strokeWidth="2"
        />
        <rect
          x="44"
          y="80"
          width="112"
          height="10"
          rx="3"
          fill="url(#brassHighlight)"
        />

        {/* Glass Chamber */}
        <rect
          x="55"
          y="90"
          width="90"
          height="125"
          rx="4"
          fill="url(#glassPane)"
          stroke="#78350F"
          strokeWidth="2"
        />

        {/* Warm Internal Glow */}
        {isLit && (
          <ellipse
            cx="100"
            cy="158"
            rx="40"
            ry="55"
            fill="url(#lanternGlow)"
          />
        )}

        {/* Candle Pillar */}
        <rect
          x="88"
          y="155"
          width="24"
          height="45"
          rx="3"
          fill="#FEF3C7"
          stroke="#D97706"
          strokeWidth="1"
        />
        {/* Melted Wax Rim */}
        <path
          d="M86 155 Q94 159 100 156 Q106 159 114 155"
          stroke="#FDE68A"
          strokeWidth="2"
          fill="none"
        />
        {/* Wick */}
        <line
          x1="100"
          y1="155"
          x2="100"
          y2="145"
          stroke="#78350F"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Realistic Flickering Flame */}
        {isLit && (
          <g className="animate-flicker" style={{ transformOrigin: '100px 145px' }}>
            {/* Outer flame */}
            <path
              d="M100 120 C107 132, 114 140, 107 148 C102 153, 98 153, 93 148 C86 140, 93 132, 100 120 Z"
              fill="#F59E0B"
            />
            {/* Mid flame */}
            <path
              d="M100 125 C105 134, 110 141, 105 147 C101 151, 99 151, 95 147 C90 141, 95 134, 100 125 Z"
              fill="#FBBF24"
            />
            {/* Inner flame core */}
            <path
              d="M100 132 C103 138, 106 143, 103 147 C101 149, 99 149, 97 147 C94 143, 97 138, 100 132 Z"
              fill="#FFFBEB"
            />
          </g>
        )}

        {/* Glass Filigree Corner Struts */}
        <line x1="55" y1="90" x2="55" y2="215" stroke="url(#brassHighlight)" strokeWidth="4" />
        <line x1="145" y1="90" x2="145" y2="215" stroke="url(#brassHighlight)" strokeWidth="4" />
        <line x1="85" y1="90" x2="85" y2="215" stroke="#92400E" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="115" y1="90" x2="115" y2="215" stroke="#92400E" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Lantern Base */}
        <rect
          x="48"
          y="215"
          width="104"
          height="12"
          rx="3"
          fill="url(#brassHighlight)"
        />
        <path
          d="M40 227 L160 227 L150 245 L50 245 Z"
          fill="url(#brassDark)"
          stroke="#D97706"
          strokeWidth="1.5"
        />
        {/* Base Feet */}
        <circle cx="58" cy="248" r="5" fill="#78350F" />
        <circle cx="100" cy="249" r="4" fill="#78350F" />
        <circle cx="142" cy="248" r="5" fill="#78350F" />
      </svg>
    </div>
  );
}
