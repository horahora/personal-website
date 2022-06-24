import { Parallax } from "react-scroll-parallax";
import styles from "./SlideToCenter.module.css";

export default function SlideToCenter() {
  return (
    <div className={styles.component}>
      <div className={styles.left}>
        <Parallax
          translateX={["-200px", "0px"]}
          translateY={["50px", "0px"]}
          shouldAlwaysCompleteAnimation={false}
          endScroll={100}
        >
          <img
            src="/images/media-cover/zero-degree.jpg"
            width="300"
            height="450"
          />
        </Parallax>
      </div>
      <div className={styles.right}>
        <Parallax translateX={["200px", "0px"]} translateY={["50px", "0px"]}>
          <img
            src="/images/media-cover/in-the-mood-for-love.jpg"
            width="300"
            height="450"
          />
        </Parallax>
      </div>
    </div>
  );
}
