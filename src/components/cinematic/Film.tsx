"use client";

import { Children, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Film.module.css";

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Crossfade overlap as a fraction of one scene slot (0..0.5). */
const FADE = 0.34;

interface Layer {
  el: HTMLElement;
  bg: HTMLElement | null;
  content: HTMLElement | null;
  zoom: number;
  drift: number;
}

export interface FilmProps {
  /** Scroll length per scene, in viewport multiples. Higher = slower film. */
  unit?: number;
  children: React.ReactNode;
}

/**
 * Orchestrates a stack of <Scene> layers as one continuous "motion picture".
 * A single ScrollTrigger maps overall scroll progress to per-scene opacity
 * (crossfade), a Ken Burns zoom, and a parallax drift on each scene's
 * background + content.
 */
export default function Film({ unit = 1.35, children }: FilmProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const count = Children.count(children);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      rootRef.current?.classList.add(styles.static);
      return;
    }

    const root = rootRef.current!;
    const screen = screenRef.current!;
    const sceneEls = Array.from(
      screen.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    const n = sceneEls.length;
    if (!n) return;

    const layers: Layer[] = sceneEls.map((el) => ({
      el,
      bg: el.querySelector<HTMLElement>("[data-bg]"),
      content: el.querySelector<HTMLElement>("[data-content]"),
      zoom: parseFloat(el.dataset.zoom ?? "1.22"),
      // Clamp drift so it can never exceed the background's vertical overscan
      // (-20% in Scene.module.css) and reveal the screen behind the plate.
      drift: Math.min(11, Math.abs(parseFloat(el.dataset.drift ?? "6"))),
    }));

    const update = (p: number) => {
      const u = p * n; // global scene-space position [0..n]
      for (let i = 0; i < n; i++) {
        const L = layers[i];
        const entry = (u - (i - FADE)) / (2 * FADE);
        const exit = (u - (i + 1 - FADE)) / (2 * FADE);
        const inOp = i === 0 ? 1 : smoothstep(entry);
        const outOp = i === n - 1 ? 0 : smoothstep(exit);
        const op = clamp01(Math.min(inOp, 1 - outOp));

        const lp = clamp01(u - i); // local progress through this scene
        L.el.style.opacity = String(op);
        L.el.style.zIndex = String(Math.round(op * 100));
        L.el.style.visibility = op <= 0.002 ? "hidden" : "visible";

        if (L.bg) {
          const scale = lerp(L.zoom, 1.05, lp);
          const ty = lerp(-L.drift, L.drift, lp);
          L.bg.style.transform = `translate3d(0, ${ty}%, 0) scale(${scale})`;
        }
        if (L.content) {
          const cy = lerp(30, -30, lp);
          L.content.style.transform = `translate3d(0, ${cy}px, 0)`;
        }
      }
    };

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => update(self.progress),
      invalidateOnRefresh: true,
    });

    update(0);

    return () => {
      st.kill();
    };
  }, [count]);

  return (
    <div
      ref={rootRef}
      className={styles.film}
      style={{ height: `${count * unit * 100}vh` }}
    >
      <div ref={screenRef} className={styles.screen}>
        {children}
      </div>
    </div>
  );
}
