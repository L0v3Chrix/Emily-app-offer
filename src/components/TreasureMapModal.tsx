'use client';

import React, { useState, useEffect } from 'react';
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

  const treasures = [
    {
      code: 'SPOOKY10',
      name: 'Spooky Chest',
      hint: 'Try the classic gamer code... ↑↑↓↓←→←→BA',
      icon: '🎃',
      color: 'from-orange-500 to-red-500',
      unlocked: foundCodes.includes('SPOOKY10')
    },
    {
      code: 'HAUNTED20',
      name: 'Haunted Chest',
      hint: 'Hover over Emily\'s photos carefully...',
      icon: '👻',
      color: 'from-purple-500 to-indigo-500',
      unlocked: foundCodes.includes('HAUNTED20'),
      requiresInteraction: 8
    },
    {
      code: 'ENCHANTED50',
      name: 'Enchanted Chest',
      hint: 'Complete ALL interactions on the page and check every corner...',
      icon: '✨',
      color: 'from-pink-500 to-purple-500',
      unlocked: foundCodes.includes('ENCHANTED50'),
      requiresInteraction: 15
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

  const getHintText = (index: number, treasure: typeof treasures[0]) => {
    // Progressive hints based on time spent
    if (treasure.unlocked) return '✅ Code Found!';

    if (treasure.requiresInteraction && interactionScore < treasure.requiresInteraction) {
      return `🔒 Requires ${treasure.requiresInteraction} engagement points (you have ${interactionScore})`;
    }

    if (hintLevel === 0) return '🔍 Explore the page to unlock hints...';
    if (hintLevel === 1 && index === 0) return '💡 Hint: Think about classic video game codes...';
    if (hintLevel === 2 && index === 0) return treasure.hint;
    if (hintLevel >= 2 && index === 1) return '💡 Hint: Emily\'s images hold secrets...';
    if (hintLevel >= 3 && index === 1) return treasure.hint;
    if (hintLevel >= 4 && index === 2) return treasure.hint;

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
        className="fixed bottom-6 right-6 bg-gradient-to-br from-yellow-600 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40 group animate-bounce"
        title="Open Treasure Map"
      >
        <Map className="w-6 h-6" />
        {foundCodes.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
            {foundCodes.length}
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl border-2 border-yellow-600/50 transform animate-slideUp">

        {/* Close button */}
        <button
          onClick={() => setShowMap(false)}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors group"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl mb-4">
            <Map className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2">🗺️ Treasure Map</h2>
          <p className="text-purple-200">Find all 3 hidden discount codes!</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-purple-300 font-semibold">Progress</span>
            <span className="text-sm text-pink-400 font-bold">{foundCodes.length} / {treasures.length} Codes Found</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        {/* Treasure chests */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {treasures.map((treasure, index) => (
            <div
              key={treasure.code}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                treasure.unlocked
                  ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/50'
                  : pulseChest === index
                  ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-yellow-500 animate-pulse'
                  : 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600/50'
              }`}
            >
              {/* Chest icon */}
              <div className="text-center mb-4">
                <div className={`text-6xl mb-2 ${pulseChest === index && !treasure.unlocked ? 'animate-bounce' : ''}`}>
                  {treasure.unlocked ? <Unlock className="w-16 h-16 mx-auto text-green-400" /> : <Lock className="w-16 h-16 mx-auto text-slate-500" />}
                </div>
                <div className="text-4xl mb-2">{treasure.icon}</div>
                <h3 className="font-bold text-white mb-1">{treasure.name}</h3>
                <div className={`text-2xl font-black bg-gradient-to-r ${treasure.color} bg-clip-text text-transparent`}>
                  {treasure.code.split('').slice(-2).join('')}% OFF
                </div>
              </div>

              {/* Hint */}
              <div className="text-xs text-purple-200 text-center bg-slate-900/50 rounded-lg p-3">
                {getHintText(index, treasure)}
              </div>

              {/* Unlocked indicator */}
              {treasure.unlocked && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                  <Gift className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Victory message */}
        {foundCodes.length === treasures.length && (
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-center animate-pulse">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
            <h3 className="text-2xl font-black text-white mb-2">🎉 ALL CODES FOUND!</h3>
            <p className="text-white/90 mb-4">
              You've discovered all the hidden treasures! Use code <strong>ENCHANTED50</strong> for your biggest discount!
            </p>
            <button
              onClick={() => setShowMap(false)}
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Claim Your Prize! 🎁
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
