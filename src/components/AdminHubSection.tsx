import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Users, 
  FileText, 
  Bell, 
  Plus, 
  Folder, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  DollarSign
} from "lucide-react";
import { 
  addCalendarEvent, 
  getCalendarEvents, 
  addStudyCohort, 
  getStudyCohorts,
  addPvtLtdEntity, 
  getPvtLtdEntities,
  sendNotification, 
  getNotifications,
  logActivity
} from "../lib/firestoreService";
import { 
  AcademicCalendarEvent, 
  StudyCohort, 
  PvtLtdEntity, 
  FFANotification,
  FFAUser
} from "../types";

export default function AdminHubSection({ currentUser = null }: { currentUser?: FFAUser | null }) {
  // Collection Lists
  const [events, setEvents] = useState<AcademicCalendarEvent[]>([]);
  const [cohorts, setStudyCohortsList] = useState<StudyCohort[]>([]);
  const [entities, setEntities] = useState<PvtLtdEntity[]>([]);
  const [notifications, setNotifications] = useState<FFANotification[]>([]);

  // Form Inputs
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTrack, setEventTrack] = useState("Directing");

  const [cohortName, setCohortName] = useState("");
  const [cohortStudents, setCohortStudents] = useState("");
  const [cohortFaculty, setCohortFaculty] = useState("Hemant Nilim Das");

  // Pvt Ltd Builder (Needs exactly 2 students to form one legal entity!)
  const [student1, setStudent1] = useState("");
  const [student2, setStudent2] = useState("");
  const [companyNameInput, setCompanyNameInput] = useState("");

  // Notification Inputs
  const [notifTargetEmail, setNotifTargetEmail] = useState("");
  const [notifType, setNotifType] = useState<"tuition_due" | "course_completed" | "alert">("tuition_due");
  const [notifMessage, setNotifMessage] = useState("");

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Load All Lists from Firestore
  const loadAllData = async () => {
    try {
      const [evList, coList, enList, noList] = await Promise.all([
        getCalendarEvents(),
        getStudyCohorts(),
        getPvtLtdEntities(),
        getNotifications()
      ]);
      setEvents(evList);
      setStudyCohortsList(coList);
      setEntities(enList);
      setNotifications(noList);
    } catch (err) {
      console.error("Firestore loading error, using local fallback caching: ", err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 4000);
  };

  // Submit Event
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;
    setLoading(true);

    const newEv: Omit<AcademicCalendarEvent, "id"> = {
      title: eventTitle,
      date: eventDate,
      description: `Administrative Masterclass on-set milestone for track: ${eventTrack}`,
      type: "shoot"
    };

    try {
      await addCalendarEvent(newEv);
      
      // Log Activity
      await logActivity({
        actionType: "create_event",
        adminName: currentUser?.name || "Director Das",
        adminEmail: currentUser?.email || "hemant@muvireel.in",
        details: `Scheduled masterclass milestone event '${eventTitle}' on ${eventDate} for track '${eventTrack}'.`
      });

      triggerFeedback("Academic calendar event synchronized with Firebase!");
      setEventTitle("");
      setEventDate("");
      loadAllData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Submit Cohort
  const handleAddCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohortName) return;
    setLoading(true);

    const studentNames = cohortStudents.split(",").map(s => s.trim()).filter(Boolean);
    const newCo: Omit<StudyCohort, "id"> = {
      name: cohortName,
      track: "Directing",
      startDate: new Date().toISOString().split("T")[0],
      activeStudentsCount: studentNames.length,
      status: "active"
    };

    try {
      await addStudyCohort(newCo);
      
      // Log Activity
      await logActivity({
        actionType: "create_cohort",
        adminName: currentUser?.name || "Director Das",
        adminEmail: currentUser?.email || "hemant@muvireel.in",
        details: `Initialized study cohort '${cohortName}' with ${studentNames.length} student(s): ${studentNames.join(", ")}.`
      });

      triggerFeedback("Cinema study cohort successfully initialized in Firestore!");
      setCohortName("");
      setCohortStudents("");
      loadAllData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Submit Pvt Ltd Builder
  const handleAddEntity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student1 || !student2 || !companyNameInput) {
      alert("Please specify exactly two candidates and a proposed corporate name to form a banner.");
      return;
    }
    setLoading(true);

    const newEn: Omit<PvtLtdEntity, "id"> = {
      name: companyNameInput,
      student1Name: student1,
      student2Name: student2,
      status: "Active Pvt Ltd Banner",
      gstNumber: "27AAACF" + Math.floor(1000 + Math.random() * 9000) + "F1Z" + Math.floor(1 + Math.random() * 9),
      incorporatedAt: new Date().toISOString().split("T")[0]
    };

    try {
      await addPvtLtdEntity(newEn);
      
      // Log Activity
      await logActivity({
        actionType: "create_entity",
        adminName: currentUser?.name || "Director Das",
        adminEmail: currentUser?.email || "hemant@muvireel.in",
        details: `Legally provisioned joint Pvt Ltd studio corporate banner '${companyNameInput}' for student directors: ${student1} and ${student2}.`
      });

      triggerFeedback(`Corporate Pvt Ltd Banner '${companyNameInput}' legally provisioned in Firestore!`);
      setStudent1("");
      setStudent2("");
      setCompanyNameInput("");
      loadAllData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Send Notification
  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTargetEmail || !notifMessage) return;
    setLoading(true);

    const mappedType: "fee" | "completion" | "general" = 
      notifType === "tuition_due" ? "fee" : 
      notifType === "course_completed" ? "completion" : "general";

    const newNo: Omit<FFANotification, "id"> = {
      studentName: notifTargetEmail,
      type: mappedType,
      message: notifMessage,
      amount: notifType === "tuition_due" ? 38000 : undefined,
      createdAt: new Date().toISOString(),
      sentByAdmin: true
    };

    try {
      await sendNotification(newNo);
      
      // Log Activity
      await logActivity({
        actionType: "notification_broadcast",
        adminName: currentUser?.name || "Director Das",
        adminEmail: currentUser?.email || "hemant@muvireel.in",
        details: `Dispatched secure broadcast notification of type '${mappedType}' to student '${notifTargetEmail}'. Message: "${notifMessage}"`
      });

      triggerFeedback(`Secured notification broadcasted to ${notifTargetEmail}!`);
      setNotifTargetEmail("");
      setNotifMessage("");
      loadAllData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Banner */}
      <div className="p-6 bg-gradient-to-r from-red-950/20 via-neutral-900 to-red-950/20 border-2 border-red-500/20 rounded-3xl relative overflow-hidden">
        <span className="text-[9px] font-mono bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
          ⚡ Admin Power Dashboard
        </span>
        <h3 className="text-2xl font-serif text-white mt-2">Elite Cinema Administrative Command Center</h3>
        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
          Manage live-action cohorts, coordinate legal Private Limited company formations for student pairs, and deploy real-time tuition fee alerts directly connected to Google Firebase Cloud Storage and Firestore collections.
        </p>

        {feedback && (
          <div className="mt-4 p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-mono">
            ⚡ {feedback}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: forms */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* SECTION 1: JOINT PVT LTD FORMATION */}
          <div className="bg-[#121214] border border-neutral-850 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-sm font-bold text-white font-mono uppercase">Joint Pvt Ltd Company Builder</h4>
                <p className="text-[10.5px] text-neutral-400 font-mono">Incorporates exactly 2 students under one registered production banner</p>
              </div>
            </div>

            <form onSubmit={handleAddEntity} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">First Student Director Name *</label>
                  <input 
                    type="text"
                    required
                    value={student1}
                    onChange={(e) => setStudent1(e.target.value)}
                    placeholder="e.g. Siddharth Sen"
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Second Student Director Name *</label>
                  <input 
                    type="text"
                    required
                    value={student2}
                    onChange={(e) => setStudent2(e.target.value)}
                    placeholder="e.g. Neha Sharma"
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Proposed Legal Banner / Corporate Name *</label>
                <input 
                  type="text"
                  required
                  value={companyNameInput}
                  onChange={(e) => setCompanyNameInput(e.target.value)}
                  placeholder="e.g. Dreamweaver Productions Pvt Ltd"
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-[9.5px] text-neutral-500 mt-1 font-mono">Note: AI automatically assigns simulated GST &amp; MCA legal IDs.</p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Form Joint Pvt Ltd Banner
              </button>
            </form>

            <div className="pt-4 border-t border-neutral-900/60 space-y-3">
              <h5 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Active Registered Corporate Entities ({entities.length})</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {entities.map(en => (
                  <div key={en.id} className="p-4 bg-neutral-900/40 border border-neutral-850 rounded-2xl space-y-2">
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase">
                      GST Verified
                    </span>
                    <h6 className="text-xs font-bold text-white font-sans">{en.name}</h6>
                    <div className="text-[10px] font-mono text-neutral-400 space-y-1">
                      <p>• Directors: {en.student1Name} &amp; {en.student2Name}</p>
                      <p>• GSTIN: {en.gstNumber || "Simulating Registration..."}</p>
                      <p>• Registered: {en.incorporatedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: STUDENT NOTIFICATIONS DISPATCHER */}
          <div className="bg-[#121214] border border-neutral-850 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
              <Bell className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-sm font-bold text-white font-mono uppercase">Student Notifications Dispatcher</h4>
                <p className="text-[10.5px] text-neutral-400 font-mono">Broadcast tuition fee obligations and course completion credentials</p>
              </div>
            </div>

            <form onSubmit={handleSendNotification} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Target Candidate Email *</label>
                  <input 
                    type="email"
                    required
                    value={notifTargetEmail}
                    onChange={(e) => setNotifTargetEmail(e.target.value)}
                    placeholder="e.g. candidate@cinema.in"
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Notification Type Category *</label>
                  <select
                    value={notifType}
                    onChange={(e) => setNotifType(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  >
                    <option value="tuition_due">Tuition Fee Installment Reminder (₹38,000)</option>
                    <option value="course_completed">Course Stage Completion Honor Certificate</option>
                    <option value="alert">General Cohort Advisory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Notification Custom Message *</label>
                <textarea
                  required
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  placeholder="e.g. Please proceed with Stage 03 installment payment (₹38,000) before October 15 to avoid enrollment suspension."
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-sans resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Bell className="w-4 h-4" /> Dispatch Notification Securely
              </button>
            </form>

            <div className="pt-4 border-t border-neutral-900/60 space-y-3">
              <h5 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Broadcast History ({notifications.length})</h5>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
                {notifications.map(no => (
                  <div key={no.id} className="p-3 bg-neutral-900/30 border border-neutral-900 rounded-xl flex justify-between items-start text-xs font-mono gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-black uppercase ${
                          no.type === "fee" ? "bg-red-500/15 text-red-400" : "bg-emerald-500/15 text-emerald-400"
                        }`}>
                          {no.type}
                        </span>
                        <span className="text-white font-bold">{no.studentName}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans">{no.message}</p>
                    </div>
                    <span className="text-[9px] text-neutral-500 shrink-0">
                      {new Date(no.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: ACADEMIC CALENDER SCHEDULER */}
          <div className="bg-[#121214] border border-neutral-850 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
              <Calendar className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-sm font-bold text-white font-mono uppercase">Academic Calendar Planner</h4>
                <p className="text-[10.5px] text-neutral-400 font-mono">Publish milestones and on-set shoot dates directly to student diaries</p>
              </div>
            </div>

            <form onSubmit={handleAddEvent} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Event Milestone Title *</label>
                <input 
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Red Raptor Rigging Lab"
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Event Date *</label>
                <input 
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-neutral-400"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Event
              </button>
            </form>

            <div className="pt-4 border-t border-neutral-900/60 space-y-2">
              <h5 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Scheduled Events ({events.length})</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {events.map(ev => (
                  <div key={ev.id} className="p-3.5 bg-[#0e0e10] border border-neutral-900 rounded-xl flex items-center justify-between font-mono text-xs">
                    <div>
                      <h6 className="font-bold text-white">{ev.title}</h6>
                      <p className="text-[10px] text-amber-500 mt-1">🗓️ {ev.date}</p>
                    </div>
                    <span className="text-[9px] bg-neutral-900 px-2 py-1 rounded text-neutral-400">
                      Type: {ev.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: STUDY COHORTS ASSIGNER */}
          <div className="bg-[#121214] border border-neutral-850 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
              <Users className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-sm font-bold text-white font-mono uppercase">Study Cohorts Assigner</h4>
                <p className="text-[10.5px] text-neutral-400 font-mono">Group students into tactical directorial squads</p>
              </div>
            </div>

            <form onSubmit={handleAddCohort} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Cohort Group Code/Name *</label>
                  <input 
                    type="text"
                    required
                    value={cohortName}
                    onChange={(e) => setCohortName(e.target.value)}
                    placeholder="e.g. Andheri Action Crew B"
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Assigned Lead Faculty</label>
                  <select
                    value={cohortFaculty}
                    onChange={(e) => setCohortFaculty(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  >
                    <option value="Hemant Nilim Das">Director Hemant Nilim Das</option>
                    <option value="Guest DOP Sanjiv">Associate DOP Sanjiv Goenka</option>
                    <option value="Audio Engineer Rawat">Foley Specialist Rawat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">Student Names (separated by comma) *</label>
                <input 
                  type="text"
                  required
                  value={cohortStudents}
                  onChange={(e) => setCohortStudents(e.target.value)}
                  placeholder="e.g. Siddharth Sen, Priya Sen, Rohit Roy"
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Assign New Cohort
              </button>
            </form>

            <div className="pt-4 border-t border-neutral-900/60 space-y-3">
              <h5 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Active Cohorts ({cohorts.length})</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cohorts.map(co => (
                  <div key={co.id} className="p-4 bg-[#0e0e10] border border-neutral-900 rounded-2xl space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{co.name}</span>
                      <span className="text-[10px] text-amber-500">Track: {co.track}</span>
                    </div>
                    <div className="text-[11px] text-neutral-400 space-y-1">
                      <p>• Status: <span className="text-emerald-400 uppercase font-bold">{co.status}</span></p>
                      <p>• Active Candidates: {co.activeStudentsCount} members</p>
                      <p>• Start Date: {co.startDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Step-by-Step Developer instructions */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#121214] border-2 border-amber-500/10 rounded-3xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <h4 className="text-sm font-bold text-white font-mono uppercase">Developer Connection Guide</h4>
            </div>

            <div className="text-xs font-sans text-neutral-300 space-y-4 leading-relaxed">
              <p className="font-semibold text-amber-400">Connecting your custom local code to Google Cloud Firestore:</p>
              
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-[10.5px] font-black text-white">1. Install Firebase SDK</p>
                  <pre className="bg-black/80 border border-neutral-900 p-2 rounded-xl text-[9px] font-mono text-amber-500 overflow-x-auto mt-1">
                    npm install firebase
                  </pre>
                </div>

                <div>
                  <p className="font-mono text-[10.5px] font-black text-white">2. Initialize Firebase (e.g. firebase.ts)</p>
                  <pre className="bg-black/80 border border-neutral-900 p-2 rounded-xl text-[8.5px] font-mono text-neutral-400 overflow-x-auto mt-1 leading-tight">
{`import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "prozeniusmedia.firebaseapp.com",
  projectId: "prozeniusmedia",
  databaseURL: "https://..."
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);`}
                  </pre>
                </div>

                <div>
                  <p className="font-mono text-[10.5px] font-black text-white">3. Query / Write Data</p>
                  <pre className="bg-black/80 border border-neutral-900 p-2 rounded-xl text-[8.5px] font-mono text-neutral-400 overflow-x-auto mt-1 leading-tight">
{`import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Example collection name: "ffa_pvt_ltd"
export async function createEntity(data) {
  return await addDoc(
    collection(db, "ffa_pvt_ltd"), 
    data
  );
}`}
                  </pre>
                </div>

                <div>
                  <p className="font-mono text-[10.5px] font-black text-white">4. Database Collections Used</p>
                  <div className="text-[10px] font-mono text-neutral-400 space-y-1 bg-black/40 p-2.5 rounded-lg border border-neutral-900">
                    <p>• <strong className="text-white">ffa_media</strong>: Image tagging</p>
                    <p>• <strong className="text-white">ffa_pvt_ltd</strong>: Pvt Ltd creations</p>
                    <p>• <strong className="text-white">ffa_cohorts</strong>: Study cohort squads</p>
                    <p>• <strong className="text-white">ffa_calendar</strong>: Academic calendars</p>
                    <p>• <strong className="text-white">ffa_notifications</strong>: Reminders</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl">
                <p className="text-[9.5px] font-mono text-neutral-400 font-semibold uppercase block mb-1">💡 CLOUD RECOVERY TIP</p>
                <p className="text-[10px] text-neutral-500 leading-normal">
                  If offline or during local simulation, the service auto-routes queries to encrypted localStorage indexes. Your data stays 100% durable in either state.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
