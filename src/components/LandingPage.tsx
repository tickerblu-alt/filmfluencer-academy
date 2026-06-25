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
  ArrowUp,
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
  X,
  Volume2,
  VolumeX,
  Globe,
  Image as ImageIcon,
  Headphones
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
import StudentInterviewPortal from "./StudentInterviewPortal";
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
  onNavigateToDashboard?: (initialTab?: string) => void;
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
  // Multi-Language & Branding Upgrade states
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [academyLogoUrl, setAcademyLogoUrl] = useState<string>("");
  const [showAudioModal, setShowAudioModal] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioIndex, setAudioIndex] = useState<number>(0);
  const [isVoiceMuted, setIsVoiceMuted] = useState<boolean>(false);

  // Translation Dictionary
  const translations: Record<string, Record<string, string>> = {
    en: {
      heroTitle: "Don't study cinema.",
      heroSubtitle: "Make it. Own it. Sell it.",
      takeAdmission: "🎓 TAKE ADMISSION",
      secureYourFuture: "You can't reserve your seat by paying a fee.",
      reserveYourSeat: "First you have to EARN your SEAT.",
      understudy: "Mastery Under Hemant Nilim Das",
      enquirySuccess: "Enquiry Registered Successfully",
      submitChallenge: "Submit Artistic Challenge",
      refundableSeat: "Pay your refundable seat booking advance",
      applyTitle: "Challenge the Selection Process",
      applySubtitle: "Standard schools check certificates. Filmfluencer Academy checks your artistic capacity.",
    },
    hi: {
      heroTitle: "सिनेमा का अध्ययन न करें।",
      heroSubtitle: "इसे बनाएं। इसके मालिक बनें। इसे बेचें।",
      takeAdmission: "🎓 प्रवेश लें",
      secureYourFuture: "आप शुल्क देकर अपनी सीट सुरक्षित नहीं कर सकते।",
      reserveYourSeat: "पहले आपको अपनी सीट कमानी होगी।",
      understudy: "हेमंत नीलिम दास के मार्गदर्शन में महारत",
      enquirySuccess: "पूछताछ सफलतापूर्वक दर्ज की गई",
      submitChallenge: "कलात्मक चुनौती सबमिट करें",
      refundableSeat: "अपनी वापसी योग्य सीट बुकिंग अग्रिम राशि का भुगतान करें",
      applyTitle: "चयन प्रक्रिया को चुनौती दें",
      applySubtitle: "सामान्य स्कूल प्रमाण पत्र जांचते हैं। फिल्मफ्लुएंसर एकेडमी आपकी कलात्मक क्षमता को परखती है।",
    },
    mr: {
      heroTitle: "चित्रपटाचा अभ्यास करू नका.",
      heroSubtitle: "तो बनवा. त्याचे मालक व्हा. तो विका.",
      takeAdmission: "🎓 प्रवेश घ्या",
      secureYourFuture: "तुम्ही फी भरून तुमची जागा आरक्षित करू शकत नाही.",
      reserveYourSeat: "प्रथम तुम्हाला तुमची जागा मिळवावी लागेल.",
      understudy: "हेमंत नीलिम दास यांच्या मार्गदर्शनाखाली प्रभुत्व",
      enquirySuccess: "चौकशी यशस्वीरित्या नोंदवली गेली",
      submitChallenge: "कलात्मक आव्हान सादर करा",
      refundableSeat: "तुमची परत करण्यायोग्य सीट बुकिंग रक्कम भरा",
      applyTitle: "निवड प्रक्रियेला आव्हान द्या",
      applySubtitle: "सामान्य शाळा प्रमाणपत्रे तपासतात. फिल्मफ्लुएंसर अकॅडमी तुमची कलात्मक क्षमता तपासते.",
    },
    ta: {
      heroTitle: "சினிமா படிக்காதீங்க.",
      heroSubtitle: "உருவாக்குங்க. சொந்தமாக்குங்க. விற்பனை செய்யுங்க.",
      takeAdmission: "🎓 சேர்க்கை பெறுக",
      secureYourFuture: "கட்டணம் செலுத்தி உங்கள் இருக்கையை முன்பதிவு செய்ய முடியாது.",
      reserveYourSeat: "முதலில் நீங்கள் உங்கள் இருக்கையை சம்பாதிக்க வேண்டும்.",
      understudy: "ஹேமந்த் நிலிம் தாஸின் கீழ் தேர்ச்சி",
      enquirySuccess: "விசாரணை வெற்றிகரமாக பதிவு செய்யப்பட்டது",
      submitChallenge: "கலைநயமிக்க சவாலை சமர்ப்பிக்கவும்",
      refundableSeat: "திரும்பப் பெறக்கூடிய இருக்கை முன்பதிவு தொகையை செலுத்தவும்",
      applyTitle: "தேர்வு செயல்முறைக்கு சவால் விடுங்கள்",
      applySubtitle: "சாதாரண பள்ளிகள் சான்றிதழ்களை சரிபார்க்கின்றன. ஃபிலிம்ப்ளூயன்சர் அகாடமி உங்கள் கலை திறனை சோதிக்கிறது.",
    },
    te: {
      heroTitle: "సినిమా చదవకండి.",
      heroSubtitle: "దాన్ని నిర్మించండి. దానికి యజమాని అవ్వండి. దాన్ని అమ్మండి.",
      takeAdmission: "🎓 అడ్మిషన్ తీసుకోండి",
      secureYourFuture: "మీరు ఫీజు చెల్లించి సీటును రిజర్వ్ చేసుకోలేరు.",
      reserveYourSeat: "మొదట మీరు మీ సీటును సంపాదించుకోవాలి.",
      understudy: "హేమంత్ నీలిమ్ దాస్ పర్యవేక్షణలో ప్రావీణ్యం",
      enquirySuccess: "విచారణ విజయవంతంగా నమోదు చేయబడింది",
      submitChallenge: "కళాత్మక సవాలును సమర్పించండి",
      refundableSeat: "మీ తిరుగు చెల్లించదగిన సీట్ బుకింగ్ అడ్వాన్స్ చెల్లించండి",
      applyTitle: "ఎంపిక ప్రక్రియను సవాలు చేయండి",
      applySubtitle: "సాధారణ పాఠశాలలు ధృవీకరణ పత్రాలను తనిఖీ చేస్తాయి. ఫిల్మ్‌ఫ్లూయెన్サー అకాడమీ మీ కళాత్మక సామర్థ్యాన్ని తనిఖీ చేస్తుంది.",
    }
  };

  const currentT = translations[selectedLanguage] || translations.en;

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
      question: "Q: Is the ₹20,000 reservation seat fee fully refundable?",
      answer: "A: Yes. If you do not clear the selection interview, your deposit is refunded, minus only government GST, payment gateway charges, and a minimal interview evaluation charge. To ensure you still win, that small deducted amount automatically unlocks our Instant Value Compensation Pack (Worth ₹15,000+) sent straight to your inbox. If you are selected, this entire deposit is credited directly toward your tuition."
    },
    {
      question: "Q: What professional credentials, company registration, and IMDb credits will I graduate with?",
      answer: "A: You will graduate as the Managing Director of your own legally registered Private Limited studio enterprise. Additionally, you will earn official IMDb director/crew credits from the real commercial feature film produced during the course, alongside a global professional directorship certification from the academy."
    },
    {
      question: "Q: Does the program provide flexible monthly EMI structures?",
      answer: "A: Yes. We partner with leading financial institutions to offer flexible, no-cost and low-cost EMI options. This allows you to split the remaining tuition balance into affordable monthly installments. Detailed tenure options will be shared with you by the admissions panel upon clearing your selection interview."
    },
    {
      question: "Q: Where do the physical film shoots and blocking masterclasses take place?",
      answer: "A: All practical learning, actor blocking workshops, and high-stakes feature film shoots take place on professional, live movie sets and soundstages. Exact studio locations and shooting schedules will be provided in your onboarding kit prior to the commencement of the practical sessions."
    },
    {
      question: "Q: Do I require a background film degree or personal equipment to join?",
      answer: "A: No. You do not need any prior filmmaking degrees or personal camera gear. We provide complete access to industry-standard RED/ARRI camera packages, professional lighting grids, and union crew infrastructure. We look for creative vision, drive, and dedication during your selection interview, not textbook credentials."
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

  // Hindi Audio Speech Synthesis and timer progression
  useEffect(() => {
    let timer: any;
    if (showAudioModal && isAudioPlaying) {
      const dialogueText = [
        "नमस्ते! फिल्मफ्लुएंसर एकेडमी में आपका स्वागत है। क्या आप एक सफल फिल्म निर्माता बनना चाहते हैं?",
        "यहाँ हम थ्योरी नहीं सिखाते। आप सीधे सेट पर आकर हमारी अपनी फीचर फिल्म को को-डायरेक्ट करेंगे!",
        "लेकिन ध्यान रहे, आप सिर्फ फीस देकर सीट नहीं पा सकते। पहले आपको इंटरव्यू पास करना होगा और अपनी कला साबित करनी होगी।",
        "क्या आप तैयार हैं भारतीय सिनेमा के भविष्य को बदलने के लिए? अपना आर्टिस्टिक चैलेंज अभी शुरू करें!"
      ];

      const currentText = dialogueText[audioIndex];

      if (!isVoiceMuted && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentText);
        utterance.lang = "hi-IN";
        utterance.rate = 0.85;
        utterance.onend = () => {
          timer = setTimeout(() => {
            setAudioIndex((prev) => (prev + 1) % dialogueText.length);
          }, 1800);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        // Fallback timer if speech is muted or unsupported
        timer = setTimeout(() => {
          setAudioIndex((prev) => (prev + 1) % dialogueText.length);
        }, 5500);
      }
    }
    return () => {
      clearTimeout(timer);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [showAudioModal, isAudioPlaying, audioIndex, isVoiceMuted]);

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
      <header className="sticky top-0 z-40 bg-[#0b0b0ca0] backdrop-blur-md border-b border-neutral-900/60 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer relative block group" title="Click to Upgrade Academy Logo">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setAcademyLogoUrl(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {academyLogoUrl ? (
                <img 
                  src={academyLogoUrl} 
                  alt="Academy Logo" 
                  className="w-10 h-10 rounded-lg object-cover border border-amber-500/40 shadow-lg shadow-amber-500/10 hover:scale-105 transition-transform" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-amber-500/10 font-display hover:scale-105 transition-transform">
                  F
                </div>
              )}
              <div className="absolute -inset-1 rounded-lg border border-dashed border-amber-400/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </label>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold font-display tracking-tight text-white flex items-center gap-1">
                  FILMFLUENCER <span className="text-amber-400 text-xs px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">ACADEMY</span>
                </h1>
                <label className="cursor-pointer text-[10px] bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white px-2 py-0.5 rounded font-mono hover:border-amber-500/30 transition-all select-none">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setAcademyLogoUrl(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  Upgrade Logo 🖼️
                </label>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">{currentT.understudy}</p>
            </div>
          </div>
        </div>
        
        {/* Nav Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-bold font-mono uppercase tracking-wider text-neutral-300">
          <a href="#portfolio" className="hover:text-amber-400 transition-colors">FOUNDING MENTOR</a>
          <a href="#muvireel" className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Muvireel Net
          </a>
          <a href="#curriculum" className="hover:text-amber-400 transition-colors">Curriculum</a>
          <a href="#artistic-challenge" className="hover:text-amber-400 transition-colors text-amber-500">apply for admission</a>
          <a href="#CourseFee" className="hover:text-amber-400 transition-colors">CourseFee</a>
        </nav>

        {/* Localisation, Audio, & CTA Panel */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* AUDIO conversation in Hindi */}
          <button
            onClick={() => {
              setShowAudioModal(true);
              setIsAudioPlaying(true);
              setAudioIndex(0);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 text-xs font-mono font-bold transition-all cursor-pointer animate-pulse shrink-0"
            title="Listen to simulated admissions audio conversation in Hindi"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Audio (हिन्दी)</span>
          </button>

          {/* Multiple Languages Dropdown Switcher Button */}
          <div className="relative group shrink-0">
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase">{selectedLanguage}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            
            {/* Dropdown content */}
            <div className="absolute right-0 top-full mt-2 w-44 bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl p-1 z-50 hidden group-hover:block hover:block">
              <p className="text-[9px] font-mono text-neutral-500 p-2 border-b border-neutral-900 uppercase">Select Language</p>
              {[
                { code: "en", name: "English (US)" },
                { code: "hi", name: "Hindi (हिंदी)" },
                { code: "mr", name: "Marathi (मराठी)" },
                { code: "ta", name: "Tamil (தமிழ்)" },
                { code: "te", name: "Telugu (తెలుగు)" }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                    selectedLanguage === lang.code 
                      ? "bg-amber-500/10 text-amber-400 font-bold" 
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  <span>{lang.name}</span>
                  {selectedLanguage === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </button>
              ))}
            </div>
          </div>

          <a 
            href="#CourseFee"
            className="text-xs font-bold font-mono px-4 py-2 rounded bg-amber-500 text-black hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/15 cursor-pointer shrink-0"
          >
            {currentT.takeAdmission}
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-6 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="absolute inset-0 bg-radial-at-t from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-amber-400 mb-6 font-mono">
            <Sparkles className="w-3.5 h-3.5" /> with the Spirit of underpromising &amp; Overdelivering
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.1] text-white tracking-tight mb-6">
            {currentT.heroTitle}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              {currentT.heroSubtitle}
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
              The future belongs to filmmakers who own their audience. FilmFluencer Academy (FFA) is India's premier high-production accelerator teaching modern Scripting, Pro-industry Direction , professional Cinematography cum Editing, hyper-social-brand-crafting and short&amp;long form theatrical distribution on our groundbreaking upcoming network: <strong className="text-amber-400">MUVIREEL</strong>.
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
                <p className="text-sm font-semibold text-white">Limit: 25 Students Max</p>
              </div>
            </div>
          </div>

          {/* Dynamic Seat Indicator bar */}
          <div className="max-w-md mx-auto bg-neutral-900 border border-neutral-800 p-4 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Admission filling fast
              </span>
              <span className="text-xs font-bold text-red-400">6 out of 25 seats Taken</span>
            </div>
            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full" style={{ width: "24%" }}></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onTriggerPayment(20000, "Filmfluencer Seed Seat Booking")}
              className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 text-base cursor-pointer font-display"
            >
              Reserve Seat for ₹20,000 <ArrowRight className="w-5 h-5" />
            </button>
            
            <a 
              id="know-process-button"
              href="#enroll"
              className="w-full sm:w-auto px-8 py-4 rounded-lg border border-neutral-800 bg-[#141416] text-white hover:border-neutral-700 hover:bg-[#1a1a1d] font-medium transition-all flex items-center justify-center gap-2 text-base cursor-pointer text-center scroll-mt-20"
            >
              Know the process of being a branded filmmaker <Play className="w-4 h-4 text-amber-400 fill-current" />
            </a>
          </div>
          
          <p className="text-xs text-neutral-500 mt-4 font-mono">
            Balance ₹3,80,000 payable upon launch · Fully refundable if cohort launch is cancelled
          </p>

          {/* Place 1: Cult Admissions Button decorated with elegance box and an arrow of hope above */}
          <div className="mt-12 flex flex-col items-center gap-2.5">
            <div className="flex flex-col items-center animate-bounce duration-[2500ms]">
              <span className="text-[9px] text-amber-500/80 font-mono tracking-[0.2em] uppercase mb-1">THE ARROW OF HOPE</span>
              <ArrowUp className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <div className="w-[1px] h-3 bg-gradient-to-t from-amber-500/50 to-transparent mt-0.5" />
            </div>
            <a 
              href="https://wa.me/919004221717?text=I%20want%20to%20Apply%20for%20Admission%20%26%20Reserve%20Seat%20at%20Filmfluencer%20Academy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 px-7 py-3.5 border-2 border-amber-500/30 hover:border-amber-400 rounded-xl bg-neutral-950/80 text-neutral-300 hover:text-white transition-all duration-500 font-mono uppercase text-[11px] tracking-[0.25em] relative group overflow-hidden hover:shadow-[0_0_35px_rgba(245,158,11,0.15)] hover:scale-105"
            >
              <div className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent top-0" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-bold tracking-[0.22em] text-amber-400 group-hover:text-amber-300">Apply for Admission &amp; Reserve Seat</span>
            </a>
          </div>
        </div>
      </section>

      <FilmIndustryRedirected />

      <MuvireelDistribution />

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

      {/* COMPARATIVE GRID */}
      <section id="CourseFee" className="py-20 px-6 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-3xl font-bold font-display text-white mb-4">Compare Your Alternatives</h3>
          <p className="text-neutral-200 mt-3 text-lg md:text-xl font-extrabold font-sans tracking-tight max-w-xl mx-auto">
            Why serious creators choose Filmfluencer Academy over legacy theory schools.
          </p>
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

        {/* Place 4: Cult Admissions Button decorated with elegance box and an arrow of hope above */}
        <div className="mt-16 flex flex-col items-center gap-2.5">
          <div className="flex flex-col items-center animate-bounce duration-[2500ms]">
            <span className="text-[9px] text-amber-500/80 font-mono tracking-[0.2em] uppercase mb-1">THE ARROW OF HOPE</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <div className="w-[1px] h-3 bg-gradient-to-t from-amber-500/50 to-transparent mt-0.5" />
          </div>
          <a 
            href="https://wa.me/919004221717?text=I%20want%20to%20Apply%20for%20Admission%20%26%20Reserve%20Seat%20at%20Filmfluencer%20Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3.5 px-7 py-3.5 border-2 border-amber-500/30 hover:border-amber-400 rounded-xl bg-neutral-950/80 text-neutral-300 hover:text-white transition-all duration-500 font-mono uppercase text-[11px] tracking-[0.25em] relative group overflow-hidden hover:shadow-[0_0_35px_rgba(245,158,11,0.15)] hover:scale-105"
          >
            <div className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent top-0" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold tracking-[0.22em] text-amber-400 group-hover:text-amber-300">Apply for Admission &amp; Reserve Seat</span>
          </a>
        </div>
      </section>

      <section id="artistic-challenge" className="px-6 max-w-2xl mx-auto pb-20">
        <StudentInterviewPortal onAddEnquiry={onSubmitEnquiry} />
      </section>

      {/* ENQUIRY & RESERVATION SECTION */}
      <section id="enroll" className="py-20 px-6 max-w-7xl mx-auto bg-gradient-to-t from-[#0e0e0f] to-transparent rounded-3xl border border-neutral-900 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Reservation column */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-[0.2em] mb-4 block border-b border-neutral-900 pb-3">
                ADMISSION & SELECTION PROCeDuRE FOR FFA 1 YEAR FILMFLUENCER CERTIFICATE COURSE
              </h2>
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest block mb-2">{currentT.secureYourFuture}</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">{currentT.reserveYourSeat}</h3>
              
              <div className="mt-6 space-y-6 bg-black/40 border border-neutral-900 rounded-2xl p-5 text-sm leading-relaxed text-neutral-300">
                {/* Visual ASCII Flow Chart */}
                <div className="bg-black/60 p-4 rounded-xl border border-neutral-850 font-mono text-[10px] text-amber-400 leading-normal overflow-x-auto whitespace-pre">
{`The Application & Admission Process
[ Step 1: Reserve ] ──► [ Step 2: Interview ] ──► [ Step 3: Allotment / Refund ]
   Pay ₹20,000/-           Formal Screening          Confirm Seat OR Get 
   Secure Deposit          with Panel                Refund + ₹15k Value Pack`}
                </div>

                <div className="space-y-4 font-sans">
                  {/* Step 1 */}
                  <div className="border-l-2 border-amber-500/30 pl-4 py-0.5">
                    <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-[10px] font-mono">01</span>
                      Step 1: Secure Your Interview Slot (INR 20,000/-)
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      Lock your entry into the evaluation pool by making your refundable deposit via our secure payment gateway.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="border-l-2 border-amber-500/30 pl-4 py-0.5">
                    <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-[10px] font-mono">02</span>
                      Step 2: The Selection Interview
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      Attend a formal screening interview to assess your creative vision and compatibility with the 2026 feature film production standard.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="border-l-2 border-amber-500/30 pl-4 py-0.5">
                    <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-[10px] font-mono">03</span>
                      Step 3: Final Allotment &amp; No-Risk Guarantee
                    </h4>
                    <div className="text-xs space-y-2 mt-2">
                      <p className="text-emerald-400/95 font-medium">
                        <strong>If Selected:</strong> Your entire deposit is credited toward your tuition, locking your seat on the live feature film set.
                      </p>
                      <p className="text-neutral-400">
                        <strong>If Not Selected:</strong> Your deposit is refunded, minus only government GST, payment gateway charges, and a minimal interview evaluation charge.
                      </p>
                      <div className="mt-3 p-3 bg-neutral-900/60 rounded-lg border border-neutral-800/80">
                        <p className="text-xs text-neutral-300 font-semibold mb-2 text-amber-400">
                          To ensure you still win, that small deducted processing amount automatically unlocks our Instant Value Compensation Pack (Worth ₹15,000+) sent straight to your inbox:
                        </p>
                        <ul className="space-y-1.5 text-[11px] text-neutral-400">
                          <li className="flex items-start gap-2">
                            <span>🎬</span>
                            <span><strong>Masterclass Vault:</strong> Lifetime access to pre-recorded filmmaking masterclasses by Hemant Nilim Das.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>📜</span>
                            <span><strong>Evaluation Certificate:</strong> A verifiable digital certificate for clearing our portfolio review process.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>📂</span>
                            <span><strong>Director’s Toolkit:</strong> Production-ready script breakdowns, shot-list templates, and industry lookbooks.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span>💼</span>
                            <span><strong>2026 OTT Pitch Deck:</strong> The exact blueprint used to package and sell films to global streaming platforms.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    Pay your refundable seat booking advance <ArrowRight className="w-4 h-4" />
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
                  <h4 className="text-base font-bold text-white">Administrative Helpdesk FAQ</h4>
                  <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">Get instant answers to your enrollment questions.</p>
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

              <div className="mt-5 p-3.5 bg-neutral-900/60 border border-neutral-800 rounded-xl flex items-start gap-2.5 text-xs text-neutral-300">
                <span className="text-base shrink-0">💬</span>
                <p>
                  Still have questions?{" "}
                  <a 
                    href="https://wa.me/919004221717?text=I%20have%20questions%20about%20the%20Filmfluencer%20Academy%20Enrollment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    Chat with our Admissions Helpdesk on WhatsApp
                  </a>{" "}
                  for instant, 24/7 support.
                </p>
              </div>
            </div>

            <h4 className="text-lg font-bold text-white mb-2">Still Have Doubts? Know the process of being a branded filmmaker</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Got specific doubts or personal screenplay ambitions for the director? Submit your info below and our directorship coordinator will reach out within 2 hours.
            </p>

            {enquirySuccess ? (
              <div className="p-6 bg-emerald-900/10 border border-emerald-500/30 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h5 className="text-base font-bold text-white">Enquiry Logged Successfully!</h5>
                <p className="text-xs text-emerald-300 leading-relaxed">
                  An academic coordinator will call or WhatsApp you directly at the phone number provided to finalize your admissions eligibility.
                </p>
                <button
                  onClick={() => setEnquirySuccess(false)}
                  className="mt-4 px-4 py-2 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-semibold rounded font-mono cursor-pointer transition-all"
                >
                  Submit Another Enquiry &rarr;
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
              <a href="#curriculum" className="text-left hover:text-amber-400 transition-colors">Syllabus &amp; Curriculum</a>
              <a href="#CourseFee" className="text-left hover:text-amber-400 transition-colors">Seat Reservation CourseFee</a>
              <a href="#enroll" className="text-left hover:text-amber-400 transition-colors">Admissions Callback Form</a>
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

      {/* HINDI AUDIO CONVERSATION BRIEFING CENTER MODAL */}
      {showAudioModal && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn" id="hindi-audio-modal">
          <div className="relative w-full max-w-2xl bg-[#0d0d0e] border border-red-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-red-500/5">
            {/* Modal header bar */}
            <div className="p-5 border-b border-neutral-900 flex justify-between items-center bg-gradient-to-r from-red-950/20 to-neutral-950">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <div>
                  <h4 className="text-sm font-bold font-display text-white tracking-wide uppercase">
                    Interactive Hindi Audio Briefing
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-mono">काउंसलिंग और मेंटरशिप बातचीत (हिन्दी)</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowAudioModal(false);
                  setIsAudioPlaying(false);
                  if ("speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className="p-2 rounded-lg bg-[#141416] border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal main content area */}
            <div className="p-6 space-y-6">
              
              {/* Pulsating Waveform Audio Visualizer */}
              <div className="bg-black/60 border border-neutral-900 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4">
                <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
                  {isAudioPlaying ? "📡 Live Audio Synthesis Streaming" : "⏸️ Synthesis Stream Paused"}
                </p>
                
                <div className="flex items-end justify-center gap-1.5 h-14">
                  {[12, 24, 16, 32, 20, 36, 14, 28, 42, 22, 30, 18, 34, 16, 24].map((height, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 rounded-full bg-gradient-to-t from-red-600 to-amber-500 transition-all duration-300"
                      style={{ 
                        height: isAudioPlaying ? `${Math.sin((audioIndex * 2) + i) * 15 + height}px` : "6px",
                        opacity: isAudioPlaying ? 1 : 0.4
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    className="px-5 py-2 rounded-xl bg-amber-500 text-black text-xs font-mono font-extrabold hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    {isAudioPlaying ? "⏸️ PAUSE BRIEFING" : "▶️ PLAY BRIEFING"}
                  </button>

                  <button
                    onClick={() => {
                      setIsVoiceMuted(!isVoiceMuted);
                      if ("speechSynthesis" in window) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
                    title={isVoiceMuted ? "Unmute Native Hindi Voice" : "Mute Native Hindi Voice (Keep Subtitles)"}
                  >
                    {isVoiceMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => {
                      setAudioIndex((prev) => (prev + 1) % 4);
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-mono transition-all cursor-pointer"
                  >
                    ⏭️ Skip Sentence
                  </button>
                </div>
              </div>

              {/* Speech Conversation Container */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                {[
                  {
                    speaker: "काउंसलर (Counselor)",
                    hindi: "नमस्ते! फिल्मफ्लुएंसर एकेडमी में आपका स्वागत है। क्या आप एक सफल फिल्म निर्माता बनना चाहते हैं?",
                    english: "Namaste! Welcome to Filmfluencer Academy. Do you want to become a successful filmmaker?"
                  },
                  {
                    speaker: "मेंटर हेमंत (Mentor Hemant)",
                    hindi: "यहाँ हम थ्योरी नहीं सिखाते। आप सीधे सेट पर आकर हमारी अपनी फीचर फिल्म को को-डायरेक्ट करेंगे!",
                    english: "We don't teach theory here. You will co-direct our theatrical feature film live on set!"
                  },
                  {
                    speaker: "काउंसलर (Counselor)",
                    hindi: "लेकिन ध्यान रहे, आप सिर्फ फीस देकर सीट नहीं पा सकते। पहले आपको इंटरव्यू पास करना होगा और अपनी कला साबित करनी होगी।",
                    english: "But remember, you cannot secure a seat just by paying. You must pass the interview and prove your art."
                  },
                  {
                    speaker: "मेंटर हेमंत (Mentor Hemant)",
                    hindi: "क्या आप तैयार हैं भारतीय सिनेमा के भविष्य को बदलने के लिए? अपना आर्टिस्टिक चैलेंज अभी शुरू करें!",
                    english: "Are you ready to transform the future of Indian cinema? Start your Artistic Challenge now!"
                  }
                ].map((dial, idx) => {
                  const isActive = idx === audioIndex;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setAudioIndex(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isActive 
                          ? "bg-red-950/20 border-red-500/40 shadow-md shadow-red-500/5 translate-x-1" 
                          : "bg-neutral-900/40 border-neutral-800/60 hover:bg-neutral-900/60 opacity-60 hover:opacity-90"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isActive ? "text-amber-400" : "text-neutral-500"}`}>
                          {dial.speaker}
                        </span>
                        {isActive && (
                          <span className="text-[9px] font-mono bg-red-900/30 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded">
                            🎙️ SPEAKING
                          </span>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${isActive ? "text-white font-semibold" : "text-neutral-300"}`}>
                        {dial.hindi}
                      </p>
                      <p className="text-xs text-neutral-400 italic mt-1 font-sans">
                        {dial.english}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Instructions disclaimer */}
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl text-center">
                <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                  💡 <strong>Voice Tip:</strong> Ensure your device volume is turned up. This portal utilizes premium <strong>Web Speech TTS</strong> to simulate realistic spoken mentorship in native Hindi.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
