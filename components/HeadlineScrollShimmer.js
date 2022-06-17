import { useState } from "react";
import { Parallax } from "react-scroll-parallax";
import styles from "./HeadlineScrollShimmer.module.css";
import classNames from "classnames";

export default function HeadlineScrollShimmer({ children }) {
  const [progress, setProgress] = useState(0);

  return (
    <div
      className={classNames(
        styles.typographyHeadlineStandalone,
        styles.enhanceXp
      )}
    >
      <Parallax
        onProgressChange={(progress) => {
          // console.log(progress);
          setProgress(progress);
        }}
      >
        <p
          className={styles.headlineGradient}
          style={{
            "--gradient-position": `${140 - (140 + 40) * progress}%`,
          }}
        >
          {children}
        </p>
      </Parallax>
    </div>
  );
}
