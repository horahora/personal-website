import { useState, useEffect, useLayoutEffect, useRef } from "react";
import classNames from "classnames";
import { ChevronLeft, ChevronRight } from "framework7-icons/react";
import styles from "./swiper.module.css";
// import { gsap } from "gsap";
// import { Observer } from "gsap/dist/Observer";

// gsap.registerPlugin(Observer);

let slideElList: NodeListOf<HTMLElement>;
let slideLength: number;

export default function Swiper({
  list,
}: {
  list: {
    href: string;
    thumbnail: string;
  }[];
}) {
  const swiperRef = useRef<HTMLDivElement>(null!);
  const paginationRef = useRef<HTMLElement>(null!);

  const [activeIndex, setActiveIndex] = useState(0);
  const handlePrevClick = () => {
    if (activeIndex === 0) return;
    setActiveIndex((prevActiveIndex) => prevActiveIndex - 1);
    slideElList[activeIndex - 1].scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleNextClick = () => {
    if (activeIndex === slideLength - 1) return;
    setActiveIndex((prevActiveIndex) => prevActiveIndex + 1);
    slideElList[activeIndex + 1].scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    slideElList = swiperRef.current.querySelectorAll("section");
    slideLength = slideElList.length;

    const observer = new IntersectionObserver((entrys) => {
      entrys.forEach((entry) => {
        const el = entry.target as HTMLElement;
        // console.log(entry);
        // console.log(`${el.innerHTML}: ${entry.isIntersecting}`);
        if (entry.isIntersecting) {
          const index = Array.from(slideElList).indexOf(el);
          // const elem = entry.target;
          setActiveIndex(index);
        }
      });
    });
    slideElList.forEach((el) => {
      observer.observe(el);
    });

    // Observer.create({
    //   target: swiperRef.current, // can be any element (selector text is fine)
    //   dragMinimum: 5,
    //   tolerance: 5,
    //   // onUp: () => {
    //   //   console.log("up");
    //   // },
    //   // onDown: () => {
    //   //   console.log("down");
    //   // },
    //   onDrag: (self) => {
    //     console.log(self.event.type, self.deltaY, self.y);
    //   },
    //   onChangeY: (self) => {
    //     gsap.set(swiperRef.current, { y: self.y });
    //     console.log(self.event.type, self.deltaY, self.y);
    //   },
    // });
  }, []);

  const handlePaginationClick = (index: number) => {
    slideElList[index].scrollIntoView({
      behavior: "smooth",
    });
  };
  // useEffect(() => {
  //   slideElList?.[activeIndex].scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [activeIndex]);

  return (
    <>
      <div className={styles.swiper} ref={swiperRef}>
        <div
          className={styles.swiperScroller}
          onTouchMove={(event) => {
            console.log(event);
            event.preventDefault();
          }}
        >
          {list.map((item, i) => (
            <section
              key={i}
              onTouchMove={(event) => {
                console.log(event);
                event.preventDefault();
              }}
            >
              <img
                src={item.href}
                loading="lazy"
                onTouchMove={(event) => {
                  console.log(event);
                  event.preventDefault();
                }}
              />
            </section>
          ))}
        </div>
        <nav className={styles.pagination} ref={paginationRef}>
          {Array.from({ length: slideLength }, (element, index) => (
            <a
              className={classNames({ [styles.active]: index === activeIndex })}
              onClick={() => handlePaginationClick(index)}
              key={index}
            ></a>
          ))}
        </nav>
        <button
          type="button"
          className={styles.swiperButtonPrev}
          onClick={handlePrevClick}
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          className={styles.swiperButtonNext}
          onClick={handleNextClick}
        >
          <ChevronRight />
        </button>
      </div>

      <p>Active Index: {activeIndex}</p>
    </>
  );
}
