"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/api/blogs";
import type { Blog } from "@/lib/api/types";
import { sanitizeHtml } from "@/lib/safe-html";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/states";
import { ArticleMeta, EditorialImage, FactBox, NewsroomHeader, ShareActions, TagRail, getDeck, stripHtml } from "@/components/ledger/ArticlePieces";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [articleData, listData] = await Promise.all([getBlogBySlug(params.slug), getPublishedBlogs()]);
        setBlog(articleData.blog);
        setHtml(sanitizeHtml(articleData.blog.content));
        setRelated((listData.blogs || []).filter((item) => item.slug !== params.slug).slice(0, 3));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Article not found");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [params.slug]);

  const pullQuote = useMemo(() => {
    if (!blog) return "";
    const text = getDeck(blog);
    return text.length > 150 ? `${text.slice(0, 150).trim()}...` : text;
  }, [blog]);

  return (
    <main className="min-h-screen bg-[#0a0c16] pb-24 pt-[69px] text-[#f4efe4]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(168,132,47,0.16),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(111,88,201,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,auto,34px_34px]" />
      <NewsroomHeader />

      <section className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        {loading && <LoadingSkeleton label="Loading article" />}
        {error && <ErrorState message={error} />}
        {!loading && !error && !blog && <EmptyState title="Article unavailable." body="This Ledger entry may have moved or is not published yet." />}

        {blog && !loading && !error && (
          <article>
            <header className="border-b border-[#a8842f]/35 pb-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#c9a969]">{blog.category}{blog.topic ? ` / ${blog.topic}` : ""}</p>
                  <h1 className="mt-5 max-w-5xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">{blog.title}</h1>
                  <p className="mt-6 max-w-3xl text-xl leading-8 text-[#d1c5b2]/72">{getDeck(blog)}</p>
                  <div className="mt-7"><ArticleMeta blog={blog} /></div>
                </div>
                <div className="space-y-4">
                  <ShareActions title={blog.title} />
                  <Link href="/blog" className="inline-block border border-[#a8842f]/25 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d1c5b2]/70 transition hover:border-[#c9a969] hover:text-[#c9a969]">Back to Ledger</Link>
                </div>
              </div>
            </header>

            <EditorialImage src={blog.header_image_url} title={blog.title} caption={blog.topic || "Lead visual for this Ledger entry."} credit="IGTS Editorial" className="mt-8" />

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-center">
              <div>
                <p className="mb-9 border-l-4 border-[#a8842f] pl-5 font-serif text-2xl leading-9 text-[#f4efe4]/82 md:text-3xl">{getDeck(blog)}</p>
                <div className="ledger-article-body" dangerouslySetInnerHTML={{ __html: html }} />
                <hr className="my-10 border-[#a8842f]/20" />
                <footer className="space-y-6">
                  <TagRail tags={blog.tags} />
                  <div className="border-y border-[#a8842f]/20 py-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9a969]">Author Note</p>
                    <p className="mt-3 leading-7 text-[#d1c5b2]/66">Filed by {blog.author?.display_name || "IGTS Editorial"} for readers tracking strategy, systems, and collective behaviour.</p>
                  </div>
                  <ShareActions title={blog.title} />
                </footer>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-36">
                <FactBox blog={blog} />
                {pullQuote && (
                  <blockquote className="border-y border-[#a8842f]/35 py-6 font-serif text-3xl leading-tight text-[#f4efe4]">
                    <span className="text-[#a8842f]">&ldquo;</span>{pullQuote}<span className="text-[#a8842f]">&rdquo;</span>
                  </blockquote>
                )}
                <div className="border border-[#a8842f]/20 bg-[#0c0e18]/75 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9a969]">Read Next</p>
                  <div className="mt-5 space-y-5">
                    {related.map((item) => (
                      <Link key={item._id} href={`/blog/${item.slug}`} className="block border-b border-[#a8842f]/15 pb-5 last:border-b-0 last:pb-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d1c5b2]/45">{item.category}</p>
                        <h2 className="mt-2 font-serif text-xl font-semibold leading-tight hover:text-[#c9a969]">{item.title}</h2>
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#d1c5b2]/55">{stripHtml(item.content)}</p>
                      </Link>
                    ))}
                    {!related.length && <p className="text-sm leading-6 text-[#d1c5b2]/55">More related entries will appear as the Ledger grows.</p>}
                  </div>
                </div>
              </aside>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}
