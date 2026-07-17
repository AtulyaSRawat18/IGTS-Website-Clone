import Link from "next/link";

export function PublicPageShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-navy px-6 pb-24 pt-32 text-foreground md:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(168,132,47,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:auto,32px_32px]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
        <h1 className="font-serif text-4xl text-white md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-white/68 md:text-lg">{intro}</p>
        {children}
      </div>
    </main>
  );
}

export function TacticalCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-gold/18 bg-ink/62 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur ${className}`}>{children}</div>;
}

export function EmptyState({ title, body, actionHref, actionLabel }: { title: string; body: string; actionHref?: string; actionLabel?: string }) {
  return (
    <TacticalCard className="mt-10 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">No records</p>
      <h2 className="mt-3 font-serif text-3xl text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-white/65">{body}</p>
      {actionHref && actionLabel && <Link href={actionHref} className="mt-6 inline-block border border-gold px-5 py-3 text-xs uppercase tracking-[0.2em] text-gold">{actionLabel}</Link>}
    </TacticalCard>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <TacticalCard className="mt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-crimson">Error</p>
      <p className="mt-3 text-white/75">{message}</p>
      {onRetry && <button onClick={onRetry} className="mt-5 border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold">Retry</button>}
    </TacticalCard>
  );
}

export function LoadingSkeleton({ label = "Loading archive..." }: { label?: string }) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3" aria-live="polite" aria-busy="true">
      {[0, 1, 2].map((item) => <div key={item} className="h-48 animate-pulse border border-gold/10 bg-white/[0.035]" />)}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function StatusChip({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "green" | "red" | "muted" }) {
  const styles = {
    gold: "border-gold/35 text-gold bg-gold/10",
    green: "border-emerald-500/30 text-emerald-200 bg-emerald-500/10",
    red: "border-crimson/50 text-red-200 bg-crimson/15",
    muted: "border-white/15 text-white/60 bg-white/5",
  }[tone];
  return <span className={`inline-flex border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${styles}`}>{children}</span>;
}
