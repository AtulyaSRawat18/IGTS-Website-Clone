import Link from "next/link";
import KnightScene from "@/components/KnightScene";
import Placard from "@/components/Placard";

export default function Home() {
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
            <h1 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-7xl">
              Indian Game Theory Society
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base text-white/80 md:text-lg">
              Explore strategy, decisions, competition, and cooperation.
            </p>
          </Placard>

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 motion-safe:animate-bounce">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
              Scroll to explore
            </p>
            <div className="h-8 w-px bg-gradient-to-b from-gold/70 to-transparent" />
          </div>
        </section>

        {/* Section 2 — About */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Who we are">
            <h2 className="font-serif text-4xl font-semibold text-white md:text-6xl">
              About IGTS
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              A student-led community exploring how strategic thinking shapes
              economics, technology, mathematics, and everyday decisions.
            </p>
          </Placard>
        </section>

        {/* Section 3 — What we do */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Our work">
            <h2 className="font-serif text-4xl font-semibold text-white md:text-6xl">
              What We Do
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              We learn, discuss, research, build games, and explore strategic
              ideas across disciplines.
            </p>
          </Placard>
        </section>

        {/* Section 4 — Explore game theory */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Think strategically">
            <h2 className="font-serif text-4xl font-semibold text-white md:text-6xl">
              Explore Game Theory
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              From classic dilemmas to auctions, equilibria, and interactive
              strategic games.
            </p>
          </Placard>
        </section>

        {/* Section 5 — Events & achievements */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Beyond theory">
            <h2 className="font-serif text-4xl font-semibold text-white md:text-6xl">
              Events &amp; Achievements
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Workshops, competitions, research discussions, collaborations,
              and milestones from our community.
            </p>
          </Placard>
        </section>

        {/* Section 6 — Explore / CTA */}
        <section className="flex h-screen snap-start snap-always items-center justify-center px-6 text-center md:px-8">
          <Placard eyebrow="Discover more" wide>
            <h2 className="font-serif text-4xl font-semibold text-white md:text-7xl">
              Explore IGTS
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base text-white/80 md:text-lg">
              Dive deeper into our ideas, people, and interactive experiments.
            </p>

            <nav className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <Link
                href="/blog"
                className="rounded-full border border-gold/40 px-6 py-2.5 text-sm text-white transition hover:bg-gold hover:text-navy md:px-7 md:py-3 md:text-base"
              >
                Blog
              </Link>

              <Link
                href="/members"
                className="rounded-full border border-gold/40 px-6 py-2.5 text-sm text-white transition hover:bg-gold hover:text-navy md:px-7 md:py-3 md:text-base"
              >
                Members
              </Link>

              <Link
                href="/game-lab"
                className="rounded-full border border-gold/40 px-6 py-2.5 text-sm text-white transition hover:bg-gold hover:text-navy md:px-7 md:py-3 md:text-base"
              >
                Game Lab
              </Link>

              <Link
                href="/join-us"
                className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-navy transition hover:bg-gold-light md:px-7 md:py-3 md:text-base"
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
