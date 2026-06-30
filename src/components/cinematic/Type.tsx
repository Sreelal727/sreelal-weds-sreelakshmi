import styles from "./Type.module.css";

type P = { children: React.ReactNode };

export const Eyebrow = ({ children }: P) => (
  <p className={styles.eyebrow}>{children}</p>
);

export const Script = ({ children }: P) => (
  <p className={styles.script} lang="ml">
    {children}
  </p>
);

/** Cinematic narration line. */
export const Caption = ({ children }: P) => (
  <p className={styles.caption}>{children}</p>
);

export const Title = ({ children }: P) => (
  <h1 className={styles.title}>{children}</h1>
);

export const Heading = ({ children }: P) => (
  <h2 className={styles.heading}>{children}</h2>
);

export const Lead = ({ children }: P) => (
  <p className={styles.lead}>{children}</p>
);

export const Meta = ({ children }: P) => (
  <p className={styles.meta}>{children}</p>
);

export const Weds = () => <span className={styles.weds}>weds</span>;

export const Amp = () => <span className={styles.amp}>&amp;</span>;

export const Divider = ({ mark = "✦" }: { mark?: string }) => (
  <div className={styles.divider} aria-hidden>
    <span className={styles.dividerMark}>{mark}</span>
  </div>
);

export const MapButton = ({ href }: { href: string }) => (
  <a
    className={styles.mapButton}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg
      className={styles.mapPin}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
      />
    </svg>
    View Location on Map
  </a>
);
