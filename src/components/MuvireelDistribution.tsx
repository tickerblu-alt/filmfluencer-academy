import React, { useState } from "react";
import { Smartphone, Play, Shield, Ticket, Star, Radio, Flame, Eye, Heart, Sparkles, ChevronRight, Volume2 } from "lucide-react";

interface ScreeningTape {
  id: string;
  title: string;
  director: string;
  duration: string;
  description: string;
  tags: string[];
  views: string;
  likes: string;
  bitrate: string;
  imageUrl: string;
}

export default function MuvireelDistribution() {
  const tapes: ScreeningTape[] = [
    {
      id: "varanasi_neon",
      title: "JHOOTHISTAAN PROMO",
      director: "Kabir Mehta",
      duration: "4m 12s",
      description: "An exploration of ancient mystical spiritual ghats under modern ultraviolet lights and hyper-stylized frame rates.",
      tags: ["#A7SIII", "#Anamorphic", "#DaVinci Color"],
      views: "2.4M",
      likes: "420K",
      bitrate: "128kbps",
      imageUrl: "https://images.unsplash.com/photo-1561361531-99522c3a0214?auto=format&fit=crop&q=80&w=400&h=600"
    },
    {
      id: "the_auto_driver",
      title: "PSYCHO CHANDRAMUKHI TRAILER",
      director: "Priya Rao",
      duration: "5m 45s",
      description: "A fast-paced psychological profile of a night driver maneuvering the high-contrast underbelly of modern Mumbai.",
      tags: ["#FX6", "#Gimbal", "#Atmos Sound"],
      views: "1.8M",
      likes: "310K",
      bitrate: "128kbps",
      imageUrl: "https://images.unsplash.com/photo-1549880181-56a44cf4a9a1?auto=format&fit=crop&q=80&w=400&h=600"
    },
    {
      id: "bengaluru_cyberpunk",
      title: "LAW OF ATTRACTION TRAILER",
      director: "Rohit Krish",
      duration: "3m 30s",
      description: "Atmospheric, hyper-saturated neon frames capturing late night tech workers seeking human connection.",
      tags: ["#RED Komodo", "#Prime Lens", "#Cyber"],
      views: "3.1M",
      likes: "590K",
      bitrate: "256kbps",
      imageUrl: ""
    },
    {
      id: "himalayan_breath",
      title: "SHAKTIPARI MUSIC VIDEO",
      director: "Ananya Dev",
      duration: "6m 10s",
      description: "An evocative cinematic diary documenting breathing rituals at high altitudinal monasteries under golden hours.",
      tags: ["#DJI Ronin", "#Natural Light", "#Spiritual"],
      views: "1.2M",
      likes: "240K",
      bitrate: "320kbps",
      imageUrl: ""
    }
  ];

  const [customYoutubeIds, setCustomYoutubeIds] = useState<Record<string, string>>(() => {
    const defaults = {
      varanasi_neon: "x57JXMTYy5I",
      the_auto_driver: "3CedR4zg_wg",
      bengaluru_cyberpunk: "J-HNX0wUncM",
      himalayan_breath: "l_6r7nNyypI"
    };
    try {
      const saved = localStorage.getItem("fifi_muvireel_youtube_ids");
      if (saved) {
        const parsed = JSON.parse(saved);
        // If they have old placeholders, migrate them to the new requested IDs
        const migrated = { ...defaults, ...parsed };
        if (parsed.varanasi_neon === "7OaFionMvFg") migrated.varanasi_neon = defaults.varanasi_neon;
        if (parsed.the_auto_driver === "PnxCT8XABGc") migrated.the_auto_driver = defaults.the_auto_driver;
        if (parsed.bengaluru_cyberpunk === "rRbyfnlUJUM") migrated.bengaluru_cyberpunk = defaults.bengaluru_cyberpunk;
        if (parsed.himalayan_breath === "MCRcsVZ0nFg") migrated.himalayan_breath = defaults.himalayan_breath;
        return migrated;
      }
    } catch (e) {}
    return defaults;
  });

  const extractYoutubeId = (input: string): string => {
    if (!input) return "";
    const trimmed = input.trim();
    if (trimmed.length === 11 && !trimmed.includes("/") && !trimmed.includes("?")) {
      return trimmed;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = trimmed.match(regExp);
    return (match && match[2].length === 11) ? match[2] : trimmed;
  };

  const [activeTapeIdx, setActiveTapeIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTape = tapes[activeTapeIdx];

  const handleNextTape = () => {
    setIsPlaying(false);
    setActiveTapeIdx((prev) => (prev + 1) % tapes.length);
  };

  return (
    <section id="muvireel" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-black relative">
      {/* Visual background lights */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-red-600/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: MUVIREEL PITCH */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest">
                UPCOMING DISTRIBUTION NET
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
              Meet MUVIREEL.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-400">
                The Theatre In Your Hand.
              </span>
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans pt-2">
              In a world dominated by cheap, hyper-active algorithm noise, <strong className="text-white">MUVIREEL is a pure cinematic sanctuary</strong>. Built exclusively to give Filmfluencer filmmakers absolute leverage, MUVIREEL is India&apos;s upcoming premium, high-fidelity vertical streaming theater. It allows you to publish cinematic micro-narratives, high-definition vertical films, and intense docus directly to thousands of paying patrons globally, bypassing traditional studio gatekeepers entirely.
            </p>
          </div>

          {/* Core App Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-5 bg-neutral-900/60 border border-neutral-850 rounded-2xl flex gap-3.5">
              <Shield className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Absolute Creative Independence</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">No producers, no censors, no compromise. Broadcast your raw vision directly to global patrons.</p>
              </div>
            </div>

            <div className="p-5 bg-neutral-900/60 border border-neutral-850 rounded-2xl flex gap-3.5">
              <Ticket className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Micro-Theatrical Ticket Gating</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Set your own entry fee. Gate premium releases behind high-yield, premium digital micro-tickets.</p>
              </div>
            </div>

            <div className="p-5 bg-neutral-900/60 border border-neutral-850 rounded-2xl flex gap-3.5">
              <Star className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Lossless 4K HDR Atmos Streams</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">A pixel-perfect vertical frame with specialized color rendering to match your exact DaVinci Resolve grading.</p>
              </div>
            </div>

            <div className="p-5 bg-neutral-900/60 border border-neutral-850 rounded-2xl flex gap-3.5">
              <Radio className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Prime Front-Page Spotlight</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Our graduating cohort members receive guaranteed front-page premium placement and push alerts to 100K+ cinema lovers.</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-r from-red-950/20 to-amber-950/15 border border-red-500/20 rounded-2xl">
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              <strong>MUVIREEL Beta v1.4</strong> is exclusive to FIFI Students. Our upcoming premium cohort gets direct authorization keys to publish up to three original productions with instant monetized ticketing active.
            </p>
          </div>
        </div>


        {/* RIGHT COLUMN: INTERACTIVE PHONE PREVIEW */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          {/* Phone Shell frame */}
          <div className="w-full max-w-[290px] xs:max-w-[320px] h-[520px] xs:h-[580px] rounded-[36px] xs:rounded-[40px] bg-[#0c0c0d] border-[6px] xs:border-[8px] border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col justify-between shrink-0">
            
            {/* Camera notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 xs:w-32 h-3.5 xs:h-4 bg-black rounded-full z-30 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800 mr-2" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
            </div>

            {isPlaying ? (
              /* Real video playing view inside phone mock */
              <div className="absolute inset-0 z-20 bg-black flex flex-col justify-between">
                {/* Header bar */}
                <div className="p-3 bg-black/90 flex justify-between items-center border-b border-neutral-900 pt-7 xs:pt-8">
                  <span className="text-[9px] font-mono font-bold text-amber-400 tracking-wider uppercase truncate max-w-[150px]">
                    📺 PLAYING: {currentTape.title}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(false);
                    }}
                    className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer text-[10px] font-mono"
                  >
                    Close
                  </button>
                </div>
                {/* Player */}
                <div className="relative flex-grow bg-black">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${customYoutubeIds[currentTape.id] || "x57JXMTYy5I"}?autoplay=1&rel=0&controls=1&modestbranding=1`}
                    title={currentTape.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              /* Custom active screen content with preview */
              <div className="absolute inset-0 z-10 overflow-hidden flex flex-col justify-between p-4 xs:p-5 pt-8 xs:pt-10 bg-gradient-to-b from-black/80 via-black/40 to-black/90">
                
                {/* Dynamic visual overlay background simulating the movie frame */}
                <div 
                  className="absolute inset-0 -z-10 bg-cover bg-center transition-all duration-700 opacity-60"
                  style={{ backgroundImage: `url(${currentTape.imageUrl})` }}
                />
                
                {/* Stream Type indicator top */}
                <div className="flex justify-between items-center text-white">
                  <span className="text-[8px] xs:text-[9px] font-mono font-bold uppercase px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-full bg-red-600 border border-red-500/40 tracking-wider">
                    MUVIREELBETA
                  </span>
                  <span className="text-[9px] xs:text-[10px] font-mono text-neutral-300 bg-black/60 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Stream: Ultra
                  </span>
                </div>

                {/* Middle Play Button simulation */}
                <div className="my-auto flex flex-col items-center justify-center">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-12 h-12 xs:w-14 xs:h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg hover:bg-white/20"
                  >
                    <Play className="w-5 h-5 xs:w-6 xs:h-6 fill-current text-white translate-x-0.5" />
                  </button>
                  <span className="text-[9px] xs:text-[10px] font-mono text-white/80 uppercase tracking-widest mt-2 xs:mt-3 bg-black/40 px-2.5 py-0.5 xs:py-1 rounded-full border border-white/10">
                    Tap to Play
                  </span>
                </div>

                {/* Bottom Stream Details Overlay */}
                <div className="space-y-2.5 xs:space-y-3.5 bg-black/70 p-3 xs:p-4 rounded-xl xs:rounded-2xl border border-neutral-800/60 backdrop-blur-sm">
                  <div>
                    <span className="text-[7px] xs:text-[8px] font-mono tracking-widest text-red-400 uppercase font-bold block mb-0.5">
                      Cinematic Docu-Fiction
                    </span>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm xs:text-base font-extrabold text-white leading-tight font-display">
                        {currentTape.title}
                      </h4>
                      <span className="text-[9px] xs:text-[10px] font-mono text-neutral-400 shrink-0">
                        {currentTape.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] xs:text-[11px] text-neutral-300 font-sans leading-relaxed line-clamp-2">
                    {currentTape.description}
                  </p>

                  {/* Technical camera badges */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {currentTape.tags.map((tag, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-neutral-900/80 text-[8px] xs:text-[9px] font-mono text-amber-400 rounded border border-neutral-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats indicators */}
                  <div className="flex items-center justify-between border-t border-neutral-900 pt-1.5 text-[9px] xs:text-[10px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-neutral-500" /> {currentTape.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-500" /> {currentTape.likes} likes
                    </span>
                    <span className="flex items-center gap-1 text-[8px] text-neutral-500">
                      <Volume2 className="w-2.5 h-2.5" /> {currentTape.bitrate}
                    </span>
                  </div>

                  {/* Director Badge */}
                  <div className="border-t border-neutral-900 pt-1.5 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-neutral-500 font-mono uppercase">Director / Creator</p>
                      <p className="text-[10px] xs:text-xs font-bold text-white">{currentTape.director}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] xs:text-[9px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1 py-0.5 rounded font-bold">
                        FIFI Fellow
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Selector swipe instructions and tapes tabs */}
          <div className="mt-6 w-full max-w-[290px] xs:max-w-[320px] text-center space-y-3">
            <button 
              onClick={handleNextTape}
              className="w-full py-2.5 px-4 bg-neutral-900 border border-neutral-800 hover:border-red-500/30 rounded-xl text-xs font-mono text-neutral-300 flex items-center justify-center gap-2 transition-all cursor-pointer hover:text-white"
            >
              <span>SELECT SCREENING TAPE:</span>
              <span className="text-red-400 font-bold flex items-center gap-1">
                Swipe right <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Micro selection bullet points for tape titles */}
            <div className="flex justify-center gap-1.5">
              {tapes.map((tape, idx) => (
                <button
                  key={tape.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveTapeIdx(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeTapeIdx === idx ? "bg-red-500 scale-110" : "bg-neutral-800"
                  }`}
                  title={tape.title}
                />
              ))}
            </div>

            <div className="text-[10px] font-mono text-neutral-500">
              Active tape: <span className="text-neutral-300">{currentTape.title}</span> by {currentTape.director}
            </div>

            {/* YouTube Link Customizer Console */}
            <div className="mt-6 p-4 bg-[#0d0d0f] border border-neutral-900 rounded-2xl w-full text-left space-y-3.5 shadow-xl">
              <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <h5 className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-widest">
                  Upload Your Video Links
                </h5>
              </div>
              <p className="text-[9px] text-neutral-500 leading-normal font-sans">
                Paste any YouTube URL or Video ID below. It will automatically update the play button in the interactive phone above!
              </p>
              <div className="space-y-2.5">
                {tapes.map((tape) => (
                  <div key={tape.id} className="space-y-1">
                    <label className="text-[8px] font-mono text-neutral-400 font-bold uppercase block flex justify-between">
                      <span>🎥 {tape.title}</span>
                      {currentTape.id === tape.id && <span className="text-red-400 font-bold animate-pulse">● Selected</span>}
                    </label>
                    <input
                      type="text"
                      placeholder="Paste YouTube Link or ID..."
                      value={customYoutubeIds[tape.id] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        const parsedId = extractYoutubeId(value);
                        const updated = { ...customYoutubeIds, [tape.id]: parsedId };
                        setCustomYoutubeIds(updated);
                        localStorage.setItem("fifi_muvireel_youtube_ids", JSON.stringify(updated));
                      }}
                      className="w-full text-[11px] bg-black border border-neutral-850 focus:border-red-500/50 rounded-lg p-2 font-mono text-neutral-300 placeholder-neutral-700 outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
