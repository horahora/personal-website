import Head from "next/head";
import { ParallaxProvider } from "react-scroll-parallax";
import HeadlineScrollShimmer from "../components/HeadlineScrollShimmer.js";
import TextSpread from "../components/TextSpread.js";
// import MediaCover from "../components/MediaCover.js";
import TextScale from "../components/TextScale.js";
import SlideToCenter from "../components/SlideToCenter";
import styles from "./scroll-parallax.module.css";

export default function ScrollParallax() {
  return (
    <>
      <Head>
        <title>视差滚动 - Hora Hora</title>
      </Head>
      <ParallaxProvider>
        <div className={styles.pageRoot}>
          {/*<div style={{ height: "500px" }}></div>*/}
          <TextScale />
          <div style={{ height: "50vh" }}></div>
          <div style={{ height: "90vh" }}>
            <TextSpread text="Spread" />
          </div>
          <SlideToCenter />
          <HeadlineScrollShimmer>
            滚动，
            <br />
            闪烁文字。
          </HeadlineScrollShimmer>

          <div style={{ height: "90vh" }}></div>

          {/*<MediaCover />*/}
        </div>
      </ParallaxProvider>
    </>
  );
}
