import React from "react";

// Finder face
export const MacFinderIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#finderBg)" />
    <defs>
      <linearGradient id="finderBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E5E5EA" />
      </linearGradient>
    </defs>
    {/* Left Face (darker blue) */}
    <path d="M6 16C6 10.48 10.48 6 16 6H32V58H16C10.48 58 6 53.52 6 48V16Z" fill="#007AFF" />
    {/* Right Face (light blue) */}
    <path d="M32 6H48C53.52 6 58 10.48 58 16V48C58 53.52 53.52 58 48 58H32V6Z" fill="#5AC8FA" />
    {/* Split Line Nose */}
    <path d="M32 6V28C32 31.31 34.69 34 38 34H44" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
    {/* Left Eye */}
    <circle cx="20" cy="22" r="3.5" fill="#1D4ED8" />
    {/* Right Eye */}
    <circle cx="42" cy="22" r="3.5" fill="#1D4ED8" />
    {/* Smile curve */}
    <path d="M16 42C16 48 22 51.5 32 51.5C40 51.5 46 48 46 42" stroke="#1D4ED8" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

// About (Contacts Address Book)
export const MacAboutIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#contactsBg)" />
    <defs>
      <linearGradient id="contactsBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A27B5C" />
        <stop offset="100%" stopColor="#634832" />
      </linearGradient>
    </defs>
    {/* Profile Circle */}
    <circle cx="32" cy="30" r="18" fill="#F2F2F7" opacity="0.95" />
    <circle cx="32" cy="24" r="6" fill="#634832" />
    <path d="M18 41.5C18 34.5 24.5 32.5 32 32.5C39.5 32.5 46 34.5 46 41.5V43.5H18V41.5Z" fill="#634832" />
    {/* Contacts Index Tabs on the right edge */}
    <rect x="59" y="14" width="5" height="7" rx="1" fill="#FF3B30" />
    <rect x="59" y="24" width="5" height="7" rx="1" fill="#FFCC00" />
    <rect x="59" y="34" width="5" height="7" rx="1" fill="#4CD964" />
    <rect x="59" y="44" width="5" height="7" rx="1" fill="#007AFF" />
  </svg>
);

// Skills (Launchpad Rocket)
export const MacSkillsIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#skillsBg)" />
    <defs>
      <linearGradient id="skillsBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8E8E93" />
        <stop offset="100%" stopColor="#3A3A3C" />
      </linearGradient>
    </defs>
    {/* Target Circle plate */}
    <circle cx="32" cy="32" r="23" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    {/* Rocket */}
    <path d="M32 14C32 14 36 22 36 29C36 34 32 37 32 37C32 37 28 34 28 29C28 22 32 14 32 14Z" fill="#FFFFFF" />
    {/* Rocket wings */}
    <path d="M28 29C25 31 23 35 23 35C23 35 25 35 28 33.5V29Z" fill="#E5E5EA" />
    <path d="M36 29C39 31 41 35 41 35C41 35 39 35 36 33.5V29Z" fill="#E5E5EA" />
    {/* Port window */}
    <circle cx="32" cy="25" r="2.5" fill="#3B82F6" />
    {/* Fire flame */}
    <path d="M32 37L34 44L32 46L30 44Z" fill="#FF9500" />
    <path d="M32 38L33 42L32 43L31 42Z" fill="#FFCC00" />
  </svg>
);

// AI Trading Bot (Stocks)
export const MacTradingBotIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="#1C1C1E" />
    {/* Grid lines */}
    <line x1="8" y1="20" x2="56" y2="20" stroke="#2C2C2E" strokeWidth="0.5" />
    <line x1="8" y1="32" x2="56" y2="32" stroke="#2C2C2E" strokeWidth="0.5" />
    <line x1="8" y1="44" x2="56" y2="44" stroke="#2C2C2E" strokeWidth="0.5" />
    <line x1="22" y1="8" x2="22" y2="56" stroke="#2C2C2E" strokeWidth="0.5" />
    <line x1="42" y1="8" x2="42" y2="56" stroke="#2C2C2E" strokeWidth="0.5" />
    {/* Green Stock Chart Line */}
    <path d="M8 46L18 36L28 41L38 24L48 29L56 12" fill="none" stroke="#30D158" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="56" cy="12" r="2.5" fill="#30D158" />
  </svg>
);

