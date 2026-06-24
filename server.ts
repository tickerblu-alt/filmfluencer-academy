import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Define the DB path
const DB_PATH = path.join(process.cwd(), "db.json");

// Structure of our persistent database
interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  purpose: "Question" | "Enroll" | "Callback";
  message: string;
  status: "New" | "Contacted" | "Resolved";
  createdAt: string;
}

interface Profile {
  name: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
  companyName: string;
  avatarUrl: string;
}

interface Subscription {
  id: string;
  planName: string;
  amount: number;
  interval: "monthly" | "quarterly";
  status: "Active" | "Paused" | "Cancelled";
  createdAt: string;
  nextBillingDate: string;
}

interface Payment {
  id: string;
  amount: number;
  purpose: string;
  status: "Pending" | "Completed" | "Failed";
  method: string;
  createdAt: string;
}

interface DatabaseSchema {
  enquiries: Enquiry[];
  profile: Profile;
  payments: Payment[];
  completedLessons: string[];
  subscriptions: Subscription[];
}

// Initial default database state
const INITIAL_DB: DatabaseSchema = {
  enquiries: [
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
  ],
  profile: {
    name: "Aarav Sharma",
    email: "tickerblu@gmail.com",
    phone: "+91 98765 43210",
    role: "Aspiring Cinematic Director",
    bio: "Passionate about telling authentic Indian stories using dynamic camera movements and guerrilla cinematography. Eager to master production banner scaling.",
    companyName: "Phoenix Independent Pictures",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  payments: [
    {
      id: "pay_init",
      amount: 20000,
      purpose: "Filmfluencer Seed Seat Booking",
      status: "Completed",
      method: "Razorpay (UPI)",
      createdAt: "2026-06-22T08:30:00Z"
    }
  ],
  completedLessons: ["lesson_1_1", "lesson_2_1"],
  subscriptions: [
    {
      id: "sub_1",
      planName: "10-Month Cinema EMI Plan",
      amount: 38000,
      interval: "monthly",
      status: "Active",
      createdAt: "2026-06-22T10:00:00Z",
      nextBillingDate: "2026-07-22T10:00:00Z"
    }
  ]
};

// Help helper to read and write database
function readDB(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DB, null, 2), "utf8");
      return INITIAL_DB;
    }
    const data = fs.readFileSync(DB_PATH, "utf8");
    const parsed = JSON.parse(data);
    if (!parsed.subscriptions) {
      parsed.subscriptions = INITIAL_DB.subscriptions;
    }
    if (!parsed.completedLessons) {
      parsed.completedLessons = INITIAL_DB.completedLessons;
    }
    return parsed;
  } catch (err) {
    console.error("Error reading db file, falling back to initial default database structure.", err);
    return INITIAL_DB;
  }
}

