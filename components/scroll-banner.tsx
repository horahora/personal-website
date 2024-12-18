import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./scroll-banner.module.css";

export default function ScrollBanner() {
  const scrollTriggerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    (self) => {
      self.selector?.(".banner").forEach((item: HTMLElement) => {
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
    },
    { scope: scrollTriggerRef }
  );

  return (
    <div className={styles.component}>
      <div className={styles.bannersWrapper} ref={scrollTriggerRef}>
        <div
          className={`${styles.banner} banner`}
          style={{
            marginBottom: "10vmax",
            transform: "translateX(-50vw) rotate(26deg)",
          }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="50"
            data-to-x-percent="-50"
          >
            {"CAUTION!!".repeat(6)}
          </div>
        </div>
        <div
          className={`${styles.banner} banner`}
          style={{ marginBottom: "6vmax" }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="-100"
            data-to-x-percent="0"
          >
            {"CAUTION!!".repeat(3)}
          </div>
        </div>
        <div
          className={`${styles.banner} banner`}
          style={{
            marginBottom: "4vmax",
            transform: "rotate(9deg)",
          }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="50"
            data-to-x-percent="-50"
          >
            {"CAUTION!!".repeat(5)}
          </div>
        </div>
        <div
          className={`${styles.banner} banner`}
          style={{
            transform: "translateX(-50vmax) rotate(-19deg)",
          }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="-100"
            data-to-x-percent="0"
          >
            {"CAUTION!!".repeat(6)}
          </div>
        </div>
        <div
          className={`${styles.banner} banner`}
          style={{
            transform: "translateX(-10vmax) rotate(3deg)",
          }}
        >
          <div
            className={`${styles.text} text`}
            data-from-x-percent="50"
            data-to-x-percent="-90"
          >
            {"CAUTION!!".repeat(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