// Cloud Solutions (Home App)
export const MacCloudSolutionsIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#homeBg)" />
    <defs>
      <linearGradient id="homeBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFCC00" />
        <stop offset="100%" stopColor="#FF9500" />
      </linearGradient>
    </defs>
    {/* House Silhouette */}
    <path d="M32 15L15 28V47C15 48.1 15.9 49 17 49H47C48.1 49 49 48.1 49 47V28L32 15Z" fill="#FFFFFF" />
    {/* House Roof Detail */}
    <path d="M32 15L15 28" stroke="#E67E22" strokeWidth="3" strokeLinecap="round" />
    <path d="M32 15L49 28" stroke="#E67E22" strokeWidth="3" strokeLinecap="round" />
    {/* Door outline */}
    <rect x="28" y="36" width="8" height="13" rx="1.5" fill="#FF9500" opacity="0.8" />
  </svg>
);

// Terminal Console
export const MacTerminalIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="#000000" stroke="#3A3A3C" strokeWidth="1.5" />
    <path d="M14 18L24 25L14 32" stroke="#39FF14" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="26" y1="32" x2="42" y2="32" stroke="#39FF14" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// OS Analytics (Numbers Bar Chart)
export const MacAnalyticsIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#numbersBg)" />
    <defs>
      <linearGradient id="numbersBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F2F2F7" />
      </linearGradient>
    </defs>
    {/* Grid Backdrop */}
    <line x1="14" y1="12" x2="52" y2="12" stroke="#E5E5EA" strokeWidth="1" />
    <line x1="14" y1="24" x2="52" y2="24" stroke="#E5E5EA" strokeWidth="1" />
    <line x1="14" y1="36" x2="52" y2="36" stroke="#E5E5EA" strokeWidth="1" />
    <line x1="14" y1="48" x2="52" y2="48" stroke="#E5E5EA" strokeWidth="1" />
    {/* Bars */}
    {/* Green Bar */}
    <rect x="18" y="28" width="6" height="20" rx="2" fill="#4CD964" />
    {/* Yellow Bar */}
    <rect x="28" y="18" width="6" height="30" rx="2" fill="#FFCC00" />
    {/* Blue Bar */}
    <rect x="38" y="14" width="6" height="34" rx="2" fill="#007AFF" />
    {/* Purple Bar */}
    <rect x="48" y="22" width="6" height="26" rx="2" fill="#5856D6" />
  </svg>
);

// Football Journey (Activity Monitor rings)
export const MacFootballIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="#1C1C1E" />
    {/* Fitness rings overlapping */}
    {/* Red ring */}
    <circle cx="32" cy="32" r="18" stroke="#FF2D55" strokeWidth="3.5" fill="none" opacity="0.9" />
    {/* Green ring */}
    <circle cx="32" cy="32" r="14" stroke="#4CD964" strokeWidth="3.5" fill="none" opacity="0.9" />
    {/* Blue ring */}
    <circle cx="32" cy="32" r="10" stroke="#007AFF" strokeWidth="3.5" fill="none" opacity="0.9" />
  </svg>
);

// Media Gallery (Photos)
export const MacGalleryIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="#FFFFFF" />
    <g transform="translate(32,32)">
      <ellipse rx="7" ry="15" transform="rotate(0)" fill="#FF2D55" opacity="0.9" />
      <ellipse rx="7" ry="15" transform="rotate(45)" fill="#FF9500" opacity="0.9" />
      <ellipse rx="7" ry="15" transform="rotate(90)" fill="#FFCC00" opacity="0.9" />
      <ellipse rx="7" ry="15" transform="rotate(135)" fill="#4CD964" opacity="0.9" />
      <ellipse rx="7" ry="15" transform="rotate(180)" fill="#5AC8FA" opacity="0.9" />
      <ellipse rx="7" ry="15" transform="rotate(225)" fill="#007AFF" opacity="0.9" />
      <ellipse rx="7" ry="15" transform="rotate(270)" fill="#5856D6" opacity="0.9" />
      <ellipse rx="7" ry="15" transform="rotate(315)" fill="#FF5E3A" opacity="0.9" />
    </g>
  </svg>
);

