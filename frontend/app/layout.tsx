import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IGTS — Indian Game Theory Society, NSUT",
  description:
    "Explore strategy, decision theory, and game theory at NSUT Delhi.",
  openGraph: {
    title: "IGTS — Indian Game Theory Society, NSUT",
    description:
      "Explore strategy, decision theory, and game theory at NSUT Delhi.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGTS — Indian Game Theory Society, NSUT",
    description:
      "Explore strategy, decision theory, and game theory at NSUT Delhi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
