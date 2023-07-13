// @ts-nocheck
"use client";

import { useLayoutEffect, useRef } from "react";
import styles from "./page.module.css";

export default function Eyes() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useLayoutEffect(() => {
    (function () {
      const DISPLAY_WIDTH = window.innerWidth;
      const DISPLAY_HEIGHT = window.innerHeight;
      const DISPLAY_DURATION = 10;

      let mouse = { x: 0, y: 0 },
        canvas,
        ctx,
        startTime,
        eyes;

      function initialize(timestamp) {
        startTime = timestamp;

        canvas = canvasRef.current;
        canvas.style.width = DISPLAY_WIDTH + "px";
        canvas.style.height = DISPLAY_HEIGHT + "px";
        canvas.width = Math.floor(DISPLAY_WIDTH * window.devicePixelRatio);
        canvas.height = Math.floor(DISPLAY_HEIGHT * window.devicePixelRatio);

        ctx = canvas.getContext("2d")!;

        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        window.addEventListener("mousemove", (event) => {
          mouse.x = event.clientX;
          mouse.y = event.clientY;
        });

        eyes = [
          new Eye(canvas, 0.19, 0.8, 0.88, 0.31),
          new Eye(canvas, 0.1, 0.54, 0.84, 0.32),
          new Eye(canvas, 0.81, 0.13, 0.63, 0.33),
          new Eye(canvas, 0.89, 0.19, 0.58, 0.34),
          new Eye(canvas, 0.4, 0.08, 0.97, 0.35),
          new Eye(canvas, 0.64, 0.74, 0.57, 0.36),
          new Eye(canvas, 0.41, 0.89, 0.56, 0.37),
          new Eye(canvas, 0.92, 0.89, 0.75, 0.38),
          new Eye(canvas, 0.27, 0.2, 0.87, 0.39),
          new Eye(canvas, 0.17, 0.46, 0.68, 0.41),
          new Eye(canvas, 0.71, 0.29, 0.93, 0.42),
          new Eye(canvas, 0.84, 0.46, 0.54, 0.43),
          new Eye(canvas, 0.93, 0.35, 0.63, 0.44),
          new Eye(canvas, 0.77, 0.82, 0.85, 0.45),
          new Eye(canvas, 0.36, 0.74, 0.9, 0.46),
          new Eye(canvas, 0.13, 0.24, 0.85, 0.47),
          new Eye(canvas, 0.58, 0.2, 0.77, 0.48),
          new Eye(canvas, 0.55, 0.84, 0.87, 0.5),

          new Eye(canvas, 0.5, 0.5, 3.5, 0.1),
        ];

        animate(timestamp);
      }

      function animate(timestamp: DOMHighResTimeStamp) {
        // The number of seconds that have passed since initialization
        var seconds = (timestamp - startTime) / 1000;

        // Out with the old ...
        ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);

        // ... in with the new
        eyes.forEach((eye) => {
          if (seconds > eye.activationTime * DISPLAY_DURATION) {
            eye.activate();
          }
          eye.update(mouse);
        });

        window.requestAnimationFrame(animate);
      }

      window.requestAnimationFrame(initialize);
    })();

    function Eye(canvas, x: number, y: number, scale: number, time: number) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");

      // The time at which this eye will come alive
      this.activationTime = time;

      // The speed at which the iris follows the mouse
      this.irisSpeed = 0.01 + (Math.random() * 0.2) / scale;

      // The speed at which the eye opens and closes
      this.blinkSpeed = 0.2 + Math.random() * 0.2;
      this.blinkInterval = 5000 + 5000 * Math.random();

      // Timestamp of the last blink
      this.blinkTime = Date.now();

      this.scale = scale;
      this.size = 70 * scale;

      this.x = (x * canvas.width) / window.devicePixelRatio;
      this.y = (y * canvas.height) / window.devicePixelRatio + this.size * 0.15;

      this.iris = {
        x: this.x,
        y: this.y - this.size * 0.1,
        size: this.size * 0.2,
      };

      this.pupil = {
        width: 2 * scale,
        height: this.iris.size * 0.75,
      };

      this.exposure = {
        top: 0.1 + Math.random() * 0.3,
        bottom: 0.5 + Math.random() * 0.3,
        current: 0,
        target: 1,
      };

      // Affects the amount of inner shadow
      this.tiredness = 0.5 - this.exposure.top + 0.1;

      this.isActive = false;

      this.activate = function () {
        this.isActive = true;
      };

      this.update = function (mouse) {
        if (this.isActive === true) {
          this.render(mouse);
        }
      };

      this.render = function (mouse) {
        var time = Date.now();

        if (this.exposure.current < 0.012) {
          this.exposure.target = 1;
        } else if (time - this.blinkTime > this.blinkInterval) {
          this.exposure.target = 0;
          this.blinkTime = time;
        }

        this.exposure.current +=
          (this.exposure.target - this.exposure.current) * this.blinkSpeed;

        // Eye left/right
        var el = { x: this.x - this.size * 0.8, y: this.y - this.size * 0.1 };
        var er = { x: this.x + this.size * 0.8, y: this.y - this.size * 0.1 };

        // Eye top/bottom
        var et = {
          x: this.x,
          y:
            this.y -
            this.size * (0.5 + this.exposure.top * this.exposure.current),
        };
        var eb = {
          x: this.x,
          y:
            this.y -
            this.size * (0.5 - this.exposure.bottom * this.exposure.current),
        };

        // Eye inner shadow top
        var eit = {
          x: this.x,
          y:
            this.y -
            this.size * (0.5 + (0.5 - this.tiredness) * this.exposure.current),
        };

        // Eye iris
        var ei = { x: this.x, y: this.y - this.iris.size };

        // Offset the iris depending on mouse position
        var eio = {
          x: (mouse.x - ei.x) / (window.innerWidth - ei.x),
          y: mouse.y / window.innerHeight,
        };

        // Apply the iris offset
        ei.x += eio.x * 16 * Math.max(1, this.scale * 0.4);
        ei.y += eio.y * 10 * Math.max(1, this.scale * 0.4);

        this.iris.x += (ei.x - this.iris.x) * this.irisSpeed;
        this.iris.y += (ei.y - this.iris.y) * this.irisSpeed;

        // Eye fill drawing
        this.ctx.fillStyle = "rgba(255,255,255,1.0)";
        this.ctx.strokeStyle = "rgba(100,100,100,1.0)";
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.lineJoin = "round";
        this.ctx.moveTo(el.x, el.y);
        this.ctx.quadraticCurveTo(et.x, et.y, er.x, er.y);
        this.ctx.quadraticCurveTo(eb.x, eb.y, el.x, el.y);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();

        // Iris
        this.ctx.save();
        this.ctx.globalCompositeOperation = "source-atop";
        this.ctx.translate(this.iris.x * 0.1, 0);
        this.ctx.scale(0.9, 1);
        this.ctx.strokeStyle = "rgba(0,0,0,0.9)";
        this.ctx.fillStyle = "hsl(354deg 59% 24%)";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(
          this.iris.x,
          this.iris.y,
          this.iris.size * 0.9,
          0,
          Math.PI * 2,
          true
        );
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();

        // Iris inner
        this.ctx.save();
        this.ctx.shadowColor = "rgba(255,255,255,0.5)";
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 2 * this.scale;
        this.ctx.globalCompositeOperation = "source-atop";
        this.ctx.translate(this.iris.x * 0.1, 0);
        this.ctx.scale(0.9, 1);
        this.ctx.fillStyle = "rgba(255,255,255,0.1)";
        this.ctx.beginPath();
        this.ctx.arc(
          this.iris.x,
          this.iris.y,
          this.iris.size * 0.6,
          0,
          Math.PI * 2,
          true
        );
        this.ctx.fill();
        this.ctx.restore();

        // Pupil
        this.ctx.save();
        this.ctx.globalCompositeOperation = "source-atop";
        this.ctx.fillStyle = "rgba(0,0,0,0.9)";
        this.ctx.beginPath();
        // this.ctx.moveTo(this.iris.x, this.iris.y - this.pupil.height * 0.5);
        // this.ctx.quadraticCurveTo(
        //   this.iris.x + this.pupil.width * 0.5,
        //   this.iris.y,
        //   this.iris.x,
        //   this.iris.y + this.pupil.height * 0.5
        // );
        // this.ctx.quadraticCurveTo(
        //   this.iris.x - this.pupil.width * 0.5,
        //   this.iris.y,
        //   this.iris.x,
        //   this.iris.y - this.pupil.height * 0.5
        // );
        this.ctx.arc(
          this.iris.x,
          this.iris.y,
          this.iris.size * 0.2,
          0,
          Math.PI * 2,
          true
        );
        this.ctx.fill();
        this.ctx.restore();

        // highlight
        this.ctx.save();
        this.ctx.globalCompositeOperation = "source-atop";
        this.ctx.fillStyle = "rgba(255,255,255,1)";
        this.ctx.beginPath();
        this.ctx.arc(
          this.iris.x - this.size * 0.114,
          this.iris.y - this.size * 0.114,
          this.iris.size * 0.1,
          0,
          Math.PI * 2,
          true
        );
        this.ctx.fill();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.shadowColor = "rgba(0,0,0,0.9)";
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 10;

        // Eye top inner shadow
        this.ctx.fillStyle = "rgba(120,120,120,0.2)";
        this.ctx.beginPath();
        this.ctx.moveTo(el.x, el.y);
        this.ctx.quadraticCurveTo(et.x, et.y, er.x, er.y);
        this.ctx.quadraticCurveTo(eit.x, eit.y, el.x, el.y);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
      };
    }
  }, []);

  return <canvas className={styles.canvas} ref={canvasRef} />;
}