// Resume & Credentials (Pages document with pencil)
export const MacResumeIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#pagesBg)" />
    <defs>
      <linearGradient id="pagesBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFCC00" />
        <stop offset="100%" stopColor="#FF9500" />
      </linearGradient>
    </defs>
    {/* Sheet */}
    <rect x="14" y="10" width="36" height="44" rx="3" fill="#FFFFFF" />
    <line x1="18" y1="18" x2="34" y2="18" stroke="#AEAEB2" strokeWidth="2" />
    <line x1="18" y1="24" x2="42" y2="24" stroke="#D1D1D6" strokeWidth="1.5" />
    <line x1="18" y1="30" x2="42" y2="30" stroke="#D1D1D6" strokeWidth="1.5" />
    <line x1="18" y1="36" x2="38" y2="36" stroke="#D1D1D6" strokeWidth="1.5" />
    {/* Pencil */}
    <path d="M42 46L46 42L48 44L44 48Z" fill="#8E8E93" />
    <line x1="42" y1="46" x2="28" y2="32" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Safari Compass (Contact)
export const MacSafariIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#safariBg)" />
    <defs>
      <linearGradient id="safariBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F5F5F7" />
        <stop offset="100%" stopColor="#D1D1D6" />
      </linearGradient>
    </defs>
    {/* Compass */}
    <circle cx="32" cy="32" r="24" fill="#007AFF" />
    {/* Dial ticks */}
    <circle cx="32" cy="32" r="20" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 3" opacity="0.6" />
    {/* Needles */}
    <path d="M32 12L37 32L32 37L27 32Z" fill="#FF3B30" />
    <path d="M32 52L27 32L32 27L37 32Z" fill="#F2F2F7" />
    <circle cx="32" cy="32" r="1.5" fill="#8E8E93" />
  </svg>
);

// App Store (Game Center)
export const MacGameCenterIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#appstoreBg)" />
    <defs>
      <linearGradient id="appstoreBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5AC8FA" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
    </defs>
    {/* Sticks forming 'A' logo */}
    <g stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round">
      <line x1="20" y1="46" x2="32" y2="16" />
      <line x1="44" y1="46" x2="32" y2="16" />
      <line x1="22" y1="36" x2="42" y2="36" />
    </g>
  </svg>
);

// System preferences (Settings Gears)
// System preferences (Settings Gears)
export const MacSettingsIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#prefBg)" />
    <defs>
      <linearGradient id="prefBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E5E5EA" />
        <stop offset="100%" stopColor="#AEAEB2" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="16" fill="#8E8E93" />
    <circle cx="32" cy="32" r="8" fill="#E5E5EA" />
    {/* Gear teeth */}
    <g stroke="#8E8E93" strokeWidth="4.2" strokeLinecap="round">
      <line x1="32" y1="12" x2="32" y2="52" />
      <line x1="12" y1="32" x2="52" y2="32" />
      <line x1="18" y1="18" x2="46" y2="46" />
      <line x1="18" y1="46" x2="46" y2="18" />
    </g>
    <circle cx="32" cy="32" r="11" fill="#AEAEB2" />
    <circle cx="32" cy="32" r="5" fill="#E5E5EA" />
  </svg>
);

// Microsoft Azure Solutions
export const MacAzureSolutionsIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="url(#azureIconBg)" />
    <defs>
      <linearGradient id="azureIconBg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1E88E5" />
        <stop offset="100%" stopColor="#0B377B" />
      </linearGradient>
    </defs>
    {/* Azure Logo Path */}
    <path d="M32 13L49 46H36L32 37.5L28 46H15L32 13Z" fill="#FFFFFF" opacity="0.95" />
    <path d="M32 13L28 46H32L36 46L32 13Z" fill="#0078D4" />
  </svg>
);

// Amazon Web Services (AWS) Solutions
export const MacAwsSolutionsIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full p-0.5 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="#232F3E" />
    {/* AWS text */}
    <text x="32" y="32" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontWeight="bold" fontSize="15" fill="#FFFFFF" textAnchor="middle">AWS</text>
    {/* AWS Smile Arrow */}
    <path d="M18 39C24 43.5 39 43.5 45 39" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M42.5 37.5L45.5 39L44 42" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

