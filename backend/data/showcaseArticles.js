const showcaseArticles = [
  {
    title: "Nash Equilibrium: The Group Chat Where Nobody Wants To Move First",
    slug: "nash-equilibrium-group-chat",
    category: "Game Theories",
    topic: "Equilibrium",
    header_image_url: "https://images.unsplash.com/photo-1763635031729-b3db264dd8c0?auto=format&fit=crop&q=80&w=1400",
    read_time_mins: 6,
    tags: ["nash", "strategy", "equilibrium", "pop-culture"],
    external_links: [
      { label: "Nash, 1950 - PNAS", url: "https://doi.org/10.1073/pnas.36.1.48" },
    ],
    content: `
      <p>There is a special kind of silence in a group chat. Everyone has seen the plan, everyone has opinions, and somehow nobody wants to be the first person to say, "So... are we actually going?" That little frozen moment is a decent doorway into Nash equilibrium.</p>
      <h2>The move that survives everyone else's move</h2>
      <p>John Nash's 1950 paper proved that finite games have equilibrium points when players can mix strategies. In plain language: there are situations where each player's choice is the best response to what everyone else is doing, so no one has a private reason to switch alone.</p>
      <blockquote>Equilibrium is not always happiness. Sometimes it is just a stable awkwardness.</blockquote>
      <p>That is what makes the idea fun. A traffic jam can be stable. A boring trend can be stable. A classroom where nobody asks the obvious question can be stable. The theory does not say the outcome is good. It says the outcome can hold.</p>
      <h2>Why IGTS should care</h2>
      <p>Nash equilibrium gives us a language for moments where blame feels too simple. If everyone is responding sensibly to everyone else, the problem may live in the structure of the game rather than in one player's personality.</p>
      <p><mark>Key idea:</mark> change the incentives, information, or order of play, and the "obvious" equilibrium can suddenly stop feeling obvious.</p>
    `,
  },
  {
    title: "Tit for Tat: How Being Nice Became A Strategy",
    slug: "tit-for-tat-cooperation-strategy",
    category: "Research",
    topic: "Cooperation",
    header_image_url: "https://www.cmgassets.com/s3fs-public/styles/opengraph/public/2024-05/handshake-rock-staar-via-unsplash.jpg?h=b1e7801e&itok=BLmE4hQQ",
    read_time_mins: 7,
    tags: ["cooperation", "prisoners-dilemma", "reciprocity", "evolution"],
    external_links: [
      { label: "Axelrod & Hamilton, 1981 - Science", url: "https://doi.org/10.1126/science.7466396" },
    ],
    content: `
      <p>The Prisoner's Dilemma is usually introduced like a depressing little machine: two people could cooperate, but betrayal looks tempting, and now everyone is worse off. Then Robert Axelrod and William Hamilton made the story less bleak.</p>
      <h2>The tournament of personalities</h2>
      <p>Axelrod invited strategies to compete in repeated Prisoner's Dilemma tournaments. One of the simplest, Tit for Tat, performed remarkably well: cooperate first, then copy what the other player did last time.</p>
      <p>It is almost charming. Start with trust. Reward trust. Punish betrayal. Forgive quickly. No dramatic speeches required.</p>
      <blockquote>Cooperation can survive when memory exists and tomorrow matters.</blockquote>
      <h2>Why this is not just biology</h2>
      <p>The idea travels easily into friendships, teams, negotiations, online communities, and club work. If people meet again, reputation becomes part of the payoff table. Suddenly "being nice" is not naive. It is a long-game tactic.</p>
      <p><mark>Key idea:</mark> repeated interaction changes the emotional texture of strategy. A one-shot game can reward betrayal; a repeated game can make trust durable.</p>
    `,
  },
  {
    title: "Schelling's Shapes: How Tiny Preferences Build Big Patterns",
    slug: "schelling-shapes-small-preferences",
    category: "Studies",
    topic: "Segregation Models",
    header_image_url: "https://images.unsplash.com/photo-1499310392581-322cec0355a6?auto=format&fit=crop&q=80&w=1400",
    read_time_mins: 6,
    tags: ["schelling", "segregation", "emergence", "society"],
    external_links: [
      { label: "Schelling, 1971 - Journal of Mathematical Sociology", url: "https://doi.org/10.1080/0022250X.1971.9989794" },
    ],
    content: `
      <p>Thomas Schelling's segregation model is uncomfortable because it does not need villains to produce ugly maps. It asks what happens when individuals have small preferences about their local neighbourhoods, then lets the pattern unfold.</p>
      <h2>The scary part is the simplicity</h2>
      <p>People move when their local surroundings feel below some tolerance threshold. Nobody needs to demand total separation. Yet the final arrangement can become highly separated anyway.</p>
      <blockquote>Aggregate patterns can exaggerate individual motives.</blockquote>
      <p>That line is the reason the model still matters. Looking at the final map and guessing what everyone "must have wanted" can be deeply misleading.</p>
      <h2>From shapes to systems</h2>
      <p>This is why simulations like <em>Parable of the Polygons</em> feel so powerful. They let you touch a system-level result with your own hand. Move one shape, then another, and suddenly the board is telling a story about feedback, thresholds, and unintended consequences.</p>
      <p><mark>Key idea:</mark> small local rules can produce big social patterns that nobody explicitly designed.</p>
    `,
  },
  {
    title: "The Second-Price Auction: Winning Without Lying",
    slug: "second-price-auction-winning-without-lying",
    category: "CS/DSA",
    topic: "Mechanism Design",
    header_image_url: "https://andersonandgarland.blob.core.windows.net/blog-images/AdobeStock_410489281.jpeg",
    read_time_mins: 5,
    tags: ["auction", "vickrey", "mechanism-design", "truthfulness"],
    external_links: [
      { label: "Vickrey, 1961 - Journal of Finance", url: "https://doi.org/10.1111/j.1540-6261.1961.tb02789.x" },
    ],
    content: `
      <p>Imagine bidding for a rare chess set. In a normal auction, you might shade your bid downward because winning at your full value feels painful. William Vickrey's second-price auction changes the trick.</p>
      <h2>Bid your value, pay the runner-up</h2>
      <p>In a sealed second-price auction, the highest bidder wins, but pays the second-highest bid. That means your bid decides whether you win, while someone else's bid largely decides the price you pay.</p>
      <p>The result is beautifully strange: bidding truthfully can become the clean strategy.</p>
      <blockquote>A good mechanism does not beg people to be honest. It makes honesty useful.</blockquote>
      <h2>Why this feels modern</h2>
      <p>Auctions are everywhere: ads, marketplaces, spectrum sales, fantasy leagues, collectibles, and allocation systems. Mechanism design asks a deeper question than "what will people do?" It asks, "what rules make good behaviour natural?"</p>
      <p><mark>Key idea:</mark> the rules of the game can be engineered so strategic players reveal useful information.</p>
    `,
  },
  {
    title: "Stable Matching: The Algorithm That Prevents Secret Revolts",
    slug: "stable-matching-secret-revolts",
    category: "CS/DSA",
    topic: "Matching Markets",
    header_image_url: "https://www.greencomputers.es/img/2.png",
    read_time_mins: 6,
    tags: ["matching", "gale-shapley", "algorithms", "markets"],
    external_links: [
      { label: "Gale & Shapley, 1962 - American Mathematical Monthly", url: "https://doi.org/10.1080/00029890.1962.11989827" },
    ],
    content: `
      <p>Some games are not about beating an opponent. They are about arranging people so that the arrangement does not immediately explode. That is the charm of stable matching.</p>
      <h2>No blocking pair</h2>
      <p>Gale and Shapley's classic 1962 paper studied college admissions and marriage-style matching. A matching is stable when there is no pair who would both rather abandon their current assignment for each other.</p>
      <p>The deferred acceptance algorithm gives a constructive way to find such a stable outcome. Proposals go out, offers are held tentatively, rejections move the process forward, and eventually the system settles.</p>
      <blockquote>Stability is the absence of a tempting rebellion.</blockquote>
      <h2>Where this shows up</h2>
      <p>School choice, residency matching, internships, roommate allocation, and platform recommendations all contain matching problems. The fun part is that fairness, incentives, and efficiency do not always point in the same direction.</p>
      <p><mark>Key idea:</mark> algorithms can shape social outcomes, but the side that proposes may still matter.</p>
    `,
  },
  {
    title: "Hawk, Dove, Meme: Evolutionary Games Before The Timeline Refresh",
    slug: "hawk-dove-meme-evolutionary-games",
    category: "Game Theories",
    topic: "Evolutionary Games",
    header_image_url: "https://images.unsplash.com/photo-1763635031729-b3db264dd8c0?auto=format&fit=crop&q=80&w=1400",
    read_time_mins: 6,
    tags: ["evolutionary-games", "hawk-dove", "maynard-smith", "culture"],
    external_links: [
      { label: "Maynard Smith & Price, 1973 - Nature", url: "https://doi.org/10.1038/246015a0" },
    ],
    content: `
      <p>Evolutionary game theory begins with a deliciously weird thought: strategies can compete even when nobody is consciously strategizing. A behaviour survives if it performs well against the behaviours around it.</p>
      <h2>Hawks, doves, and limited war</h2>
      <p>Maynard Smith and Price used game theory and simulation to think about animal conflict. Why do fights often stop short of total destruction? Because the payoff to aggression depends on what other strategies are present, and pure aggression can become costly.</p>
      <blockquote>The best move is not universal. It lives inside a population.</blockquote>
      <h2>Now make it cultural</h2>
      <p>The same lens can make internet behaviour feel less random. Trends, norms, outrage cycles, and status games can spread because they perform well in a particular environment. Change the environment, and the successful behaviour changes too.</p>
      <p><mark>Key idea:</mark> strategy can evolve through selection, imitation, and payoff pressure without anyone writing a master plan.</p>
    `,
  },
];

module.exports = showcaseArticles;
