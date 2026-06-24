import { 
  db, 
  collection, 
  getDocs, 
  addDoc, 
  setDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  auth
} from "../firebase";
import { 
  MediaAsset, 
  AcademicCalendarEvent, 
  StudyCohort, 
  PvtLtdEntity, 
  FFANotification, 
  FFAUser,
  Course,
  FFAActivityLog
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

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

function isPermissionError(err: any): boolean {
  const msg = String(err?.message || err || "").toLowerCase();
  return msg.includes("permission") || msg.includes("insufficient");
}

// Dynamic Collections Names
const COLLECTIONS = {
  MEDIA: "ffa_media",
  CALENDAR: "ffa_calendar",
  COHORTS: "ffa_cohorts",
  PVT_LTD: "ffa_pvt_ltd",
  NOTIFICATIONS: "ffa_notifications",
  USERS: "ffa_users",
  ONLINE_COURSES: "ffa_online_courses",
  ACTIVITY_LOGS: "ffa_activity_logs"
};

// 1. Core Media Assets (Images and Videos)
export async function getMediaAssets(): Promise<MediaAsset[]> {
  try {
    const q = query(collection(db, COLLECTIONS.MEDIA), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const list: MediaAsset[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as MediaAsset);
    });
    return list;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.MEDIA);
    }
    console.warn("Firestore Media read failed, loading fallback local storage:", err);
    const local = localStorage.getItem("ffa_cached_media");
    return local ? JSON.parse(local) : getMockMedia();
  }
}

export async function addMediaAsset(asset: Omit<MediaAsset, "id">): Promise<MediaAsset> {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.MEDIA), asset);
    const newAsset = { id: docRef.id, ...asset };
    // update cache
    const current = await getMediaAssets();
    localStorage.setItem("ffa_cached_media", JSON.stringify([newAsset, ...current]));
    return newAsset;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.CREATE, COLLECTIONS.MEDIA);
    }
    console.error("Firestore write failed, saving locally:", err);
    const mockId = "media_" + Math.random().toString(36).substr(2, 9);
    const newAsset = { id: mockId, ...asset };
    const local = localStorage.getItem("ffa_cached_media");
    const current = local ? JSON.parse(local) : getMockMedia();
    const updated = [newAsset, ...current];
    localStorage.setItem("ffa_cached_media", JSON.stringify(updated));
    return newAsset;
  }
}

export async function updateMediaAsset(id: string, updates: Partial<MediaAsset>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.MEDIA, id);
    await updateDoc(docRef, updates);
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.UPDATE, `${COLLECTIONS.MEDIA}/${id}`);
    }
    console.error("Firestore update failed, simulating locally:", err);
    const local = localStorage.getItem("ffa_cached_media");
    if (local) {
      const current: MediaAsset[] = JSON.parse(local);
      const updated = current.map(item => item.id === id ? { ...item, ...updates } : item);
      localStorage.setItem("ffa_cached_media", JSON.stringify(updated));
    }
  }
}

// 2. Academic Calendar
export async function getCalendarEvents(): Promise<AcademicCalendarEvent[]> {
  try {
    const q = query(collection(db, COLLECTIONS.CALENDAR), orderBy("date", "asc"));
    const snapshot = await getDocs(q);
    const list: AcademicCalendarEvent[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as AcademicCalendarEvent);
    });
    return list;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.CALENDAR);
    }
    console.warn("Firestore Calendar failed:", err);
    const local = localStorage.getItem("ffa_cached_calendar");
    return local ? JSON.parse(local) : getMockCalendar();
  }
}

export async function addCalendarEvent(event: Omit<AcademicCalendarEvent, "id">): Promise<AcademicCalendarEvent> {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.CALENDAR), event);
    const newEvent = { id: docRef.id, ...event };
    return newEvent;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.CREATE, COLLECTIONS.CALENDAR);
    }
    const mockId = "evt_" + Math.random().toString(36).substr(2, 9);
    const newEvent = { id: mockId, ...event };
    const local = localStorage.getItem("ffa_cached_calendar");
    const current = local ? JSON.parse(local) : getMockCalendar();
    localStorage.setItem("ffa_cached_calendar", JSON.stringify([...current, newEvent]));
    return newEvent;
  }
}

// 3. Study Cohorts
export async function getStudyCohorts(): Promise<StudyCohort[]> {
  try {
    const snapshot = await getDocs(collection(db, COLLECTIONS.COHORTS));
    const list: StudyCohort[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as StudyCohort);
    });
    return list;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.COHORTS);
    }
    const local = localStorage.getItem("ffa_cached_cohorts");
    return local ? JSON.parse(local) : getMockCohorts();
  }
}

export async function addStudyCohort(cohort: Omit<StudyCohort, "id">): Promise<StudyCohort> {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.COHORTS), cohort);
    return { id: docRef.id, ...cohort };
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.CREATE, COLLECTIONS.COHORTS);
    }
    const mockId = "cohort_" + Math.random().toString(36).substr(2, 9);
    const newCohort = { id: mockId, ...cohort };
    const local = localStorage.getItem("ffa_cached_cohorts");
    const current = local ? JSON.parse(local) : getMockCohorts();
    localStorage.setItem("ffa_cached_cohorts", JSON.stringify([...current, newCohort]));
    return newCohort;
  }
}

// 4. Pvt Ltd Joint Entities
export async function getPvtLtdEntities(): Promise<PvtLtdEntity[]> {
  try {
    const snapshot = await getDocs(collection(db, COLLECTIONS.PVT_LTD));
    const list: PvtLtdEntity[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as PvtLtdEntity);
    });
    return list;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.PVT_LTD);
    }
    const local = localStorage.getItem("ffa_cached_pvt_ltd");
    return local ? JSON.parse(local) : getMockPvtLtd();
  }
}

