export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  purpose: "Question" | "Enroll" | "Callback";
  message: string;
  status: "New" | "Contacted" | "Resolved";
  createdAt: string;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
  companyName: string;
  avatarUrl: string;
}

export interface Payment {
  id: string;
  amount: number;
  purpose: string;
  status: "Pending" | "Completed" | "Failed";
  method: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  planName: string;
  amount: number;
  interval: "monthly" | "quarterly";
  status: "Active" | "Paused" | "Cancelled";
  createdAt: string;
  nextBillingDate: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  summary: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  awards: {
    title: string;
    organization: string;
    year: string;
    project: string;
  }[];
  directedStars: {
    name: string;
    role: string;
    project: string;
  }[];
  filmography: {
    title: string;
    year: string;
    highlight: string;
    leadCast: string;
    youtubeId: string;
    description: string;
  }[];
  brandWork: {
    client: string;
    campaign: string;
    year: string;
  }[];
}

// --- NEW FULL-STACK INTEGRATED SCHEMAS ---

export interface FFAUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  phone?: string;
  createdAt: string;
}

export interface AcademicCalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  type: "lecture" | "shoot" | "holiday" | "deadline" | "review";
}

export interface StudyCohort {
  id: string;
  name: string;
  track: "Directing" | "Cinematography" | "Screenwriting";
  startDate: string;
  activeStudentsCount: number;
  status: "upcoming" | "active" | "graduated";
}

export interface PvtLtdEntity {
  id: string;
  name: string;
  student1Name: string;
  student2Name: string;
  status: "Drafting" | "Submitted" | "Approved" | "Active Pvt Ltd Banner";
  gstNumber?: string;
  incorporatedAt: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  title: string;
  description: string;
  category: "image" | "video";
  taggedTrack?: string;
  createdAt: string;
}

export interface FFANotification {
  id: string;
  studentName: string;
  type: "fee" | "completion" | "general";
  message: string;
  amount?: number;
  createdAt: string;
  sentByAdmin: boolean;
}

export interface FFAActivityLog {
  id: string;
  actionType: "create_event" | "create_cohort" | "create_pvt_ltd" | "send_notification" | "update_enquiry" | "modify_course" | string;
  adminName: string;
  adminEmail: string;
  details: string;
  createdAt: string;
}

