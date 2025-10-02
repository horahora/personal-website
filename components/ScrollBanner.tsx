import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ScrollBanner() {
  const scrollTriggerRef = useRef<HTMLDivElement>(null!);

  useGSAP(
    (self) => {
      self.selector?.(".banner").forEach((item: HTMLElement) => {
        gsap.fromTo(
          item.querySelector(".text"),
          {
            xPercent(index, target) {
              return target.dataset.fromXPercent;
            },
          },
          {
            xPercent(index, target) {
              return target.dataset.toXPercent;
            },
            scrollTrigger: {
              trigger: item,
              scrub: 2,
            },
          }
        );
      });
    },
    { scope: scrollTriggerRef }
  );

  return (
    <div>
      <div ref={scrollTriggerRef}>
        <div className="banner mb-[10vmax] translate-x-[-50vw] rotate-[26deg]">
          <div
            className="text bg-[var(--primary-color)] text-[#edf1e5] px-5 text-[10vmax] font-semibold leading-none w-max"
            data-from-x-percent="50"
            data-to-x-percent="-50"
          >
            {"CAUTION!!".repeat(6)}
          </div>
        </div>
        <div className="banner mb-[6vmax]">
          <div
            className="text bg-[var(--primary-color)] text-[#edf1e5] px-5 text-[10vmax] font-semibold leading-none w-max"
            data-from-x-percent="-100"
            data-to-x-percent="0"
          >
            {"CAUTION!!".repeat(3)}
          </div>
        </div>
        <div className="banner mb-[4vmax] rotate-[9deg]">
          <div
            className="text bg-[var(--primary-color)] text-[#edf1e5] px-5 text-[10vmax] font-semibold leading-none w-max"
            data-from-x-percent="50"
            data-to-x-percent="-50"
          >
            {"CAUTION!!".repeat(5)}
          </div>
        </div>
        <div className="banner translate-x-[-50vmax] rotate-[-19deg]">
          <div
            className="text bg-[var(--primary-color)] text-[#edf1e5] px-5 text-[10vmax] font-semibold leading-none w-max"
            data-from-x-percent="-100"
            data-to-x-percent="0"
          >
            {"CAUTION!!".repeat(6)}
          </div>
        </div>
        <div className="banner translate-x-[-10vmax] rotate-[3deg]">
          <div
            className="text bg-[var(--primary-color)] text-[#edf1e5] px-5 text-[10vmax] font-semibold leading-none w-max"
            data-from-x-percent="50"
            data-to-x-percent="-90"
          >
            {"CAUTION!!".repeat(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
