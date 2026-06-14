import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import AboutHero from "./AboutHero";
import { AboutSubtitles } from "../constants";

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

  return (
    <section id="about" className="relative w-screen h-screen px-10 md:px-20 pt-20 flex gap-2 md:gap-10 overflow-hidden" onClick={animateText}>
      <div className="w-auto md:w-3/5 py-8 z-10 pointer-events-none absolute bottom-1/12 md:relative md:bottom-auto left-auto">
        <p className="jp-label mb-3">自己紹介 • Self Introduction</p>
        <p id="About-title" className="titleText">Hi, I am <span className="grad-text">Rishabh</span></p>

        <div className="text-white/90 text-sm md:text-lg min-h-[300px] neo-card rounded-3xl p-8">
          {AboutSubtitles.map((subtitle, i) => (
            <div
              key={i}
              className={`about-subtitle ${i === 0 ? "block" : "none"}`}
            >
              <span className="block text-2xl font-bold mb-2">{subtitle.title}</span>
              {subtitle.text}
            </div>
          ))}
        </div>

      </div>
      <div className="opacity-70 absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-[var(--text-secondary)] cursor-default select-none z-10">
        click to view more
      </div>
      <div className="z-0">
        <AboutHero/>
      </div>
    </section>
  );
}
