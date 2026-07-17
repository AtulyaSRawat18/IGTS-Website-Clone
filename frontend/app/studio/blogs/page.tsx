"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublishedBlogs, deleteBlog, toggleBlogPublication } from "@/lib/api/blogs";
import type { Blog } from "@/lib/api/types";
import { StudioShell } from "@/components/studio/StudioShell";
import { EmptyState, ErrorState, LoadingSkeleton, StatusChip, TacticalCard } from "@/components/ui/states";
import { useSession } from "@/lib/session/use-session";

export default function StudioBlogsPage() {
  const { user } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = async () => {
    setLoading(true);
    setError(null);
    try { const data = await getPublishedBlogs(); setBlogs((data.blogs || []).filter((blog) => blog.author?.user_id === user?.user_id)); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load blogs"); }
    finally { setLoading(false); }
  };
  useEffect(() => { if (user) void load(); }, [user]);
  return (
    <StudioShell title="Ledger Management" intro="Manage visible published records. Draft listing requires a backend my-content endpoint; create and direct edit routes are available now.">
      <Link href="/studio/blogs/new" className="inline-block bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy">New Blog</Link>
      {loading && <LoadingSkeleton />}{error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && blogs.length === 0 && <EmptyState title="No published blogs owned by you." body="Create a new draft or publish an existing record from its direct edit route." actionHref="/studio/blogs/new" actionLabel="New Blog" />}
      <div className="mt-6 grid gap-4">{blogs.map((blog) => <TacticalCard key={blog._id} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h2 className="font-serif text-2xl text-white">{blog.title}</h2><div className="mt-2 flex gap-2"><StatusChip>{blog.status || "published"}</StatusChip><StatusChip tone="muted">{blog.category}</StatusChip></div></div><div className="flex flex-wrap gap-2"><Link href={`/blog/${blog.slug}`} className="border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/70">Preview</Link><Link href={`/studio/blogs/${blog._id}/edit`} className="border border-gold/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold">Edit</Link><button onClick={() => void toggleBlogPublication(blog._id).then(load)} className="border border-gold/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-gold">Toggle</button><button onClick={() => confirm("Delete this blog?") && void deleteBlog(blog._id).then(load)} className="border border-crimson/50 px-3 py-2 text-xs uppercase tracking-[0.18em] text-red-200">Delete</button></div></TacticalCard>)}</div>
    </StudioShell>
  );
}
