import React, { useState, useEffect } from "react";
import { 
  X, 
  Sparkles, 
  Tv, 
  Mail, 
  Phone, 
  User, 
  Loader2, 
  CheckCircle,
  HelpCircle,
  Clock
} from "lucide-react";

interface EnquiryPopupProps {
  onSubmitEnquiry: (data: {
    name: string;
    email: string;
    phone: string;
    purpose: "Question" | "Enroll" | "Callback";
    message: string;
  }) => Promise<boolean>;
}

export default function EnquiryPopup({ onSubmitEnquiry }: EnquiryPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Directing");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const seen = sessionStorage.getItem("ffa_enquiry_popup_seen_2026");
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("ffa_enquiry_popup_seen_2026", "true");
      }, 1500); // Trigger after 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setError("Please specify your name, contact phone, and email address.");
      return;
    }

    setStep("loading");
    setError("");

    const payload = {
      name,
      email,
      phone,
      purpose: "Callback" as const,
      message: `Enquiry Pop-up Entry: Interested in ${interest} cohort specializations. Additional Note: ${message || "Please call back as soon as possible."}`
    };

    const ok = await onSubmitEnquiry(payload);
    if (ok) {
      setStep("success");
      // Autoclose after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } else {
      setError("Trouble communicating with the admissions server. Please try again.");
      setStep("form");
    }
  };

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fadeIn font-sans">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-800 bg-[#0c0c0e] shadow-2xl text-sans">
        
        {/* Dynamic top visual indicator */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-lg bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            
            {/* Header branding */}
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-black flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> LIMITED COHORT ACCESS
              </span>
              <h4 className="text-xl sm:text-2xl font-serif text-white tracking-tight font-normal">
                Secure Your Director's Callback
              </h4>
              <p className="text-xs text-neutral-400 leading-normal">
                Reserve your seat consultation or clear your admissions doubts with director Hemant Nilim Das's desk directly.
              </p>
            </div>

            {error && (
              <p className="p-3 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl text-xs font-mono">
                ⚠ {error}
              </p>
            )}

            <div className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-mono text-neutral-400 uppercase tracking-wider">Candidate Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-neutral-500" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ranbir Kashyap" 
                      className="w-full bg-neutral-900 border border-neutral-850 rounded-xl p-2.5 pl-10 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-mono text-neutral-400 uppercase tracking-wider">WhatsApp Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-neutral-500" />
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210" 
                      className="w-full bg-neutral-900 border border-neutral-850 rounded-xl p-2.5 pl-10 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-mono text-neutral-400 uppercase tracking-wider">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-neutral-500" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-xl p-2.5 pl-10 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["Directing", "Cinematography", "Screenwriting"].map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setInterest(t)}
                    className={`py-2 px-1 rounded-xl border text-[10px] font-semibold font-mono uppercase tracking-wider cursor-pointer ${
                      interest === t 
                        ? "bg-red-500/10 border-red-500 text-red-400" 
                        : "bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-mono text-neutral-400 uppercase tracking-wider">Brief Message / Goal (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  placeholder="Tell us about your production background..."
                  className="w-full bg-neutral-900 border border-neutral-850 rounded-xl p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-xs uppercase tracking-widest shadow-lg shadow-red-600/10 cursor-pointer"
            >
              Request Call Back &rarr;
            </button>

            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-[10.5px] text-neutral-500 hover:text-neutral-300 font-mono block cursor-pointer"
            >
              I will browse the catalog first
            </button>

          </form>
        )}

        {step === "loading" && (
          <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
            <div className="space-y-1.5">
              <h5 className="text-sm font-bold text-white font-mono uppercase">Securing Connection</h5>
              <p className="text-xs text-neutral-400">Pushed lead entry to admissions coordinator...</p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-bounce mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h5 className="text-base font-bold text-white font-mono uppercase">Enquiry Received</h5>
              <p className="text-xs text-neutral-400 max-w-xs leading-normal mx-auto">
                Your priority request is saved in the Andheri West admissions database. Expect a call on WhatsApp shortly!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
