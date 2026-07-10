import Link from "next/link";
import MembersAces from "@/components/MembersAces";

export default function MembersPage() {
  return (
    <main className="relative min-h-screen bg-navy px-6 pb-24 pt-32 md:px-8">
      {/* Ambient background glow, consistent with the home page's dark/dramatic tone */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(168,132,47,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-6 bg-gold/40" />
          Our Members
          <span className="h-px w-6 bg-gold/40" />
        </p>

        <h1 className="font-serif text-4xl font-semibold text-white md:text-6xl">
          Four Years, One Hand
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base text-white/70 md:text-lg">
          Each ace represents a year at IGTS. Pick one to meet the people
          behind it.
        </p>

        <div className="mt-16 md:mt-20">
          <MembersAces />
        </div>

        <Link
          href="/"
          className="mt-20 inline-block text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-gold"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
