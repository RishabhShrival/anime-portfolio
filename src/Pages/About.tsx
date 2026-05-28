import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function About() {
  const [index, setIndex] = useState(0);
  const splitTextsRef = useRef<SplitText[]>([]);
  const subtitlesRef = useRef<HTMLElement[]>([]);

  useGSAP(() => {
    // Title animation
    const title = new SplitText("#About-title", { type: "chars" });

    gsap.from(title.chars, {
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
      },
      opacity: 0,
      y: -50,
      stagger: 0.05,
      duration: 0.5,
    });

    // Split subtitles
    subtitlesRef.current = Array.from(
      document.querySelectorAll(".about-subtitle")
    ) as HTMLElement[];

    splitTextsRef.current = subtitlesRef.current.map(
      (el) => new SplitText(el, { type: "lines" })
    );

    // Initial state
    subtitlesRef.current.forEach((el, i) => {
      gsap.set(el, { display: i === 0 ? "block" : "none" });
    });
  }, []);

  const animateText = () => {
    const len = splitTextsRef.current.length;
    if (len === 0) return;

    const current = index % len;
    const next = (current + 1) % len;

    const currentSplit = splitTextsRef.current[current];
    const nextSplit = splitTextsRef.current[next];

    gsap.timeline()
      .to(currentSplit.lines, {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.3,
        onComplete: () => {
          gsap.set(subtitlesRef.current[current], { display: "none" });
          gsap.set(subtitlesRef.current[next], { display: "block" });
        }
      })
      .fromTo(
        nextSplit.lines,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.3,
        }
      );

    setIndex(next);
  };

  useEffect(() => {
      const cursorCover = document.querySelector(".cursor-cover") as HTMLElement | null;
      const figure = document.querySelector(".figure") as HTMLElement | null;
      let cursorFrame = 0;
      let cursorX = 0;
      let cursorY = 0;
      let figureRadius = 0;

  
      const updateCursor = () => {
        if (cursorCover) {
          cursorCover.style.setProperty("--cursor-x", `${cursorX}px`);
          cursorCover.style.setProperty("--cursor-y", `${cursorY}px`);
        }
        cursorFrame = 0;
      };
  
      
  
      const onMouseMove = (event: MouseEvent) => {
        cursorX = event.clientX;
        cursorY = event.clientY;
  
        if (!cursorFrame) {
          cursorFrame = window.requestAnimationFrame(updateCursor);
        }
      };
  
  
      const syncFigureMask = (event: MouseEvent) => {
        if (!figure) return;
  
        const rect = figure.getBoundingClientRect();
        const relativeX = event.clientX - rect.left;
        const relativeY = event.clientY - rect.top;
  
        figure.style.setProperty("--figure-mask-x", `${relativeX - figureRadius/2}px`);
        figure.style.setProperty("--figure-mask-y", `${relativeY - figureRadius/2}px`);
      };
  
      const activateFigureMask = (event: MouseEvent) => {
        if (!figure || !cursorCover) return;
        figureRadius = 400;
        syncFigureMask(event);
        figure.classList.add("figure-mask-active");
        cursorCover.style.setProperty("background", "rgba(168, 85, 247, 1)");
        cursorCover.style.setProperty("width", "500px");
        cursorCover.style.setProperty("height", "500px");
        cursorCover.style.setProperty("transition", "background 0.3s ease, width 0.3s ease, height 0.3s ease");
        cursorCover.style.setProperty("z-index", "10");
        figure.style.setProperty("--figure-mask-radius", `${figureRadius}px`);
        figure.style.setProperty("--figure-mask-feather", "0px");
      };
  
      const deactivateFigureMask = (event: MouseEvent) => {
        if (!figure || !cursorCover) return;
        figureRadius = 0;
        syncFigureMask(event);
        figure.classList.remove("figure-mask-active");
        cursorCover.style.setProperty("width", "18px");
        cursorCover.style.setProperty("height", "18px");
        cursorCover.style.setProperty("background", "rgba(168, 85, 247, 0)");
        cursorCover.style.setProperty("transition", "background 0.3s ease , width 0.3s ease, height 0.3s ease");
        cursorCover.style.setProperty("z-index", "10");
        figure.style.setProperty("--figure-mask-radius", `${figureRadius}px`);
        figure.style.setProperty("--figure-mask-feather", "0px");
      };
  
      figure?.addEventListener("mouseenter", activateFigureMask as EventListener);
      figure?.addEventListener("mousemove", syncFigureMask as EventListener);
      figure?.addEventListener("mouseleave", deactivateFigureMask);
  
      window.addEventListener("mousemove", onMouseMove);
  
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        figure?.removeEventListener("mouseenter", activateFigureMask as EventListener);
        figure?.removeEventListener("mousemove", syncFigureMask as EventListener);
        figure?.removeEventListener("mouseleave", deactivateFigureMask as EventListener);
          if (cursorFrame) {
            window.cancelAnimationFrame(cursorFrame);
          }
      };
    }, []);
  

  return (
    <section id="about" className="relative w-screen h-screen px-20 pt-20 flex gap-10 overflow-hidden" onClick={animateText}>
      <div className="w-3/5 py-8">
        <p className="jp-label mb-3">自己紹介 • Self Introduction</p>
        <p id="About-title" className="titleText">Hi, I am <span className="grad-text">Rishabh</span></p>

        <div className="text-white/90 text-lg min-h-[220px] neo-card rounded-3xl p-8">
          <div className="about-subtitle">
            I am a tech-driven person who loves building, experimenting, and figuring out how things work. 
            Pretty chill by nature, but I get deeply focused when solving problems or coding. 
            I am into software, new technologies, and hands-on projects that challenge me. 
            In my free time, you will usually find me coding, learning something new, or tinkering with ideas.
          </div>

          <div className="about-subtitle">
            <span className="block text-2xl font-bold mb-2">School</span>
            Schooling in Jawahar Navodaya Vidhyalaya Khandwa (Madhya Pradesh) 
            where I developed a strong foundation in science and mathematics 
            and Secured 93.2% in 10th and 93% in 12th board exams.
          </div>

          <div className="about-subtitle">
            <span className="block text-2xl font-bold mb-2">College</span>
            Completed my B.Tech in Data Science Engineering from the prestigious Indian Institute of Technology, Mandi.
            Here, I honed my skills in data analysis, machine learning,
             and software development while engaging in various projects and research.
             Graduated with a CGPA of 8.03 out of 10.
          </div>

          <div className="about-subtitle">
            <span className="block text-2xl font-bold mb-2">Semester Exchange</span>
            Had the incredible opportunity to be a semester exchange student at Kyushu University in Japan. 
            This experience broadened my horizons, exposing me to new cultures and academic perspectives. 
            It was a transformative period that enriched both my personal and professional growth. 
            Secured a GPA of 9.65/10 during my exchange semester.          
          </div>
        </div>

      </div>
      <div className="opacity-70 absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-[var(--text-secondary)] cursor-default select-none">
        click to view more
      </div>

      <div className="cursor-cover"/>
      <div className="flex-1/5 items-center justify-center">
        <div className="neo-card rounded-3xl p-3">
          <img src="/portfolio-anime.png" alt="anime developer" className="figure h-full object-contain" />
        </div>
      </div>
    </section>
  );
}
