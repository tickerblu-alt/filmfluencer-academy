import React, { useState } from "react";
import { 
  Play, 
  X, 
  ExternalLink, 
  Tv, 
  Award, 
  Film, 
  Camera, 
  Compass, 
  Sparkles, 
  CheckCircle,
  Eye,
  ArrowUp
} from "lucide-react";

interface CreativeAsset {
  id: string;
  title: string;
  badge: string;
  tags: string[];
  quote: string;
  description: string;
  cast: string;
  youtubeId: string; // Real or sandbox YouTube previews
  icon: React.ReactNode;
}

export default function TheCreativeEngine() {
  const [activeAssetId, setActiveAssetId] = useState<string>("directors-showreel");
  const [playVideoId, setPlayVideoId] = useState<string | null>(null);

  const assets: CreativeAsset[] = [
    {
      id: "directors-showreel",
      title: "Director's Showreel",
      badge: "Certified Master",
      tags: ["Core Showreel", "Main Reel", "Supervised by Hemant Nilim Das"],
      quote: "Cinematic execution, staging blocks, and industry-grade framing",
      description: "Watch the premium creative layout, camera setups, and advanced storytelling techniques configured for active Bollywood theatrical distribution.",
      cast: "Cast: Star Cast & Indian Academy Ensemble",
      youtubeId: "vBq72eF_u1A", // Pocket Gangsters trailer
      icon: <Film className="w-5 h-5 text-amber-500" />
    },
    {
      id: "onset-execution",
      title: "On-Set Execution",
      badge: "IP Blueprint",
      tags: ["Live Action Lab", "BTS Masterclass", "Director Live Techniques"],
      quote: "Handling dynamic camera movements, visual blocking, and high-tension scenes",
      description: "Behind-the-scenes masterclass walkthrough. Get instant blueprints on handling complex high-budget action and psychological suspense sets.",
      cast: "Cast: A-list Bollywood talent attachments coached via the Das methodology",
      youtubeId: "vBq72eF_u1A", // High tension set work walkthrough
      icon: <Camera className="w-5 h-5 text-amber-400" />
    },
    {
      id: "bulletproof-badmash",
      title: "Bulletproof Badmash",
      badge: "Active Pitch",
      tags: ["Concept Pilot Film", "Noir Showcase", "Screenplay & Director"],
      quote: "Gritty Neo-Noir Concept & Visual Package",
      description: "An official flagship showcase designed under the Filmfluencer Academy banner. Pushing stylistic neo-noir boundaries with extreme high-concept continuous takes.",
      cast: "Cast: Indian Indie Theater group actors under Muvireel copyright",
      youtubeId: "vBq72eF_u1A", // Gritty continuous take
      icon: <Compass className="w-5 h-5 text-emerald-400" />
    },
    {
      id: "girlfriend-club",
      title: "Girlfriend Club",
      badge: "Ready to Option",
      tags: ["Modern Commercial Showcase", "Romantic Drama IP", "Screenplay & Writer"],
      quote: "Commercial Modern Narrative Packaging",
      description: "A masterful dive into commercial romantic comedy aesthetics and digital-first premium screenplays designed to capture gen-Z audience demographics and high-value B2B sponsors.",
      cast: "Cast: Top national digital creators and high-value legal talent attachments",
      youtubeId: "vBq72eF_u1A", // Girlfriend Club modern commercial teaser
      icon: <Tv className="w-5 h-5 text-blue-400" />
    }
  ];

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-[#060608] relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.012] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.012] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[#000000]/30 z-0 pointer-events-none" />

      <div className="relative z-10">
        
        {/* REDESIGNED HEADER: THE CREATIVE ENGINE & FOUNDER PORTFOLIO */}
        <div className="border-b border-neutral-900 pb-12 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-extrabold">
                  The Creative Engine
                </span>
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                  FOUNDER PORTFOLIO
                </span>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-[1.05]">
                  HEMANT NILIM DAS
                </h3>
              </div>
              
              <p className="text-neutral-300 text-base sm:text-lg font-serif italic leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 mt-2">
                LA World International Film Festival Best Director, author of Secular Psycho, and pioneer of uncut hostage action scripts (Pocket Gangsters). Look inside the cinematic blueprints that fuel the Filmfluencer curriculum.
              </p>
            </div>

            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-900 text-left lg:text-right shrink-0">
              <span className="text-[10px] font-mono text-amber-400/80 uppercase tracking-widest font-black block mb-1">
                IMDB CERTIFIED DIRECTORS HUB
              </span>
              <p className="text-[11px] text-neutral-500 font-sans max-w-[280px]">
                Official legal attachments and premium script assets fully compliant with theatrics.
              </p>
            </div>
          </div>
        </div>

        {/* INTERACTIVE ASSETS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selector list */}
          <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1 font-bold">
              CINEMATIC PORTFOLIO METRICS / Blueprints:
            </span>

            <div className="grid grid-cols-1 gap-3.5">
              {assets.map((asset) => {
                const isActive = activeAssetId === asset.id;
                return (
                  <button
                    key={asset.id}
                    onClick={() => {
                      setActiveAssetId(asset.id);
                      if (window.innerWidth < 1024) {
                        document.getElementById("active-preview-screen")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group flex flex-col justify-between ${
                      isActive
                        ? "bg-gradient-to-r from-[#1c1917]/30 to-black border-amber-500/40 text-white shadow-xl shadow-amber-500/[0.02]"
                        : "bg-neutral-900/40 border-neutral-900 hover:border-neutral-800 text-neutral-400"
                    }`}
                  >
                    {/* Tiny glowing bar */}
                    {isActive && (
                      <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-400 to-amber-600" />
                    )}

                    <div className="flex items-start justify-between gap-4 w-full">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border transition-colors ${
                          isActive ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-neutral-950 border-neutral-900 text-neutral-500 group-hover:text-amber-400"
                        }`}>
                          {asset.icon}
                        </div>
                        <div>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5 font-bold">
                            {asset.tags[1]}
                          </span>
                          <h4 className={`text-base font-bold font-display ${isActive ? "text-white" : "text-neutral-300 group-hover:text-white transition-colors"}`}>
                            {asset.title}
                          </h4>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 text-[9px] font-mono border rounded-md font-bold transition-all uppercase tracking-wider ${
                        isActive
                          ? "bg-amber-400/10 text-amber-300 border-amber-400/25"
                          : "bg-neutral-950 text-neutral-500 border-neutral-900 group-hover:border-neutral-800"
                      }`}>
                        {asset.badge}
                      </span>
                    </div>

                    <p className={`text-xs font-sans mt-3 font-light leading-relaxed truncate max-w-full ${
                      isActive ? "text-neutral-300" : "text-neutral-500 group-hover:text-neutral-400"
                    }`}>
                      &ldquo;{asset.quote}&rdquo;
                    </p>

                    <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-neutral-900/40">
                      <span className="text-[10px] font-mono text-neutral-500">
                        {asset.tags[0]}
                      </span>
                      <span className={`text-[10px] font-mono font-bold flex items-center gap-1 uppercase tracking-widest transition-transform group-hover:translate-x-1 ${
                        isActive ? "text-amber-400" : "text-neutral-500 group-hover:text-amber-400"
                      }`}>
                        PREVIEW ASSET <Play className="w-2.5 h-2.5 fill-current" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Immersive active preview screen */}
          <div id="active-preview-screen" className="lg:col-span-7 order-1 lg:order-2 scroll-mt-24">
            {(() => {
              const activeAsset = assets.find(a => a.id === activeAssetId) || assets[0];
              return (
                <div className="bg-gradient-to-b from-[#111113] to-[#0c0c0e] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative group flex flex-col h-full min-h-[400px] sm:min-h-[500px] justify-between">
                  
                  {/* Visual top bar of hub screen */}
                  <div className="p-6 bg-black/40 border-b border-neutral-900 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-black">
                        {activeAsset.tags[0]}
                      </span>
                      <span className="text-[10px] text-neutral-700">•</span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">
                        {activeAsset.tags[1]}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-neutral-500">
                      {activeAsset.tags[2]}
                    </span>
                  </div>

                  {/* Core asset image mock block with PLAY trigger */}
                  <div className="relative aspect-video bg-neutral-950 flex flex-col items-center justify-center p-8 text-center border-b border-neutral-900 overflow-hidden group/screen">
                    <div className="absolute inset-0 bg-[#000] opacity-40 z-10 transition-opacity group-hover/screen:opacity-50" />
                    
                    {/* Simulated visual film slate texture background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] z-0" />
                    
                    {/* Large showreel branding overlay */}
                    <div className="relative z-20 space-y-3 p-4">
                      <div className="mx-auto w-16 h-16 rounded-full bg-amber-500 text-black flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 hover:bg-amber-400 transition-all shadow-amber-500/15"
                        onClick={() => setPlayVideoId(activeAsset.youtubeId)}
                      >
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                      <p className="text-[11px] font-mono text-amber-400 uppercase font-black tracking-widest">
                        CLICK TO PLAY OFFICIAL BluePrint PREVIEW
                      </p>
                    </div>

                    {/* Movie info tag card bottom right */}
                    <div className="absolute bottom-3 right-3 z-20 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-lg text-[9px] font-mono text-neutral-400">
                      <span>FPS: 31.6 • RESOLUTION: 4K PRORES</span>
                    </div>
                  </div>

                  {/* Narrative details block */}
                  <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h4 className="text-2xl font-bold text-white font-display">
                          {activeAsset.title}
                        </h4>
                        <span className="text-xs font-serif text-amber-300 italic">
                          &ldquo;{activeAsset.quote}&rdquo;
                        </span>
                      </div>

                      <p className="text-sm text-neutral-200 leading-relaxed font-sans font-light">
                        {activeAsset.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                        <span className="text-xs text-neutral-300 font-sans tracking-wide">
                          {activeAsset.cast}
                        </span>
                      </div>

                      <button
                        onClick={() => setPlayVideoId(activeAsset.youtubeId)}
                        className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider font-sans hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer self-start sm:self-auto shrink-0"
                      >
                        PLAY ASSET &rarr;
                      </button>
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>

        {/* Place 2: Cult Admissions Button decorated with elegance box and an arrow of hope above */}
        <div className="mt-16 flex flex-col items-center gap-2.5 border-t border-neutral-900/60 pt-12">
          <div className="flex flex-col items-center animate-bounce duration-[2500ms]">
            <span className="text-[9px] text-amber-500/80 font-mono tracking-[0.2em] uppercase mb-1">THE ARROW OF HOPE</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <div className="w-[1px] h-3 bg-gradient-to-t from-amber-500/50 to-transparent mt-0.5" />
          </div>
          <a 
            href="https://wa.me/919004221717?text=I%20want%20to%20Apply%20for%20Admission%20%26%20Reserve%20Seat%20at%20Filmfluencer%20Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3.5 px-7 py-3.5 border-2 border-amber-500/30 hover:border-amber-400 rounded-xl bg-neutral-950/80 text-neutral-300 hover:text-white transition-all duration-500 font-mono uppercase text-[11px] tracking-[0.25em] relative group overflow-hidden hover:shadow-[0_0_35px_rgba(245,158,11,0.15)] hover:scale-105"
          >
            <div className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent top-0" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold tracking-[0.22em] text-amber-400 group-hover:text-amber-300">Apply for Admission &amp; Reserve Seat</span>
          </a>
        </div>

      </div>

      {/* IMMERSIVE STREAMING MODAL IF PLAYING ASSET */}
      {playVideoId && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn" id="asset-modal">
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal header bar */}
            <div className="p-4 border-b border-neutral-900 flex justify-between items-center bg-black/60">
              <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
                🔴 STREAMING BLUEPRINT ASSET PREVIEW • HEMANT NILIM DAS DIRECTS
              </span>
              <button 
                onClick={() => setPlayVideoId(null)}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embedded video player */}
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${playVideoId}?autoplay=1&rel=0`}
                title="Cinematic Asset Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-neutral-950 text-center border-t border-neutral-900">
              <p className="text-xs text-neutral-400">
                Authorized for Filmfluencer Academy students. Uncut cinema blueprints remain copyright of Muvireel Private Limited.
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
