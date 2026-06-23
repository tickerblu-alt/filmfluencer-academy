import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Check, Phone, ArrowUpRight, HelpCircle, CheckCheck } from "lucide-react";

interface WhatsAppWidgetProps {
  studentName?: string;
}

interface Message {
  id: string;
  sender: "officer" | "student";
  text: string;
  time: string;
  status: "sent" | "delivered" | "read";
}

export default function WhatsAppWidget({ studentName = "Aarav Sharma" }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m_init",
      sender: "officer",
      text: `Namaste ${studentName}! I am Hemant's Admissions Advisor at Andheri (West) Office. Eager to discuss your independent film banner & IMDB co-producer credits! Ask me anything directly.`,
      time: "Just Now",
      status: "read"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickPrompts = [
    { title: "🎬 Andheri Studio Tour", text: "Hi, I want to book a physical studio tour at Andheri West Link Road for the upcoming oct batch." },
    { title: "💳 Monthly EMI Setup", text: "Can you guide me on the ₹40,000 monthly auto-debit Razorpay plan? I want to pay in installments." },
    { title: "🏅 IMDB & Ltd Banner", text: "Tell me more about how Filmfluencer registers the Indian Private Limited company in my name." }
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const studentMsg: Message = {
      id: "msg_" + Math.random().toString(36).substr(2, 9),
      sender: "student",
      text: textToSend,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      status: "sent"
    };

    setMessages(prev => [...prev, studentMsg]);
    setInputValue("");

    // Simulate realistic double-tick delivery
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === studentMsg.id ? { ...m, status: "delivered" } : m));
    }, 800);

    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === studentMsg.id ? { ...m, status: "read" } : m));
      setIsTyping(true);
    }, 1500);

    // Simulated response logic
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      const query = textToSend.toLowerCase();

      if (query.includes("tour") || query.includes("andheri") || query.includes("visit")) {
        replyText = "Fabulous! Our executive sets are located at Link Road, Andheri (West), right next to Infiniti Mall. We are open from 10:00 AM to 8:00 PM. Would you like me to book your slot for this Wednesday or Saturday? Hemant Sir is usually on-stage on Saturdays!";
      } else if (query.includes("emi") || query.includes("payment") || query.includes("installments") || query.includes("recurring")) {
        replyText = "Absolutely! We support flexible ₹40,000/month UPI AutoPay and Credit Card mandates integrated directly with Razorpay. You can configure and simulate this right inside the Student Dashboard payments center! All payments are fully secured under written refund policies.";
      } else if (query.includes("imdb") || query.includes("banner") || query.includes("private limited")) {
        replyText = "Every single graduate leaves with a legally registerd Private Limited banner registered within MCA rules and a verified IMDB co-producer credit on the action film 'Brahmaputra Hunters'. It enables you to raise brand invoices and lock theatrical slots independently!";
      } else {
        replyText = "That's a stellar question! Let me check with Director Hemant Nilim Das and our academic registrar. In the meantime, you can easily scroll down to the 'Enroll Plan' to register your active admissions inquiry phone number.";
      }

      const officerReply: Message = {
        id: "rep_" + Math.random().toString(36).substr(2, 9),
        sender: "officer",
        text: replyText,
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        status: "read"
      };

      setMessages(prev => [...prev, officerReply]);
    }, 3200);
  };

  const handleRegisterUpdates = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return;
    setIsRegistered(true);
    setTimeout(() => {
      const confirmationMsg: Message = {
        id: "broadcast_reg",
        sender: "officer",
        text: `⚡ WhatsApp Broadcast Activated for *${phoneNumber}*! You will receive daily call sheets, pitch tutorials, and exclusive screening invites directly from our Andheri desk.`,
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        status: "read"
      };
      setMessages(prev => [...prev, confirmationMsg]);
    }, 1000);
  };

  const handleOpenExternalWA = (text: string) => {
    const formattedText = encodeURIComponent(text);
    const url = `https://wa.me/919152275588?text=${formattedText}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Floating Circular Badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer focus:outline-none border border-emerald-500/30 group"
          id="wa-float-cta"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/25 animate-ping" />
          <MessageSquare className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
          
          {/* Little green notification count badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ef4444] text-[9px] font-mono font-bold flex items-center justify-center text-white border border-black shadow">
            1
          </span>
        </button>
      )}

      {/* WhatsApp Window Card Container */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] max-h-[580px] bg-neutral-950 border border-neutral-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header Area */}
          <div className="bg-emerald-950 border-b border-emerald-900 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Profile Avatar Frame with active blinking green ring */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-700 bg-neutral-905">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" 
                    alt="Admission Secretariat Officer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-emerald-950 animate-pulse" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">
                  Andheri Admissions Desk
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <span>● Online</span>
                  <span className="text-neutral-500 font-normal">&middot; Typically replies in 2 mins</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-emerald-900/50 text-emerald-300 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub Header for fast dialout */}
          <div className="bg-neutral-900 px-4 py-2 text-[10.5px] text-neutral-400 border-b border-neutral-950 flex items-center justify-between">
            <span className="font-mono">OFFICIAL HOTLINE: +91 91522 75588</span>
            <button 
              onClick={() => handleOpenExternalWA("Hello Filmfluencer Academy!")}
              className="text-emerald-400 hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
            >
              WA Link <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Live Message History Scrollbox */}
          <div 
            ref={listRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[300px] min-h-[220px] bg-[radial-gradient(#151b15_1px,transparent_1px)] [background-size:16px_16px] bg-[#0c0d0c]"
          >
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`max-w-[85%] flex flex-col ${m.sender === "student" ? "ml-auto items-end" : "mr-auto items-start"}`}
              >
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === "student" 
                    ? "bg-emerald-600 text-white rounded-tr-none" 
                    : "bg-neutral-900 text-neutral-200 rounded-tl-none border border-neutral-800"
                }`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
                
                <div className="flex items-center gap-1 mt-1 text-[9px] text-neutral-500 font-mono">
                  <span>{m.time}</span>
                  {m.sender === "student" && (
                    <span>
                      {m.status === "sent" && <Check className="w-3 h-3" />}
                      {m.status === "delivered" && (
                        <span className="flex text-neutral-500 font-normal">
                          <Check className="w-3 h-3 -mr-1" />
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      {m.status === "read" && (
                        <span className="flex text-emerald-400 font-normal">
                          <CheckCheck className="w-3 h-3 -mr-1" />
                          <CheckCheck className="w-3 h-3" />
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Simulated Live Typing bubble */}
            {isTyping && (
              <div className="mr-auto items-start max-w-[80%] flex flex-col">
                <div className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-500 text-xs rounded-2xl rounded-tl-none font-mono flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span>Representative is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Reply suggestion tags */}
          <div className="bg-[#090b09] p-3 border-t border-neutral-900 space-y-2">
            <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
              Suggested Queries:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.text)}
                  className="text-[10px] font-mono px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-emerald-400 border border-neutral-800/80 hover:border-emerald-500/20 rounded-full transition-all cursor-pointer text-left"
                >
                  {qp.title}
                </button>
              ))}
            </div>
          </div>

          {/* Automated Broadcast phone numbers registry panel */}
          <div className="bg-neutral-950 px-4 py-3 border-t border-neutral-900">
            {!isRegistered ? (
              <form onSubmit={handleRegisterUpdates} className="space-y-2">
                <span className="text-[8.5px] font-mono text-emerald-500 uppercase tracking-wider font-extrabold block">
                  Subscribe to Daily Call Sheets &amp; Lecture invites
                </span>
                <div className="flex gap-2">
                  <input 
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter Indian Phone (+91...)"
                    className="flex-1 bg-[#121312] border border-neutral-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-600 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-[10px] uppercase font-mono rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Activate
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-1 text-center bg-emerald-950/20 border border-emerald-500/20 rounded-lg">
                <p className="text-[10px] font-mono text-emerald-400 font-bold">
                  ✓ Broadcast registration completed for {phoneNumber}!
                </p>
              </div>
            )}
          </div>

          {/* Input text-box send action */}
          <div className="bg-neutral-900/60 p-3 border-t border-neutral-900 flex gap-2">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              placeholder="Type your admissions question here..."
              className="flex-1 bg-black border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-600 font-sans"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="w-9 h-9 shrink-0 bg-emerald-600 hover:bg-emerald-500 text-black rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
