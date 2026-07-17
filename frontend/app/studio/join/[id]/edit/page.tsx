"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { updateJoinSection } from "@/lib/api/join";
import { StudioShell } from "@/components/studio/StudioShell";
import { TacticalCard } from "@/components/ui/states";

export default function EditJoinSectionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [sectionTitle, setSectionTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setSaving(true); setError(null); try { await updateJoinSection(params.id, { ...(sectionTitle ? { section_title: sectionTitle } : {}), ...(bodyText ? { body_text: bodyText } : {}) }); router.push("/studio/join"); } catch (err) { setError(err instanceof Error ? err.message : "Could not update section. You may not own this record."); } finally { setSaving(false); } };
  return <StudioShell title="Edit Join Section" intro="Ownership is checked by the backend before saving. Leave a field blank to keep it unchanged."><TacticalCard><form onSubmit={submit} className="grid gap-4"><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="New section title" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} /><textarea className="min-h-40 border border-gold/20 bg-ink p-3 text-white" placeholder="New body text" value={bodyText} onChange={(e) => setBodyText(e.target.value)} />{error && <p className="text-red-200">{error}</p>}<button disabled={saving} className="bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button></form></TacticalCard></StudioShell>;
}
