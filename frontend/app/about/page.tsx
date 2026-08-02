import Link from "next/link";

export const metadata = {
  title: "About IGTS - Indian Game Theory Society, NSUT",
  description:
    "The full story of IGTS: who we are, what we do, the strategic ideas we explore, and the events and achievements behind them.",
};

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-gold">
        <span className="h-px w-6 bg-gold/40" />
        {eyebrow}
        <span className="h-px w-6 bg-gold/40" />
      </p>
      <h2 className="font-serif text-4xl font-semibold text-white md:text-6xl">{title}</h2>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-navy px-6 pb-32 pt-32 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-gold">The Full Story</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-white md:text-7xl">About IGTS</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/72 md:text-lg">
          Everything the homepage only gestures at &mdash; who we are, what we build, the ideas we study,
          and the milestones we&apos;ve reached along the way.
        </p>
      </div>

      {/* About */}
      <section id="about" className="mx-auto mt-28 max-w-4xl scroll-mt-28 border-t border-gold/15 pt-16">
        <SectionHeading eyebrow="Who we are" title="About IGTS" />
        <div className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-white/78 md:text-lg">
          <p>
            The Indian Game Theory Society (IGTS) is a student-led community at NSUT exploring how
            strategic thinking shapes economics, technology, mathematics, and everyday decisions.
            We bring together students from every branch &mdash; engineers, economists, mathematicians,
            and curious generalists &mdash; who share one interest: understanding how people and
            systems make decisions when outcomes depend on each other.
          </p>
          <p>
            Game theory sits at the intersection of logic and human behaviour. It explains why
            auctions are designed the way they are, why nations negotiate the way they do, why
            markets sometimes fail, and why cooperation can emerge even among rational
            self-interested players. IGTS exists to make that lens accessible &mdash; through
            reading groups, open discussions, and hands-on projects &mdash; to anyone at NSUT
            curious enough to ask &quot;why did they make that choice?&quot;
          </p>
          <p>
            We are founding-member driven and intentionally informal: no rigid hierarchy, just a
            rotating set of people building sessions, games, and research threads they genuinely
            want to explore themselves.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="mx-auto mt-24 max-w-4xl scroll-mt-28 border-t border-gold/15 pt-16">
        <SectionHeading eyebrow="Our work" title="What We Do" />
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {[
            {
              title: "Reading & Discussion Groups",
              body: "Weekly sessions unpacking classic and modern game theory papers, from Nash equilibria to mechanism design, in plain language.",
            },
            {
              title: "Research Projects",
              body: "Small teams exploring applied game theory in auctions, voting systems, network effects, and algorithmic decision-making.",
            },
            {
              title: "Interactive Games",
              body: "We design and build playable strategic games and simulations &mdash; from classic dilemmas to original multiplayer experiments &mdash; to make abstract theory tangible.",
            },
            {
              title: "Cross-Disciplinary Workshops",
              body: "Sessions connecting game theory to economics, computer science, political science, and behavioural psychology.",
            },
          ].map((item) => (
            <div key={item.title} className="border border-gold/20 bg-ink/40 p-6">
              <h3 className="font-serif text-xl text-gold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/72 md:text-base">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Game Theory */}
      <section id="game-theory" className="mx-auto mt-24 max-w-4xl scroll-mt-28 border-t border-gold/15 pt-16">
        <SectionHeading eyebrow="Think strategically" title="Explore Game Theory" />
        <div className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-white/78 md:text-lg">
          <p>
            Game theory studies decisions where your best move depends on what everyone else does
            too. It ranges from simple two-player dilemmas to sprawling multi-agent systems that
            model entire economies.
          </p>
          <ul className="space-y-3">
            <li className="border-l-2 border-gold/40 pl-4">
              <span className="font-semibold text-white">Classic Dilemmas</span> &mdash; the Prisoner&apos;s
              Dilemma, Stag Hunt, and Chicken, and what they reveal about cooperation versus self-interest.
            </li>
            <li className="border-l-2 border-gold/40 pl-4">
              <span className="font-semibold text-white">Auctions & Mechanism Design</span> &mdash; how
              rules can be engineered so that self-interested behaviour produces a fair or efficient outcome.
            </li>
            <li className="border-l-2 border-gold/40 pl-4">
              <span className="font-semibold text-white">Equilibria</span> &mdash; Nash equilibrium and
              beyond: the states where no player benefits from changing strategy alone.
            </li>
            <li className="border-l-2 border-gold/40 pl-4">
              <span className="font-semibold text-white">Interactive Strategic Games</span> &mdash; playable
              simulations built by our members, live in the Game Lab, where you experience the theory
              instead of just reading about it.
            </li>
          </ul>
          <p>
            Head over to the{" "}
            <Link href="/game-lab" className="text-gold underline underline-offset-4 hover:text-gold-light">
              Game Lab
            </Link>{" "}
            to play a few of these games yourself.
          </p>
        </div>
      </section>

      {/* Events & Achievements */}
      <section id="events" className="mx-auto mt-24 max-w-4xl scroll-mt-28 border-t border-gold/15 pt-16">
        <SectionHeading eyebrow="Beyond theory" title="Events & Achievements" />
        <div className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-white/78 md:text-lg">
          <p>
            IGTS runs a regular calendar of workshops, competitions, and research discussions
            &mdash; and collaborates with other societies and departments across NSUT to bring
            game theory into wider conversations on campus.
          </p>
          <ul className="space-y-3">
            <li className="border-l-2 border-gold/40 pl-4">
              <span className="font-semibold text-white">Workshops</span> &mdash; hands-on
              sessions introducing strategic thinking to newcomers, no prior background required.
            </li>
            <li className="border-l-2 border-gold/40 pl-4">
              <span className="font-semibold text-white">Competitions</span> &mdash; strategy
              tournaments and simulation challenges testing what members have learned.
            </li>
            <li className="border-l-2 border-gold/40 pl-4">
              <span className="font-semibold text-white">Research Discussions</span> &mdash; open
              forums where ongoing member projects are presented and debated.
            </li>
            <li className="border-l-2 border-gold/40 pl-4">
              <span className="font-semibold text-white">Collaborations & Milestones</span> &mdash;
              joint events with other NSUT societies and recognition earned along the way.
            </li>
          </ul>
          <p>
            Full write-ups of past sessions and updates live on{" "}
            <Link href="/blog" className="text-gold underline underline-offset-4 hover:text-gold-light">
              The Ledger
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="mx-auto mt-28 max-w-2xl text-center">
        <Link
          href="/join-us"
          className="inline-block border border-gold bg-gold px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-navy transition hover:bg-gold-light md:text-sm"
        >
          Join Us
        </Link>
      </div>
    </main>
  );
}