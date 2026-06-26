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

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-tight leading-tight">
              The Film Industry is <br />
              <span className="italic font-normal text-amber-400 font-serif">Being Re-Invented.</span>
            </h3>

            <div className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans space-y-4">
              <p>
                For a century, the gate was controlled by people who never picked up a camera.
              </p>
              <p>
                Studios decided who got made. Distributors decided who got seen. And directors from Guwahati, Nagpur, Patna — they waited in those lobbies for permission that rarely came.
              </p>
              <p className="font-semibold text-white">
                That permission structure is finished.
              </p>
              <p>
                The filmmaker who understands modern screens, modern audiences, and modern money no longer needs a studio gate to walk through. <strong className="text-amber-400">They build their own.</strong>
              </p>
            </div>
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
                  <h4 className="text-lg font-bold text-white font-display">Cinema That Hooks in 3 Seconds</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    The way a frame is built — its ratio, its depth, the way light falls on a face — decides whether a viewer stays or scrolls. We teach the visual grammar of attention: anamorphic perspective, practical lighting that reads on a 6-inch screen, and pacing that makes cutting feel inevitable rather than mechanical.
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
                  <h4 className="text-lg font-bold text-white font-display">Sound That Makes the Body React</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    Most independent films lose their audience through the ears, not the eyes. We build sound from the floor up — foley that grounds a scene in physical reality, low-frequency design that the body feels before the mind registers it, and a rhythm between dialogue and silence that creates the tension no camera can manufacture alone.
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
                  <h4 className="text-lg font-bold text-white font-display">A Distribution Channel You Actually Own</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    Your finished work streams on MUVIREEL — not as a hope, but as a guaranteed first window. Direct ticketing for your premiere. Fan subscription tiers your audience chooses to pay for. Brand integration deals you negotiate and keep. No algorithm deciding your reach. No platform taking 70%. Your film, your audience, your revenue — from the night it premieres.
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
