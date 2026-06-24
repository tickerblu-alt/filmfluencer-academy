import React from "react";
import { Sparkles } from "lucide-react";

interface FilmfluencerThesisProps {
  simulatorAspect: "filmmaking" | "media-pr";
  setSimulatorAspect: (aspect: "filmmaking" | "media-pr") => void;
  simulatedFollowers: number;
  setSimulatedFollowers: (followers: number) => void;
}

export default function FilmfluencerThesis({
  simulatorAspect,
  setSimulatorAspect,
  simulatedFollowers,
  setSimulatedFollowers,
}: FilmfluencerThesisProps) {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-gradient-to-b from-[#0b0b0c] via-[#0e0e11] to-[#0b0b0c]">
      <div className="text-center max-w-4xl mx-auto mb-16 relative">
        <div className="absolute inset-0 bg-radial-at-t from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="inline-block relative mb-4">
          <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display text-neutral-600 uppercase tracking-wider block">
            STOP BEING A <span className="line-through decoration-red-600/85 decoration-4 sm:decoration-[6px] text-neutral-500/80">FILMMAKER</span>.
          </span>
        </div>
        
        <h3 className="text-4xl sm:text-6xl md:text-7xl font-black font-display text-white tracking-tight leading-none mb-6">
          BECOME A <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">FILMFLUENCER.</span>
        </h3>

        <div className="w-12 h-1 bg-amber-500 mx-auto my-8" />

        <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-1">
          THE DUAL IDENTITY
        </span>
        <h4 className="text-xl sm:text-2xl font-bold font-display text-white mb-4">
          What is a Filmfluencer?
        </h4>
        <p className="text-neutral-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed font-sans">
          Traditional filmmakers beg studios for opportunities. <strong className="text-amber-400">Filmfluencers command their own distribution.</strong> When you own the connection to the audience, high-level collaborations naturally find you.
        </p>
      </div>

      {/* Master Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
        
        {/* Aspect 1: Traditional Cinema Education VS Aspect 2: The Integrated Enterprise Solution */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-gradient-to-br from-[#121215] to-[#15151b] border border-neutral-800 p-8 rounded-3xl relative overflow-hidden flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-red-500 bg-red-950/20 px-2 py-1 rounded border border-red-500/10 font-bold uppercase tracking-wider block max-w-max mb-5">
                The Old Trapped Way
              </span>
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500 text-lg">💔</span> Simple Film School Graduate
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                You spend ₹5,00,000+ purely on dry academic theory. You graduate with a piece of paper, zero brand reach, zero PR leverage, and you have to beg distributors to even look at your screenplay outline.
              </p>

              <div className="space-y-3.5 border-t border-neutral-900/60 pt-5">
                <div className="flex items-start gap-2.5 text-xs text-neutral-500">
                  <span className="text-red-500 mt-0.5">&times;</span>
                  <span>No personal brand or audience metrics to leverage with premium sponsors</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-500">
                  <span className="text-red-500 mt-0.5">&times;</span>
                  <span>No registered Private Limited company to secure tax credits or sign legal banners</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-500">
                  <span className="text-red-500 mt-0.5">&times;</span>
                  <span>Zero press/media connections to generate pre-production momentum</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-900 text-center">
              <span className="text-xs font-mono text-red-400/80">Result: 98% of scripts rot in desk drawers</span>
            </div>
          </div>

          {/* The Integrated Solution (Positive Brainwashing) */}
          <div className="bg-gradient-to-br from-[#1c1917] to-[#121214] border-2 border-amber-500/40 p-8 rounded-3xl relative overflow-hidden flex-1 flex flex-col justify-between shadow-2xl shadow-amber-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-2 py-1 rounded border border-amber-500/20 font-bold uppercase tracking-widest block max-w-max mb-5">
                The Filmfluencer Model (Cohort Core Reallocation)
              </span>
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-emerald-400 text-lg">👑</span> Media-Managed Filmfluencer
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                We have redesigned the exact purpose of tuition. Almost one-fourth of your premium fee is reallocated directly to build <span className="text-amber-400 font-semibold">your real social media base, 1-year brand elevation, PR syndication, and private limited studio ownership</span>. You learn how to build massive followings for your cinema and products!
              </p>

              <div className="space-y-3.5 border-t border-amber-500/10 pt-5">
                <div className="flex items-start gap-2.5 text-xs text-neutral-200">
                  <span className="text-amber-400 mt-0.5">✓</span>
                  <span>Turned into a high-reach Social Media Creator with thousands of focused followers</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-200">
                  <span className="text-amber-400 mt-0.5">✓</span>
                  <span>A Registered Private Limited company in your legal name as Managing Director</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-200">
                  <span className="text-amber-400 mt-0.5">✓</span>
                  <span>1 Year of dedicated PR syndication targeting national news agencies</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-900 text-center">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Result: You graduate as an active operational media titan</span>
            </div>
          </div>
        </div>

        {/* Interactive Core Simulator Engine */}
        <div className="lg:col-span-7 bg-[#121214] border border-neutral-800 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl">
          <div className="absolute top-4 right-4 animate-pulse">
            <span className="px-2.5 py-1 text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
              ● LIVE CALIBRATOR
            </span>
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">Interactive Proof Tool</span>
            <h4 className="text-2xl font-bold font-display text-white mt-1 mb-2">Simulate Your &quot;Filmfluencer&quot; Reach</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tune the dynamic controls below to see how having the standard 1-Year Integrated PR Support and Brand Elevation (included with your cohort enrollment) completely bypasses traditional distributor bottlenecks.
            </p>

            {/* Aspect Toggles */}
            <div className="grid grid-cols-2 gap-2 mt-6 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setSimulatorAspect("filmmaking")}
                className={`py-2 px-3 text-xs font-mono rounded-lg transition-all cursor-pointer text-center font-bold ${
                  simulatorAspect === "filmmaking"
                    ? "bg-amber-500 text-black shadow-lg"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
                }`}
              >
                ⚔️ Aspect 1: Elite Filmmaking Staging
              </button>
              <button
                type="button"
                onClick={() => setSimulatorAspect("media-pr")}
                className={`py-2 px-3 text-xs font-mono rounded-lg transition-all cursor-pointer text-center font-bold ${
                  simulatorAspect === "media-pr"
                    ? "bg-amber-500 text-black shadow-lg"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
                }`}
              >
                🚀 Aspect 2: Influencer Brand Building
              </button>
            </div>

            {/* Dynamic Aspect Descriptions */}
            {simulatorAspect === "filmmaking" ? (
              <div className="mt-6 p-5 bg-neutral-900/60 rounded-xl border border-neutral-800/40 animate-fadeIn">
                <h5 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Aspect 1: Physical Actor Blocking &amp; Set Mechanics</h5>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  Under direct staging instructions by Hemant Nilim Das, learn high-stakes film staging, psychological actor space, dynamic framing, and RED camera lens settings. You will practice blockings on professional sets instead of copying textbook theories.
                </p>
                <div className="grid grid-cols-2 gap-3 text-[11px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">•</span> RED/Alexa Lab Hours: 350+</span>
                  <span className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">•</span> Master Blocking Sheets: 40+</span>
                  <span className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">•</span> Actor Psych Staging: Weekly</span>
                  <span className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">•</span> Raw Camera Blockades: 120+</span>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-5 bg-[#1c1917]/40 rounded-xl border border-amber-500/20 animate-fadeIn">
                <h5 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Aspect 2: SOCIAL NETWORKING &amp; INLFUCNER BRAND BUILDING AS CREATIVE MASTER-BLASTER</h5>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  Tuition is strategically reallocated to directly establish your active personal follower networks. You will be taught to build stellar brands and loyal customer bases directly integrated with your products, cinematic projects, and creative properties.
                </p>
                <div className="grid grid-cols-2 gap-3 text-[11px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1.5 text-amber-400"><span className="text-emerald-400 font-bold">✓</span> Solid Social Media Follower Bases</span>
                  <span className="flex items-center gap-1.5 text-amber-400"><span className="text-emerald-400 font-bold">✓</span> Direct Brand Monetization Staging</span>
                  <span className="flex items-center gap-1.5 text-amber-400"><span className="text-emerald-400 font-bold">✓</span> Product Architecture &amp; Identity Kit</span>
                  <span className="flex items-center gap-1.5 text-amber-400"><span className="text-emerald-400 font-bold">✓</span> Creative Master-Blaster Launch Hub</span>
                </div>
              </div>
            )}

            {/* Slider Controls */}
            <div className="mt-8 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono font-bold text-neutral-300">
                    Simulated Target Personal Distribution (Followers / Community Members):
                  </label>
                  <span className="text-xs font-bold text-amber-400 font-mono px-2 py-0.5 bg-amber-400/10 rounded">
                    {simulatedFollowers.toLocaleString()} Core Members
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="5000"
                  value={simulatedFollowers}
                  onChange={(e) => setSimulatedFollowers(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                  <span>5,000 (Launch State)</span>
                  <span>75,000 (Active Reach)</span>
                  <span>150,000+ (Media Powerhouse)</span>
                </div>
              </div>

              {/* Mathematical Leverage Outcomes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-900">
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900/80 text-center">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Estimated Organic Impact</p>
                  <p className="text-lg font-bold text-white mt-1">
                    {(simulatedFollowers * 4.5).toLocaleString()}+
                  </p>
                  <p className="text-[9px] text-neutral-400 mt-1 font-mono">Total Trailer Views</p>
                </div>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900/80 text-center">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Sponsorship Command</p>
                  <p className="text-lg font-bold text-amber-400 mt-1">
                    ₹{Math.floor(simulatedFollowers * 0.85).toLocaleString()}
                  </p>
                  <p className="text-[9px] text-neutral-400 mt-1 font-mono">Per Brand Collaboration</p>
                </div>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900/80 text-center">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Direct Funding Reach</p>
                  <p className="text-lg font-bold text-emerald-400 mt-1">
                    3.2x Higher
                  </p>
                  <p className="text-[9px] text-neutral-400 mt-1 font-mono">Investor Trust Multiplier</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900/80 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <p className="text-[11px] text-neutral-400 leading-normal">
              <strong>Why Filmfluencer Academy wins:</strong> Because having a movie trailer seen by 500,000 organic media fans beats hoping for film festival judges to rescue your career. Become India&apos;s first generation of filmmaking experts along with media management &amp; influencing entrepreneurship!
            </p>
          </div>
        </div>
      </div>

      {/* DUAL IDENTITY TRACKS */}
      <div id="dual-identity" className="mt-24 pt-16 border-t border-neutral-900/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-1">
            THE DUAL IDENTITY
          </span>
          <h3 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
            Two Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">the Ultimate Graduate</span>
          </h3>
          <p className="text-neutral-400 mt-3 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
            We train you across both disciplines so you enter the industry not as a beggar seeking gigs, but as a fully independent media asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-neutral-900/50 via-amber-500/5 to-neutral-900/50 rounded-3xl blur-3xl pointer-events-none" />
          
          {/* Track A Card */}
          <div className="bg-neutral-950/60 border border-neutral-800 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all duration-300">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800 font-bold uppercase tracking-widest block max-w-max mb-5">
                Track A — Technical Filmmaker
              </span>
              <h4 className="text-2xl font-bold font-display text-white mb-2 tracking-tight">
                ON-SET CINEMA-GRADE EXECUTION
              </h4>
              <p className="text-xs text-amber-500/80 font-mono mb-6 uppercase tracking-wider">
                The On-set industry-tool &amp; craft mastery
              </p>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-amber-500 shrink-0 mt-0.5">🎬</span>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    Directing star actors using the <strong className="text-white">Das Method</strong> — exact, psychological vocabulary used on-set with iconic powerhouse actors.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 shrink-0 mt-0.5">🎥</span>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    Full fledged Studio Centric Film-Craft along guerrilla production WorkFlow: Real Footrprint Holywood tech Centric Productiom Design &amp; Das&apos;s &apos;Pocket Gangsters&apos; Single-take Linear-Studio Filmmkaing
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 shrink-0 mt-0.5">💾</span>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    Advanced post-production workflow: Master professional industry-grade colour grading, spatial sound design, and robust custom edit pipelines.
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-4 border-t border-neutral-900 text-right">
              <span className="text-[10px] font-mono text-neutral-500">Unrestricted Physical Camera Access</span>
            </div>
          </div>

          {/* Track B Card (Featured) */}
          <div className="bg-[#121214] border-2 border-amber-500/30 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-amber-500/5 hover:border-amber-500/50 transition-all duration-300">
            {/* Featured Track Badge */}
            <div className="absolute top-0 right-0 p-3">
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/20 text-[9px] font-bold font-mono tracking-widest px-2.5 py-1 rounded-bl-xl uppercase block">
                Featured Track
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/25 font-bold uppercase tracking-widest block max-w-max mb-5">
                Track B — Media Entrepreneur
              </span>
              <h4 className="text-2xl font-bold font-display text-white mb-2 tracking-tight">
                Co-Earning being a Fulltime FilmPreneur
              </h4>
              <p className="text-xs text-amber-400 font-mono mb-6 uppercase tracking-wider">
                The Corporate Placement Stack
              </p>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-amber-400 shrink-0 mt-0.5">💼</span>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                    <strong className="text-white">Pvt. Ltd. production banner</strong> officially incorporated in your name before graduation, fully set up by our certified legal panel.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 shrink-0 mt-0.5">📺</span>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                    <strong className="text-white">OTT distribution models navigation:</strong> How to confidently and legally pitch your masterworks to streaming platforms like Netflix India, Zee5, and Amazon.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 shrink-0 mt-0.5">📦</span>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                    <strong className="text-white">IP packaging formula:</strong> Learn optioning literary rights, attaching bankable key talent, and de-risking high-value project scopes completely.
                  </p>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-amber-500/10 text-right">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Sponsor &amp; Brand Integration Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
