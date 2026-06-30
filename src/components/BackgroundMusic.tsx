"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./BackgroundMusic.module.css";

/** Background score: /public/audio/wedding-theme.mp3 (swap the file to change). */
const TRACK = "/audio/wedding-theme.mp3";
const TARGET_VOLUME = 0.5;
const FADE_IN_MS = 2200;
const FADE_OUT_MS = 600;

/**
 * Ambient background score — ON by default. Browsers block autoplay-with-sound
 * until the visitor interacts, so we try to start immediately and, if blocked,
 * start on the very first interaction (scroll / tap / key) — no need to find
 * the button. The corner control then mutes/unmutes.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const enabledRef = useRef(true);
  const startedRef = useRef(false);
  const [enabled, setEnabled] = useState(true);
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

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return Promise.reject(new Error("no audio"));
    audio.volume = 0;
    return audio.play().then(() => {
      startedRef.current = true;
      fadeTo(TARGET_VOLUME, FADE_IN_MS);
    });
  }, [fadeTo]);

  const stop = useCallback(() => {
    fadeTo(0, FADE_OUT_MS, () => audioRef.current?.pause());
  }, [fadeTo]);

  // Start as early as allowed: immediately, else on the first interaction.
  useEffect(() => {
    const events = [
      "pointerdown",
      "touchstart",
      "click",
      "keydown",
      "wheel",
      "scroll",
    ];
    let removed = false;
    const remove = () => {
      if (removed) return;
      removed = true;
      events.forEach((e) => window.removeEventListener(e, attempt));
    };
    const attempt = () => {
      if (!enabledRef.current || startedRef.current) {
        remove();
        return;
      }
      play()
        .then(remove)
        .catch(() => {
          /* still blocked — wait for the next interaction */
        });
    };
    attempt(); // best-effort immediate autoplay
    events.forEach((e) =>
      window.addEventListener(e, attempt, { passive: true }),
    );
    return remove;
  }, [play]);

  // Pause when the tab/app is backgrounded; resume on return (if still enabled).
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else if (enabledRef.current && startedRef.current) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onVisibility);
    };
  }, []);

  const toggle = () => {
    if (enabled) {
      enabledRef.current = false;
      setEnabled(false);
      stop();
    } else {
      enabledRef.current = true;
      startedRef.current = false;
      setEnabled(true);
      play().catch(() => {});
    }
  };

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
        data-on={enabled}
        onClick={toggle}
        aria-label={enabled ? "Mute music" : "Play music"}
        aria-pressed={enabled}
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
