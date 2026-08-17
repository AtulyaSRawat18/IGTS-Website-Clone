"use client";

import { useMemo, useState } from "react";
import { isSafeUrl } from "@/lib/safe-html";
import type { DisplayMember, HouseConfig, HouseId } from "./memberHousesData";
import { houses } from "./memberHousesData";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "I";
}

function HouseCard({ house, count, selected, index, onSelect }: { house: HouseConfig; count: number; selected: boolean; index: number; onSelect: () => void }) {
  const rotations = [-8, -2, 3, 8];
  const translate = selected ? "translate-y-[-18px] scale(1.04)" : `translate-y(${Math.abs(index - 1.5) * 12}px) rotate(${rotations[index]}deg)`;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex min-h-[440px] w-[270px] shrink-0 flex-col overflow-hidden rounded-[22px] border bg-[#070910] p-4 text-left text-[#f4efe4] shadow-[0_28px_70px_rgba(0,0,0,0.42)] transition duration-500 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a969] md:w-[292px] ${selected ? "z-20 border-[#c9a969]" : "border-[#a8842f]/24"}`}
      style={{ transform: translate }}
      aria-pressed={selected}
    >
      <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(135deg,#fff_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative flex items-start justify-between px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d1c5b2]/48">
        <span>{house.index}</span>
        <span style={{ color: house.accent }}>House</span>
      </div>
      <div className="relative mt-5 flex flex-1 flex-col rounded-[18px] border border-[#c9a969]/22 bg-[#f8f5ed] p-3 text-[#0a0c16] shadow-[inset_0_0_0_1px_rgba(10,12,22,0.08)]">
        <div className="flex items-center justify-between font-serif text-3xl leading-none" style={{ color: house.accent }}>
          <span>{house.roman}</span>
          <span>{house.symbol}</span>
        </div>
        <div className="my-4 flex flex-1 items-center justify-center overflow-hidden rounded-[14px] border border-[#0a0c16]/10 bg-white">
          <img src={house.cardImage} alt={`${house.name} card`} className="h-full max-h-[245px] w-full object-contain p-2 transition duration-500 group-hover:scale-[1.04]" />
        </div>
        <div className="flex rotate-180 items-center justify-between font-serif text-3xl leading-none" style={{ color: house.accent }}>
          <span>{house.roman}</span>
          <span>{house.symbol}</span>
        </div>
      </div>
      <div className="relative mt-5">
        <h2 className="font-serif text-3xl font-semibold leading-none">{house.name}</h2>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d1c5b2]/48">{house.yearLabel}</p>
        <p className="mt-4 font-serif text-xl italic leading-tight text-[#d1c5b2]/74">&ldquo;{house.motto}&rdquo;</p>
      </div>
      <div className="relative mt-5 flex items-end justify-between border-t border-[#a8842f]/20 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d1c5b2]/55">{count} members</span>
        <span className="translate-x-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">View House</span>
      </div>
    </button>
  );
}

function HouseDeck({ selectedHouse, counts, onSelect }: { selectedHouse: HouseId; counts: Record<HouseId, number>; onSelect: (house: HouseId) => void }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-8 pt-6 md:mx-0 md:overflow-visible md:px-0">
      <div className="flex min-w-max items-end justify-start gap-4 md:min-w-0 md:justify-center md:-space-x-10">
        {houses.map((house, index) => (
          <HouseCard key={house.id} house={house} index={index} count={counts[house.id]} selected={selectedHouse === house.id} onSelect={() => onSelect(house.id)} />
        ))}
      </div>
    </div>
  );
}

