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
