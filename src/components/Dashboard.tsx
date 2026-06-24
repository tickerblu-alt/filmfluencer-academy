import React, { useState, useEffect } from "react";
import { 
  Tv, 
  User, 
  CreditCard, 
  MessageSquare, 
  CheckCircle, 
  Play, 
  TrendingUp, 
  PenTool, 
  Camera, 
  Plus, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  HelpCircle,
  Folder,
  Sliders,
  DollarSign,
  AlertCircle,
  ArrowLeft,
  Pause,
  RefreshCw,
  Lock,
  Unlock,
  History,
  FileText,
  ClipboardList
} from "lucide-react";
import { Course, Lesson, Profile, Payment, Enquiry, Subscription, FFAActivityLog, FFAUser } from "../types";
import { getActivityLogs } from "../lib/firestoreService";
import AdminHubSection from "./AdminHubSection";

interface DashboardProps {
  courses: Course[];
  profile: Profile | null;
  payments: Payment[];
  subscriptions: Subscription[];
  enquiries: Enquiry[];
  completedLessons: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onUpdateProfile: (p: Partial<Profile>) => Promise<boolean>;
  onToggleLesson: (lessonId: string) => void;
  onTriggerPayment: (amount: number, purpose: string) => void;
  onCreateSubscription: (planName: string, amount: number, interval: "monthly" | "quarterly") => void;
  onToggleSubscription: (id: string, status?: string) => void;
  onTriggerSubscriptionDebit: (id: string) => void;
  onUpdateEnquiryStatus: (id: string, status: string) => void;
  onBackToLanding?: () => void;
  isAdminPowerActive?: boolean;
  currentUser?: FFAUser | null;
}

