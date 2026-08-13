"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { session, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (!session) {
      router.replace("/login");
    } else if (session.role !== "Admin") {
      router.replace("/dashboard");
    }
  }, [hydrated, session, router]);

  if (!hydrated || !session || session.role !== "Admin") {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="skeleton h-32 w-full rounded-2xl" />
        <p className="mt-4 text-center text-sm text-mute">
          Admin access required. Sign in with <span className="text-ink">admin@travelsphere.ai</span> / <span className="text-ink">admin123</span>.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
