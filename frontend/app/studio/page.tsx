import Link from "next/link";
import { StudioShell } from "@/components/studio/StudioShell";
import { TacticalCard } from "@/components/ui/states";

const actions = [
  { href: "/studio/blogs/new", label: "Write Blog", body: "Draft a strategic note for The Ledger." },
  { href: "/studio/games/new", label: "Add Game", body: "Create a new Game Lab dossier." },
  { href: "/studio/profile", label: "Edit Profile", body: "Maintain your society card." },
  { href: "/studio/join/new", label: "Add Join Section", body: "Publish recruitment copy." },
];

export default function StudioPage() {
  return (
    <StudioShell title="Command Table" intro="A quiet control room for maintaining the public chamber without dragging admin controls into the visitor experience.">
      <div className="grid gap-5 md:grid-cols-2">
        {actions.map((action) => (
          <TacticalCard key={action.href}>
            <h2 className="font-serif text-3xl text-white">{action.label}</h2>
            <p className="mt-3 text-white/62">{action.body}</p>
            <Link href={action.href} className="mt-6 inline-block border border-gold px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold">Open</Link>
          </TacticalCard>
        ))}
      </div>
    </StudioShell>
  );
}
