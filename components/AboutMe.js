import React, { useEffect } from "react";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
  const handRef = React.createRef();

  useEffect(() => {
    // console.log(handRef.current);
    // handRef.current.classList.add(styles.transparent);
    // window.addEventListener(
    //   "scroll",
    //   function () {
    //     if (
    //       handRef.current &&
    //       handRef.current.getBoundingClientRect().top +
    //         handRef.current.offsetHeight / 3 <
    //         window.innerHeight
    //     ) {
    //       handRef.current.classList.add(styles.handAnimation);
    //     }
    //   },
    //   { passive: true }
    // );
    if (!!window.IntersectionObserver) {
      handRef.current.classList.add(styles.transparent);
      const observer = new IntersectionObserver(
        (entrys, observer) => {
          entrys.forEach((entry) => {
            if (entry.isIntersecting) {
              const elem = entry.target;
              elem.classList.add(styles.handAnimation);
              observer.unobserve(elem);
            }
          });
        },
        {
          threshold: 0.3,
        }
      );
      observer.observe(handRef.current);
    }
  }, [handRef]);

  return (
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
  );
}
