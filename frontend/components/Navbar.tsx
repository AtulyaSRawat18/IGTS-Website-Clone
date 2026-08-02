"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/session/use-session";

const links = [
  { href: "/blog", label: "The Ledger" },
  { href: "/members", label: "Members" },
  { href: "/game-lab", label: "Game Lab" },
  { href: "/join-us", label: "Join Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { status, user, isMember, logout } = useSession();
  const isStudio = pathname.startsWith("/studio");

  useEffect(() => {
    const scrollContainer = document.getElementById("home-scroll-container");
    const target = scrollContainer ?? window;
    const onScroll = () => {
      const top = scrollContainer instanceof HTMLElement ? scrollContainer.scrollTop : window.scrollY;
      setScrolled(top > 8 || isStudio);
    };
    target.addEventListener("scroll", onScroll);
    onScroll();
    return () => target.removeEventListener("scroll", onScroll);
  }, [isStudio]);

  const navLinks = isMember ? [...links, { href: "/studio", label: "Studio" }] : links;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-gold/15 bg-navy/90 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-ink/70 to-transparent"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
        <Link href="/" className="flex items-center gap-3 text-white">
          <img src="/igts-logo.jpg" alt="Indian Game Theory Society NSUT logo" className="h-11 w-11 rounded-full border border-gold/30 object-cover bg-white" />
          <span className="flex flex-col leading-none">
            <span className="text-xs font-semibold uppercase tracking-[0.28em]">IGTS NSUT</span>
            <span className="mt-1 hidden text-[10px] font-normal uppercase tracking-[0.18em] text-white/42 sm:inline">Indian Game Theory Society</span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} className={`group relative text-xs uppercase tracking-[0.2em] transition ${active ? "text-gold" : "text-white/70 hover:text-white"}`}>
                {link.label}
                <span className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
          {status !== "unauthenticated" && status !== "loading" ? (
            <button onClick={() => void logout()} className="text-xs uppercase tracking-[0.2em] text-gold/70 transition hover:text-gold">
              Log Out {user?.display_name ? `(${user.display_name})` : ""}
            </button>
          ) : (
            <Link href="/entry" className="text-xs uppercase tracking-[0.2em] text-gold/70 transition hover:text-gold">Enter</Link>
          )}
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={open} className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden">
          <span className={`h-px w-5 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>
      <div className={`overflow-hidden border-t border-gold/10 bg-navy/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="flex flex-col px-6 py-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-white/5 py-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:text-gold">
              {link.label}
            </Link>
          ))}
          {status !== "unauthenticated" && status !== "loading" ? (
            <button onClick={() => void logout()} className="border-b border-white/5 py-3 text-left text-xs uppercase tracking-[0.2em] text-gold/70 transition hover:text-gold">Log Out</button>
          ) : (
            <Link href="/entry" onClick={() => setOpen(false)} className="border-b border-white/5 py-3 text-xs uppercase tracking-[0.2em] text-gold/70">Enter</Link>
          )}
        </div>
      </div>
    </header>
  );
}
