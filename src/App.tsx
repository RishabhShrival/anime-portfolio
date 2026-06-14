
import { useGSAP } from "@gsap/react";
import useLenisGsap from "./lenis"
import Hero from "./Pages/Hero";
import Gsap from "gsap";
import About from "./Pages/About";
import Navbar from "./Pages/Navbar";
import Contact from "./Pages/Contact";
import Projects from "./Pages/Projects";
import Experience from "./Pages/Experience";
import { useEffect } from "react";

function App() {
  useLenisGsap()
  useGSAP(()=>{
    // Remove cover after 2 seconds
    const tl = Gsap.timeline();
    tl.to('#cover', { opacity: 0, duration: 2, ease: 'power2.out' });
  },[])

  useEffect(() => {
    const cursor = document.querySelector(".neo-cursor") as HTMLElement | null;
    let cursorFrame = 0;
    let cursorX = 0;
    let cursorY = 0;
    let scrollProgress = 0;
    let progressFrame = 0;

    const updateCursor = () => {
      if (cursor) {
        cursor.style.setProperty("--cursor-x", `${cursorX}px`);
        cursor.style.setProperty("--cursor-y", `${cursorY}px`);
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

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      if (!progressFrame) {
        progressFrame = window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--scroll-progress", `${scrollProgress}`);
          progressFrame = 0;
        });
      }
    };



    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
        if (cursorFrame) {
          window.cancelAnimationFrame(cursorFrame);
        }
        if (progressFrame) {
          window.cancelAnimationFrame(progressFrame);
        }
    };
  }, []);

  return (
    <>
    <div className="scroll-progress"/>
    <div className="neo-cursor"/>
    <div id="cover" className="fixed h-screen w-screen bg-black opacity-100 top-0 left-0 z-50 pointer-events-none overflow-x-hidden"/>
     <Navbar/>
     <Hero />
     <About/>
     <Experience/>
     <Projects/>
     <Contact/>
    </>
  );
}

export default App
