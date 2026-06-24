import React, { useState, useEffect } from "react";
import { 
  Tv, 
  Coins, 
  Play, 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Smartphone, 
  TrendingUp, 
  CreditCard,
  Layers,
  ArrowRight
} from "lucide-react";
import RazorpayCheckoutModal from "./RazorpayCheckoutModal";

interface OnlineCourse {
  id: string;
  title: string;
  instructor: string;
  description: string;
  coinPrice: number;
  duration: string;
  lessonsCount: number;
  bannerUrl: string;
  unlocked?: boolean;
}

export default function ELearnSection() {
  const [coins, setCoins] = useState<number>(0);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>([]);
  
  // Payment Modal Trigger State
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState(0);
  const [payPurpose, setPayPurpose] = useState("");
  const [pendingCoinsToCredit, setPendingCoinsToCredit] = useState(0);

  // Load state from localStorage
  useEffect(() => {
    const savedCoins = localStorage.getItem("ffa_wallet_coins");
    if (savedCoins) {
      setCoins(Number(savedCoins));
    } else {
      setCoins(1200); // Give 1200 coins as starting balance for prospective testing!
      localStorage.setItem("ffa_wallet_coins", "1200");
    }

    const savedPurchased = localStorage.getItem("ffa_purchased_online_courses");
    if (savedPurchased) {
      try {
        setPurchasedCourseIds(JSON.parse(savedPurchased));
      } catch (e) {}
    }
  }, []);

  const creditCoins = (amount: number) => {
    const newBal = coins + amount;
    setCoins(newBal);
    localStorage.setItem("ffa_wallet_coins", String(newBal));
  };

  const handleBuyCoins = (coinCount: number, priceRupees: number) => {
    setPayAmount(priceRupees);
    setPendingCoinsToCredit(coinCount);
    setPayPurpose(`Purchase ${coinCount} FFA Coins Pack`);
    setPayModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    creditCoins(pendingCoinsToCredit);
    setPendingCoinsToCredit(0);
  };

  const handlePurchaseCourse = (courseId: string, costCoins: number) => {
    if (coins < costCoins) {
      alert("Insufficient FFA Coins in your wallet. Please buy a Coin Pack using UPI/Razorpay below to top up.");
      return;
    }

    const newCoins = coins - costCoins;
    setCoins(newCoins);
    localStorage.setItem("ffa_wallet_coins", String(newCoins));

    const updated = [...purchasedCourseIds, courseId];
    setPurchasedCourseIds(updated);
    localStorage.setItem("ffa_purchased_online_courses", JSON.stringify(updated));

    // Play a nice digital register chime
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.connect(gain);
      gain.connect(context.destination);
      osc.frequency.setValueAtTime(659.25, context.currentTime); // E5
      osc.frequency.setValueAtTime(880, context.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.25, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.4);
      osc.start();
      osc.stop(context.currentTime + 0.45);
    } catch (e) {}

    alert(`Course unlocked successfully! Spend of ${costCoins} coins is debited from your ledger.`);
  };

  // Pre-configured online course catalog corresponding to real videos/Mzed classes
  const onlineCourses: OnlineCourse[] = [
    {
      id: "online_1",
      title: "From Script to Screens: Writing Your Micro-Series",
      instructor: "Marie Jamora (Director, Queen Sugar)",
      description: "Step-by-step masterclass on writing, shooting, and distributing vertical video series and TikTok drama under extreme turnaround cycles.",
      coinPrice: 400,
      duration: "3h 45m",
      lessonsCount: 12,
      bannerUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "online_2",
      title: "Screenwriting: Core Elements & Character Arcs",
      instructor: "Trey Ellis (Emmy-nominated Screenplay Writer)",
      description: "Master character beats, visual metaphors, conflict loops, and the strict 3-act sequence structure built for OTT buyers.",
      coinPrice: 650,
      duration: "5h 12m",
      lessonsCount: 18,
      bannerUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "online_3",
      title: "Directing Actors Workshop: Staging & Emotional Truth",
      instructor: "Julian Higgins (Academy Semifinalist, Directing Guild)",
      description: "A comprehensive deep dive on how to communicate with actors on set, resolve disputes, and block complex emotional dramatic climaxes.",
      coinPrice: 800,
      duration: "6h 30m",
      lessonsCount: 22,
      bannerUrl: "https://images.unsplash.com/photo-1516307361426-f499a51c9077?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "online_4",
      title: "Writing Screenplay Adaptations: Book to Film",
      instructor: "Robin Swicord (Oscar-nominated Writer, Little Women)",
      description: "Learn how to parse novel chapters, acquire book licensing agreements, and write high-fidelity adapted scripts.",
      coinPrice: 500,
      duration: "4h 15m",
      lessonsCount: 14,
      bannerUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "online_5",
      title: "Atmospheric Lighting Masterclass",
      instructor: "Ollie Kenchington (Master Colorist & DP)",
      description: "Craft dramatic depth, control shadows, calibrate high dynamic screens, and master DaVinci Resolve color pipelines.",
      coinPrice: 700,
      duration: "5h 45m",
      lessonsCount: 16,
      bannerUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "online_6",
      title: "Directing: Core Elements & Camera Language",
      instructor: "Marie Jamora (Award-winning Filmmaker)",
      description: "Establish tone, choose appropriate prime focal lengths, composition framing, and run dynamic camera blocking tests.",
      coinPrice: 600,
      duration: "4h 50m",
      lessonsCount: 15,
      bannerUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="elearn-portal" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-black relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/[0.015] rounded-full blur-[100px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 border-b border-neutral-900 pb-12 mb-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
            <Tv className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-extrabold">
              E-Learn Self-Paced Classes
            </span>
          </div>

          <h3 className="text-4xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
            E-Learn Online Courses &amp; Coins Wallet
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
            Browse our world-class visual academy curriculum. We've established an exclusive transactional **FFA Coin Wallet** so students can trade tokens to buy, unlock, and stream premium self-paced online classes instantly.
          </p>
        </div>

        {/* COIN WALLET COMPONENT */}
        <div className="bg-[#0b0b0c] border-2 border-amber-500/30 p-6 rounded-3xl shrink-0 w-full lg:w-96 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] rounded-full blur-[30px]" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
              <span className="text-xs font-mono font-bold text-neutral-300 uppercase">FFA COIN WALLET</span>
            </div>
            <div className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[9px] font-mono text-emerald-400 font-extrabold">
              SECURE BALANCE
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Available Token Balance</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-mono font-black text-white">{coins.toLocaleString()}</span>
              <span className="text-amber-500 text-xs font-mono font-bold">COINS</span>
            </div>
          </div>

          {/* Quick Buy coin packs */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Top Up Wallet via Razorpay</p>
            <div className="grid grid-cols-2 gap-2 text-sans">
              <button 
                onClick={() => handleBuyCoins(500, 5000)}
                className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-amber-500/40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-amber-400 font-mono">500 Coins</span>
                  <Coins className="w-3.5 h-3.5 text-neutral-500" />
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">₹5,000 INR Pack</p>
              </button>

              <button 
                onClick={() => handleBuyCoins(1500, 12000)}
                className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-amber-500/40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-amber-400 font-mono">1500 Coins</span>
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">₹12,000 INR Pack</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VISUAL COURSE COLLAGE SECTION ("add a course collage") */}
      <div className="mb-24 space-y-6">
        <div>
          <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block font-bold mb-1">
            PREMIUM EDUCATION COLLAGE
          </span>
          <h4 className="text-2xl font-serif text-white tracking-tight">
            The Filmmaker Core Collage
          </h4>
          <p className="text-xs text-neutral-400">
            A visual overview of elite cinematographic modules taught across physical soundstages and self-paced streams.
          </p>
        </div>

        {/* Collage Grid - Bento style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="relative aspect-video lg:aspect-auto lg:h-64 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-850 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Directing Actors Collage"
            />
            <div className="absolute bottom-5 left-5 z-20 space-y-1">
              <span className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-mono font-bold rounded">STAGE 01</span>
              <h5 className="text-sm font-bold text-white tracking-wide font-sans">Directing Actors</h5>
              <p className="text-[9px] text-neutral-400 font-mono">22 High-fidelity Chapters</p>
            </div>
          </div>

          <div className="relative aspect-video lg:aspect-auto lg:h-64 lg:col-span-2 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-850 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Composition Collage"
            />
            <div className="absolute bottom-5 left-5 z-20 space-y-1">
              <span className="px-2 py-0.5 bg-amber-500 text-black text-[8px] font-mono font-bold rounded">CINEMA EXCELLENCE</span>
              <h5 className="text-base font-bold text-white tracking-wide font-sans">Composition, Depth of Field &amp; Contrast</h5>
              <p className="text-[9px] text-neutral-300 font-mono">Presented by Ollie Kenchington</p>
            </div>
          </div>

          <div className="relative aspect-video lg:aspect-auto lg:h-64 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-850 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Screenwriting Collage"
            />
            <div className="absolute bottom-5 left-5 z-20 space-y-1">
              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 text-[8px] font-mono font-bold rounded border border-neutral-700">OPTICS</span>
              <h5 className="text-sm font-bold text-white tracking-wide font-sans">Screenplay Adapting</h5>
              <p className="text-[9px] text-neutral-400 font-mono">14 Elite modules</p>
            </div>
          </div>

        </div>
      </div>

      {/* ONLINE COURSE DIRECT CATALOG ROW */}
      <div className="space-y-8">
        <div>
          <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block font-bold mb-1">
            UNLOCK WITH FFA COINS
          </span>
          <h4 className="text-2xl font-serif text-white tracking-tight">
            Browse Online Masterclasses
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {onlineCourses.map(course => {
            const isUnlocked = purchasedCourseIds.includes(course.id);
            
            return (
              <div 
                key={course.id}
                className="group relative bg-[#0c0c0e] border border-neutral-900 rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl hover:border-neutral-800 transition-all"
              >
                {/* Banner image with play overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
                  <img 
                    src={course.bannerUrl} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {isUnlocked ? (
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-[0.5px]">
                      <button 
                        onClick={() => alert(`Streaming course: "${course.title}". Live lesson player loaded!`)}
                        className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-110 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-black/80 border border-neutral-800 rounded-lg text-neutral-400 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-500" /> LOCKED
                    </div>
                  )}

                  <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-amber-500 text-black text-[10px] font-mono font-black uppercase rounded shadow-lg">
                    {course.coinPrice} COINS
                  </div>
                </div>

                {/* Info Card */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest font-bold block">
                      INSTRUCTOR: {course.instructor}
                    </span>
                    <h5 className="text-base font-bold text-white tracking-wide font-sans group-hover:text-red-400 transition-colors">
                      {course.title}
                    </h5>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-900/60 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>DURATION: {course.duration}</span>
                    <span>{course.lessonsCount} LESSONS</span>
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="px-6 pb-6 pt-2">
                  {isUnlocked ? (
                    <div className="w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Unlocked &amp; Access Ready
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePurchaseCourse(course.id, course.coinPrice)}
                      className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Unlock for {course.coinPrice} Coins &rarr;
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Razorpay Gateway Portal Overlay */}
      <RazorpayCheckoutModal 
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        amount={payAmount}
        purpose={payPurpose}
        onSuccess={handlePaymentSuccess}
      />

    </section>
  );
}
