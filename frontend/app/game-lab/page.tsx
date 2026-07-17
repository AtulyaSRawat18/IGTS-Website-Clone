"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getActiveGames } from "@/lib/api/games";
import type { Game } from "@/lib/api/types";
import { isSafeUrl } from "@/lib/safe-html";
import { EmptyState, ErrorState, LoadingSkeleton, PublicPageShell, StatusChip, TacticalCard } from "@/components/ui/states";

export default function GameLabPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState("all");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActiveGames();
      setGames(data.games || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load games");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);
  const difficulties = useMemo(() => ["all", ...Array.from(new Set(games.map((game) => game.difficulty).filter((item): item is string => Boolean(item))))], [games]);
  const visible = difficulty === "all" ? games : games.filter((game) => game.difficulty === difficulty);

  return (
    <PublicPageShell eyebrow="Experimental Sector" title="The Game Lab" intro="A tactical directory of games, simulations, auctions, coordination problems, and strategic experiments.">
      <div className="mt-10 flex flex-wrap gap-3">
        {difficulties.map((item) => <button key={item} onClick={() => setDifficulty(item)} className={`border px-4 py-2 text-xs uppercase tracking-[0.18em] ${difficulty === item ? "border-gold bg-gold/10 text-gold" : "border-white/12 text-white/60 hover:border-gold/40"}`}>{item}</button>)}
      </div>
      {loading && <LoadingSkeleton />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && visible.length === 0 && <EmptyState title="No active experiments." body="The lab has no active games in this classification yet." />}
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((game) => (
          <TacticalCard key={game._id} className="group relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(168,132,47,0.14),transparent_55%)]" />
            <div className="relative">
              <div className="mb-5 flex flex-wrap gap-2"><StatusChip>{game.difficulty || "Initiate"}</StatusChip><StatusChip tone="muted">{game.game_type || "Strategy"}</StatusChip></div>
              <h2 className="font-serif text-3xl text-white">{game.name}</h2>
              <p className="mt-3 text-sm leading-6 text-white/62">{game.tagline || game.description || "A strategic experiment from the IGTS table."}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/game-lab/${game.slug}`} className="border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold">View Details</Link>
                {isSafeUrl(game.play_url) && <a href={game.play_url} target="_blank" rel="noreferrer" className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy">Play</a>}
              </div>
            </div>
          </TacticalCard>
        ))}
      </div>
    </PublicPageShell>
  );
}

