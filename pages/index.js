import Head from "next/head";
import Image from "next/image";
import Card from "../components/Card";
import AboutMe from "../components/AboutMe";
import AppFooter from "../components/AppFooter";
import Link from "next/link";
import styles from "./Home.module.css";

// TODO: 币圈分析图表、svg交互（包含路径移动画出字）、漫画作品、插画作品、跟随指针移动方向的3D物体、万花筒、3列逆向滚动、高斯模糊径向渐变的UI
// 一些元素： 7. 下拉滚动逐帧动画（动画元素要自己重新画）. 小游戏. webgl ？， 6. 用p5.js做动态眼睛，live2D

const portfolioList = [
  {
    href: "/photography",
    src: "/images/work-photography.jpg",
    srcset:
      "/images/work-photography@2x.jpg 2x, /images/work-photography@3x.jpg 3x",
    alt: "摄影作品",
  },
  {
    href: "/scroll-parallax",
    src: "/images/work-scroll-parallax.png",
    srcset:
      "/images/work-scroll-parallax@2x.png 2x, /images/work-scroll-parallax@3x.png 3x",
    alt: "视差滚动",
  },
  {
    href: "/kaleidoscope",
    src: "/images/work-kaleidoscope.jpg",
    srcset:
      "/images/work-kaleidoscope@2x.jpg 2x, /images/work-kaleidoscope@3x.jpg 3x",
    alt: "万花筒",
  },
  {
    href: "/waves",
    src: "/images/work-waves.png",
    srcset: "/images/work-waves@2x.png 2x, /images/work-waves@3x.png 3x",
    alt: "波浪动画",
  },
  {
    href: "/eyes",
    src: "/images/work-eyes.png",
    srcset: "/images/work-eyes@2x.png 2x, /images/work-eyes@3x.png 3x",
    alt: "眼睛",
  },

  // {
  //   href: "/likeblack",
  //   src: "/images/item_black.png",
  //   srcset: "images/item_black@2x.png 2x",
  //   alt: "like black",
  // },
];

const portfolioListAppendEmpty = [
  ...portfolioList,
  ...new Array(12 - portfolioList.length).fill({
    placeholder: true,
  }),
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Hora Hora</title>
        <meta name="description" content="这里是 仇俊斌 的个人作品集" />
        <meta name="theme-color" content="hsl(0deg 0% 91%)" />
      </Head>

      <div className={styles.pageWrapper}>
        <header className={styles.globalHeader}>
          <Link href="/">
            <a>
              <h1>Hora Hora</h1>
            </a>
          </Link>
        </header>
        <main className={styles.portfolio}>
          <ul className={styles.container}>
            {portfolioListAppendEmpty.map((item, i) => (
              <Card
                href={item.href}
                src={item.src}
                alt={item.alt}
                srcset={item.srcset}
                placeholder={item.placeholder}
                key={i}
              />
            ))}
          </ul>
        </main>
        <AboutMe />
        <AppFooter />
      </div>
    </>
  );
}
