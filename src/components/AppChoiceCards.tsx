'use client';

import React, { useState } from 'react';
import { Smartphone, Globe, Star, Zap, TrendingUp, Clock, CheckCircle2, Sparkles } from 'lucide-react';

interface AppChoiceCardsProps {
  onInteraction: () => void;
}

const AppChoiceCards: React.FC<AppChoiceCardsProps> = ({ onInteraction }) => {
  const [selectedCard, setSelectedCard] = useState<'ios' | 'web' | null>(null);

  const handleCardClick = (type: 'ios' | 'web') => {
    setSelectedCard(selectedCard === type ? null : type);
    onInteraction();
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-400/40 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            <span className="text-xs sm:text-sm font-bold text-pink-300 tracking-wide">CHOOSE YOUR ADVENTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="block text-white mb-2">Two Paths to</span>
            <span className="block text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
              Your App Dream
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-purple-200 max-w-3xl mx-auto">
            Both get you an app. Both use cutting-edge AI. Both transform your business.
            <span className="block mt-2 font-semibold text-white">The question is: where do you want to see your app live?</span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">

          {/* iOS App Card */}
          <div
            onClick={() => handleCardClick('ios')}
            className={`group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 cursor-pointer ${
              selectedCard === 'ios'
                ? 'border-pink-400 shadow-2xl shadow-pink-500/50 scale-[1.02]'
                : 'border-slate-700/50 hover:border-pink-400/50 hover:shadow-xl hover:scale-[1.01]'
            }`}
          >
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                THE DREAM ✨
              </div>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6 mt-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 p-4 sm:p-5 rounded-2xl">
                  <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-center mb-3 text-white">
              iOS App Store App
            </h3>

            {/* Subtitle */}
            <p className="text-center text-purple-200 text-sm sm:text-base mb-6">
              Your name. Your brand. In the <span className="font-bold text-pink-400">Apple App Store.</span>
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {[
                { icon: Star, text: "Your app lives in the App Store forever" },
                { icon: TrendingUp, text: "Customers download & install on their home screen" },
                { icon: Zap, text: "Push notifications straight to their phone" },
                { icon: Sparkles, text: "Premium feel = premium positioning" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-purple-100">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* Best For */}
            <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-4 mb-4">
              <p className="text-xs sm:text-sm font-semibold text-pink-300 mb-2">✨ Perfect if you want to:</p>
              <ul className="text-xs sm:text-sm text-purple-200 space-y-1">
                <li>• See your brand in the App Store</li>
                <li>• Maximum credibility & prestige</li>
                <li>• Native mobile experience</li>
              </ul>
            </div>

            {/* Consideration */}
            <div className="bg-slate-800/50 rounded-xl p-3 sm:p-4">
              <p className="text-xs text-purple-300">
                <Clock className="inline w-3 h-3 mr-1" />
                <span className="font-semibold">Timeline:</span> Apple review process adds 7-10 days after build completion
              </p>
            </div>

            {/* Expand indicator */}
            {selectedCard === 'ios' && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-pink-400 text-sm font-bold animate-pulse">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Great choice! Let's talk about your app idea.</span>
                </div>
              </div>
            )}
          </div>

          {/* Web App Card */}
          <div
            onClick={() => handleCardClick('web')}
            className={`group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 cursor-pointer ${
              selectedCard === 'web'
                ? 'border-purple-400 shadow-2xl shadow-purple-500/50 scale-[1.02]'
                : 'border-slate-700/50 hover:border-purple-400/50 hover:shadow-xl hover:scale-[1.01]'
            }`}
          >
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                FAST & POWERFUL ⚡
              </div>
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6 mt-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 p-4 sm:p-5 rounded-2xl">
                  <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-center mb-3 text-white">
              Custom Web App
            </h3>

            {/* Subtitle */}
            <p className="text-center text-purple-200 text-sm sm:text-base mb-6">
              Works everywhere. <span className="font-bold text-purple-400">Launches immediately.</span>
            </p>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {[
                { icon: Zap, text: "Live in days, not weeks (no app store approval)" },
                { icon: Globe, text: "Works on iPhone, Android, desktop—anywhere" },
                { icon: TrendingUp, text: "Instant updates (no waiting for app store)" },
                { icon: Sparkles, text: "Can still be 'installed' to home screen" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-purple-100">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* Best For */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 mb-4">
              <p className="text-xs sm:text-sm font-semibold text-purple-300 mb-2">⚡ Perfect if you want to:</p>
              <ul className="text-xs sm:text-sm text-purple-200 space-y-1">
                <li>• Launch FAST (no approval delays)</li>
                <li>• Reach everyone (all devices)</li>
                <li>• Maximum flexibility & control</li>
              </ul>
            </div>

            {/* Consideration */}
            <div className="bg-slate-800/50 rounded-xl p-3 sm:p-4">
              <p className="text-xs text-purple-300">
                <Zap className="inline w-3 h-3 mr-1" />
                <span className="font-semibold">Timeline:</span> Can be live within days of completion—no waiting
              </p>
            </div>

            {/* Expand indicator */}
            {selectedCard === 'web' && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-purple-400 text-sm font-bold animate-pulse">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Excellent choice! Let's build something fast.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/30">
            <p className="text-base sm:text-lg md:text-xl text-white font-semibold mb-3">
              🤔 Still not sure which path is right for you?
            </p>
            <p className="text-sm sm:text-base text-purple-200">
              That's literally what our first call is for. We'll walk through your business, your audience,
              and your goals—then recommend the perfect fit. <span className="font-bold text-pink-400">Both options get you 50% off.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppChoiceCards;
