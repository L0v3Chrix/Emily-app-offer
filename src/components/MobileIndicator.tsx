'use client';

import React from 'react';

interface MobileIndicatorProps {
  type: 'look' | 'tap' | 'swipe' | 'double-tap';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
  className?: string;
}

const MobileIndicator: React.FC<MobileIndicatorProps> = ({
  type,
  position = 'top-right',
  className = ''
}) => {
  const indicators = {
    'look': {
      emoji: '👀',
      text: 'LOOK HERE',
      color: 'from-yellow-400 to-orange-500'
    },
    'tap': {
      emoji: '👆',
      text: 'TAP ME',
      color: 'from-pink-400 to-purple-500'
    },
    'swipe': {
      emoji: '👈',
      text: 'SWIPE',
      color: 'from-blue-400 to-cyan-500'
    },
    'double-tap': {
      emoji: '🎃',
      text: 'DOUBLE TAP',
      color: 'from-orange-400 to-red-500'
    }
  };

  const positions = {
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  const indicator = indicators[type];
  const positionClass = positions[position];

  return (
    <div
      className={`absolute ${positionClass} z-20 pointer-events-none md:hidden ${className}`}
      aria-hidden="true"
    >
      <div className={`bg-gradient-to-r ${indicator.color} text-white px-3 py-1.5 rounded-full shadow-2xl border-2 border-white/50 animate-bounce flex items-center gap-1.5`}>
        <span className="text-lg leading-none">{indicator.emoji}</span>
        <span className="text-[10px] font-black tracking-wider">{indicator.text}</span>
      </div>
    </div>
  );
};

export default MobileIndicator;
