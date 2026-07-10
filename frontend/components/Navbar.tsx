"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/members", label: "Members" },
  { href: "/game-lab", label: "Game Lab" },
  { href: "/join-us", label: "Join Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = document.getElementById("home-scroll-container");
    const target = scrollContainer ?? window;

    const onScroll = () => {
      const top =
        scrollContainer instanceof HTMLElement
          ? scrollContainer.scrollTop
          : window.scrollY;
      setScrolled(top > 8);
    };

    target.addEventListener("scroll", onScroll);
    onScroll();
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-gold/15 bg-navy/90 backdrop-blur-md"
          : "border-transparent bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-[0.35em] text-white"
        >
          IGTS
          <span className="ml-3 hidden font-normal tracking-[0.2em] text-white/40 sm:inline">
            Indian Game Theory Society
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-xs uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-white transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-white transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-gold/10 bg-navy/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
