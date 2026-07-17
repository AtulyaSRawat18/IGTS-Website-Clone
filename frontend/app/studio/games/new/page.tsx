"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createGame } from "@/lib/api/games";
import { StudioShell } from "@/components/studio/StudioShell";
import { TacticalCard } from "@/components/ui/states";

export default function NewGamePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", tagline: "", description: "", game_type: "Zero-Sum", difficulty: "Beginner", play_url: "", thumbnail_url: "", tags: "" });
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setSaving(true); setError(null); try { const data = await createGame({ ...form, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) }); router.push(`/studio/games/${data.game._id}/edit`); } catch (err) { setError(err instanceof Error ? err.message : "Could not save game"); } finally { setSaving(false); } };
  return <StudioShell title="Add Game" intro="Create a tactical dossier for the Game Lab."><TacticalCard><form onSubmit={submit} className="grid gap-4"><input required className="border border-gold/20 bg-ink p-3 text-white" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="Tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} /><textarea className="min-h-40 border border-gold/20 bg-ink p-3 text-white" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /><select className="border border-gold/20 bg-ink p-3 text-white" value={form.game_type} onChange={(e) => setForm({ ...form, game_type: e.target.value })}>{["Zero-Sum","Cooperative","Auction","Coordination"].map((item) => <option key={item}>{item}</option>)}</select><select className="border border-gold/20 bg-ink p-3 text-white" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>{["Beginner","Intermediate","Advanced"].map((item) => <option key={item}>{item}</option>)}</select><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="Play URL" value={form.play_url} onChange={(e) => setForm({ ...form, play_url: e.target.value })} /><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="Thumbnail URL" value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} /><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="Tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />{error && <p className="text-red-200">{error}</p>}<button disabled={saving} className="bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy disabled:opacity-50">{saving ? "Saving..." : "Save Game"}</button></form></TacticalCard></StudioShell>;
}
