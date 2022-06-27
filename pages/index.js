import Head from "next/head";
import Image from "next/image";
import Card from "../components/Card";
import AboutMe from "../components/AboutMe";
import Link from "next/link";
import styles from "./Home.module.css";

const portfolioList = [
  {
    href: "/photography",
    src: "/images/item-photography.jpg",
    srcset: "/images/item-photography@2x.jpg 2x",
    alt: "摄影作品",
    isolated: true,
  },
  {
    href: "/scroll-parallax",
    src: "/images/item-scroll-parallax.png",
    srcset:
      "/images/item-scroll-parallax@2x.png 2x, /images/item-scroll-parallax@3x.png 3x",
    alt: "视差滚动",
    isolated: false,
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
                isolated={item.isolated}
                key={i}
              />
            ))}
          </ul>
        </main>
        <AboutMe />
        <footer className={styles.globalFooter}>
          <div className={styles.container}>
            {/*<ul className={styles.langToggle">
            <li><a className={styles.current" href="/">中文</a></li>
            <li><a href="/jp.html">日本語</a></li>
          </ul>
  */}
            <p className={`${styles.copyright} text-carved`}>
              <span>© {new Date().getFullYear()} Hora Hora.</span>{" "}
              <span className={styles.hiddenXs}>All rights reserved.</span>{" "}
              <a
                style={{ color: "#666" }}
                href="https://github.com/horahora/personal-site"
                target="_blank"
                rel="noreferrer"
              >
                View git repository.
              </a>
            </p>
            {/*<p className={styles.copyright"><span>© 2013-2018 Hora Hora.</span> <span className={styles.hidden-xs">All rights reserved.</span> <span className={styles.hidden-xs">Designed in China.</span></p> */}
          </div>
        </footer>
      </div>
    </>
  );
}
