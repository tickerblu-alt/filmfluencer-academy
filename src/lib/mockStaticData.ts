import { PortfolioData, Course, Profile, Enquiry, Payment, Subscription } from "../types";

export const DEFAULT_PORTFOLIO: PortfolioData = {
  name: "Hemant Nilim Das",
  title: "Award-Winning Filmmaker & ScreenCraft Director",
  bio: "Hemant Nilim Das is an acclaimed film director and screenwriter, renowned for winning 'Best Director' at the Los Angeles World International Film Festival. He directed seminal Indian actors including Tisca Chopra, Vijay Raaz, Zareen Khan, Raghubir Yadav, Madhur Mittal, and Madhurima Tuli. An exponent of hyper-efficient production, he pioneered India's first single-take uncut feature film across forty unique locations, proving that pure storytelling exceeds inflated budgets.",
  awards: [
    { title: "Best Director", organization: "LA World International Film Festival", year: "2015", project: "Pocket Gangsters" },
    { title: "Official Golden Selection", organization: "Cinema London Festival", year: "2016", project: "Pocket Gangsters" },
    { title: "Award of Cinematic Merit", organization: "Malta International Film Festival", year: "2016", project: "Pocket Gangsters" },
    { title: "Best Screenwriting", organization: "Bioscope International Film Festival", year: "2017", project: "Feature Narrative" },
    { title: "Directorial Excellence Medal", organization: "Ministry of Cultural Affairs", year: "2018", project: "State Cinema Honour" }
  ],
  directedStars: [
    { name: "Tisca Chopra", role: "Protagonist / Leading Actress", project: "Independent Dramatic Narrative" },
    { name: "Vijay Raaz", role: "Lead Hostage Taker", project: "Pocket Gangsters" },
    { name: "Zareen Khan", role: "Celebrity Cameo & Directorial Advisory", project: "Brand Campaign Portfolios" },
    { name: "Raghubir Yadav", role: "Ensemble Supporting Actor", project: "Social Dramedy Special" },
    { name: "Madhur Mittal", role: "Antagonist Lead (Slumdog Millionaire Fame)", project: "Pocket Gangsters" },
    { name: "Madhurima Tuli", role: "Lead Heroine", project: "Pocket Gangsters" }
  ],
  filmography: [
    {
      title: "Pocket Gangsters (Feature Film)",
      year: "2015",
      highlight: "India's first one-take uncut film across 40 locations",
      leadCast: "Vijay Raaz, Madhur Mittal, Madhurima Tuli",
      youtubeId: "vBq72eF_u1A",
      description: "A highly acclaimed high-octane hostage thriller filmed in a single, continuous, sweeping camera movement that showcases unmatched blocking, tracking, and actor rehearsals."
    },
    {
      title: "Brahmaputra Hunters (Upcoming Feature Film)",
      year: "2026",
      highlight: "Guerrilla-warfare action feature production",
      leadCast: "Student ADs & Regional Talents",
      youtubeId: "dQw4w9WgXcQ",
      description: "An intensive guerrilla action-drama filmed alongside Filmfluencer Academy cohorts. Students act, assist, and claim IMDB credits directly on set."
    }
  ],
  brandWork: [
    { client: "Tata Motors Commercials", campaign: "Harrier Bold Launch", year: "2023" },
    { client: "Kotak Life Assurance", campaign: "True Protection Campaign", year: "2024" },
    { client: "Lamborghini Mumbai Launch", campaign: "Urus S Luxury Spot", year: "2025" },
    { client: "Accenture Digital India", campaign: "Future of Enterprise Films", year: "2025" }
  ]
};

