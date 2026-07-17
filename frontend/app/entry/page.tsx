"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import KnightScene from "@/components/KnightScene";
import Placard from "@/components/Placard";
import { enterAsVisitor, memberLogin } from "@/lib/api/auth";
import { useSession } from "@/lib/session/use-session";

function safeRedirect(value: string | null, fallback: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

export default function EntryPage() {
  const searchParams = useSearchParams();
  const { refreshSession } = useSession();
  const [socId, setSocId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"visitor" | "member" | null>(null);

  const next = searchParams.get("next");

  const handleVisitorLogin = async () => {
    setLoading("visitor");
    setError(null);
    try {
      await enterAsVisitor();
      await refreshSession();
      window.location.href = safeRedirect(next, "/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to enter as visitor");
    } finally {
      setLoading(null);
    }
  };

  const handleMemberLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading("member");
    setError(null);
    try {
      await memberLogin({ soc_id: socId, password });
      await refreshSession();
      window.location.href = safeRedirect(next, "/studio");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid member credentials");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-navy text-foreground">
      <KnightScene />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_50%_12%,rgba(168,132,47,0.12),transparent_34%),linear-gradient(to_bottom,rgba(5,6,10,0.1),rgba(5,6,10,0.55))]" />

      <div id="home-scroll-container" className="relative z-10 h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center">
          <Placard eyebrow="Entry Protocol" wide>
            <h1 className="font-serif text-4xl font-semibold text-white md:text-7xl">The Grandmaster&apos;s Study</h1>
            <p className="mx-auto mt-6 max-w-2xl text-white/75 md:text-lg">
              Before the archive opens, choose your position at the table: observer, strategist, or keeper of the society instruments.
            </p>
            <a href="#entry-gate" className="mt-10 inline-block border border-gold/40 px-6 py-3 text-xs uppercase tracking-[0.22em] text-gold transition hover:bg-gold/10">
              Approach the Board
            </a>
          </Placard>
        </section>

        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center">
          <Placard eyebrow="Two Pathways" wide>
            <div className="grid gap-8 text-left md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Visitor</p>
                <h2 className="mt-3 font-serif text-3xl text-white">Observe the Game</h2>
                <p className="mt-4 leading-7 text-white/68">Read published Ledger entries, inspect public experiments, meet the roster, and follow recruitment signals without management controls.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Member</p>
                <h2 className="mt-3 font-serif text-3xl text-white">Command the Board</h2>
                <p className="mt-4 leading-7 text-white/68">Enter with your society ID to access the Studio, create records, maintain your profile, and manage the resources you own.</p>
              </div>
            </div>
          </Placard>
        </section>

        <section id="entry-gate" className="relative flex min-h-screen snap-start snap-always items-center justify-center overflow-hidden px-6 py-28">
          <img src="/entry-chamber.png" alt="Chess pieces suspended over a cosmic game board" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(5,6,10,0.18),rgba(5,6,10,0.82)_66%,#05060a_100%)]" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy via-navy/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#05060a] via-[#05060a]/80 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <div className="mb-8 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-gold">Final Move</p>
              <h2 className="mt-3 font-serif text-4xl text-white md:text-6xl">Enter the Chamber</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">The board is set. Choose your role and step into IGTS.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-gold/25 bg-[#05060a]/78 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.28em] text-gold">Visitor Pathway</p>
                <h3 className="mt-4 font-serif text-3xl text-white">Observe the Archive</h3>
                <p className="mt-4 leading-7 text-white/66">Enter as a guest. You can read, inspect, and explore, but the command instruments remain locked.</p>
                <button onClick={handleVisitorLogin} disabled={loading !== null} className="mt-8 w-full border border-gold/45 bg-gold/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/20 disabled:opacity-50">
                  {loading === "visitor" ? "Opening..." : "Enter as Visitor"}
                </button>
              </div>

              <div className="border border-gold/25 bg-[#05060a]/82 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.48)] backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.28em] text-gold">Member Login</p>
                <h3 className="mt-4 font-serif text-3xl text-white">Command Access</h3>
                <form onSubmit={handleMemberLogin} className="mt-5 grid gap-4">
                  {error && <div className="border border-crimson/50 bg-crimson/20 p-3 text-sm text-red-200">{error}</div>}
                  <label className="grid gap-2 text-left">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/55">Society ID</span>
                    <input type="text" value={socId} onChange={(event) => setSocId(event.target.value)} className="border border-gold/20 bg-ink/70 px-4 py-2 text-white outline-none transition-colors focus:border-gold/70" placeholder="e.g. IGTS-001" required />
                  </label>
                  <label className="grid gap-2 text-left">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/55">Password</span>
                    <span className="flex border border-gold/20 bg-ink/70 focus-within:border-gold/70">
                      <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="min-w-0 flex-1 bg-transparent px-4 py-2 text-white outline-none" required />
                      <button type="button" onClick={() => setShowPassword((value) => !value)} className="px-3 text-xs uppercase tracking-[0.16em] text-gold/75">{showPassword ? "Hide" : "Show"}</button>
                    </span>
                  </label>
                  <button type="submit" disabled={loading !== null} className="mt-2 w-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:bg-gold-light disabled:opacity-50">
                    {loading === "member" ? "Authenticating..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
