// import Image from "next/image";
import Link from "next/link";
// import Tilt from "react-parallax-tilt";
import styles from "./Card.module.css";

type Props = {
  href: string;
  src: string;
  srcset: string;
  alt: string;
  placeholder?: boolean;
};

export default function Card({ href, src, srcset, alt, placeholder }: Props) {
  const paperClassName =
    "block aspect-square bg-white rounded-[1px] active:after:absolute active:after:inset-0 active:after:rounded-[inherit] active:after:pointer-events-none";

  return (
    <li className={styles.item}>
      {placeholder ? (
        <>
          <a className={`${paperClassName} ${styles.paper}`} />
        </>
      ) : (
        <>
          <Link href={href} className={`${paperClassName} ${styles.paper}`}>
            <img
              src={src}
              srcSet={srcset}
              width="300"
              height="300"
              className="p-[min(10px,4.166%)] w-full"
              alt={alt}
            />
          </Link>
          {/*<Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={0}
        glareEnable={true}
        scale={1.05}
        perspective={1000}
      >
      </Tilt>*/}
        </>
      )}
      <div
        className={"absolute -z-10 inset-0 rounded-[1px] " + styles.shadow}
      />
    </li>
  );
}
