import type { Metadata, Viewport } from "next";
import styles from "./page.module.css";

export const viewport: Viewport = {
  themeColor: "hsl(79deg 19% 96%)",
};

export const metadata: Metadata = {
  title: "Waves - Hora Hora",
};

export default function Waves() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.innerHeader}>
          <h1 className={styles.title}>Waves</h1>
        </div>
        <div>
          <svg
            className={styles.waves}
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className={styles.parallax}>
              <use
                href="#gentle-wave"
                x="48"
                y="0"
                fill="hsla(79deg 19% 96% / .7)"
              />
              <use
                href="#gentle-wave"
                x="48"
                y="3"
                fill="hsla(79deg 19% 96% /.5)"
              />
              <use
                href="#gentle-wave"
                x="48"
                y="5"
                fill="hsla(79deg 19% 96% /.3)"
              />
              <use href="#gentle-wave" x="48" y="7" fill="hsl(79deg 19% 96%)" />
            </g>
          </svg>
        </div>
      </div>

      <div className={styles.content}>{/* <p>some content</p> */}</div>
    </>
  );
}
