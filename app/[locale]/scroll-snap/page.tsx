"use client";

import { useLayoutEffect, useRef } from "react";

import styles from "./page.module.css";

export default function ScrollSnap() {
  const navRef = useRef<HTMLElement>(null!);

  useLayoutEffect(() => {
    navRef.current.querySelectorAll("a").forEach((elem) => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        document
          .querySelector(elem.getAttribute("href")!)
          ?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }, []);
  return (
    <>
      <div className={styles.page}>
        <nav className={styles.nav} ref={navRef}>
          <a href="#a">to A</a>
          <a href="#b">to B</a>
          <a href="#c">to C</a>
        </nav>
        <section className={styles.section} id="a">
          A
        </section>
        <section className={styles.section} id="b">
          B
        </section>
        <section className={styles.section} id="c">
          C
        </section>
      </div>
    </>
  );
}
