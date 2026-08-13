"use client";

import { useCallback, useEffect, useState } from "react";
import { getSession, login as doLogin, logout as doLogout, signup as doSignup, type Session } from "@/lib/demo-auth";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setHydrated(true);

    function handler() {
      setSession(getSession());
    }
    window.addEventListener("ts-storage", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ts-storage", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const login = useCallback((email: string, password: string) => {
    const result = doLogin(email, password);
    if (result.ok) setSession(result.session);
    return result;
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    const result = doSignup(name, email, password);
    if (result.ok) setSession(result.session);
    return result;
  }, []);

  const logout = useCallback(() => {
    doLogout();
    setSession(null);
  }, []);

  return { session, isAuthenticated: !!session, hydrated, login, signup, logout };
}
