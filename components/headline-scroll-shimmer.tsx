import { useState, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./headline-scroll-shimmer.module.css";
import classNames from "classnames";

export default function HeadlineScrollShimmer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const scrollTriggerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: scrollTriggerRef.current,
        start: "center center",
        end: "bottom top",
        scrub: 0.5,
        pin: true,
        // markers: true,
        onUpdate(self) {
          setProgress(self.progress);
        },
      });
    },
    { scope: scrollTriggerRef }
  );

  return (
    <div
      className={classNames(
        styles.typographyHeadlineStandalone,
        styles.enhanceXp
      )}
      style={{ minHeight: "35vh" }}
    >
      <div ref={scrollTriggerRef}>
        <p
          className={styles.headlineGradient}
          style={
            {
              ["--gradient-position"]: `${140 - (140 + 40) * progress}%`,
            } as React.CSSProperties
          }
        >
          {children}
        </p>
      </div>
    </div>
  );
}
