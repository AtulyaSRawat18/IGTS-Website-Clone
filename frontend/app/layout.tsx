import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "IGTS - Indian Game Theory Society, NSUT",
  description:
    "Explore strategy, decision theory, and game theory at NSUT Delhi.",
  openGraph: {
    title: "IGTS - Indian Game Theory Society, NSUT",
    description:
      "Explore strategy, decision theory, and game theory at NSUT Delhi.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGTS - Indian Game Theory Society, NSUT",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-navy">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}


