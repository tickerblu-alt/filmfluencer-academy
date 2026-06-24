import React, { useState, useEffect } from "react";
import { 
  Play, 
  Tv, 
  Image as ImageIcon, 
  Smartphone, 
  X, 
  Upload, 
  Clock, 
  Film,
  Camera,
  Trash2,
  Sliders,
  Filter,
  Tag
} from "lucide-react";
import { addMediaAsset, getMediaAssets } from "../lib/firestoreService";
import { MediaAsset } from "../types";

interface FFAWorkGalleryProps {
  onPlayVideo: (youtubeId: string) => void;
  isAdminPowerActive?: boolean;
  onEditAsset?: (asset: MediaAsset) => void;
}

interface GalleryItem {
  id: string;
  type: "video" | "image_16_9" | "image_9_16";
  title: string;
  category: string;
  aspect: "16:9" | "9:16";
  sourceUrl: string; // YouTube ID for videos, Unsplash URL for images
  cameraSpecs?: string;
  director?: string;
}

export default function FFAWorkGallery({ onPlayVideo, isAdminPowerActive = false, onEditAsset }: FFAWorkGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "video" | "16_9" | "9_16">("all");
  const [customItems, setCustomItems] = useState<GalleryItem[]>([]);
  const [feedback, setFeedback] = useState("");
  const [captionInput, setCaptionInput] = useState("");
  const [aspectSelector, setAspectSelector] = useState<"16:9" | "9:16">("16:9");

  // Core static assets:
  const defaultVideos: GalleryItem[] = [
    {
      id: "vid_1",
      type: "video",
      title: "Pocket Gangsters - Official Cinema Trailer",
      category: "Feature Film",
      aspect: "16:9",
      sourceUrl: "vBq72eF_u1A",
      cameraSpecs: "RED EPIC-M RED DRAGON",
      director: "Hemant Nilim Das"
    },
    {
      id: "vid_2",
      type: "video",
      title: "ARRI ALEXA 35 - Cinematic Low Light Demo",
      category: "Camera Lab",
      aspect: "16:9",
      sourceUrl: "eN3rAsfUuC4",
      cameraSpecs: "ARRI ALEXA 35 • Master Anamorphic",
      director: "FFA Tech Lab"
    },
    {
      id: "vid_3",
      type: "video",
      title: "Cinematography Composition & Master Setups",
      category: "Masterclass",
      aspect: "16:9",
      sourceUrl: "qJgV_O70_gI",
      cameraSpecs: "Sony VENICE 2 • Cooke S8/i",
      director: "Cinematic Board"
    },
    {
      id: "vid_4",
      type: "video",
      title: "Guerrilla Filmmaking & High Speed Chase",
      category: "Action Sequence",
      aspect: "16:9",
      sourceUrl: "j-I0_h6O0n8",
      cameraSpecs: "RED V-RAPTOR XL 8K",
      director: "Hemant Nilim Das"
    },
    {
      id: "vid_5",
      type: "video",
      title: "The Silent Brahmaputra - Behind The Scenes",
      category: "Upcoming Feature",
      aspect: "16:9",
      sourceUrl: "dQw4w9WgXcQ",
      cameraSpecs: "ARRI ALEXA Mini LF",
      director: "Student AD Cohort 4"
    },
    {
      id: "vid_6",
      type: "video",
      title: "Commercial Fashion Spot - Lamborghini Mumbai",
      category: "Brand Campaign",
      aspect: "16:9",
      sourceUrl: "C8A1hN6R4I0",
      cameraSpecs: "ARRI AMIRA • Zeiss Supreme Primes",
      director: "Hemant Nilim Das"
    }
  ];

  const default169Images: GalleryItem[] = [
    {
      id: "img_169_1",
      type: "image_16_9",
      title: "The Director's Lens and Monitor Calibration",
      category: "Behind the Scenes",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "ARRI ALEXA Mini LF • 50mm",
      director: "H.N. Das Set"
    },
    {
      id: "img_169_2",
      type: "image_16_9",
      title: "Atmospheric Neon Night Shoot Blocking",
      category: "Cinematography",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "RED Ranger Helium • Cooke Anamorphic",
      director: "Andheri Night Cohort"
    },
    {
      id: "img_169_3",
      type: "image_16_9",
      title: "RED Camera Setup on Heavy Dolly Tracks",
      category: "Production Rigging",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "RED V-Raptor • O'Connor Head",
      director: "Equipment Lab"
    },
    {
      id: "img_169_4",
      type: "image_16_9",
      title: "High Contrast Color Grading Suite Workflow",
      category: "Post Production",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "DaVinci Resolve Studio 18.5",
      director: "Suite B Colorist"
    },
    {
      id: "img_169_5",
      type: "image_16_9",
      title: "Guerrilla Action Filming in River Basins",
      category: "Feature Shoot",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "ARRI Alexa Mini LF • Ronin 2",
      director: "Brahmaputra Hunters Set"
    },
    {
      id: "img_169_6",
      type: "image_16_9",
      title: "Theatrical Rehearsals & Actor Placement",
      category: "Directing Actors",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1516307361426-f499a51c9077?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "Blocking & Script Sync",
      director: "H.N. Das Acting Masterclass"
    },
    {
      id: "img_169_7",
      type: "image_16_9",
      title: "Cinematic Anamorphic Flare Test Spot",
      category: "Lens Physics",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "Atlas Orion Anamorphic Prime",
      director: "FFA Optics Lab"
    },
    {
      id: "img_169_8",
      type: "image_16_9",
      title: "Sunset Drone Flyover Composition Check",
      category: "Aerial Cinematography",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "DJI Inspire 3 • Zenmuse X9-8K",
      director: "Aerial Unit Mumbai"
    },
    {
      id: "img_169_9",
      type: "image_16_9",
      title: "Foley Recording & Surround Mix Engineering",
      category: "Sound Design",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "ProTools HD • Avid S6 Control Surface",
      director: "Dolby Audio Lab"
    },
    {
      id: "img_169_10",
      type: "image_16_9",
      title: "Script Writing & Character Beat Breakdown",
      category: "Screenwriting",
      aspect: "16:9",
      sourceUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
      cameraSpecs: "Final Draft 12 • AI Script Copilot",
      director: "Screenplay Workshop"
    }
  ];

  const default916Images: GalleryItem[] = [
    {
      id: "img_916_1",
      type: "image_9_16",
      title: "Vertical Cinema Series - Official Poster Still",
      category: "TikTok Micro-Series",
      aspect: "9:16",
      sourceUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
      cameraSpecs: "RED Ranger vertical mount",
      director: "Social Media Campaign"
    },
    {
      id: "img_916_2",
      type: "image_9_16",
      title: "The Cinematic Actress Portrait Block",
      category: "Drama Showcase",
      aspect: "9:16",
      sourceUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      cameraSpecs: "Leica Summilux Prime • T1.4",
      director: "Hemant Nilim Das Closeups"
    },
    {
      id: "img_916_3",
      type: "image_9_16",
      title: "Cinematographer on Set Framing Vertical Reel",
      category: "Mobile Formats",
      aspect: "9:16",
      sourceUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
      cameraSpecs: "Sony FX3 Rigged • Vertical Cage",
      director: "Reels Distribution Unit"
    }
  ];

  // Load custom gallery items from localStorage and Firestore
  useEffect(() => {
    async function loadFirestoreMedia() {
      const dbMedia = await getMediaAssets();
      if (dbMedia && dbMedia.length > 0) {
        const parsed: GalleryItem[] = dbMedia.map(item => ({
          id: item.id,
          type: item.category === "video" ? "video" : (item.taggedTrack?.includes("9:16") ? "image_9_16" : "image_16_9"),
          title: item.title,
          category: item.taggedTrack || "Director Asset",
          aspect: item.taggedTrack?.includes("9:16") ? "9:16" : "16:9",
          sourceUrl: item.url,
          cameraSpecs: item.description,
          director: "FFA Faculty Backend"
        }));
        
        // save to customItems
        setCustomItems(parsed);
      } else {
        const saved = localStorage.getItem("ffa_custom_gallery_items");
        if (saved) {
          try {
            setCustomItems(JSON.parse(saved));
          } catch (e) {}
        }
      }
    }
    loadFirestoreMedia();
  }, []);

  const saveCustomItems = (items: GalleryItem[]) => {
    setCustomItems(items);
    localStorage.setItem("ffa_custom_gallery_items", JSON.stringify(items));
  };

  const handleCustomUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback("Only images are supported for custom gallery uploads.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setFeedback("File size must be under 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const aspect = aspectSelector;
      const titleText = captionInput || file.name.split(".")[0] || "Custom Creative Piece";

      // If Admin Power is active, push straight to Firestore!
      if (isAdminPowerActive) {
        setFeedback("Pushing new piece to Cloud Firestore db...");
        const newAssetData = {
          url: dataUrl,
          title: titleText,
          description: "Admin Uploaded • Verified Cinema Frame",
          category: "image" as const,
          taggedTrack: aspect === "16:9" ? "16:9 aspect" : "9:16 aspect",
          createdAt: new Date().toISOString()
        };
        const docRef = await addMediaAsset(newAssetData);
        setCustomItems(prev => [
          {
            id: docRef.id,
            type: aspect === "16:9" ? "image_16_9" : "image_9_16",
            title: titleText,
            category: "Cloud Firestore Asset",
            aspect,
            sourceUrl: dataUrl,
            cameraSpecs: "Cloud Managed"
          },
          ...prev
        ]);
        setFeedback("Cinematic asset fully integrated into Firestore database!");
      } else {
        // local storage fallback
        const newItem: GalleryItem = {
          id: "gallery_custom_" + Date.now(),
          type: aspect === "16:9" ? "image_16_9" : "image_9_16",
          title: titleText,
          category: "User Work Upload",
          aspect,
          sourceUrl: dataUrl,
          cameraSpecs: "User Device • Simulated Cinema Frame",
          director: "Prospective Student Work"
        };
        const updated = [newItem, ...customItems];
        saveCustomItems(updated);
        setFeedback("Cinematic gallery piece uplinked successfully!");
      }

      setCaptionInput("");
      setTimeout(() => setFeedback(""), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteItem = (id: string) => {
    const updated = customItems.filter(item => item.id !== id);
    saveCustomItems(updated);
    setFeedback("Piece removed from gallery stream.");
    setTimeout(() => setFeedback(""), 3000);
  };

  const allItems: GalleryItem[] = [
    ...defaultVideos,
    ...customItems.filter(i => i.type === "video"),
    ...default169Images,
    ...customItems.filter(i => i.type === "image_16_9"),
    ...default916Images,
    ...customItems.filter(i => i.type === "image_9_16")
  ];

  const filteredItems = allItems.filter(item => {
    if (activeFilter === "all") return true;
    if (activeFilter === "video") return item.type === "video";
    if (activeFilter === "16_9") return item.type === "image_16_9";
    if (activeFilter === "9_16") return item.type === "image_9_16";
    return true;
  });

  return (
    <section id="ffa-work-gallery" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-900 bg-black relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/[0.01] rounded-full blur-[120px] pointer-events-none" />
      
      {/* SECTION HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-neutral-900 pb-12 mb-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <Film className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-black">
              LIVE CINEMA PORTFOLIOS
            </span>
          </div>
          
          <h3 className="text-4xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
            FFA WORK GALLERY
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
            Dive into our exhaustive showcase. Rigged with YouTube showreel streams, horizontal (16:9) cinematic framing masters, and vertical (9:16) drama reels. Browse, review composition, or upload your own work directly to join the gallery feed.
            {isAdminPowerActive && (
              <strong className="text-amber-400 block mt-2">
                🔴 ADMIN POWER ENABLED: Click on any image/video cover to edit and tag its metadata directly inside Cloud Firestore!
              </strong>
            )}
          </p>
        </div>

        {/* Live Counter Info */}
        <div className="bg-[#0b0b0c] border border-neutral-850 p-4 rounded-2xl flex items-center gap-6 shrink-0 font-mono text-[10.5px]">
          <div className="text-center">
            <span className="text-amber-500 font-extrabold text-lg block leading-none mb-1">
              {allItems.filter(i => i.type === "video").length}
            </span>
            <span className="text-neutral-500 uppercase tracking-wider block">Videos</span>
          </div>
          <div className="h-8 w-px bg-neutral-900" />
          <div className="text-center">
            <span className="text-white font-extrabold text-lg block leading-none mb-1">
              {allItems.filter(i => i.type === "image_16_9").length}
            </span>
            <span className="text-neutral-500 uppercase tracking-wider block">16:9 Frames</span>
          </div>
          <div className="h-8 w-px bg-neutral-900" />
          <div className="text-center">
            <span className="text-white font-extrabold text-lg block leading-none mb-1">
              {allItems.filter(i => i.type === "image_9_16").length}
            </span>
            <span className="text-neutral-500 uppercase tracking-wider block">9:16 Portrait</span>
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS & UPLOADER INLINE CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 flex-wrap bg-neutral-950 p-4 rounded-2xl border border-neutral-900">
        
        {/* Navigation Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Masterpieces" },
            { id: "video", label: `Cinema Videos (${allItems.filter(i => i.type === "video").length})` },
            { id: "16_9", label: `16:9 Cinema Frames (${allItems.filter(i => i.type === "image_16_9").length})` },
            { id: "9_16", label: `9:16 Mobile Formats (${allItems.filter(i => i.type === "image_9_16").length})` }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono tracking-wide uppercase transition-all cursor-pointer ${
                activeFilter === btn.id 
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/10" 
                  : "bg-neutral-900/60 text-neutral-400 hover:text-white border border-neutral-850"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Inline Gallery Image Uploader */}
        <div className="flex flex-wrap items-center gap-3">
          <input 
            type="text"
            value={captionInput}
            onChange={(e) => setCaptionInput(e.target.value)}
            placeholder="Frame Caption..."
            className="px-3.5 py-2.5 bg-[#0b0b0c] border border-neutral-850 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono w-44"
          />
          <select
            value={aspectSelector}
            onChange={(e) => setAspectSelector(e.target.value as any)}
            className="px-3 py-2.5 bg-[#0b0b0c] border border-neutral-850 rounded-xl text-xs text-neutral-300 font-mono focus:outline-none"
          >
            <option value="16:9">16:9 aspect</option>
            <option value="9:16">9:16 aspect</option>
          </select>
          <label className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-amber-400" />
            {isAdminPowerActive ? "Uplink to Firestore" : "Uplink Frame"}
            <input 
              type="file" 
              accept="image/*"
              onChange={handleCustomUpload}
              className="hidden" 
            />
          </label>
        </div>

      </div>

      {/* FEEDBACK STATUS */}
      {feedback && (
        <div className="mb-8 p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl text-xs font-mono animate-pulse">
          ⚡ {feedback}
        </div>
      )}

      {/* MAIN GALLERY DISPLAY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        {filteredItems.map((item, index) => {
          const isVideo = item.type === "video";
          const is916 = item.type === "image_9_16";
          
          return (
            <div 
              key={item.id}
              className={`group relative bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-neutral-800 ${
                is916 ? "row-span-2 md:col-span-1" : "col-span-1"
              }`}
            >
              
              {/* Image/Video Box */}
              <div className={`relative w-full overflow-hidden bg-neutral-900 flex items-center justify-center ${
                is916 ? "aspect-[9/16]" : "aspect-video"
              }`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10 opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Click-to-Edit Overlay in Admin Mode */}
                {isAdminPowerActive && onEditAsset && (
                  <div 
                    onClick={() => {
                      onEditAsset({
                        id: item.id,
                        url: item.sourceUrl,
                        title: item.title,
                        description: item.cameraSpecs || "",
                        category: isVideo ? "video" : "image",
                        taggedTrack: item.category,
                        createdAt: new Date().toISOString()
                      });
                    }}
                    className="absolute inset-0 bg-amber-500/25 hover:bg-amber-500/50 cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-all z-30 opacity-0 group-hover:opacity-100 border-2 border-dashed border-amber-500"
                    title="Click to edit/tag in Firestore Backend"
                  >
                    <Tag className="w-5 h-5 text-amber-400" />
                    <span className="bg-black/80 text-amber-400 font-mono text-[9px] font-bold tracking-widest px-2 py-1 rounded border border-amber-500/30 uppercase">
                      ⚡ Tag Firestore
                    </span>
                  </div>
                )}

                {isVideo ? (
                  <>
                    <img 
                      src={`https://img.youtube.com/vi/${item.sourceUrl}/hqdefault.jpg`} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-3 left-3 z-20 px-2 py-0.5 bg-amber-500 text-black text-[9px] font-mono font-extrabold uppercase rounded">
                      VIDEO PREVIEW
                    </div>

                    <div 
                      onClick={() => !isAdminPowerActive && onPlayVideo(item.sourceUrl)}
                      className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg transform transition-all group-hover:scale-110 shadow-amber-500/20 hover:bg-amber-400">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img 
                      src={item.sourceUrl} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-3 left-3 z-20 px-2 py-0.5 bg-neutral-900/90 text-neutral-400 text-[9px] font-mono font-extrabold uppercase rounded border border-neutral-800">
                      {item.aspect} CINEMA
                    </div>

                    {item.id.startsWith("gallery_custom_") && !isAdminPowerActive && (
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-black border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/40 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        title="Delete Piece"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Caption details box */}
              <div className="p-4 bg-neutral-950 border-t border-neutral-900 space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                    {item.category}
                  </span>
                  <h5 className="text-[12.5px] font-semibold text-white tracking-wide font-sans truncate leading-snug group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h5>
                </div>

                <div className="pt-2.5 border-t border-neutral-900/60 flex items-center justify-between text-[8.5px] font-mono text-neutral-500">
                  <span className="truncate max-w-[120px]">{item.cameraSpecs || "ARRI ALEXA MINI LF"}</span>
                  <span className="text-amber-400 font-extrabold uppercase text-[7.5px] shrink-0">
                    {item.director ? `BY: ${item.director.slice(0, 15)}` : "BY: FFA COHORT"}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
