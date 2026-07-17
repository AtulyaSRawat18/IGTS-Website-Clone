"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBlog } from "@/lib/api/blogs";
import { StudioShell } from "@/components/studio/StudioShell";
import { TacticalCard } from "@/components/ui/states";

const categories = ["Game Theories", "Games", "State of the Art", "Research", "Studies", "CS/DSA"];

export default function NewBlogPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Game Theories", topic: "", header_image_url: "", content: "", tags: "", read_time_mins: "4", status: "draft" as "draft" | "published" });
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true); setError(null);
    try { const data = await createBlog({ ...form, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean), read_time_mins: Number(form.read_time_mins) }); router.push(`/studio/blogs/${data.blog._id}/edit`); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not save blog"); }
    finally { setSaving(false); }
  };
  return <StudioShell title="New Ledger Entry" intro="Save a draft or publish a strategic manuscript."><TacticalCard><form onSubmit={submit} className="grid gap-4"><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /><select className="border border-gold/20 bg-ink p-3 text-white" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((item) => <option key={item}>{item}</option>)}</select><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} /><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="Cover image URL" value={form.header_image_url} onChange={(e) => setForm({ ...form, header_image_url: e.target.value })} /><textarea className="min-h-64 border border-gold/20 bg-ink p-3 text-white" placeholder="Rich HTML content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required /><input className="border border-gold/20 bg-ink p-3 text-white" placeholder="Tags, comma separated" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} /><select className="border border-gold/20 bg-ink p-3 text-white" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}><option value="draft">Draft</option><option value="published">Published</option></select>{error && <p className="text-red-200">{error}</p>}<button disabled={saving} className="bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy disabled:opacity-50">{saving ? "Saving..." : "Save"}</button></form></TacticalCard></StudioShell>;
}

