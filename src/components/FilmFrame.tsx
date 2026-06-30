"use client";

import { useEffect, useState } from "react";

/**
 * The fixed "motion picture" overlays: letterbox bars, animated grain, a warm
 * color grade, and a scroll cue that fades out once the viewer starts moving.
 * All decorative and non-interactive.
 */
export default function FilmFrame() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="film-grade" aria-hidden />
      <div className="film-grain" aria-hidden />
      <div className="film-letterbox film-letterbox--top" aria-hidden />
      <div className="film-letterbox film-letterbox--bottom" aria-hidden />
      <div
        className="scroll-cue"
        aria-hidden
        style={{ opacity: scrolled ? 0 : 1 }}
      >
        <span className="scroll-cue__label">Scroll</span>
        <span className="scroll-cue__line" />
      </div>
    </>
  );
}
