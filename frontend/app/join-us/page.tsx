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
      <section className="relative overflow-hidden rounded-[10px] border border-gold/30 bg-[#070914] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <img src="/recruitment/coming-soon.png" alt="Recruitment coming soon" className="h-[360px] w-full object-cover object-center opacity-90 md:h-[500px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.12),transparent_26%),linear-gradient(90deg,rgba(4,6,14,0.82),rgba(4,6,14,0.18)_48%,rgba(4,6,14,0.78))]" />
        <div className="absolute inset-x-5 bottom-6 md:inset-x-10 md:bottom-10">
          <div className="max-w-4xl -rotate-2">
            <p className="inline-block border-4 border-black bg-[#ffdf3b] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-black shadow-[6px_6px_0_#000]">
              IGTS NSUT
            </p>
            <h2 className="mt-5 max-w-3xl font-black uppercase leading-[0.86] tracking-normal text-white [font-family:Impact,'Arial_Black',sans-serif] [text-shadow:5px_5px_0_#000,9px_9px_0_#d11847] text-[clamp(3rem,9vw,7.8rem)]">
              Recruitment coming soon!!
            </h2>
          </div>
        </div>
      </section>
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
