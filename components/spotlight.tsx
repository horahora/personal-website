import styles from "./spotlight.module.css";

export default function Spotlight() {
  return (
    <section
      className={`${styles.main} ${styles.isVisible} ${styles.fInviewEnter}`}
    >
      <div className={`${styles.mainLight} ${styles.isActive}`}>
        <div
          className={`${styles.mainLightItem} ${styles.mainLightItem1}`}
        ></div>
        <div
          className={`${styles.mainLightItem} ${styles.mainLightItem2}`}
        ></div>
        <div
          className={`${styles.mainLightItem} ${styles.mainLightItem3}`}
        ></div>
        <div
          className={`${styles.mainLightItem} ${styles.mainLightItem4} ${styles.PC}`}
        ></div>
        <div
          className={`${styles.mainLightItem} ${styles.mainLightItem5}`}
        ></div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.mainMv}>
          <div className={styles.item}>
            <img src="//cdn1.beams.co.jp/special/bb100/assets/images2022aw/page/062/main.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
}
