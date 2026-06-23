import React from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Camera, 
  Tv, 
  Sliders, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  Info
} from "lucide-react";

// Paths for generated assets
const cameraImg = "/src/assets/images/mumbai_film_school_camera_1782160590737.jpg";
const suiteImg = "/src/assets/images/mumbai_film_school_suite_1782160604476.jpg";

interface MumbaiStudioContactProps {
  onNavigateToDashboard: (initialTab?: string) => void;
}

export default function MumbaiStudioContact({ onNavigateToDashboard }: MumbaiStudioContactProps) {
  return (
    <section id="mumbai-studio" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-black relative">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/[0.015] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/[0.015] rounded-full blur-[100px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="border-b border-neutral-900 pb-12 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-extrabold">
                Mumbai Elite Campus
              </span>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                PREMIUM MEDIA HUB INFRASTRUCTURE
              </span>
              <h3 className="text-4xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
                ANDHERI (WEST) STUDIO
              </h3>
            </div>
            
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light font-sans max-w-2xl">
              Operate out of India's commercial film heartbeat. Our high-tech Andheri (West) physical film academy is rigged with industry-grade production stages, advanced master camera mounts, and modern Dolby audio-color post suites.
            </p>
          </div>

          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850 max-w-xs shrink-0">
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest font-black block mb-1">
              MUNI_STAGE ACQUIRED REGISTRY
            </span>
            <p className="text-[11px] text-neutral-500 font-sans leading-normal">
              Active sets are shared directly with Muvireel Private Limited licensing hubs in Andheri.
            </p>
          </div>
        </div>
      </div>

      {/* POSH INFRASTRUCTURE PHOTOGRAPHY SHOWCASE (CAMERA/EQUIPMENT AND EDITING STUDIO) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Card 1: Camera Stage & Rigging */}
        <div className="relative group bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
          <div className="relative aspect-video w-full overflow-hidden">
            {/* Visual Red Overlay Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
            <img 
              src={cameraImg} 
              alt="Posh Mumbai Film School Camera Stage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Floating indicator */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-red-650 font-bold bg-red-950/90 border border-red-500/40 text-red-400 text-[10px] font-mono rounded uppercase tracking-wider">
              STAGE 01: ARRI ALEXA PRESETS
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-red-500">
              <Camera className="w-5 h-5" />
              <h4 className="text-lg font-bold text-white font-display">
                Professional Camera &amp; Live Dolly Rigs
              </h4>
            </div>
            
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans font-light">
              Master industrial staging on our physical Mumbai soundstages. Includes direct daily hands-on training with Arri Alexa and Red Raptor packages, master dolly setups, wireless focus tracking, and heavy stage rigging systems under absolute guidance.
            </p>

            <div className="pt-4 border-t border-neutral-900/60 flex items-center justify-between text-neutral-500 font-mono text-[10px]">
              <span>EQUIPMENT LEVEL: ARRI/RED ACTIVE GOLD</span>
              <span className="text-red-400 font-extrabold flex items-center gap-1">
                INCLUDED FOR ALL COHORTS
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Post Editing Studio */}
        <div className="relative group bg-neutral-950 border border-neutral-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
          <div className="relative aspect-video w-full overflow-hidden">
            {/* Visual Amber/Red overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
            <img 
              src={suiteImg} 
              alt="Luxury Film Grading Suite Mumbai"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Floating indicator */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-neutral-950/90 border border-neutral-800 text-neutral-400 text-[10px] font-mono rounded uppercase tracking-wider">
              SUITE B: COLOR LAB &amp; DOLBY MIXING
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-red-500">
              <Sliders className="w-5 h-5" />
              <h4 className="text-lg font-bold text-white font-display">
                Advanced Editing &amp; Digital Grading Suite
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans font-light">
              Refine theatrical features in our dedicated Andheri West post suites. Features large dual high-fidelity grading panels, absolute Dolby Surround configurations, real-time DaVinci Resolve workflows, and neural speed AI prompt script layouts.
            </p>

            <div className="pt-4 border-t border-neutral-900/60 flex items-center justify-between text-neutral-500 font-mono text-[10px]">
              <span>EDIT PROTOCOLS: RESOLVE/PREMIERE 2026</span>
              <span className="text-red-400 font-extrabold flex items-center gap-1">
                LOCKED LICENSES
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* CONTACT INFORMATION PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto mb-16">
        
        {/* Left Grid: Elegant Address & Location Card */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#120a0a] via-[#1c0f0f] to-zinc-950 border border-red-900/40 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xl group">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-mono text-red-400 uppercase tracking-widest font-black">
                PHYSICAL CAMPUS DESK
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-2xl sm:text-3xl font-serif text-white tracking-tight font-normal">
                Visit Andheri (West) Studio
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm font-mono tracking-widest uppercase">
                COORDINATES: MUMBAI METRO DISTRICT
              </p>
            </div>

            <div className="space-y-4 pt-4 text-xs sm:text-sm font-sans font-light">
              <div className="flex gap-3 items-start text-neutral-250">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Filmfluencers Corporate Studio:</strong><br />
                  Muvireel Studio Spaces, Suite 302, 3rd Floor, Link Plaza Building, Next to Infiniti Mall, Andheri (West), Mumbai - 400053, Maharashtra, India.
                </span>
              </div>

              <div className="flex gap-3 items-center text-neutral-250">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <span>
                  <strong>Admissions Coordination Office:</strong> +91 91522 75588 / +91 98335 01019
                </span>
              </div>

              <div className="flex gap-3 items-center text-neutral-250">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <span>
                  <strong>Legal Enquiries &amp; Scripts:</strong> admissions@filmfluencers.com / hemant@muvireel.com
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-red-950/60 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 font-mono text-[10px]">
            <span>REGISTRATIONS DISPATCHED DAILY FROM ANDHERI</span>
            <span className="text-red-400 font-extrabold flex items-center gap-1 uppercase">
              STUDIO WALKTHROUGH VIA APPOINTMENT ONLY
            </span>
          </div>
        </div>

        {/* Right Grid: Elite Onboarding Helper */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-900 p-8 rounded-3xl flex flex-col justify-between shadow-2xl">
          <div className="space-y-6">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
              STUDIO TOURS &amp; COUNSELLING HOURS
            </span>
            
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              Connect directly with our cinematic admissions office to get a free comprehensive portfolio review, script attachment strategy blueprint, or book an appointment to meet Director Hemant Nilim Das in person at the Andheri (West) desk.
            </p>

            <div className="space-y-3 font-mono text-xs text-neutral-400">
              <div className="flex items-center justify-between p-3.5 bg-neutral-900/40 rounded-xl border border-neutral-900">
                <span>Monday - Saturday:</span>
                <span className="text-white">10:00 AM - 8:00 PM (IST)</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-neutral-900/40 rounded-xl border border-neutral-900">
                <span>Sunday (Urgent Bookings):</span>
                <span className="text-red-400">12:00 PM - 5:00 PM (IST)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById("enroll");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full mt-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-505 text-white font-semibold text-xs uppercase tracking-wider font-mono hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/10"
          >
            Schedule Physical Studio Tour &rarr;
          </button>
        </div>

      </div>

      {/* FOOTNOTE SECTION (FOR ALL BUTTONS, ADDRESS, REGISTRATION STUFFS) */}
      <div id="footnotes" className="bg-[#050506] border border-neutral-900 p-8 rounded-2xl max-w-6xl mx-auto space-y-6 relative overflow-hidden">
        <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
          <Info className="w-4 h-4 text-red-500" />
          <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
            OFFICIAL REGISTRAR &amp; STUDENT BUTTON DEEPLINK FOOTNOTES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[10.5px] font-mono text-neutral-500 leading-relaxed">
          <div className="space-y-3">
            <p>
              <strong className="text-neutral-300">Section 1.1 / &ldquo;Enter Student Streaming Hub&rdquo; &amp; Portal Buttons:</strong> Access credentials and interactive simulated cohort pipelines are stored securely in local app storage. Active students gain access keys to our exclusive database nodes instantly upon admission registry verification.
            </p>
            <p>
              <strong className="text-neutral-300">Section 1.2 / &ldquo;Book Seat&rdquo; &amp; &ldquo;Process Seat Booking fee&rdquo;:</strong> The onboarding seat reservation fee of ₹20,000 operates under strict guidelines of Muvireel Private Limited and Filmfluencer Academy. Fees are fully secured and legally eligible for direct credit transfer toward full tuition and equipment allocations.
            </p>
            <p>
              <strong className="text-neutral-300">Section 1.3 / &ldquo;Co-Directing Seat Placement&rdquo;:</strong> Direct deployment as Co-Director or Assistant Coordinator on are active professional theatrical feature streams is legally registered in student portfolios only after fulfillment of 85% attendance, visual blocking reviews, and script approval matrices.
            </p>
          </div>

          <div className="space-y-3">
            <p>
              <strong className="text-neutral-300">Section 2.1 / &ldquo;Register Client Partner Live&rdquo;:</strong> Branding metrics, logo simulation engines, and portfolio uploads are local utilities configured exclusively for live rendering tests. Custom uploaded assets remain under local context and do not alter legal copyright titles of the respective brands.
            </p>
            <p>
              <strong className="text-neutral-300">Section 2.2 / Registrar of Companies (ROC) &amp; Private Limited Banner:</strong> The guaranteed Private Limited production banner is fast-tracked and registered legally under the rules of the MCA (Ministry of Corporate Affairs, Government of India), providing lifelong commercial invoicing structures.
            </p>
            <p>
              <strong className="text-neutral-300">Section 2.3 / IMDB &amp; Filmfluencer Badges:</strong> Physical gold-foil credentials and verified IMDB listing structures are issued in partnership with regional distributors and are strictly copyrighted. All rights reserved &copy; 2026 Filmfluencer Academy. Registered Office: Andheri West, Mumbai, India.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-900 flex justify-between items-center text-[9px] text-neutral-600 font-mono flex-wrap gap-2">
          <span>COGNIZANT ACT REF: #FFA-MUM-2026-REG</span>
          <span>APPROVED BY BOARD OF DIRECTORS • GLOBAL SYNDICATE</span>
        </div>
      </div>

    </section>
  );
}
