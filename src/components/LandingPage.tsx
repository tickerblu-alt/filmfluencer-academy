import React, { useState, useEffect } from "react";
import { 
  Award, 
  Users, 
  Play, 
  Video, 
  Sparkles, 
  MessageSquare, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FolderMinus,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Flame,
  ShieldCheck,
  User,
  Heart,
  Upload,
  Plus,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Info,
  X
} from "lucide-react";
import { PortfolioData, Course } from "../types";
import FilmfluencerThesis from "./FilmfluencerThesis";
import TheJourney from "./TheJourney";
import FFACurriculum from "./FFACurriculum";
import MuvireelDistribution from "./MuvireelDistribution";
import FilmIndustryRedirected from "./FilmIndustryRedirected";
import TheCreativeEngine from "./TheCreativeEngine";
import UltimateStudentYields from "./UltimateStudentYields";
import MumbaiStudioContact from "./MumbaiStudioContact";
import WhatsAppWidget from "./WhatsAppWidget";
import FFAWorkGallery from "./FFAWorkGallery";
import StudentInterviewPortal from "./StudentInterviewPortal";
import ELearnSection from "./ELearnSection";
import EnquiryPopup from "./EnquiryPopup";
import ScrollToTop from "./ScrollToTop";

interface LandingPageProps {
  portfolio: PortfolioData | null;
  courses: Course[];
  onSubmitEnquiry: (data: {
    name: string;
    email: string;
    phone: string;
    purpose: "Question" | "Enroll" | "Callback";
    message: string;
  }) => Promise<boolean>;
  onTriggerPayment: (amount: number, purpose: string) => void;
  onCreateSubscription: (planName: string, amount: number, interval: "monthly" | "quarterly") => void;
  onNavigateToDashboard: (initialTab?: string) => void;
  isAdminPowerActive?: boolean;
  onEditAsset?: (asset: any) => void;
  currentUser?: any;
  onTriggerAuth?: () => void;
  onSignOut?: () => void;
}

