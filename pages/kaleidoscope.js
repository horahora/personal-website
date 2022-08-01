import Head from "next/head";
import { useLayoutEffect, useRef } from "react";
import styles from "./kaleidoscope.module.css";
import { gsap } from "gsap";
import { Observer } from "gsap/dist/Observer";

gsap.registerPlugin(Observer);

export default function Kaleidoscope() {
  const pageRef = useRef();
  let velocity = 0;

  useLayoutEffect(() => {
    pageRef.current.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });
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
  }, []);

  // const handleMouseMove = (e) => {
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
      <Head>
        <title>Kaleidoscope - Hora Hora</title>
        <meta name="theme-color" content="#000" />
      </Head>

      <div className={styles.page} ref={pageRef}>
        <div className={styles.kaleidoscope}>
          {[...new Array(7)].map((v, i) => (
            <div className={styles.container} key={i}>
              {[...new Array(6)].map((w, j) => (
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
