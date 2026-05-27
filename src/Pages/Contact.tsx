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
    <section id="contacts" className="w-screen h-1/3 text-white relative overflow-hidden">
    <div className="title relative w-screen overflow-hidden p-10 flex flex-row justify-around h-full">    
      <div className="z-0">
        {/* Main text */}
        <div className="text-9xl font-bold contact-text opacity-95 relative">
          Let's Connect
        </div>
        {/* Glow layer */}
        <div className="absolute inset-10 pl-30 z-0 pointer-events-none">
          <h2 className="text-9xl font-bold contact-glow opacity-20 blur-2xl">
            Let's Connect
          </h2>
        </div>
        <p className="jp-label mt-4 relative z-10">未来を作ろう • Let's build the future.</p>
      </div>

      {/* Icons */}
      <div className="flex flex-col items-start justify-center gap-8">
        <button className="social-pill flex flex-row items-center justify-center gap-5 border-none hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => {
          window.open('https://www.linkedin.com/in/rishabh-shrival-412490225/', '_blank');
        }}>
          <FontAwesomeIcon icon={faLinkedin} className="scale-200"/>
          <h3 className="text-3xl font-semibold">LinkedIn</h3>
        </button>
        <button className="social-pill flex flex-row items-center justify-center gap-5 hover:scale-105 transition-transform duration-300 border-none cursor-pointer" onClick={() => {
          window.open('https://github.com/RishabhShrival', '_blank');
        }}>
          <FontAwesomeIcon icon={faGithub} className="scale-200"/>
          <h3 className="text-3xl font-semibold">GitHub</h3>
        </button>
        <button className="social-pill flex flex-row items-center justify-center gap-5 hover:scale-105 transition-transform duration-300 border-none cursor-pointer" onClick={() => {
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
