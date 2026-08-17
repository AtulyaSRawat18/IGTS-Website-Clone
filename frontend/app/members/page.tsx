"use client";

import { useEffect, useMemo, useState } from "react";
import { getMembers } from "@/lib/api/members";
import type { MemberProfile } from "@/lib/api/types";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/states";
import { MembersHouses } from "@/components/members/MembersHouses";
import { fallbackMembers, toDisplayMember } from "@/components/members/memberHousesData";

export default function MembersPage() {
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const displayMembers = useMemo(() => {
    const live = members.map(toDisplayMember);
    const liveNames = new Set(live.map((member) => member.display_name.trim().toLowerCase()));
    const supplemental = fallbackMembers().filter((member) => !liveNames.has(member.display_name.trim().toLowerCase()));
    return [...live, ...supplemental];
  }, [members]);

  return (
    <main className="min-h-screen bg-[#0a0c16] pb-24 pt-[69px] text-[#f4efe4]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(168,132,47,0.16),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(111,88,201,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,auto,34px_34px]" />
      <section className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <header className="border-y border-[#a8842f]/35 py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9a969]">Members / Houses / Society Archive</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <h1 className="font-serif text-6xl font-semibold leading-none tracking-tight md:text-8xl">Four Years.</h1>
              <h2 className="font-serif text-5xl font-semibold leading-none tracking-tight text-[#d1c5b2]/72 md:text-7xl">One House.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#d1c5b2]/72">Meet the people behind IGTS through a year-wise house archive: a collectible deck that opens into the members, roles, and voices shaping the society.</p>
          </div>
        </header>

        {loading && <LoadingSkeleton label="Preparing the house deck..." />}
        {error && <ErrorState message={error} onRetry={load} />}
        {!loading && !error && !displayMembers.length && <EmptyState title="No cards on the table." body="The society roster has not been published yet." />}
        {!loading && !error && !!displayMembers.length && <MembersHouses members={displayMembers} />}
      </section>
    </main>
  );
}
