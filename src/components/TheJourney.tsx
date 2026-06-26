import React, { useState } from "react";
import { 
  Film, 
  MapPin, 
  Award, 
  Tv, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  User,
  Zap,
  Globe,
  Compass
} from "lucide-react";

interface TimelineEvent {
  year: string;
  phase: string;
  title: string;
  details: string;
  extraDetails?: string;
  stats?: { label: string; value: string }[];
  tag?: string;
  icon: React.ReactNode;
}

export default function TheJourney() {
  const [activeYear, setActiveYear] = useState<string>("2026-27");

  const events: TimelineEvent[] = [
    {
      year: "2015",
      phase: "Phase 1: Proof of Concept",
      title: "Guerrilla Uncut (Pocket Gangsters)",
      details: "Directed major international powerhouse stars Vijay Raaz, Raghubir Yadav & Madhur Mittal in high-stakes circumstances.",
      extraDetails: "Shot in 40 real physical locations with non-stop rolling production, establishing absolute speed, resource efficiency, and raw guerrilla execution capability.",
      stats: [
        { label: "Locations", value: "40+" },
        { label: "Star Cast", value: "Multiple" }
      ],
      tag: "Guerrilla Pioneer",
      icon: <Film className="w-4 h-4 text-amber-500" />
    },
    {
      year: "2017",
      phase: "Phase 2: Global Showcasing",
      title: "Global Award Winner (LA World Int'l Film Festival)",
      details: "Honoured with Best Director on the international festival circuit, opening cinematic doors globally.",
      extraDetails: "Showcased prestigious uncut work in LA, London, and Malta festivals, proving regional storytelling commands massive globally scaling networks.",
      stats: [
        { label: "Awards", value: "Best Dir" },
        { label: "Festivals", value: "LA / LDN" }
      ],
      tag: "International Honour",
      icon: <Award className="w-4 h-4 text-amber-400" />
    },
    {
      year: "2018",
      phase: "Phase 3: High-Profile Commercial Casting",
      title: "Tisca Chopra in Iconic Cinematic Music Release",
      details: "Staged high-aesthetic luxury music video with premium atmospheric setups.",
      extraDetails: "Directed powerhouse actress Tisca Chopra in a complex visual narration, establishing advanced industry blocking protocols and highlighting key color psychology.",
      stats: [
        { label: "Cinematics", value: "4K High-Fi" },
        { label: "Esthetics", value: "Luxury" }
      ],
      tag: "Premium Staging",
      icon: <Sparkles className="w-4 h-4 text-amber-500" />
    },
    {
      year: "2019",
      phase: "Phase 4: Serialized Visual Dramas",
      title: "Clinical Investigative Series with Kainaat Arora",
      details: "Engineered high-pace suspense drama series 'Jhoothistaan' with stellar episodic hook designs.",
      extraDetails: "Introduced clinical script-to-performance architecture, navigating intricate multi-cam sets and intense character breakdowns in record timelines.",
      stats: [
        { label: "Episodes", value: "Prime Series" },
        { label: "Pace", value: "Engineered" }
      ],
      tag: "Suspense Drama",
      icon: <Tv className="w-4 h-4 text-amber-400" />
    },
    {
      year: "2021",
      phase: "Phase 5: High-Concept Intellectual Art",
      title: "Web Series 'Law of Attraction' with Sneha Ullal",
      details: "Collaborated with movie star Sneha Ullal to deliver high-concept psychological cinema.",
      extraDetails: "Showcased deep emotional messaging alongside beautiful minimal production setups, proving independent scripts command major streaming eyes.",
      stats: [
        { label: "Casting", value: "Sneha Ullal" },
        { label: "Platform", value: "OTT Spec" }
      ],
      tag: "High-Concept Web",
      icon: <Compass className="w-4 h-4 text-emerald-400" />
    },
    {
      year: "2022",
      phase: "Phase 6: Multi-National Brand Partnerships",
      title: "Commercial Director for Global Conglomerates",
      details: "Pioneered top-tier cinematic advertisements and digital campaigns with global automotive and industrial market authorities.",
      extraDetails: "Built high-conversion digital stories for Castrol, Tata Motors, Mahindra & Mahindra, and Piaggio - successfully mapping corporate commercial goals directly to independent filmmakers.",
      stats: [
        { label: "Clients", value: "4 Multi-Nat" },
        { label: "ROI Reach", value: "Mil+" }
      ],
      tag: "Commercial Authority",
      icon: <Globe className="w-4 h-4 text-blue-400" />
    },
    {
      year: "2024",
      phase: "Phase 7: Elite Brand Building Consultancy",
      title: "Launched Specialized Brand Agency PROZENIUS",
      details: "Consulted on strategic media positioning and published two masterworks on market consultancy.",
      extraDetails: "Structured modern personal branding systems for high-profile business leaders. Built the precise algorithm linking original cinematic content to automatic product monetizations.",
      stats: [
        { label: "Books", value: "2 Published" },
        { label: "Agency", value: "Prozenius" }
      ],
      tag: "Media Architect",
      icon: <BookOpen className="w-4 h-4 text-amber-500" />
    },
    {
      year: "2026-27",
      phase: "Phase 8: The Full Educational Revolution",
      title: "The Filmfluencer Academy Lab",
      details: "Fully packaging 11 years of independent commercial set secrets into a streamlined 365-day execution pipeline.",
      extraDetails: "Bypasses legacy distributor bottlenecks entirely. Students secure Pvt Ltd. legal setups, real public followings, direct news syndication, and actual streaming distribution rights.",
      stats: [
        { label: "Cohort", value: "Elite Studio" },
        { label: "Pipeline", value: "365-Day" }
      ],
      tag: "The Blueprint",
      icon: <Zap className="w-4 h-4 text-amber-400" />
    }
  ];

  return (
    <section id="journey" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-neutral-950 relative overflow-hidden">
      {/* Decorative Textures */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Column: Visual Masterpiece Headings */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
          <div>
            {/* Elegant Serif Accent Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                The Journey of the FIFI Founder
              </span>
            </div>

            {/* Redesigned High-End Elegant Serif & Display Title */}
            <div className="relative group/title mt-2">
              {/* Subtle ambient gold background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 to-transparent rounded-3xl blur-xl opacity-75 group-hover/title:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="relative text-3xl sm:text-4.5xl md:text-5.5xl font-light font-serif text-neutral-400 tracking-tight leading-[1.05] space-y-2">
                <span className="block text-[11px] font-mono tracking-[0.35em] text-amber-500 uppercase font-extrabold mb-2">
                  The Epic Transmutation
                </span>
                <span className="block text-white font-extrabold tracking-tight uppercase text-4xl sm:text-5xl md:text-6.5xl">
                  SMALL TOWN FISH
                </span>
                <span className="inline-flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-amber-500/50" />
                  <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase italic font-medium">TO</span>
                  <span className="h-[1px] w-8 bg-amber-500/50" />
                </span>
                <span className="block font-sans font-black text-4xl sm:text-5xl md:text-6.5xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase drop-shadow-[0_2px_10px_rgba(245,158,11,0.15)]">
                  GLOBAL RECOGNITION
                </span>
              </h3>
            </div>
          </div>

          {/* User's exact prompt-matching text block formatted with high-end luxury styling */}
          <div className="border-l-2 border-amber-500/40 pl-6 space-y-4">
            <p className="text-neutral-100 text-base md:text-lg font-serif italic leading-relaxed font-light">
              &ldquo;Receive Hemant Nilim Das's absolute visual blueprint in <span className="text-amber-400 font-sans font-black not-italic px-1.5 py-0.5 bg-amber-500/10 rounded">365 intense, structured days</span> of execution.&rdquo;
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
              A complete timeline of independent transformation. Witness how consistent grit, raw execution, and strategic media branding rewrite the rules of distribution.
            </p>
          </div>

          {/* Quick Access Grid / Texture Accent Card */}
          <div className="bg-neutral-900/60 border border-neutral-800/80 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/[0.01] rounded-full blur-xl" />
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> THE METRIC REDIRECTION
            </h4>
            <p className="text-[11px] text-neutral-300 leading-normal font-sans font-light mb-4">
              Click any year in the timeline to preview the intense phase milestones. Experience the exact strategic path from humble beginnings to a registered director banner.
            </p>

            {/* Quick-clickable year selectors (mini texture pills) */}
            <div className="flex flex-wrap gap-1.5">
              {events.map((e) => (
                <button
                  key={e.year}
                  onClick={() => setActiveYear(e.year)}
                  className={`text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeYear === e.year
                      ? "bg-amber-500 text-black shadow-md shadow-amber-500/10"
                      : "bg-neutral-950 text-neutral-400 border border-neutral-900 hover:text-white hover:border-neutral-800"
                  }`}
                >
                  {e.year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: High-End Elegant Interactive Timeline */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Highlight Card - Feature Spotlight Panel */}
          {(() => {
            const featured = events.find(e => e.year === activeYear) || events[events.length - 1];
            return (
              <div className="bg-gradient-to-br from-[#121214] via-[#16161a] to-[#0d0d0f] border-2 border-amber-500/30 p-8 rounded-3xl relative overflow-hidden shadow-2xl transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                
                {/* Year Badge & Tag */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl sm:text-5xl font-black font-serif italic text-amber-400 tracking-wider">
                      {featured.year}
                    </span>
                    <div className="h-8 w-[1px] bg-neutral-800" />
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                        Active Spotlight
                      </span>
                      <span className="text-xs font-serif text-amber-300 italic block">
                        {featured.phase}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 text-[10px] font-mono bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-md font-bold uppercase tracking-wider">
                    {featured.tag}
                  </span>
                </div>

                {/* Event Core Info */}
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight mb-3">
                  {featured.title}
                </h4>

                <p className="text-neutral-200 text-sm leading-relaxed font-sans mb-4 font-light">
                  {featured.details}
                </p>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans font-light bg-neutral-950/50 p-4 rounded-xl border border-neutral-900/40">
                  {featured.extraDetails}
                </p>

                {/* Stats row */}
                {featured.stats && (
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-900">
                    {featured.stats.map((stat, i) => (
                      <div key={i} className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-900 text-center">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 block">
                          {stat.label}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-white mt-1 block">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Redesigned Minimal Timeline Rail */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-4">
              COMPLETE TRANSFORMATION STAGES:
            </span>

            <div className="grid grid-cols-1 gap-3">
              {events.map((event) => {
                const isActive = activeYear === event.year;
                return (
                  <div
                    key={event.year}
                    onClick={() => setActiveYear(event.year)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? "bg-[#1c1917]/25 border-amber-500/40 shadow-md shadow-amber-500/5 text-white"
                        : "bg-neutral-900/40 border-neutral-850 hover:bg-neutral-900/80 hover:border-neutral-800 text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Left Year Marker */}
                      <span className={`text-lg sm:text-xl font-bold font-serif italic tracking-wide w-12 shrink-0 ${
                        isActive ? "text-amber-400" : "text-neutral-500"
                      }`}>
                        {event.year}
                      </span>

                      {/* Icon */}
                      <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isActive ? "bg-amber-500/10 text-amber-400" : "bg-neutral-950 text-neutral-500"
                      }`}>
                        {event.icon}
                      </div>

                      {/* Title & Phase Line Recap */}
                      <div>
                        <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest text-neutral-500 block mb-0.5">
                          {event.phase}
                        </span>
                        <h5 className={`text-xs sm:text-sm font-semibold truncate max-w-[200px] sm:max-w-[320px] transition-colors ${
                          isActive ? "text-white font-bold" : "text-neutral-300"
                        }`}>
                          {event.title}
                        </h5>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono uppercase font-bold tracking-widest hidden md:inline-block ${
                        isActive ? "text-amber-400" : "text-neutral-500"
                      }`}>
                        {isActive ? "Viewing" : "Explore"}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? "text-amber-400 translate-x-1" : "text-neutral-600"
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
