import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";

export default function Card({
  href,
  src,
  srcset,
  alt,
  placeholder,
  isolated,
}) {
  return placeholder ? (
    <li className={styles.item}>
      <a className={styles.paper}>
        <div className={styles.itemImg}></div>
      </a>
      <div className={styles.shadow}></div>
    </li>
  ) : (
    <li className={styles.item}>
      {isolated ? (
        <a href={`${href}.html`} className={styles.paper}>
          <div className={styles.itemImg}>
            <img src={src} srcSet={srcset} width="200" height="200" alt={alt} />
          </div>
        </a>
      ) : (
        <Link href={href}>
          <a className={styles.paper}>
            <div className={styles.itemImg}>
              <img
                src={src}
                srcSet={srcset}
                width="200"
                height="200"
                alt={alt}
              />
            </div>
          </a>
        </Link>
      )}

      <div className={styles.shadow}></div>
    </li>
  );
}
