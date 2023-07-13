"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ColumnScroll() {
  const cubeRef = useRef<HTMLDivElement>(null!);
  let proxy = { rotateX: 0 };
  useEffect(() => {
    const clamp = gsap.utils.clamp(-60, 60);
    gsap.to(`.${styles.columnWrapper}`, {
      // y: "100%",
      scrollTrigger: {
        trigger: `.${styles.columnWrapper}`,
        start: "top top", // The default is "top bottom" unless pin: true is set in which case the default value is "top top".
        end: "bottom bottom", //  The default is "bottom top".
        markers: true, // Adds markers that are helpful during development/troubleshooting.
        scrub: 3,
        onUpdate: (self) => {
          console.log(
            "progress:",
            self.progress.toFixed(3),
            "direction:",
            self.direction,
            "velocity",
            self.getVelocity()
          );
          let rotateX = clamp(self.getVelocity() / 100);
          cubeRef.current.style.transform = `translate3d(0, ${-rotateX}px, 0) perspective(1000px) rotateX(${-rotateX}deg)`;
          if (Math.abs(rotateX) > Math.abs(proxy.rotateX)) {
            proxy.rotateX = rotateX;
            gsap.to(proxy, {
              rotateX: 0,
              duration: 0.8,
              ease: "power3",
              // overwrite: true,
              onUpdate() {
                cubeRef.current.style.transform = `translate3d(0, ${-proxy.rotateX}px, 0) perspective(1000px) rotateX(${-proxy.rotateX}deg)`;
              },
            });
          }
        },
      },
    });

    // window.addEventListener(
    //   "scroll",
    //   () => {
    //     document.querySelectorAll(`.columnWrapper`).forEach((column) => {
    //       console.log(document.documentElement.scrollTop);
    //       column.style.transform = `translateY(1.5*${document.documentElement.scrollTop}px)`;
    //     });
    //   },
    //   {
    //     passive: true,
    //   }
    // );
  }, []);

  return (
    <>
      <div className={styles.cube} ref={cubeRef}>
        cube
      </div>
      <div className={styles.columns}>
        <div className={styles.column}>
          <div
            className={`${styles.columnWrapper} ${styles.reverse} columnWrapper`}
            style={{ height: "1000vh" }}
          >
            <figure>
              <img src="/images/media-cover/yiyi.png" width="900" />
            </figure>
            <figure>
              <img
                src="/images/media-cover/chungking-express.jpg"
                width="900"
              />
            </figure>
            <figure>
              <img src="/images/media-cover/fallen-angels.jpg" width="900" />
            </figure>
            <figure>
              <img src="/images/media-cover/happy-together.jpg" width="900" />
            </figure>
            <figure>
              <img
                src="/images/media-cover/in-the-mood-for-love.jpg"
                width="900"
              />
            </figure>
            <figure>
              <img src="/images/media-cover/zero-degree.jpg" width="900" />
            </figure>
          </div>
        </div>
        <div className={styles.column}>
          <figure>
            <img src="/images/media-cover/yiyi.png" width="300" />
          </figure>
        </div>
      </div>
    </>
  );
}