export default function Dashboard({
  courses,
  profile,
  payments,
  subscriptions = [],
  enquiries,
  completedLessons,
  activeTab,
  setActiveTab,
  onUpdateProfile,
  onToggleLesson,
  onTriggerPayment,
  onCreateSubscription,
  onToggleSubscription,
  onTriggerSubscriptionDebit,
  onUpdateEnquiryStatus,
  onBackToLanding,
  isAdminPowerActive = false,
  currentUser = null,
}: DashboardProps) {
  // Local states
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileRole, setProfileRole] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileCompany, setProfileCompany] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  // Streaming player state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Administrative / simulator controls toggles
  const [isAdminView, setIsAdminView] = useState(false);
  const [forceUnlockAdmitted, setForceUnlockAdmitted] = useState(() => {
    const saved = localStorage.getItem("ffa_admitted");
    return saved === "true";
  });
  
  // Custom payment simulation values
  const [customPayAmount, setCustomPayAmount] = useState("50000");
  const [customPayPurpose, setCustomPayPurpose] = useState("First EMI Instalment");

  // Activity logs state
  const [activityLogs, setActivityLogs] = useState<FFAActivityLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logFilter, setLogFilter] = useState("");

  const fetchLogs = async () => {
    setLogsLoading(true);
    try {
      const logs = await getActivityLogs();
      setActivityLogs(logs);
    } catch (e) {
      console.error(e);
    } finally {
      setLogsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "activity-logs") {
      fetchLogs();
    }
  }, [activeTab]);

  // Sync profile details safely when loaded
  useEffect(() => {
    if (profile) {
      setProfileName(profile.name || "");
      setProfileEmail(profile.email || "");
      setProfilePhone(profile.phone || "");
      setProfileRole(profile.role || "");
      setProfileBio(profile.bio || "");
      setProfileCompany(profile.companyName || "");
    }
  }, [profile]);

  // Handle setting initial courses content if loaded
  useEffect(() => {
    if (courses.length > 0 && !selectedCourse) {
      setSelectedCourse(courses[0]);
      if (courses[0].lessons.length > 0) {
        setActiveLesson(courses[0].lessons[0]);
      }
    }
  }, [courses, selectedCourse]);

  // Handle Profile Update submits
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    const success = await onUpdateProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      role: profileRole,
      bio: profileBio,
      companyName: profileCompany
    });
    setProfileLoading(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Synchronize Admin Mode View with active Admin Power
  useEffect(() => {
    if (isAdminPowerActive) {
      setIsAdminView(true);
    }
  }, [isAdminPowerActive]);

  // Safe progress percentage calculations
  const totalLessonsCount = courses.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLessonsCount > 0 
    ? Math.round((completedCount / totalLessonsCount) * 100) 
    : 0;

  return (
    <div className="bg-[#0b0b0c] text-gray-100 min-h-screen font-sans border-t border-neutral-900">
      
      {/* Dashboard Sub Header banner */}
      <div className="bg-neutral-900 border-b border-neutral-800/80 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 mb-4">
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="px-4 py-2 w-fit rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-850 hover:border-amber-400/30 flex items-center gap-2 transition-all cursor-pointer text-xs font-mono font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Academy Landing Page
            </button>
          )}
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-neutral-800 border border-amber-500/30 overflow-hidden flex items-center justify-center text-amber-500 text-3xl font-bold font-mono">
              {profileName ? profileName.charAt(0) : "S"}
            </div>
            <div>
              <p className="text-xs text-amber-400 font-mono uppercase tracking-widest">Portal Student Dashboard</p>
              <h2 className="text-2xl font-bold font-display text-white mt-0.5">{profileName || "Anonymous Student"}</h2>
              <p className="text-xs text-neutral-400 mt-1">{profileRole || "Directorship Candidate"} &middot; <span className="font-semibold text-neutral-300">{profileCompany || "Independent Film Studio"}</span></p>
            </div>
          </div>

          {/* Quick Progress Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800 max-w-sm w-full">
            <div className="flex-1">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-1">
                <span>COURSE COMPLETED</span>
                <span className="text-amber-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
            <div className="text-center font-mono border-l border-neutral-800 pl-4 px-2">
              <span className="text-xs text-neutral-400 block uppercase">LESSONS</span>
              <span className="text-lg font-bold text-white">{completedCount} <span className="text-xs text-neutral-500">/ {totalLessonsCount}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation tabs links */}
      <div className="bg-[#0b0b0c] border-b border-neutral-900 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setActiveTab("lessons"); }}
              className={`px-4 py-3 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "lessons" 
                  ? "border-amber-500 text-amber-400" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {payments.some(p => p.amount >= 20000 && p.status === "Completed" && p.id !== "pay_init") || forceUnlockAdmitted ? (
                <Unlock className="w-4 h-4 text-emerald-400" />
              ) : (
                <Lock className="w-4 h-4 text-amber-500" />
              )}
              STUDENT HUB
            </button>

            <button
              onClick={() => { setActiveTab("student-profile"); }}
              className={`px-4 py-3 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "student-profile" 
                  ? "border-amber-500 text-amber-400" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <User className="w-4 h-4" /> Personal Student Identity
            </button>

            <button
              onClick={() => { setActiveTab("payments"); }}
              className={`px-4 py-3 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "payments" 
                  ? "border-amber-500 text-amber-400" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <CreditCard className="w-4 h-4" /> Payment Logs &amp; EMI
            </button>

            {isAdminView && (
              <button
                onClick={() => { setActiveTab("enquiries"); }}
                className={`px-4 py-3 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "enquiries" 
                    ? "border-amber-500 text-amber-400" 
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Admissions Enquiries ({enquiries.length})
              </button>
            )}

            {isAdminPowerActive && (
              <>
                <button
                  onClick={() => { setActiveTab("admin-hub"); }}
                  className={`px-4 py-3 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "admin-hub" 
                      ? "border-amber-500 text-amber-400" 
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Sliders className="w-4 h-4 text-red-400" /> Admin Control Hub ⚡
                </button>
                <button
                  onClick={() => { setActiveTab("activity-logs"); }}
                  className={`px-4 py-3 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "activity-logs" 
                      ? "border-amber-500 text-amber-400" 
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <History className="w-4 h-4 text-sky-400" /> Activity Logs
                </button>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Quick Toggle for reviewer to simulate taking admission */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-[11px] font-mono text-neutral-400">
              <span className="text-neutral-500">Student Admission:</span>
              <button 
                onClick={() => {
                  const nextVal = !forceUnlockAdmitted;
                  setForceUnlockAdmitted(nextVal);
                  localStorage.setItem("ffa_admitted", String(nextVal));
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
                  (payments.some(p => p.amount >= 20000 && p.status === "Completed" && p.id !== "pay_init") || forceUnlockAdmitted)
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {(payments.some(p => p.amount >= 20000 && p.status === "Completed" && p.id !== "pay_init") || forceUnlockAdmitted) ? "ADMITTED (UNLOCKED)" : "GUEST (LOCKED)"}
              </button>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-[11px] font-mono text-neutral-400">
              <span className={`w-2 h-2 rounded-full ${isAdminView ? "bg-amber-400" : "bg-neutral-600"}`}></span>
              Admin Control Mode
              <input 
                type="checkbox" 
                checked={isAdminView}
                onChange={() => setIsAdminView(!isAdminView)}
                className="ml-2 w-3.5 h-3.5 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TAB CONTENT RENDERERS */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* TAB 1: STUDENT HUB (LOCKED/UNLOCKED BASED ON ADMISSION STATUS) */}
        {activeTab === "lessons" && (() => {
          const isAdmitted = payments.some(p => p.amount >= 20000 && p.status === "Completed" && p.id !== "pay_init") || forceUnlockAdmitted;
          const totalPaidFees = payments.reduce((sum, p) => p.status === "Completed" ? sum + p.amount : sum, 0);
          
          if (!isAdmitted) {
            return (
              <div className="space-y-8 animate-fade-in">
                {/* LOCKED BANNER */}
                <div className="bg-gradient-to-r from-amber-950/20 via-neutral-900 to-amber-950/20 border-2 border-amber-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="mx-auto w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 mb-6 animate-pulse">
                    <Lock className="w-8 h-8" />
                  </div>
                  
                  <span className="text-[10px] font-mono uppercase text-amber-500 tracking-widest font-extrabold bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    Syllabus &amp; Portfolio Restricted
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-4 font-display">
                    STUDENT HUB IS LOCKED
                  </h3>
                  
                  <p className="text-sm text-neutral-400 max-w-2xl mx-auto mt-4 leading-relaxed">
                    To maintain strict content safety and uphold elite cinematic standards, we do not allow prospective students to test-drive or browse our active video lecture catalogs, student cohorts, or corporate assets without active enrollment verification.
                  </p>
                  
                  {/* DIRECT ACTIONS */}
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button 
                      onClick={() => {
                        onTriggerPayment(20000, "Filmfluencer Seed Seat Booking");
                      }}
                      className="px-6 py-3 rounded-lg bg-amber-500 text-black font-semibold text-xs font-mono tracking-wider hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                    >
                      <CreditCard className="w-4 h-4" /> Pay ₹20,000 Seat Booking Fee
                    </button>
                    
                    <button 
                      onClick={() => {
                        const nextVal = true;
                        setForceUnlockAdmitted(nextVal);
                        localStorage.setItem("ffa_admitted", String(nextVal));
                      }}
                      className="px-6 py-3 rounded-lg bg-neutral-900 border border-neutral-850 text-neutral-300 hover:text-white text-xs font-mono tracking-wider hover:border-amber-400/40 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Unlock className="w-4 h-4 text-amber-400" /> Simulate Immediate Admission Approval
                    </button>
                  </div>
                </div>

                {/* COURSE DIFFERENCE MATRIX */}
                <div className="bg-[#121214] border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-6">
                  <div className="border-b border-neutral-800 pb-4">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-widest">Syllabus Comparison Matrix</span>
                    <h4 className="text-xl font-bold text-white mt-1">6-Month Technical Track vs 12-Month Professional Track</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-mono font-bold uppercase">Basic Fast-Track</span>
                          <h5 className="text-base font-bold text-white mt-1">6-Month Technical Filmmaker</h5>
                        </div>
                        <span className="text-sm font-mono font-bold text-amber-400">₹2,00,000</span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Designed for pure physical on-set execution, camera operation masteries, technical staging, and professional audio-sound design workflows.
                      </p>
                      <ul className="text-xs text-neutral-300 space-y-2 font-mono">
                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Weeks 1-24 pure technical masteries</li>
                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> ARRI ALEXA &amp; RED cine-staging</li>
                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Foley audio &amp; low-frequency triggers</li>
                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Theatrical physical filming credits</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-amber-500/[0.02] border-2 border-amber-500/20 hover:border-amber-500/40 transition-all space-y-4 relative">
                      <div className="absolute top-3 right-3 text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono font-extrabold uppercase animate-pulse">
                        Most Enrolled Track
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono font-bold uppercase">Premium Long-Term</span>
                          <h5 className="text-base font-bold text-white mt-1">12-Month Professional Filmfluencer</h5>
                        </div>
                        <span className="text-sm font-mono font-bold text-amber-400">₹4,00,000</span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Full-spectrum engineering. Combines the complete technical program with corporate business banner setups, brand sponsorships, and private Muvireel digital distribution.
                      </p>
                      <ul className="text-xs text-neutral-300 space-y-2 font-mono">
                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Complete 6-month filmmaking syllabus +</li>
                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Private Ltd Studio banner setup &amp; GSTs</li>
                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> IMDB registration &amp; creative legal contracts</li>
                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Private Muvireel direct brand monetization</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CHRONOLOGICAL INSTALLMENT SCHEDULE */}
                <div className="bg-[#121214] border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-widest">Pre-Scheduled Financial Plan</span>
                    <h4 className="text-xl font-bold text-white mt-1">1-Year Course Tuition Installment Schedule</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider">
                          <th className="py-3 px-4 font-bold">Installment Cycle</th>
                          <th className="py-3 px-4 font-bold">Billing Amount</th>
                          <th className="py-3 px-4 font-bold">Target Deadline</th>
                          <th className="py-3 px-4 font-bold text-right">Verification Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900 text-neutral-300">
                        <tr>
                          <td className="py-3.5 px-4 font-semibold text-white">01. Seat Reservation Deposit</td>
                          <td className="py-3.5 px-4 font-bold text-amber-400">₹20,000</td>
                          <td className="py-3.5 px-4">Immediate Booking to reserve space</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded">UNPAID (Admission Locked)</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-semibold">02. Cohort Launch Installment</td>
                          <td className="py-3.5 px-4 font-bold">₹38,000</td>
                          <td className="py-3.5 px-4">Due on Month 01</td>
                          <td className="py-3.5 px-4 text-right text-neutral-500">Upcoming</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-semibold">03. Monthly Cycles (Months 2-10)</td>
                          <td className="py-3.5 px-4 font-bold">₹38,000 / month</td>
                          <td className="py-3.5 px-4">Recurring auto-debits via UPI</td>
                          <td className="py-3.5 px-4 text-right text-neutral-500">Upcoming (9 Instalments)</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-semibold text-emerald-400">04. Professional Launch (Months 11-12)</td>
                          <td className="py-3.5 px-4 font-bold text-emerald-400">₹0</td>
                          <td className="py-3.5 px-4">Fully Sponsored PR &amp; Studio Scaling</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">Fully Sponsored</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          }
          
          {/* UNLOCKED STATE */}
          return (
            <div className="space-y-8 animate-fade-in">
              {/* UNLOCKED WELCOME SUMMARY HEADER */}
              <div className="bg-gradient-to-r from-emerald-950/20 via-neutral-900 to-emerald-950/20 border-2 border-emerald-500/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.01] rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Unlock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">ADMISSION VERIFIED</span>
                      <span className="text-xs font-mono text-neutral-400">ID: FFA-2026-042</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1">Welcome to Your Student Workspace</h3>
                    <p className="text-xs text-neutral-400 mt-1">Secure ledger synchronization is active. All live modules, payment trackings, and banner documents are loaded.</p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    const nextVal = false;
                    setForceUnlockAdmitted(nextVal);
                    localStorage.setItem("ffa_admitted", String(nextVal));
                  }}
                  className="px-4 py-2 rounded border border-neutral-800 text-neutral-400 hover:text-white hover:border-red-500/20 hover:bg-red-500/5 text-xs font-mono transition-all cursor-pointer"
                >
                  🔒 Lock Student Hub
                </button>
              </div>

              {/* CORE DASHBOARD GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* FINANCIAL LEDGER AND ROADMAP */}
                <div className="lg:col-span-8 space-y-8">
                  
                  {/* FINANCIAL ACCOUNTING LEDGER */}
                  <div className="bg-[#121214] border border-neutral-800 rounded-3xl p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-900 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-amber-500 font-bold tracking-widest">Accounting Ledger</span>
                        <h4 className="text-lg font-bold text-white mt-1">Student Academic Fee Status</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-neutral-500 block font-mono">12-Month Total Fee</span>
                        <span className="text-lg font-bold text-white font-mono">₹4,00,000</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 text-center">
                        <span className="text-[10px] text-neutral-400 block font-mono uppercase">Total Paid Fees</span>
                        <span className="text-2xl font-bold text-emerald-400 block font-mono mt-1">₹{totalPaidFees.toLocaleString()}</span>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full font-mono font-bold inline-block mt-2">Ledger Synced</span>
                      </div>
                      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 text-center">
                        <span className="text-[10px] text-neutral-400 block font-mono uppercase">Remaining Balance</span>
                        <span className="text-2xl font-bold text-amber-500 block font-mono mt-1">₹{(400000 - totalPaidFees).toLocaleString()}</span>
                        <span className="text-[9px] text-neutral-500 font-mono block mt-2">Deductions scheduled</span>
                      </div>
                      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 text-center">
                        <span className="text-[10px] text-neutral-400 block font-mono uppercase">Next Auto-Pay Cycle</span>
                        <span className="text-2xl font-bold text-white block font-mono mt-1">₹38,000</span>
                        <span className="text-[9px] text-neutral-500 font-mono block mt-2">Due in Month 01</span>
                      </div>
                    </div>

                    {/* Paid Ledger List */}
                    <div className="space-y-3 pt-2">
                      <h5 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">Secured Receipt History</h5>
                      <div className="divide-y divide-neutral-900">
                        {payments.filter(p => p.status === "Completed").map((p, idx) => (
                          <div key={p.id} className="py-3 flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <div>
                                <span className="font-bold text-white">{p.purpose}</span>
                                <span className="text-[10px] text-neutral-500 block mt-0.5">Receipt: REC-0{idx+421} &middot; {p.method}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-emerald-400 font-bold block">₹{p.amount.toLocaleString()}</span>
                              <span className="text-[9px] text-neutral-500 block">{new Date(p.createdAt).toLocaleDateString("en-IN")}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 1-YEAR INSTALLMENT SCHEDULE DETAIL */}
                  <div className="bg-[#121214] border border-neutral-800 rounded-3xl p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-widest">Chronological Installments</span>
                      <h4 className="text-lg font-bold text-white mt-1">1-Year Course Tuition Installment Schedule</h4>
                    </div>
                    
                    <div className="relative border-l border-neutral-800 pl-6 ml-3 space-y-6 pt-2">
                      {/* Booking */}
                      <div className="relative">
                        <span className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-[10px] text-emerald-400 font-mono font-bold">✓</span>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-xs font-bold text-white">01. Seat Reservation Deposit</h5>
                            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Initial reservation to secure October cohort seats</p>
                          </div>
                          <div className="text-right font-mono text-xs">
                            <span className="text-emerald-400 font-bold block">₹20,000</span>
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold">PAID</span>
                          </div>
                        </div>
                      </div>

                      {/* Installment 1 */}
                      <div className="relative">
                        <span className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-amber-500/10 border-2 border-amber-500/60 flex items-center justify-center text-[10px] text-amber-400 font-mono font-bold">1</span>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-xs font-bold text-white">02. Cohort Launch Installment</h5>
                            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Due upon official release of Week 1 curriculum files</p>
                          </div>
                          <div className="text-right font-mono text-xs">
                            <span className="text-white font-bold block">₹38,000</span>
                            <span className="text-[9px] bg-neutral-900 text-amber-400 border border-neutral-850 px-1.5 py-0.5 rounded">PENDING DEBIT</span>
                          </div>
                        </div>
                      </div>

                      {/* Installment 2-10 */}
                      <div className="relative">
                        <span className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center text-[10px] text-neutral-400 font-mono">2</span>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-xs font-bold text-white">03. Monthly Recurring Auto-Debit Cycles (Months 2-10)</h5>
                            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Secure monthly standing orders via authorized Razorpay mandate</p>
                          </div>
                          <div className="text-right font-mono text-xs">
                            <span className="text-neutral-400 block font-bold">₹38,000 / mo</span>
                            <span className="text-[9px] text-neutral-500 block">Upcoming (9 Months)</span>
                          </div>
                        </div>
                      </div>

                      {/* Month 11-12 */}
                      <div className="relative">
                        <span className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-400 font-mono font-bold">★</span>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-xs font-bold text-emerald-400">04. Professional Incubation &amp; Launch (Months 11-12)</h5>
                            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Zero tuition. 100% focused on direct brand sponsorships and commercial distribution launch</p>
                          </div>
                          <div className="text-right font-mono text-xs">
                            <span className="text-emerald-400 font-bold block">₹0</span>
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold">SPONSORED</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* COURSE TRACK COMPARISON DETAIL */}
                  <div className="bg-[#121214] border border-neutral-800 rounded-3xl p-6 space-y-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-500 font-bold tracking-widest">Course Architecture Difference</span>
                      <h4 className="text-lg font-bold text-white mt-1">Syllabus Breakdown of 6-Month vs 12-Month Tracks</h4>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-neutral-900 pb-3 font-mono text-neutral-500 font-bold uppercase tracking-wider">
                        <div className="md:col-span-4">Feature / Curriculum Scope</div>
                        <div className="md:col-span-4 text-neutral-400">6-Month Technical Track</div>
                        <div className="md:col-span-4 text-amber-400">12-Month Professional Track</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-neutral-900 pb-3">
                        <div className="md:col-span-4 font-bold text-white">Tuition Fee Structure</div>
                        <div className="md:col-span-4 text-neutral-300">₹2,00,000 (Installment: ₹20K reserve + ₹30K/mo)</div>
                        <div className="md:col-span-4 text-amber-400 font-bold">₹4,00,000 (Installment: ₹20K reserve + ₹38K/mo)</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-neutral-900 pb-3">
                        <div className="md:col-span-4 font-bold text-white">Directorship Certificate</div>
                        <div className="md:col-span-4 text-emerald-400 font-semibold">✓ Yes, Technical Director Seal</div>
                        <div className="md:col-span-4 text-emerald-400 font-semibold">✓ Yes, Professional Media Director Seal</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-neutral-900 pb-3">
                        <div className="md:col-span-4 font-bold text-white">Cinematic Pre-Production &amp; AI</div>
                        <div className="md:col-span-4 text-emerald-400">✓ Included (Stage 01 &amp; 02)</div>
                        <div className="md:col-span-4 text-emerald-400">✓ Included (Full 1-Year Integration)</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-neutral-900 pb-3">
                        <div className="md:col-span-4 font-bold text-white">Private Studio Incorporation</div>
                        <div className="md:col-span-4 text-red-500">❌ Not Included</div>
                        <div className="md:col-span-4 text-emerald-400">✓ Included (Full Ltd Banner registration &amp; GSTs)</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-neutral-900 pb-3">
                        <div className="md:col-span-4 font-bold text-white">IMDB Credit &amp; Crew Contracts</div>
                        <div className="md:col-span-4 text-red-500">❌ Handled individually</div>
                        <div className="md:col-span-4 text-emerald-400">✓ Legally audited &amp; verified IMDB credit entries</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-4 font-bold text-white">Muvireel Premium Distribution</div>
                        <div className="md:col-span-4 text-red-500">❌ Technical certificate only</div>
                        <div className="md:col-span-4 text-emerald-400 font-bold">✓ Complete direct ticketing, subs, sponsorships</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIVE CURRICULUM SYLLABUS TRACK (No Video test drive) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#121214] border border-neutral-800 rounded-3xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
                      <Folder className="w-5 h-5 text-amber-500" />
                      <div>
                        <h4 className="text-sm font-bold text-white font-mono uppercase">Syllabus Milestones</h4>
                        <p className="text-[10px] text-neutral-400 font-mono">Current October 2026 Release Schedule</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {courses.map((course, idx) => (
                        <div key={course.id} className="p-4 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded uppercase tracking-wider">Stage 0{idx+1}</span>
                            <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Syllabus Ready
                            </span>
                          </div>
                          
                          <h5 className="text-xs font-bold text-white">{course.title}</h5>
                          <p className="text-[11px] text-neutral-400 leading-relaxed">{course.description}</p>
                          
                          <div className="border-t border-neutral-800/80 pt-2.5 space-y-2">
                            <span className="text-[9px] font-mono text-neutral-500 uppercase block font-bold">Included Lectures:</span>
                            {course.lessons.map(lesson => (
                              <div key={lesson.id} className="p-2 bg-neutral-950 rounded border border-neutral-900 flex items-start gap-2">
                                <span className="text-[9px] font-mono text-amber-400 mt-0.5 shrink-0">►</span>
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-neutral-200 truncate">{lesson.title}</p>
                                  <p className="text-[9px] text-neutral-500 font-mono">{lesson.duration} &middot; Lecture Notes Loaded</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

        {/* TAB 2: STUDENT PROFILE FORM PORTAL */}
        {activeTab === "student-profile" && (
          <div className="max-w-3xl mx-auto bg-[#121214] border border-neutral-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Student Personal Identity Profile</h3>
                <p className="text-xs text-neutral-400 mt-1">This corporate identity is used to generate verified IMDB credits and register your independent production banner.</p>
              </div>
            </div>

            {saveSuccess && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 rounded-xl mb-6 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" /> Academic credentials successfully synchronized with database registries!
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">Legal Registered Name *</label>
                  <input 
                    type="text" 
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Same as passport / birth registry" 
                    className="w-full bg-[#17171a] border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">IMPORTANT: Used exactly for IMDB on-set credits</p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">Primary Academic Role Ambition</label>
                  <input 
                    type="text" 
                    value={profileRole}
                    onChange={(e) => setProfileRole(e.target.value)}
                    placeholder="e.g. Lead Director / Assistant Cinematographer" 
                    className="w-full bg-[#17171a] border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">Email Identity Address *</label>
                  <input 
                    type="email" 
                    required
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    placeholder="yourname@domain.com" 
                    className="w-full bg-[#17171a] border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">WhatsApp Contact Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    placeholder="+91 98765 43210" 
                    className="w-full bg-[#17171a] border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">Registered Production Banner Name</label>
                  <input 
                    type="text" 
                    value={profileCompany}
                    onChange={(e) => setProfileCompany(e.target.value)}
                    placeholder="e.g. Phoenix Independent Pictures Pvt Ltd" 
                    className="w-full bg-[#17171a] border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">We will incorporate this brand officially in year one.</p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">Professional Avatar Link</label>
                  <input 
                    type="text" 
                    value={profile?.avatarUrl || ""}
                    disabled
                    placeholder="https://..." 
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm text-neutral-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">Secured via automatic login registers.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">Creative Portfolio Bio &amp; Screenplay Aspirations</label>
                <textarea 
                  rows={4}
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  placeholder="Share details of script books, projects styled, or cameras owned." 
                  className="w-full bg-[#17171a] border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={profileLoading}
                className="w-full py-3 bg-amber-500 text-black font-semibold text-xs font-mono rounded-lg hover:bg-amber-400 transition-all cursor-pointer disabled:opacity-50"
              >
                {profileLoading ? "Synchronizing server databases..." : "Save Student Credentials &rarr;"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: ACCOUNTING PAYMENTS & SECURE CHECKOUTS */}
        {activeTab === "payments" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Columns (Col Span 8) - Subscriptions management AND Payment history */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* SECTION A: RECURRING UPI AUTOPAY & CARD MANDATES */}
              <div className="bg-[#121214] border-2 border-emerald-500/20 rounded-3xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      Razorpay Mandates secure
                    </span>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-1.5">
                      <RefreshCw className="w-5 h-5 text-emerald-400" /> Active Monthly EMI &amp; AutoPay Schedules
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">Manage institutional credit mandates, autopays, or trigger monthly class cycles manually.</p>
                  </div>
                  
                  {/* Create EMI Action in simulator */}
                  <button
                    onClick={() => onCreateSubscription("10-Month Cinema EMI Plan", 38000, "monthly")}
                    className="px-3.5 py-1.5 bg-neutral-900 border border-neutral-850 text-[11px] font-mono hover:text-emerald-400 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    + Register New EMI Mandate
                  </button>
                </div>

                <div className="space-y-4">
                  {subscriptions && subscriptions.length > 0 ? (
                    subscriptions.map((sub) => {
                      // calculate percentage of dues paid as mock. Let's say out of full 3.8L dues
                      const totalDuesPlanned = sub.amount * 10;
                      // sum up all completed auto-debits on this subscription.
                      const totalPaidOnSub = payments
                        .filter(p => p.purpose && p.purpose.includes(sub.planName))
                        .reduce((acc, curr) => acc + curr.amount, 0);
                      const percentPaid = Math.min(100, Math.round((totalPaidOnSub / totalDuesPlanned) * 100)) || 10;

                      return (
                        <div key={sub.id} className="p-5 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm text-white">{sub.planName}</h4>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                  sub.status === "Active" 
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                    : sub.status === "Paused"
                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                                }`}>
                                  ● {sub.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400 font-mono">Deduction Method: <span className="text-neutral-300">UPI Mandate / Credit e-Debit</span></p>
                            </div>

                            <div className="sm:text-right">
                              <span className="text-lg font-extrabold text-emerald-400 font-mono block">₹{sub.amount.toLocaleString()}<span className="text-xs text-neutral-500 font-normal">/{sub.interval === "quarterly" ? "quarter" : "mo"}</span></span>
                              <span className="text-[10px] text-neutral-500 font-mono block mt-0.5">Next billing: {new Date(sub.nextBillingDate).toLocaleDateString("en-IN")}</span>
                            </div>
                          </div>

                          {/* Dynamic slider dues payoff bar */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400">
                              <span>Institutional Dues Repayment Progress</span>
                              <span className="text-emerald-400 font-bold">{percentPaid}% Paid (₹{totalPaidOnSub.toLocaleString()} of ₹{totalDuesPlanned.toLocaleString()})</span>
                            </div>
                            <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-850">
                              <div 
                                className="bg-[#10b981] h-full rounded-full transition-all duration-500" 
                                style={{ width: `${percentPaid}%` }}
                              />
                            </div>
                          </div>

                          {/* Action controller triggers */}
                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                              onClick={() => onToggleSubscription(sub.id)}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                sub.status === "Active"
                                  ? "bg-amber-550/15 hover:bg-amber-550/25 text-amber-400 border border-amber-500/20"
                                  : "bg-emerald-510/15 hover:bg-emerald-510/25 text-emerald-400 border border-emerald-500/20"
                              }`}
                            >
                              {sub.status === "Active" ? (
                                <><Pause className="w-3.5 h-3.5" /> Pause Mandate</>
                              ) : (
                                <><Play className="w-3.5 h-3.5 text-emerald-400" /> Resume Mandate</>
                              )}
                            </button>

                            <button
                              disabled={sub.status !== "Active"}
                              onClick={() => onTriggerSubscriptionDebit(sub.id)}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                sub.status === "Active"
                                  ? "bg-emerald-600 hover:bg-emerald-500 text-black shadow-lg"
                                  : "bg-neutral-900 text-neutral-500 border border-neutral-850 opacity-50 cursor-not-allowed"
                              }`}
                            >
                              <RefreshCw className="w-3.5 h-3.5" /> Trigger Simulated Billing Run
                            </button>
                            <span className="text-[10px] text-neutral-500 font-mono ml-auto">Cycle ID: mca_{sub.id}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center bg-neutral-950 rounded-2xl border border-neutral-900 text-neutral-500 font-mono">
                      <AlertCircle className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
                      No active recurring subscriptions logged. Go to pricing tab on Homepage to subscribe.
                    </div>
                  )}
                </div>
              </div>


              {/* SECTION B: LEDGER HISTORICAL LIST */}
              <div className="bg-[#121214] border border-neutral-850 rounded-3xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-500" /> Authorized Academic ledger Logs
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">Safe online ledger transactions registered on the secured application database.</p>
                </div>

                <div className="space-y-4">
                  {payments.length > 0 ? (
                    payments.map((pay) => (
                      <div key={pay.id} className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500">{new Date(pay.createdAt).toLocaleDateString("en-IN")}</span>
                          <p className="font-bold text-sm text-white mt-0.5">{pay.purpose}</p>
                          <p className="text-xs text-neutral-400 font-mono">Reference Ref: {pay.id}</p>
                          {pay.method && <p className="text-[10px] font-mono text-neutral-500 mt-0.5">Method: {pay.method}</p>}
                        </div>
                        
                        <div className="text-right shrink-0">
                          <span className="text-base font-extrabold text-amber-400 block font-mono">₹{pay.amount.toLocaleString()}</span>
                          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                            {pay.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-neutral-500 font-mono">
                      <AlertCircle className="w-10 h-10 mx-auto text-neutral-600 mb-2" />
                      No transactions registered. Enter deposit checkout to create.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column (Col Span 4) - Custom transaction simulator */}
            <div className="lg:col-span-4 bg-gradient-to-tr from-neutral-900 to-amber-500/5 border border-neutral-800 p-6 rounded-3xl space-y-6">
              <div>
                <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">EMI &amp; Transaction Checkout Simulator</h4>
                <p className="text-xs text-neutral-400 mt-1 font-sans">Simulate custom financial deposits to clear program dues cleanly.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">Checkout Amount (INR)</label>
                  <input 
                    type="number"
                    value={customPayAmount}
                    onChange={(e) => setCustomPayAmount(e.target.value)}
                    placeholder="Amount to pay" 
                    className="w-full bg-[#17171a] border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <button 
                      onClick={() => setCustomPayAmount("20000")}
                      className="text-[10px] font-mono px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:text-amber-400 cursor-pointer animate-none"
                    >
                      ₹20K (Seat)
                    </button>
                    <button 
                      onClick={() => setCustomPayAmount("50000")}
                      className="text-[10px] font-mono px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:text-amber-400 cursor-pointer animate-none"
                    >
                      ₹50K (Fee)
                    </button>
                    <button 
                      onClick={() => setCustomPayAmount("38000")}
                      className="text-[10px] font-mono px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 hover:text-amber-400 cursor-pointer text-emerald-400 border-emerald-950/40"
                    >
                      ₹38K (EMI)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">Purpose of Ledger Transaction</label>
                  <input 
                    type="text"
                    value={customPayPurpose}
                    onChange={(e) => setCustomPayPurpose(e.target.value)}
                    placeholder="Enter purpose tag" 
                    className="w-full bg-[#17171a] border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 font-sans text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Authorized System</span>
                    <span className="text-white font-semibold">Razorpay Direct Connect</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Total Tax Tag</span>
                    <span className="text-white font-mono">0.00 % (Scholarship Exempt)</span>
                  </div>
                  <div className="border-t border-neutral-900 pt-2 flex justify-between text-sm font-bold">
                    <span>Dues deducted</span>
                    <span className="text-amber-400 font-mono">₹{Number(customPayAmount).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onTriggerPayment(Number(customPayAmount), customPayPurpose);
                  }}
                  className="w-full py-3 bg-amber-500 text-black font-semibold text-xs font-mono rounded-lg hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/10 flex items-center justify-center gap-1.5"
                >
                  Confirm simulated Ledger Payment &rarr;
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: ENQUIRIES AND LEAD MANAGER PORTAL */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            
            <div className="bg-[#121214] border border-neutral-800 rounded-3xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-amber-500" /> Active Admission Callback Leads
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">Real-time enquiries ledger tracking for directorship callbacks and parent consulting appointments.</p>
                </div>
                
                <div className="shrink-0 flex items-center gap-2">
                  {isAdminView && (
                    <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded font-mono font-bold animate-pulse">
                      🛠️ ADMIN VIEW ACTIVE
                    </span>
                  )}
                </div>
              </div>

              {/* Warnings and information */}
              <div className="mt-6 space-y-4">
                {enquiries.map((enq) => (
                  <div 
                    key={enq.id}
                    className={`p-5 bg-neutral-900/60 border rounded-xl space-y-3 transition-colors ${
                      enq.status === "New" 
                        ? "border-red-500/30 bg-red-500/5" 
                        : enq.status === "Contacted" 
                          ? "border-amber-500/30 bg-[#161616]" 
                          : "border-neutral-800 bg-neutral-900/25"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{enq.name}</span>
                          <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                            enq.purpose === "Enroll" 
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                              : "bg-[#141414] text-neutral-400"
                          }`}>
                            {enq.purpose} Request
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                          <span className="flex items-center gap-1 font-mono">{enq.email}</span> &middot; 
                          <span className="flex items-center gap-1 font-mono">{enq.phone}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                          enq.status === "New" 
                            ? "bg-red-500/10 text-red-500 border border-red-500/20" 
                            : enq.status === "Contacted" 
                              ? "bg-amber-400/10 text-amber-400 border border-amber-400/20" 
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}>
                          {enq.status} Status
                        </span>

                        {/* Administrative state toggle triggers */}
                        {isAdminView && (
                          <div className="flex items-center gap-1 bg-black/40 border border-neutral-800 p-1 rounded-lg">
                            <span className="text-[10px] text-neutral-500 px-1">Mark:</span>
                            <button 
                              onClick={() => onUpdateEnquiryStatus(enq.id, "Contacted")}
                              className="text-[10px] font-mono bg-amber-500/20 hover:bg-amber-500 text-white font-semibold px-1.5 py-0.5 rounded"
                            >
                              Contact
                            </button>
                            <button 
                              onClick={() => onUpdateEnquiryStatus(enq.id, "Resolved")}
                              className="text-[10px] font-mono bg-emerald-500/20 hover:bg-emerald-500 text-white font-semibold px-1.5 py-0.5 rounded"
                            >
                              Resolve
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed bg-[#0c0c0e] p-3 rounded border border-neutral-900">
                      {enq.message}
                    </p>

                    <div className="text-[10px] font-mono text-neutral-500 text-right">
                      Logged Date: {new Date(enq.createdAt).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: ADMIN CONTROL HUB */}
        {activeTab === "admin-hub" && isAdminPowerActive && (
          <AdminHubSection currentUser={currentUser} />
        )}

        {/* TAB 6: ADMINISTRATIVE ACTIVITY LOGS */}
        {activeTab === "activity-logs" && isAdminPowerActive && (() => {
          const filteredLogs = activityLogs.filter(log => {
            const query = logFilter.toLowerCase();
            return (
              (log.actionType || "").toLowerCase().includes(query) ||
              (log.adminName || "").toLowerCase().includes(query) ||
              (log.adminEmail || "").toLowerCase().includes(query) ||
              (log.details || "").toLowerCase().includes(query)
            );
          });

          return (
            <div className="space-y-8 animate-fade-in">
              <div className="p-6 bg-gradient-to-r from-sky-950/20 via-neutral-900 to-sky-950/20 border-2 border-sky-500/20 rounded-3xl relative overflow-hidden">
                <span className="text-[9px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  🛡️ Administrative Audit Logs
                </span>
                <h3 className="text-2xl font-serif text-white mt-2">Secured Activity Audit Trails</h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Real-time synchronization logs tracking critical administrative actions, course modifications, status changes, legal Pvt Ltd studio creations, and global tuition broadcasts on Google Cloud Firestore.
                </p>
              </div>

              {/* SEARCH & REFRESH CONTROLS */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-850">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={logFilter}
                    onChange={(e) => setLogFilter(e.target.value)}
                    placeholder="Search logs by admin, type, or details..."
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-xl py-2 px-3 pl-9 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                  <div className="absolute left-3 top-2.5 text-neutral-500 text-xs">🔍</div>
                </div>
                
                <button
                  onClick={fetchLogs}
                  disabled={logsLoading}
                  className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-850 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${logsLoading ? "animate-spin" : ""}`} />
                  {logsLoading ? "Syncing..." : "Sync Logs Now"}
                </button>
              </div>

              {/* LOGS TABLE/LIST */}
              <div className="bg-[#121214] border border-neutral-850 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-neutral-850 flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-sky-400" />
                    Firestore Security Ledger ({filteredLogs.length})
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500">Live Connection Active</span>
                </div>

                {logsLoading && filteredLogs.length === 0 ? (
                  <div className="p-12 text-center text-neutral-400 font-mono text-xs">
                    <RefreshCw className="w-8 h-8 text-sky-400 animate-spin mx-auto mb-3" />
                    Querying secured audit logs from Firebase...
                  </div>
                ) : filteredLogs.length === 0 ? (
                  <div className="p-12 text-center text-neutral-500 font-mono text-xs space-y-2">
                    <p>No administrative activities found matching the filter.</p>
                    <p className="text-[11px] text-neutral-600">Perform an action (like updating an enquiry or adding a cohort) to create logs.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-neutral-850 bg-neutral-950/40 text-neutral-400 uppercase tracking-wider">
                          <th className="py-3 px-6 font-bold">Timestamp</th>
                          <th className="py-3 px-6 font-bold">Administrator</th>
                          <th className="py-3 px-6 font-bold">Action Type</th>
                          <th className="py-3 px-6 font-bold">Audit Trail / Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-900 text-neutral-300">
                        {filteredLogs.map((log) => {
                          let typePill = "bg-neutral-800 text-neutral-400 border border-neutral-700/50";
                          let friendlyType = log.actionType;

                          if (log.actionType === "system_init") {
                            typePill = "bg-slate-500/10 text-slate-400 border border-slate-500/20";
                            friendlyType = "System Init";
                          } else if (log.actionType === "update_enquiry") {
                            typePill = "bg-sky-500/10 text-sky-400 border border-sky-500/20";
                            friendlyType = "Enquiry Updated";
                          } else if (log.actionType === "create_event") {
                            typePill = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                            friendlyType = "Event Scheduled";
                          } else if (log.actionType === "create_cohort") {
                            typePill = "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20";
                            friendlyType = "Cohort Built";
                          } else if (log.actionType === "create_entity") {
                            typePill = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                            friendlyType = "Pvt Ltd Created";
                          } else if (log.actionType === "notification_broadcast") {
                            typePill = "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20";
                            friendlyType = "Alert Broadcast";
                          }

                          return (
                            <tr key={log.id} className="hover:bg-neutral-900/20 transition-all">
                              <td className="py-4 px-6 text-neutral-400 whitespace-nowrap">
                                {log.createdAt ? new Date(log.createdAt).toLocaleString("en-IN") : "Unknown"}
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <span className="font-semibold text-white font-sans">{log.adminName}</span>
                                <div className="text-[10px] text-neutral-500">{log.adminEmail}</div>
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${typePill}`}>
                                  {friendlyType}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-neutral-300 min-w-[250px] font-sans">
                                {log.details}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

      </main>

    </div>
  );
}
