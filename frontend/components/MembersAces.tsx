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
      { name: "Your Name can be here", role: "" },
    ],
  },
  {
    suit: "hearts",
    year: "2nd Year",
    label: "Sophomores",
    members: [
      { name: "Manav", role: "  Jr Developer" },
      { name: "Atulya  ", role: "  Jr Developer" },
      { name: "Prince", role: "Jr Developer" },
      { name: "Tunishi", role: "member" },
      { name: "Vinayak KAUSHIK", role: "member" },
  { name: "Satyam IGTS Mac", role: "member" },
  { name: "Daksh Joya", role: "member" },
  { name: "Aatman", role: "member" },
  { name: "Adi", role: "member" },
  { name: "akanksha sachdeva", role: "member" },
  { name: "Alokik Sharma", role: "member" },
  { name: "Ananshi Goel", role: "member" },
  { name: "Animesh Verma", role: "member" },
  { name: "Anshika Sharma", role: "member" },
  { name: "Arnav Mathur", role: "member" },
  { name: "Ashish", role: "member" },
  { name: "Atharv", role: "member" },
  { name: "Atulya", role: "member" },
  { name: "Ayush", role: "member" },
  { name: "Bhavya Jain", role: "member" },
  { name: "Daksh", role: "member" },
  { name: "Farhan Alam", role: "member" },
  { name: "Garima", role: "member" },
  { name: "Gopal", role: "member" },
  { name: "Ishaan", role: "member" },
  { name: "Jhanvi Agrawal", role: "member" },
  { name: "jigisha sharma", role: "member" },
  { name: "Kapil Yadav", role: "member" },
  { name: "Keshav", role: "member" },
  { name: "Krishna", role: "member" },
  { name: "Manasvi Shandilya", role: "member" },
  { name: "Mohit", role: "member" },
  { name: "Ojas Babbar", role: "member" },
  { name: "oOooOo", role: "member" },
  { name: "pouli", role: "member" },
  { name: "prince", role: "member" },
  { name: "shashank", role: "member" },
  { name: "Shreya Gupta", role: "member" },
  { name: "Sneha", role: "member" },
  { name: "Tanishi Agarwal", role: "member" },
  { name: "Tanmay Rana", role: "member" },
  { name: "Tushar Karn", role: "member" },
  { name: "Utkarsh Jain", role: "member" },
  { name: "Vansh Dua", role: "member" },
  { name: "Vedang", role: "member" },
  { name: "Yug Pandey", role: "member" }
    ],
  },
  {
    suit: "diamonds",
    year: "3rd Year",
    label: "Seniors",
    members: [
      { name: "Yash", role: "Development Lead" },
      { name: "Manish", role: "member" },
      { name: "Navya", role: "Member" },
      { name: "Harsh", role: "Member" },
      { name: "Samik", role: "Member" },
    ],
  },
  {
    suit: "clubs",
    year: "4th Year",
    label: "Super Seniors",
    members: [
      { name: "Sourav", role: "President" },
      { name: "Love", role: "Vice President" },
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
