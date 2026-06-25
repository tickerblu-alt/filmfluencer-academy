import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import { 
  DEFAULT_PORTFOLIO, 
  DEFAULT_COURSES, 
  DEFAULT_ENQUIRIES, 
  DEFAULT_PAYMENTS, 
  DEFAULT_SUBSCRIPTIONS 
} from "./lib/mockStaticData";
import { Course, Enquiry, Payment, PortfolioData, Subscription } from "./types";
import { 
  Sparkles, 
  CheckCircle, 
  Skull,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  QrCode,
  Lock,
  ShieldCheck,
  X,
  Check,
  Loader
} from "lucide-react";

export default function App() {
  // Static-dynamic caches
  const [portfolio] = useState<PortfolioData | null>(DEFAULT_PORTFOLIO);
  const [courses] = useState<Course[]>(DEFAULT_COURSES);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(DEFAULT_ENQUIRIES);
  const [payments, setPayments] = useState<Payment[]>(DEFAULT_PAYMENTS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(DEFAULT_SUBSCRIPTIONS);

  // Toast notifier message state
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Helper trigger to show custom toast alerts
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Cashfree Modal State
  const [cashfreeModal, setCashfreeModal] = useState<{
    amount: number;
    purpose: string;
  } | null>(null);

  // Cashfree Checkout Inputs & Interaction States
  const [cashfreeTab, setCashfreeTab] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [cashfreeCardNum, setCashfreeCardNum] = useState("");
  const [cashfreeCardExpiry, setCashfreeCardExpiry] = useState("");
  const [cashfreeCardCvv, setCashfreeCardCvv] = useState("");
  const [cashfreeCardName, setCashfreeCardName] = useState("");
  const [cashfreeUpiId, setCashfreeUpiId] = useState("");
  const [cashfreeBank, setCashfreeBank] = useState("SBI");
  const [cashfreeWallet, setCashfreeWallet] = useState("Paytm");
  const [cashfreePaying, setCashfreePaying] = useState(false);
  const [cashfreeStatusMessage, setCashfreeStatusMessage] = useState("");
  const [cashfreeSuccess, setCashfreeSuccess] = useState(false);

  // Post new enquiries
  const handleSubmitEnquiry = async (data: {
    name: string;
    email: string;
    phone: string;
    purpose: "Question" | "Enroll" | "Callback";
    message: string;
  }) => {
    const mockEnq: Enquiry = {
      id: "enq_" + Math.random().toString(36).substr(2, 9),
      ...data,
      status: "New",
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [mockEnq, ...prev]);
    showToast("Enquiry submitted successfully! Our admissions coordinator will reach out to you within 2 hours.", "success");
    return true;
  };

  // Trigger Checkout Payments - launches Cashfree Payment Gateway overlay modal
  const handleTriggerPayment = async (amount: number, purpose: string) => {
    setCashfreeModal({ amount, purpose });
    setCashfreeTab("upi");
    setCashfreeCardNum("");
    setCashfreeCardExpiry("");
    setCashfreeCardCvv("");
    setCashfreeCardName("");
    setCashfreeUpiId("");
    setCashfreePaying(false);
    setCashfreeStatusMessage("");
    setCashfreeSuccess(false);
    showToast(`Launching Cashfree secure gateway for ₹${amount.toLocaleString()}...`, "info");
  };

  const handleProcessCashfreePayment = () => {
    if (!cashfreeModal) return;
    setCashfreePaying(true);
    setCashfreeStatusMessage("Establishing secure handshakes with Cashfree API nodes...");
    
    setTimeout(() => {
      setCashfreeStatusMessage("Awaiting client-side payment authorization responses...");
    }, 800);

    setTimeout(() => {
      setCashfreeStatusMessage("Verifying signature hashes and cashfree token receipts...");
    }, 1600);

    setTimeout(() => {
      const mockPay: Payment = {
        id: "cf_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: cashfreeModal.amount,
        purpose: cashfreeModal.purpose,
        status: "Completed",
        method: `Cashfree Gateway (${cashfreeTab.toUpperCase()})`,
        createdAt: new Date().toISOString()
      };
      setPayments(prev => [mockPay, ...prev]);
      setCashfreePaying(false);
      setCashfreeSuccess(true);
      
      // Play a simulated triumph chime if supported
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        osc.frequency.setValueAtTime(587.33, context.currentTime); // D5
        osc.frequency.setValueAtTime(880, context.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.3, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.4);
        osc.start();
        osc.stop(context.currentTime + 0.45);
      } catch(e){}

      showToast(`Admissions Booking Successful! ₹${cashfreeModal.amount.toLocaleString()} seat deposit processed securely. Check your email for contract details.`, "success");

      setTimeout(() => {
        setCashfreeModal(null);
      }, 2200);

    }, 2400);
  };

  const handleCreateSubscription = async (planName: string, amount: number, interval: "monthly" | "quarterly") => {
    showToast(`Initializing AutoPay Mandate for ${planName}...`, "info");
    
    setTimeout(() => {
      const mockSub: Subscription = {
        id: "sub_" + Math.random().toString(36).substr(2, 9),
        planName,
        amount,
        interval,
        status: "Active",
        createdAt: new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };
      setSubscriptions(prev => [mockSub, ...prev]);
      showToast(`AutoPay Setup Complete! First installment of ₹${amount.toLocaleString()} scheduled successfully.`, "success");
    }, 1500);
  };

  return (
    <div className="bg-[#0b0b0c] text-gray-100 min-h-screen font-sans antialiased selection:bg-amber-400 selection:text-black">
      
      {/* Dynamic Notifications Toasts Display Area */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#121214] border-2 border-amber-500/30 rounded-2xl shadow-2xl p-4 animate-bounce flex items-start gap-3">
          <div className="text-amber-400 shrink-0 mt-0.5">
            {notification.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-400" />}
            {notification.type === "error" && <Skull className="w-5 h-5 text-red-500" />}
            {notification.type === "info" && <Sparkles className="w-5 h-5 text-amber-400" />}
          </div>
          <div>
            <p className="font-bold text-xs font-mono uppercase tracking-wider text-neutral-300">{notification.type} alert</p>
            <p className="text-xs text-neutral-400 mt-1">{notification.message}</p>
          </div>
        </div>
      )}

      {/* RENDER DYNAMIC ADMISSIONS LANDING PAGE */}
      <LandingPage 
        portfolio={portfolio}
        courses={courses}
        onSubmitEnquiry={handleSubmitEnquiry}
        onTriggerPayment={handleTriggerPayment}
        onCreateSubscription={handleCreateSubscription}
      />

      {/* CASHFREE INTERACTIVE CHECKOUT MODAL */}
      {cashfreeModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white text-neutral-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[480px] border border-neutral-200 animate-in zoom-in-95 duration-200 relative">
            
            {/* CLOSE BUTTON */}
            <button 
              onClick={() => setCashfreeModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors z-10"
              disabled={cashfreePaying || cashfreeSuccess}
            >
              <X className="w-5 h-5" />
            </button>

            {/* LEFT BAR - MERCHANT & AMOUNT & METHOD TAB NAVIGATION */}
            <div className="bg-neutral-50 p-6 md:p-8 border-r border-neutral-100 flex flex-col justify-between w-full md:w-[240px] shrink-0">
              <div className="space-y-6">
                {/* Cashfree Logo Head */}
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black tracking-tight text-indigo-900 font-sans">cashfree</span>
                    <span className="text-xs font-medium text-emerald-500 bg-emerald-50 px-1 py-0.2 rounded text-[9px] uppercase tracking-wide">payments</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider mt-1">SECURE CHECKOUT</p>
                </div>

                {/* Amount details */}
                <div className="bg-white p-4 rounded-2xl border border-neutral-200/60 shadow-sm">
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block tracking-wider">PAYING TO</span>
                  <span className="text-xs font-bold text-neutral-800 block truncate">Filmfluencer Academy</span>
                  <div className="mt-2 pt-2 border-t border-neutral-100">
                    <span className="text-[9px] font-mono uppercase text-neutral-400 block tracking-wider">AMOUNT</span>
                    <span className="text-2xl font-black text-indigo-950 font-mono">₹{cashfreeModal.amount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block tracking-wider px-2 mb-1">SELECT METHOD</span>
                  
                  <button
                    onClick={() => setCashfreeTab("upi")}
                    disabled={cashfreePaying || cashfreeSuccess}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                      cashfreeTab === "upi"
                        ? "bg-indigo-900 text-white shadow-md shadow-indigo-900/15"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 shrink-0" />
                    <span>UPI / Instant App</span>
                  </button>

                  <button
                    onClick={() => setCashfreeTab("card")}
                    disabled={cashfreePaying || cashfreeSuccess}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                      cashfreeTab === "card"
                        ? "bg-indigo-900 text-white shadow-md shadow-indigo-900/15"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span>Debit/Credit Cards</span>
                  </button>

                  <button
                    onClick={() => setCashfreeTab("netbanking")}
                    disabled={cashfreePaying || cashfreeSuccess}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                      cashfreeTab === "netbanking"
                        ? "bg-indigo-900 text-white shadow-md shadow-indigo-900/15"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <Building className="w-4 h-4 shrink-0" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    onClick={() => setCashfreeTab("wallet")}
                    disabled={cashfreePaying || cashfreeSuccess}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                      cashfreeTab === "wallet"
                        ? "bg-indigo-900 text-white shadow-md shadow-indigo-900/15"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <Wallet className="w-4 h-4 shrink-0" />
                    <span>Mobile Wallets</span>
                  </button>
                </div>
              </div>

              {/* Secure Lock Badge */}
              <div className="hidden md:flex items-center gap-2 pt-4 border-t border-neutral-100 text-[10px] text-neutral-400">
                <Lock className="w-3.5 h-3.5 text-indigo-900" />
                <span>PCI-DSS Compliant</span>
              </div>
            </div>

            {/* RIGHT PANEL - ACTIVE METHOD DETAIL OPTIONS SCREEN */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between min-h-[380px] md:min-h-0 bg-white relative">
              
              {/* INTERACTIVE FORM SCENARIOS */}
              <div className="space-y-5">
                <div className="pb-1 border-b border-neutral-100">
                  <h4 className="text-base font-bold text-neutral-800 uppercase tracking-tight">
                    {cashfreeTab === "upi" && "Unified Payments Interface (UPI)"}
                    {cashfreeTab === "card" && "Enter Card Credentials"}
                    {cashfreeTab === "netbanking" && "Popular Netbanking Portals"}
                    {cashfreeTab === "wallet" && "Select Linked Wallets"}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {cashfreeTab === "upi" && "Pay instantly using your preferred UPI app or barcode scanner."}
                    {cashfreeTab === "card" && "We support Visa, Mastercard, RuPay, and Diner's Club."}
                    {cashfreeTab === "netbanking" && "Select your bank to redirect to their secure auth checkout."}
                    {cashfreeTab === "wallet" && "Link and pay via your pre-loaded e-wallets."}
                  </p>
                </div>

                {/* TAB CONTENT: UPI */}
                {cashfreeTab === "upi" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Interactive Simulated QR Code */}
                      <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 border border-neutral-200 rounded-2xl bg-neutral-50/50">
                        <QrCode className="w-24 h-24 text-indigo-950 animate-pulse" />
                        <span className="text-[8px] font-mono font-bold text-indigo-900 mt-1 uppercase tracking-wider">Scan QR with App</span>
                      </div>

                      {/* Manual VPA input */}
                      <div className="sm:col-span-8 space-y-3">
                        <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">ENTER VIRTUAL PAYMENT ADDRESS (VPA) / UPI ID</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="e.g. ranbirkashyap@okaxis" 
                            value={cashfreeUpiId}
                            onChange={(e) => setCashfreeUpiId(e.target.value)}
                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-xl text-sm font-sans focus:outline-none focus:border-indigo-900 text-neutral-800"
                          />
                          <button 
                            onClick={() => setCashfreeUpiId("filmfluencer@okaxis")}
                            className="px-2.5 py-1 text-[10px] font-bold uppercase font-mono text-indigo-900 hover:bg-indigo-50 border border-indigo-200 rounded-xl transition-all"
                          >
                            Autofill
                          </button>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center pt-1">
                          {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                            <div key={app} className="p-1.5 border border-neutral-100 rounded-xl text-[9px] font-bold text-neutral-600 bg-neutral-50 hover:border-indigo-200 transition-all cursor-pointer">
                              {app}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: CARDS */}
                {cashfreeTab === "card" && (
                  <div className="space-y-3.5 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">16-DIGIT CARD NUMBER</label>
                      <input 
                        type="text" 
                        placeholder="4321 0987 6543 2109" 
                        maxLength={19}
                        value={cashfreeCardNum}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCashfreeCardNum(val);
                        }}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm font-mono focus:outline-none focus:border-indigo-900 text-neutral-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">EXPIRY DATE</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          maxLength={5}
                          value={cashfreeCardExpiry}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCashfreeCardExpiry(val);
                          }}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm font-mono text-center focus:outline-none focus:border-indigo-900 text-neutral-800"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">CVV</label>
                        <input 
                          type="password" 
                          placeholder="•••" 
                          maxLength={3}
                          value={cashfreeCardCvv}
                          onChange={(e) => setCashfreeCardCvv(e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm font-mono text-center focus:outline-none focus:border-indigo-900 text-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">NAME ON CARD</label>
                      <input 
                        type="text" 
                        placeholder="Ranbir Kashyap" 
                        value={cashfreeCardName}
                        onChange={(e) => setCashfreeCardName(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-sm font-sans focus:outline-none focus:border-indigo-900 text-neutral-800"
                      />
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: NET BANKING */}
                {cashfreeTab === "netbanking" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">POPULAR BANKS</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "Yes Bank"].map((bank) => (
                        <button
                          key={bank}
                          onClick={() => setCashfreeBank(bank)}
                          className={`p-3 text-xs font-bold border rounded-xl transition-all ${
                            cashfreeBank === bank
                              ? "bg-indigo-50 border-indigo-400 text-indigo-950"
                              : "border-neutral-200 hover:border-neutral-300 text-neutral-600 bg-neutral-50/20"
                          }`}
                        >
                          {bank === "SBI" && "State Bank of India"}
                          {bank === "HDFC" && "HDFC Bank"}
                          {bank === "ICICI" && "ICICI Bank"}
                          {bank === "Axis" && "Axis Bank"}
                          {bank === "Kotak" && "Kotak Mahindra"}
                          {bank === "Yes Bank" && "YES Bank"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: WALLETS */}
                {cashfreeTab === "wallet" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">POPULAR WALLETS</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Paytm", "PhonePe", "Amazon Pay", "Airtel Money"].map((wallet) => (
                        <button
                          key={wallet}
                          onClick={() => setCashfreeWallet(wallet)}
                          className={`p-4 text-xs font-bold border rounded-2xl text-center transition-all ${
                            cashfreeWallet === wallet
                              ? "bg-indigo-50 border-indigo-400 text-indigo-950"
                              : "border-neutral-200 hover:border-neutral-300 text-neutral-600 bg-neutral-50/20"
                          }`}
                        >
                          {wallet} Wallet
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION BOTTOM ROW */}
              <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Secure 256-bit SSL encrypted</span>
                </div>

                <button
                  onClick={handleProcessCashfreePayment}
                  disabled={cashfreePaying || cashfreeSuccess}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer disabled:opacity-50 transition-all font-mono"
                >
                  <span>Pay ₹{cashfreeModal.amount.toLocaleString()} Now</span> &rarr;
                </button>
              </div>

            </div>

            {/* PROCESSING OVERLAY SHIELDS */}
            {cashfreePaying && (
              <div className="absolute inset-0 bg-neutral-950/90 z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                <Loader className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
                <h5 className="text-white text-base font-bold font-mono tracking-wide uppercase">CASHFREE TRANSACT ACTIVE</h5>
                <p className="text-neutral-400 text-xs mt-2 max-w-sm font-sans animate-pulse">{cashfreeStatusMessage}</p>
                <div className="mt-8 text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
                  Order Ref: CF-ORD-{Math.floor(Math.random() * 900000 + 100000)}
                </div>
              </div>
            )}

            {/* SUCCESS OVERLAY SHIELDS */}
            {cashfreeSuccess && (
              <div className="absolute inset-0 bg-white z-30 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-350">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 shadow-lg shadow-emerald-500/10">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-indigo-950 text-xl font-black uppercase tracking-tight">Payment Approved!</h4>
                <p className="text-neutral-500 text-xs mt-1.5 max-w-sm leading-relaxed">
                  Your seat deposit at <strong className="text-neutral-800">Filmfluencer Academy</strong> has been registered on our Cashfree node ledger.
                </p>
                <div className="mt-6 bg-neutral-50 border border-neutral-150 p-4 rounded-2xl w-full max-w-xs text-left text-xs font-mono space-y-1">
                  <div className="flex justify-between"><span className="text-neutral-400">Merchant:</span> <span className="text-neutral-800 font-bold">Filmfluencer Academy</span></div>
                  <div className="flex justify-between"><span className="text-neutral-400">Total Paid:</span> <span className="text-emerald-600 font-black">₹{cashfreeModal.amount.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-400">Status:</span> <span className="text-emerald-600 font-bold">SUCCESS</span></div>
                  <div className="flex justify-between"><span className="text-neutral-400">Receipt ID:</span> <span className="text-neutral-800">CF-RC-{Math.floor(Math.random() * 900000 + 100000)}</span></div>
                </div>
                <p className="text-[10px] text-neutral-400 mt-6 animate-pulse">Closing receipt window shortly...</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
