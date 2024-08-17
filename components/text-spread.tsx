import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./text-spread.module.css";

export default function TextSpread({ text }: { text: string }) {
  const textRef = useRef<HTMLSpanElement>(null!);

  useGSAP(
    (self) => {
      (self.selector?.(".letter") as HTMLElement[]).forEach((letter, i, a) => {
        // TODO: 小屏断点水平位移小一点
        gsap.to(letter, {
          x: 50 * (i - (a.length - 1) / 2),
          scrollTrigger: {
            trigger: textRef.current,
            scrub: 0.5,
            // markers: true,
          },
        });
      });
    },
    { scope: textRef }
  );

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
