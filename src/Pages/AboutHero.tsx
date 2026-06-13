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
    const top1 = new Image();

    bottom.src = "/portfolio-anime-normal.png";
    top.src = "/portfolio-anime-aura.png";
    top1.src = "/portfolio-anime.png";

    /* -----------------------------
       Offscreen Canvases
    ----------------------------- */

    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");

    const revealCanvas = document.createElement("canvas");
    const revealCtx = revealCanvas.getContext("2d");

    if (!maskCtx || !revealCtx) return;

    const getImageParams = (
      img: HTMLImageElement,
      cw: number,
      ch: number,
      align: "left" | "center" | "right" = "center",
      align2: "top" | "center" | "bottom" = "center"
    ) => {
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      const scale = Math.min(cw / iw, ch / ih);

      const dw = iw * scale;
      const dh = ih * scale;

      let dx = (cw - dw) / 2;
      let dy = (ch - dh) / 2;

      if (align === "right") dx = cw - dw;
      if (align === "left") dx = 0;
      if (align2 === "top") dy = 0;
      if (align2 === "bottom") dy = ch - dh;


      return { dx, dy, dw, dh };
    };

    const resize = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;

      maskCanvas.width = canvas.width;
      maskCanvas.height = canvas.height;

      revealCanvas.width = canvas.width;
      revealCanvas.height = canvas.height;
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

      /* -----------------------------
         Smooth Cursor
      ----------------------------- */

      const s = smoothRef.current;
      const m = mouseRef.current;

      s.x += (m.x - s.x) * 0.13;
      s.y += (m.y - s.y) * 0.13;

      trailRef.current.unshift({
        x: s.x,
        y: s.y,
      });

      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.length = TRAIL_LENGTH;
      }

      const trail = trailRef.current;

      /* -----------------------------
         Clear
      ----------------------------- */

      ctx.clearRect(0, 0, width, height);
      maskCtx.clearRect(0, 0, width, height);
      revealCtx.clearRect(0, 0, width, height);
      revealCtx.fillStyle = "rgba(256,256,256,0.2";
      revealCtx.fillRect(0, 0, width, height);

      /* -----------------------------
         Bottom Layer
      ----------------------------- */

      const bottomParams = getImageParams(
        bottom,
        width,
        height,
        "right",
        "top"
      );

      ctx.globalAlpha = 0.8;


      ctx.drawImage(
        bottom,
        bottomParams.dx,
        bottomParams.dy,
        bottomParams.dw,
        bottomParams.dh
      );

      // ctx.drawImage(
      //   bottom,
      //   bottomParams.dx - 400,
      //   bottomParams.dy,
      //   bottomParams.dw,
      //   bottomParams.dh
      // );

      ctx.globalAlpha = 1;

      /* -----------------------------
         Draw Mask Trail
      ----------------------------- */

      for (let i = 0; i < trail.length; i++) {
        const t = 1 - i / trail.length;

        const radius =
          HEAD_RADIUS * (0.25 + 0.75 * t);

        const alpha = Math.pow(t, 1.5);

        maskCtx.beginPath();

        maskCtx.arc(
          trail[i].x,
          trail[i].y,
          radius,
          0,
          Math.PI * 2
        );

        maskCtx.fillStyle = `rgba(255,255,255,${alpha})`;

        maskCtx.fill();
      }

      /* -----------------------------
         Draw Reveal Images
      ----------------------------- */

      const topParams = getImageParams(
        top,
        width,
        height,
        "right",
        "top"
      );

      // const top1Params = getImageParams(
      //   top1,
      //   width,
      //   height,
      //   "right"
      // );

      revealCtx.drawImage(
        top,
        topParams.dx,
        topParams.dy,
        topParams.dw,
        topParams.dh
      );

      // revealCtx.drawImage(
      //   top1,
      //   top1Params.dx - 400,
      //   top1Params.dy,
      //   top1Params.dw,
      //   top1Params.dh
      // );

      /* -----------------------------
         Apply Mask
      ----------------------------- */

      revealCtx.globalCompositeOperation =
        "destination-in";

      revealCtx.drawImage(
        maskCanvas,
        0,
        0
      );

      revealCtx.globalCompositeOperation =
        "source-over";

      /* -----------------------------
         Draw Final Reveal
      ----------------------------- */

      ctx.drawImage(
        revealCanvas,
        0,
        0
      );

      rafId = requestAnimationFrame(draw);
    };

    let loaded = 0;

    const onLoad = () => {
      loaded++;

      if (loaded === 3) {
        draw();
      }
    };

    bottom.onload = onLoad;
    top.onload = onLoad;
    top1.onload = onLoad;

    return () => {
      hero.removeEventListener(
        "mousemove",
        onMove
      );

      window.removeEventListener(
        "resize",
        resize
      );

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
        className="absolute object-bottom"
      />
    </div>
  );
}