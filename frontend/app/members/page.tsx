"use client";

import { useEffect, useMemo, useState } from "react";
import { getMembers } from "@/lib/api/members";
import type { MemberProfile } from "@/lib/api/types";
import { isSafeUrl } from "@/lib/safe-html";
import { EmptyState, ErrorState, LoadingSkeleton, PublicPageShell, StatusChip, TacticalCard } from "@/components/ui/states";

const suitMap: Record<string, string> = {
  "Core Committee": "Spades",
  "Third Year": "Hearts",
  "Second Year": "Diamonds",
  "First Year": "Clubs",
  Alumni: "Archive",
};

export default function MembersPage() {
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState("all");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMembers();
      setMembers(data.members || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load roster");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);
  const years = useMemo(() => ["all", ...Array.from(new Set(members.map((member) => member.year).filter((item): item is string => Boolean(item))))], [members]);
  const visible = year === "all" ? members : members.filter((member) => member.year === year);

  return (
    <PublicPageShell eyebrow="Society Roster" title="The Players" intro="A ceremonial deck of members, committees, and strategic roles inside IGTS.">
      <div className="mt-10 flex flex-wrap gap-3">
        {years.map((item) => <button key={item} onClick={() => setYear(item)} className={`border px-4 py-2 text-xs uppercase tracking-[0.18em] ${year === item ? "border-gold bg-gold/10 text-gold" : "border-white/12 text-white/60 hover:border-gold/40"}`}>{item}</button>)}
      </div>
      {loading && <LoadingSkeleton />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && visible.length === 0 && <EmptyState title="No cards on the table." body="The society roster has not been published yet." />}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((member) => (
          <TacticalCard key={member._id} className="relative overflow-hidden">
            <div className="absolute right-4 top-4 text-5xl text-gold/10">{member.year === "First Year" ? "C" : member.year === "Second Year" ? "D" : member.year === "Third Year" ? "H" : "S"}</div>
            <div className="relative">
              <div className="mb-5 h-28 w-28 border border-gold/30 bg-white/5 object-cover">
                {member.pfp_url ? <img src={member.pfp_url} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center font-serif text-4xl text-gold">{member.display_name.slice(0, 1)}</div>}
              </div>
              <StatusChip>{member.year ? suitMap[member.year] || member.year : "Member"}</StatusChip>
              <h2 className="mt-4 font-serif text-3xl text-white">{member.display_name}</h2>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-gold/70">{member.designation || "IGTS Member"}</p>
              <p className="mt-4 min-h-20 text-sm leading-6 text-white/62">{member.bio || "A player in the society's strategic formation."}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {isSafeUrl(member.linkedin_url) && <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.2em] text-gold">LinkedIn</a>}
                {isSafeUrl(member.personal_site) && <a href={member.personal_site} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.2em] text-gold">Personal Site</a>}
              </div>
            </div>
          </TacticalCard>
        ))}
      </div>
    </PublicPageShell>
  );
}

