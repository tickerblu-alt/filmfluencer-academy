import React, { useState } from "react";
import { 
  ShieldCheck, 
  Award, 
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
  FileDown
} from "lucide-react";

interface UltimateStudentYieldsProps {
  onNavigateToDashboard?: (initialTab?: string) => void;
}

export default function UltimateStudentYields({ onNavigateToDashboard }: UltimateStudentYieldsProps) {
  const [activeYieldTab, setActiveYieldTab] = useState<string>("co-directing");
  const [pdfActiveTab, setPdfActiveTab] = useState<string>("co-directing");
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleVerifyCertificate = () => {
    setShowNotification("Verification Success: Your Indian Private Limited production banner holds a 100% legal fast-track registry seal. Physical gold-embossed credential dispatched upon full registration.");
    setTimeout(() => {
      setShowNotification(null);
    }, 5000);
  };

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
                        setPdfActiveTab(card.id);
                        const element = document.getElementById("prospectus-pdf");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
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
                    ACCREDITED REGISTRATION: <span className="text-red-500 font-semibold">FFA-INC</span>
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

      {/* SPECIAL INTERACTIVE CERTIFICATE/MERIT PANEL */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#120a0a] to-neutral-950 border-2 border-red-900/40 p-8 sm:p-10 rounded-3xl relative shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-500/[0.01] rounded-full blur-3xl pointer-events-none" />
        
        {/* Verification Success alert */}
        {showNotification && (
          <div className="absolute top-4 left-4 right-4 z-30 p-4 bg-red-900/90 border border-red-500/30 rounded-xl text-xs font-mono text-white animate-fadeIn shadow-2xl">
            🎁 {showNotification}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          
          {/* Certificate design - extremely luxury elegant red border */}
          <div className="shrink-0 relative">
            <div className="w-44 h-44 rounded-full bg-gradient-to-b from-red-400 via-rose-500 to-red-800 p-1 shadow-lg shadow-red-500/10">
              <div className="w-full h-full rounded-full bg-neutral-950 flex flex-col items-center justify-center p-4 text-center border-2 border-red-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-at-t from-red-500/10 via-transparent to-transparent pointer-events-none" />
                <Award className="w-7 h-7 text-red-500 mb-1" />
                <span className="text-[8px] font-mono text-red-400 font-extrabold tracking-widest uppercase">FILMFLUENCER</span>
                <p className="text-[10px] font-bold text-white uppercase font-display leading-[1.1] mt-0.5">OFFICIAL CREDENTIAL</p>
                <p className="text-[8px] font-mono text-neutral-400 mt-1 uppercase">HEMANT NILIM DAS</p>
                
                <div className="mt-2.5 px-2 py-0.5 rounded-full bg-red-650 text-white text-[7px] font-mono font-bold uppercase tracking-wider bg-red-950 border border-red-500/30">
                  VERIFIED SEALS
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-neutral-900 border border-red-900/50 px-2.5 py-1 rounded text-[9px] font-mono text-red-400 font-extrabold flex items-center gap-1 shadow-2xl">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              STATUS: CERTIFIED
            </div>
          </div>

          {/* Badge descriptive section */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div>
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5 justify-center md:justify-start">
                🎖️ Directorial Merit Authorization
              </span>
              <h4 className="text-2xl font-bold font-serif text-white mt-1">
                Legally Backed Vetting Badge
              </h4>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mt-2 font-sans font-light">
                Every graduate is awarded the physical &amp; digital <strong className="text-neutral-100">Filmfluencer Academy badge</strong> of directorial validation. This badge is watermarked with your Private Limited incorporation code and verified IMDB registration parameters.
              </p>
            </div>

            {/* Specefics grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-neutral-900/40 border border-neutral-900 p-3 rounded-xl text-center md:text-left">
                <p className="font-bold text-neutral-200">IMDB Listed</p>
                <p className="text-[10.5px] text-neutral-500 font-mono mt-0.5">Dual Co-Producer indices</p>
              </div>
              <div className="bg-neutral-900/40 border border-neutral-900 p-3 rounded-xl text-center md:text-left">
                <p className="font-bold text-neutral-200">ROC Registrar Stamp</p>
                <p className="text-[10.5px] text-neutral-500 font-mono mt-0.5">Indian Govt Fast-Track</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3">
              <div className="text-[9px] font-mono text-neutral-550 leading-normal text-left">
                AUTHENTIC SERIAL ID: <span className="text-red-400">#FFA-MUM-2026-RED</span><br />
                ISSUING OFFICER: <span className="text-red-500 font-bold">HEMANT NILIM DAS</span>
              </div>
              
              <button 
                onClick={handleVerifyCertificate}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-[#1c0f0f] text-xs font-mono text-neutral-300 hover:text-red-400 border border-neutral-850 hover:border-red-900/30 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Verify Certificate Blueprint &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* DYNAMIC SYLLABUS & PROSPECTUS PORTFOLIO INTERACTIVE CENTER */}
      <div id="prospectus-pdf" className="mt-20 pt-16 border-t border-neutral-900/60 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold block mb-1">
            OFFICIAL ACADEMY LEDGER
          </span>
          <h4 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Syllabus &amp; Prospectus Portfolio
          </h4>
          <p className="text-xs text-neutral-400 mt-2">
            Click on any tract tab below to compile your legal physical-bound syllabus folder. Authenticated by Registrar node protocols.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "co-directing", label: "Co-Directing Syllabus", badge: "YIELD 01" },
            { id: "private-banner", label: "Private Ltd. Incorporation", badge: "YIELD 02" },
            { id: "ai-production", label: "AI 2026 Tech Stack", badge: "YIELD 03" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPdfActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                pdfActiveTab === tab.id
                  ? "bg-red-950/40 border-red-500/30 text-white shadow-lg"
                  : "bg-neutral-950/40 border-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${pdfActiveTab === tab.id ? "bg-red-500 animate-pulse" : "bg-neutral-600"}`} />
              {tab.label}
              <span className="text-[8px] opacity-60 font-sans px-1.5 py-0.2 rounded bg-neutral-900/80 border border-neutral-800">
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Editorial Document Preview */}
        <div className="bg-[#09090b] border border-neutral-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle gold line accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-neutral-900 mb-6">
            <div>
              <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-mono tracking-widest uppercase mb-1">
                <span>DOC REG: ID-2026-FFA</span>
                <span>•</span>
                <span className="text-red-400 font-bold">VERIFIED COHORT PATHWAY</span>
              </div>
              <h5 className="text-xl font-bold font-display text-white">
                {pdfActiveTab === "co-directing" && "TRACT 01: ACTIVE CO-DIRECTING CHRONOLOGY"}
                {pdfActiveTab === "private-banner" && "TRACT 02: INCORPORATION & BRAND COMMERCIALIZATION"}
                {pdfActiveTab === "ai-production" && "TRACT 03: THE 2026 GUERRILLA AI PRODUCTION BLUEPRINT"}
              </h5>
            </div>

            <button
              onClick={() => {
                let text = "";
                let fn = "";
                if (pdfActiveTab === "co-directing") {
                  fn = "FFA_CoDirecting_Syllabus.txt";
                  text = "========================================================================\n           FILMFLUENCER ACADEMY (FFA) - CO-DIRECTING FEATURE FILM\n========================================================================\nCOHORT: 2026 DIRECT ENTRY BLUEPRINT\nDIRECTOR UNDER STUDY: HEMANT NILIM DAS\nACCREDITATION CODE: FFA-INC-CODIR-2026\n\nTHEORETICAL SILO DESTRUCTION DIRECTIVE:\nTraditional film schools trap you in a classroom for years, teaching you \nhow to hold a camera while you wait for a break that never comes. We don't \ndo that. You will co-direct a professional theatrical feature film within \n1 year, securing lifetime IMDB listings and commercial OTT access.\n\n12-MONTH CHRONOLOGICAL CURRICULUM OVERVIEW:\n------------------------------------------------------------------------\n[PHASE 01: STORY MATCHING & PAIR SELECTION]\nYou are paired based on thematic specialization (Neo-Noir, Suspense Drama, \nCommercial Rom-Com). Includes high-production screenwriting and structural \npacing masterclasses.\n\n[PHASE 02: ACTIVE DUAL SCREEN COMMANDS]\nLead actual high-budget camera sets under the direct command structure \nand active on-set mentorship of Hemant Nilim Das.\n\n[PHASE 03: MULTI-CHANNEL DISTRIBUTION SWEEP]\nGain live entry into regional theaters, global festival showcases (Cannes, \nTIFF, MAMI), and our proprietary MUVIREEL.COM vertical streaming catalog.\n\nGRADUATION SPECIFICATION:\n- Lifetime IMDB Co-Director / Co-Producer Certification\n- Placement in official MUVIREEL streaming channels\n- Directorship validation signed by Hemant Nilim Das\n========================================================================\nGenerated securely on the Filmfluencer Academy Ledger.";
                } else if (pdfActiveTab === "private-banner") {
                  fn = "FFA_PrivateLtd_Banner_Guide.txt";
                  text = "========================================================================\n        FILMFLUENCER ACADEMY (FFA) - INCORPORATION & LEGAL GUIDE\n========================================================================\nREGISTRATION AUTHORITY: ROC Registrar (Govt of India Fast-Track)\nACCREDITATION CODE: FFA-INC-LEGAL-2026\n\nGRADUATION ASSET DESCRIPTION:\nA registered Indian Private Limited production firm incorporated in your \nown name. You graduate with an active, compliant incorporation license \nenabling you to:\n- Legally invoice global brands and commercial sponsors\n- Secure central and state government film production subsidies\n- Hold 100% copyright ownership of your intellectual property and films\n\nINCORPORATION WORKFLOW DETAILS:\n------------------------------------------------------------------------\n[STAGE 1: NAME APPROVAL]\nApplication of unique production names through the Ministry of Corporate \nAffairs (MCA) fast-track node.\n\n[STAGE 2: INCORPORATION & PAN/TAN]\nFiling of SPICe+ forms, drafting of Memorandum of Association (MoA) and \nArticles of Association (AoA) for digital cinema publishing.\n\n[STAGE 3: LIVE LEDGER ACTIVATION]\nSyncing your incorporated firm's registry parameters with active bank nodes \nfor immediate brand invoice capability.\n\nLEGAL BACKING:\nThis is a 100% legal fast-track registry seal. Physical gold-embossed \nincorporation documents are dispatched upon full cohort validation.\n========================================================================\nGenerated securely on the Filmfluencer Academy Ledger.";
                } else {
                  fn = "FFA_AI_Production_Blueprint.txt";
                  text = "========================================================================\n        FILMFLUENCER ACADEMY (FFA) - AI PRODUCTION BLUEPRINT (2026)\n========================================================================\nENGINE WORKSPACE: GUERRILLA BUDGET OPTIMIZATION\nACCREDITATION CODE: FFA-INC-AI-2026\n\n2026 STACK SPECIFICATION:\nMaster the hyper-efficient tools to write pitch scripts, draft precise \nset budget breakdowns, design instant visual storyboards, and command \nautomated media networks. \n\nCURRICULUM MODULES:\n------------------------------------------------------------------------\n[MODULE 01: SCRIPT-TO-PERFORMANCE GENERATION]\nRapidly prompt and structure screenplays using highly localized custom \nLLM endpoints.\n\n[MODULE 02: VISUAL STORYBOARD ENGINE]\nDesign high-production mood boards and shot lists with real-time generative \nspatial layout software, eliminating expensive hand-drawn pre-visualization.\n\n[MODULE 03: AUTOMATED DISTRIBUTION NETWORKS]\nDirect-to-patron monetization pipelines with embedded digital-rights \nmanagement, optimized metadata, and viral vertical trailer automation.\n\nSYSTEM AUDIT PARAMETERS:\nVerified by vetting officer Hemant Nilim Das for 2026 production readiness.\n========================================================================\nGenerated securely on the Filmfluencer Academy Ledger.";
                }
                const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = fn;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-black font-semibold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer select-none font-display shrink-0"
            >
              <FileDown className="w-4 h-4" /> DOWNLOAD OFFICIAL TEXT SYLLABUS (.TXT)
            </button>
          </div>

          {/* Virtual Document Render */}
          <div className="bg-black/40 border border-neutral-900 rounded-2xl p-6 font-mono text-[11px] sm:text-xs text-neutral-300 space-y-4 leading-relaxed max-h-[350px] overflow-y-auto custom-scrollbar relative">
            <div className="absolute top-2 right-4 text-[9px] text-neutral-600 select-none">PAGE 01 OF 01</div>
            
            {pdfActiveTab === "co-directing" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <p className="text-red-400 font-bold">12-MONTH CHRONOLOGICAL CURRICULUM OVERVIEW:</p>
                
                <div className="border-l border-red-900/40 pl-3 py-1 space-y-2">
                  <p><strong className="text-white font-semibold font-display">[PHASE 01: STORY MATCHING & PAIR SELECTION]</strong><br />
                  You are paired based on thematic specialization (Neo-Noir Suspense, Commercial Drama, Thrillers). Master screenwriting hooks and physical structural pacing directly under mentor supervision.</p>
                  
                  <p><strong className="text-white font-semibold font-display">[PHASE 02: ACTIVE DUAL SCREEN COMMANDS]</strong><br />
                  Lead actual high-budget camera sets. You dictate camera positions, block seasoned theater performers, and sign off on active production schedules on live Indian sets.</p>
                  
                  <p><strong className="text-white font-semibold font-display">[PHASE 03: MULTI-CHANNEL DISTRIBUTION SWEEP]</strong><br />
                  Gain live entry into regional theaters, global festival showcases, and our proprietary MUVIREEL.COM vertical streaming catalog with immediate premium patron subscription links.</p>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-900 text-neutral-400">
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">OFFICIAL GRADUATION TARGET:</span>
                  - Lifetime certified Co-Director credentials uploaded directly to your IMDB profile.<br />
                  - Registered distribution contract with verified vertical stream revenue distribution nodes.
                </div>
              </div>
            )}

            {pdfActiveTab === "private-banner" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <p className="text-red-400 font-bold">INCORPORATION WORKFLOW DETAILS:</p>
                
                <div className="border-l border-red-900/40 pl-3 py-1 space-y-2">
                  <p><strong className="text-white font-semibold font-display">[STAGE 1: MCA NAME APPROVAL & RESERVATION]</strong><br />
                  Fast-tracked name filings submitted securely through Ministry of Corporate Affairs portals. Secure a legal, trademarkable title for your production company.</p>
                  
                  <p><strong className="text-white font-semibold font-display">[STAGE 2: CORPORATE CONSTITUTION FILINGS]</strong><br />
                  Drafting customized Articles of Association (AoA) and Memorandum of Association (MoA) explicitly configured for international film production, global syndication rights, and B2B streaming models.</p>
                  
                  <p><strong className="text-white font-semibold font-display">[STAGE 3: ACTIVE TAXATION NODES]</strong><br />
                  Automatic integration of PAN/TAN registries. Walk out on day one with a fully functioning current account structure, certified corporate seal, and immediate brand invoice capability.</p>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-900 text-neutral-400">
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">LEGAL SEALS:</span>
                  - Authenticated ROC Ministry Seal registration.<br />
                  - 100% sole equity holding under your direct name. No administrative proxies.
                </div>
              </div>
            )}

            {pdfActiveTab === "ai-production" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <p className="text-red-400 font-bold">THE 2026 GUERRILLA STACK BLUEPRINT:</p>
                
                <div className="border-l border-red-900/40 pl-3 py-1 space-y-2">
                  <p><strong className="text-white font-semibold font-display">[MODULE 01: SCRIPT-TO-PERFORMANCE GENERATION]</strong><br />
                  Leverage high-context custom LLM models optimized with Indian dialogue sets to format scripts, produce multi-character pitches, and auto-generate comprehensive location shoot lists.</p>
                  
                  <p><strong className="text-white font-semibold font-display">[MODULE 02: PRE-VISUALIZATION ENGINE]</strong><br />
                  Eliminate expensive hand-drawn concept art. Master state-of-the-art spatial image engines to construct mood boards, lighting directions, and complex multi-cam angles instantly.</p>
                  
                  <p><strong className="text-white font-semibold font-display">[MODULE 03: META-DISTRIBUTION NODES]</strong><br />
                  Utilize serverless web automation nodes to syndicate trailer formats, automate viral tiktok/reel micro-cuts, and maintain automated licensing tables directly with platform distributors.</p>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-900 text-neutral-400">
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">AUDIT STATUS:</span>
                  Verified for deployment on active 2026 regional shoots. Optimized for zero-interest production structures.
                </div>
              </div>
            )}
            
            <div className="border-t border-neutral-900 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] text-neutral-500 font-sans">
              <div>VETTED BY FACULTY DIRECTOR: <span className="text-neutral-300">HEMANT NILIM DAS</span></div>
              <div>ACCREDITATION LEDGER ID: <span className="font-mono text-red-500">#FFA-MUM-YIELD-PRO</span></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
