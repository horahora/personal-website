import Head from "next/head";
import HeadlineScrollShimmer from "../components/HeadlineScrollShimmer.js";
import TextSpread from "../components/TextSpread.js";
// import MediaCover from "../components/MediaCover.js";
import TextScale from "../components/TextScale.js";
import ScrollBanner from "../components/ScrollBanner.js";
import SlideToCenter from "../components/SlideToCenter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./scroll-parallax.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollParallax({ bannerTextList }) {
  // prevent ScrollTrigger.refresh() from running (and recalculating start/end positions) when a mobile browser shows/hides its address bar
  ScrollTrigger.config({ ignoreMobileResize: true });

  return (
    <>
      <Head>
        <title>视差滚动 - Hora Hora</title>
        <meta name="theme-color" content="#edf1e5" />
      </Head>
      <div className={styles.pageRoot}>
        <TextScale />
        <ScrollBanner />
        <div style={{ height: "30vh" }}></div>
        <HeadlineScrollShimmer>
          滚动，
          <br />
          闪烁文字。
        </HeadlineScrollShimmer>
        <SlideToCenter />
        <TextSpread text="\Spread/" />

        <div style={{ height: "20vh" }}></div>
      </div>
    </>
  );
}
