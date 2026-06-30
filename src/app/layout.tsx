import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import FilmFrame from "@/components/FilmFrame";
import BackgroundMusic from "@/components/BackgroundMusic";
import "../styles/tokens.css";
import "../styles/film.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sreelal & Sreelakshmi · We're Getting Married",
  description:
    "A little story, and an invitation. Join us as we begin forever — 30 August 2026, Payyoli, Kerala.",
};

export const viewport: Viewport = {
  themeColor: "#1a120c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <FilmFrame />
        <BackgroundMusic />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
