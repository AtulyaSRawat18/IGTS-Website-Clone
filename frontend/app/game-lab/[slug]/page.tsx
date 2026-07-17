"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGameBySlug } from "@/lib/api/games";
import type { Game } from "@/lib/api/types";
import { isSafeUrl } from "@/lib/safe-html";
import { ErrorState, LoadingSkeleton, PublicPageShell, StatusChip, TacticalCard } from "@/components/ui/states";

export default function GameDetailPage() {
  const params = useParams<{ slug: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getGameBySlug(params.slug);
        setGame(data.game);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Game not found");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [params.slug]);

  return (
    <PublicPageShell eyebrow="Experiment Dossier" title={game?.name || "Game"} intro={game?.tagline || "A strategic artefact from the IGTS lab."}>
      {loading && <LoadingSkeleton label="Loading game" />}
      {error && <ErrorState message={error} />}
      {game && !loading && !error && (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px]">
          <TacticalCard>
            <div className="flex flex-wrap gap-2"><StatusChip>{game.difficulty || "Beginner"}</StatusChip><StatusChip tone="muted">{game.game_type || "Game"}</StatusChip></div>
            <h2 className="mt-6 font-serif text-3xl text-white">What this teaches</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-white/70">{game.description || "Rules and learning objectives will be added by the society member who owns this experiment."}</p>
          </TacticalCard>
          <aside className="space-y-4">
            {isSafeUrl(game.play_url) && <a href={game.play_url} target="_blank" rel="noreferrer" className="block bg-gold px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy">Play</a>}
            <Link href="/game-lab" className="block border border-gold/35 px-5 py-3 text-center text-xs uppercase tracking-[0.2em] text-gold">Back to Lab</Link>
          </aside>
        </div>
      )}
    </PublicPageShell>
  );
}
