import Head from "next/head";
import { useLayoutEffect, useRef } from "react";
import styles from "./kaleidoscope.module.css";
import { gsap } from "gsap";
import { Observer } from "gsap/dist/Observer";

gsap.registerPlugin(Observer);

export default function Kaleidoscope() {
  const pageRef = useRef();

  useLayoutEffect(() => {
    let velocity = 0;
    pageRef.current.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });
    Observer.create({
      target: pageRef.current,
      // tolerance: 5,
      preventDefault: true,
      // onDrag(self) {
      //   // console.log(self.event.type, self.deltaY, self.y);
      // },
      onChange(self) {
        console.log(self.velocityY);
        if (
          Math.abs(self.velocityY) > Math.abs(velocity) ||
          (self.deltaY < 0 && velocity > 0) ||
          (self.deltaY > 0 && velocity < 0) ||
          self.isDragging
        ) {
          velocity = self.velocityY * (self.isDragging ? 10 : 1);
        }
      },
      onMove(self) {
        // console.log(self.event.preventDefault());
        // console.log(self.deltaX, self.deltaY);
        // gsap.to(pageRef.current, {
        //   "--rotation": `+=${self.deltaY}`,
        //   duration: 2,
        //   ease: "power4.out",
        // });
      },
    });

    gsap.ticker.add((time, deltaTime) => {
      console.log("deltaTime", deltaTime);
      if (Math.abs(velocity) < 50) {
        velocity = 0;
        return;
      }

      const adjustedVelocity = (deltaTime * velocity) / 100000;
      gsap.set(pageRef.current, { "--rotation": `+=${adjustedVelocity}` });
      velocity *= 0.96;
    });
  }, []);

  const handleMouseMove = (e) => {
    console.log(e.movementX, e.movementY);
    setRotation(
      // (prevRotation) => (prevRotation += e.movementX)
      (prevRotation) =>
        Math.sqrt(e.movementX ** 2 + e.movementY ** 2) *
        (e.movementY - e.movementX)
    );
  };
  return (
    <>
      <Head>
        <title>eyes X eyes X eyes - Hora Hora</title>
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
