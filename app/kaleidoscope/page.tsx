"use client";

import { useRef } from "react";
import styles from "./page.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/dist/Observer";

gsap.registerPlugin(useGSAP, Observer);

export default function Kaleidoscope() {
  const pageRef = useRef<HTMLDivElement>(null!);
  let velocity = 0;

  useGSAP(
    () => {
      Observer.create({
        target: pageRef.current,
        tolerance: 5,
        preventDefault: true,
        onChange(self) {
          console.log(self.velocityX, self.velocityY, self.isDragging);
          if (
            Math.abs(self.velocityY) > Math.abs(velocity) ||
            (self.deltaY < 0 && velocity > 0) ||
            (self.deltaY > 0 && velocity < 0) ||
            self.isDragging
          ) {
            gsap.killTweensOf(pageRef.current);
            velocity =
              (Math.abs(self.velocityX) > Math.abs(self.velocityY)
                ? self.velocityX
                : self.velocityY) * (self.isDragging ? 10 : 1);
          }
        },
      });

      gsap.ticker.add((time, deltaTime) => {
        if (Math.abs(velocity) < 50) {
          velocity = 0;
          return;
        }

        const adjustedVelocity = (deltaTime * velocity) / 100000;
        gsap.set(pageRef.current, { "--rotation": `+=${adjustedVelocity}` });
        velocity *= 0.96;
      });

      gsap.to(pageRef.current, {
        "--rotation": `+=${gsap.utils.random(70, 110)}`,
        duration: 1.5,
        ease: "power4.out",
      });

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
      };

      pageRef.current.addEventListener("touchmove", handleTouchMove);

      return () => {
        pageRef.current.removeEventListener("touchmove", handleTouchMove);
      };
    },
    { scope: pageRef }
  );

  // const handleTouchMovehandleTouchMove = (e) => {
  //   console.log(e.movementX, e.movementY);
  //   setRotation(
  //     // (prevRotation) => (prevRotation += e.movementX)
  //     (prevRotation) =>
  //       Math.sqrt(e.movementX ** 2 + e.movementY ** 2) *
  //       (e.movementY - e.movementX)
  //   );
  // };
  return (
    <>
      <div className={"relative select-none " + styles.page} ref={pageRef}>
        <div className={styles.kaleidoscope}>
          {Array.from({ length: 19 }, (_, i) => (
            <div className={styles.container} key={i}>
              {Array.from({ length: 6 }).map((_, j) => (
                <div className={styles.tile} key={j}>
                  <div className={styles.texture}></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
