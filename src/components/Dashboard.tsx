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
  RefreshCw
} from "lucide-react";
import { Course, Lesson, Profile, Payment, Enquiry, Subscription } from "../types";

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
  
  // Custom payment simulation values
  const [customPayAmount, setCustomPayAmount] = useState("50000");
  const [customPayPurpose, setCustomPayPurpose] = useState("First EMI Instalment");

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
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4 py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab("lessons"); }}
              className={`px-4 py-3 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "lessons" 
                  ? "border-amber-500 text-amber-400" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Tv className="w-4 h-4" /> Curriculum &amp; Streaming Player
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
          </div>

          <div className="flex items-center gap-2 shrink-0">
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
        
        {/* TAB 1: CURRICULUM STREAMING & COURSE LESSONS PLAYER */}
        {activeTab === "lessons" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Player Area Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {activeLesson ? (
                <div className="bg-[#121214] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-1">
                  
                  {/* Dynamic Video Streaming Platform Stage */}
                  <div className="relative aspect-video bg-black rounded-xl overflow-hidden group">
                    <video 
                      key={activeLesson.id}
                      controls
                      autoPlay={false}
                      className="absolute inset-0 w-full h-full object-cover"
                      poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800"
                    >
                      <source src={activeLesson.videoUrl} type="video/mp4" />
                      Your browser does not support high-fidelity video player tags.
                    </video>
                    
                    {/* Top Watermark Overlay for Content Protection */}
                    <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/60 backdrop-blur border border-neutral-800 px-3 py-1 rounded text-neutral-400 pointer-events-none tracking-widest">
                      FILMFLUENCER ACADEMY &middot; STUDENT SECURE STREAM
                    </div>
                  </div>

                  {/* Lesson Meta Data */}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-900 pb-4 mb-4">
                      <div>
                        <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Selected Masterclass Video Lesson</span>
                        <h3 className="text-xl font-bold text-white mt-1">{activeLesson.title}</h3>
                        <p className="text-xs text-neutral-400 font-mono mt-1 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> Duration Time: {activeLesson.duration} &middot; Mode: 2026 Core Syllabus
                        </p>
                      </div>

                      {/* Complete progress Toggler */}
                      <button
                        onClick={() => onToggleLesson(activeLesson.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          completedLessons.includes(activeLesson.id)
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-amber-500 text-black hover:bg-amber-400"
                        }`}
                      >
                        {completedLessons.includes(activeLesson.id) ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 fill-current" /> Completed Lesson! (Toggle)
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" /> Mark As Complete
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {activeLesson.summary}
                    </p>

                    {/* Interactive Guerrilla Assignment Helper Box */}
                    <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                      <h4 className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase">
                        <PenTool className="w-3.5 h-3.5" /> Guerrilla Director Assignment:
                      </h4>
                      <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                        After streaming, write down your 1-paragraph screenplay logline of your upcoming Production Banner. Upload details internally or send straight to Director Hemant Nilim Das for professional script feedback.
                      </p>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
                  <Tv className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                  <p className="text-base font-bold text-white">No Lesson Selected</p>
                  <p className="text-xs mt-1">Please select an academic module lesson track from the right side.</p>
                </div>
              )}

            </div>

            {/* Courses & Lectures Selector sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-[#121214] border border-neutral-800 rounded-2xl p-6">
                <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider mb-4">Course Progress Navigator</h4>
                
                <div className="space-y-4">
                  {courses.map((course, idx) => {
                    const isSelected = selectedCourse?.id === course.id;
                    
                    // Count completed in this specific course
                    const courseLessonIds = course.lessons.map(l => l.id);
                    const completedInCourse = course.lessons.filter(l => completedLessons.includes(l.id)).length;
                    const percent = Math.round((completedInCourse / course.lessons.length) * 100);

                    return (
                      <div 
                        key={course.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isSelected 
                            ? "bg-neutral-900 border-amber-500/40 text-white" 
                            : "bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900 text-neutral-300"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] font-mono text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-400/10 uppercase tracking-wider">
                              Stage {idx + 1}
                            </span>
                            <button 
                              onClick={() => setSelectedCourse(course)}
                              className="text-sm font-bold block mt-1 hover:underline text-left"
                            >
                              {course.title}
                            </button>
                          </div>
                          <span className="text-[11px] font-mono text-amber-400 font-bold">{percent}%</span>
                        </div>

                        {/* Progress Line */}
                        <div className="w-full h-1 bg-neutral-950 rounded-full overflow-hidden mb-3">
                          <div className="h-full bg-amber-500" style={{ width: `${percent}%` }}></div>
                        </div>

                        {/* Lessons trigger block */}
                        {isSelected && (
                          <div className="mt-3 space-y-2 border-t border-neutral-800 pt-3">
                            {course.lessons.map((lesson) => {
                              const isActive = activeLesson?.id === lesson.id;
                              const isCompleted = completedLessons.includes(lesson.id);

                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => setActiveLesson(lesson)}
                                  className={`w-full text-left p-2 rounded text-xs transition-all flex items-start gap-2 ${
                                    isActive 
                                      ? "bg-amber-500/10 border-l-2 border-amber-500 text-white" 
                                      : "hover:bg-black/20 text-neutral-400"
                                  }`}
                                >
                                  <div className="mt-0.5 shrink-0">
                                    {isCompleted ? (
                                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                                    ) : (
                                      <Play className="w-3.5 h-3.5 text-amber-400/60" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate">{lesson.title}</p>
                                    <p className="text-[10px] text-neutral-500 font-mono">{lesson.duration}</p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>
        )}

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

      </main>

    </div>
  );
}
