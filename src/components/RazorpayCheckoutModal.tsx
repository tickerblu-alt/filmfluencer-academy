import React, { useState, useEffect } from "react";
import { 
  X, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  QrCode, 
  Loader2, 
  CheckCircle, 
  Building, 
  ArrowRight,
  Wifi,
  Lock
} from "lucide-react";

interface RazorpayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  purpose: string;
  onSuccess: (paymentId: string) => void;
}

export default function RazorpayCheckoutModal({
  isOpen,
  onClose,
  amount,
  purpose,
  onSuccess
}: RazorpayCheckoutModalProps) {
  const [method, setMethod] = useState<"upi" | "card" | "netbanking" | "qr">("qr");
  const [step, setStep] = useState<"select" | "processing" | "success">("select");
  const [loadingMessage, setLoadingMessage] = useState("");
  
  // Card Form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  
  // UPI Form state
  const [vpa, setVpa] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStep("select");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = () => {
    setStep("processing");
    const messages = [
      "Contacting secure banking network...",
      "Encrypting transactional credentials (AES-256)...",
      "Requesting Razorpay smart routing gateway...",
      "Waiting for bank ledger authentication..."
    ];
    
    let currentMsgIdx = 0;
    setLoadingMessage(messages[0]);
    
    const interval = setInterval(() => {
      currentMsgIdx++;
      if (currentMsgIdx < messages.length) {
        setLoadingMessage(messages[currentMsgIdx]);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setStep("success");
      
      // Play transaction sound
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        osc.frequency.setValueAtTime(523.25, context.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, context.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, context.currentTime + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, context.currentTime + 0.3); // C6
        gain.gain.setValueAtTime(0.25, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
        osc.start();
        osc.stop(context.currentTime + 0.55);
      } catch (e) {}

      setTimeout(() => {
        const mockPayId = "pay_" + Math.random().toString(36).substr(2, 9);
        onSuccess(mockPayId);
        onClose();
      }, 1500);
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-neutral-800 bg-[#0c0c0e] shadow-2xl text-sans">
        
        {/* Header Branding */}
        <div className="bg-neutral-900 px-6 py-4 flex justify-between items-center border-b border-neutral-850">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">R</span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">Razorpay Secure</h4>
              <p className="text-[9px] text-neutral-500 font-mono tracking-wider">FFA ONLINE MERCHANT GATEWAY</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount Box */}
        <div className="p-6 bg-gradient-to-r from-blue-950/20 to-neutral-950 border-b border-neutral-850 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-1">
              {purpose}
            </span>
            <span className="text-2xl font-mono font-extrabold text-white">
              ₹{amount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] font-mono text-emerald-400 font-extrabold uppercase">
              SECURE 256-BIT SSL
            </span>
          </div>
        </div>

        {/* STEP rendering */}
        {step === "select" && (
          <div className="p-6 space-y-6">
            
            {/* Method Tabs */}
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setMethod("qr")}
                className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === "qr" 
                    ? "bg-blue-600/10 border-blue-500/40 text-blue-400" 
                    : "bg-neutral-900/60 border-neutral-850 text-neutral-400 hover:text-white"
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-wider font-mono">UPI QR</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod("upi")}
                className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === "upi" 
                    ? "bg-blue-600/10 border-blue-500/40 text-blue-400" 
                    : "bg-neutral-900/60 border-neutral-850 text-neutral-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-wider font-mono">UPI VPA</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod("card")}
                className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === "card" 
                    ? "bg-blue-600/10 border-blue-500/40 text-blue-400" 
                    : "bg-neutral-900/60 border-neutral-850 text-neutral-400 hover:text-white"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod("netbanking")}
                className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === "netbanking" 
                    ? "bg-blue-600/10 border-blue-500/40 text-blue-400" 
                    : "bg-neutral-900/60 border-neutral-850 text-neutral-400 hover:text-white"
                }`}
              >
                <Building className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Banking</span>
              </button>
            </div>

            {/* Selected Method Details */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850 min-h-[160px] flex flex-col justify-center">
              
              {method === "qr" && (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-32 h-32 bg-white p-2.5 rounded-2xl flex items-center justify-center border-4 border-blue-600 shadow-lg shadow-blue-500/15 relative group">
                    {/* Simulated live QR Code */}
                    <div className="absolute inset-0 bg-neutral-900/10 backdrop-blur-[0.5px] rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] bg-black text-white px-2 py-1 rounded font-mono font-bold shadow">SECURED</span>
                    </div>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=muvireel@hdfcbank%26pn=Filmfluencer%2520Academy%26am=${amount}%26cu=INR`}
                      alt="Payment QR" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-neutral-300 font-semibold font-mono uppercase tracking-wide">Scan with GPay, PhonePe, or BHIM</p>
                    <p className="text-[10px] text-neutral-500">Transaction resets dynamically in 10:00 mins</p>
                  </div>
                </div>
              )}

              {method === "upi" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 mb-1.5 uppercase">Enter UPI ID / VPA *</label>
                    <input 
                      type="text" 
                      value={vpa}
                      onChange={(e) => setVpa(e.target.value)}
                      placeholder="e.g. yourname@okaxis" 
                      className="w-full bg-[#121214] border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-500">A payment prompt notification will be pushed securely to your UPI mobile app immediately.</p>
                </div>
              )}

              {method === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">Card Number</label>
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444" 
                      className="w-full bg-[#121214] border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">Expiry MM/YY</label>
                      <input 
                        type="text" 
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="12/28" 
                        className="w-full bg-[#121214] border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1 uppercase">CVV Code</label>
                      <input 
                        type="password" 
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="***" 
                        className="w-full bg-[#121214] border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === "netbanking" && (
                <div className="space-y-3">
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Select Popular Banks</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"].map((bank, i) => (
                      <button 
                        key={i}
                        type="button"
                        className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-left hover:border-blue-500/50 hover:bg-neutral-850 transition-colors text-neutral-300 flex items-center gap-2 cursor-pointer font-sans"
                      >
                        <Building className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="truncate text-[11px]">{bank}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold font-mono text-xs uppercase tracking-widest shadow-lg shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Confirm Transaction &amp; Pay &rarr;
            </button>

          </div>
        )}

        {/* Processing Step */}
        {step === "processing" && (
          <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 max-w-xs">
              <h5 className="text-sm font-bold text-white font-mono uppercase tracking-widest">Processing Payment</h5>
              <p className="text-xs text-neutral-400 leading-relaxed min-h-[40px]">
                {loadingMessage}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-neutral-500 font-mono tracking-widest uppercase mt-4">
              <Lock className="w-3.5 h-3.5" /> SECURE HANDSHAKE PENDING
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h5 className="text-base font-bold text-white font-mono uppercase tracking-widest">TRANSACTION SUCCESS</h5>
              <p className="text-xs text-emerald-400 font-mono">AUTHENTICATION COMPLETED SECURELY</p>
              <p className="text-[10px] text-neutral-500 max-w-xs leading-normal">
                Your payment of ₹{amount.toLocaleString()} is verified. Seats and wallet credits are instantly secured on the Filmfluencer Academy live ledger.
              </p>
            </div>
          </div>
        )}

        {/* Safety Footer */}
        <div className="bg-neutral-950 px-6 py-4 border-t border-neutral-850 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
          <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-blue-500" /> PCI-DSS COMPLIANT</span>
          <span>APPROVED MERCHANT</span>
        </div>

      </div>
    </div>
  );
}
