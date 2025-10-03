'use client';

import React, { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';

interface ContextualHintProps {
  hintLevel: number;
  foundCodes: string[];
  interactionScore: number;
  timeOnPage: number;
}

const ContextualHint: React.FC<ContextualHintProps> = ({
  hintLevel,
  foundCodes,
  interactionScore,
  timeOnPage
}) => {
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show hints if all codes found
    if (foundCodes.length === 3) {
      setCurrentHint(null);
      return;
    }

    // Code 1 hints (SPOOKY10)
    if (!foundCodes.includes('SPOOKY10')) {
      if (hintLevel >= 3 && timeOnPage > 180) {
        setCurrentHint("💡 Still looking for the first code? Try using your ARROW KEYS somewhere on this page...");
      } else if (hintLevel >= 2 && timeOnPage > 120) {
        setCurrentHint("🎮 Hint: Remember the Konami Code from old video games? It might work here...");
      } else if (hintLevel >= 1 && timeOnPage > 60) {
        setCurrentHint("🔍 First treasure hint: Try a classic gamer code...");
      }
      return;
    }

    // Code 2 hints (HAUNTED20)
    if (foundCodes.includes('SPOOKY10') && !foundCodes.includes('HAUNTED20')) {
      if (interactionScore < 8) {
        setCurrentHint("🔒 Keep engaging! You need 8 engagement points to unlock the next hint. (Current: " + interactionScore + ")");
      } else if (hintLevel >= 3 && timeOnPage > 240) {
        setCurrentHint("👻 Still searching? Try HOVERING or TAPPING on Emily's photos...");
      } else if (hintLevel >= 2 && timeOnPage > 180) {
        setCurrentHint("📸 Hint: Emily's images have secrets. Slow down and look closely...");
      } else if (interactionScore >= 8 && hintLevel >= 1) {
        setCurrentHint("🔍 Second treasure unlocked! Look for something hidden in the images...");
      }
      return;
    }

    // Code 3 hints (ENCHANTED50)
    if (foundCodes.includes('HAUNTED20') && !foundCodes.includes('ENCHANTED50')) {
      if (interactionScore < 15) {
        setCurrentHint("✨ Final code requires MAXIMUM engagement (15+ points). Current: " + interactionScore + ". Keep exploring!");
      } else if (hintLevel >= 4 && timeOnPage > 300) {
        setCurrentHint("🏆 Last hint: Check unexpected places—page corners, footer, anywhere you haven't clicked yet!");
      } else if (hintLevel >= 3 && timeOnPage > 240) {
        setCurrentHint("💎 You're close! Explore EVERY section, corner, and interactive element...");
      } else if (interactionScore >= 15 && hintLevel >= 2) {
        setCurrentHint("🔍 Final treasure is near! Complete ALL interactions on the page...");
      }
      return;
    }
  }, [hintLevel, foundCodes, interactionScore, timeOnPage]);

  if (!currentHint || dismissed) return null;

  return (
    <div className="fixed bottom-24 right-6 max-w-sm bg-gradient-to-br from-purple-600 to-pink-600 text-white p-4 rounded-2xl shadow-2xl border-2 border-white/20 z-40 animate-slideUp">
      <button
        onClick={() => setDismissed(true)}
        className="absolute -top-2 -right-2 bg-white text-purple-600 rounded-full p-1 hover:scale-110 transition-transform shadow-lg"
        aria-label="Dismiss hint"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <Lightbulb className="w-6 h-6 flex-shrink-0 animate-pulse text-yellow-300" />
        <p className="text-sm leading-relaxed font-medium">
          {currentHint}
        </p>
      </div>
    </div>
  );
};

export default ContextualHint;
