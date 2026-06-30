import { Marcellus, Cormorant_Garamond, Noto_Serif_Malayalam } from "next/font/google";

/** Display — classical Roman caps, quietly regal. Used for names & headings. */
export const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** Serif accent / body — warm, literary, beautiful italics for quotes. */
export const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

/** Malayalam script — for authentic Nair-tradition accents (ശുഭമംഗളം). */
export const malayalam = Noto_Serif_Malayalam({
  weight: ["400", "500", "600"],
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  display: "swap",
});

export const fontVariables = `${marcellus.variable} ${cormorant.variable} ${malayalam.variable}`;
