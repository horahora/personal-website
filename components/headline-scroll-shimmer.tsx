import { useState, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/utils/isomorphic-fffect";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./headline-scroll-shimmer.module.css";
import classNames from "classnames";

gsap.registerPlugin(ScrollTrigger);

export default function HeadlineScrollShimmer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const scrollTriggerRef = useRef<HTMLDivElement>(null!);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    }, scrollTriggerRef);

    return () => ctx.revert();
  }, []);

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
          style={{
            ["--gradient-position" as any]: `${140 - (140 + 40) * progress}%`,
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
