import Head from "next/head";
import Image from "next/image";
import Card from "../components/Card";
import AboutMe from "../components/AboutMe";
import AppFooter from "../components/AppFooter";
import Link from "next/link";
import styles from "./Home.module.css";

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
        <meta name="theme-color" content="#f0f0f0" />
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
