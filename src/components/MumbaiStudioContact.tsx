import React, { useState, useEffect } from "react";
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
  Info,
  Upload,
  Trash2,
  Plus
} from "lucide-react";

// Paths for generated assets
const cameraImg = "/src/assets/images/mumbai_film_school_camera_1782160590737.jpg";
const suiteImg = "/src/assets/images/mumbai_film_school_suite_1782160604476.jpg";

interface MumbaiStudioContactProps {
  onNavigateToDashboard?: (initialTab?: string) => void;
}

interface CustomStudioImage {
  id: string;
  url: string;
  caption: string;
  timestamp: string;
}

export default function MumbaiStudioContact({ onNavigateToDashboard }: MumbaiStudioContactProps) {
  const [studioImages, setStudioImages] = useState<CustomStudioImage[]>([]);
  const [captionInput, setCaptionInput] = useState("");
  const [feedback, setFeedback] = useState("");

  // States for custom main stage and suite images
  const [customCameraImg, setCustomCameraImg] = useState<string>(() => {
    return localStorage.getItem("fifi_custom_camera_img") || cameraImg;
  });
  const [customSuiteImg, setCustomSuiteImg] = useState<string>(() => {
    return localStorage.getItem("fifi_custom_suite_img") || suiteImg;
  });

  const handleCameraImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCustomCameraImg(dataUrl);
      localStorage.setItem("fifi_custom_camera_img", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSuiteImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCustomSuiteImg(dataUrl);
      localStorage.setItem("fifi_custom_suite_img", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraImgReset = () => {
    setCustomCameraImg(cameraImg);
    localStorage.removeItem("fifi_custom_camera_img");
  };

  const handleSuiteImgReset = () => {
    setCustomSuiteImg(suiteImg);
    localStorage.removeItem("fifi_custom_suite_img");
  };

  // Load custom uploaded images from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("fifi_custom_studio_images");
    if (saved) {
      try {
        setStudioImages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveImages = (images: CustomStudioImage[]) => {
    setStudioImages(images);
    localStorage.setItem("fifi_custom_studio_images", JSON.stringify(images));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback("Please select a valid image file.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setFeedback("Image is too large. Keep it under 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const newImg: CustomStudioImage = {
        id: "img_" + Date.now(),
        url: dataUrl,
        caption: captionInput || file.name.split(".")[0] || "Custom Studio Capture",
        timestamp: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
      };
      
      const updated = [newImg, ...studioImages];
      saveImages(updated);
      setCaptionInput("");
      setFeedback("Studio image uploaded successfully!");
      setTimeout(() => setFeedback(""), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (id: string) => {
    const updated = studioImages.filter(img => img.id !== id);
    saveImages(updated);
    setFeedback("Image removed from studio database.");
    setTimeout(() => setFeedback(""), 3000);
  };

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
          <div className="relative aspect-[4/3] xs:aspect-video w-full overflow-hidden">
            {/* Visual Red Overlay Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
            <img 
              src={customCameraImg} 
              alt="Posh Mumbai Film School Camera Stage"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Floating indicator */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-red-650 font-bold bg-red-950/90 border border-red-500/40 text-red-400 text-[10px] font-mono rounded uppercase tracking-wider">
              STAGE 01: ARRI ALEXA PRESETS
            </div>

            {/* Hover Actions overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center gap-3">
              <label className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-mono font-bold tracking-wider uppercase cursor-pointer transition-all shadow-lg shadow-red-600/25">
                Uplink Real Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleCameraImgUpload} 
                  className="hidden" 
                />
              </label>
              {customCameraImg !== cameraImg && (
                <button 
                  onClick={handleCameraImgReset}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white rounded text-xs font-mono font-bold tracking-wider uppercase transition-all"
                >
                  Reset Default
                </button>
              )}
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
          <div className="relative aspect-[4/3] xs:aspect-video w-full overflow-hidden">
            {/* Visual Amber/Red overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
            <img 
              src={customSuiteImg} 
              alt="Luxury Film Grading Suite Mumbai"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Floating indicator */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-neutral-950/90 border border-neutral-800 text-neutral-400 text-[10px] font-mono rounded uppercase tracking-wider">
              SUITE B: COLOR LAB &amp; DOLBY MIXING
            </div>

            {/* Hover Actions overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center gap-3">
              <label className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-mono font-bold tracking-wider uppercase cursor-pointer transition-all shadow-lg shadow-red-600/25">
                Uplink Real Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleSuiteImgUpload} 
                  className="hidden" 
                />
              </label>
              {customSuiteImg !== suiteImg && (
                <button 
                  onClick={handleSuiteImgReset}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white rounded text-xs font-mono font-bold tracking-wider uppercase transition-all"
                >
                  Reset Default
                </button>
              )}
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

      {/* STUDENT SET UPLOADS & CUSTOM GALLERY */}
      <div className="mb-24 bg-neutral-950/60 border border-neutral-900 rounded-3xl p-8 max-w-6xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/[0.01] rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-900 pb-6 mb-8">
          <div>
            <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block font-bold mb-1">
              PROSPECTIVE STUDENT &amp; SET SHOTS
            </span>
            <h4 className="text-2xl font-serif text-white tracking-tight font-normal">
              Andheri Set &amp; Studio Gallery
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Add your own production stills, camera tests, or physical campus visit photos to our real-time community stream.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch shrink-0">
            <input 
              type="text"
              value={captionInput}
              onChange={(e) => setCaptionInput(e.target.value)}
              placeholder="Caption (e.g. Set Visit ARRI Lab)"
              className="px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 font-mono w-full sm:w-56"
            />
            <label className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-red-600/10 shrink-0">
              <Upload className="w-4 h-4" />
              Upload Image
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div className="mb-6 p-3.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-xl text-xs font-mono flex items-center gap-2 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {feedback}
          </div>
        )}

        {/* Dynamic User Images Grid */}
        {studioImages.length === 0 ? (
          <div className="border-2 border-dashed border-neutral-850 rounded-2xl py-12 px-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
              <Camera className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-neutral-300 uppercase font-mono tracking-wider">No custom set uploads yet</p>
              <p className="text-[11px] text-neutral-500">Use the upload button above to add your physical studio and film shoot captures!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {studioImages.map((img) => (
              <div 
                key={img.id}
                className="group relative bg-neutral-900 border border-neutral-850 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] xs:aspect-video w-full overflow-hidden bg-neutral-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
                  <img 
                    src={img.url} 
                    alt={img.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteImage(img.id)}
                    className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-black/80 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/40 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 space-y-1 bg-[#0e0e10]">
                  <p className="text-xs font-semibold text-white truncate font-sans tracking-wide">
                    {img.caption}
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500">
                    <span>UPLINKED: LOCAL DEVICE</span>
                    <span className="text-neutral-400 font-bold">{img.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
                  <strong>Filmfluencer Corporate Studio:</strong><br />
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

          <a
            href="https://wa.me/919004221717?text=Hi!%20I%20want%20to%20schedule%20a%20physical%20studio%20tour%20at%20Andheri%20West%20for%20the%20upcoming%20batch."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider font-mono hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/10 text-center"
          >
            Schedule Physical Studio Tour &rarr;
          </a>
        </div>

      </div>



    </section>
  );
}
