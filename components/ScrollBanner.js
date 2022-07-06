import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./ScrollBanner.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollBanner() {
  const scrollTriggerRef = useRef();
  const q = gsap.utils.selector(scrollTriggerRef);

  useLayoutEffect(() => {
    q(".banner").forEach((item, i) => {
      gsap.fromTo(
        item.querySelector(".text"),
        {
          xPercent(index, target) {
            return target.dataset.fromXPercent;
          },
        },
        {
          xPercent(index, target) {
            return target.dataset.toXPercent;
          },
          scrollTrigger: {
            trigger: item,
            scrub: 2,
          },
        }
      );
    });
  }, []);

  return (
    <div className={styles.component}>
      <div className={styles.bannersWrapper} ref={scrollTriggerRef}>
        <div
          className={`${styles.banner} banner`}
          style={{
            marginBottom: "10vw",
            transform: "translateX(-50vw) rotate(26deg)",
          }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="50"
            data-to-x-percent="-50"
          >
            {new Array(6).fill("CAUTION!!").join("")}
          </div>
        </div>
        <div
          className={`${styles.banner} banner`}
          style={{ marginBottom: "6vw" }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="-100"
            data-to-x-percent="0"
          >
            {new Array(3).fill("CAUTION!!").join("")}
          </div>
        </div>
        <div
          className={`${styles.banner} banner`}
          style={{
            marginBottom: "4vw",
            transform: "rotate(9deg)",
          }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="50"
            data-to-x-percent="-50"
          >
            {new Array(5).fill("CAUTION!!").join("")}
          </div>
        </div>
        <div
          className={`${styles.banner} banner`}
          style={{
            transform: "translateX(-50vw) rotate(-19deg)",
          }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="-100"
            data-to-x-percent="0"
          >
            {new Array(6).fill("CAUTION!!").join("")}
          </div>
        </div>
        <div
          className={`${styles.banner} banner`}
          style={{
            transform: "translateX(-10vw) rotate(3deg)",
          }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="50"
            data-to-x-percent="-50"
          >
            {new Array(2).fill("CAUTION!!").join("")}
          </div>
        </div>
      </div>
    </div>
  );
}
