"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/members", label: "Members" },
  { href: "/game-lab", label: "Game Lab" },
  { href: "/join-us", label: "Join Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-8 md:py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-navy/60 px-5 py-2.5 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-[0.15em] text-white"
        >
          <span className="text-gold">IGTS</span>
          <span className="hidden text-white/50 sm:inline">
            Indian Game Theory Society
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-8 w-8 items-center justify-center text-white md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 bg-white" />
            <span className="h-0.5 w-5 bg-white" />
            <span className="h-0.5 w-5 bg-white" />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-white/10 bg-navy/90 p-3 backdrop-blur-md md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
