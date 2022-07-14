import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./TextSpread.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function TextSpread({ text }) {
  const textRef = useRef();
  const q = gsap.utils.selector(textRef);

  useLayoutEffect(() => {
    q(".letter").forEach((letter, i, a) => {
      gsap.to(letter, {
        x: 50 * (i - (a.length - 1) / 2),
        scrollTrigger: {
          trigger: textRef.current,
          scrub: 0.5,
          // markers: true,
        },
      });
    });
  }, []);

  return (
    <div className={styles.component}>
      <span className={styles.text} ref={textRef}>
        {text.split("").map((letter, i) => (
          <span key={i} className={`${styles.letter} letter`}>
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}
