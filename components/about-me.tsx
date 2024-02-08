"use client";

import { useEffect, useRef } from "react";
import styles from "./about-me.module.css";
import utilStyles from "@/app/utils.module.css";
import Briefcase from "framework7-icons/svg/briefcase.svg";
import Placemark from "framework7-icons/svg/placemark.svg";
import Envelope from "framework7-icons/svg/envelope.svg";

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
    <section className="relative h-[444px] min-[440px]:h-[476px] overflow-hidden text-[#444]">
      <div
        className={`absolute left-1/2 h-[inherit] w-[500px] pt-[8px] pl-[24px] -ml-[124px] min-[440px]:w-[1256px] min-[440px]:pt-[88px] min-[440px]:pl-[37px] min-[440px]:-ml-[217px]  ${styles.inner}`}
        ref={handRef}
      >
        <div className="flex items-center ps-[15px] [block-size:200px] [inline-size:360px] [writing-mode:vertical-rl] min-[440px]:[writing-mode:horizontal-tb] select-text cursor-auto">
          <picture>
            <source
              src="/images/avatar-portrait.jpg"
              srcSet="/images/avatar-portrait@2x.jpg 2x, /images/avatar-portrait@3x.jpg"
              media="(min-width: 440px)"
              width="100"
              height="150"
            />
            <img
              srcSet="/images/avatar-landscape.jpg, /images/avatar-landscape@2x.jpg 2x, /images/avatar-landscape@3x.jpg 3x"
              width="150"
              height="100"
              alt="头像"
              className="me-[15px] [block-size:150px] [inline-size:100px]"
            />
          </picture>
          <div>
            <h1 className="text-[34px] text-[#555] [margin-block:10px_25px]">
              仇俊斌
            </h1>
            <ul className="text-[16px]">
              <li className="flex items-center [margin-block:10px]">
                <Briefcase
                  aria-label="职业"
                  width="1em"
                  height="1em"
                  viewBox="0 0 56 56"
                  fill="currentcolor"
                  className="me-2.5"
                />
                Web开发/摄影师
              </li>
              <li className="flex items-center [margin-block:10px]">
                <Placemark
                  aria-label="现居"
                  viewBox="0 0 56 56"
                  width="1em"
                  height="1em"
                  fill="currentcolor"
                  className="me-2.5"
                />
                中国 上海
              </li>
              <li className="flex items-center [margin-block:10px]">
                <Envelope
                  aria-label="邮箱"
                  viewBox="0 0 56 56"
                  width="1em"
                  height="1em"
                  fill="currentcolor"
                  className="me-2.5"
                />
                <a
                  href="mailto:contact@horahora.com"
                  className="hover:text-black focus:text-black"
                >
                  contact@horahora.com
                </a>
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
