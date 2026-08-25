import type { MemberProfile } from "@/lib/api/types";

export type HouseId = "first-year" | "second-year" | "third-year" | "fourth-year";

export type HouseConfig = {
  id: HouseId;
  index: string;
  yearLabel: string;
  sourceYears: string[];
  roman: string;
  name: string;
  motto: string;
  description: string;
  symbol: string;
  accent: string;
  cardImage: string;
  focus: string[];
};

export type DisplayMember = {
  _id: string;
  display_name: string;
  designation?: string;
  year?: string;
  house: HouseId;
  houseName: string;
  course?: string;
  branch?: string;
  bio?: string;
  pfp_url?: string;
  email?: string;
  show_email?: boolean;
  linkedin_url?: string;
  personal_site?: string;
  interests: string[];
};

export const houses: HouseConfig[] = [
  {
    id: "first-year",
    index: "01 / 04",
    yearLabel: "1st Year",
    sourceYears: ["First Year", "1st Year"],
    roman: "I",
    name: "The Firsts",
    motto: "The New Blood",
    description: "The newest voices learning the language of games, systems, and strategic culture.",
    symbol: "I",
    accent: "#a8842f",
    cardImage: "/member-house-cards/spades.jpg",
    focus: ["Curiosity", "Foundations", "Fresh Play"],
  },
  {
    id: "second-year",
    index: "02 / 04",
    yearLabel: "2nd Year",
    sourceYears: ["Second Year", "2nd Year"],
    roman: "II",
    name: "The Builders",
    motto: "Make the board move",
    description: "The working engine of the society, turning ideas into sessions, tools, writing, and games.",
    symbol: "II",
    accent: "#7b6fd0",
    cardImage: "/member-house-cards/diamonds.jpg",
    focus: ["Tech", "Design", "Events"],
  },
  {
    id: "third-year",
    index: "03 / 04",
    yearLabel: "3rd Year",
    sourceYears: ["Third Year", "3rd Year"],
    roman: "III",
    name: "The Strategists",
    motto: "Pressure makes patterns",
    description: "Senior voices shaping research, mentoring teams, and keeping the society's standards sharp.",
    symbol: "III",
    accent: "#8a2f3b",
    cardImage: "/member-house-cards/hearts.jpg",
    focus: ["Research", "Leadership", "Mentorship"],
  },
  {
    id: "fourth-year",
    index: "04 / 04",
    yearLabel: "4th Year",
    sourceYears: ["Fourth Year", "4th Year", "Core Committee", "Alumni"],
    roman: "IV",
    name: "The Old Guard",
    motto: "Leave the archive richer",
    description: "The senior house carrying institutional memory, culture, and the long-game view.",
    symbol: "IV",
    accent: "#2f6f5e",
    cardImage: "/member-house-cards/clubs.jpg",
    focus: ["Legacy", "Guidance", "Culture"],
  },
];

const fallbackNames: Record<HouseId, Array<Pick<DisplayMember, "display_name" | "designation" | "bio" | "interests">>> = {
  "first-year": [
    { display_name: "Your Name Can Be Here", designation: "Incoming Member", bio: "A fresh seat at the table, ready to learn the rules and question them.", interests: ["Foundations", "Games"] },
  ],
  "second-year": [
    { display_name: "Manav", designation: "Junior Developer", bio: "Builds small tools that make the society feel sharper and faster.", interests: ["Tech", "Systems"] },
    { display_name: "Atulya", designation: "Junior Developer", bio: "Interested in systems, digital culture, and turning rough ideas into working interfaces.", interests: ["Tech", "Design"] },
    { display_name: "Prince", designation: "Junior Developer", bio: "Explores game-like interfaces and the code behind clean interactions.", interests: ["Tech", "Games"] },
    { display_name: "Tanishi Agarwal", designation: "Member", bio: "Keeps the room curious, organized, and ready for the next experiment.", interests: ["Events", "Writing"] },
    { display_name: "Vinayak Kaushik", designation: "Member", bio: "A steady collaborator across discussions, sessions, and society work.", interests: ["Research", "Coordination"] },
    { display_name: "Daksh Joya", designation: "Member", bio: "Interested in strategic puzzles and the social side of decision-making.", interests: ["Games", "Strategy"] },
    { display_name: "Akanksha Sachdeva", designation: "Member", bio: "Brings a careful editorial eye to ideas before they become public.", interests: ["Writing", "Research"] },
    { display_name: "Ananshi Goel", designation: "Member", bio: "Works where people, ideas, and game-theoretic stories overlap.", interests: ["Culture", "Events"] },
    { display_name: "Arnav Mathur", designation: "Member", bio: "Drawn to mechanisms, models, and the moments where incentives get strange.", interests: ["Theory", "Games"] },
    { display_name: "Bhavya Jain", designation: "Member", bio: "A thoughtful presence in the society's workshop and discussion table.", interests: ["Research", "Design"] },
    { display_name: "Garima", designation: "Member", bio: "Looks for clear explanations inside messy systems.", interests: ["Writing", "Systems"] },
    { display_name: "Yug Pandey", designation: "Member", bio: "Studies the board before making the move.", interests: ["Strategy", "Games"] },
  ],
  "third-year": [
    { display_name: "Yash", designation: "Development Lead", bio: "Leads technical experiments and keeps the Game Lab moving forward.", interests: ["Leadership", "Tech"] },
    { display_name: "Manish", designation: "Member", bio: "A senior collaborator across events, analysis, and team execution.", interests: ["Events", "Strategy"] },
    { display_name: "Navya", designation: "Member", bio: "Works on the bridge between research, people, and public-facing ideas.", interests: ["Research", "Writing"] },
    { display_name: "Harsh", designation: "Member", bio: "Tracks the hidden incentives beneath ordinary decisions.", interests: ["Theory", "Games"] },
    { display_name: "Samik", designation: "Member", bio: "Helps turn complicated ideas into approachable society conversations.", interests: ["Culture", "Mentorship"] },
  ],
  "fourth-year": [
    { display_name: "Sourav", designation: "President", bio: "Sets direction, holds context, and keeps the long game in view.", interests: ["Leadership", "Culture"] },
    { display_name: "Love", designation: "Vice President", bio: "Shapes continuity across teams, sessions, and society rituals.", interests: ["Leadership", "Mentorship"] },
  ],
};

export function resolveHouse(member: Pick<MemberProfile, "year" | "designation">): HouseConfig {
  const year = (member.year || "").toLowerCase();
  if (year.includes("second")) return houses[1];
  if (year.includes("third")) return houses[2];
  if (year.includes("fourth") || year.includes("core") || year.includes("alumni")) return houses[3];
  return houses[0];
}

export function toDisplayMember(member: MemberProfile): DisplayMember {
  const house = resolveHouse(member);
  return {
    ...member,
    house: house.id,
    houseName: house.name,
    course: undefined,
    branch: undefined,
    interests: [member.designation, member.year, house.name].filter(Boolean) as string[],
  };
}

export function fallbackMembers(): DisplayMember[] {
  return houses.flatMap((house) =>
    fallbackNames[house.id].map((member, index) => ({
      _id: `${house.id}-${index}`,
      display_name: member.display_name,
      designation: member.designation,
      year: house.yearLabel,
      house: house.id,
      houseName: house.name,
      bio: member.bio,
      pfp_url: undefined,
      linkedin_url: undefined,
      personal_site: undefined,
      interests: member.interests,
    })),
  );
}
