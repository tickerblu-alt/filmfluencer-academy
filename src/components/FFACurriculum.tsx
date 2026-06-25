import React from "react";
import { BookOpen, Calendar, Rocket, Target, Film, DollarSign, ArrowRight, ArrowUp } from "lucide-react";
import { Course } from "../types";

interface FFACurriculumProps {
  courses: Course[];
  onNavigateToDashboard?: (initialTab?: string) => void;
}

export default function FFACurriculum({ onNavigateToDashboard }: FFACurriculumProps) {
  return (
    <section id="curriculum" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-gradient-to-b from-[#0b0b0c] via-[#0d0d0f] to-[#0b0b0c] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-4xl mx-auto mb-16 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
            THE FILMFLUENCERS ACADEMY (FFA)
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-tight mb-4">
          Paying the Fee Isn’t Enough—You Have to Get Selected.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 text-2xl sm:text-3xl md:text-4xl">
            The Path to Directing Your Own Hindi Films.
          </span>
        </h3>

        <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-sans mt-4">
          Film schools will trap you in a classroom for years, teaching you how to hold a camera while you wait for a break that never comes. We don&apos;t do that.
        </p>
        <p className="text-neutral-300 max-w-3xl mx-auto text-base font-semibold leading-relaxed font-sans mt-4 bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl">
          At FFA, you aren&apos;t a student; you are a filmmaker and a founder. We teach you how to direct, how to manage a budget, and how to get your films in front of an audience. No silos, no waiting, no &quot;academic&quot; nonsense. Just pure execution.
        </p>
      </div>

      {/* THE 12-MONTH PLAN CHRONOLOGICAL ROADMAP */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            THE 12-MONTH PLAN
          </span>
        </div>
        
        {/* Visual Timeline Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 bg-neutral-900/60 rounded-2xl border border-neutral-800/80">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">STAGE 01</span>
              <p className="text-xs font-bold text-white uppercase">[ Q1: SETUP ]</p>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">Building Your Brand</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">STAGE 02</span>
              <p className="text-xs font-bold text-white uppercase">[ Q2: SCRIPT &amp; CAST ]</p>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">Getting Ready to Shoot</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">STAGE 03</span>
              <p className="text-xs font-bold text-white uppercase">[ Q3: SHOOT ]</p>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">Making Your 15 Episodes</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">STAGE 04</span>
              <p className="text-xs font-bold text-white uppercase">[ Q4: RELEASE &amp; EARN ]</p>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">Premiere &amp; Profits</p>
          </div>
        </div>
      </div>

      {/* THE BREAKDOWN DETAIL CARDS */}
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 mb-6">
          <Calendar className="w-5 h-5 text-amber-500" />
          <h4 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
            THE BREAKDOWN
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Q1 CARD */}
          <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/25 transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
            <div className="flex items-start gap-4">
              <span className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
                <Rocket className="w-6 h-6" />
              </span>
              <div>
                <h5 className="text-base font-bold text-white font-display mb-1">
                  🚀 Q1: BUILDING YOUR BRAND <span className="text-xs text-neutral-400 font-mono font-normal">(Months 1–3)</span>
                </h5>
                <p className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider mb-3">
                  The Focus: Start your career as a professional, not just an aspiring filmmaker.
                </p>
                <ul className="space-y-3 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Social Media Mastery:</strong> Learn how to use Reels and Shorts to build a fan base before you even release your first film.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Company Setup:</strong> We help you register your own company. You will learn the basics of banking, taxes, and how to run your business like a pro.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Story &amp; Pitching:</strong> Stop making &quot;art films&quot; nobody watches. Learn how to write thrillers and commercial content that audiences actually want to pay for.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Q2 CARD */}
          <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/25 transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500/80" />
            <div className="flex items-start gap-4">
              <span className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
                <Target className="w-6 h-6" />
              </span>
              <div>
                <h5 className="text-base font-bold text-white font-display mb-1">
                  🎯 Q2: SCRIPT &amp; CAST <span className="text-xs text-neutral-400 font-mono font-normal">(Months 4–6)</span>
                </h5>
                <p className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider mb-3">
                  The Focus: Preparing your project so it looks professional, not amateur.
                </p>
                <ul className="space-y-3 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Finding Stories:</strong> Learn how to find great books or news stories and turn them into gripping film scripts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Casting Stars:</strong> Learn the secret to pitching your idea to actors (and their agents) so you can get recognizable faces in your film without needing a massive budget.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Visual Strategy:</strong> We teach you the camera techniques used in blockbuster movies—how to frame shots and block scenes like a pro director.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Q3 CARD */}
          <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/25 transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500/60" />
            <div className="flex items-start gap-4">
              <span className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
                <Film className="w-6 h-6" />
              </span>
              <div>
                <h5 className="text-base font-bold text-white font-display mb-1">
                  🎬 Q3: THE SHOOT <span className="text-xs text-neutral-400 font-mono font-normal">(Months 7–9)</span>
                </h5>
                <p className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider mb-3">
                  The Focus: Getting your 15 episodes on camera.
                </p>
                <ul className="space-y-3 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Working as a Crew:</strong> You will shoot your own films, and your fellow students will act as your crew (lighting, camera, sound). You will rotate roles, so you learn exactly how a real set functions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Directing Like a Pro:</strong> Learn how to handle actors, follow set rules, and talk to union crews. This is about discipline and respect on set.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Editing &amp; Finishing:</strong> Learn the post-production pipeline—how to edit, color-grade, and design sound to make your film look and sound expensive.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Q4 CARD */}
          <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/25 transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500/40" />
            <div className="flex items-start gap-4">
              <span className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
                <DollarSign className="w-6 h-6" />
              </span>
              <div>
                <h5 className="text-base font-bold text-white font-display mb-1">
                  💰 Q4: RELEASE &amp; EARN <span className="text-xs text-neutral-400 font-mono font-normal">(Months 10–12)</span>
                </h5>
                <p className="text-xs text-amber-400 font-mono font-bold uppercase tracking-wider mb-3">
                  The Focus: Getting your work on screen and making money.
                </p>
                <ul className="space-y-3 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Going Live:</strong> Your final episodes go up on muvireel.com. We handle the tech; you focus on the launch.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Getting Paid:</strong> Learn how to pitch your work to brands for sponsorships. We show you how to sign deals where brands pay you to distribute your content.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>The Graduation Pitch:</strong> No gowns or certificates here. You will pitch your finished work directly to media buyers and OTT platforms in Mumbai. This is where your career officially starts.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SUMMARY BLOCK */}
        <div className="mt-12 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 text-center max-w-4xl mx-auto">
          <p className="text-sm text-neutral-200 leading-relaxed font-sans mb-6">
            <strong className="text-white">The bottom line:</strong> You aren&apos;t just learning to hold a camera. You&apos;re learning to own your career. One cohort. One year. <strong className="text-amber-400">Absolute industry leverage.</strong>
          </p>

          {/* Place 3: Cult Admissions Button decorated with elegance box and an arrow of hope above */}
          <div className="flex flex-col items-center gap-2.5">
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
      </div>
    </section>
  );
}
