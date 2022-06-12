import Head from "next/head";
import Image from "next/image";
import Card from "../components/card";
import Link from "next/link";
import styles from "./Home.module.css";
import React, { useEffect } from "react";

const portfolioList = [
  {
    href: "/photography",
    src: "/images/item-photography.jpg",
    srcset: "/images/item-photography@2x.jpg 2x",
    alt: "摄影作品",
    isolated: true,
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
  const handRef = React.createRef();

  useEffect(() => {
    // console.log(handRef.current);
    handRef.current.classList.add(styles.transparent);
    window.addEventListener(
      "scroll",
      function () {
        if (
          handRef.current.getBoundingClientRect().top +
            handRef.current.offsetHeight / 3 <
          window.innerHeight
        ) {
          handRef.current.classList.add(styles.handAnimation);
        }
      },
      { passive: false }
    );
  }, [handRef]);

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>Hora Hora</title>
        <meta name="description" content="这里是 仇俊斌 的个人作品集" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
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
        <section className={styles.aboutMe}>
          <div className={`${styles.content} allow-select`} ref={handRef}>
            <img
              className={styles.avatar}
              src="/images/avatar.jpg"
              srcSet="/images/avatar@2x.jpg 2x, /images/avarar@3x.jpg"
              width="150"
              height="150"
              alt="头像"
            />
            <div className={styles.textWrapper}>
              <h1>仇俊斌</h1>
              <ul>
                <li>
                  <span className={styles.label}>职业</span>Web开发/摄影师
                </li>
                <li>
                  <span className={styles.label}>现居</span>中国 上海
                </li>
                <li>
                  <span className={styles.label}>邮箱</span>
                  <a
                    className={styles.emailAddress}
                    href="mailto:contact@horahora.com"
                  >
                    contact@horahora.com
                  </a>
                </li>
                {/*<li>
                  <span className={styles.label}>简介</span>
                  专注令人惊叹的Web交互
                </li>*/}
              </ul>
            </div>
          </div>
        </section>
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
                href="https://vercel.com/"
                target="_blank"
                rel="noreferrer"
              >
                Hosted by Vercel.
              </a>
            </p>
            {/*<p className={styles.copyright"><span>© 2013-2018 Hora Hora.</span> <span className={styles.hidden-xs">All rights reserved.</span> <span className={styles.hidden-xs">Designed in China.</span></p> */}
          </div>
        </footer>
      </div>
    </>
  );
}
