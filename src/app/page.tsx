'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Zap, Clock, Star, CheckCircle, Heart, Gift } from 'lucide-react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [foundCodes, setFoundCodes] = useState<string[]>([]);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [calculatorValue, setCalculatorValue] = useState(50);
  const [interactionScore, setInteractionScore] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState(3);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [spotsRemaining, setSpotsRemaining] = useState(5);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const halloween = new Date('2025-10-31T23:59:59');
      const now = new Date();
      const difference = halloween.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  const huntCodes = [
    { code: 'SPOOKY10', discount: '10%', hint: 'Hidden in plain sight' },
    { code: 'HAUNTED20', discount: '20%', hint: 'Engagement reveals secrets' },
    { code: 'ENCHANTED50', discount: '50%', hint: 'Only the most dedicated find this' }
  ];

  const handleCodeClick = (code: string) => {
    if (!foundCodes.includes(code)) {
      setFoundCodes([...foundCodes, code]);
      setInteractionScore(prev => prev + 3);
    }
  };

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
    setInteractionScore(prev => prev + 1);
  };

  const handleCardFlip = (index: number) => {
    setSelectedCard(selectedCard === index ? null : index);
    if (selectedCard !== index) setInteractionScore(prev => prev + 1);
  };

  const HeelIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="heelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#f97316', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <path d="M 75 25 Q 72 35, 68 45 L 65 55 Q 63 65, 60 70 L 45 85 L 30 85 L 28 75 L 40 65 L 38 55 Q 35 45, 32 35 L 30 25 Q 32 20, 35 18 L 70 18 Q 73 20, 75 25 Z" 
            fill="url(#heelGrad)" stroke="#fff" strokeWidth="2"/>
      <circle cx="85" cy="22" r="8" fill="#fbbf24" opacity="0.8"/>
      <path d="M 83 19 L 87 19 L 85 25 Z" fill="#fff"/>
    </svg>
  );

  const MartiniIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="martiniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#a855f7', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <path d="M 30 20 L 70 20 L 50 60 L 50 80 L 40 80 L 40 85 L 60 85 L 60 80 L 50 80 L 50 60 Z" 
            fill="url(#martiniGrad)" stroke="#fff" strokeWidth="2"/>
      <circle cx="50" cy="50" r="4" fill="#34d399"/>
      <path d="M 25 15 L 75 15" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="78" cy="18" r="6" fill="#f97316" opacity="0.6"/>
      <path d="M 76 16 L 80 16 L 78 20 Z" fill="#fff"/>
    </svg>
  );

  const LaptopHeelIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <rect x="25" y="30" width="50" height="35" rx="2" fill="url(#laptopGrad)" stroke="#fff" strokeWidth="2"/>
      <rect x="27" y="32" width="46" height="28" fill="#1e293b"/>
      <rect x="20" y="65" width="60" height="5" rx="1" fill="url(#laptopGrad)" stroke="#fff" strokeWidth="1"/>
      <path d="M 70 75 Q 68 80, 65 85 L 55 95 L 50 95 L 52 88 L 60 82 L 58 75 Z" 
            fill="#f97316" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="82" cy="25" r="7" fill="#fbbf24" opacity="0.8"/>
      <path d="M 80 23 L 84 23 L 82 28 Z" fill="#fff"/>
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="briefcaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#f97316', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#a855f7', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <rect x="20" y="40" width="60" height="40" rx="4" fill="url(#briefcaseGrad)" stroke="#fff" strokeWidth="2"/>
      <rect x="40" y="30" width="20" height="10" fill="url(#briefcaseGrad)" stroke="#fff" strokeWidth="2"/>
      <rect x="45" y="55" width="10" height="15" rx="1" fill="#1e293b"/>
      <circle cx="15" cy="25" r="8" fill="#ec4899" opacity="0.7"/>
      <circle cx="85" cy="70" r="6" fill="#fbbf24" opacity="0.7"/>
      <path d="M 83 68 L 87 68 L 85 73 Z" fill="#fff"/>
    </svg>
  );

  const possibilities = [
    {
      title: "Your Client Discovery Quiz",
      description: "They answer 5-7 fun questions about their style, needs, or goals",
      benefit: "You instantly know if they're your ideal client before the first call"
    },
    {
      title: "Your ROI Calculator",
      description: "They see the exact value of working with you in dollars",
      benefit: "They're already sold on the investment before you even talk"
    },
    {
      title: "Your Booking Experience",
      description: "They see your calendar, pick a time, pay a deposit—all in 90 seconds",
      benefit: "No more back-and-forth emails. They book. You show up. You close."
    },
    {
      title: "Your Gamified Hunt",
      description: "They explore your site/social finding hidden surprises and unlocking rewards",
      benefit: "They spend 10x longer engaging with your brand than any PDF ever achieved"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/80 to-pink-950/40 text-white">
      
      {/* Fixed Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-2xl py-3 shadow-lg shadow-purple-500/20' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles className="text-pink-400" size={28} />
            <span className="font-black text-xl md:text-2xl tracking-tight">Emily's Circle</span>
          </div>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-5 py-2.5 md:px-7 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg shadow-pink-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2">
            Reserve Spot ({spotsRemaining} left)
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6 md:px-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-400/40 rounded-full px-6 py-3 mb-10">
            <span className="text-2xl">🎃</span>
            <span className="text-sm font-bold text-pink-300 tracking-wide">EMILY'S FRIENDS-ONLY HALLOWEEN SPECIAL</span>
            <span className="text-2xl">👻</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-3">
              Imagine Waking Up to
            </span>
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              50+ New Qualified Leads
            </span>
          </h1>

          <div className="max-w-4xl mx-auto mb-12 space-y-4">
            <p className="text-2xl md:text-3xl text-purple-200 leading-relaxed">
              You didn't send a single email. You didn't post on social. You didn't lift a finger.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
              Your custom-branded app did it all while you slept.
            </p>
          </div>

          {/* Interactive Component #1: Quick Value Slider */}
          <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
            <h3 className="text-xl font-bold mb-4 text-purple-200">👉 Try This: Interactive Value Demo</h3>
            <p className="text-sm text-purple-300 mb-4">How many qualified leads per month would transform your business?</p>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={sliderValue} 
              onChange={(e) => {
                setSliderValue(Number(e.target.value));
                setInteractionScore(prev => prev + 0.1);
              }}
              className="w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <div className="mt-4 text-center">
              <div className="text-5xl font-black text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text mb-2">
                {sliderValue * 50}
              </div>
              <div className="text-sm text-purple-300">qualified leads per month = ${(sliderValue * 50 * 500).toLocaleString()} potential revenue</div>
            </div>
            <p className="text-xs text-purple-400 mt-4 italic">This is the kind of calculator your prospects could be using right now to see their ROI with YOU.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-10">
            <button className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-10 py-5 rounded-full font-bold text-lg md:text-xl shadow-2xl shadow-pink-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3">
              Reserve My Spot - $99 Deposit
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
            </button>
          </div>

          <p className="text-sm text-purple-300 mb-6">
            $99 non-refundable deposit secures your spot • Applies to final price of $6,000
          </p>

          <div className="flex items-center justify-center gap-3 text-pink-300 mb-3">
            <Clock size={18} />
            <span className="text-sm font-semibold">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m until offer expires • Limited to 8 Tampa bosses
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-pink-400">
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${i < spotsRemaining ? 'bg-pink-400 animate-pulse' : 'bg-slate-600'}`}
                ></div>
              ))}
            </div>
            <span className="text-sm font-bold">{spotsRemaining} spots remaining</span>
          </div>
        </div>
      </section>

      {/* The Shift Section */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl p-10 md:p-16 border border-slate-700/50 shadow-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-tight">
              You've Already Noticed<br />
              <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">Something's Changed Online</span>
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed">
              <p>The brands you admire aren't just posting content anymore.</p>
              <p>They're creating <span className="text-purple-400 font-bold">experiences</span>. Interactive tools. Apps that do the selling for them.</p>
              
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-xl p-6 my-6">
                <p className="text-white font-bold text-xl mb-2">💡 Consider this:</p>
                <p className="text-purple-200">
                  The average person spends <span className="text-pink-400 font-bold">8 seconds</span> reading a static post. But interactive content? They'll engage for <span className="text-pink-400 font-bold">2-3 minutes or more</span>. That's 20x the attention on your business.
                </p>
              </div>
              
              <p className="text-xl md:text-2xl text-white font-bold pt-4">And here's the exciting part...</p>
              <p className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-pink-500 bg-clip-text">
                You can do this too. And it's way more affordable than you think.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section - Emily's Actual Work */}
      <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-slate-800 via-pink-950/30 to-purple-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Emily's Photo - Image 1 (playful, throwing things) */}
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/30 shadow-2xl">
                  <div className="aspect-[3/4] bg-gradient-to-br from-pink-200/10 to-blue-200/10 rounded-3xl border-4 border-pink-500/30 overflow-hidden shadow-2xl">
                    <img
                      src="/emily-playful.jpg"
                      alt="Emily Handren playfully tossing colorful pens in the air"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-2xl font-black text-lg shadow-xl rotate-3">
                    Your Bestie, Emily! 💜
                  </div>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-400/40 rounded-full px-5 py-2 mb-6">
                <Sparkles className="text-pink-400" size={20} />
                <span className="text-sm font-bold text-pink-300">REAL EXAMPLE</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                <span className="text-white">This is What </span>
                <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">Custom Looks Like</span>
              </h2>

              <div className="space-y-5 text-lg text-purple-200 leading-relaxed">
                <p className="text-xl text-white font-bold">
                  See that tablet? That's Emily's own "Financial Journey, Simplified" roadmap.
                </p>
                <p>
                  She created a visual, step-by-step guide that her clients can interact with. It's not a boring PDF. It's not a generic template.
                </p>
                <p className="text-xl font-bold text-pink-300">
                  It's a custom tool that positions her as THE expert and makes her clients excited to work with her.
                </p>
                <p>
                  This is exactly the kind of thing we can build for YOUR business. A quiz, a calculator, a booking flow, a discovery tool—whatever fits your unique model.
                </p>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-xl p-6 mt-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={24} />
                    <p className="text-green-100 font-semibold">
                      When Emily shares this with prospects, they don't just see a service—they experience her expertise. That's the power of interactive tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Meta Fourth Wall Break */}
      <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-purple-950 to-pink-950/30">
        <div className="max-w-6xl mx-auto">
          
          {/* Emily's Photo & Message Section */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            {/* Image of Emily's tablet */}
            <div className="flex-shrink-0 w-full md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/30 shadow-2xl">
                  <img
                    src="/emily-tablet.jpg"
                    alt="Emily's custom financial roadmap on tablet"
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6 cursor-pointer hover:scale-110 transition-transform"
                onDoubleClick={() => handleCodeClick('SPOOKY10')}
                title="Something magical happens if you double-click..."
              >
                <span className="text-4xl select-none">🎃</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Wait... Let's Talk About<br />
                <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">This Page You're On Right Now</span>
              </h2>
              
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-pink-500/30 space-y-6 text-lg md:text-xl text-purple-200 leading-relaxed">
                <p className="text-2xl font-bold text-white">
                  We built this entire landing page just for Emily's group.
                </p>
                <p>
                  Custom design. Interactive elements. Smooth animations. Even a hidden scavenger hunt with real discount codes worth up to 50% off.
                </p>
                <p className="text-xl md:text-2xl font-black text-white">
                  This is just the <span className="text-pink-400">special offer page</span>.
                </p>
                <p className="text-3xl font-black text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-pink-500 bg-clip-text pt-4">
                  Imagine what we'll build for YOUR actual business when you're our client.
                </p>
              </div>
            </div>
          </div>

          {/* Emily's Personal Testimonial Card */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-2 border-pink-500/30">
            <div className="flex items-start gap-6">
              {/* Small circular headshot - Image 2 */}
              <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-pink-400/60 shadow-lg">
                <img 
                  src="/emily-magnifying.jpg"
                  alt="Emily Handren"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-pink-400 fill-pink-400" size={20} />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-white font-bold mb-4 italic">
                  "As a fellow Tampa entrepreneur, I know how hard it is to stand out..."
                </p>
                <p className="text-lg text-purple-200 leading-relaxed mb-4">
                  This team didn't just talk about possibilities—they SHOWED me by building this entire custom page just to demonstrate what they can do. If this is what they create for a special offer, imagine what they'll build for your actual business!
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-bold text-white text-lg">Emily Handren</p>
                    <p className="text-purple-400 text-sm">Founder, BESTY Bookkeepers • Tampa, FL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Possibility Examples with Interactive Components */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-pink-950/30 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">What Could </span>
              <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">Your App</span>
              <span className="text-white"> Do?</span>
            </h2>
            <p className="text-xl md:text-2xl text-purple-300 max-w-3xl mx-auto">Close your eyes and imagine these scenarios for YOUR business...</p>
          </div>

          {/* Interactive Component #2: Quiz Demo */}
          <div className="max-w-3xl mx-auto mb-16 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-10 border-2 border-purple-500/30">
            <div className="w-20 h-20 mb-6 mx-auto">
              <HeelIcon />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">Try It: Your Client Discovery Quiz</h3>
            <p className="text-purple-300 text-center mb-8">This is a simple example. Yours would be fully custom and branded.</p>
            
            {!quizAnswer ? (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-white mb-4">What's your biggest business challenge right now?</p>
                {['Getting more qualified leads', 'Converting leads to clients', 'Standing out from competitors', 'Automating my processes'].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(option)}
                    className="w-full bg-slate-700/50 hover:bg-pink-500/20 border border-slate-600 hover:border-pink-500 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.02]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-xl p-6 text-center">
                <CheckCircle className="inline-block text-green-400 mb-3" size={48} />
                <p className="text-xl font-bold text-white mb-3">Perfect! You selected: "{quizAnswer}"</p>
                <p className="text-purple-200">Now imagine: Based on this answer, your app could instantly recommend the perfect service package, show pricing, and book a consultation. All automatic.</p>
              </div>
            )}
          </div>

          {/* Interactive Component #3: Flip Cards */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-16">
            {possibilities.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardFlip(idx)}
                className="group cursor-pointer perspective-1000"
              >
                <div className={`relative transition-all duration-500 transform-style-3d ${selectedCard === idx ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 ${selectedCard === idx ? 'hidden' : 'block'}`}>
                    <div className="w-20 h-20 mb-6">
                      {idx === 0 && <HeelIcon />}
                      {idx === 1 && <MartiniIcon />}
                      {idx === 2 && <LaptopHeelIcon />}
                      {idx === 3 && <BriefcaseIcon />}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-purple-300 leading-relaxed mb-4">{item.description}</p>
                    <div className="text-pink-400 font-semibold flex items-center gap-2">
                      Click to see the benefit <ArrowRight size={20} />
                    </div>
                  </div>

                  {/* Back */}
                  <div className={`bg-gradient-to-br from-purple-800/80 to-pink-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-purple-500 ${selectedCard === idx ? 'block' : 'hidden'}`}>
                    <Heart className="text-pink-300 mb-6" size={48} />
                    <h3 className="text-2xl font-bold mb-4 text-white">The Benefit:</h3>
                    <p className="text-xl text-purple-100 leading-relaxed mb-6">{item.benefit}</p>
                    <div className="text-pink-300 font-semibold flex items-center gap-2">
                      Click again to flip back <ArrowRight size={20} className="rotate-180" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Component #4: Progress Tracker for Scavenger Hunt */}
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-pink-500/30">
            <Gift className="text-pink-400 mx-auto mb-6" size={48} />
            <h3 className="text-2xl font-bold mb-4 text-center">🎃 Secret Discount Hunt Active!</h3>
            <p className="text-purple-300 text-center mb-6">
              There are 3 secret discount codes hidden throughout this page. Each code unlocks a different discount level. Find the biggest one and save up to 50%!
            </p>
            
            <div className="space-y-3 mb-6">
              {huntCodes.map((item, idx) => {
                const isFound = foundCodes.includes(item.code);
                return (
                  <div key={item.code} className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-4">
                    {isFound ? (
                      <>
                        <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
                        <div className="flex-1">
                          <span className="text-green-400 font-bold block">{item.code}</span>
                          <span className="text-green-300 text-xs">{item.discount} off your build</span>
                        </div>
                        <span className="text-green-300 text-sm font-semibold">FOUND!</span>
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 border-2 border-slate-600 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <span className="text-slate-500">Hidden Code #{idx + 1}</span>
                          <span className="text-slate-600 text-xs block">{item.discount} discount</span>
                        </div>
                        <span className="text-slate-600 text-xs">{item.hint}</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {foundCodes.length === 3 && (
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl text-center animate-pulse">
                🎉 LEGENDARY! You found all 3! Use the 50% code at checkout!
              </div>
            )}

            {foundCodes.length > 0 && foundCodes.length < 3 && (
              <p className="text-center text-purple-400 text-sm">
                {foundCodes.length}/3 found • The more you interact, the more you discover...
              </p>
            )}

            <p className="text-xs text-purple-500 mt-6 text-center italic">
              This is EXACTLY the kind of gamified experience we could build for your business. Imagine your customers hunting for deals across your entire digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* The Offer */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-3xl blur-xl opacity-30"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-slate-700/50">
              
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6">
                  <Star className="text-white" size={40} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-4">
                  <span className="text-white">Emily's Circle </span>
                  <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">Exclusive</span>
                </h2>
                <div className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text mb-4">
                  50% OFF
                </div>
                <p className="text-xl md:text-2xl text-purple-300 mb-6">Because you're in Emily's network of unstoppable Tampa women</p>
                
                {/* Pricing Breakdown */}
                <div className="max-w-lg mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-pink-500/30">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                    <span className="text-purple-300">Regular Investment:</span>
                    <span className="text-xl font-bold text-slate-500 line-through">$12,000+</span>
                  </div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                    <span className="text-purple-300">Emily's Circle Price:</span>
                    <span className="text-2xl font-black text-green-400">$6,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Reserve Today:</span>
                    <span className="text-3xl font-black text-pink-400">$99</span>
                  </div>
                  <p className="text-xs text-purple-400 mt-4 text-center">
                    Non-refundable deposit • Applied to final balance • Secures your spot
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
                  <Zap className="text-pink-400 mb-4" size={36} />
                  <h3 className="text-xl font-bold mb-3">Fully Custom. Zero Templates.</h3>
                  <p className="text-purple-300 leading-relaxed">
                    Built specifically for YOUR business model, YOUR brand, YOUR dream client experience. Our U.S.-based team brings your vision to life.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
                  <TrendingUp className="text-pink-400 mb-4" size={36} />
                  <h3 className="text-xl font-bold mb-3">AI-Powered Possibilities</h3>
                  <p className="text-purple-300 leading-relaxed">
                    What used to cost $100K+ and take 6 months? We can build in 60-90 days at a fraction of the cost thanks to modern AI tools combined with human expertise.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
                  <Sparkles className="text-purple-400 mb-4" size={36} />
                  <h3 className="text-xl font-bold mb-3">Engagement That Converts</h3>
                  <p className="text-purple-300 leading-relaxed">
                    Quizzes that qualify. Calculators that pre-sell. Booking tools that close. Gamified experiences that create brand obsession. Real results.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
                  <Clock className="text-green-400 mb-4" size={36} />
                  <h3 className="text-xl font-bold mb-3">Launch Q1 2026</h3>
                  <p className="text-purple-300 leading-relaxed">
                    Start the new year with your custom app already live and working for you while others are still planning their "content strategy."
                  </p>
                </div>
              </div>

              {/* Hunt Code #3 Hidden */}
              <div className="text-center mb-12">
                <div className="inline-block opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => handleCodeClick('EMILY10')}>
                  <span className="text-xs text-purple-800">🎃 {foundCodes.includes('EMILY10') ? '✓ Final code: EMILY10' : '...'}</span>
                </div>
              </div>

              {/* Interactive Component #5: Engagement Score */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-2xl p-6 mb-10">
                <h4 className="text-lg font-bold mb-3 text-center">Your Engagement Score on This Page:</h4>
                <div className="w-full bg-slate-900 rounded-full h-4 mb-3">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                    style={{width: `${Math.min((interactionScore / 12) * 100, 100)}%`}}
                  ></div>
                </div>
                <p className="text-center text-sm text-purple-300 mb-3">
                  {interactionScore < 4 && "You're just getting started! Try the interactive elements above."}
                  {interactionScore >= 4 && interactionScore < 8 && "Nice! You're engaging. This is exactly what YOUR app would track."}
                  {interactionScore >= 8 && interactionScore < 12 && "🔥 You're ALL IN! This is the kind of engagement your business needs!"}
                  {interactionScore >= 12 && "🌟 LEGENDARY ENGAGEMENT! You're exactly who we love working with!"}
                </p>
                
                {interactionScore >= 8 && !foundCodes.includes('HAUNTED20') && (
                  <div 
                    className="mt-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/50 rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform animate-pulse"
                    onClick={() => handleCodeClick('HAUNTED20')}
                  >
                    <p className="text-center text-purple-200 text-sm mb-2">👻 Your engagement unlocked something...</p>
                    <p className="text-center text-pink-400 font-bold">Click here to reveal your reward!</p>
                  </div>
                )}
                
                {foundCodes.includes('HAUNTED20') && (
                  <div className="mt-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-xl p-4">
                    <p className="text-center text-green-400 font-bold">✓ Code revealed: HAUNTED20</p>
                    <p className="text-center text-green-300 text-sm">20% off for being truly engaged!</p>
                  </div>
                )}
              </div>

              {/* Guarantee Box */}
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-8 mb-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-black text-white mb-3">Our Commitment to You</h4>
                    <p className="text-lg text-green-100 leading-relaxed mb-3">
                      We only take on projects where we know we can deliver exceptional value. If during our strategy session we don't think a custom app is right for you right now, we'll tell you honestly—even if it means we don't work together.
                    </p>
                    <p className="text-green-200 font-semibold">
                      Your success is more important to us than making a sale.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-12 py-6 rounded-full font-bold text-2xl md:text-3xl shadow-2xl shadow-pink-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-4 mb-4">
                  Yes! Reserve My Spot ($99)
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={32} />
                </button>
                <p className="text-purple-400 text-sm mb-2">✨ Includes free 30-min strategy session • Zero pressure • All possibility</p>
                <p className="text-pink-400 text-xs font-bold flex items-center justify-center gap-2">
                  <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                  Only {spotsRemaining} spots left for Emily's network
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-8 border-y border-purple-500/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-purple-300">
            <div className="flex items-center gap-3">
              <Star className="text-pink-400" size={24} />
              <span className="font-semibold">U.S.-Based Team</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-pink-400" size={24} />
              <span className="font-semibold">60-90 Day Builds</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-pink-400" size={24} />
              <span className="font-semibold">Tampa Women First</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-pink-950/40 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
            <span className="text-white">Questions You're </span>
            <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">Probably Asking</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Why is this 50% off?",
                a: "Because you're in Emily's circle! Emily connected us with her network of incredible Tampa women entrepreneurs. We want to support her community with an exclusive friends-and-family rate. Plus, we're building our portfolio with businesses we believe in."
              },
              {
                q: "What if I don't know exactly what I want yet?",
                a: "Perfect! That's what the free strategy call is for. We'll brainstorm together based on YOUR specific business model, dream clients, and goals. Most clients come to us with a rough idea and we help crystallize it into something amazing."
              },
              {
                q: "Do I need to be tech-savvy?",
                a: "Not at all! We handle everything. You tell us what you want your app to do, we build it, and we make it simple for you to use. If you can send an email, you can manage your custom app."
              },
              {
                q: "What's included in the build?",
                a: "Everything you need: custom design matching your brand, full development, testing, launch support, and training. You own it 100%. We can also discuss ongoing maintenance packages if you want us to handle updates."
              },
              {
                q: "Can I really launch by Q1 2026?",
                a: "Yes! If you reserve your spot now, we start in November, and 60-90 days puts you right in that Q1 2026 timeframe. That means you start the new year with a powerful tool already working for you."
              },
              {
                q: "What if I'm not sure this is right for my business?",
                a: "That's exactly why we start with a free strategy session! We'll be honest about whether a custom app makes sense for you right now. We only want to work with businesses where we know we can create real value."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-pink-500/30 transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">{faq.q}</h3>
                <p className="text-lg text-purple-200 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-purple-300 text-lg">
              Still have questions? <span className="text-pink-400 font-bold">That's what the free strategy call is for!</span> Zero pressure, all answers.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-slate-950 via-purple-950 to-pink-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl animate-bounce">🎃</div>
          <div className="absolute bottom-10 right-10 text-9xl animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-8">
            <Clock className="text-white" size={48} />
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            This Special Ends
            <br />
            <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">Halloween Midnight</span>
          </h2>

          <div className="max-w-3xl mx-auto mb-12 space-y-6 text-lg md:text-xl text-purple-200">
            <p className="text-2xl text-white font-bold">
              By November 1st, this 50% discount is gone.
            </p>
            <p className="text-xl">
              Meanwhile, the women in Emily's circle who said yes? They'll be 60-90 days into their custom app build.
            </p>
            <p className="text-2xl font-bold text-white">
              By Q1 2026, their apps will be live, generating leads, and changing their businesses...
            </p>
            <p className="text-pink-400 font-bold text-2xl">
              And you'll be thinking "I wish I had jumped on this when I had the chance."
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50 mb-12">
            <h3 className="text-3xl font-black mb-10 text-white">Your Simple Next Steps:</h3>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-2xl text-2xl mb-6 mx-auto md:mx-0">1</div>
                <h4 className="font-bold text-xl mb-3 text-white">Free Strategy Call</h4>
                <p className="text-purple-300 leading-relaxed">
                  30 minutes. We dream together about what's possible for YOUR specific business. No pitch. Just brainstorming.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-2xl text-2xl mb-6 mx-auto md:mx-0">2</div>
                <h4 className="font-bold text-xl mb-3 text-white">Custom Blueprint</h4>
                <p className="text-purple-300 leading-relaxed">
                  We map out your perfect app—quiz, calculator, booking tool, gamified experience, or something totally unique to you.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-2xl text-2xl mb-6 mx-auto md:mx-0">3</div>
                <h4 className="font-bold text-xl mb-3 text-white">We Build It</h4>
                <p className="text-purple-300 leading-relaxed">
                  60-90 days later, your custom app launches. It starts working for you 24/7, capturing leads while you focus on what you do best.
                </p>
              </div>
            </div>
          </div>

          <button className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-12 md:px-16 py-6 md:py-7 rounded-full font-bold text-2xl md:text-3xl shadow-2xl shadow-pink-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-4 mb-6">
            Yes! I Want This ($99 Deposit)
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={36} />
          </button>

          <p className="text-purple-300 text-sm mb-4">
            Non-refundable $99 secures your October build • Applied to final project cost
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-purple-400 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span>Only {spotsRemaining} of 8 spots left for Emily's network</span>
            </div>
            <div className="hidden sm:block text-purple-600">•</div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m remaining</span>
            </div>
          </div>

          <p className="text-xs text-purple-500 mt-4">
            🎃 Found a discount code? Apply it after you reserve your spot!
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 px-6 md:px-12 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          
          {/* Meet Emily Section */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-10 md:p-12 border border-slate-700/50">
              
              {/* Text Content First */}
              <div className="flex-1">
                <div className="inline-block bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/40 rounded-full px-6 py-2 mb-6">
                  <span className="text-sm font-bold text-pink-300">FROM YOUR HOST</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black mb-4 text-white">
                  Meet Emily Handren
                </h3>
                <p className="text-xl font-semibold text-purple-300 mb-6">
                  Founder of BESTY Bookkeepers • Tampa Entrepreneur
                </p>
                
                <div className="space-y-4 text-lg text-purple-200 leading-relaxed">
                  <p>
                    "I started BESTY because I saw entrepreneurs drowning in bookkeeping instead of growing their businesses."
                  </p>
                  <p>
                    "When I saw what's possible with custom apps—tools that work FOR you instead of you working for them—I knew my network needed to see this."
                  </p>
                  <p className="text-white font-bold">
                    This Halloween special is my gift to the Tampa women who inspire me every day. 🎃
                  </p>
                </div>
              </div>

              {/* Emily's Photo - Image 4 (relaxed with laptop) */}
              <div className="flex-shrink-0 w-full md:w-2/5">
                <div className="relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-pink-200/10 to-slate-700/20 rounded-3xl border-4 border-purple-500/30 overflow-hidden shadow-2xl">
                    <img 
                      src="/emily-laptop.jpg"
                      alt="Emily Handren at her desk"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded-full shadow-2xl">
                    <Heart className="text-white" size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
            <span className="text-white">What Emily's Circle </span>
            <span className="text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">Is Saying</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-pink-400 fill-pink-400" size={20} />
                ))}
              </div>
              <p className="text-purple-200 leading-relaxed mb-6 italic">
                "I've been talking about creating something interactive for my clients for over a year. This team made it happen in 90 days. Game changer."
              </p>
              <div className="text-sm">
                <div className="font-bold text-white">Jessica M.</div>
                <div className="text-purple-400">Marketing Consultant, Tampa</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-pink-400 fill-pink-400" size={20} />
                ))}
              </div>
              <p className="text-purple-200 leading-relaxed mb-6 italic">
                "The ROI calculator they built for me pre-sells my services before I even get on a call. My close rate has never been higher."
              </p>
              <div className="text-sm">
                <div className="font-bold text-white">Alicia R.</div>
                <div className="text-purple-400">Business Coach, St. Petersburg</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-pink-400 fill-pink-400" size={20} />
                ))}
              </div>
              <p className="text-purple-200 leading-relaxed mb-6 italic">
                "I thought custom apps were only for huge companies with massive budgets. Turns out, small businesses can play in this space too. So grateful."
              </p>
              <div className="text-sm">
                <div className="font-bold text-white">Carmen L.</div>
                <div className="text-purple-400">Interior Designer, Tampa Bay</div>
              </div>
            </div>
          </div>

          <p className="text-center text-purple-600 text-xs mt-8 italic">
            These testimonials represent feedback we've received. Individual results will vary based on your business model and implementation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 md:py-16 border-t border-purple-900/30 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Final urgency reminder */}
          <div className="text-center mb-8 pb-8 border-b border-purple-900/30">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-400/40 rounded-full px-6 py-3 mb-4">
              <Clock className="text-pink-400" size={20} />
              <span className="text-pink-300 font-bold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m until 50% OFF expires
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${i < spotsRemaining ? 'bg-pink-400' : 'bg-slate-700'}`}
                  ></div>
                ))}
              </div>
              <span className="text-purple-300 text-sm">{spotsRemaining}/8 spots remaining</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-purple-400 text-sm space-y-3">
              <p className="font-semibold">Exclusively for women business owners in Emily's Tampa networking circle</p>
              <p className="text-purple-600">Custom app development • U.S.-based team • AI-powered • Built with possibility</p>
              <div className="relative mt-8">
                <p 
                  className="text-[8px] text-slate-950 hover:text-pink-500 transition-colors cursor-pointer select-none inline-block"
                  onClick={() => handleCodeClick('ENCHANTED50')}
                  title="The most dedicated hunters find the greatest treasures"
                >
                  ENCHANTED50
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
