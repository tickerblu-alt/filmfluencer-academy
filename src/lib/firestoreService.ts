import { 
  MediaAsset, 
  AcademicCalendarEvent, 
  StudyCohort, 
  PvtLtdEntity, 
  FIFINotification, 
  FIFIUser,
  FIFIActivityLog
} from "../types";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

// Helper to get item from localStorage or initialize with mock data
function getStoredItem<T>(key: string, defaultGenerator: () => T[]): T[] {
  const stored = localStorage.getItem(key);
  if (!stored) {
    const defaultData = defaultGenerator();
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    const defaultData = defaultGenerator();
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
}

function saveStoredItem<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// 1. Core Media Assets (Images and Videos)
export async function getMediaAssets(): Promise<MediaAsset[]> {
  return getStoredItem<MediaAsset>("fifi_simulated_media", getMockMedia);
}

export async function addMediaAsset(asset: Omit<MediaAsset, "id">): Promise<MediaAsset> {
  const media = getStoredItem<MediaAsset>("fifi_simulated_media", getMockMedia);
  const newAsset: MediaAsset = {
    ...asset,
    id: "media_" + Math.random().toString(36).substr(2, 9)
  };
  media.unshift(newAsset);
  saveStoredItem("fifi_simulated_media", media);
  return newAsset;
}

export async function updateMediaAsset(id: string, updates: Partial<MediaAsset>): Promise<void> {
  const media = getStoredItem<MediaAsset>("fifi_simulated_media", getMockMedia);
  const updated = media.map(item => item.id === id ? { ...item, ...updates } : item);
  saveStoredItem("fifi_simulated_media", updated);
}

// 2. Academic Calendar Events
export async function getCalendarEvents(): Promise<AcademicCalendarEvent[]> {
  return getStoredItem<AcademicCalendarEvent>("fifi_simulated_calendar", getMockCalendar);
}

export async function addCalendarEvent(event: Omit<AcademicCalendarEvent, "id">): Promise<AcademicCalendarEvent> {
  const events = getStoredItem<AcademicCalendarEvent>("fifi_simulated_calendar", getMockCalendar);
  const newEvent: AcademicCalendarEvent = {
    ...event,
    id: "evt_" + Math.random().toString(36).substr(2, 9)
  };
  events.push(newEvent);
  saveStoredItem("fifi_simulated_calendar", events);
  return newEvent;
}

// 3. Study Cohorts (Frictionless Batches)
export async function getStudyCohorts(): Promise<StudyCohort[]> {
  return getStoredItem<StudyCohort>("fifi_simulated_cohorts", getMockCohorts);
}

export async function addStudyCohort(cohort: Omit<StudyCohort, "id">): Promise<StudyCohort> {
  const cohorts = getStoredItem<StudyCohort>("fifi_simulated_cohorts", getMockCohorts);
  const newCohort: StudyCohort = {
    ...cohort,
    id: "c_" + Math.random().toString(36).substr(2, 9)
  };
  cohorts.push(newCohort);
  saveStoredItem("fifi_simulated_cohorts", cohorts);
  return newCohort;
}

// 4. Pvt Ltd Incorporations
export async function getPvtLtdEntities(): Promise<PvtLtdEntity[]> {
  return getStoredItem<PvtLtdEntity>("fifi_simulated_pvt_ltd", getMockPvtLtd);
}

export async function addPvtLtdEntity(entity: Omit<PvtLtdEntity, "id">): Promise<PvtLtdEntity> {
  const entities = getStoredItem<PvtLtdEntity>("fifi_simulated_pvt_ltd", getMockPvtLtd);
  const newEntity: PvtLtdEntity = {
    ...entity,
    id: "p_" + Math.random().toString(36).substr(2, 9)
  };
  entities.push(newEntity);
  saveStoredItem("fifi_simulated_pvt_ltd", entities);
  return newEntity;
}

export async function updatePvtLtdStatus(id: string, status: PvtLtdEntity["status"], gst?: string): Promise<void> {
  const entities = getStoredItem<PvtLtdEntity>("fifi_simulated_pvt_ltd", getMockPvtLtd);
  const updated = entities.map(entity => {
    if (entity.id === id) {
      const u: Partial<PvtLtdEntity> = { status };
      if (gst) u.gstNumber = gst;
      return { ...entity, ...u };
    }
    return entity;
  });
  saveStoredItem("fifi_simulated_pvt_ltd", updated);
}

// 5. Tuition Fee & Masterclass Notifications
export async function getNotifications(): Promise<FIFINotification[]> {
  return getStoredItem<FIFINotification>("fifi_simulated_notifications", getMockNotifications);
}

export async function sendNotification(notif: Omit<FIFINotification, "id">): Promise<FIFINotification> {
  const notifications = getStoredItem<FIFINotification>("fifi_simulated_notifications", getMockNotifications);
  const newNotif: FIFINotification = {
    ...notif,
    id: "n_" + Math.random().toString(36).substr(2, 9)
  };
  notifications.unshift(newNotif);
  saveStoredItem("fifi_simulated_notifications", notifications);
  return newNotif;
}

// 6. Secure Student Accounts (Bypassed but kept for type compatibility)
export async function registerUser(user: FIFIUser): Promise<void> {
  const users = getStoredItem<FIFIUser>("fifi_simulated_users", () => []);
  if (!users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
    users.push(user);
    saveStoredItem("fifi_simulated_users", users);
  }
  localStorage.setItem("fifi_logged_user", JSON.stringify(user));
}

export async function getUser(email: string): Promise<FIFIUser | null> {
  const users = getStoredItem<FIFIUser>("fifi_simulated_users", () => [
    {
      id: "mock_admin_id",
      name: "Aarav Sharma",
      email: "tickerblu@gmail.com",
      role: "admin",
      createdAt: new Date().toISOString()
    }
  ]);
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

// 7. Activity Logs
export async function getActivityLogs(): Promise<FIFIActivityLog[]> {
  return getStoredItem<FIFIActivityLog>("fifi_simulated_activity_logs", getMockActivityLogs);
}

export async function logActivity(action: Omit<FIFIActivityLog, "id" | "createdAt">): Promise<FIFIActivityLog> {
  const logs = getStoredItem<FIFIActivityLog>("fifi_simulated_activity_logs", getMockActivityLogs);
  const newLog: FIFIActivityLog = {
    ...action,
    id: "log_" + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  logs.unshift(newLog);
  saveStoredItem("fifi_simulated_activity_logs", logs);
  return newLog;
}

// --- SMART FALLBACK MOCKS ---

function getMockMedia(): MediaAsset[] {
  return [
    {
      id: "media_1",
      url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
      title: "Choreographing Action Sequences on Mumbai Sounds",
      description: "Prereq layout for high-tempo camera motions and safety blockings.",
      category: "image",
      taggedTrack: "Directing",
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    },
    {
      id: "media_2",
      url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
      title: "Anamorphic Lighting & Low Ambient Exposure",
      description: "Calibrating DaVinci Resolve lookup curves under extreme night shoots.",
      category: "image",
      taggedTrack: "Cinematography",
      createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
    },
    {
      id: "media_3",
      url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
      title: "OTT Spec-Drafting Character Dynamic",
      description: "Building the standard script framework for high-demand thriller pilots.",
      category: "image",
      taggedTrack: "Screenwriting",
      createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString()
    }
  ];
}

function getMockCalendar(): AcademicCalendarEvent[] {
  return [
    {
      id: "evt_1",
      title: "Masterclass: Film Funding & Pitching with Hemant Nilim Das",
      date: "2026-07-15",
      description: "Exclusive guidance on securing private equity and OTT buyers for indie scripts.",
      type: "lecture"
    },
    {
      id: "evt_2",
      title: "Soundstage Practical: Directing Actors Under Pressure",
      date: "2026-07-28",
      description: "Hands-on blocking tests with trained theater professionals at Andheri soundstage.",
      type: "shoot"
    },
    {
      id: "evt_3",
      title: "Pitch Deck & Script Submission Deadline",
      date: "2026-08-10",
      description: "Submission of adaptation portfolios to Muvireel's screening committee.",
      type: "deadline"
    },
    {
      id: "evt_4",
      title: "Mid-Term Cinematic Showreel Jury",
      date: "2026-08-25",
      description: "Direct feedback on rough-cut sequences from Director Das.",
      type: "review"
    }
  ];
}

function getMockCohorts(): StudyCohort[] {
  return [
    {
      id: "c_1",
      name: "October Elite Directing Cohort",
      track: "Directing",
      startDate: "2026-10-01",
      activeStudentsCount: 12,
      status: "upcoming"
    },
    {
      id: "c_2",
      name: "Mumbai Cinematography Masters Cohort",
      track: "Cinematography",
      startDate: "2026-07-01",
      activeStudentsCount: 8,
      status: "active"
    }
  ];
}

function getMockPvtLtd(): PvtLtdEntity[] {
  return [
    {
      id: "p_1",
      name: "Vanguard Cine-Creators Pvt Ltd",
      student1Name: "Aaryan Mehra",
      student2Name: "Tanya Kapoor",
      status: "Approved",
      gstNumber: "27AAAFF0420A1Z5",
      incorporatedAt: "2026-05-18"
    }
  ];
}

function getMockNotifications(): FIFINotification[] {
  return [
    {
      id: "n_1",
      studentName: "Aaryan Mehra",
      type: "fee",
      message: "Tuition installment payment approved. Verified balance is synchronized.",
      amount: 38000,
      createdAt: new Date().toISOString(),
      sentByAdmin: true
    }
  ];
}

function getMockActivityLogs(): FIFIActivityLog[] {
  return [
    {
      id: "log_mock_1",
      actionType: "system_init",
      adminName: "Director Das",
      adminEmail: "hemant@muvireel.in",
      details: "Elite Cinema Administrative system booted.",
      createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
    }
  ];
}
