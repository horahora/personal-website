"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Glass3d from "@/components/glass3d";

const lineEq = (
  y2: number,
  y1: number,
  x2: number,
  x1: number,
  currentVal: number
) => {
  let m = (y2 - y1) / (x2 - x1);
  let b = y1 - m * x1;
  return m * currentVal + b;
};
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

export default function ThreeDGlasses() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const slideTitleRef = useRef<HTMLHeadingElement>(null!);

  useEffect(() => {
    // window.addEventListener("mousemove", (e) => {
    //   // console.log(e);
    //   setMousePos({ x: e.pageX, y: e.pageY });
    // });

    const textTilt = new TiltFx(slideTitleRef.current);

    if (!!window.IntersectionObserver) {
      const observer = new IntersectionObserver((entrys, observer) => {
        entrys.forEach((entry) => {
          if (entry.isIntersecting) {
            textTilt.start();
          } else {
            textTilt.stop();
          }
        });
      });
      observer.observe(slideTitleRef.current);
    }
  }, []);
  return (
    <>
      <div className={styles.page} style={{ height: "200vh" }}>
        <div className={styles.hero}>
          <h2 className={styles.slideTitle} ref={slideTitleRef}>
            <span className={styles.slideTitleInner}>Monachopsis</span>
            <span className={styles.slideTitleInner}>Monachopsis</span>
            <span className={styles.slideTitleInner}>Monachopsis</span>
          </h2>
        </div>
        <Glass3d />
      </div>
    </>
  );
}

interface TileFxOptions {
  valuesFromTo: [number, number];
  lerpFactorOuter: number;
  lerpFactor: (pos: number) => number;
}

class TiltFx {
  readonly DOM: { el: HTMLElement; moving: HTMLElement[] };
  readonly options: TileFxOptions;
  readonly movingTotal: number;
  mousePos: { x: number; y: number };
  translations: { x: number; y: number }[];
  requestId!: number | null;
  constructor(el: HTMLElement, options?: TileFxOptions) {
    this.DOM = { el: el, moving: [...el.children] as HTMLElement[] };
    this.options = {
      valuesFromTo: [-50, 50],
      lerpFactorOuter: 0.25,
      lerpFactor: (pos) => 0.05 * Math.pow(2, pos),
      ...options,
    };
    this.movingTotal = this.DOM.moving.length;
    this.mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.translations = [...new Array(this.movingTotal)].map(() => ({
      x: 0,
      y: 0,
    }));
    this.initEvents();
  }
  initEvents() {
    window.addEventListener(
      "pointermove",
      (e) => (this.mousePos = { x: e.pageX, y: e.pageY })
    );
  }
  render() {
    for (let i = 0; i <= this.movingTotal - 1; ++i) {
      let lerpFactor =
        i < this.movingTotal - 1
          ? this.options.lerpFactor(i)
          : this.options.lerpFactorOuter;
      this.translations[i].x = lerp(
        this.translations[i].x,
        lineEq(
          this.options.valuesFromTo[1],
          this.options.valuesFromTo[0],
          window.innerWidth,
          0,
          this.mousePos.x
        ),
        lerpFactor
      );
      this.translations[i].y = lerp(
        this.translations[i].y,
        lineEq(
          this.options.valuesFromTo[1],
          this.options.valuesFromTo[0],
          window.innerHeight,
          0,
          this.mousePos.y
        ),
        lerpFactor
      );
      this.DOM.moving[
        i
      ].style.transform = `translateX(${this.translations[i].x}px) translateY(${this.translations[i].y}px)`;
    }
    this.requestId = requestAnimationFrame(() => this.render());
  }
  start() {
    if (!this.requestId) {
      this.requestId = window.requestAnimationFrame(() => this.render());
    }
  }
  stop() {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;

      for (let i = 0; i <= this.movingTotal - 1; ++i) {
        this.translations[i].x = 0;
        this.translations[i].y = 0;
        this.DOM.moving[i].style.transform = `translateX(0px) translateY(0px)`;
      }
    }
  }
}
