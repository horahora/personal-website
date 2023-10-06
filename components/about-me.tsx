"use client";

import { useEffect, useRef } from "react";
import styles from "./about-me.module.css";
import utilStyles from "@/app/utils.module.css";
import Briefcase from "framework7-icons/svg/Briefcase.svg";
import Placemark from "framework7-icons/svg/Placemark.svg";
import Envelope from "framework7-icons/svg/Envelope.svg";

export default function AboutMe() {
  const handRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    // console.log(handRef.current);
    // handRef.current.classList.add(styles.transparent);
    // window.addEventListener(
    //   "scroll",
    //   function () {
    //     if (
    //       handRef.current &&
    //       handRef.current.getBoundingClientRect().top +
    //         handRef.current.offsetHeight / 4 <
    //         window.innerHeight
    //     ) {
    //       handRef.current.classList.add(styles.handAnimation);
    //     }
    //   },
    //   { passive: true }
    // );
    if (!!window.IntersectionObserver) {
      handRef.current.classList.add(styles.transparent);
      const observer = new IntersectionObserver(
        (entrys, observer) => {
          entrys.forEach((entry) => {
            if (entry.isIntersecting) {
              const elem = entry.target;
              elem.classList.add(styles.handAnimation);
              observer.unobserve(elem);
            }
          });
        },
        {
          threshold: 0.25,
        }
      );
      observer.observe(handRef.current);
    }
  }, []);

  return (
    <section className={styles.aboutMe}>
      <div className={styles.inner} ref={handRef}>
        <div className={`${styles.content} ${utilStyles.allowSelect}`}>
          <picture>
            <source
              srcSet="/images/avatar-landscape.jpg, /images/avatar-landscape@2x.jpg 2x, /images/avatar-landscape@3x.jpg 3x"
              media="(max-width: 440px)"
              width="150"
              height="100"
            />
            <img
              className={styles.avatar}
              src="/images/avatar-portrait.jpg"
              srcSet="/images/avatar-portrait@2x.jpg 2x, /images/avatar-portrait@3x.jpg"
              width="100"
              height="150"
              alt="头像"
            />
          </picture>
          <div className={styles.textWrapper}>
            <h1>仇俊斌</h1>
            <ul>
              <li>
                <Briefcase
                  aria-labelledby="职业"
                  className={styles.icon}
                  width="1em"
                  height="1em"
                  viewBox="0 0 56 56"
                  fill="currentcolor"
                />
                Web开发/摄影师
              </li>
              <li>
                <Placemark
                  viewBox="0 0 56 56"
                  width="1em"
                  height="1em"
                  fill="currentcolor"
                  aria-label="现居"
                  className={styles.icon}
                />
                中国 上海
              </li>
              <li>
                <Envelope
                  viewBox="0 0 56 56"
                  width="1em"
                  height="1em"
                  fill="currentcolor"
                  className={styles.icon}
                />
                <a href="mailto:contact@horahora.com">contact@horahora.com</a>
              </li>
              {/*<li>
              专注令人惊叹的Web交互
            </li>*/}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