export const DEFAULT_COURSES: Course[] = [
  {
    id: "course_1",
    title: "Guerrilla Film Directing & Blocking",
    description: "Master the art of shooting premier cinematic content under extreme resource constraints with Hemant Nilim Das.",
    lessons: [
      {
        id: "lesson_1_1",
        title: "Introduction to Guerrilla Cinematic Design",
        duration: "18 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        summary: "Learn how to scout locations, define camera angles, and build a cohesive visual style without expensive studio lighting or big crews."
      },
      {
        id: "lesson_1_2",
        title: "Actor Staging and Multi-Location Blocking",
        duration: "24 mins",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
        summary: "Analyzing complex scene movements so that actors stay in focus and on mark in dynamic settings."
      },
      {
        id: "lesson_1_3",
        title: "One-Take Cinematic Masterclass (Pocket Gangsters Case Study)",
        duration: "32 mins",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        summary: "A deep dive into how we coordinated 40 distinct locations in a single unbroken take. Syncing audio, camera operators, and actors in absolute perfect harmony."
      },
      {
        id: "lesson_1_4",
        title: "Directing A-List Stars vs First-Time Actors",
        duration: "15 mins",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
        summary: "Psychological principles for guiding talent to deliver organic, raw emotional truth on screen."
      }
    ]
  },
  {
    id: "course_2",
    title: "AI-Powered Pre-Production & Casting",
    description: "Use cutting-edge Al generators to create industry-grade screenplay drafts, script edits, and high-fidelity pitch decks.",
    lessons: [
      {
        id: "lesson_2_1",
        title: "Pre-Production Pipeline in the Era of AI",
        duration: "14 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        summary: "How modern Indian production companies integrate AI to speed up shot-lists, scripts, and production budget sheets."
      },
      {
        id: "lesson_2_2",
        title: "Generating Visual Storyboards and Screenplays",
        duration: "21 mins",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        summary: "Using tools to map scripts into comprehensive, gorgeous layout storyboards that win investor trust easily."
      },
      {
        id: "lesson_2_3",
        title: "Structuring and Pitching to OTT Streaming Platforms",
        duration: "20 mins",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
        summary: "The direct commercial checklist to pitch shows successfully to directors and content executives at Netflix, Disney+ Hotstar, and JioCinema."
      }
    ]
  },
  {
    id: "course_3",
    title: "Establishing Your Production Business Banner",
    description: "Learn how to set up your corporate film company, earn verified IMDB credits, and invoice clients professionally.",
    lessons: [
      {
        id: "lesson_3_1",
        title: "Legally Incorporating Your Production Banner",
        duration: "16 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        summary: "A step-by-step corporate guide to registering your independent movie production banner in India to accept payments and handle VAT/GST tags easily."
      },
      {
        id: "lesson_3_2",
        title: "Securing Verified IMDB Credits & Creative Contracts",
        duration: "12 mins",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        summary: "How credit registries operate, signing legal contracts with crew, and ensuring your name is officially recorded on IMDB databases."
      },
      {
        id: "lesson_3_3",
        title: "International Film Festivals and Distribution Rights",
        duration: "19 mins",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
        summary: "Navigating submission platforms, film markets (MIPCOM, Cannes Market), and negotiating theatrical vs. digital streaming distribution deals."
      }
    ]
  }
];

export const DEFAULT_PROFILE: Profile = {
  name: "Aarav Sharma",
  email: "tickerblu@gmail.com",
  phone: "+91 98765 43210",
  role: "Aspiring Cinematic Director",
  bio: "Passionate about telling authentic Indian stories using dynamic camera movements and guerrilla cinematography. Eager to master production banner scaling.",
  companyName: "Phoenix Independent Pictures",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
};

export const DEFAULT_ENQUIRIES: Enquiry[] = [
  {
    id: "enq_1",
    name: "Siddharth Malhotra",
    email: "sid.m@example.com",
    phone: "+91 91234 56789",
    purpose: "Enroll",
    message: "I am absolutely blown away by Pocket Gangsters! I want to audit the upcoming October 2026 cohort. Can I get details on the EMI facilities?",
    status: "New",
    createdAt: "2026-06-20T14:32:00Z"
  },
  {
    id: "enq_2",
    name: "Priyanka Sen",
    email: "priyanka.s@cinema.in",
    phone: "+91 98300 12345",
    purpose: "Callback",
    message: "I am a working assistant director in Tollywood. I want to learn Hemant's exact AI planning workflow. Will we get hands-on access to pre-production templates?",
    status: "Contacted",
    createdAt: "2026-06-21T09:15:00Z"
  },
  {
    id: "enq_3",
    name: "Rohan Deol",
    email: "rohandeol@gmail.com",
    phone: "+91 80011 22334",
    purpose: "Question",
    message: "Is the ₹20,000 seat deposit fully refundable if my schedule changes before October? Please send a draft of the refund contract.",
    status: "Resolved",
    createdAt: "2026-06-18T11:45:00Z"
  }
];

export const DEFAULT_PAYMENTS: Payment[] = [
  {
    id: "pay_init",
    amount: 20000,
    purpose: "Filmfluencer Seed Seat Booking",
    status: "Completed",
    method: "Razorpay (UPI)",
    createdAt: "2026-06-22T08:30:00Z"
  }
];

export const DEFAULT_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "sub_1",
    planName: "10-Month Cinema EMI Plan",
    amount: 38000,
    interval: "monthly",
    status: "Active",
    createdAt: "2026-06-22T10:00:00Z",
    nextBillingDate: "2026-07-22T10:00:00Z"
  }
];
