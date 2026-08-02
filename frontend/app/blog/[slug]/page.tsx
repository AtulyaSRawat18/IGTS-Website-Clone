"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogBySlug } from "@/lib/api/blogs";
import type { Blog } from "@/lib/api/types";
import { sanitizeHtml } from "@/lib/safe-html";
import { ErrorState, LoadingSkeleton, PublicPageShell, StatusChip, TacticalCard } from "@/components/ui/states";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBlogBySlug(params.slug);
        setBlog(data.blog);
        setHtml(sanitizeHtml(data.blog.content));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Article not found");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [params.slug]);

  return (
    <PublicPageShell eyebrow="Ledger Reading Room" title={blog?.title || "Article"} intro="A strategic note from the IGTS archive.">
      {loading && <LoadingSkeleton label="Loading article" />}
      {error && <ErrorState message={error} />}
      {blog && !loading && !error && (
        <article className="mt-10 grid gap-8 lg:grid-cols-[1fr_260px]">
          <TacticalCard className="prose prose-invert max-w-none prose-headings:font-serif prose-a:text-gold prose-blockquote:border-gold prose-blockquote:text-white/75">
            <div className="mb-8 flex flex-wrap gap-2">
              <StatusChip>{blog.category}</StatusChip>
              <StatusChip tone="muted">{blog.read_time_mins || 4} min read</StatusChip>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </TacticalCard>
          <aside className="space-y-4">
            <TacticalCard>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Author</p>
              <p className="mt-3 text-white">{blog.author?.display_name || "IGTS"}</p>
              <p className="mt-2 text-sm text-white/50">{blog.created_at ? new Date(blog.created_at).toLocaleDateString() : "Archive date pending"}</p>
            </TacticalCard>
            <Link href="/blog" className="block border border-gold/35 px-4 py-3 text-center text-xs uppercase tracking-[0.2em] text-gold">Back to Ledger</Link>
          </aside>
        </article>
      )}
    </PublicPageShell>
  );
}
