"use client";

import { useLayoutEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface IrisState extends Point {
  size: number;
}

interface PupilState {
  width: number;
  height: number;
}

interface ExposureState {
  top: number;
  bottom: number;
  current: number;
  target: number;
}

interface EyeInstance {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  activationTime: number;
  irisSpeed: number;
  blinkSpeed: number;
  blinkInterval: number;
  blinkTime: number;
  scale: number;
  size: number;
  x: number;
  y: number;
  iris: IrisState;
  pupil: PupilState;
  exposure: ExposureState;
  tiredness: number;
  isActive: boolean;
  // Lifecycle properties
  lifespan: number; // How long this eye will live (in seconds)
  birthTime: number; // When this eye was created
  isDying: boolean; // Whether this eye is in dying process
  shouldRemove: boolean; // Whether this eye should be removed
  activate: () => void;
  update: (pointer: Point) => void;
  render: (pointer: Point) => void;
  checkLifecycle: (currentTime: number) => void;
}

export default function Eyes() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useLayoutEffect(() => {
    // Animation constants
    const DISPLAY_DURATION = 10;
    const TWO_PI = Math.PI * 2;
    const REFERENCE_DISTANCE = 300;
    const FALLOFF_POWER = 0.7;

    // Eye geometry constants
    const EYE_BASE_SIZE = 70;
    const EYE_HORIZONTAL_OFFSET = 0.8;
    const EYE_VERTICAL_OFFSET = 0.1;
    const EYE_POSITION_OFFSET = 0.15;
    const IRIS_SIZE_RATIO = 0.2;
    const IRIS_POSITION_OFFSET = 0.1;
    const PUPIL_SIZE_RATIO = 0.2;
    const MAX_MOVEMENT_RATIO = 0.15;
    const HIGHLIGHT_OFFSET = 0.114;
    const HIGHLIGHT_SIZE_RATIO = 0.1;

    const pointer: Point = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    let isPointerInViewport = false; // Track if pointer is in viewport

    let eyes: EyeInstance[];
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let startTime: number;
    let currentWidth = window.innerWidth;
    let currentHeight = window.innerHeight;

    function updateCanvasSize() {
      if (!canvasRef.current) return;

      currentWidth = window.innerWidth;
      currentHeight = window.innerHeight;

      canvas = canvasRef.current;
      canvas.style.width = currentWidth + "px";
      canvas.style.height = currentHeight + "px";
      canvas.width = Math.floor(currentWidth * window.devicePixelRatio);
      canvas.height = Math.floor(currentHeight * window.devicePixelRatio);

      ctx = canvas.getContext("2d")!;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      isPointerInViewport = true;
    };

    const handlePointerEnter = () => {
      isPointerInViewport = true;
    };

    const handlePointerLeave = () => {
      isPointerInViewport = false;
    };

    const handleMouseOut = (event: MouseEvent) => {
      // Check if mouse is leaving the document (going outside the browser window)
      // relatedTarget is null when leaving the document entirely
      if (!event.relatedTarget || event.relatedTarget === null) {
        isPointerInViewport = false;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault(); // Prevent page scrolling
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        pointer.x = touch.clientX;
        pointer.y = touch.clientY;
        isPointerInViewport = true;
      }
    };

    const handleTouchEnd = () => {
      isPointerInViewport = false;
    };

    const handleWindowBlur = () => {
      isPointerInViewport = false;
    };

    function Eye(
      canvas: HTMLCanvasElement,
      x: number,
      y: number,
      scale: number,
      time: number
    ): EyeInstance {
      const ctx = canvas.getContext("2d")!;
      const size = EYE_BASE_SIZE * scale;
      const eyeX = (x * canvas.width) / window.devicePixelRatio;
      const eyeY =
        (y * canvas.height) / window.devicePixelRatio +
        size * EYE_POSITION_OFFSET;

      const currentTime = Date.now();

      const eye: EyeInstance = {
        canvas,
        ctx,
        activationTime: time,
        irisSpeed: 0.01 + (Math.random() * 0.2) / scale,
        blinkSpeed: 0.15 + Math.random() * 0.2, // 0.15-0.35 faster blinking
        blinkInterval: 5000 + 5000 * Math.random(),
        blinkTime: currentTime,
        scale,
        size,
        x: eyeX,
        y: eyeY,
        iris: {
          x: eyeX,
          y: eyeY - size * IRIS_POSITION_OFFSET,
          size: size * IRIS_SIZE_RATIO,
        },
        pupil: {
          width: 2 * scale,
          height: size * IRIS_SIZE_RATIO * 0.75,
        },
        exposure: {
          top: 0.1 + Math.random() * 0.3,
          bottom: 0.5 + Math.random() * 0.3,
          current: 0,
          target: 1,
        },
        tiredness: 0.5 - (0.1 + Math.random() * 0.3) + 0.1,
        isActive: false,
        // Lifecycle properties
        lifespan: 15 + Math.random() * 30, // 15-45 seconds lifespan (wider range)
        birthTime: currentTime + (Math.random() - 0.5) * 20000, // ±10 seconds random offset
        isDying: false,
        shouldRemove: false,
        activate() {
          this.isActive = true;
        },
        update(pointer: Point) {
          if (this.isActive) {
            this.render(pointer);
          }
        },
        checkLifecycle(currentTime: number) {
          const age = (currentTime - this.birthTime) / 1000; // Convert to seconds

          if (age > this.lifespan && !this.isDying) {
            // Start dying process - begin closing eyes permanently
            this.isDying = true;
            this.exposure.target = 0;
            this.blinkSpeed = 0.2; // Faster death, but still noticeable
          }

          if (this.isDying && this.exposure.current < 0.01) {
            // Eye is fully closed, mark for removal
            this.shouldRemove = true;
          }
        },
        render(pointer: Point) {
          const time = Date.now();

          // Normal blinking behavior (unless dying)
          if (!this.isDying) {
            if (this.exposure.current < 0.012) {
              this.exposure.target = 1;
            } else if (time - this.blinkTime > this.blinkInterval) {
              this.exposure.target = 0;
              this.blinkTime = time;
            }
          }

          // Use faster easing for blinking - accelerate towards the target
          const diff = this.exposure.target - this.exposure.current;
          const easedSpeed =
            Math.abs(diff) < 0.5 ? this.blinkSpeed * 2 : this.blinkSpeed;
          this.exposure.current += diff * easedSpeed;

          // Eye left/right corners
          const eyeLeft: Point = {
            x: this.x - this.size * EYE_HORIZONTAL_OFFSET,
            y: this.y - this.size * EYE_VERTICAL_OFFSET,
          };
          const eyeRight: Point = {
            x: this.x + this.size * EYE_HORIZONTAL_OFFSET,
            y: this.y - this.size * EYE_VERTICAL_OFFSET,
          };

          // Eye top/bottom points
          const eyeTop: Point = {
            x: this.x,
            y:
              this.y -
              this.size * (0.5 + this.exposure.top * this.exposure.current),
          };
          const eyeBottom: Point = {
            x: this.x,
            y:
              this.y -
              this.size * (0.5 - this.exposure.bottom * this.exposure.current),
          };

          // Eye inner shadow top
          const eyeInnerShadowTop: Point = {
            x: this.x,
            y:
              this.y -
              this.size *
                (0.5 + (0.5 - this.tiredness) * this.exposure.current),
          };

          // Eye iris target position - default center (looking at infinity/forward)
          const irisTarget: Point = { x: this.x, y: this.y - this.iris.size };

          if (isPointerInViewport) {
            // Follow pointer when in viewport
            const deltaX = pointer.x - irisTarget.x;
            const deltaY = pointer.y - irisTarget.y;
            const pointerDistance = Math.sqrt(
              deltaX * deltaX + deltaY * deltaY
            );
            const pointerAngle = Math.atan2(deltaY, deltaX);

            // Limit maximum iris movement based on eye size
            const maxIrisMovement = this.size * MAX_MOVEMENT_RATIO;

            // Use a smoother falloff function for distance-based movement
            const normalizedDistance = Math.min(
              pointerDistance / REFERENCE_DISTANCE,
              1
            );
            const actualMovement =
              maxIrisMovement * Math.pow(normalizedDistance, FALLOFF_POWER);

            // Apply the iris offset using polar coordinates
            irisTarget.x += Math.cos(pointerAngle) * actualMovement;
            irisTarget.y += Math.sin(pointerAngle) * actualMovement;
          }
          // When pointer not in viewport, irisTarget remains at center (looking forward/infinity)

          this.iris.x += (irisTarget.x - this.iris.x) * this.irisSpeed;
          this.iris.y += (irisTarget.y - this.iris.y) * this.irisSpeed;

          // Eye fill drawing
          this.ctx.fillStyle = "rgba(255,255,255,1.0)";
          this.ctx.strokeStyle = "rgba(100,100,100,1.0)";
          this.ctx.beginPath();
          this.ctx.lineWidth = 3;
          this.ctx.lineJoin = "round";
          this.ctx.moveTo(eyeLeft.x, eyeLeft.y);
          this.ctx.quadraticCurveTo(eyeTop.x, eyeTop.y, eyeRight.x, eyeRight.y);
          this.ctx.quadraticCurveTo(
            eyeBottom.x,
            eyeBottom.y,
            eyeLeft.x,
            eyeLeft.y
          );
          this.ctx.closePath();
          this.ctx.stroke();
          this.ctx.fill();

          // Iris components - batch rendering with single transform
          this.ctx.save();
          this.ctx.globalCompositeOperation = "source-atop";
          this.ctx.translate(this.iris.x * 0.1, 0);
          this.ctx.scale(0.9, 1);

          // Main iris
          this.ctx.fillStyle = "hsl(354deg 59% 24%)";
          this.ctx.strokeStyle = "rgba(0,0,0,0.9)";
          this.ctx.lineWidth = 2;
          this.ctx.beginPath();
          this.ctx.arc(
            this.iris.x,
            this.iris.y,
            this.iris.size * 0.9,
            0,
            TWO_PI
          );
          this.ctx.fill();
          this.ctx.stroke();

          // Iris inner glow
          this.ctx.shadowColor = "rgba(255,255,255,0.5)";
          this.ctx.shadowBlur = 2 * this.scale;
          this.ctx.fillStyle = "rgba(255,255,255,0.1)";
          this.ctx.beginPath();
          this.ctx.arc(
            this.iris.x,
            this.iris.y,
            this.iris.size * 0.6,
            0,
            TWO_PI
          );
          this.ctx.fill();

          this.ctx.restore();

          // Pupil and highlight - no transform needed
          this.ctx.save();
          this.ctx.globalCompositeOperation = "source-atop";

          // Pupil
          this.ctx.fillStyle = "rgba(0,0,0,0.9)";
          this.ctx.beginPath();
          this.ctx.arc(
            this.iris.x,
            this.iris.y,
            this.iris.size * PUPIL_SIZE_RATIO,
            0,
            TWO_PI
          );
          this.ctx.fill();

          // Highlight
          this.ctx.fillStyle = "rgba(255,255,255,1)";
          this.ctx.beginPath();
          this.ctx.arc(
            this.iris.x - this.size * HIGHLIGHT_OFFSET,
            this.iris.y - this.size * HIGHLIGHT_OFFSET,
            this.iris.size * HIGHLIGHT_SIZE_RATIO,
            0,
            TWO_PI
          );
          this.ctx.fill();
          this.ctx.restore();

          // Eye top inner shadow
          this.ctx.save();
          this.ctx.shadowColor = "rgba(0,0,0,0.9)";
          this.ctx.shadowBlur = 10;
          this.ctx.fillStyle = "rgba(120,120,120,0.2)";
          this.ctx.beginPath();
          this.ctx.moveTo(eyeLeft.x, eyeLeft.y);
          this.ctx.quadraticCurveTo(eyeTop.x, eyeTop.y, eyeRight.x, eyeRight.y);
          this.ctx.quadraticCurveTo(
            eyeInnerShadowTop.x,
            eyeInnerShadowTop.y,
            eyeLeft.x,
            eyeLeft.y
          );
          this.ctx.closePath();
          this.ctx.fill();
          this.ctx.restore();
        },
      };

      return eye;
    }

    function createNewEye(existingEyes: EyeInstance[]): EyeInstance | null {
      const maxAttempts = 50;
      let attempts = 0;

      while (attempts < maxAttempts) {
        const config = {
          x: 0.05 + Math.random() * 0.9,
          y: 0.05 + Math.random() * 0.9,
          scale: 0.4 + Math.random() * 0.8,
          time: Math.random() * 0.5, // 0-0.5 seconds random appearance delay
        };

        // Check collision with existing eyes (including central eye)
        let hasCollision = false;
        for (const existingEye of existingEyes) {
          if (!existingEye.shouldRemove) {
            // Convert both to same coordinate system (normalized 0-1)
            const existingX = existingEye.x / currentWidth;
            const existingY = existingEye.y / currentHeight;

            const dx = Math.abs(config.x - existingX) * currentWidth;
            const dy = Math.abs(config.y - existingY) * currentHeight;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const radius1 = (EYE_BASE_SIZE * config.scale) / 2;
            const radius2 = existingEye.size / 2;
            const minDistance = (radius1 + radius2) * 1.5; // Restore original spacing

            if (distance < minDistance) {
              hasCollision = true;
              break;
            }
          }
        }

        if (!hasCollision) {
          const newEye = Eye(
            canvas,
            config.x,
            config.y,
            config.scale,
            config.time
          );
          // New eyes start with closed exposure and slowly open
          newEye.exposure.current = 0;
          newEye.exposure.target = 1;
          newEye.blinkSpeed = 0.1; // Slow opening
          newEye.activate();
          return newEye;
        }
        attempts++;
      }

      return null; // Failed to find a valid position
    }

    function createEyes() {
      // Calculate responsive eye count based on screen size
      const screenArea = currentWidth * currentHeight;
      const isMobile = currentWidth < 768;

      // Calculate base eye count from screen area (higher density)
      const baseEyeCount = Math.floor(screenArea / 40000);

      let eyeCount: number;
      if (isMobile) {
        // Mobile: keep good density for better visual effect
        eyeCount = Math.max(12, Math.min(20, baseEyeCount));
      } else {
        // Desktop: full eye count based on screen area
        eyeCount = Math.max(15, Math.min(35, baseEyeCount));
      }

      // Generate random eye configurations with collision detection
      const eyes: EyeInstance[] = [];
      const eyeConfigs: Array<{
        x: number;
        y: number;
        scale: number;
        time: number;
      }> = [];

      // Helper function to check if two eyes overlap
      const isOverlapping = (
        x1: number,
        y1: number,
        scale1: number,
        x2: number,
        y2: number,
        scale2: number
      ) => {
        const radius1 = (EYE_BASE_SIZE * scale1) / 2;
        const radius2 = (EYE_BASE_SIZE * scale2) / 2;
        const minDistance = (radius1 + radius2) * 1.5; // 1.5x buffer for spacing

        const dx = Math.abs(x1 - x2) * currentWidth;
        const dy = Math.abs(y1 - y2) * currentHeight;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < minDistance;
      };

      // Calculate central eye scale based on screen size
      let centralScale: number;
      if (isMobile) {
        centralScale = 1.5 + Math.random() * 0.5; // 1.5-2.0 for mobile
      } else if (screenArea < 800000) {
        centralScale = 2.0 + Math.random() * 0.8; // 2.0-2.8 for small screens
      } else {
        centralScale = 2.5 + Math.random() * 1.0; // 2.5-3.5 for large screens
      }

      // Reserve space for central eye
      const centralEyeConfig = {
        x: 0.5,
        y: 0.5,
        scale: centralScale,
        time: 0.1,
      };

      // Create random background eyes with collision detection
      let attempts = 0;
      const maxAttempts = eyeCount * 10; // Prevent infinite loops

      while (eyeConfigs.length < eyeCount && attempts < maxAttempts) {
        const config = {
          x: 0.05 + Math.random() * 0.9,
          y: 0.05 + Math.random() * 0.9,
          scale: 0.4 + Math.random() * 0.8,
          time: 0.3 + Math.random() * 0.4,
        };

        // Check collision with central eye
        if (
          isOverlapping(
            config.x,
            config.y,
            config.scale,
            centralEyeConfig.x,
            centralEyeConfig.y,
            centralEyeConfig.scale
          )
        ) {
          attempts++;
          continue;
        }

        // Check collision with existing eyes
        let hasCollision = false;
        for (const existingConfig of eyeConfigs) {
          if (
            isOverlapping(
              config.x,
              config.y,
              config.scale,
              existingConfig.x,
              existingConfig.y,
              existingConfig.scale
            )
          ) {
            hasCollision = true;
            break;
          }
        }

        if (!hasCollision) {
          eyeConfigs.push(config);
        }
        attempts++;
      }

      // Create eye instances from valid configurations with additional lifecycle spreading
      for (let i = 0; i < eyeConfigs.length; i++) {
        const config = eyeConfigs[i];
        const eye = Eye(canvas, config.x, config.y, config.scale, config.time);

        // Additional lifecycle spreading for initial eyes to prevent mass extinction
        const spreadFactor = (i / eyeConfigs.length) * 15000; // 0-15 second spread
        eye.birthTime += spreadFactor;

        eyes.push(eye);
      }

      // Always add the central large eye last (appears on top)
      const centralEye = Eye(
        canvas,
        centralEyeConfig.x,
        centralEyeConfig.y,
        centralEyeConfig.scale,
        centralEyeConfig.time
      );
      centralEye.lifespan = Infinity; // Central eye never dies
      eyes.push(centralEye);

      return eyes;
    }

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCanvasSize();
        // Recreate eyes with new positions
        eyes = createEyes();
      }, 100);
    };

    function initialize(timestamp: DOMHighResTimeStamp) {
      startTime = timestamp;

      updateCanvasSize();

      // Use document to catch pointer events reliably
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerenter", handlePointerEnter);
      document.addEventListener("pointerleave", handlePointerLeave);
      document.addEventListener("mouseout", handleMouseOut); // Detect when mouse leaves document

      // Touch events - prevent scrolling
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
      document.addEventListener("touchcancel", handleTouchEnd);

      window.addEventListener("blur", handleWindowBlur);
      window.addEventListener("resize", handleResize);

      eyes = createEyes();

      animate(timestamp);
    }

    let lastNewEyeTime = 0;
    const NEW_EYE_INTERVAL = 1500; // Try to add new eye every 1.5 seconds
    let eyeDeathCount = 0; // Track how many eyes have died
    let eyeBirthCount = 0; // Track how many eyes have been born

    function animate(timestamp: DOMHighResTimeStamp) {
      // The number of seconds that have passed since initialization
      const seconds = (timestamp - startTime) / 1000;
      const currentTime = Date.now();

      // Out with the old ...
      ctx.clearRect(0, 0, currentWidth, currentHeight);

      // Check lifecycle and update existing eyes
      eyes.forEach((eye) => {
        if (seconds > eye.activationTime * DISPLAY_DURATION) {
          eye.activate();
        }
        if (eye.isActive) {
          eye.checkLifecycle(currentTime);
        }
        eye.update(pointer);
      });

      // Remove eyes that should be removed
      for (let i = eyes.length - 1; i >= 0; i--) {
        if (eyes[i].shouldRemove) {
          // Don't remove central eye (usually the last one added)
          if (i !== eyes.length - 1 || eyes[i].scale < 2) {
            eyes.splice(i, 1);
            eyeDeathCount++; // Track deaths
          }
        }
      }

      // Balance-based eye creation - prioritize maintaining death/birth balance
      if (currentTime - lastNewEyeTime > NEW_EYE_INTERVAL) {
        const targetEyeCount = Math.floor(
          (currentWidth * currentHeight) / 40000
        );
        const currentBackgroundEyeCount = eyes.filter(
          (eye) => eye.scale < 2
        ).length;
        const maxEyeCount = Math.max(12, Math.min(25, targetEyeCount));

        const deathBirthGap = eyeDeathCount - eyeBirthCount; // How many more deaths than births

        // Prioritize balance: if more deaths than births, be more aggressive about creating
        const shouldCreate =
          deathBirthGap > 0 || // Deaths exceed births - create to balance
          currentBackgroundEyeCount < maxEyeCount * 0.7; // Or if below 70% of target

        if (shouldCreate) {
          const newEye = createNewEye(eyes);
          if (newEye) {
            eyes.splice(eyes.length - 1, 0, newEye); // Insert before central eye
            eyeBirthCount++; // Track births
            lastNewEyeTime = currentTime;
          } else {
            // If we can't find space, reduce the interval to try more frequently
            lastNewEyeTime = currentTime - NEW_EYE_INTERVAL / 2;
          }
        }
      }

      window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(initialize);

    // Cleanup function
    return () => {
      clearTimeout(resizeTimeout);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerenter", handlePointerEnter);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas className="h-screen bg-black" ref={canvasRef} />;
}
