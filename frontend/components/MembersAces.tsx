"use client";

import { useState } from "react";
import AceCard, { type Suit } from "./AceCard";
import Placard from "./Placard";

type YearGroup = {
  suit: Suit;
  year: string;
  label: string;
  // PLACEHOLDER DATA — replace with your real roster (name + role).
  // Consider loading this from a JSON file or CMS once you have real data.
  members: { name: string; role: string }[];
};

const YEARS: YearGroup[] = [
  {
    suit: "spades",
    year: "1st Year",
    label: "Freshers",
    members: [
      { name: "Aarav Mehta", role: "Member" },
      { name: "Diya Kapoor", role: "Member" },
      { name: "Kabir Singh", role: "Member" },
      { name: "Ishita Rao", role: "Member" },
      { name: "Vivaan Joshi", role: "Member" },
      { name: "Ananya Nair", role: "Member" },
    ],
  },
  {
    suit: "hearts",
    year: "2nd Year",
    label: "Sophomores",
    members: [
      { name: "Reyansh Gupta", role: "Member" },
      { name: "Myra Sharma", role: "Content Lead" },
      { name: "Arjun Verma", role: "Member" },
      { name: "Sara Malhotra", role: "Member" },
      { name: "Vihaan Chatterjee", role: "Design Lead" },
    ],
  },
  {
    suit: "diamonds",
    year: "3rd Year",
    label: "Juniors",
    members: [
      { name: "Aditya Iyer", role: "Events Head" },
      { name: "Kiara Desai", role: "Research Lead" },
      { name: "Rohan Bose", role: "Member" },
      { name: "Naisha Pillai", role: "Member" },
    ],
  },
  {
    suit: "clubs",
    year: "4th Year",
    label: "Seniors",
    members: [
      { name: "Dhruv Khanna", role: "President" },
      { name: "Anaya Reddy", role: "Vice President" },
      { name: "Vivan Saxena", role: "Technical Head" },
      { name: "Aisha Bhatt", role: "Outreach Head" },
    ],
  },
];

// Slight rotation per card for a fanned "hand of cards" look at rest.
const FAN_ROTATION = [-9, -3, 3, 9];
const FAN_LIFT = [8, 0, 0, 8];

export default function MembersAces() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex w-full flex-col items-center gap-10 md:gap-14">
      <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6">
        {YEARS.map((group, i) => (
          <div
            key={group.suit}
            style={{
              transform:
                selected === null
                  ? `rotate(${FAN_ROTATION[i]}deg) translateY(${FAN_LIFT[i]}px)`
                  : selected === i
                    ? "rotate(0deg) translateY(-8px) scale(1.08)"
                    : "rotate(0deg) translateY(0px) scale(0.92)",
              transition: "transform 500ms ease-out",
            }}
          >
            <AceCard
              suit={group.suit}
              active={selected === i}
              faded={selected !== null && selected !== i}
              onClick={() => setSelected(selected === i ? null : i)}
            />
            <p
              className={`mt-3 text-center text-[11px] uppercase tracking-[0.2em] transition-opacity duration-500 ${
                selected !== null && selected !== i
                  ? "opacity-30"
                  : "opacity-100"
              } ${selected === i ? "text-gold" : "text-white/60"}`}
            >
              {group.year}
            </p>
          </div>
        ))}
      </div>

      {/* Reveal panel */}
      <div
        className={`w-full transition-all duration-500 ${
          selected !== null
            ? "max-h-[600px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        {selected !== null && (
          <div className="flex justify-center px-4">
            <Placard eyebrow={YEARS[selected].year} wide>
              <h3 className="font-serif text-3xl font-semibold text-white md:text-5xl">
                {YEARS[selected].label}
              </h3>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 text-left sm:grid-cols-2">
                {YEARS[selected].members.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-baseline justify-between border-b border-white/10 pb-2"
                  >
                    <span className="text-white/90">{member.name}</span>
                    <span className="text-xs uppercase tracking-wide text-gold/70">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </Placard>
          </div>
        )}
      </div>

      {selected === null && (
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
          Pick a year to see its members
        </p>
      )}
    </div>
  );
}
