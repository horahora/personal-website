"use client";

import { useLayoutEffect, useRef } from "react";
import Demo from "@/components/demo";
import styles from "./page.module.css";
import PhotoStack from "@/components/photo-stack";
import RadialProgress from "@/components/radial-progress";

export default function Test() {
  const divRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    // divRef.current.ontouchmove = (e) => {
    //   e.preventDefault();
    // };

    divRef.current.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <div
      ref={divRef}
      style={{ height: "100vh" }}
      // onTouchMove={(e) => {
      //   console.log(e.preventDefault);
      //   e.preventDefault();
      // }}
    >
      <PhotoStack />
      <RadialProgress />
      <svg viewBox="0 0 250 50">
        <text y="20" wordSpacing="2">
          Bigger spacing between words
        </text>
        <text x="0" y="40" wordSpacing="-0.5">
          Smaller spacing between words
        </text>
      </svg>
      <div
        style={{ width: "100px", height: "100px", border: "1px solid" }}
      ></div>
      <svg>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
        <polyline
          points="10,10 10,90 90,90"
          fill="none"
          stroke="black"
          marker-start="url(#arrow)"
          marker-end="url(#arrow)"
        />
      </svg>
      <svg width="320" height="320">
        <path
          d="M 10 315
           L 110 215
           A 36 60 0 0 1 150.71 170.29
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10"
          stroke="black"
          fill="green"
          strokeWidth="2"
          fillOpacity="0.5"
        />

        <ellipse
          cx="144.931"
          cy="229.512"
          rx="36"
          ry="60"
          fill="transparent"
          stroke="blue"
        />
        <ellipse
          cx="115.779"
          cy="155.778"
          rx="36"
          ry="60"
          fill="transparent"
          stroke="blue"
        />
        <path
          d="M 50,50
      m 0,-25
      a 25,25 0 1 1 0,50
      a 25,25 0 1 1 0,-50
    "
          strokeWidth="50"
          fillOpacity="0"
          style={{
            strokeLinecap: "butt",
            strokeDasharray: "157.07963267948966px, 157.07963267948966px",
            strokeDashoffset: "0px",
            stroke: "#d6d6d6",
          }}
        ></path>
        <path
          d="M 50,50
            m 0,-25
            a 25,25 0 1 1 0,50
            a 25,25 0 1 1 0,-50
    "
          strokeWidth="50"
          fillOpacity="0"
          stroke="#3e98c7"
          strokeLinecap="butt"
          strokeDasharray="157.07963267948966px, 157.07963267948966px"
          strokeDashoffset="53.40707511102648px"
          style={{
            transition: "stroke-dashoffset 0.5s ease 0s",
          }}
        ></path>
        <path
          d="M 230 230
           A 45 45, 0, 1, 1, 275 275
           L 275 230 "
          fill="olive"
          stroke="red"
        />
        <circle cx="230" cy="230" r="2" fill="red"></circle>
      </svg>
      <svg width="200" height="150">
        <path
          d="M 10 75 Q 50 10 100 75 T 190 75"
          stroke="black"
          strokeLinecap="round"
          strokeDasharray="5,10,5"
          fill="none"
        />
        <path
          d="M 10 75 L 190 75"
          stroke="red"
          strokeLinecap="round"
          strokeWidth="1"
          strokeDasharray="5,5"
          fill="none"
        />
      </svg>
      <div className={styles.pWrapper}>
        <p className={styles.p}>
          <span>男</span>
          <span>子</span>
          <span>高</span>
          <span>校</span>
          <span>生</span>
        </p>
        <p className={`${styles.p} ${styles.right}`}>
          <span>の</span>
          <span>
            <b>日</b>
          </span>
          <span>
            <b>常</b>
          </span>
        </p>
      </div>
    </div>
  );
}
