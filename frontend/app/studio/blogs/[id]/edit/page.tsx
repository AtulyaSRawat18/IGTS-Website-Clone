"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { updateBlog } from "@/lib/api/blogs";
import { StudioShell } from "@/components/studio/StudioShell";
import { TacticalCard } from "@/components/ui/states";

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true); setError(null);
    try { await updateBlog(params.id, { ...(title ? { title } : {}), ...(content ? { content } : {}) }); router.push("/studio/blogs"); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not update blog. You may not own this record."); }
    finally { setSaving(false); }
  };
  return <StudioShell title="Edit Ledger Entry" intro="Ownership is checked by the backend before saving. Leave a field blank to keep it unchanged."><TacticalCard><form onSubmit={submit} className="grid gap-4"><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="New title" value={title} onChange={(e) => setTitle(e.target.value)} /><textarea className="min-h-64 border border-gold/20 bg-ink p-3 text-white" placeholder="Replacement rich HTML content" value={content} onChange={(e) => setContent(e.target.value)} />{error && <p className="text-red-200">{error}</p>}<button disabled={saving} className="bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button></form></TacticalCard></StudioShell>;
}
