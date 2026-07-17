"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
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
    <main className="relative min-h-screen overflow-hidden bg-[#05060a] px-6 py-10 text-foreground">
      <img src="/entry-chamber.png" alt="Chess pieces suspended over a cosmic game board" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(5,6,10,0.18),rgba(5,6,10,0.78)_58%,#05060a_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,6,10,0.38),rgba(5,6,10,0.2)_35%,rgba(5,6,10,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(168,132,47,0.11)_1px,transparent_1px)] bg-[length:34px_34px] opacity-45" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center gap-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="relative mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-gold/40 bg-white shadow-[0_0_80px_rgba(168,132,47,0.34)] md:h-40 md:w-40">
            <img src="/igts-logo.jpg" alt="Indian Game Theory Society NSUT logo" className="h-full w-full rounded-full object-cover" />
            <span className="absolute inset-[-10px] rounded-full border border-gold/20" />
          </div>
          <p className="text-xs uppercase tracking-[0.45em] text-gold">IGTS NSUT</p>
          <h1 className="mt-4 font-serif text-4xl text-white md:text-7xl">Enter the Chamber</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
            The public website opens only after you take a seat at the board. Enter as a visitor to explore, or sign in as a society member to command the Studio.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-5xl gap-5 md:grid-cols-2">
          <div className="border border-gold/25 bg-[#05060a]/78 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Visitor Pathway</p>
            <h2 className="mt-4 font-serif text-3xl text-white">Observe the Archive</h2>
            <p className="mt-4 leading-7 text-white/66">Read the Ledger, inspect active games, meet the roster, and follow recruitment signals without management controls.</p>
            <button onClick={handleVisitorLogin} disabled={loading !== null} className="mt-8 w-full border border-gold/45 bg-gold/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold/20 disabled:opacity-50">
              {loading === "visitor" ? "Opening..." : "Enter as Visitor"}
            </button>
          </div>

          <div className="border border-gold/25 bg-[#05060a]/82 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.58)] backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Member Login</p>
            <h2 className="mt-4 font-serif text-3xl text-white">Command Access</h2>
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
      </section>
    </main>
  );
}
