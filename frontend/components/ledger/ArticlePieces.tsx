import Link from "next/link";
import type { Blog } from "@/lib/api/types";

export function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function formatDate(value?: string) {
  if (!value) return "Date pending";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export function getDeck(blog: Blog) {
  return stripHtml(blog.content).slice(0, 190) || "A strategic note from the IGTS editorial desk.";
}

export function NewsroomHeader({ activeCategory, categories, onSelect }: { activeCategory?: string; categories?: string[]; onSelect?: (category: string) => void }) {
  const nav = categories?.length ? categories : ["Game Theories", "Research", "Studies", "CS/DSA"];
  return (
    <div className="sticky top-[69px] z-30 border-b border-[#a8842f]/18 bg-[#0a0c16]/94 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-5 px-5 py-4 text-[#f4efe4] lg:grid-cols-[220px_1fr_220px]">
        <Link href="/blog" className="font-serif text-xl font-semibold tracking-tight">The Ledger</Link>
        <nav className="hidden justify-center gap-7 overflow-x-auto text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d1c5b2]/55 md:flex">
          {nav.map((item) => {
            const selected = activeCategory === item || (activeCategory === "all" && item === "all");
            if (onSelect) {
              return <button key={item} onClick={() => onSelect(item)} className={`whitespace-nowrap border-b pb-1 transition ${selected ? "border-[#c9a969] text-[#c9a969]" : "border-transparent hover:text-[#f4efe4]"}`}>{item === "all" ? "All Entries" : item}</button>;
            }
            return <span key={item} className="whitespace-nowrap">{item}</span>;
          })}
        </nav>
        <div className="justify-self-end text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c9a969]/70">IGTS NSUT</div>
      </div>
    </div>
  );
}

export function EditorialImage({ src, title, caption, credit, className = "" }: { src?: string; title: string; caption?: string; credit?: string; className?: string }) {
  return (
    <figure className={className}>
      <div className="relative aspect-[16/9] overflow-hidden border border-[#a8842f]/18 bg-[#171923]">
        {src ? (
          <img src={src} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_35%_20%,rgba(168,132,47,.32),transparent_34%),linear-gradient(135deg,#222431,#0d0f18)] px-8 text-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#c9a969]">IGTS Archive</p>
              <p className="mt-5 font-serif text-4xl font-semibold text-[#f4efe4] md:text-6xl">{title}</p>
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 border-b border-[#a8842f]/18 pb-4 text-xs leading-5 text-[#d1c5b2]/55 sm:flex-row sm:justify-between">
        <span>{caption || "Editorial image from the IGTS strategic archive."}</span>
        <span className="font-semibold uppercase tracking-[0.16em] text-[#d1c5b2]/40">{credit || "Source: IGTS"}</span>
      </figcaption>
    </figure>
  );
}

export function ArticleMeta({ blog }: { blog: Blog }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-[#d1c5b2]/55">
      <span className="font-semibold text-[#f4efe4]">{blog.author?.display_name || "IGTS Editorial"}</span>
      <span aria-hidden="true">/</span>
      <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
      <span aria-hidden="true">/</span>
      <span>{blog.read_time_mins || 4} min read</span>
      {blog.updated_at && <span className="hidden sm:inline">Updated {formatDate(blog.updated_at)}</span>}
    </div>
  );
}

export function ShareActions({ title }: { title: string }) {
  return (
    <div className="flex flex-wrap gap-2" aria-label={`Share ${title}`}>
      {["Copy", "X", "In"].map((item) => <button key={item} className="border border-[#a8842f]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d1c5b2]/65 transition hover:border-[#c9a969] hover:text-[#c9a969]">{item}</button>)}
    </div>
  );
}

export function FactBox({ blog }: { blog: Blog }) {
  return (
    <aside className="border-l-4 border-[#a8842f] bg-[#0c0e18]/78 p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9a969]">Key Signal</p>
      <p className="mt-3 font-serif text-3xl font-semibold text-[#f4efe4]">{blog.category}</p>
      <p className="mt-2 text-sm leading-6 text-[#d1c5b2]/62">{blog.topic || "A focused strategic note from the Ledger."}</p>
    </aside>
  );
}

export function TagRail({ tags = [] }: { tags?: string[] }) {
  if (!tags.length) return null;
  return <div className="flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="border border-[#a8842f]/18 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d1c5b2]/62">{tag}</span>)}</div>;
}
