"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function EyesOnYou() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [displayWidth, setDisplayWidth] = useState(0);
  const [displayHeight, setDisplayHeight] = useState(0);
  const [scale, setScale] = useState(0);
  const [pointerX, setPointerX] = useState((displayWidth * scale) / 2);
  const [pointerY, setPointerY] = useState((displayHeight * scale) / 2);

  const DISPLAY_DURATION_MILLISECOND = 10000;

  useEffect(() => {
    const eyes = [
      { x: 0.19, y: 0.8, scale: 0.88, delay: 0.31 },
      { x: 0.1, y: 0.54, scale: 0.84, delay: 0.32 },
      { x: 0.81, y: 0.13, scale: 0.63, delay: 0.33 },
      { x: 0.89, y: 0.19, scale: 0.58, delay: 0.34 },
      { x: 0.4, y: 0.08, scale: 0.97, delay: 0.35 },
      { x: 0.64, y: 0.74, scale: 0.57, delay: 0.36 },
      { x: 0.41, y: 0.89, scale: 0.56, delay: 0.37 },
      { x: 0.92, y: 0.89, scale: 0.75, delay: 0.38 },
      { x: 0.27, y: 0.2, scale: 0.87, delay: 0.39 },
      { x: 0.17, y: 0.46, scale: 0.68, delay: 0.41 },
      { x: 0.71, y: 0.29, scale: 0.93, delay: 0.42 },
      { x: 0.84, y: 0.46, scale: 0.54, delay: 0.43 },
      { x: 0.93, y: 0.35, scale: 0.63, delay: 0.44 },
      { x: 0.77, y: 0.82, scale: 0.85, delay: 0.45 },
      { x: 0.36, y: 0.74, scale: 0.9, delay: 0.46 },
      { x: 0.13, y: 0.24, scale: 0.85, delay: 0.47 },
      { x: 0.58, y: 0.2, scale: 0.77, delay: 0.48 },
      { x: 0.55, y: 0.84, scale: 0.87, delay: 0.5 },

      { x: 0.5, y: 0.5, scale: 3.5, delay: 0.1 },
    ];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(scale, scale);

    let start: DOMHighResTimeStamp | null = null;

    function step(timestamp: DOMHighResTimeStamp) {
      window.requestAnimationFrame(step);

      start ??= timestamp;
      // The number of seconds that have passed since initialization
      const elapsed = timestamp - start;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      render(timestamp, elapsed);
    }

    function render(
      timestamp: DOMHighResTimeStamp,
      elapsed: DOMHighResTimeStamp
    ) {
      eyes.forEach(({ x, y, scale, delay }) => {
        if (elapsed < delay * DISPLAY_DURATION_MILLISECOND) return;

        // The speed at which the iris follows the pointer
        // const irisSpeed = 0.01 + (Math.random() * 0.2) / scale;

        // The speed at which the eye opens and closes
        const blinkSpeed = 0.2 + Math.random() * 0.2;
        const blinkInterval = 5000 + 5000 * Math.random();

        // Timestamp of the last blink
        let blinkTime = Date.now();

        const size = 70 * scale;
        const eyeCenter = {
          x: x * canvas.width,
          y: y * canvas.height + size * 0.15,
        };
        const iris = {
          x: eyeCenter.x,
          y: eyeCenter.y - size * 0.1,
          size: size * 0.2,
        };

        // const pupil = {
        //   width: 2 * scale,
        //   height: iris.size * 0.75,
        // };
        const exposure = {
          top: 0.1 + Math.random() * 0.3,
          bottom: 0.5 + Math.random() * 0.3,
          current: 0,
          target: 1,
        };
        // Affects the amount of inner shadow
        const tiredness = 0.5 - exposure.top + 0.1;

        const eyeLeft = {
          x: eyeCenter.x - size * 0.8,
          y: eyeCenter.y - size * 0.1,
        };
        const eyeRight = {
          x: eyeCenter.x + size * 0.8,
          y: eyeCenter.y - size * 0.1,
        };
        const eyeTop = {
          x: eyeCenter.x,
          y: eyeCenter.y - size * (0.5 + exposure.top * exposure.current),
        };
        const eyeBottom = {
          x: eyeCenter.x,
          y: eyeCenter.y + size * (0.5 - exposure.bottom * exposure.current),
        };

        // Eye inner shadow top
        const eyeInnerTop = {
          x: eyeCenter.x,
          y: eyeCenter.y - size * (0.5 + (0.5 - tiredness) * exposure.current),
        };

        // Offset the iris depending on pointer position
        const irisOffset = {
          x: (pointerX - iris.x) / (canvas.width - iris.x),
          y: pointerY / canvas.height,
        };

        // Apply the iris offset
        iris.x += irisOffset.x * 16 * Math.max(1, scale * 0.4);
        iris.y += irisOffset.y * 10 * Math.max(1, scale * 0.4);
        const time = Date.now();

        if (exposure.current < 0.012) {
          exposure.target = 1;
        } else if (time - blinkTime > blinkInterval) {
          exposure.target = 0;
          blinkTime = time;
        }

        exposure.current += (exposure.target - exposure.current) * blinkSpeed;

        // Eye fill drawing
        ctx.save();
        ctx.fillStyle = "rgba(255,255,255,1.0)";
        ctx.strokeStyle = "rgba(100,100,100,1.0)";
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.moveTo(eyeLeft.x, eyeLeft.y);
        ctx.moveTo(eyeLeft.x, eyeLeft.y);
        ctx.quadraticCurveTo(eyeTop.x, eyeTop.y, eyeRight.x, eyeRight.y);
        ctx.quadraticCurveTo(eyeBottom.x, eyeBottom.y, eyeLeft.x, eyeLeft.y);
        ctx.stroke();
        ctx.fill();
        ctx.restore();

        // Iris
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        ctx.translate(iris.x * 0.1, 0);
        ctx.scale(0.9, 1);
        ctx.strokeStyle = "rgba(0,0,0,0.9)";
        ctx.fillStyle = "hsl(354deg 59% 24%)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(iris.x, iris.y, iris.size * 0.9, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Iris inner
        ctx.save();
        ctx.shadowColor = "rgba(255,255,255,0.5)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 2 * scale;
        ctx.globalCompositeOperation = "source-atop";
        ctx.translate(iris.x * 0.1, 0);
        ctx.scale(0.9, 1);
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.arc(iris.x, iris.y, iris.size * 0.6, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();

        // Pupil
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.beginPath();
        // ctx.moveTo(iris.x, iris.y - pupil.height * 0.5);
        // ctx.quadraticCurveTo(
        //   iris.x + pupil.width * 0.5,
        //   iris.y,
        //   iris.x,
        //   iris.y + pupil.height * 0.5
        // );
        // ctx.quadraticCurveTo(
        //   iris.x - pupil.width * 0.5,
        //   iris.y,
        //   iris.x,
        //   iris.y - pupil.height * 0.5
        // );
        ctx.arc(iris.x, iris.y, iris.size * 0.2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();

        // highlight
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.beginPath();
        ctx.arc(
          iris.x - size * 0.114,
          iris.y - size * 0.114,
          iris.size * 0.1,
          0,
          Math.PI * 2,
          true
        );
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.9)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;

        // Eye top inner shadow
        ctx.fillStyle = "rgba(120,120,120,0.2)";
        ctx.beginPath();
        ctx.moveTo(eyeLeft.x, eyeLeft.y);
        ctx.quadraticCurveTo(eyeTop.x, eyeTop.y, eyeRight.x, eyeRight.y);
        ctx.quadraticCurveTo(
          eyeInnerTop.x,
          eyeInnerTop.y,
          eyeLeft.x,
          eyeLeft.y
        );
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });
    }

    window.requestAnimationFrame(step);
  }, [pointerX, pointerY, scale]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const resize = () => {
      setDisplayWidth(window.innerWidth);
      setDisplayHeight(window.innerHeight);
    };

    const setPointer = (event: PointerEvent) => {
      setPointerX(event.clientX);
      setPointerY(event.clientY);
    };

    const updatePixelRatio = () => {
      setScale(window.devicePixelRatio);
    };

    const mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
    const media = matchMedia(mqString);
    media.addEventListener("change", updatePixelRatio);
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", setPointer);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", setPointer);
      media.removeEventListener("change", updatePixelRatio);
    };
  }, []);

  useLayoutEffect(() => {
    // function Eye(canvas, x, y, scale, time) {
    //   // The time at which this eye will come alive
    //   this.activationTime = time;
    //   // The speed at which the iris follows the pointer
    //   this.irisSpeed = 0.01 + (Math.random() * 0.2) / scale;
    //   // The speed at which the eye opens and closes
    //   this.blinkSpeed = 0.2 + Math.random() * 0.2;
    //   this.blinkInterval = 5000 + 5000 * Math.random();
    //   // Timestamp of the last blink
    //   this.blinkTime = Date.now();
    //   this.scale = scale;
    //   this.size = 70 * scale;
    //   this.x = x * canvas.width;
    //   this.y = y * canvas.height + this.size * 0.15;
    //   this.iris = {
    //     x: this.x,
    //     y: this.y - this.size * 0.1,
    //     size: this.size * 0.2,
    //   };
    //   this.pupil = {
    //     width: 2 * scale,
    //     height: this.iris.size * 0.75,
    //   };
    //   this.exposure = {
    //     top: 0.1 + Math.random() * 0.3,
    //     bottom: 0.5 + Math.random() * 0.3,
    //     current: 0,
    //     target: 1,
    //   };
    //   // Affects the amount of inner shadow
    //   this.tiredness = 0.5 - this.exposure.top + 0.1;
    //   this.isActive = false;
    //   this.activate = function () {
    //     this.isActive = true;
    //   };
    //   this.update = function (pointer) {
    //     if (this.isActive === true) {
    //       this.render(pointer);
    //     }
    //   };
    //   this.render = function (pointer) {
    //     const time = Date.now();
    //     if (this.exposure.current < 0.012) {
    //       this.exposure.target = 1;
    //     } else if (time - this.blinkTime > this.blinkInterval) {
    //       this.exposure.target = 0;
    //       this.blinkTime = time;
    //     }
    //     this.exposure.current +=
    //       (this.exposure.target - this.exposure.current) * this.blinkSpeed;
    //     // Eye left/right
    //     var el = { x: this.x - this.size * 0.8, y: this.y - this.size * 0.1 };
    //     var er = { x: this.x + this.size * 0.8, y: this.y - this.size * 0.1 };
    //     // Eye top/bottom
    //     var et = {
    //       x: this.x,
    //       y:
    //         this.y -
    //         this.size * (0.5 + this.exposure.top * this.exposure.current),
    //     };
    //     var eb = {
    //       x: this.x,
    //       y:
    //         this.y -
    //         this.size * (0.5 - this.exposure.bottom * this.exposure.current),
    //     };
    //     // Eye inner shadow top
    //     var eit = {
    //       x: this.x,
    //       y:
    //         this.y -
    //         this.size * (0.5 + (0.5 - this.tiredness) * this.exposure.current),
    //     };
    //     // Eye iris
    //     var ei = { x: this.x, y: this.y - this.iris.size };
    //     // Offset the iris depending on pointer position
    //     var eio = {
    //       x: (pointerX - ei.x) / (canvas.width - ei.x),
    //       y: pointerY / canvas.height,
    //     };
    //     // Apply the iris offset
    //     ei.x += eio.x * 16 * Math.max(1, this.scale * 0.4);
    //     ei.y += eio.y * 10 * Math.max(1, this.scale * 0.4);
    //     this.iris.x += (ei.x - this.iris.x) * this.irisSpeed;
    //     this.iris.y += (ei.y - this.iris.y) * this.irisSpeed;
    //     // Eye fill drawing
    //     ctx.fillStyle = "rgba(255,255,255,1.0)";
    //     ctx.strokeStyle = "rgba(100,100,100,1.0)";
    //     ctx.beginPath();
    //     ctx.lineWidth = 3;
    //     ctx.lineJoin = "round";
    //     ctx.moveTo(el.x, el.y);
    //     ctx.quadraticCurveTo(et.x, et.y, er.x, er.y);
    //     ctx.quadraticCurveTo(eb.x, eb.y, el.x, el.y);
    //     ctx.closePath();
    //     ctx.stroke();
    //     ctx.fill();
    //     // Iris
    //     ctx.save();
    //     ctx.globalCompositeOperation = "source-atop";
    //     ctx.translate(this.iris.x * 0.1, 0);
    //     ctx.scale(0.9, 1);
    //     ctx.strokeStyle = "rgba(0,0,0,0.9)";
    //     ctx.fillStyle = "hsl(354deg 59% 24%)";
    //     ctx.lineWidth = 2;
    //     ctx.beginPath();
    //     ctx.arc(
    //       this.iris.x,
    //       this.iris.y,
    //       this.iris.size * 0.9,
    //       0,
    //       Math.PI * 2,
    //       true
    //     );
    //     ctx.fill();
    //     ctx.stroke();
    //     ctx.restore();
    //     // Iris inner
    //     ctx.save();
    //     ctx.shadowColor = "rgba(255,255,255,0.5)";
    //     ctx.shadowOffsetX = 0;
    //     ctx.shadowOffsetY = 0;
    //     ctx.shadowBlur = 2 * this.scale;
    //     ctx.globalCompositeOperation = "source-atop";
    //     ctx.translate(this.iris.x * 0.1, 0);
    //     ctx.scale(0.9, 1);
    //     ctx.fillStyle = "rgba(255,255,255,0.1)";
    //     ctx.beginPath();
    //     ctx.arc(
    //       this.iris.x,
    //       this.iris.y,
    //       this.iris.size * 0.6,
    //       0,
    //       Math.PI * 2,
    //       true
    //     );
    //     ctx.fill();
    //     ctx.restore();
    //     // Pupil
    //     ctx.save();
    //     ctx.globalCompositeOperation = "source-atop";
    //     ctx.fillStyle = "rgba(0,0,0,0.9)";
    //     ctx.beginPath();
    //     // ctx.moveTo(this.iris.x, this.iris.y - this.pupil.height * 0.5);
    //     // ctx.quadraticCurveTo(
    //     //   this.iris.x + this.pupil.width * 0.5,
    //     //   this.iris.y,
    //     //   this.iris.x,
    //     //   this.iris.y + this.pupil.height * 0.5
    //     // );
    //     // ctx.quadraticCurveTo(
    //     //   this.iris.x - this.pupil.width * 0.5,
    //     //   this.iris.y,
    //     //   this.iris.x,
    //     //   this.iris.y - this.pupil.height * 0.5
    //     // );
    //     ctx.arc(
    //       this.iris.x,
    //       this.iris.y,
    //       this.iris.size * 0.2,
    //       0,
    //       Math.PI * 2,
    //       true
    //     );
    //     ctx.fill();
    //     ctx.restore();
    //     // highlight
    //     ctx.save();
    //     ctx.globalCompositeOperation = "source-atop";
    //     ctx.fillStyle = "rgba(255,255,255,1)";
    //     ctx.beginPath();
    //     ctx.arc(
    //       this.iris.x - this.size * 0.114,
    //       this.iris.y - this.size * 0.114,
    //       this.iris.size * 0.1,
    //       0,
    //       Math.PI * 2,
    //       true
    //     );
    //     ctx.fill();
    //     ctx.restore();
    //     ctx.save();
    //     ctx.shadowColor = "rgba(0,0,0,0.9)";
    //     ctx.shadowOffsetX = 0;
    //     ctx.shadowOffsetY = 0;
    //     ctx.shadowBlur = 10;
    //     // Eye top inner shadow
    //     ctx.fillStyle = "rgba(120,120,120,0.2)";
    //     ctx.beginPath();
    //     ctx.moveTo(el.x, el.y);
    //     ctx.quadraticCurveTo(et.x, et.y, er.x, er.y);
    //     ctx.quadraticCurveTo(eit.x, eit.y, el.x, el.y);
    //     ctx.closePath();
    //     ctx.fill();
    //     ctx.restore();
    //   };
    // }
  }, []);

  return (
    <canvas
      className={styles.canvas}
      ref={canvasRef}
      style={{ width: displayWidth, height: displayHeight }}
      width={displayWidth * scale}
      height={displayHeight * scale}
    />
  );
}
