"use client";

import HeadlineScrollShimmer from "@/components/headline-scroll-shimmer";
import TextSpread from "@/components/text-spread";
// import MediaCover from "../components/MediaCover";
import TextScale from "@/components/text-scale";
import ScrollBanner from "@/components/scroll-banner";
import SlideToCenter from "@/components/slide-to-center";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./scroll-parallax.module.css";
import { todo } from "node:test";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// TODO: 增加 滚动时物件沿着 svg path 移动的效果

export default function ScrollParallax() {
  // prevent ScrollTrigger.refresh() from running (and recalculating start/end positions) when a mobile browser shows/hides its address bar
  ScrollTrigger.config({ ignoreMobileResize: true });

  return (
    <>
      <TextScale />
      <ScrollBanner />
      <div style={{ height: "30vh" }}></div>
      <HeadlineScrollShimmer>
        滚动
        <br />
        闪烁文字
      </HeadlineScrollShimmer>
      <SlideToCenter />
      <TextSpread text="\Spread/" />

      <div style={{ height: "20vh" }}></div>
    </>
  );
}
