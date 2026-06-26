import React, { useState } from "react";
import { 
  ShieldCheck, 
  Film, 
  Tv, 
  Users, 
  ChevronRight, 
  Sparkles, 
  Play, 
  Layers, 
  Zap, 
  Globe, 
  CheckCircle,
  HelpCircle,
  Eye,
  ArrowUp,
  Award
} from "lucide-react";

interface UltimateStudentYieldsProps {
  onNavigateToDashboard?: (initialTab?: string) => void;
}

export default function UltimateStudentYields({ onNavigateToDashboard }: UltimateStudentYieldsProps) {
  const [activeYieldTab, setActiveYieldTab] = useState<string>("co-directing");

  const yieldCards = [
    {
      id: "co-directing",
      num: "01",
      title: "Co-Directing Feature Film",
      highlight: "POWER MOVE",
      tagline: 'Co-direct a professional theatrical feature film within 1 year!',
      desc: "Guarantees your fastest ticket into OTT catalogs (including MUVIREEL.COM) & major global film festivals (Cannes, TIFF, MAMI). Lead real sets alongside Hemant Nilim Das.",
      metric: "Lifetime IMDB Co-Director Listings",
      icon: <Film className="w-5 h-5 text-red-500" />
    },
    {
      id: "private-banner",
      num: "02",
      title: "Your Private Ltd. Banner",
      highlight: "LEGAL ASSET",
      tagline: "A registered Indian Private Limited production firm in your name.",
      desc: "Graduate with an incorporation license to legally invoice global brands, secure Indian government film subsidies, and hold copyright ownership of your features.",
      metric: "100% Legal Title Ownership Secured",
      icon: <ShieldCheck className="w-5 h-5 text-red-500" />
    },
    {
      id: "ai-production-stack",
      num: "03",
      title: "AI Production Blueprint",
      highlight: "2026 STACK",
      tagline: "Rapid script-to-performance generative artificial engine suites.",
      desc: "Master the hyper-efficient tools to write pitch scripts, draft precise set budget breakdowns, design instant visual storyboards, and command automated media networks.",
      metric: "Guerrilla Budget Optimization Kit",
      icon: <Zap className="w-5 h-5 text-red-400" />
    }
  ];

  const milestones = [
    {
      step: "01",
      title: "Story matching & Pair Selection",
      details: "You are paired based on thematic specialization (Neo-Noir, Suspenes Drama, Commercial Rom-Com)."
    },
    {
      step: "02",
      title: "Active Dual Screen Commands",
      details: "Lead actual high-budget camera sets under the direct command structure and mentorship of Hemant Nilim Das."
    },
    {
      step: "03",
      title: "Multi-Channel Distribution Sweep",
      details: "Gain live entry into regional theaters, global festival showcases, and our proprietary MUVIREEL.COM catalog."
    }
  ];

  return (
    <section id="yields" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-neutral-950 relative overflow-hidden">
      
      {/* EXTREMELY ELEGANT RED VELVET AND METALLIC EMBOSS TEXTURES */}
      <div className="absolute inset-0 bg-[radial-gradient(#ef4444_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-[0.035] pointer-events-none" />
      <span className="absolute top-[20%] right-[-100px] w-96 h-96 bg-red-600/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <span className="absolute bottom-[10%] left-[-100px] w-96 h-96 bg-red-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Title Header with Elegant Red details */}
      <div className="text-center max-w-4xl mx-auto mb-16 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-505/10 border border-red-500/20 rounded-full mb-4">
          <Award className="w-3.5 h-3.5 text-red-500" />
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-extrabold">
            Ultimate Student Yields
          </span>
        </div>

        {/* Cormorant Garamond elegant serif title */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif text-white tracking-tight leading-[1.1] mb-6 uppercase">
          THE INDUSTRY BENEFITS OF THIS FILMFLUENCER COURSE
        </h3>

        <div className="w-16 h-[1px] bg-red-600/60 mx-auto mb-6" />

        <div className="flex justify-center mt-6">
          <a
            href="#know-process-button"
            className="inline-flex items-center gap-3.5 px-8 py-4.5 rounded-2xl border border-amber-500/30 hover:border-amber-400 bg-neutral-950/80 hover:bg-neutral-950 text-neutral-200 hover:text-white transition-all duration-300 font-mono text-xs sm:text-sm uppercase tracking-widest leading-relaxed shadow-xl shadow-amber-500/5 hover:shadow-amber-500/10 group cursor-pointer max-w-xl mx-auto"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold tracking-[0.18em] text-amber-400 group-hover:text-amber-300 text-center">
              Know the process of being a branded filmmaker
            </span>
            <ArrowUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>
      </div>

      {/* NEW HERO STAND-BY BANNER - STRIKING RED & CHARCOAL DESIGN */}
      <div className="max-w-6xl mx-auto mb-16 bg-gradient-to-br from-[#120a0a] via-[#1c0f0f] to-[#070404] border border-red-900/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/[0.02] rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-red-500/[0.015] rounded-full blur-[60px] pointer-events-none" />
        
        {/* Glowing red accent marker on top-left of banner */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80" />

        <div className="max-w-2xl space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-500 text-black text-[9px] font-mono font-bold rounded uppercase tracking-wider">
            EXCLUSIVE ACADEMY BLUEPRINT
          </div>
          
          <h4 className="text-2xl sm:text-3.5xl md:text-4xl font-serif text-white tracking-tight leading-[1.15]">
            Power-move <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-red-500 font-bold italic">&ldquo;Co-Directing&rdquo;</span> a feature film within 1 year!
          </h4>
          
          <span className="text-base sm:text-lg font-serif text-red-200 block italic leading-relaxed font-light">
            Your &ldquo;fastest&rdquo; Ticket to OTT platforms and premium Global Film Festivals!
          </span>
        </div>

        <div className="shrink-0 text-center md:text-right bg-black/60 border border-red-950/80 p-5 rounded-2xl max-w-xs relative">
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-black block mb-1">
            VERIFIED SYNDICATE
          </span>
          <p className="text-[11px] text-neutral-400 leading-normal font-sans">
            Students are deployed in matched pairs to execute full-screen directorship on INDIE projects.
          </p>
          <div className="mt-3 text-xs text-white font-mono font-bold text-center border-t border-neutral-900 pt-3">
            1.5M+ Potential Reach
          </div>
        </div>
      </div>

      {/* DUAL COLUMN INTERACTIVE YIELDS DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto mb-16">
        
        {/* Left Column: Interactive Yield selectors */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
            TAP YIELD ASSET TO DETECT CLINICAL DETAILS:
          </span>

          <div className="grid grid-cols-1 gap-3.5">
            {yieldCards.map((card) => {
              const isActive = activeYieldTab === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveYieldTab(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveYieldTab(card.id);
                    }
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group flex flex-col justify-between select-none ${
                    isActive
                      ? "bg-gradient-to-r from-[#1c0f0f]/45 to-black border-red-500/40 text-white shadow-xl shadow-red-500/[0.03]"
                      : "bg-neutral-900/40 border-neutral-900 hover:border-neutral-800 text-neutral-400"
                  }`}
                >
                  {/* Subtle red indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-red-600" />
                  )}

                  <div className="flex items-start justify-between gap-4 w-full">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border transition-colors ${
                        isActive ? "bg-red-500/15 border-red-500/30 text-red-400" : "bg-neutral-950 border-neutral-900 text-neutral-500 group-hover:text-red-400"
                      }`}>
                        {card.icon}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5 font-extrabold">
                          YIELD {card.num}
                        </span>
                        <h4 className={`text-base font-bold font-display ${isActive ? "text-white" : "text-neutral-300 group-hover:text-white transition-colors"}`}>
                          {card.title}
                        </h4>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 text-[8px] font-mono border rounded font-black tracking-wider ${
                      isActive
                        ? "bg-red-950 text-red-400 border-red-500/30"
                        : "bg-neutral-950 text-neutral-500 border-neutral-900"
                    }`}>
                      {card.highlight}
                    </span>
                  </div>

                  <p className={`text-xs mt-3 leading-relaxed truncate max-w-full font-serif italic ${
                    isActive ? "text-red-200" : "text-neutral-500 group-hover:text-neutral-400"
                  }`}>
                    &ldquo;{card.tagline}&rdquo;
                  </p>

                  <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-neutral-900/40 text-[10px] font-mono">
                    <span className="text-neutral-500">
                      SYSTEM INTEGRATION REQUIRED
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveYieldTab(card.id);
                      }}
                      className={`font-bold flex items-center gap-1 uppercase tracking-widest cursor-pointer transition-all duration-200 py-1 px-2 rounded hover:bg-neutral-950 border border-transparent ${
                        isActive ? "text-red-400 hover:text-red-300 hover:border-red-500/20" : "text-neutral-500 hover:text-red-400 group-hover:text-red-400"
                      }`}
                    >
                      EXPLORE DETAILS <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic interactive explanation card */}
        <div className="lg:col-span-7">
          {(() => {
            const activeCard = yieldCards.find(c => c.id === activeYieldTab) || yieldCards[0];
            return (
              <div className="bg-gradient-to-b from-[#140c0c] to-[#0a0606] border border-red-900/40 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[460px] relative shadow-2xl overflow-hidden group">
                <span className="absolute top-0 right-0 w-36 h-36 bg-red-500/[0.01] rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-black">
                        {activeCard.highlight} PROFILE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">
                      SECURED LISTING YIELD
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-2xl sm:text-3xl font-normal font-serif text-white">
                      {activeCard.title}
                    </h4>

                    <p className="text-base font-serif italic text-red-200/90 leading-relaxed pl-4 border-l-2 border-red-500/50">
                      {activeCard.tagline}
                    </p>

                    <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light">
                      {activeCard.desc}
                    </p>
                  </div>
                </div>

                {/* Simulated dynamic info box */}
                <div className="mt-8 p-5 bg-neutral-950 rounded-2xl border border-red-950/40">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                        AUTHORIZED GRADUATION STAT
                      </span>
                      <p className="text-base font-bold text-white mt-0.5">
                        {activeCard.metric}
                      </p>
                    </div>

                    <div className="px-3.5 py-1.5 bg-red-505/10 border border-red-500/20 rounded-xl text-[10px] text-red-400 font-mono font-medium">
                      ✓ Certificate Locked
                    </div>
                  </div>
                </div>

                {/* Bottom button trigger */}
                <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-[10px] font-mono text-neutral-500 leading-snug">
                    VETTING OFFICER: <span className="text-neutral-300">HEMANT NILIM DAS</span><br />
                    ACCREDITED REGISTRATION: <span className="text-red-500 font-semibold">FIFI-INC</span>
                  </div>

                  <a
                    href="#CourseFee"
                    className="py-3 px-5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs uppercase tracking-wider font-sans hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/10 cursor-pointer shrink-0"
                  >
                    Lock Certificate Slots &rarr;
                  </a>
                </div>

              </div>
            );
          })()}
        </div>

      </div>

    </section>
  );
}
