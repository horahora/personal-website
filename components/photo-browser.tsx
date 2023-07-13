import { useEffect, useRef } from "react";
import Swiper from "./swiper";
import styles from "./photo-browser.module.css";

const baseUrl = "/images/photography";

const photoListData = [
  {
    href: `${baseUrl}/L1004931.jpeg`,
    thumbnail: `${baseUrl}/L1004931-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/L1004948.jpeg`,
    thumbnail: `${baseUrl}/L1004948-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/L1004978.jpeg`,
    thumbnail: `${baseUrl}/L1004978-thumbnail.jpeg`,
  },
];

export default function PhotoBrowser() {
  const dialogRef = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    dialogRef.current.showModal();
    return () => dialogRef.current.close();
  }, []);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <Swiper list={photoListData} />
    </dialog>
  );
}
