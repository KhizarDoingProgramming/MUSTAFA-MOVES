import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "./firebase";

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  level: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid,
    name,
    email,
    age: 25,
    weight: 70,
    height: 175,
    goal: "muscle",
    level: "intermediate",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return cred.user;
}

export async function logIn(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logOut(): Promise<void> {
  const auth = getFirebaseAuth();
  await signOut(auth);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const db = getFirebaseDb();
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const db = getFirebaseDb();
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function saveWorkoutPlan(
  uid: string,
  plan: Record<string, unknown>
): Promise<void> {
  const db = getFirebaseDb();
  const ref = doc(db, "users", uid, "plans", `plan-${Date.now()}`);
  await setDoc(ref, {
    ...plan,
    createdAt: serverTimestamp(),
  });
}

export function onAuthChange(cb: (user: User | null) => void): () => void {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, cb);
}
