'use client';

import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ children, content, position = 'right' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={`absolute z-50 whitespace-nowrap px-2.5 py-1 text-xs font-medium text-slate-200 bg-[#1A1610] border border-[#FFC21A]/40 rounded-md shadow-xl pointer-events-none transition-opacity duration-150 ${positionClasses[position]}`}
        >
          {content}
          <div
            className={`absolute w-1.5 h-1.5 bg-[#1A1610] border-t border-l border-[#FFC21A]/40 rotate-45 ${
              position === 'right' ? '-left-1 top-1/2 -translate-y-1/2 border-r-0 border-t-0 border-l border-b' : ''
            }`}
          />
        </div>
      )}
    </div>
  );
}

