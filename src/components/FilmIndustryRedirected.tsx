import React from "react";
import { Maximize2, Activity, Globe, Sparkles } from "lucide-react";

export default function FilmIndustryRedirected() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-neutral-950/20 relative overflow-hidden">
      {/* Visual background element */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/[0.015] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header & Main Pitch column */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                The New Paradigm
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
              The Film Industry is Being Re-Directed.
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              For 100 years, directors had to wait in lobby lines to get approval from traditional big studios. <strong className="text-white">No more</strong>. The modern high-definition filmmaker directs short films directly onto user screens. By focusing on premium formatting, hyper-crafted pacing, and community monetization, we have built a multi-million reach engine.
            </p>
          </div>

          {/* Three Pillars columns */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pillar 1 */}
            <div className="p-6 bg-[#121214] border border-neutral-850 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Maximize2 className="w-24 h-24 text-white" />
              </div>
              
              <div className="flex gap-4">
                <span className="p-3.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 h-max">
                  <Maximize2 className="w-6 h-6" />
                </span>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white font-display">Modern Kinematics</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    Format ratio framing, high-functional anamorphic perspective, and specialized lightning sets designed to hook modern audiences instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-[#121214] border border-neutral-850 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity className="w-24 h-24 text-white" />
              </div>

              <div className="flex gap-4">
                <span className="p-3.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 h-max">
                  <Activity className="w-6 h-6" />
                </span>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white font-display">The Acoustic Pulse</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    Master the sound design, foley soundscapes, dramatic low-frequency triggers, and rhythm pacing that captures full visual retention.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-[#121214] border border-neutral-850 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-24 h-24 text-white" />
              </div>

              <div className="flex gap-4">
                <span className="p-3.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 h-max">
                  <Globe className="w-6 h-6" />
                </span>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white font-display">Distribution Mastery</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    Get featured inside the core private MUVIREEL app. Build independent direct ticketing, fan subscription locks, and direct brand sponsorship layers.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
