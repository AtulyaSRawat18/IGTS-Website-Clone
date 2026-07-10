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
  const inkColor = isRed ? "text-red-600" : "text-neutral-900";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative aspect-[5/7] w-32 shrink-0 rounded-xl border bg-white shadow-2xl transition-all duration-500 ease-out sm:w-40 md:w-48 ${
        active
          ? "z-10 border-gold shadow-[0_0_35px_rgba(168,132,47,0.45)]"
          : "border-black/10 hover:border-gold/60"
      } ${faded ? "opacity-40 saturate-50" : "opacity-100"}`}
    >
      {/* Corner notations */}
      <span
        className={`absolute left-2.5 top-2 text-left text-sm font-semibold leading-tight sm:text-base ${inkColor}`}
      >
        A<br />
        {symbol}
      </span>
      <span
        className={`absolute bottom-2 right-2.5 rotate-180 text-left text-sm font-semibold leading-tight sm:text-base ${inkColor}`}
      >
        A<br />
        {symbol}
      </span>

      {/* Center pip */}
      <span
        className={`absolute inset-0 flex items-center justify-center text-6xl transition-transform duration-500 sm:text-7xl md:text-8xl ${inkColor} ${
          active ? "scale-110" : "group-hover:scale-105"
        }`}
      >
        {symbol}
      </span>
    </button>
  );
}

export type { Suit };
