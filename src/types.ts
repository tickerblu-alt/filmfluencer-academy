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
