import Image from "next/image";
import styles from "./Scene.module.css";

type Align = "center" | "left" | "right";
type Placement = "center" | "bottom" | "top";
type Scrim = "bottom" | "center" | "top" | "none";
type Fit = "cover" | "contain";

const DEFAULT_GRADIENT =
  "linear-gradient(160deg, oklch(72% 0.07 70), oklch(52% 0.09 48))";

export interface SceneProps {
  /** Scene id (passthrough so scene data objects can be spread directly). */
  id?: string;
  /** Optimized image in /public (e.g. /scenes/house.webp). */
  image?: string;
  /** Warm gradient shown as load placeholder, or as the backdrop when no image. */
  gradient?: string;
  /** object-position for cover images (keep subject in frame across screens). */
  focus?: string;
  align?: Align;
  /** Where the text overlay sits within the frame. */
  placement?: Placement;
  /** Legibility scrim behind the text. */
  scrim?: Scrim;
  /** "cover" = full-bleed (faces/landscapes). "contain" = whole image shown
   *  centered over a blurred fill (detail shots where the art must be readable). */
  fit?: Fit;
  /** Ken Burns starting zoom. */
  zoom?: number;
  /** Parallax drift (%). */
  drift?: number;
  /** Eager-load (use for the first 1–2 scenes only). */
  priority?: boolean;
  children?: React.ReactNode;
}

/**
 * A cinematic layer: a full-bleed (or contained) image with a Ken Burns plate,
 * a legibility scrim, and a text overlay. Opacity/parallax driven by <Film>.
 * Fully responsive — `focus` keeps cover subjects framed; `contain` guarantees
 * the whole image is visible behind a blurred fill.
 */
export default function Scene({
  image,
  gradient,
  focus = "center",
  align = "center",
  placement = "center",
  scrim = "bottom",
  fit = "cover",
  zoom = 1.16,
  drift = 5,
  priority = false,
  children,
}: SceneProps) {
  const scrimClass =
    scrim === "none"
      ? null
      : scrim === "center"
        ? styles.scrimCenter
        : scrim === "top"
          ? styles.scrimTop
          : styles.scrimBottom;

  const placeClass =
    placement === "bottom"
      ? styles.placeBottom
      : placement === "top"
        ? styles.placeTop
        : "";

  return (
    <div data-scene data-zoom={zoom} data-drift={drift} className={styles.scene}>
      {/* Ken Burns plate — cover image, or a blurred fill when fit=contain. */}
      <div
        data-bg
        className={styles.bg}
        style={{ backgroundImage: gradient ?? DEFAULT_GRADIENT }}
      >
        {image && (
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className={fit === "contain" ? styles.imgBlur : styles.img}
            style={fit === "cover" ? { objectPosition: focus } : undefined}
          />
        )}
      </div>

      {/* Sharp, fully-visible image for detail shots. */}
      {image && fit === "contain" && (
        <div className={styles.plate}>
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className={styles.imgContain}
          />
        </div>
      )}

      <div className={styles.vignette} />
      {scrimClass && <div className={scrimClass} />}

      <div
        data-content
        className={`${styles.content} ${placeClass}`}
        data-align={align}
      >
        {children}
      </div>
    </div>
  );
}
