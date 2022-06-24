import { Parallax } from "react-scroll-parallax";
import styles from "./TextScale.module.css";

export default function TextScale() {
  return (
    <div className={styles.component}>
      <span className={styles.text}>
        <Parallax
          scale={[2, 20]}
          opacity={[1, 0]}
          translateY={[0, 85]}
          shouldAlwaysCompleteAnimation={true}
        >
          X
        </Parallax>
      </span>
      <div className={styles.textScroll}>Scroll↓</div>
    </div>
  );
}
