"use client";

import ScrollShinyText from "@/components/ScrollShinyText";
import TextSpread from "@/components/TextSpread";
// import MediaCover from "../components/MediaCover";
import TextScale from "@/components/TextScale";
import ScrollBanner from "@/components/ScrollBanner";
import SlideToCenter from "@/components/SlideToCenter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// TODO: 增加 滚动时物件沿着 svg path 移动的效果

export default function ScrollParallax() {
  const t = useTranslations("ScrollParallaxPage");
  // prevent ScrollTrigger.refresh() from running (and recalculating start/end positions) when a mobile browser shows/hides its address bar
  ScrollTrigger.config({ ignoreMobileResize: true });

  return (
    <>
      <TextScale />
      <ScrollBanner />
      <div className="h-[30vh]"></div>
      <ScrollShinyText>
        {t("shinyText")
          .split("\n")
          .map((line, index) => (
            <span key={index}>
              {line}
              {index < t("shinyText").split("\n").length - 1 && <br />}
            </span>
          ))}
      </ScrollShinyText>
      <SlideToCenter />
      <TextSpread text="\Spread/" />

      <div className="h-[20vh]"></div>
    </>
  );
}
