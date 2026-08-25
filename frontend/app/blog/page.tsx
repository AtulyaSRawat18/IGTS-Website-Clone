"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getPublishedBlogs } from "@/lib/api/blogs";
import type { Blog } from "@/lib/api/types";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/states";
import { ArticleMeta, EditorialImage, NewsroomHeader, TagRail, formatDate, getDeck, stripHtml } from "@/components/ledger/ArticlePieces";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("all");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setBlogs((await getPublishedBlogs()).blogs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the Ledger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const categories = useMemo(() => ["all", ...Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean)))], [blogs]);
  const visible = category === "all" ? blogs : blogs.filter((blog) => blog.category === category);
  const [featured, secondary, tertiary, ...rest] = visible;

  return (
    <main className="min-h-screen bg-[#0a0c16] pb-24 pt-[69px] text-[#f4efe4]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(168,132,47,0.16),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(111,88,201,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,auto,34px_34px]" />
      <NewsroomHeader activeCategory={category} categories={categories} onSelect={setCategory} />

      <section className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="border-y border-[#a8842f]/35 py-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c9a969]">Strategic dispatches / research notes / society archive</p>
          <h1 className="mt-4 font-serif text-6xl font-semibold leading-none tracking-tight md:text-8xl">The Ledger</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#d1c5b2]/72 md:text-lg">A serious-but-playful editorial room for game theory, behavioural systems, computation, and the strange mathematics of human choice.</p>
        </div>

        {loading && <LoadingSkeleton label="Opening the Ledger..." />}
        {error && <ErrorState message={error} onRetry={load} />}
        {!loading && !error && !visible.length && <EmptyState title="The archive is quiet." body="No published articles are available for this category yet." />}

        {featured && (
          <section className="mt-12 grid gap-8 border-b border-[#a8842f]/20 pb-12 lg:grid-cols-[1.35fr_0.65fr]">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <EditorialImage src={featured.header_image_url} title={featured.title} caption={featured.topic || featured.category} credit="IGTS Editorial" />
              <div className="mt-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9a969]">{featured.category}</p>
                <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight transition group-hover:text-[#c9a969] md:text-6xl">{featured.title}</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[#d1c5b2]/72">{getDeck(featured)}</p>
                <div className="mt-6"><ArticleMeta blog={featured} /></div>
              </div>
            </Link>

            <aside className="grid content-start gap-6">
              {[secondary, tertiary].filter(Boolean).map((blog) => (
                <Link key={blog!._id} href={`/blog/${blog!.slug}`} className="group border-b border-[#a8842f]/20 pb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a969]">{blog!.category}</p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight group-hover:text-[#c9a969]">{blog!.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#d1c5b2]/64">{stripHtml(blog!.content)}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[#d1c5b2]/42">{formatDate(blog!.created_at)} / {blog!.read_time_mins || 4} min</p>
                </Link>
              ))}
              <div className="border border-[#a8842f]/25 bg-[#0c0e18] p-6 text-[#f4efe4]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c9a969]">Editorial Brief</p>
                <p className="mt-4 font-serif text-2xl leading-tight">Small choices become large systems. Read accordingly.</p>
              </div>
            </aside>
          </section>
        )}

        {!!rest.length && (
          <section className="mt-10">
            <div className="mb-6 flex items-end justify-between border-b border-[#a8842f]/35 pb-3">
              <h2 className="font-serif text-3xl font-semibold">Latest Entries</h2>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d1c5b2]/45">{visible.length} records</p>
            </div>
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((blog) => (
                <Link key={blog._id} href={`/blog/${blog.slug}`} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden border border-[#a8842f]/18 bg-[#171923]">
                    {blog.header_image_url ? <img src={blog.header_image_url} alt={blog.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center px-5 text-center font-serif text-3xl text-[#f4efe4]">{blog.category}</div>}
                  </div>
                  <div className="mt-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a969]">{blog.category} / {formatDate(blog.created_at)}</p>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight group-hover:text-[#c9a969]">{blog.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#d1c5b2]/64">{getDeck(blog)}</p>
                    <div className="mt-5"><TagRail tags={blog.tags?.slice(0, 2)} /></div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