function HouseNavigation({ selectedHouse, onSelect }: { selectedHouse: HouseId; onSelect: (house: HouseId) => void }) {
  return (
    <nav className="sticky top-[69px] z-20 -mx-5 mt-10 overflow-x-auto border-y border-[#a8842f]/18 bg-[#0a0c16]/92 px-5 py-3 backdrop-blur md:mx-0">
      <div className="mx-auto flex w-max min-w-full justify-center gap-3">
        {houses.map((house) => (
          <button key={house.id} type="button" onClick={() => onSelect(house.id)} className={`border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a969] ${selectedHouse === house.id ? "border-[#c9a969] bg-[#c9a969] text-[#0a0c16]" : "border-[#a8842f]/18 text-[#d1c5b2]/60 hover:border-[#c9a969] hover:text-[#c9a969]"}`}>
            {house.roman} {house.yearLabel}
          </button>
        ))}
      </div>
    </nav>
  );
}

function HouseHeader({ house, count }: { house: HouseConfig; count: number }) {
  return (
    <header className="mt-10 grid gap-8 border-b border-[#a8842f]/35 pb-8 lg:grid-cols-[220px_1fr_220px] lg:items-end">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1c5b2]/45">{house.index}</p>
        <p className="mt-4 font-serif text-8xl leading-none" style={{ color: house.accent }}>{house.roman}</p>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: house.accent }}>{house.yearLabel}</p>
        <h2 className="mt-3 font-serif text-5xl font-semibold leading-none tracking-tight md:text-7xl">{house.name}</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#d1c5b2]/70">{house.description}</p>
      </div>
      <div className="border-l-4 bg-[#0c0e18]/78 p-5" style={{ borderColor: house.accent }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d1c5b2]/45">Members</p>
        <p className="mt-2 font-serif text-5xl font-semibold">{count}</p>
        <p className="mt-2 text-sm leading-6 text-[#d1c5b2]/62">{house.motto}</p>
      </div>
    </header>
  );
}

function MemberSearch({ query, onQuery, filters, activeFilter, onFilter }: { query: string; onQuery: (value: string) => void; filters: string[]; activeFilter: string; onFilter: (value: string) => void }) {
  return (
    <div className="mt-8 grid gap-4 border-b border-[#a8842f]/18 pb-6 lg:grid-cols-[1fr_auto] lg:items-center">
      <label className="block">
        <span className="sr-only">Search members</span>
        <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search members..." className="w-full border border-[#a8842f]/18 bg-white/[0.04] px-4 py-3 text-sm text-[#f4efe4] outline-none transition placeholder:text-[#d1c5b2]/35 focus:border-[#c9a969]" />
      </label>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button key={filter} type="button" onClick={() => onFilter(filter)} className={`border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${activeFilter === filter ? "border-[#c9a969] bg-[#c9a969] text-[#0a0c16]" : "border-[#a8842f]/18 text-[#d1c5b2]/60 hover:border-[#c9a969]"}`}>{filter}</button>
        ))}
      </div>
    </div>
  );
}

