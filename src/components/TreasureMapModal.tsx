'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Map, X, Lock, Unlock, Gift, Sparkles, Trophy, Clock } from 'lucide-react';

interface TreasureMapModalProps {
  foundCodes: string[];
  hintLevel: number;
  interactionScore: number;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
}

const TreasureMapModal: React.FC<TreasureMapModalProps> = ({
  foundCodes,
  hintLevel,
  interactionScore,
  showMap,
  setShowMap
}) => {
  const [pulseChest, setPulseChest] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px) to trigger dismiss
  const minSwipeDistance = 100;

  const treasures = [
    {
      code: 'SPOOKY10',
      name: 'Spooky Chest',
      hint: 'Try the classic gamer code... ↑↑↓↓←→←→BA',
      icon: '🎃',
      color: 'from-orange-500 to-red-500',
      unlocked: foundCodes.includes('SPOOKY10'),
      discount: 10,
      cumulative: 10
    },
    {
      code: 'HAUNTED20',
      name: 'Haunted Chest',
      hint: 'Hover over Emily\'s photos carefully...',
      icon: '👻',
      color: 'from-purple-500 to-indigo-500',
      unlocked: foundCodes.includes('HAUNTED20'),
      requiresInteraction: 8,
      discount: 20,
      cumulative: 30
    },
    {
      code: 'ENCHANTED50',
      name: 'Enchanted Chest',
      hint: 'Complete ALL interactions on the page and check every corner...',
      icon: '✨',
      color: 'from-pink-500 to-purple-500',
      unlocked: foundCodes.includes('ENCHANTED50'),
      requiresInteraction: 15,
      discount: 20,
      cumulative: 50
    }
  ];

  // Pulse animation for next available chest
  useEffect(() => {
    const nextChest = treasures.findIndex(t => !t.unlocked);
    if (nextChest !== -1) {
      setPulseChest(nextChest);
    } else {
      setPulseChest(null);
    }
  }, [foundCodes]);

  // Swipe gesture handling for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isDownSwipe) {
      setShowMap(false);
    }
  };

  const getHintText = (index: number, treasure: typeof treasures[0]) => {
    // Progressive hints based on time spent AND interaction
    if (treasure.unlocked) return '✅ Code Found!';

    // Code 1: SPOOKY10 (Konami Code)
    if (index === 0) {
      if (treasure.requiresInteraction && interactionScore < treasure.requiresInteraction) {
        return `🔒 Requires ${treasure.requiresInteraction} engagement points (you have ${interactionScore})`;
      }

      if (hintLevel === 0) return '🔍 Explore the page to unlock hints...';
      if (hintLevel === 1) return '💡 Hint Level 1: Remember classic video game cheat codes from the 90s?';
      if (hintLevel === 2) return '💡 Hint Level 2: The Konami Code was famous in games like Contra...';
      if (hintLevel >= 3) return `💡 Full Hint: ${treasure.hint}`;
    }

    // Code 2: HAUNTED20 (Image Hover)
    if (index === 1) {
      if (treasure.requiresInteraction && interactionScore < treasure.requiresInteraction) {
        return `🔒 Requires ${treasure.requiresInteraction} engagement points to unlock. Current: ${interactionScore} pts. Try the quiz, flip cards, and value slider!`;
      }

      if (hintLevel === 0) return '🔍 Keep engaging to unlock hints...';
      if (hintLevel === 1) return '💡 Hint Level 1: Emily\'s photos aren\'t just decorative...';
      if (hintLevel === 2) return '💡 Hint Level 2: Try hovering (or tapping on mobile) over Emily\'s images slowly...';
      if (hintLevel >= 3) return `💡 Full Hint: ${treasure.hint}`;
    }

    // Code 3: ENCHANTED50 (High Engagement)
    if (index === 2) {
      if (treasure.requiresInteraction && interactionScore < treasure.requiresInteraction) {
        return `🔒 Requires ${treasure.requiresInteraction} engagement points. Current: ${interactionScore} pts. This is the ultimate challenge—explore EVERYTHING! (${treasure.requiresInteraction - interactionScore} more points needed)`;
      }

      if (hintLevel === 0) return '🔍 This one requires serious dedication...';
      if (hintLevel === 1) return '💡 Hint Level 1: Complete maximum engagement across the entire page first...';
      if (hintLevel === 2) return '💡 Hint Level 2: Try every interactive element, read every section, scroll to the bottom...';
      if (hintLevel === 3) return '💡 Hint Level 3: Check the page corners, the footer, unexpected places...';
      if (hintLevel >= 4) return `💡 Full Hint: ${treasure.hint}`;
    }

    return '🔍 Keep exploring for more hints...';
  };

  const calculateProgress = () => {
    return Math.round((foundCodes.length / treasures.length) * 100);
  };

  if (!showMap) {
    // Floating treasure map button
    return (
      <button
        onClick={() => setShowMap(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-besty-coral to-besty-blue text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40 group animate-bounce"
        title="Open Treasure Map"
      >
        <Map className="w-6 h-6" />
        {foundCodes.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-besty-coral text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
            {foundCodes.length}
          </div>
        )}
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
      onClick={() => setShowMap(false)}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border-2 border-besty-coral/50 transform animate-slideUp touch-pan-y my-4 max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Swipe indicator for mobile */}
        <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full" />

        {/* Close button - larger touch target on mobile */}
        <button
          onClick={() => setShowMap(false)}
          className="absolute top-4 right-4 p-3 md:p-2 hover:bg-besty-mint rounded-full transition-colors group"
          aria-label="Close treasure map"
        >
          <X className="w-7 h-7 md:w-6 md:h-6 text-besty-blue group-hover:rotate-90 transition-transform" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-besty-coral to-besty-blue rounded-2xl mb-4 shadow-lg">
            <Map className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-black text-besty-blue mb-2">🗺️ Treasure Map</h2>
          <p className="text-besty-gray mb-2">Find all 3 hidden discount codes!</p>
          <div className="inline-block bg-gradient-to-r from-besty-coral/20 to-besty-green/20 backdrop-blur-sm border border-besty-coral/40 rounded-full px-4 py-2">
            <p className="text-sm font-bold text-besty-coral">
              💰 Discounts stack: 10% + 20% + 20% = <span className="text-besty-blue">50% OFF!</span>
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-besty-gray font-semibold">Progress</span>
            <span className="text-sm text-besty-coral font-bold">{foundCodes.length} / {treasures.length} Codes Found</span>
          </div>
          <div className="h-3 bg-besty-mint rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-besty-green via-besty-coral to-besty-blue transition-all duration-500 ease-out"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        {/* Treasure chests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {treasures.map((treasure, index) => (
            <div
              key={treasure.code}
              className={`relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                treasure.unlocked
                  ? 'bg-gradient-to-br from-besty-green/20 to-besty-mint border-besty-green'
                  : pulseChest === index
                  ? 'bg-gradient-to-br from-besty-mint to-white border-besty-coral animate-pulse'
                  : 'bg-gradient-to-br from-besty-gray-light to-white border-gray-300'
              }`}
            >
              {/* Chest icon */}
              <div className="text-center mb-3 sm:mb-4">
                <div className={`text-4xl sm:text-6xl mb-2 ${pulseChest === index && !treasure.unlocked ? 'animate-bounce' : ''}`}>
                  {treasure.unlocked ? <Unlock className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-besty-green" /> : <Lock className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400" />}
                </div>
                <div className="text-3xl sm:text-4xl mb-2">{treasure.icon}</div>
                <h3 className="font-bold text-besty-blue mb-1 text-sm sm:text-base">{treasure.name}</h3>
                <div className={`text-lg sm:text-xl font-black bg-gradient-to-r ${treasure.color} bg-clip-text text-transparent mb-1`}>
                  +{treasure.discount}% OFF
                </div>
                <div className="text-xs text-besty-gray font-semibold">
                  (Total: {treasure.cumulative}% if you find all before)
                </div>
              </div>

              {/* Hint */}
              <div className="text-xs text-besty-gray text-center bg-besty-mint rounded-lg p-2 sm:p-3">
                {getHintText(index, treasure)}
              </div>

              {/* Unlocked indicator */}
              {treasure.unlocked && (
                <div className="absolute -top-2 -right-2 bg-besty-green text-white p-2 rounded-full shadow-lg">
                  <Gift className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Victory message */}
        {foundCodes.length === treasures.length && (
          <div className="bg-gradient-to-r from-besty-coral to-besty-blue rounded-xl p-4 sm:p-6 text-center shadow-lg">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-besty-green animate-bounce" />
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">🎉 ALL CODES FOUND!</h3>
            <p className="text-white/90 mb-4 text-sm sm:text-base">
              You've discovered all the hidden treasures!
            </p>

            {/* 50% Discount */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-4">
              <p className="text-besty-green font-black text-xl sm:text-2xl mb-2">
                TOTAL: 50% OFF!
              </p>
              <p className="text-white text-xs sm:text-sm">
                10% (SPOOKY10) + 20% (HAUNTED20) + 20% (ENCHANTED50) = <strong>50% Friends & Family Rate</strong>
              </p>
            </div>

            {/* Ultimate Prize Section */}
            {interactionScore >= 20 ? (
              <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-2 border-yellow-400 rounded-xl p-5 mb-4 animate-pulse">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                  <h4 className="text-xl font-black text-yellow-300">🏆 ULTIMATE PRIZE UNLOCKED!</h4>
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
                <p className="text-white font-bold text-lg mb-2">
                  100% Engagement Achievement! 🎯
                </p>
                <div className="bg-white/20 rounded-lg p-3 mb-3">
                  <p className="text-yellow-100 text-sm mb-1">
                    You found all 3 codes <strong>AND</strong> explored everything!
                  </p>
                  <p className="text-white font-black text-xl">
                    Emily covers your $99 App Store fee! 🍎
                  </p>
                </div>
                <p className="text-xs text-yellow-200 italic">
                  If you choose iOS App Store, the $99 Apple Developer application fee is on us!
                </p>
              </div>
            ) : (
              <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-slate-400" />
                  <h4 className="text-sm font-bold text-slate-300">🏆 Ultimate Prize Available</h4>
                </div>
                <p className="text-slate-400 text-xs mb-2">
                  Get to <strong>20 engagement points</strong> to unlock the ultimate prize!
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Current: {interactionScore} pts</span>
                  <span className="text-pink-400 font-bold">{20 - interactionScore} pts to go!</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-500"
                    style={{ width: `${Math.min((interactionScore / 20) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => setShowMap(false)}
              className="bg-white text-purple-600 px-6 py-4 md:py-3 text-base md:text-sm rounded-full font-bold hover:scale-105 transition-transform touch-manipulation"
            >
              {interactionScore >= 20 ? 'Claim Your Ultimate Prize! 🏆' : 'Claim Your Prize! 🎁'}
            </button>
          </div>
        )}

        {/* Engagement tips */}
        {foundCodes.length < treasures.length && (
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-purple-300 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">More hints unlock as you explore!</span>
            </div>
            <p className="text-xs text-purple-400">
              Interact with the page, scroll through sections, and watch carefully for clues...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreasureMapModal;
