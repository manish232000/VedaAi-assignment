import React from 'react';

export default function ExtractingView() {
  return (
    <div className="extracting-view-container">
      {/* 3-Star Sparkle Cluster matching Figma screenshot */}
      <div className="extracting-sparkles-cluster">
        <svg 
          className="sparkles-svg-animation" 
          width="74" 
          height="74" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Large Center Sparkle */}
          <path 
            d="M50 8C50 32 74 50 92 50C74 50 50 68 50 92C50 68 26 50 8 50C26 50 50 32 50 8Z" 
            fill="url(#sparkle-grad-1)" 
            className="main-sparkle"
          />
          
          {/* Top-Right Secondary Sparkle */}
          <path 
            d="M78 12C78 22 87 29 95 29C87 29 78 36 78 46C78 36 69 29 61 29C69 29 78 22 78 12Z" 
            fill="url(#sparkle-grad-2)" 
            className="secondary-sparkle-1"
          />
          
          {/* Bottom-Left Minor Sparkle */}
          <path 
            d="M24 64C24 72 31 78 38 78C31 78 24 84 24 92C24 84 17 78 10 78C17 78 24 72 24 64Z" 
            fill="url(#sparkle-grad-3)" 
            className="secondary-sparkle-2"
          />

          <defs>
            <linearGradient id="sparkle-grad-1" x1="8" y1="8" x2="92" y2="92" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF4D15" />
              <stop offset="1" stopColor="#FF7A3D" />
            </linearGradient>
            <linearGradient id="sparkle-grad-2" x1="61" y1="12" x2="95" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF6B2B" />
              <stop offset="1" stopColor="#FFA06A" />
            </linearGradient>
            <linearGradient id="sparkle-grad-3" x1="10" y1="64" x2="38" y2="92" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5A22" />
              <stop offset="1" stopColor="#FF935A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Title & Subtitle */}
      <h2 className="extracting-title">Extracting...</h2>
      <p className="extracting-subtitle">This may take a while</p>
    </div>
  );
}
