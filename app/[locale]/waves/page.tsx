import styles from "./page.module.css";

export default function Waves() {
  return (
    <>
      <div className="relative text-center text-[hsl(79deg_19%_96%)] bg-linear-60/oklch from-[rgb(75,52,169)] to-[rgb(2,163,184)]">
        <div className="h-[65vh] flex justify-center items-center text-center">
          <h1
            className={`font-extralight tracking-[2px] text-[42px] md:text-[66px] ${styles.title}`}
          >
            Waves
          </h1>
        </div>
        <svg
          className="w-full h-[5vh] md:h-[15vh] min-h-10 md:min-h-[100px] max-h-[150px]"
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

      <div className="h-[30vh] md:h-[20vh] text-center bg-[hsl(79deg_19%_96%)] flex justify-center items-center">
        {/* <p>some content</p> */}
      </div>
    </>
  );
}