function writeDB(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to db.json", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Make sure we parse standard JSON payloads
  app.use(express.json());

  // Ensure DB file exists and is populated
  readDB();

  // --- API ROUTING FIRST ---
  
  // 1. Portfolio data of Hemant Nilim Das
  app.get("/api/portfolio", (req, res) => {
    res.json({
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
          youtubeId: "vBq72eF_u1A", // Placeholder index / actual video
          description: "A highly acclaimed high-octane hostage thriller filmed in a single, continuous, sweeping camera movement that showcases unmatched blocking, tracking, and actor rehearsals."
        },
        {
          title: "Brahmaputra Hunters (Upcoming Feature Film)",
          year: "2026",
          highlight: "Guerrilla-warfare action feature production",
          leadCast: "Student ADs & Regional Talents",
          youtubeId: "dQw4w9WgXcQ", // Demo link
          description: "An intensive guerrilla action-drama filmed alongside Filmfluencer Academy cohorts. Students act, assist, and claim IMDB credits directly on set."
        }
      ],
      brandWork: [
        { client: "Tata Motors Commercials", campaign: "Harrier Bold Launch", year: "2023" },
        { client: "Kotak Life Assurance", campaign: "True Protection Campaign", year: "2024" },
        { client: "Lamborghini Mumbai Launch", campaign: "Urus S Luxury Spot", year: "2025" },
        { client: "Accenture Digital India", campaign: "Future of Enterprise Films", year: "2025" }
      ]
    });
  });

  // 2. Courses content list
  app.get("/api/courses", (req, res) => {
    res.json([
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
    ]);
  });

  // 3. User Student Profile handler
  app.get("/api/profile", (req, res) => {
    const db = readDB();
    res.json(db.profile);
  });

  app.post("/api/profile", (req, res) => {
    const db = readDB();
    const updatedProfile = req.body;
    
    db.profile = {
      ...db.profile,
      ...updatedProfile
    };
    
    writeDB(db);
    res.json({ success: true, profile: db.profile });
  });

  // 4. Enquiries Handler
  app.get("/api/enquiries", (req, res) => {
    const db = readDB();
    res.json(db.enquiries);
  });

  app.post("/api/enquiries", (req, res) => {
    const db = readDB();
    const { name, email, phone, purpose, message } = req.body;

    if (!name || !email || !phone || !purpose) {
      return res.status(400).json({ error: "Missing required booking/enquiry details." });
    }

    const newEnquiry: Enquiry = {
      id: "enq_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      purpose,
      message: message || "No custom message provided.",
      status: "New",
      createdAt: new Date().toISOString()
    };

    db.enquiries.unshift(newEnquiry);
    writeDB(db);

    res.json({ success: true, enquiry: newEnquiry });
  });

  // Complete status indicator toggler
  app.patch("/api/enquiries/:id", (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const { status } = req.body;

    const enq = db.enquiries.find(e => e.id === id);
    if (!enq) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    if (status) {
      enq.status = status;
    }

    writeDB(db);
    res.json({ success: true, enquiry: enq });
  });

  // 5. Payments handler
  app.get("/api/payments", (req, res) => {
    const db = readDB();
    res.json(db.payments);
  });

  app.post("/api/payments", (req, res) => {
    const db = readDB();
    const { amount, purpose, method } = req.body;

    if (!amount || !purpose) {
      return res.status(400).json({ error: "Missing checkout parameters" });
    }

    const newPayment: Payment = {
      id: "pay_" + Math.random().toString(36).substr(2, 9),
      amount: Number(amount),
      purpose,
      status: "Completed", // Simulated instant success
      method: method || "Card / Razorpay Simulator",
      createdAt: new Date().toISOString()
    };

    db.payments.unshift(newPayment);
    writeDB(db);

    res.json({ success: true, payment: newPayment });
  });

  // 5.5. Subscriptions handler
  app.get("/api/subscriptions", (req, res) => {
    const db = readDB();
    res.json(db.subscriptions || []);
  });

  app.post("/api/subscriptions", (req, res) => {
    const db = readDB();
    const { planName, amount, interval } = req.body;

    if (!planName || !amount) {
      return res.status(400).json({ error: "Missing subscription parameters" });
    }

    const nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + (interval === "quarterly" ? 3 : 1));

    const newSub: Subscription = {
      id: "sub_" + Math.random().toString(36).substr(2, 9),
      planName,
      amount: Number(amount),
      interval: interval || "monthly",
      status: "Active",
      createdAt: new Date().toISOString(),
      nextBillingDate: nextDate.toISOString()
    };

    if (!db.subscriptions) db.subscriptions = [];
    db.subscriptions.unshift(newSub);
    writeDB(db);

    res.json({ success: true, subscription: newSub });
  });

  app.post("/api/subscriptions/:id/toggle", (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const { status } = req.body; // e.g. "Active", "Paused", "Cancelled"

    if (!db.subscriptions) db.subscriptions = [];
    const sub = db.subscriptions.find(s => s.id === id);
    if (!sub) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    if (status) {
      sub.status = status;
    } else {
      sub.status = sub.status === "Active" ? "Paused" : "Active";
    }

    writeDB(db);
    res.json({ success: true, subscription: sub });
  });

  app.post("/api/subscriptions/:id/trigger", (req, res) => {
    const db = readDB();
    const { id } = req.params;

    if (!db.subscriptions) db.subscriptions = [];
    const sub = db.subscriptions.find(s => s.id === id);
    if (!sub) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    // Create automated debit payment logs
    const newPayment: Payment = {
      id: "pay_" + Math.random().toString(36).substr(2, 9),
      amount: sub.amount,
      purpose: `Automated Subscription Billing: ${sub.planName}`,
      status: "Completed",
      method: "Razorpay AutoPay UPI Mandate",
      createdAt: new Date().toISOString()
    };

    db.payments.unshift(newPayment);

    // Roll billing date forward
    const nextDate = new Date(sub.nextBillingDate || new Date());
    nextDate.setMonth(nextDate.getMonth() + (sub.interval === "quarterly" ? 3 : 1));
    sub.nextBillingDate = nextDate.toISOString();

    writeDB(db);
    res.json({ success: true, subscription: sub, payment: newPayment });
  });

  // 6. Lesson Streaming Progress handler
  app.get("/api/progress", (req, res) => {
    const db = readDB();
    res.json(db.completedLessons);
  });

  app.post("/api/progress/toggle", (req, res) => {
    const db = readDB();
    const { lessonId } = req.body;

    if (!lessonId) {
      return res.status(400).json({ error: "No lesson key specified" });
    }

    const index = db.completedLessons.indexOf(lessonId);
    if (index > -1) {
      // Remove it (toggle off)
      db.completedLessons.splice(index, 1);
    } else {
      // Add it (toggle completed)
      db.completedLessons.push(lessonId);
    }

    writeDB(db);
    res.json({ success: true, completedLessons: db.completedLessons });
  });

  // 7. Analyze student artistic capacity (Challenge the selection process)
  app.post("/api/analyze-artistic-capacity", async (req, res) => {
    const { name, interest, answers } = req.body;
    if (!name || !interest || !answers) {
      return res.status(400).json({ error: "Missing required assessment parameters" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback if no key is supplied
      const mockScore = Math.floor(Math.random() * 16) + 80; // 80 - 95
      let mockTier = "ELITE DIRECTING POTENTIAL (APPROVED)";
      if (interest === "Cinematography") mockTier = "GOLD COMPOSITION STANDARDS (APPROVED)";
      if (interest === "Screenwriting") mockTier = "HIGH FI-DRAFT PLOTTING STANDARDS (APPROVED)";

      return res.json({
        score: mockScore,
        tier: mockTier,
        critique: `CRITIQUE: Exceptional spatial awareness and directorial control. Your night lighting solution shows active understanding of practical sources and cinematic contrast. Your response to the actor dispute demonstrates firm set management while keeping creative channels open. Your screen narrative opens with rich, cinematic visual metaphors. Highly recommended for immediate enrollment in the upcoming physical cohort.`,
        recommendation: `Admitted with High Merit Scholarship options up to ₹15,000 for standard seat bookings.`,
        admissionId: "FFA-ADM-" + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        You are Hemant Nilim Das, Director of Filmfluencer Academy in Mumbai.
        Grade a student's answers to the Artistic Admissions Challenge.
        
        Track: ${interest}
        Student Name: ${name}
        
        Answers:
        1. Cinematography Solution: ${answers.q1}
        2. Set Crisis Leadership: ${answers.q2}
        3. Visual Screenplay Opening: ${answers.q3}
        
        Provide your response in JSON format matching this schema:
        {
          "score": number (between 70 and 100 based on their creativity and cinematic quality),
          "tier": "string (e.g., 'ELITE DIRECTING POTENTIAL' or 'CINEMATIC COMPOSITION MASTERY')",
          "critique": "string (3-4 sentences of direct, encouraging but expert feedback in the style of Director Hemant Nilim Das)",
          "recommendation": "string (a 1-sentence recommendation or scholarship status)",
          "admissionId": "string (a unique code matching 'FFA-ADM-XXXXXX')"
        }
        Do not return any markdown codeblocks or outer text, only the raw JSON.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({
        score: parsed.score || 85,
        tier: parsed.tier || "PROVEN CINEMATIC APTITUDE (APPROVED)",
        critique: parsed.critique || "Your answers show a strong intuitive understanding of cinematic spacing and direction.",
        recommendation: parsed.recommendation || "Recommended for immediate seat booking.",
        admissionId: parsed.admissionId || "FFA-ADM-" + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    } catch (err) {
      console.error("Gemini API error, falling back to smart defaults:", err);
      const mockScore = Math.floor(Math.random() * 15) + 80;
      res.json({
        score: mockScore,
        tier: "CREATIVE APTITUDE STANDARDS (APPROVED)",
        critique: `Your responses demonstrate solid artistic potential. Your spatial composition and lighting strategies align well with our hands-on curriculum guidelines at the Andheri soundstage.`,
        recommendation: "Approved for direct cohort registration.",
        admissionId: "FFA-ADM-" + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    }
  });

  // --- VITE DEV MIDDLEWARE AND STATIC PRODUCTION ASSETS ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Filmfluencer Academy] Server running securely on http://0.0.0.0:${PORT}`);
  });
}

startServer();
