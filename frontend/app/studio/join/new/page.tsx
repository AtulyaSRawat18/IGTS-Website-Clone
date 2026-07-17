"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createJoinSection } from "@/lib/api/join";
import { StudioShell } from "@/components/studio/StudioShell";
import { TacticalCard } from "@/components/ui/states";

export default function NewJoinSectionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ section_title: "", body_text: "", cta_label: "", cta_url: "", display_order: "0" });
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setSaving(true); setError(null); try { const data = await createJoinSection({ ...form, display_order: Number(form.display_order) }); router.push(`/studio/join/${data.section._id}/edit`); } catch (err) { setError(err instanceof Error ? err.message : "Could not save section"); } finally { setSaving(false); } };
  return <StudioShell title="Add Join Section" intro="Create an invitation placard for the recruitment page."><TacticalCard><form onSubmit={submit} className="grid gap-4"><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="Section title" value={form.section_title} onChange={(e) => setForm({ ...form, section_title: e.target.value })} /><textarea className="min-h-40 border border-gold/20 bg-ink p-3 text-white" placeholder="Body text" value={form.body_text} onChange={(e) => setForm({ ...form, body_text: e.target.value })} /><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="CTA label" value={form.cta_label} onChange={(e) => setForm({ ...form, cta_label: e.target.value })} /><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="CTA URL" value={form.cta_url} onChange={(e) => setForm({ ...form, cta_url: e.target.value })} /><input className="border border-gold/20 bg-ink p-3 text-white" type="number" placeholder="Display order" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} />{error && <p className="text-red-200">{error}</p>}<button disabled={saving} className="bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy disabled:opacity-50">{saving ? "Saving..." : "Save Section"}</button></form></TacticalCard></StudioShell>;
}
