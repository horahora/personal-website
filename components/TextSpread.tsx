import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TextSpread({ text }: { text: string }) {
  const textRef = useRef<HTMLSpanElement>(null!);

  useGSAP(
    (self) => {
      (self.selector?.(".letter") as HTMLElement[]).forEach((letter, i, a) => {
        // TODO: 小屏断点水平位移小一点
        gsap.to(letter, {
          x: 50 * (i - (a.length - 1) / 2),
          scrollTrigger: {
            trigger: textRef.current,
            scrub: 0.5,
            // markers: true,
          },
        });
      });
    },
    { scope: textRef }
  );

  return (
    <div className="flex justify-center items-center h-[50vh]">
      <span
        className="text-3xl sm:text-5xl md:text-7xl font-medium text-center uppercase text-[var(--primary-color)] text-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
        ref={textRef}
      >
        {text.split("").map((letter, i) => (
          <span key={i} className="inline-block letter">
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}
