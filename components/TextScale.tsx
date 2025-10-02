import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./TextScale.module.css";

export default function TextScale() {
  const pinContainerRef = useRef<HTMLDivElement>(null!);
  const textScrollRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            start: "bottom center",
            trigger: pinContainerRef.current,
            scrub: 0.5,
            pin: true,
            // markers: true,
          },
        })
        .to(".letter:nth-child(2)", {
          scale: 20,
          opacity: 0,
          ease: "back.in(0.7)",
        })
        .to(
          ".letter:nth-child(1)",
          {
            opacity: 0,
            xPercent: -200,
          },
          "<"
        )
        .to(
          ".letter:nth-child(3)",
          {
            opacity: 0,
            xPercent: 200,
          },
          "<"
        )
        .to(
          textScrollRef.current,
          {
            opacity: 0,
          },
          "<"
        );
    },
    { scope: pinContainerRef }
  );

  return (
    <div className={styles.component}>
      <div ref={pinContainerRef} className={styles.text}>
        <span className={`${styles.letter} letter`}>X</span>
        <span className={`${styles.letter} letter`}>O</span>
        <span className={`${styles.letter} letter`}>X</span>
      </div>

      <div className={styles.textScroll} ref={textScrollRef}>
        Scroll↓
      </div>
    </div>
  );
}
