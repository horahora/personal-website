import styles from "./AppFooter.module.css";
import homeStyles from "../pages/Home.module.css";

export default function AppFooter() {
  return (
    <footer className={styles.appFooter}>
      <div className={homeStyles.container}>
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
  );
}
