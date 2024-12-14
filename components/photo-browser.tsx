import { useEffect, useRef } from "react";
import Swiper from "./swiper";
import Xmark from "framework7-icons/svg/xmark.svg";

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
    <dialog ref={dialogRef} className="w-full h-full">
      <button
        className="absolute right-2 top-2 z-10"
        onClick={() => dialogRef.current.close()}
      >
        <Xmark width="20" height="20" viewBox="0 0 56 56" fill="currentcolor" />
      </button>
      <Swiper list={photoListData} />
    </dialog>
  );
}
