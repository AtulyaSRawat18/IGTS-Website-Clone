"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MemberRouteGuard } from "@/lib/session/guards";
import { useSession } from "@/lib/session/use-session";

const studioLinks = [
  { href: "/studio", label: "Command" },
  { href: "/studio/blogs", label: "Blogs" },
  { href: "/studio/games", label: "Games" },
  { href: "/studio/profile", label: "Profile" },
  { href: "/studio/join", label: "Join" },
];

export function StudioShell({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useSession();

  return (
    <MemberRouteGuard>
      <main className="min-h-screen bg-[#080a12] px-4 pb-16 pt-28 text-foreground md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="border border-gold/15 bg-navy/80 p-4 lg:sticky lg:top-24 lg:h-fit">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Studio</p>
            <p className="mt-2 text-sm text-white/55">{user?.display_name}</p>
            <nav className="mt-6 grid gap-2">
              {studioLinks.map((link) => {
                const active = pathname === link.href;
                return <Link key={link.href} href={link.href} className={`border px-3 py-2 text-xs uppercase tracking-[0.18em] ${active ? "border-gold bg-gold/10 text-gold" : "border-white/8 text-white/62 hover:border-gold/30 hover:text-white"}`}>{link.label}</Link>;
              })}
            </nav>
          </aside>
          <section>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Member Control Room</p>
            <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-white/62">{intro}</p>
            <div className="mt-8">{children}</div>
          </section>
        </div>
      </main>
    </MemberRouteGuard>
  );
}
