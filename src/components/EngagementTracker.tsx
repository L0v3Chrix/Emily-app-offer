'use client';

import React, { useState } from 'react';
import { Trophy, Star, Zap, Target, ChevronDown, ChevronUp } from 'lucide-react';

interface EngagementTrackerProps {
  interactionScore: number;
  foundCodes: string[];
  timeOnPage: number;
  userLevel: number;
}

const EngagementTracker: React.FC<EngagementTrackerProps> = ({
  interactionScore,
  foundCodes,
  timeOnPage,
  userLevel
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate level and progress
  const calculateLevel = () => {
    if (interactionScore >= 20) return 5; // Master
    if (interactionScore >= 15) return 4; // Expert
    if (interactionScore >= 10) return 3; // Explorer
    if (interactionScore >= 5) return 2;  // Curious
    return 1; // Visitor
  };

  const getLevelInfo = (level: number) => {
    const levels = [
      { name: 'Visitor', color: 'text-gray-400', icon: '👋', nextAt: 5 },
      { name: 'Curious', color: 'text-blue-400', icon: '👀', nextAt: 10 },
      { name: 'Explorer', color: 'text-purple-400', icon: '🔍', nextAt: 15 },
      { name: 'Expert', color: 'text-pink-400', icon: '⭐', nextAt: 20 },
      { name: 'Master', color: 'text-yellow-400', icon: '👑', nextAt: null }
    ];
    return levels[level - 1];
  };

  const currentLevel = calculateLevel();
  const levelInfo = getLevelInfo(currentLevel);
  const nextLevelScore = levelInfo.nextAt || interactionScore;
  const progressToNextLevel = levelInfo.nextAt
    ? ((interactionScore % 5) / 5) * 100
    : 100;

  // Achievements
  const achievements = [
    {
      id: 'first-code',
      name: 'Treasure Hunter',
      icon: '🗺️',
      earned: foundCodes.length >= 1
    },
    {
      id: 'all-codes',
      name: 'Code Master',
      icon: '💎',
      earned: foundCodes.length === 3
    },
    {
      id: 'engaged',
      name: 'Super Engaged',
      icon: '🔥',
      earned: interactionScore >= 10
    },
    {
      id: 'time',
      name: 'Time Traveler',
      icon: '⏰',
      earned: timeOnPage >= 180 // 3 minutes
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border-2 border-belcher-orange/30 shadow-2xl">

        {/* Compact view */}
        <div
          className="p-2 sm:p-3 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-belcher-orange" />
              <div>
                <div className="text-[10px] sm:text-xs text-belcher-orange-light font-semibold hidden sm:block">Engagement</div>
                <div className="text-sm sm:text-lg font-black text-white">{interactionScore}<span className="text-xs sm:text-sm text-belcher-orange ml-0.5">pts</span></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl">{levelInfo.icon}</span>
                <span className={`text-[10px] sm:text-xs font-bold ${levelInfo.color}`}>
                  Lv.{currentLevel}
                </span>
              </div>
              <button className="text-belcher-orange hover:text-belcher-orange-light transition-colors">
                {isExpanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded view - Positioned absolutely outside parent */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsExpanded(false)}
          />
          {/* Dropdown content */}
          <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-xl rounded-2xl border-2 border-belcher-orange/30 shadow-2xl p-4 space-y-4 animate-slideUp z-50">

            {/* Level progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-belcher-orange-light font-semibold">
                  {levelInfo.name}
                </span>
                {levelInfo.nextAt && (
                  <span className="text-xs text-belcher-orange">
                    {nextLevelScore - interactionScore} pts to Lv.{currentLevel + 1}
                  </span>
                )}
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-belcher-orange-dark to-belcher-orange transition-all duration-500"
                  style={{ width: `${progressToNextLevel}%` }}
                />
              </div>
            </div>

            {/* Codes found */}
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-belcher-orange" />
                <span className="text-sm text-white font-semibold">Codes Found</span>
              </div>
              <span className="text-lg font-black text-belcher-orange">
                {foundCodes.length}/3
              </span>
            </div>

            {/* Time on page */}
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-belcher-orange-light" />
                <span className="text-sm text-white font-semibold">Time Exploring</span>
              </div>
              <span className="text-sm font-bold text-belcher-orange-light">
                {Math.floor(timeOnPage / 60)}:{(timeOnPage % 60).toString().padStart(2, '0')}
              </span>
            </div>

            {/* Achievements */}
            {earnedAchievements.length > 0 && (
              <div>
                <div className="text-xs text-belcher-orange-light font-semibold mb-2 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Achievements ({earnedAchievements.length}/{achievements.length})
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className={`p-2 rounded-lg text-center transition-all ${
                        achievement.earned
                          ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                          : 'bg-slate-800/30 border border-slate-700/30 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-[10px] text-purple-200 font-semibold leading-tight">
                        {achievement.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Motivational message */}
            <div className="text-center p-3 bg-gradient-to-r from-belcher-orange/10 to-belcher-orange-light/10 rounded-lg border border-belcher-orange/20">
              <p className="text-xs text-belcher-orange-light italic">
                {interactionScore >= 15
                  ? "🎉 You're a power user! Keep exploring!"
                  : interactionScore >= 10
                  ? "🔥 You're on fire! Keep it up!"
                  : interactionScore >= 5
                  ? "👀 Getting curious? There's more to discover..."
                  : "💡 Explore the page to unlock rewards!"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EngagementTracker;
