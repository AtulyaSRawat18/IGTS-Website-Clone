"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { clearStoredToken, getStoredToken } from "@/lib/api/client";
import { getMe, logout as logoutRequest } from "@/lib/api/auth";
import type { AuthUser } from "@/lib/api/types";

type SessionStatus = "loading" | "authenticated" | "visitor" | "unauthenticated";

type SessionContextValue = {
  status: SessionStatus;
  user: AuthUser | null;
  isMember: boolean;
  isVisitor: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SessionStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  const refreshSession = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      setStatus("unauthenticated");
      return;
    }

    try {
      const me = await getMe();
      setUser(me);
      setStatus(me.role === "member" ? "authenticated" : "visitor");
    } catch {
      clearStoredToken();
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
    setStatus("unauthenticated");
    router.push("/entry");
  }, [router]);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const value = useMemo(
    () => ({
      status,
      user,
      isMember: user?.role === "member",
      isVisitor: status === "visitor" || user?.role === "member",
      refreshSession,
      logout,
    }),
    [logout, refreshSession, status, user],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used within SessionProvider");
  return value;
}
