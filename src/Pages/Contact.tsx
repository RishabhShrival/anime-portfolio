import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


export default function Contact() {
  gsap.registerPlugin(SplitText, ScrollTrigger);

  useGSAP(() => {
    const split = new SplitText(".contact-text", { type: "chars" });
    const chars = split.chars;

    gsap.set(chars, {
      display: "inline-block",
      opacity: 0,
      x: -120,
      filter: "blur(10px)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".title",
        start: "top 95%",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    // ✨ Letter reveal (premium feel)
    tl.to(chars, {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.04,
      ease: "power3.out",
    });

    // 🌫 Glow intensifies slightly
    tl.to(
      ".contact-glow",
      {
        opacity: 0.35,
        scale: 1.05,
        ease: "power2.out",
      },
      0
    );


    // ✨ Subtle glow pulse loop
    gsap.to(".contact-glow", {
      scale: 1.1,
      opacity: 0.4,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);


  return (
    <section id="contacts" className="w-screen h-1/3 bg-gray-800 text-white">
    <div className="title relative w-screen overflow-hidden p-10 flex flex-row justify-around h-full">    
      <div className="">
        {/* Glow layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-9xl font-bold contact-glow opacity-20 blur-2xl">
            Let’s Connect
          </h1>
        </div>

        {/* Main text */}
        <div className="text-9xl font-bold contact-text relative z-10">
          Let’s Connect
        </div>
      </div>

      {/* Icons */}
      <div className="flex flex-col items-start justify-center gap-8">
        <button className="flex flex-row items-center justify-center gap-5 bg-none border-none hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => {
          window.open('https://www.linkedin.com/in/rishabh-shrival-412490225/', '_blank');
        }}>
          <FontAwesomeIcon icon={faLinkedin} className="scale-200"/>
          <h3 className="text-3xl font-semibold">LinkedIn</h3>
        </button>
        <button className="flex flex-row items-center justify-center gap-5 hover:scale-105 transition-transform duration-300 bg-none border-none cursor-pointer" onClick={() => {
          window.open('https://github.com/RishabhShrival', '_blank');
        }}>
          <FontAwesomeIcon icon={faGithub} className="scale-200"/>
          <h3 className="text-3xl font-semibold">GitHub</h3>
        </button>
        <button className="flex flex-row items-center justify-center gap-5 hover:scale-105 transition-transform duration-300 bg-none border-none cursor-pointer" onClick={() => {
          window.open('mailto:rishabhshrival746@gmail.com', '_blank');
        }}>
          <FontAwesomeIcon icon={faEnvelope} className="scale-180"/>
          <h3 className="text-3xl font-semibold">Email</h3>
        </button>
      </div>
    </div>
  </section>
  );
}
