import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./SlideToCenter.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function SlideToCenter() {
  const slideContainerRef = useRef();
  const q = gsap.utils.selector(slideContainerRef);

  useLayoutEffect(() => {
    q(".slider").forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          x(index, target) {
            //function-based value: will get called once for each target the first time the tween renders
            return target.dataset.fromX;
          },
          y(index, target) {
            return target.dataset.fromY;
          },
        },
        {
          x: 0,
          y: 0,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "top center",
            scrub: 0.5,
            // markers: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className={styles.component}>
      <div className={styles.slideWrapper} ref={slideContainerRef}>
        <div className="slider" data-from-x="-200" data-from-y="50">
          <img
            src="/images/media-cover/zero-degree.jpg"
            width="300"
            height="450"
          />
        </div>
        <div className="slider" data-from-x="200" data-from-y="50">
          <img
            src="/images/media-cover/in-the-mood-for-love.jpg"
            width="300"
            height="450"
          />
        </div>
        <div className={`${styles.bottom} slider`} data-from-y="200">
          <img
            src="/images/media-cover/a-brighter-summer-day.jpg"
            width="610"
            height="407"
          />
        </div>
      </div>
    </div>
  );
}
