"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./BackgroundMusic.module.css";

/**
 * Background score: /public/audio/wedding-theme.mp3
 * Currently Erik Satie — Gymnopédie No. 1 (recording: CC0 / public domain,
 * via Wikimedia Commons). Swap the file to change the track.
 */
const TRACK = "/audio/wedding-theme.mp3";
const TARGET_VOLUME = 0.38;
const FADE_IN_MS = 2400;
const FADE_OUT_MS = 600;

/**
 * Ambient background score. Browsers block autoplay-with-sound, so the track
 * fades in on the viewer's first interaction (scroll/tap/key) and a small
 * glassy control lets them mute/unmute. Renders nothing if the file is absent.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  const fadeTo = useCallback((target: number, ms: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * k));
      if (k < 1) rafRef.current = requestAnimationFrame(step);
      else {
        rafRef.current = null;
        done?.();
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const enable = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeTo(TARGET_VOLUME, FADE_IN_MS);
      })
      .catch(() => {
        /* autoplay blocked or file missing — control stays available to retry */
      });
  }, [fadeTo]);

  const disable = useCallback(() => {
    setPlaying(false);
    fadeTo(0, FADE_OUT_MS, () => audioRef.current?.pause());
  }, [fadeTo]);

  // Start on the first user gesture (required by autoplay policy).
  useEffect(() => {
    const events = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"];
    let started = false;
    const startOnce = () => {
      if (started) return;
      started = true;
      events.forEach((e) => window.removeEventListener(e, startOnce));
      enable();
    };
    events.forEach((e) =>
      window.addEventListener(e, startOnce, { passive: true }),
    );
    return () => events.forEach((e) => window.removeEventListener(e, startOnce));
  }, [enable]);

  if (!available) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK}
        loop
        preload="auto"
        onError={() => setAvailable(false)}
      />
      <button
        type="button"
        className={styles.toggle}
        data-on={playing}
        onClick={() => (playing ? disable() : enable())}
        aria-label={playing ? "Mute music" : "Play music"}
        aria-pressed={playing}
      >
        <span className={styles.bars} aria-hidden>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
      </button>
    </>
  );
}
