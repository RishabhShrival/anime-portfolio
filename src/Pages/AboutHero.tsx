import { useEffect, useRef } from "react";

export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothRef = useRef({ x: -9999, y: -9999 });
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    if (!heroRef.current || !canvasRef.current) return;

    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const TRAIL_LENGTH = 70;
    const HEAD_RADIUS = 170;

    const bottom = new Image();
    const top = new Image();

    bottom.src = "/portfolio-anime-cover.png";
    top.src = "/portfolio-anime.png";

    // Reusable offscreen canvas
    const offscreen = document.createElement("canvas");
    const off = offscreen.getContext("2d");

    if (!off) return;

    const getImageParams = (
      img: HTMLImageElement,
      cw: number,
      ch: number,
      align: "left" | "center" | "right" = "center"
    ) => {
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      const scale = Math.min(cw / iw, ch / ih);

      const dw = iw * scale;
      const dh = ih * scale;

      let dx = (cw - dw) / 2;

      if (align === "right") dx = cw - dw;
      if (align === "left") dx = 0;

      const dy = (ch - dh) / 2;

      return { dx, dy, dw, dh };
    };

    const resize = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;

      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    hero.addEventListener("mousemove", onMove);

    let rafId: number;

    const draw = () => {
      const { width, height } = canvas;

      // Smooth cursor
      const s = smoothRef.current;
      const m = mouseRef.current;

      s.x += (m.x - s.x) * 0.13;
      s.y += (m.y - s.y) * 0.13;

      // Update trail
      trailRef.current.unshift({
        x: s.x,
        y: s.y,
      });

      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.length = TRAIL_LENGTH;
      }

      const trail = trailRef.current;

      // Clear canvases
      ctx.clearRect(0, 0, width, height);
      off.clearRect(0, 0, width, height);

      /* ==========================
         BOTTOM LAYER
      ========================== */

      // ctx.fillStyle = "rgba(255,0,0,0.8)";
      // ctx.fillRect(0, 0, width, height);

      const bParams = getImageParams(
        bottom,
        width,
        height,
        "right"
      );

      ctx.globalAlpha = 0.5;

      ctx.drawImage(
        bottom,
        bParams.dx,
        bParams.dy,
        bParams.dw,
        bParams.dh
      );

      ctx.globalAlpha = 1;

      /* ==========================
         MASK TRAIL
      ========================== */

      for (let i = 0; i < trail.length; i++) {
        const t = 1 - i / trail.length;

        const radius =
          HEAD_RADIUS * (0.25 + 0.75 * t);

        const alpha = Math.pow(t, 1.5);

        off.beginPath();

        off.arc(
          trail[i].x,
          trail[i].y,
          radius,
          0,
          Math.PI * 2
        );

        off.fillStyle = `rgba(255,255,255,${alpha})`;

        off.fill();
      }

      /* ==========================
         REVEAL LAYER
      ========================== */

      off.globalCompositeOperation = "source-in";

      // Full-screen reveal color
      off.fillStyle = "rgba(0,40,255,0.8)";
      off.fillRect(0, 0, width, height);

      // Top image
      const tParams = getImageParams(
        top,
        width,
        height,
        "right"
      );

      off.drawImage(
        top,
        tParams.dx,
        tParams.dy,
        tParams.dw,
        tParams.dh
      );
      

      off.globalCompositeOperation = "source-over";

      /* ==========================
         DRAW REVEAL
      ========================== */

      ctx.drawImage(offscreen, 0, 0);

      rafId = requestAnimationFrame(draw);
    };

    let loaded = 0;

    const onLoad = () => {
      loaded++;

      if (loaded === 2) {
        draw();
      }
    };

    bottom.onload = onLoad;
    top.onload = onLoad;

    return () => {
      hero.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);

      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="absolute inset-0 w-screen h-screen"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}