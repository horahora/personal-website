import { useLayoutEffect, useEffect, useRef } from "react";

import styles from "./TextScale.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextScale() {
  const pinContainerRef = useRef();
  const textScrollRef = useRef();
  const q = gsap.utils.selector(pinContainerRef);

  useLayoutEffect(() => {
    // gsap.set(textRef.current, {
    //   scale: 1,
    //   opacity: 1,
    //   yPercent: 0,
    // });
    const scrollTrigger = {
      start: "bottom center",
      trigger: pinContainerRef.current,
      scrub: 0.5,
      pin: true,
      // markers: true,
    };

    gsap.fromTo(
      q(".letter")[1],
      {
        scale: 1,
        opacity: 1,
      },
      {
        scale: 20,
        opacity: 0,
        ease: "back.in(0.7)",
        scrollTrigger: scrollTrigger,
      }
    );
    gsap.fromTo(
      q(".letter")[0],
      {
        xPercent: 0,
      },
      {
        opacity: 0,
        xPercent: -200,
        scrollTrigger: scrollTrigger,
      }
    );
    gsap.fromTo(
      q(".letter")[2],
      {
        xPercent: 0,
      },
      {
        opacity: 0,
        xPercent: 200,
        scrollTrigger: scrollTrigger,
      }
    );

    gsap.fromTo(
      textScrollRef.current,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        scrollTrigger: scrollTrigger,
      }
    );
  }, []);

  return (
    <div className={styles.component}>
      <div ref={pinContainerRef} className={styles.text}>
        <span className={`${styles.letter} letter`}>O</span>
        <span className={`${styles.letter} letter`}>X</span>
        <span className={`${styles.letter} letter`}>O</span>
      </div>

      <div className={styles.textScroll} ref={textScrollRef}>
        Scroll↓
      </div>
    </div>
  );
}
