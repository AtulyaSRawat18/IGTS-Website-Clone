"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "./session-provider";

export function MemberRouteGuard({ children }: { children: React.ReactNode }) {
  const { status, isMember } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;
    if (!isMember) router.replace(`/entry?next=${encodeURIComponent(pathname)}`);
  }, [isMember, pathname, router, status]);

  if (status === "loading") {
    return <div className="min-h-screen bg-navy px-6 pt-32 text-gold">Verifying member credentials...</div>;
  }

  if (!isMember) return null;
  return <>{children}</>;
}

export function PermissionDenied({ message = "You do not have permission to manage this resource." }) {
  return (
    <main className="min-h-screen bg-navy px-6 pt-32 text-white">
      <div className="mx-auto max-w-2xl border border-gold/25 bg-ink/70 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Permission denied</p>
        <h1 className="mt-4 font-serif text-4xl">This move is not yours.</h1>
        <p className="mt-4 text-white/70">{message}</p>
        <Link href="/studio" className="mt-8 inline-block border border-gold px-5 py-3 text-xs uppercase tracking-[0.2em] text-gold">
          Back to Studio
        </Link>
      </div>
    </main>
  );
}
