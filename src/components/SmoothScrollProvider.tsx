"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Drives the whole site's "motion picture" feel:
 *  - Lenis gives weighted, inertial smooth scrolling
 *  - GSAP ScrollTrigger reads that scroll to scrub scene timelines
 *  - The two are synced on a single RAF ticker so scrubbing never jitters
 *
 * Respects prefers-reduced-motion: falls back to native scroll, no scrub.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      // Frame-rate-independent smoothing — lower lerp = silkier, more floating
      // glide. Tuned for a cinematic, weighted feel without going laggy.
      lerp: 0.07,
      // Gentler wheel + trackpad response so the glide stays smooth, not jumpy.
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.5,
      // Used for programmatic scrollTo easing.
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Debug handle (dev only) so transitions can be driven deterministically.
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Recalculate trigger positions once fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
