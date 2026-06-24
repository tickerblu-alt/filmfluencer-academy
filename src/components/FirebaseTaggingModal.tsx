import React, { useState, useEffect } from "react";
import { 
  X, 
  Tag, 
  Link as LinkIcon, 
  Type, 
  Layers, 
  Loader2, 
  CheckCircle2, 
  Trash2 
} from "lucide-react";
import { updateMediaAsset } from "../lib/firestoreService";
import { MediaAsset } from "../types";

interface FirebaseTaggingModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: MediaAsset | null;
  onSave: (id: string, updates: Partial<MediaAsset>) => void;
}

export default function FirebaseTaggingModal({ isOpen, onClose, asset, onSave }: FirebaseTaggingModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<"image" | "video">("image");
  const [taggedTrack, setTaggedTrack] = useState("Directing");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (asset) {
      setTitle(asset.title || "");
      setDescription(asset.description || "");
      setUrl(asset.url || "");
      setCategory(asset.category || "image");
      setTaggedTrack(asset.taggedTrack || "Directing");
    }
  }, [asset]);

  if (!isOpen || !asset) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates = {
        title,
        description,
        url,
        category,
        taggedTrack,
        createdAt: asset.createdAt || new Date().toISOString()
      };

      // Real Firestore update
      await updateMediaAsset(asset.id, updates);
      
      onSave(asset.id, updates);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        setLoading(false);
        onClose();
      }, 1200);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#121214] border-2 border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-neutral-900 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              🔴 Real-time Firebase Firestore tagging
            </span>
            <h3 className="text-xl font-serif text-white tracking-tight flex items-center gap-2 mt-1">
              <Tag className="w-5 h-5 text-amber-500" />
              Tag &amp; Sync Asset
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Sync Complete! Firestore updated successfully.</span>
          </div>
        )}

        {/* Thumbnail Preview */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 relative">
          <img 
            src={url || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400"} 
            className="w-full h-full object-cover" 
            alt="Asset Preview" 
            onError={(e) => {
              (e.target as any).src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            <span className="text-[10px] font-mono text-neutral-400">ID Reference: {asset.id}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sans">
          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Asset Direct Image / Video Cover URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <input 
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Asset Title / Headline</label>
            <div className="relative">
              <Type className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <input 
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title text"
                className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Cinematic Tag Category</label>
            <div className="relative">
              <Layers className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <select
                value={taggedTrack}
                onChange={(e) => setTaggedTrack(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              >
                <option value="Directing">Directing Specialization</option>
                <option value="Cinematography">Cinematography Specialization</option>
                <option value="Screenwriting">Screenwriting Specialization</option>
                <option value="Behind the Scenes">Behind the Scenes</option>
                <option value="Production Rigging">Production Rigging</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5 font-bold">Creative Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of composition, staging, and rigging details..."
              rows={3}
              className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sync updates to Firestore db
          </button>
        </form>

      </div>
    </div>
  );
}
