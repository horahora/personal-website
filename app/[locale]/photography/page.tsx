"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./photography.module.css";
// import Link from "next/link";
import photoListData from "./photo-list.json";
// import photoListData from "./photo-list.json" with { type: "json" };
// import Image from "next/image";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { Zoom, Navigation, Keyboard } from "swiper/modules";
import Xmark from "framework7-icons/svg/xmark.svg";
import { clsx } from "clsx";

export default function Photography() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null!);

  const handleThumbnailClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    event.preventDefault();
    setActiveIndex(index);
    setIsDialogVisible(true);
    setIsToolbarVisible(true);
    document.body.style.overflow = "hidden";
    dialogRef.current.classList.add(styles.in);
    // document.body.style.setProperty("--background", "black");
  };

  const handleActiveIndexChange = (swiper: SwiperClass) => {
    // console.log(swiper);
    setActiveIndex(swiper.activeIndex);
  };

  const handleDialogClose = useCallback(() => {
    dialogRef.current.addEventListener(
      "animationend",
      () => {
        dialogRef.current.classList.remove(styles.out);
        setActiveIndex(null);
        setIsDialogVisible(false);
      },
      {
        once: true,
      }
    );
    dialogRef.current.classList.remove(styles.in);
    dialogRef.current.classList.add(styles.out);
    document.body.style.overflow = "unset";
    // document.body.style.removeProperty("--background");
  }, []);

  const handleSwiperClick = (swiper: SwiperClass) => {
    setIsToolbarVisible(!isToolbarVisible);
    [swiper.navigation.prevEl, swiper.navigation.nextEl].forEach((elem) => {
      elem.classList.toggle("swiper-button-hidden", isToolbarVisible);
    });
  };

  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (isDialogVisible && event.key === "Escape") {
        event.preventDefault();
        handleDialogClose();
      }
    };

    if (isDialogVisible) {
      window.addEventListener("keydown", handleEscapePress);
    } else {
      window.removeEventListener("keydown", handleEscapePress);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [handleDialogClose, isDialogVisible]);

  return (
    <>
      <div className="2xl:container mx-auto grid gap-1 md:gap-[15px] px-0 md:px-4 grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
        {photoListData.map((photo, index) => (
          <div className="aspect-square" key={photo.thumbnail}>
            <a
              href={`/images/photography/${photo.original}`}
              // href={photo.href}
              onClick={(event) => handleThumbnailClick(event, index)}
            >
              <img
                src={`/images/photography/${photo.thumbnail}`}
                alt=""
                className="object-cover md:object-contain w-full h-full align-middle"
              />
            </a>
          </div>
        ))}
      </div>
      <div
        ref={dialogRef}
        className={`${styles.dialog} fixed inset-0 hidden select-none bg-black`}
      >
        <div
          className={clsx(styles.dialogToolbar, {
            [styles.dialogToolbarHidden]: !isToolbarVisible,
          })}
        >
          {activeIndex !== null && (
            <div className={styles.dialogTitle}>{`${activeIndex + 1} / ${
              photoListData.length
            }`}</div>
          )}
          <button className={styles.dialogClose} onClick={handleDialogClose}>
            <Xmark
              width="20"
              height="20"
              viewBox="0 0 56 56"
              fill="currentcolor"
            />
          </button>
        </div>
        {activeIndex !== null && (
          <Swiper
            initialSlide={activeIndex}
            modules={[Zoom, Navigation, Keyboard]}
            zoom
            navigation
            keyboard
            spaceBetween={20}
            simulateTouch={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            onActiveIndexChange={(swiper) => handleActiveIndexChange(swiper)}
            onClick={handleSwiperClick}
            onZoomChange={() => {
              setIsToolbarVisible(false);
            }}
            className={styles.photoSwiper}
          >
            {photoListData.map((photo) => (
              <SwiperSlide key={photo.original} zoom>
                <img
                  src={`/images/photography/${photo.original}`}
                  loading="lazy"
                  alt=""
                />
                <div className="swiper-lazy-preloader"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
