import React, { useState } from "react";
import { 
  X, 
  User, 
  Lock, 
  ShieldAlert, 
  Loader2, 
  CheckCircle2, 
  Mail, 
  Phone,
  HelpCircle
} from "lucide-react";
import { registerUser, getUser } from "../lib/firestoreService";
import { FFAUser } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: FFAUser) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<"student" | "admin">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [adminPasscode, setAdminPasscode] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        if (!name || !email || !password) {
          setError("Please fill in all required credentials.");
          setLoading(false);
          return;
        }

        if (role === "admin" && adminPasscode !== "admin123") {
          setError("Invalid Admin Protection Passkey. Hint: Use 'admin123' to register as an administrator.");
          setLoading(false);
          return;
        }

        const newUser: FFAUser = {
          id: "u_" + Math.random().toString(36).substr(2, 9),
          name,
          email,
          role,
          phone,
          createdAt: new Date().toISOString()
        };

        // Real Firebase register
        await registerUser(newUser);
        
        // Also add to mock simulated users for local retrieval
        const existingStr = localStorage.getItem("ffa_simulated_users") || "[]";
        const existingList = JSON.parse(existingStr);
        existingList.push(newUser);
        localStorage.setItem("ffa_simulated_users", JSON.stringify(existingList));

        setSuccess(true);
        setTimeout(() => {
          onAuthSuccess(newUser);
          setLoading(false);
          onClose();
        }, 1500);

      } else {
        // Log in
        if (!email || !password) {
          setError("Please fill in your email and password.");
          setLoading(false);
          return;
        }

        // Check for special fast admin bypass
        if (email.toLowerCase() === "admin@ffa.in" && password === "admin123") {
          const defaultAdmin: FFAUser = {
            id: "u_default_admin",
            name: "Director Hemant",
            email: "admin@ffa.in",
            role: "admin",
            createdAt: new Date().toISOString()
          };
          await registerUser(defaultAdmin);
          setSuccess(true);
          setTimeout(() => {
            onAuthSuccess(defaultAdmin);
            setLoading(false);
            onClose();
          }, 1500);
          return;
        }

        const user = await getUser(email);
        if (user) {
          setSuccess(true);
          setTimeout(() => {
            onAuthSuccess(user);
            setLoading(false);
            onClose();
          }, 1500);
        } else {
          // Check local simulated list
          const existingStr = localStorage.getItem("ffa_simulated_users") || "[]";
          const existingList: FFAUser[] = JSON.parse(existingStr);
          const found = existingList.find(u => u.email.toLowerCase() === email.toLowerCase());
          
          if (found) {
            setSuccess(true);
            setTimeout(() => {
              onAuthSuccess(found);
              setLoading(false);
              onClose();
            }, 1500);
          } else {
            setError("Credentials not matched. Check email or register a new identity profile.");
            setLoading(false);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "An authentication error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#121214] border-2 border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-serif text-white tracking-tight flex items-center gap-2">
              <User className="w-5 h-5 text-amber-500" />
              {isRegister ? "Register Academy Identity" : "Sign-on Academy Portal"}
            </h3>
            <p className="text-xs text-neutral-400">
              {isRegister ? "Join the upcoming film cohorts" : "Authenticate to trigger secure actions"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 rounded-xl text-xs flex items-center gap-2 font-mono">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-xl text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Success! Activating session sync...</span>
          </div>
        )}

        {/* Tip Box */}
        <div className="p-3.5 bg-neutral-950 border border-neutral-900 rounded-xl space-y-1.5">
          <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-black flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            DEMO SIGN-ON SHORTCUTS
          </p>
          <div className="text-[10.5px] text-neutral-400 leading-normal space-y-1">
            <p>• <strong>Instant Admin:</strong> Sign-in with <strong>admin@ffa.in</strong> and passcode <strong>admin123</strong> to launch immediate Admin Power.</p>
            <p>• <strong>New Admin:</strong> Register an account, select <strong>Admin</strong>, and enter passcode <strong>admin123</strong>.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role selector (only during registration) */}
          {isRegister && (
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Identify Role *</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-2.5 rounded-xl text-xs font-semibold font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                    role === "student"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/50"
                      : "bg-neutral-900/60 text-neutral-400 border-neutral-850 hover:text-white"
                  }`}
                >
                  Student Track
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`py-2.5 rounded-xl text-xs font-semibold font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                    role === "admin"
                      ? "bg-red-500/10 text-red-400 border-red-500/50"
                      : "bg-neutral-900/60 text-neutral-400 border-neutral-850 hover:text-white"
                  }`}
                >
                  Admin Power
                </button>
              </div>
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Full Legal Name *</label>
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Siddharth Sen"
                className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Email Identity *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. candidate@cinema.in"
                className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 91522 75588"
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Secure Password *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {isRegister && role === "admin" && (
            <div className="p-3.5 bg-red-950/10 border border-red-950/30 rounded-xl">
              <label className="block text-[10px] font-mono text-red-400 uppercase tracking-wider mb-1.5 font-bold">Admin Protection Passkey *</label>
              <input 
                type="password"
                required
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                placeholder="Enter 'admin123' to authenticate role"
                className="w-full bg-neutral-950 border border-red-500/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isRegister ? "Create Credentials" : "Sign-On Session"}
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="text-[11px] font-mono text-neutral-400 hover:text-amber-400 underline transition-colors cursor-pointer"
          >
            {isRegister ? "Already registered? Sign-In instead &rarr;" : "New to Filmfluencer Academy? Create profile &rarr;"}
          </button>
        </div>

      </div>
    </div>
  );
}
