import Image from "next/image";
import Link from "next/link";
// import Tilt from "react-parallax-tilt";
import styles from "./card.module.css";

export default function Card({
  href,
  src,
  srcset,
  alt,
  placeholder,
}: {
  href: string;
  src: string;
  srcset: string;
  alt: string;
  placeholder?: boolean;
}) {
  return placeholder ? (
    <li className={styles.item}>
      <a className={styles.paper}></a>
      <div className={styles.shadow}></div>
    </li>
  ) : (
    <li className={styles.item}>
      <Link href={href} className={styles.paper}>
        <img src={src} srcSet={srcset} width="300" height="300" alt={alt} />
      </Link>
      {/*<Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={0}
        glareEnable={true}
        scale={1.05}
        perspective={1000}
      >
      </Tilt>*/}
      <div className={styles.shadow}></div>
    </li>
  );
}
