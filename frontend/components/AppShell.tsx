"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "@/lib/session/session-provider";
import { useSession } from "@/lib/session/use-session";

function RoutedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();
  const isEntry = pathname === "/entry";

  useEffect(() => {
    if (status === "loading") return;
    if (!isEntry && status === "unauthenticated") {
      router.replace(`/entry?next=${encodeURIComponent(pathname)}`);
    }
  }, [isEntry, pathname, router, status]);

  if (!isEntry && status === "loading") {
    return (
      <main className="min-h-screen bg-navy px-6 pt-32 text-gold">
        <p className="text-xs uppercase tracking-[0.3em]">Opening the society archive...</p>
      </main>
    );
  }

  if (!isEntry && status === "unauthenticated") return null;

  return (
    <>
      {!isEntry && <Navbar />}
      {children}
    </>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RoutedShell>{children}</RoutedShell>
    </SessionProvider>
  );
}