export async function addPvtLtdEntity(entity: Omit<PvtLtdEntity, "id">): Promise<PvtLtdEntity> {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.PVT_LTD), entity);
    return { id: docRef.id, ...entity };
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.CREATE, COLLECTIONS.PVT_LTD);
    }
    const mockId = "pvt_" + Math.random().toString(36).substr(2, 9);
    const newEntity = { id: mockId, ...entity };
    const local = localStorage.getItem("ffa_cached_pvt_ltd");
    const current = local ? JSON.parse(local) : getMockPvtLtd();
    localStorage.setItem("ffa_cached_pvt_ltd", JSON.stringify([...current, newEntity]));
    return newEntity;
  }
}

export async function updatePvtLtdStatus(id: string, status: PvtLtdEntity["status"], gst?: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.PVT_LTD, id);
    await updateDoc(docRef, { status, ...(gst ? { gstNumber: gst } : {}) });
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.UPDATE, `${COLLECTIONS.PVT_LTD}/${id}`);
    }
    const local = localStorage.getItem("ffa_cached_pvt_ltd");
    if (local) {
      const current: PvtLtdEntity[] = JSON.parse(local);
      const updated = current.map(item => item.id === id ? { ...item, status, ...(gst ? { gstNumber: gst } : {}) } : item);
      localStorage.setItem("ffa_cached_pvt_ltd", JSON.stringify(updated));
    }
  }
}

// 5. Notifications Feed
export async function getNotifications(): Promise<FFANotification[]> {
  try {
    const q = query(collection(db, COLLECTIONS.NOTIFICATIONS), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const list: FFANotification[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as FFANotification);
    });
    return list;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.NOTIFICATIONS);
    }
    const local = localStorage.getItem("ffa_cached_notifications");
    return local ? JSON.parse(local) : getMockNotifications();
  }
}

export async function sendNotification(notif: Omit<FFANotification, "id">): Promise<FFANotification> {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), notif);
    return { id: docRef.id, ...notif };
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.CREATE, COLLECTIONS.NOTIFICATIONS);
    }
    const mockId = "notif_" + Math.random().toString(36).substr(2, 9);
    const newNotif = { id: mockId, ...notif };
    const local = localStorage.getItem("ffa_cached_notifications");
    const current = local ? JSON.parse(local) : getMockNotifications();
    localStorage.setItem("ffa_cached_notifications", JSON.stringify([newNotif, ...current]));
    return newNotif;
  }
}

// 6. Registered FFA Users for Auth
export async function registerUser(user: FFAUser): Promise<void> {
  try {
    await setDoc(doc(db, COLLECTIONS.USERS, user.id), user);
  } catch (err) {
    console.error("User doc register failed:", err);
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.WRITE, `${COLLECTIONS.USERS}/${user.id}`);
    }
  }
  // Store session
  localStorage.setItem("ffa_logged_user", JSON.stringify(user));
}

export async function getUser(email: string): Promise<FFAUser | null> {
  try {
    const snapshot = await getDocs(collection(db, COLLECTIONS.USERS));
    let found: FFAUser | null = null;
    snapshot.forEach((d) => {
      const u = d.data() as FFAUser;
      if (u.email.toLowerCase() === email.toLowerCase()) {
        found = { id: d.id, ...u };
      }
    });
    return found;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.USERS);
    }
    console.warn("Firestore User fetch failed, checking local database simulation...");
    const localUsersStr = localStorage.getItem("ffa_simulated_users") || "[]";
    const localUsers: FFAUser[] = JSON.parse(localUsersStr);
    return localUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }
}


// --- SMART FALLBACK MOCKS FOR PERFECT OFFLINE DURABILITY ---

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

function getMockNotifications(): FFANotification[] {
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

// 7. Activity Logs
export async function getActivityLogs(): Promise<FFAActivityLog[]> {
  try {
    const q = query(collection(db, COLLECTIONS.ACTIVITY_LOGS), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const list: FFAActivityLog[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as FFAActivityLog);
    });
    return list;
  } catch (err) {
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.LIST, COLLECTIONS.ACTIVITY_LOGS);
    }
    console.warn("Firestore Activity Logs failed, loading fallback local storage:", err);
    const local = localStorage.getItem("ffa_cached_activity_logs");
    return local ? JSON.parse(local) : getMockActivityLogs();
  }
}

export async function logActivity(action: Omit<FFAActivityLog, "id" | "createdAt">): Promise<FFAActivityLog> {
  const newAction = {
    ...action,
    createdAt: new Date().toISOString()
  };
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.ACTIVITY_LOGS), newAction);
    const logged = { id: docRef.id, ...newAction };
    // Update local cache
    const current = await getActivityLogs();
    localStorage.setItem("ffa_cached_activity_logs", JSON.stringify([logged, ...current]));
    return logged;
  } catch (err) {
    console.error("Firestore logActivity failed, saving locally:", err);
    if (isPermissionError(err)) {
      handleFirestoreError(err, OperationType.CREATE, COLLECTIONS.ACTIVITY_LOGS);
    }
    const mockId = "log_" + Math.random().toString(36).substr(2, 9);
    const logged = { id: mockId, ...newAction };
    const local = localStorage.getItem("ffa_cached_activity_logs");
    const current = local ? JSON.parse(local) : getMockActivityLogs();
    localStorage.setItem("ffa_cached_activity_logs", JSON.stringify([logged, ...current]));
    return logged;
  }
}

function getMockActivityLogs(): FFAActivityLog[] {
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

