import Head from "next/head";
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
      <div></div>
      <div className={styles.pageRoot}>
        <TextScale />
        <div style={{ height: "30vh" }}></div>
        <HeadlineScrollShimmer>
          滚动，
          <br />
          闪烁文字。
        </HeadlineScrollShimmer>
        <SlideToCenter />
        <TextSpread text="Spread" />

        <div style={{ height: "20vh" }}></div>
      </div>
    </>
  );
}
