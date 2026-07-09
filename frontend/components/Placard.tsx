import type { ReactNode } from "react";

/** Corner bracket used on all four corners of the placard. */
function Corner({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-4 w-4 border-gold/60 ${className}`}
    />
  );
}

/** The signature visual element of the page: a museum-placard card, as if
 * labeling an exhibited chess piece. Gives every scrolling section a
 * legible surface regardless of what's behind it in the 3D scene, while
 * doubling as the page's distinct visual identity. */
export default function Placard({
  eyebrow,
  children,
  wide = false,
}: {
  eyebrow: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`relative border border-gold/25 bg-navy/50 px-8 py-10 backdrop-blur-md md:px-14 md:py-14 ${
        wide ? "max-w-4xl" : "max-w-2xl"
      }`}
    >
      <Corner className="left-0 top-0 border-l-2 border-t-2" />
      <Corner className="right-0 top-0 border-r-2 border-t-2" />
      <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
      <Corner className="bottom-0 right-0 border-b-2 border-r-2" />

      <p className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-gold">
        <span className="h-px w-6 bg-gold/40" />
        {eyebrow}
        <span className="h-px w-6 bg-gold/40" />
      </p>

      {children}
    </div>
  );
}
