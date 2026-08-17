import Link from "next/link";
import KnightScene from "@/components/KnightScene";
import Placard from "@/components/Placard";

export default function Home() {
  const displayHeading =
    "bg-gradient-to-b from-[#ffe9a6] via-[#c99a3b] to-[#6f4b16] bg-clip-text text-[clamp(2.35rem,5.8vw,5.5rem)] font-black uppercase leading-[0.94] tracking-[0.025em] text-transparent drop-shadow-[0_12px_26px_rgba(0,0,0,0.68)] [font-family:Impact,'Arial_Black',sans-serif]";
  const bodyCopy = "mx-auto mt-6 max-w-xl text-base leading-7 text-white/82 drop-shadow-[0_3px_12px_rgba(0,0,0,0.78)] md:text-lg md:leading-8";

  return (
    <main className="relative h-screen overflow-hidden">
      {/* Fixed 3D scene behind everything */}
      <KnightScene />

      {/* Scrollable sections */}
      <div
        id="home-scroll-container"
        className="relative z-10 h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      >
        {/* Section 1 — Hero */}
        <section className="relative flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Welcome to">
            <h1 className={`${displayHeading} text-[clamp(2.8rem,6.8vw,6.4rem)]`}>
              Indian Game Theory Society
            </h1>

            <p className={`${bodyCopy} md:text-xl md:leading-9`}>
              Explore strategy, decisions, competition, and cooperation.
            </p>
          </Placard>

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold/78">
              Scroll to explore
            </p>
            <div className="h-10 w-px bg-gradient-to-b from-gold/60 to-transparent motion-safe:animate-pulse" />
          </div>
        </section>

        {/* Section 2 — About */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Who we are">
            <h2 className={displayHeading}>
              About IGTS
            </h2>

            <p className={bodyCopy}>
              A student-led community exploring how strategic thinking shapes
              economics, technology, mathematics, and everyday decisions.
            </p>
          </Placard>
        </section>

        {/* Section 3 — What we do */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Our work">
            <h2 className={displayHeading}>
              What We Do
            </h2>

            <p className={bodyCopy}>
              We learn, discuss, research, build games, and explore strategic
              ideas across disciplines.
            </p>
          </Placard>
        </section>

        {/* Section 4 — Explore game theory */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Think strategically">
            <h2 className={displayHeading}>
              Explore Game Theory
            </h2>

            <p className={bodyCopy}>
              From classic dilemmas to auctions, equilibria, and interactive
              strategic games.
            </p>
          </Placard>
        </section>

        {/* Section 5 — Events & achievements */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Beyond theory">
            <h2 className={displayHeading}>
              Events &amp; Achievements
            </h2>

            <p className={bodyCopy}>
              Workshops, competitions, research discussions, collaborations,
              and milestones from our community.
            </p>
          </Placard>
        </section>

        {/* Section 6 — Explore / CTA */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Discover more" wide>
            <h2 className={displayHeading}>
              Explore IGTS
            </h2>

            <p className={bodyCopy}>
              Dive deeper into our ideas, people, and interactive experiments.
            </p>

            <nav className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <Link
                href="/blog"
                className="border border-gold/30 px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-white transition hover:border-gold hover:bg-gold/10 md:px-8 md:py-3 md:text-sm"
              >
                Blog
              </Link>

              <Link
                href="/members"
                className="border border-gold/30 px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-white transition hover:border-gold hover:bg-gold/10 md:px-8 md:py-3 md:text-sm"
              >
                Members
              </Link>

              <Link
                href="/game-lab"
                className="border border-gold/30 px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-white transition hover:border-gold hover:bg-gold/10 md:px-8 md:py-3 md:text-sm"
              >
                Game Lab
              </Link>

              <Link
                href="/join-us"
                className="border border-gold bg-gold px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-medium text-navy transition hover:bg-gold-light md:px-8 md:py-3 md:text-sm"
              >
                Join Us
              </Link>
            </nav>
          </Placard>
        </section>
      </div>
    </main>
  );
}
