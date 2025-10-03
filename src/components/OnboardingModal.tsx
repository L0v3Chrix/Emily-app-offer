'use client';

import React, { useState, useEffect } from 'react';
import { X, Map, Gift, Sparkles, Trophy, ChevronRight } from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
  onOpenTreasureMap: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose, onOpenTreasureMap }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onOpenTreasureMap();
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border-2 border-besty-coral/40 transform animate-slideUp overflow-y-auto max-h-[90vh]">

        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 hover:bg-besty-mint rounded-full transition-colors group"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-besty-blue group-hover:rotate-90 transition-transform" />
        </button>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? 'w-8 bg-gradient-to-r from-besty-coral to-besty-blue'
                  : i < step
                  ? 'w-8 bg-besty-coral'
                  : 'w-8 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-besty-coral to-besty-blue rounded-2xl mb-4 animate-bounce">
              <Gift className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-besty-blue mb-4">
              Welcome to Emily's Halloween Offer! 🎃
            </h2>
            <p className="text-besty-gray text-base sm:text-lg mb-6 leading-relaxed">
              This isn't just a landing page—it's an <strong className="text-besty-blue">interactive experience</strong> designed to show you what your own app could do.
            </p>
            <div className="bg-besty-mint rounded-xl p-4 mb-6 border border-besty-coral/30">
              <p className="text-sm text-besty-gray leading-relaxed">
                As you explore, you'll discover hidden discount codes, unlock rewards, and experience the same engagement mechanics you could build into YOUR app.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Treasure Hunt */}
        {step === 2 && (
          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-besty-green to-besty-coral rounded-2xl mb-4">
              <Map className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-besty-blue mb-4">
              The Treasure Hunt 🗺️
            </h2>
            <p className="text-besty-gray text-base sm:text-lg mb-6 leading-relaxed">
              Hidden throughout this page are <strong className="text-besty-blue">3 discount codes</strong> that unlock increasing rewards:
            </p>

            {/* Three codes preview */}
            <div className="space-y-3 mb-6">
              <div className="bg-gradient-to-r from-besty-coral/20 to-besty-blue/20 border border-besty-coral/30 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">🎃</span>
                <div className="text-left flex-1">
                  <p className="text-besty-blue font-bold text-sm">SPOOKY10</p>
                  <p className="text-besty-coral text-xs">+10% OFF</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-besty-blue/20 to-besty-green/20 border border-besty-blue/30 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">👻</span>
                <div className="text-left flex-1">
                  <p className="text-besty-blue font-bold text-sm">HAUNTED20</p>
                  <p className="text-besty-coral text-xs">+20% OFF (Total: 30%)</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-besty-green/20 to-besty-coral/20 border border-besty-green/30 rounded-lg p-3 flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <div className="text-left flex-1">
                  <p className="text-besty-blue font-bold text-sm">ENCHANTED50</p>
                  <p className="text-besty-coral text-xs">+20% OFF (Total: 50%!)</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-besty-gray leading-relaxed">
              Codes <strong className="text-besty-blue">stack</strong>—find all 3 to unlock the full <span className="text-besty-green font-bold">50% Friends & Family Rate!</span>
            </p>
          </div>
        )}

        {/* Step 3: Ultimate Prize */}
        {step === 3 && (
          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-br from-besty-green to-besty-coral rounded-2xl mb-4 animate-pulse">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-besty-blue mb-4">
              The Ultimate Prize 🏆
            </h2>
            <p className="text-besty-gray text-base sm:text-lg mb-6 leading-relaxed">
              But wait—there's MORE than just discounts...
            </p>

            <div className="bg-gradient-to-br from-besty-green/20 to-besty-coral/20 border-2 border-besty-green/50 rounded-xl p-4 sm:p-5 mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-besty-green" />
                <h3 className="text-base sm:text-xl font-black text-besty-blue">100% ENGAGEMENT = ULTIMATE PRIZE</h3>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-besty-green" />
              </div>
              <p className="text-besty-blue font-bold mb-2 text-sm sm:text-base">
                Find all 3 codes <strong>AND</strong> reach 20 engagement points to unlock:
              </p>
              <p className="text-besty-green text-base sm:text-lg font-black">
                Emily covers your $99 App Store fee! 🍎
              </p>
              <p className="text-xs text-besty-gray mt-2 italic">
                (If you choose iOS App Store, the Apple Developer fee is on us!)
              </p>
            </div>

            <p className="text-sm text-besty-gray leading-relaxed mb-4">
              Earn engagement points by interacting with the page: try the quiz, explore the flip cards, watch the videos, and discover all the hidden features!
            </p>

            <div className="bg-besty-mint rounded-lg p-4 border border-besty-coral/30">
              <p className="text-xs text-besty-gray">
                💡 <strong>Pro tip:</strong> Click the floating treasure map button (bottom-right corner) anytime to check your progress and see hints!
              </p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 sm:px-6 py-3 rounded-full border-2 border-besty-coral/50 text-besty-coral font-bold hover:bg-besty-coral/10 transition-all text-sm sm:text-base"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-besty-coral to-besty-blue text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 group text-sm sm:text-base"
          >
            {step < totalSteps ? (
              <>
                Next
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Start Treasure Hunt!</span>
                <span className="sm:hidden">Start Hunt!</span>
                <Map className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </button>
        </div>

        {/* Step counter */}
        <div className="text-center mt-4">
          <p className="text-xs text-besty-gray">
            Step {step} of {totalSteps}
          </p>
        </div>

      </div>
    </div>
  );
};

export default OnboardingModal;
