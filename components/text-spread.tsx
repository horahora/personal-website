import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/utils/isomorphic-fffect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./text-spread.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function TextSpread({ text }: { text: string }) {
  const textRef = useRef<HTMLSpanElement>(null!);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
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
    }, textRef);

    return () => ctx.revert();
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
