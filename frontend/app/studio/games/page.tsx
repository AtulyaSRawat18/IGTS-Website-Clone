"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteGame, getActiveGames, toggleGame } from "@/lib/api/games";
import type { Game } from "@/lib/api/types";
import { StudioShell } from "@/components/studio/StudioShell";
import { EmptyState, ErrorState, LoadingSkeleton, StatusChip, TacticalCard } from "@/components/ui/states";
import { useSession } from "@/lib/session/use-session";

export default function StudioGamesPage() {
  const { user } = useSession();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = async () => { setLoading(true); setError(null); try { const data = await getActiveGames(); setGames((data.games || []).filter((game) => game.created_by?.user_id === user?.user_id)); } catch (err) { setError(err instanceof Error ? err.message : "Could not load games"); } finally { setLoading(false); } };
  useEffect(() => { if (user) void load(); }, [user]);
  return <StudioShell title="Game Lab Management" intro="Manage active experiments visible in the public lab. Hidden games require a future my-content listing endpoint."><Link href="/studio/games/new" className="inline-block bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy">Add Game</Link>{loading && <LoadingSkeleton />}{error && <ErrorState message={error} onRetry={load} />}{!loading && !error && games.length === 0 && <EmptyState title="No active games owned by you." body="Create a new experiment dossier for the public lab." actionHref="/studio/games/new" actionLabel="Add Game" />}<div className="mt-6 grid gap-4">{games.map((game) => <TacticalCard key={game._id} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h2 className="font-serif text-2xl text-white">{game.name}</h2><div className="mt-2 flex gap-2"><StatusChip>{game.difficulty || "Beginner"}</StatusChip><StatusChip tone="muted">{game.game_type || "Strategy"}</StatusChip></div></div><div className="flex flex-wrap gap-2"><Link href={`/game-lab/${game.slug}`} className="border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/70">Preview</Link><Link href={`/studio/games/${game._id}/edit`} className="border border-gold/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold">Edit</Link><button onClick={() => void toggleGame(game._id).then(load)} className="border border-gold/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold">Hide</button><button onClick={() => confirm("Delete this game?") && void deleteGame(game._id).then(load)} className="border border-crimson/50 px-3 py-2 text-xs uppercase tracking-[0.18em] text-red-200">Delete</button></div></TacticalCard>)}</div></StudioShell>;
}
