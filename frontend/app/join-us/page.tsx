"use client";

import { useEffect, useState } from "react";
import { getJoinSections } from "@/lib/api/join";
import type { JoinSection } from "@/lib/api/types";
import { isSafeUrl } from "@/lib/safe-html";
import { EmptyState, ErrorState, LoadingSkeleton, PublicPageShell, TacticalCard } from "@/components/ui/states";

export default function JoinUsPage() {
  const [sections, setSections] = useState<JoinSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getJoinSections();
      setSections(data.sections || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load recruitment ledger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  return (
    <PublicPageShell eyebrow="Recruitment Ledger" title="Take Your Seat" intro="An invitation to enter the chamber, learn the language of strategy, and help maintain the society's archive of games and ideas.">
      {loading && <LoadingSkeleton />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && sections.length === 0 && <EmptyState title="Recruitment is quiet." body="No active recruitment sections are published right now. Check back when the next move begins." />}
      <div className="mt-10 grid gap-5">
        {sections.map((section, index) => (
          <TacticalCard key={section._id} className="grid gap-6 md:grid-cols-[120px_1fr_auto] md:items-center">
            <div className="font-serif text-5xl text-gold/35">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <h2 className="font-serif text-3xl text-white">{section.section_title || "Invitation"}</h2>
              <p className="mt-3 max-w-3xl whitespace-pre-line leading-7 text-white/66">{section.body_text}</p>
            </div>
            {section.cta_label && isSafeUrl(section.cta_url) && <a href={section.cta_url} target="_blank" rel="noreferrer" className="border border-gold px-5 py-3 text-center text-xs uppercase tracking-[0.2em] text-gold">{section.cta_label}</a>}
          </TacticalCard>
        ))}
      </div>
    </PublicPageShell>
  );
}
