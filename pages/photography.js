import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Lazy, Navigation, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/lazy";
import "swiper/css/navigation";
import styles from "./photography.module.css";
import { Xmark } from "framework7-icons/react";
import classNames from "classnames";

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
  {
    href: `${baseUrl}/L1005073.jpeg`,
    thumbnail: `${baseUrl}/L1005073-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/L1004872.jpeg`,
    thumbnail: `${baseUrl}/L1004872-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/L1002152.jpeg`,
    thumbnail: `${baseUrl}/L1002152-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/L1004455.jpeg`,
    thumbnail: `${baseUrl}/L1004455-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/L1004429.jpeg`,
    thumbnail: `${baseUrl}/L1004429-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/L1005898.jpeg`,
    thumbnail: `${baseUrl}/L1005898-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/L1006308.jpg`,
    thumbnail: `${baseUrl}/L1006308-thumbnail.jpg`,
  },
  {
    href: `${baseUrl}/L1007099.jpeg`,
    thumbnail: `${baseUrl}/L1007099-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/IMG_0386.jpeg`,
    thumbnail: `${baseUrl}/IMG_0386-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/IMG_0064.jpeg`,
    thumbnail: `${baseUrl}/IMG_0064-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/IMG_0070.jpeg`,
    thumbnail: `${baseUrl}/IMG_0070-thumbnail.jpeg`,
  },
  {
    href: `${baseUrl}/000029.jpeg`,
    thumbnail: `${baseUrl}/000029-thumbnail.jpeg`,
  },
];

export default function Photography() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const dialogRef = useRef();

  const handleThumbnailClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index);
    dialogRef.current.showModal();
    // document.body.style.overflow = "hidden";
  };

  const handleActiveIndexChange = (swiper) => {
    console.log(swiper);
    setActiveIndex(swiper.activeIndex);
  };

  const handleDialogClose = () => {
    setActiveIndex(null);
  };

  const handleDialogCloseBtnClick = () => {
    dialogRef.current.close();
    setActiveIndex(null);
  };

  const handleSwiperClick = (swiper, e) => {
    setIsToolbarVisible(!isToolbarVisible);
    [swiper.navigation.$prevEl[0], swiper.navigation.$nextEl[0]].forEach(
      (elem) => {
        elem.classList.toggle("swiper-button-hidden", isToolbarVisible);
      }
    );
  };

  return (
    <>
      <Head>
        <title>仇俊斌的摄影作品集 - Hora Hora</title>
      </Head>

      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>仇俊斌的摄影作品集</h1>
        </div>
        <div className={`${styles.photographyList} ${styles.container}`}>
          {photoListData.map((photo, index) => (
            <div className={styles.photoItem} key={photo.thumbnail}>
              <a
                href={photo.href}
                onClick={(e) => handleThumbnailClick(e, index)}
              >
                <img src={photo.thumbnail} />
              </a>
            </div>
          ))}
        </div>
        <div className={`${styles.copyright} ${styles.container}`}>
          {`© ${new Date().getFullYear()} Hora Hora. All rights reserved.`}
        </div>
        <dialog
          ref={dialogRef}
          className={styles.dialog}
          onClose={handleDialogClose}
        >
          <div
            className={classNames(styles.dialogToolbar, {
              [styles.dialogToolbarHidden]: !isToolbarVisible,
            })}
          >
            <div className={styles.dialogTitle}>{`${activeIndex + 1} / ${
              photoListData.length
            }`}</div>
            <a
              className={styles.dialogClose}
              onClick={handleDialogCloseBtnClick}
            >
              <Xmark width="20" height="20" />
            </a>
          </div>
          {activeIndex !== null && (
            <Swiper
              initialSlide={activeIndex}
              modules={[Zoom, Lazy, Navigation, Keyboard]}
              lazy
              zoom
              navigation
              keyboard
              spaceBetween={20}
              onSlideChange={() => console.log("slide change")}
              onActiveIndexChange={(swiper) => handleActiveIndexChange(swiper)}
              onClick={handleSwiperClick}
              onZoomChange={() => {
                setIsToolbarVisible(false);
              }}
              className={styles.photoSwiper}
            >
              {photoListData.map((photo) => (
                <SwiperSlide key={photo.thumbnail} zoom>
                  <img data-src={photo.href} className="swiper-lazy" />
                  <div className="swiper-lazy-preloader"></div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </dialog>
      </div>
    </>
  );
}
