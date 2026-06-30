import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import FilmFrame from "@/components/FilmFrame";
import BackgroundMusic from "@/components/BackgroundMusic";
import "../styles/tokens.css";
import "../styles/film.css";
import "./globals.css";

const SITE_URL = "https://sreelal-weds-sreelakshmi.vercel.app";
const TITLE = "Sreelal & Sreelakshmi · We're Getting Married";
const DESCRIPTION =
  "A little story, and an invitation. Join us as we begin forever — 30 August 2026, Payyoli, Kerala.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sreelal & Sreelakshmi",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Sreelal & Sreelakshmi — The Wedding · 30 August 2026, Payyoli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
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
