/**
 * THE FILM — Sreelal & Sreelakshmi · a Ghibli-style love story → Payyoli wedding.
 * Order = scroll order. Scenes without an `image` use the warm `gradient` as a
 * placeholder until the AI image is generated (drop it in /public/scenes and
 * set `image`). Aspect: portrait images get a `focus` to keep faces in frame
 * on wide screens.
 */

export interface SceneData {
  id: string;
  image?: string;
  gradient: string;
  /** object-position to keep the subject framed across screen sizes. */
  focus?: string;
  zoom?: number;
  drift?: number;
  fit?: "cover" | "contain" | "responsive";
  placement?: "center" | "bottom" | "top";
  scrim?: "bottom" | "center" | "top" | "none";
  priority?: boolean;
}

export const scenes: Record<string, SceneData> = {
  office: {
    id: "office",
    image: "/scenes/office.webp",
    gradient: "linear-gradient(160deg, oklch(80% 0.06 75), oklch(60% 0.08 55))",
    focus: "center 32%",
    placement: "bottom",
    priority: true,
  },
  notification: {
    id: "notification",
    image: "/scenes/notification.webp",
    gradient: "linear-gradient(160deg, oklch(78% 0.06 72), oklch(58% 0.08 52))",
    fit: "contain",
    placement: "top",
    scrim: "top",
    priority: true,
  },
  reaction: {
    id: "reaction",
    image: "/scenes/reaction.webp",
    gradient: "linear-gradient(160deg, oklch(82% 0.07 60), oklch(64% 0.10 40))",
    focus: "center 28%",
    placement: "bottom",
  },
  // MISSING IMAGE — warm golden-hour sky placeholder.
  train: {
    id: "train",
    gradient:
      "linear-gradient(180deg, oklch(82% 0.10 78) 0%, oklch(66% 0.13 56) 55%, oklch(50% 0.12 42) 100%)",
    placement: "center",
    scrim: "center",
  },
  station: {
    id: "station",
    image: "/scenes/station.webp",
    fit: "responsive",
    gradient: "linear-gradient(160deg, oklch(80% 0.07 70), oklch(60% 0.09 50))",
    focus: "center 42%",
    placement: "bottom",
  },
  // MISSING IMAGE — warm green-gold village road placeholder.
  walk: {
    id: "walk",
    gradient:
      "linear-gradient(165deg, oklch(74% 0.10 115) 0%, oklch(58% 0.10 80) 52%, oklch(44% 0.08 58) 100%)",
    placement: "center",
    scrim: "center",
  },
  house: {
    id: "house",
    image: "/scenes/house.webp",
    fit: "responsive",
    gradient: "linear-gradient(160deg, oklch(78% 0.07 68), oklch(58% 0.09 48))",
    focus: "center 45%",
    placement: "bottom",
  },
  // The aerial decorated-venue shot — used as a visual breath / transition.
  transition: {
    id: "transition",
    image: "/scenes/transition.webp",
    fit: "responsive",
    gradient: "linear-gradient(160deg, oklch(78% 0.07 66), oklch(56% 0.09 46))",
    focus: "center 50%",
    placement: "bottom",
    scrim: "none",
  },
  gate: {
    id: "gate",
    image: "/scenes/gate.webp",
    fit: "responsive",
    gradient: "linear-gradient(160deg, oklch(76% 0.08 62), oklch(56% 0.10 44))",
    focus: "center 40%",
    placement: "bottom",
  },
  pandal: {
    id: "pandal",
    image: "/scenes/pandal.webp",
    fit: "responsive",
    gradient: "linear-gradient(160deg, oklch(74% 0.08 60), oklch(54% 0.10 42))",
    focus: "center 45%",
    placement: "bottom",
  },
  fire: {
    id: "fire",
    image: "/scenes/fire.webp",
    fit: "responsive",
    gradient: "linear-gradient(160deg, oklch(60% 0.10 50), oklch(38% 0.10 40))",
    focus: "center 42%",
    placement: "bottom",
  },
  // MISSING IMAGE — glowing golden bokeh placeholder (looks intentional as-is).
  closing: {
    id: "closing",
    gradient:
      "radial-gradient(circle at 50% 42%, oklch(84% 0.12 82) 0%, oklch(62% 0.13 52) 45%, oklch(40% 0.10 40) 100%)",
    placement: "center",
    scrim: "center",
  },
};

/** Couple + event details — single source of truth. */
export const wedding = {
  groom: "Sreelal",
  bride: "Sreelakshmi",
  date: "Sunday · 30 · 08 · 2026",
  // Malayalam (Kollavarsham) date: 30 Aug 2026 = Chingam 14, ME 1202.
  malayalamDate: "കൊല്ലവർഷം 1202 · ചിങ്ങം 14",
  star: "ഉത്രട്ടാതി നക്ഷത്രം",
  muhurtham: "Muhurtham · 10:30 – 11:25 AM",
  venue: "Bride's Home · Payyoli",
};
