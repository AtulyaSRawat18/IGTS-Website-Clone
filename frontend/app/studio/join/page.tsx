"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteJoinSection, getJoinSections, toggleJoinSection } from "@/lib/api/join";
import type { JoinSection } from "@/lib/api/types";
import { StudioShell } from "@/components/studio/StudioShell";
import { EmptyState, ErrorState, LoadingSkeleton, TacticalCard } from "@/components/ui/states";
import { useSession } from "@/lib/session/use-session";

export default function StudioJoinPage() {
  const { user } = useSession();
  const [sections, setSections] = useState<JoinSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = async () => { setLoading(true); setError(null); try { const data = await getJoinSections(); setSections((data.sections || []).filter((section) => section.created_by?.user_id === user?.user_id)); } catch (err) { setError(err instanceof Error ? err.message : "Could not load join sections"); } finally { setLoading(false); } };
  useEffect(() => { if (user) void load(); }, [user]);
  return <StudioShell title="Recruitment Ledger" intro="Manage active recruitment sections owned by you. Hidden sections require a future my-content listing endpoint."><Link href="/studio/join/new" className="inline-block bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy">Add Section</Link>{loading && <LoadingSkeleton />}{error && <ErrorState message={error} onRetry={load} />}{!loading && !error && sections.length === 0 && <EmptyState title="No active sections owned by you." body="Add a recruitment section for the Join Us page." actionHref="/studio/join/new" actionLabel="Add Section" />}<div className="mt-6 grid gap-4">{sections.map((section) => <TacticalCard key={section._id} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h2 className="font-serif text-2xl text-white">{section.section_title || "Recruitment section"}</h2><p className="mt-2 line-clamp-2 text-white/60">{section.body_text}</p></div><div className="flex flex-wrap gap-2"><Link href={`/studio/join/${section._id}/edit`} className="border border-gold/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold">Edit</Link><button onClick={() => void toggleJoinSection(section._id).then(load)} className="border border-gold/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold">Toggle</button><button onClick={() => confirm("Delete this section?") && void deleteJoinSection(section._id).then(load)} className="border border-crimson/50 px-3 py-2 text-xs uppercase tracking-[0.18em] text-red-200">Delete</button></div></TacticalCard>)}</div></StudioShell>;
}
