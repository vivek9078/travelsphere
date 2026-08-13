import { demoUsers, findUserByEmail } from "@/lib/mock-data/users";
import type { MockUser } from "@/types";
import { readStorage, removeStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage";

export type Session = {
  userId: string;
  name: string;
  email: string;
  avatar: string;
  role: MockUser["role"];
};

function toSession(user: MockUser): Session {
  return { userId: user.id, name: user.name, email: user.email, avatar: user.avatar, role: user.role };
}

export function getSession(): Session | null {
  return readStorage<Session | null>(STORAGE_KEYS.session, null);
}

export function login(email: string, password: string): { ok: true; session: Session } | { ok: false; error: string } {
  const user = findUserByEmail(email);
  if (!user) {
    return { ok: false, error: "No account found with that email. Try signing up instead." };
  }
  if (user.password !== password) {
    return { ok: false, error: "Incorrect password. Please try again." };
  }
  const session = toSession(user);
  writeStorage(STORAGE_KEYS.session, session);
  return { ok: true, session };
}

export function signup(name: string, email: string, password: string): { ok: true; session: Session } | { ok: false; error: string } {
  if (findUserByEmail(email)) {
    return { ok: false, error: "An account with that email already exists. Try logging in." };
  }
  // Frontend-only demo: we don't persist the new user into the mock user
  // list (no backend/database), but we create a real local session for it so
  // the rest of the app — dashboard, wishlist, bookings — works immediately.
  const newUser: MockUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    role: "Travel Enthusiast",
    memberSince: new Date().toISOString(),
  };
  demoUsers.push(newUser);
  const session = toSession(newUser);
  writeStorage(STORAGE_KEYS.session, session);
  return { ok: true, session };
}

export function logout(): void {
  removeStorage(STORAGE_KEYS.session);
}

export function isAdmin(session: Session | null): boolean {
  return session?.role === "Admin";
}
