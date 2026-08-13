"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const result = signup(name, email, password);
      setLoading(false);
      if (result.ok) router.push("/dashboard");
      else setError(result.error);
    }, 500);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-aqua">Get started</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Create your account</h1>
      <p className="mt-2 text-sm text-mute">No real account is created — this is a local, frontend-only demo session.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block text-sm text-mute">
          Full name
          <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none focus-visible:border-amber" />
        </label>
        <label className="block text-sm text-mute">
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none focus-visible:border-amber" />
        </label>
        <label className="block text-sm text-mute">
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="mt-1 w-full rounded-lg border border-line/60 bg-surface2 px-3 py-2.5 text-ink outline-none focus-visible:border-amber" />
        </label>

        {error && <p className="rounded-lg bg-amber/10 px-3 py-2 text-sm text-amber">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-amber py-3 font-mono text-xs uppercase tracking-widest text-void transition-colors hover:bg-amber-soft disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-mute">
        Already have an account? <Link href="/login" className="text-amber hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
