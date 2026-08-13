import type { MockUser } from "@/types";

// Demo-only accounts. Passwords are plain text because this is a frontend-only
// simulation — there is no real backend or database involved.
export const demoUsers: MockUser[] = [
  {
    id: "user-suraj",
    name: "Suraj Thapa",
    email: "suraj@example.com",
    password: "travel123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suraj",
    role: "Travel Enthusiast",
    memberSince: "2023-03-14T00:00:00.000Z",
  },
  {
    id: "user-admin",
    name: "Admin",
    email: "admin@travelsphere.ai",
    password: "admin123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    role: "Admin",
    memberSince: "2022-01-01T00:00:00.000Z",
  },
];

export function findUserByEmail(email: string): MockUser | undefined {
  return demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}