export default function LandingPage({
  portfolio,
  courses,
  onSubmitEnquiry,
  onTriggerPayment,
  onCreateSubscription,
  onNavigateToDashboard,
  isAdminPowerActive = false,
  onEditAsset,
  currentUser,
  onTriggerAuth,
  onSignOut,
}: LandingPageProps) {
  // Enquiry form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState<"Question" | "Enroll" | "Callback">("Enroll");
  const [message, setMessage] = useState("");
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [bookingMode, setBookingMode] = useState<"advance" | "emi_recurring">("advance");

  // Brands list with simulated logo uploads
  const [brandsList, setBrandsList] = useState<Array<{ id: string; client: string; campaign: string; logoUrl?: string; initial?: string }>>([
    { id: "brand_1", client: "Tata Motors Commercials", campaign: "Harrier Bold Launch", initial: "TM" },
    { id: "brand_2", client: "Kotak Life Assurance", campaign: "True Protection Campaign", initial: "KL" },
    { id: "brand_3", client: "Lamborghini Mumbai Launch", campaign: "Urus S Luxury Spot", initial: "L" },
    { id: "brand_4", client: "Accenture Digital India", campaign: "Future of Enterprise Films", initial: "A" },
  ]);

  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandCampaign, setNewBrandCampaign] = useState("");
  const [logoFeedback, setLogoFeedback] = useState("");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      setLogoFeedback("Please select a valid PNG, JPG or SVG image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setLogoFeedback("File is too large. Image must be under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setBrandsList(prev => prev.map(b => b.id === id ? { ...b, logoUrl: dataUrl } : b));
      setLogoFeedback("Logo uploaded successfully!");
      setTimeout(() => setLogoFeedback(""), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName) return;
    const initial = newBrandName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 3);
    const newBrand = {
      id: "brand_" + Date.now(),
      client: newBrandName,
      campaign: newBrandCampaign || "National Ad Film Portfolio",
      initial,
      logoUrl: ""
    };
    setBrandsList(prev => [...prev, newBrand]);
    setNewBrandName("");
    setNewBrandCampaign("");
    setLogoFeedback(`Added '${newBrandName}'! Assign a logo from its card below.`);
    setTimeout(() => setLogoFeedback(""), 4000);
  };

  // Dedicated YouTube links configuration
  const [customYoutubeVideos, setCustomYoutubeVideos] = useState([
    {
      title: "Pocket Gangsters - Official Unbroken Theatrical Trailer",
      youtubeId: "vBq72eF_u1A",
      duration: "2 min 14s",
      category: "Theatrical Movie",
      description: "Witness India's pioneering single-take hostage drama written and directed by Hemant Nilim Das. Feat. Vijay Raaz & Madhur Mittal."
    },
    {
      title: "Law Of Attraction - Official Webseries Pilot Preview",
      youtubeId: "dQw4w9WgXcQ",
      duration: "3 min 45s",
      category: "Webseries",
      description: "Explore the psychological chess match and high-density emotional blockings of this viral masterfully-paced drama series."
    },
    {
      title: "Jhoothistaan - Official Season Promo & Directing Masterclass",
      youtubeId: "vBq72eF_u1A",
      duration: "5 min 12s",
      category: "Webseries Hit",
      description: "Hemant Nilim Das guides actors through multi-layered conversational tension patterns and high-reach framing setups."
    },
    {
      title: "Brahmaputra Hunters - Upcoming Feature Production Preview",
      youtubeId: "dQw4w9WgXcQ",
      duration: "4 min 11s",
      category: "Upcoming Feature Film",
      description: "Behind the scenes on Hemant's high-stakes action thriller. Students actively co-direct in pairs on real live sets!"
    }
  ]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // Administrative Enquiries FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const administrativeFAQs = [
    {
      question: "Is the ₹20,000 reservation seed fee fully refundable?",
      answer: "Yes, 100% absolutely. Immediately upon checkout ledger capture, Filmfluencer Academy issues a legally registered student escrow contract. If you elect to withdraw at any point prior to the inaugural physical session, or if regional schedules change, your full booking deposit is returned immediately without fees."
    },
    {
      question: "What physical credentials, company registration, and IMDB credits will I graduate with?",
      answer: "You graduate with three clear legal assets: 1) A certified Private Limited production banner registered in your own name as director/owner. 2) A verified IMDB credit as Co-Director or Assistant Coordinator on our active professional theatrical feature stream 'Brahmaputra Hunters'. 3) A certified masterclass badge of Directorial Merit signed by Hemant Nilim Das."
    },
    {
      question: "Does the boot camp provide flexible monthly EMI structures?",
      answer: "Yes! While the full stage-integrated tuition is ₹4,00,000, we support customized zero-interest installment options starting at ₹31,666/month. This is designed to ensure you can fund your cinema career directly through active production commissions."
    },
    {
      question: "Where do physical film shoots and blocking masterclasses take place?",
      answer: "Practical set work, cinematic blocking workshops, and high-end RED/Alexa camera labs alternate dynamically between state-of-the-art studio rooms in Guwahati (Assam) and central production offices in Mumbai (Maharashtra). Affordable lodging assistance is coordinated under the student desk."
    },
    {
      question: "Do I require background movie degrees or personal equipment to join?",
      answer: "None at all. We start from absolute storytelling first principles up to commercial deployment mechanics. The Academy furnishes all professional prime lenses, drone rigs, camera sensors, and AI script tools on set."
    }
  ];
  
  // Filmpreneur Paradigm Simulator State
  const [simulatorAspect, setSimulatorAspect] = useState<"filmmaking" | "media-pr">("filmmaking");
  const [simulatedFollowers, setSimulatedFollowers] = useState<number>(35000);
  const [prBudgetShare, setPrBudgetShare] = useState<number>(120000); // portion of fee spent on PR

  // Active gallery tabs & simulation uploads
  const [galleryTab, setGalleryTab] = useState<"awards" | "press" | "scenes">("awards");
  const [galleryFeedback, setGalleryFeedback] = useState<string>("");
  const [customPressPhotos, setCustomPressPhotos] = useState([
    {
      id: 1,
      title: "Times of India Press Feature",
      subtitle: "Pocket Gangsters Single-Take Revolutionary Masterclass Coverage",
      imageUrl: "",
      initials: "TOI"
    },
    {
      id: 2,
      title: "Standard Jury Award Ceremony",
      subtitle: "National integration trophy for regional cinema progression",
      imageUrl: "",
      initials: "NJA"
    },
    {
      id: 3,
      title: "Mumbai Guild Press Conference",
      subtitle: "Hemant Nilim Das with legal producers answering script inquiries",
      imageUrl: "",
      initials: "MGP"
    },
    {
      id: 4,
      title: "The Hindu Editorial Highlight",
      subtitle: "Guerrilla blocking methods acclaimed across multiplex releases",
      imageUrl: "",
      initials: "TH"
    }
  ]);

  const handlePressPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPressPhotos(prev => prev.map(photo => photo.id === id ? { ...photo, imageUrl: url } : photo));
      setGalleryFeedback(`Successfully updated Press Photo: '${file.name}'`);
      setTimeout(() => setGalleryFeedback(""), 3500);
    }
  };

  // Timer State for Countdown
  const [countdown, setCountdown] = useState({
    days: 6,
    hours: 14,
    minutes: 23,
    seconds: 41
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [globalPlayVideoId, setGlobalPlayVideoId] = useState<string | null>(null);

  // Form submission handler
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setEnquiryLoading(true);
    const success = await onSubmitEnquiry({
      name,
      email,
      phone,
      purpose,
      message
    });
    setEnquiryLoading(false);
    if (success) {
      setEnquirySuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => setEnquirySuccess(false), 8000);
    }
  };

  return (
    <div className="bg-[#0b0b0c] text-gray-100 min-h-screen font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Top Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 text-neutral-300 text-xs py-2 px-4 text-center tracking-wide font-mono flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        OCTOBER 2026 COHORT: ONLY 4 SEATS REMAINING. INCLUDES GUARANTEED IMDB CREDITS.
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-[#0b0b0ca0] backdrop-blur-md border-b border-neutral-900/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-amber-500/10 font-display">
            F
          </div>
          <div>
            <h1 className="text-lg font-bold font-display tracking-tight text-white flex items-center gap-1">
              FILMFLUENCER <span className="text-amber-400 text-xs px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">ACADEMY</span>
            </h1>
            <p className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">Mastery Under Hemant Nilim Das</p>
          </div>
        </div>
        
        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a href="#portfolio" className="hover:text-amber-400 transition-colors">The Director</a>
          <a href="#curriculum" className="hover:text-amber-400 transition-colors">Curriculum</a>
          <a href="#elearn-portal" className="text-amber-400 hover:text-amber-300 transition-colors font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> E-Learn
          </a>
          <a href="#ffa-work-gallery" className="hover:text-amber-400 transition-colors">Work Gallery</a>
          <a href="#artistic-challenge" className="hover:text-amber-400 transition-colors font-semibold text-red-400">Admissions Challenge</a>
          <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a>
        </nav>

        {/* Dynamic Nav CTA */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono uppercase font-black px-2.5 py-1.5 rounded-full border ${
                currentUser.role === "admin"
                  ? "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              }`}>
                {currentUser.role === "admin" ? "⚡ ADMIN POWER" : `🎓 student: ${currentUser.name}`}
              </span>
              <button 
                onClick={onSignOut}
                className="text-[10px] font-mono px-3 py-1.5 rounded bg-neutral-900 border border-neutral-850 text-neutral-400 hover:text-white hover:border-red-500/30 transition-all cursor-pointer"
              >
                Sign-Out
              </button>
            </div>
          ) : (
            <button
              onClick={onTriggerAuth}
              className="text-xs font-bold font-mono px-4 py-2 rounded bg-amber-500 text-black hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer"
            >
              🔒 PORTAL SIGN-ON / REGISTER
            </button>
          )}

          {isAdminPowerActive && (
            <button 
              onClick={() => onNavigateToDashboard("lessons")}
              className="text-xs font-mono px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black transition-all cursor-pointer"
            >
              STUDENT HUB
            </button>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-6 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="absolute inset-0 bg-radial-at-t from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-amber-400 mb-6 font-mono">
            <Sparkles className="w-3.5 h-3.5" /> High-Conversion Academic Boot Camp · Mumbai &amp; Guwahati
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.1] text-white tracking-tight mb-6">
            Don't study cinema.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Make it. Own it. Sell it.
            </span>
          </h2>

          {/* WHY FILMFLUENCER ACADEMY? SECTION */}
          <div className="my-8 max-w-3xl mx-auto p-6 bg-[#121214] border border-neutral-800 rounded-2xl text-left shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
            <h3 className="text-xs font-mono font-extrabold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              WHY FILMFLUENCER ACADEMY?
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              The future belongs to filmmakers who own their audience. FilmFluencer Academy (FFA) is India's premier high-production accelerator teaching modern scripting, raw cinematography, professional editing, hyper-social-brand-crafting and short&amp;long form theatrical distribution on our groundbreaking upcoming network: <strong className="text-amber-400">MUVIREEL</strong>.
            </p>
          </div>
          
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8 font-sans">
            Graduate in 365 days with your own <strong className="text-amber-400">Feature Film</strong>, 
            <strong className="text-amber-400"> Web Series</strong>, <strong className="text-amber-400">Verified IMDB Credit</strong>, and a legally 
            incorporated production banner — personally mentored by LA Film Festival Winner, <strong className="text-neutral-200">Hemant Nilim Das</strong>.
          </p>

          {/* Social Proof Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10 text-left">
            <div className="bg-[#121214] border border-neutral-800/80 p-4 rounded-xl flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase">Directing Mentor</p>
                <p className="text-sm font-semibold text-white">LA Best Director Winner</p>
              </div>
            </div>

            <div className="bg-[#121214] border border-neutral-800/80 p-4 rounded-xl flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase">Verified Outcome</p>
                <p className="text-sm font-semibold text-white">Active IMDB Credit</p>
              </div>
            </div>

            <div className="bg-[#121214] border border-neutral-800/80 p-4 rounded-xl flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase">Owner Advantage</p>
                <p className="text-sm font-semibold text-white">Your Production Banner</p>
              </div>
            </div>

            <div className="bg-[#121214] border border-neutral-800/80 p-4 rounded-xl flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono uppercase">Cohort Size</p>
                <p className="text-sm font-semibold text-white">Limit: 10 Students Max</p>
              </div>
            </div>
          </div>

          {/* Dynamic Seat Indicator bar */}
          <div className="max-w-md mx-auto bg-neutral-900 border border-neutral-800 p-4 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Cohort Filling Fast
              </span>
              <span className="text-xs font-bold text-red-400">6 of 10 Seats Taken</span>
            </div>
            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => {
                if (isAdminPowerActive) {
                  window.location.hash = "enroll";
                } else {
                  alert("🔒 ADMIN POWER REQUIRED: This action requires Admin Power to be signed on! Please register or sign-on as an Admin in the navigation header first.");
                }
              }}
              className={`w-full sm:w-auto px-8 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-base shadow-lg cursor-pointer font-display ${
                isAdminPowerActive 
                  ? "bg-amber-500 text-black hover:bg-amber-400 shadow-amber-500/10" 
                  : "bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed opacity-50"
              }`}
            >
              Reserve Seat for ₹20,000 {!isAdminPowerActive && "🔒"} <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => {
                if (isAdminPowerActive) {
                  onNavigateToDashboard("lessons");
                } else {
                  alert("🔒 ADMIN POWER REQUIRED: The Student Hub is restricted to Admin Power only! Please authenticate in the header first.");
                }
              }}
              className={`w-full sm:w-auto px-8 py-4 rounded-lg border text-white font-medium transition-all flex items-center justify-center gap-2 text-base cursor-pointer ${
                isAdminPowerActive
                  ? "bg-[#141416] border-neutral-800 hover:border-neutral-700 hover:bg-[#1a1a1d]"
                  : "bg-neutral-900/40 border-neutral-850 text-neutral-500 cursor-not-allowed opacity-50"
              }`}
            >
              Access STUDENT HUB {!isAdminPowerActive && "🔒"} <Play className="w-4 h-4 text-amber-400 fill-current" />
            </button>
          </div>
          
          <p className="text-xs text-neutral-500 mt-4 font-mono">
            Balance ₹3,80,000 payable upon launch · Fully refundable if cohort launch is cancelled
          </p>
        </div>
      </section>

      <FilmIndustryRedirected />

      <FilmfluencerThesis
        simulatorAspect={simulatorAspect}
        setSimulatorAspect={setSimulatorAspect}
        simulatedFollowers={simulatedFollowers}
        setSimulatedFollowers={setSimulatedFollowers}
      />

      {/* THE CREATIVE ENGINE & FOUNDER PORTFOLIO */}
      <TheCreativeEngine />

      {/* ULTIMATE STUDENT YIELDS */}
      <UltimateStudentYields onNavigateToDashboard={onNavigateToDashboard} />

      <TheJourney />

      <FFACurriculum courses={courses} onNavigateToDashboard={onNavigateToDashboard} />

      <MuvireelDistribution />

      <ELearnSection />

      {/* COMPARATIVE GRID */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-3xl font-bold font-display text-white">Compare Your Alternatives</h3>
          <p className="text-neutral-400 mt-2 text-sm">Why serious creators choose Filmfluencer Academy over legacy theory schools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Whistling Woods */}
          <div className="bg-neutral-950/40 border border-neutral-900 p-6 rounded-2xl opacity-60 hover:opacity-100 transition-opacity">
            <h5 className="text-lg font-bold text-neutral-300 mb-2">Legacy Film Schools</h5>
            <div className="text-xl font-extrabold text-neutral-400 mb-4 font-mono">₹24,00,000+</div>
            <ul className="space-y-3 text-xs text-neutral-500">
              <li className="flex gap-2 items-center text-red-500/80">❌ No verified IMDB screen credits</li>
              <li className="flex gap-2 items-center">❌ No registered manufacturing banner</li>
              <li className="flex gap-2 items-center">❌ Static theoretical classroom lessons</li>
              <li className="flex gap-2 items-center">❌ Outdated 2012 production pipelines</li>
              <li className="flex gap-2 items-center">❌ Massive multi-year student loans</li>
            </ul>
          </div>

          {/* Filmfluencer */}
          <div className="bg-[#151518] border-2 border-amber-500/80 p-6 rounded-2xl relative shadow-xl shadow-amber-500/5">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-amber-500 text-black text-[10px] font-bold font-mono tracking-widest uppercase">
              RECOMMENDED CHOICE
            </div>
            <h5 className="text-lg font-bold text-white mb-2">Filmfluencer Academy</h5>
            <div className="text-xl font-extrabold text-amber-400 mb-4 font-mono">₹4,00,000 <span className="text-xs text-neutral-500 font-normal">All-Inclusive</span></div>
            <ul className="space-y-3 text-xs text-neutral-200">
              <li className="flex gap-2 items-center text-emerald-400">✔️ Real, verified IMDB film credit</li>
              <li className="flex gap-2 items-center text-emerald-400">✔️ Corporate Registered Banner in your name</li>
              <li className="flex gap-2 items-center text-emerald-400">✔️ On-set hand training on actual feature film</li>
              <li className="flex gap-2 items-center text-emerald-400">✔️ Cutting-edge AI storyboard &amp; budgeting tool</li>
              <li className="flex gap-2 items-center text-emerald-400">✔️ 10-student hyper-focused custom cohorts</li>
            </ul>
          </div>

          {/* FTII (Govt) */}
          <div className="bg-neutral-950/40 border border-neutral-900 p-6 rounded-2xl opacity-60 hover:opacity-100 transition-opacity">
            <h5 className="text-lg font-bold text-neutral-300 mb-2">FTII (Government Exam)</h5>
            <div className="text-xl font-extrabold text-neutral-400 mb-4 font-mono">₹1,24,000+</div>
            <ul className="space-y-3 text-xs text-neutral-500">
              <li className="flex gap-2 items-center text-red-500/80">❌ 3-Year rigorous fulltime commitment</li>
              <li className="flex gap-2 items-center">❌ Brutal entrance selection rates</li>
              <li className="flex gap-2 items-center">❌ Traditional, slow bureaucratic curriculum</li>
              <li className="flex gap-2 items-center">❌ No company incorporation aid</li>
              <li className="flex gap-2 items-center text-emerald-400">✔️ Respected state academic certificate</li>
            </ul>
          </div>
        </div>
      </section>

      <StudentInterviewPortal onAddEnquiry={onSubmitEnquiry} />

      {/* ENQUIRY & RESERVATION SECTION */}
      <section id="enroll" className="py-20 px-6 max-w-7xl mx-auto bg-gradient-to-t from-[#0e0e0f] to-transparent rounded-3xl border border-neutral-900 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Reservation column */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-2">Secure Your Future</span>
              <h3 className="text-3xl font-bold font-display text-white">Reserve Your Seat Online</h3>
              <p className="text-neutral-400 mt-2 text-sm leading-relaxed">
                Confirm your reservation securely by making your refundable seat booking deposit. 
                We accept major digital modes including credit cards, NetBanking, and UPI through our secured Razorpay system integration.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-center">
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" /> EARLY BIRD ENROLLMENT DISCOUNTS EXPIRE IN
              </p>
              <div className="flex gap-4 justify-center">
                <div className="p-3 bg-black/60 rounded-xl min-w-[70px] border border-neutral-800">
                  <span className="text-2xl font-bold text-white font-mono block">{String(countdown.days).padStart(2, '0')}</span>
                  <span className="text-[10px] text-neutral-500 mt-1 block uppercase font-mono">Days</span>
                </div>
                <div className="p-3 bg-black/60 rounded-xl min-w-[70px] border border-neutral-800">
                  <span className="text-2xl font-bold text-white font-mono block">{String(countdown.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] text-neutral-500 mt-1 block uppercase font-mono">Hrs</span>
                </div>
                <div className="p-3 bg-black/60 rounded-xl min-w-[70px] border border-neutral-800">
                  <span className="text-2xl font-bold text-white font-mono block">{String(countdown.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] text-neutral-500 mt-1 block uppercase font-mono">Min</span>
                </div>
                <div className="p-3 bg-black/60 rounded-xl min-w-[70px] border border-neutral-800">
                  <span className="text-2xl font-bold text-white font-mono block">{String(countdown.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] text-neutral-500 mt-1 block uppercase font-mono">Sec</span>
                </div>
              </div>
            </div>

            {/* Price block */}
            <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border-2 border-amber-500/30 p-6 rounded-2xl relative space-y-4">
              
              {/* Checkout pricing selector */}
              <div className="grid grid-cols-2 gap-2 bg-neutral-900/80 p-1.5 rounded-xl border border-neutral-850">
                <button
                  type="button"
                  onClick={() => setBookingMode("advance")}
                  className={`py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    bookingMode === "advance" 
                      ? "bg-amber-500 text-black shadow" 
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Seat Advance (₹20,000)
                </button>
                <button
                  type="button"
                  onClick={() => setBookingMode("emi_recurring")}
                  className={`py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    bookingMode === "emi_recurring" 
                      ? "bg-emerald-600 text-black shadow" 
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Auto-EMI Plan (₹38,000/mo)
                </button>
              </div>

              {bookingMode === "advance" ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-sm font-mono text-amber-400 font-bold uppercase tracking-wider">Refundable Booking Advance</h5>
                      <p className="text-3xl font-extrabold text-white mt-1 font-mono">₹20,000</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Written Guarantee
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    <strong>Important:</strong> Balance of ₹3,80,000 due before class starts. Instant 100% money-back written contract issued via mail if you withdraw before classes begin or cohort fails to launch under any conditions.
                  </p>

                  <button 
                    onClick={() => onTriggerPayment(20000, "Filmfluencer Seed Seat Booking")}
                    className="w-full py-4 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-all font-display flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    Proceed to Online Checkout (Simulated) <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-sm font-mono text-emerald-400 font-bold uppercase tracking-wider">Recurring Monthly AutoPay Plan</h5>
                      <p className="text-3xl font-extrabold text-white mt-1 font-mono">₹38,000<span className="text-xs text-neutral-400 font-normal"> / month</span></p>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      0% Interest Mandate
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    <strong>EMI Advantage:</strong> Subscribing triggers a secure Razorpay subscription mandate. Pays off the full tutorial program dues across 10 months of automatic debits with active cancellation flags built in.
                  </p>

                  <button 
                    onClick={() => onCreateSubscription("10-Month Cinema EMI Plan", 38000, "monthly")}
                    className="w-full py-4 rounded-xl bg-emerald-600 text-black font-semibold text-sm hover:bg-emerald-500 transition-all font-display flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    Authorize Razorpay UPI Mandate <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between border-t border-neutral-900 pt-4 text-xs font-mono text-neutral-500">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> SSL SECURED SERVER</span>
              <span>RAZORPAY INTEGRATED</span>
            </div>
          </div>

          {/* Enquiry Column */}
          <div className="lg:col-span-6 bg-[#121214] border border-neutral-800 p-8 rounded-3xl">
            
            {/* Interactive Administrative FAQ Accordion */}
            <div id="faq" className="mb-8 border-b border-neutral-800/80 pb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Administrative Helpdesk Q&amp;A</h4>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">Get instant answers instantly</p>
                </div>
              </div>

              <div className="space-y-2.5 mt-4">
                {administrativeFAQs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`border rounded-xl transition-all duration-300 ${
                        isOpen 
                          ? "bg-neutral-900 border-amber-500/30 shadow-md shadow-amber-500/5" 
                          : "bg-[#17171a] border-neutral-800 hover:border-neutral-700"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-3.5 flex items-center justify-between gap-3 text-xs font-semibold text-neutral-200 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isOpen ? "bg-amber-400 animate-ping" : "bg-neutral-600"}`}></span>
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-neutral-900/60">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <h4 className="text-lg font-bold text-white mb-2">Still Have Doubts? Get a Callback</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Got specific doubts or personal screenplay ambitions for the director? Submit your info below and our directorship coordinator will reach out within 2 hours.
            </p>

            {enquirySuccess ? (
              <div className="p-6 bg-emerald-900/10 border border-emerald-500/30 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h5 className="text-base font-bold text-white">Enquiry Logged Successfully!</h5>
                <p className="text-xs text-emerald-300 leading-relaxed">
                  We have registered your details in our system dashboard databases. An academic coordinator will call or WhatsApp you directly at the phone number provided. You can track this enquiry in real-time on our dashboard.
                </p>
                <button
                  onClick={() => onNavigateToDashboard("enquiries")}
                  className="mt-4 px-4 py-2 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-semibold rounded font-mono cursor-pointer transition-all"
                >
                  View Enquiries Dashboard &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">Full Student Name *</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
                    className="w-full bg-[#17171a] border border-neutral-800/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@domain.com" 
                      className="w-full bg-[#17171a] border border-neutral-800/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">WhatsApp/Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210" 
                      className="w-full bg-[#17171a] border border-neutral-800/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">Primary Purpose *</label>
                  <select 
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value as any)}
                    className="w-full bg-[#17171a] border border-neutral-800/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="Enroll">I Want to Enroll (Reserve Seat)</option>
                    <option value="Callback">Request a Free Callback (20 Mins)</option>
                    <option value="Question">I Have a General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">Your Message / Background Details</label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about yourself or your screenplay / acting ambitions." 
                    className="w-full bg-[#17171a] border border-neutral-800/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={enquiryLoading}
                  className="w-full py-3.5 rounded-lg bg-neutral-100 text-black font-semibold text-sm hover:bg-neutral-200 transition-all font-display btn flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {enquiryLoading ? "Saving to system database..." : "Submit Enquiry Request &rarr;"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <FFAWorkGallery onPlayVideo={(id) => setGlobalPlayVideoId(id)} />

      {/* MUMBAI INFRASTRUCTURE & CONTACT */}
      <MumbaiStudioContact onNavigateToDashboard={onNavigateToDashboard} />

      {/* FOOTER */}
      <footer className="py-16 border-t border-neutral-900 px-6 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo & Info column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center text-black font-extrabold text-base shadow-md">
                F
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-white tracking-tight uppercase">
                  FILMFLUENCER <span className="text-red-500 text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 font-bold ml-1">MUMBAI</span>
                </h4>
                <p className="text-[10px] text-neutral-400 font-mono tracking-wider">FOUNDER &amp; MENTOR: HEMANT NILIM DAS</p>
              </div>
            </div>
            
            <p className="text-xs text-neutral-500 leading-relaxed max-w-md">
              The premier physical film school and live-action set incubator based in Andheri (West), Mumbai. Empowering filmmakers to direct features, command active production sets, and obtain validated IMDB credits.
            </p>
          </div>

          {/* Contact coordinates column */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
              STUDIO CONNECT
            </span>
            <div className="space-y-1 text-xs text-neutral-400 font-sans">
              <p>📍 Andheri (West) Studio Link Road, Mumbai</p>
              <p>📞 Admission Desk: +91 91522 75588</p>
              <p>✉️ Desk: admissions@filmfluencers.com</p>
            </div>
          </div>

          {/* Quick links column */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
              DEEPLINKS
            </span>
            <div className="flex flex-col gap-2 text-xs font-mono text-neutral-500">
              <button onClick={() => onNavigateToDashboard("lessons")} className="text-left hover:text-amber-400 transition-colors">STUDENT HUB</button>
              <button onClick={() => onNavigateToDashboard("student-profile")} className="text-left hover:text-amber-400 transition-colors">Student Profile Portal</button>
              <button onClick={() => onNavigateToDashboard("enquiries")} className="text-left hover:text-amber-400 transition-colors">Admin Leads Database [Admin Only]</button>
              <a href="#footnotes" className="text-left hover:text-amber-400 transition-colors font-bold text-neutral-400">View Button Footnotes &uarr;</a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <div>
            &copy; 2026 Filmfluencer Inc. Under theatrical direction of Hemant Nilim Das. All Rights Reserved.
          </div>
          <div className="flex gap-1 items-center">
            Designed for screenwriters with <Heart className="w-3.5 h-3.5 text-red-500 fill-current ml-1" />
          </div>
        </div>
      </footer>

      {/* FLOAT WHATSAPP ADMISSION COUNSELLOR COLLATERALS */}
      <WhatsAppWidget />

      <EnquiryPopup onSubmitEnquiry={onSubmitEnquiry} />

      <ScrollToTop />

      {/* IMMERSIVE STREAMING MODAL IF PLAYING ASSET */}
      {globalPlayVideoId && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn" id="global-video-modal">
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal header bar */}
            <div className="p-4 border-b border-neutral-900 flex justify-between items-center bg-black/60">
              <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
                🔴 STREAMING PREVIEW • FFA WORK GALLERY
              </span>
              <button 
                onClick={() => setGlobalPlayVideoId(null)}
                className="p-2 rounded-lg bg-[#141416] border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embedded video player */}
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${globalPlayVideoId}?autoplay=1&rel=0`}
                title="Cinematic Asset Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-neutral-950 text-center border-t border-neutral-900">
              <p className="text-xs text-neutral-400 font-mono">
                Authorized for prospective candidates. Uncut video assets are legally owned and copyrighted by Filmfluencer Academy.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
