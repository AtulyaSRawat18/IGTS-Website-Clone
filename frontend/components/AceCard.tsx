"use client";

type Suit = "spades" | "hearts" | "diamonds" | "clubs";

const SUIT_SYMBOL: Record<Suit, string> = {
  spades: "♠",
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
};

const RED_SUITS: Suit[] = ["hearts", "diamonds"];

export default function AceCard({
  suit,
  active,
  faded,
  onClick,
}: {
  suit: Suit;
  active: boolean;
  faded: boolean;
  onClick: () => void;
}) {
  const isRed = RED_SUITS.includes(suit);
  const symbol = SUIT_SYMBOL[suit];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative aspect-[5/7] w-32 shrink-0 rounded-sm border bg-navy-light/80 shadow-xl transition-all duration-500 ease-out sm:w-40 md:w-48 ${
        active
          ? "z-10 border-gold shadow-gold/20"
          : "border-white/15 hover:border-gold/60"
      } ${faded ? "opacity-30 saturate-50" : "opacity-100"}`}
    >
      {/* Corner notations */}
      <span
        className={`absolute left-2 top-2 text-left text-xs leading-none sm:text-sm ${
          isRed ? "text-crimson" : "text-white/90"
        }`}
      >
        A<br />
        {symbol}
      </span>
      <span
        className={`absolute bottom-2 right-2 rotate-180 text-left text-xs leading-none sm:text-sm ${
          isRed ? "text-crimson" : "text-white/90"
        }`}
      >
        A<br />
        {symbol}
      </span>

      {/* Center pip */}
      <span
        className={`absolute inset-0 flex items-center justify-center text-5xl transition-transform duration-500 sm:text-6xl md:text-7xl ${
          isRed ? "text-crimson" : "text-white/90"
        } ${active ? "scale-110" : "group-hover:scale-105"}`}
      >
        {symbol}
      </span>

      {/* Gold sheen on hover/active */}
      <span
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/10 transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
      />
    </button>
  );
}

export type { Suit };
