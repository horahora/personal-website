import { Parallax } from "react-scroll-parallax";
import styles from "./TextSpread.module.css";

export default function TextSpread({ text }) {
  return (
    <div className={styles.component}>
      <span className={styles.text}>
        {text.split("").map((letter, i) => (
          <Parallax
            key={i}
            translateX={[0, 100 * (i - (text.length - 1) / 2)]}
            className={styles.letter}
            shouldAlwaysCompleteAnimation={true}
          >
            {letter}
          </Parallax>
        ))}
      </span>
    </div>
  );
}
