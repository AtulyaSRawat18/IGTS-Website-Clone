"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPublishedBlogs } from "@/lib/api/blogs";
import type { Blog } from "@/lib/api/types";
import { EmptyState, ErrorState, LoadingSkeleton, PublicPageShell, StatusChip, TacticalCard } from "@/components/ui/states";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("all");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPublishedBlogs();
      setBlogs(data.blogs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the Ledger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);
  const categories = useMemo(() => ["all", ...Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean)))], [blogs]);
  const visible = category === "all" ? blogs : blogs.filter((blog) => blog.category === category);
  const featured = visible[0];
  const rest = featured ? visible.slice(1) : visible;

  return (
    <PublicPageShell eyebrow="Archive Sector I" title="The Ledger" intro="A living archive of strategic thought: games, markets, political choices, mechanisms, and the curious failures of rational people.">
      <div className="mt-10 flex flex-wrap gap-3">
        {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`border px-4 py-2 text-xs uppercase tracking-[0.18em] ${category === item ? "border-gold bg-gold/10 text-gold" : "border-white/12 text-white/60 hover:border-gold/40"}`}>{item}</button>)}
      </div>
      {loading && <LoadingSkeleton />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && visible.length === 0 && <EmptyState title="The archive is quiet." body="No published articles are available for this category yet." />}
      {featured && (
        <TacticalCard className="mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <StatusChip>{featured.category}</StatusChip>
            <h2 className="mt-5 font-serif text-4xl text-white">{featured.title}</h2>
            <p className="mt-4 line-clamp-3 text-white/68">{featured.content.replace(/<[^>]*>/g, "").slice(0, 220)}...</p>
            <div className="mt-5 flex flex-wrap gap-2">{featured.tags?.map((tag) => <StatusChip key={tag} tone="muted">{tag}</StatusChip>)}</div>
            <Link href={`/blog/${featured.slug}`} className="mt-7 inline-block bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy">Read Article</Link>
          </div>
          <div className="min-h-64 border border-gold/15 bg-[radial-gradient(circle_at_center,rgba(168,132,47,0.18),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,22px_22px]" />
        </TacticalCard>
      )}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {rest.map((blog, index) => (
          <TacticalCard key={blog._id}>
            <p className="text-xs uppercase tracking-[0.25em] text-gold/70">File {String(index + 2).padStart(2, "0")}</p>
            <h3 className="mt-4 font-serif text-2xl text-white">{blog.title}</h3>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-white/62">{blog.content.replace(/<[^>]*>/g, "").slice(0, 180)}...</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <StatusChip tone="muted">{blog.read_time_mins || 4} min</StatusChip>
              <Link href={`/blog/${blog.slug}`} className="text-xs uppercase tracking-[0.2em] text-gold">Read</Link>
            </div>
          </TacticalCard>
        ))}
      </div>
    </PublicPageShell>
  );
}
