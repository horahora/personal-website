"use client";

import { useEffect, useRef } from "react";
import styles from "./AboutMe.module.css";
import Briefcase from "framework7-icons/svg/briefcase.svg";
import Placemark from "framework7-icons/svg/placemark.svg";
import Envelope from "framework7-icons/svg/envelope.svg";
import { useTranslations } from "next-intl";

export default function AboutMe() {
  const handRef = useRef<HTMLDivElement>(null!);
  const t = useTranslations("HomePage");

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
    <section className="relative h-[476px] overflow-hidden text-[#444]">
      <div
        className={`absolute left-1/2 h-[inherit] w-[1256px] pt-[88px] pl-[37px] -ml-[217px] ${styles.inner}`}
        ref={handRef}
      >
        <div className="flex items-center w-[360px] h-[200px] pl-[15px] select-text cursor-auto">
          <img
            srcSet="/images/avatar-portrait.jpg, /images/avatar-portrait@2x.jpg 2x, /images/avatar-portrait@3x.jpg 3x"
            width="100"
            height="150"
            alt={t("avatar")}
            className="mr-[15px]"
          />
          <div>
            <h1 className="text-[34px] text-[#555] mt-[10px] mb-[25px]">
              {t("name")}
            </h1>
            <ul className="text-[16px]">
              <li className="flex items-center gap-2.5 my-2.5">
                <Briefcase
                  aria-label={t("professionLabel")}
                  width="1em"
                  height="1em"
                  viewBox="0 0 56 56"
                  fill="currentcolor"
                />
                {t("profession")}
              </li>
              <li className="flex items-center gap-2.5 my-2.5">
                <Placemark
                  aria-label={t("locationLabel")}
                  viewBox="0 0 56 56"
                  width="1em"
                  height="1em"
                  fill="currentcolor"
                />
                {t("location")}
              </li>
              <li className="flex items-center gap-2.5 my-2.5">
                <Envelope
                  aria-label={t("emailLabel")}
                  viewBox="0 0 56 56"
                  width="1em"
                  height="1em"
                  fill="currentcolor"
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