function MemberCard({ member, index, onOpen }: { member: DisplayMember; index: number; onOpen: () => void }) {
  const tall = index % 5 === 0;
  return (
    <button type="button" onClick={onOpen} className={`group flex flex-col overflow-hidden border border-[#a8842f]/18 bg-[#0c0e18]/75 text-left transition duration-300 hover:-translate-y-1 hover:border-[#c9a969] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a969] ${tall ? "md:row-span-2" : ""}`}>
      <div className={`relative overflow-hidden bg-[#171923] ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        {member.pfp_url ? <img src={member.pfp_url} alt={member.display_name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(168,132,47,.32),transparent_34%),linear-gradient(135deg,#222431,#0d0f18)] font-serif text-6xl text-[#f4efe4]">{initials(member.display_name)}</div>}
        <span className="absolute right-4 top-4 bg-[#c9a969] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a0c16]">{member.year}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d1c5b2]/45">{member.designation || "IGTS Member"}</p>
        <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight">{member.display_name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#d1c5b2]/62">{member.bio || "A player in the society's strategic formation."}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d1c5b2]/45">
          <span>{member.houseName}</span>
          <span className="translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">Profile</span>
        </div>
      </div>
    </button>
  );
}

function MemberProfile({ member, onClose }: { member: DisplayMember | null; onClose: () => void }) {
  if (!member) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${member.display_name} profile`}>
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close profile" />
      <aside className="relative ml-auto flex h-full max-w-xl flex-col overflow-y-auto border border-[#a8842f]/22 bg-[#0a0c16] p-6 text-[#f4efe4] shadow-2xl md:p-8">
        <button type="button" onClick={onClose} className="self-end border border-[#a8842f]/22 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d1c5b2]/65">Close</button>
        <div className="mt-6 aspect-[4/3] overflow-hidden bg-[#171923]">
          {member.pfp_url ? <img src={member.pfp_url} alt={member.display_name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center font-serif text-8xl text-[#f4efe4]">{initials(member.display_name)}</div>}
        </div>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9a969]">{member.houseName} / {member.year}</p>
        <h2 className="mt-3 font-serif text-5xl font-semibold leading-none">{member.display_name}</h2>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#d1c5b2]/50">{member.designation || "IGTS Member"}</p>
        <p className="mt-7 text-lg leading-8 text-[#d1c5b2]/68">{member.bio || "A member of the IGTS house archive."}</p>
        <div className="mt-8 flex flex-wrap gap-2">{member.interests.map((interest) => <span key={interest} className="border border-[#a8842f]/18 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d1c5b2]/62">{interest}</span>)}</div>
        <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a969]">
          {isSafeUrl(member.linkedin_url) && <a href={member.linkedin_url} target="_blank" rel="noreferrer">LinkedIn</a>}
          {isSafeUrl(member.personal_site) && <a href={member.personal_site} target="_blank" rel="noreferrer">Personal Site</a>}
          {member.show_email && member.email && <a href={`mailto:${member.email}`}>Email</a>}
        </div>
      </aside>
    </div>
  );
}

export function MembersHouses({ members }: { members: DisplayMember[] }) {
  const [selectedHouse, setSelectedHouse] = useState<HouseId>("second-year");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [openMember, setOpenMember] = useState<DisplayMember | null>(null);

  const counts = useMemo(() => houses.reduce((acc, house) => ({ ...acc, [house.id]: members.filter((member) => member.house === house.id).length }), {} as Record<HouseId, number>), [members]);
  const house = houses.find((item) => item.id === selectedHouse) || houses[0];
  const houseMembers = members.filter((member) => member.house === selectedHouse);
  const filters = useMemo(() => ["All", ...Array.from(new Set(houseMembers.flatMap((member) => member.interests).filter(Boolean))).slice(0, 6)], [houseMembers]);
  const visible = houseMembers.filter((member) => {
    const haystack = `${member.display_name} ${member.designation || ""} ${member.year || ""} ${member.houseName} ${member.bio || ""} ${member.interests.join(" ")}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase()) && (filter === "All" || member.interests.includes(filter));
  });

  return (
    <div>
      <HouseDeck selectedHouse={selectedHouse} counts={counts} onSelect={(value) => { setSelectedHouse(value); setFilter("All"); setQuery(""); }} />
      <HouseNavigation selectedHouse={selectedHouse} onSelect={(value) => { setSelectedHouse(value); setFilter("All"); setQuery(""); }} />
      <section className="transition duration-500">
        <HouseHeader house={house} count={houseMembers.length} />
        <MemberSearch query={query} onQuery={setQuery} filters={filters} activeFilter={filter} onFilter={setFilter} />
        <div className="mt-8 grid auto-rows-auto gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((member, index) => <MemberCard key={member._id} member={member} index={index} onOpen={() => setOpenMember(member)} />)}
        </div>
        {!visible.length && <div className="mt-8 border border-[#a8842f]/18 bg-white/[0.04] p-8 text-center text-[#d1c5b2]/55">No members match this search inside {house.name}.</div>}
      </section>
      <MemberProfile member={openMember} onClose={() => setOpenMember(null)} />
    </div>
  );
}
