import React, { useState } from "react";
import { Play, BookOpen, Clock, ArrowRight, Sparkles, CheckCircle, Flame, Tv } from "lucide-react";
import { Course } from "../types";

interface FFACurriculumProps {
  courses: Course[];
  onNavigateToDashboard: (initialTab?: string) => void;
}

export default function FFACurriculum({ courses, onNavigateToDashboard }: FFACurriculumProps) {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [selectedLesson, setSelectedLesson] = useState<{title: string, summary: string, duration: string} | null>(null);

  // If courses are not loaded yet, show helper fallback
  if (!courses || courses.length === 0) {
    return (
      <section id="curriculum" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-neutral-950 text-center">
        <p className="text-neutral-400">Loading FFA syllabus...</p>
      </section>
    );
  }

  const stageTags = [
    "IDEATION & PITCHING",
    "ON-SET CRITICAL BLOCKING",
    "LEGAL BUSINESS & OTT RIGHTS"
  ];

  return (
    <section id="curriculum" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-gradient-to-b from-[#0b0b0c] via-[#09090a] to-[#0b0b0c] relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/[0.015] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.01] pointer-events-none" />

      {/* Elegant Header Block */}
      <div className="text-center max-w-4xl mx-auto mb-16 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
            FILMFLUENCER ACADEMY (FFA) SYLLABUS
          </span>
        </div>

        {/* Dynamic typography combining Cormorant Garamond serif with Space Grotesk/Inter */}
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-white tracking-tight leading-[1.1] mb-6">
          Full 3-Stage Curriculum
        </h3>

        <div className="w-16 h-[1px] bg-amber-500/50 mx-auto mb-6" />

        <p className="text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg font-serif italic leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-400">
          We teach the high-conversion directorship pipeline from initial seed scripts up to physical movie distributor handovers.
        </p>
      </div>

      {/* Interactive Stage Selectors */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2.5 p-1.5 bg-neutral-900/60 rounded-2xl border border-neutral-800/80 mb-12">
        {courses.map((course, idx) => {
          const isActive = activeStage === idx;
          return (
            <button
              key={course.id}
              onClick={() => {
                setActiveStage(idx);
                setSelectedLesson(null);
              }}
              className={`py-3.5 px-4 rounded-xl transition-all duration-300 text-left font-sans cursor-pointer group relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-[#1c1917] to-neutral-900 border border-amber-500/40 text-white shadow-xl shadow-amber-500/[0.03]"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/30 border border-transparent"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/[0.02] rounded-full blur-xl" />
              )}
              <div className="flex items-center gap-2.5">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isActive ? "bg-amber-500 text-black" : "bg-neutral-950 text-neutral-500"
                }`}>
                  STAGE 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono font-medium tracking-wider uppercase text-neutral-500">
                  {stageTags[idx] || "COHORT TRACK"}
                </span>
              </div>
              <h4 className={`text-sm font-semibold mt-2 truncate ${isActive ? "text-amber-400 animate-fadeIn" : "text-neutral-300"}`}>
                {course.title.replace("Establishing Your ", "")}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Stage Presentation Grid */}
      {(() => {
        const currentCourse = courses[activeStage];
        if (!currentCourse) return null;

        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Left Column: Stage Core Manifesto */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#121214] via-[#151518] to-[#0e0e10] border border-neutral-800/90 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.015] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 font-bold uppercase tracking-widest block max-w-max mb-6">
                  STAGE 0{activeStage + 1} DIRECTIVE
                </span>
                
                <h4 className="text-2xl sm:text-3xl font-normal font-serif text-white mb-4 leading-snug">
                  {currentCourse.title}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans font-light mb-6">
                  {currentCourse.description}
                </p>

                <div className="space-y-3.5 border-t border-neutral-900 pt-6">
                  <div className="flex items-center gap-3 text-xs text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Total master classes: <strong>{currentCourse.lessons.length} Modules</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Avg lesson duration: <strong>~20 minutes intense</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Includes direct interactive blueprints &amp; kits</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-950 flex flex-col gap-3">
                <button
                  onClick={() => onNavigateToDashboard("lessons")}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider font-sans hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/10 cursor-pointer"
                >
                  <Tv className="w-4 h-4" /> Stream Full Lessons in Portal <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono text-center text-neutral-500 block">
                  Accessible instantly on dashboard for registered members
                </span>
              </div>
            </div>

            {/* Right Column: Lessons Interactive Tree & Media summary */}
            <div className="lg:col-span-7 bg-[#0b0b0d] border border-neutral-900/80 rounded-3xl p-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-neutral-900 pb-4">
                  <h5 className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
                    SELECT LESSON TO PLAY PREVIEW SUMMARY
                  </h5>
                  <span className="text-[10px] font-mono text-amber-500">
                    {currentCourse.lessons.length} Modules
                  </span>
                </div>

                {/* Lesson interactive pills */}
                <div className="space-y-3">
                  {currentCourse.lessons.map((lesson, scoreIdx) => {
                    const isSelected = selectedLesson?.title === lesson.title;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                          isSelected
                            ? "bg-neutral-900/80 border-amber-500/30 text-white"
                            : "bg-neutral-950/40 border-neutral-900 hover:bg-neutral-900/30 hover:border-neutral-800"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-[11px] font-mono font-bold text-neutral-400 group-hover:text-amber-400 transition-colors">
                              {scoreIdx + 1}
                            </span>
                            <div>
                              <p className={`text-xs sm:text-sm font-semibold leading-snug transition-colors ${
                                isSelected ? "text-amber-400" : "text-neutral-200 group-hover:text-white"
                              }`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-mono text-neutral-500">{lesson.duration} duration</span>
                                <span className="text-[10px] text-neutral-700">•</span>
                                <span className="text-[10px] font-mono text-amber-400/60 uppercase">Exclusive Masterclass</span>
                              </div>
                            </div>
                          </div>

                          <div className={`p-1.5 rounded-full ${
                            isSelected ? "bg-amber-400 text-black" : "bg-neutral-900 text-neutral-500 group-hover:text-amber-400"
                          } transition-colors shrink-0`}>
                            <Play className="w-3 h-3 fill-current" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic summary preview block based on click */}
              <div className="mt-8 p-5 bg-neutral-950 rounded-2xl border border-neutral-900 relative overflow-hidden">
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-neutral-500 uppercase">SYS READY</span>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h6 className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
                      {selectedLesson ? "ACTIVE MODULE PREVIEW" : "INTEGRATED LAB INSIGHTS"}
                    </h6>
                    <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                      {selectedLesson 
                        ? selectedLesson.summary 
                        : "Click any interactive module lesson above to evaluate its direct clinical script-to-performance architecture, pacing guides, and set blockings."}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        );
      })()}
      
      {/* Decorative Brand Accent block */}
      <div className="mt-16 text-center">
        <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
          ESTIMATED LAB DIFFICULTY: HIGH IMPACT • CERTIFIED PVT. LTD. INCORPORATION GUARANTEED
        </p>
      </div>

    </section>
  );
}
