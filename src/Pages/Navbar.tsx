import { navLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);


export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");

  useGSAP(() => {

    // navbar background animation
    gsap.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "rgba(10, 10, 20, 0.4)",
        backdropFilter: "blur(4px)",
        borderRadius: "999px",
        border: "2px solid rgba(255,255,255,0.08)",
        boxShadow: "0 2px 8px rgba(5, 11, 28, 0.55)",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "nav",
          start: "bottom top",
          end: "bottom 50%",
          scrub: 1.5,
        },
      }
    );
}, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      const offset = window.scrollY + 140;
      let current: HTMLElement | null = null;
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        if (offset + 300 >= sections[sections.length - 1].offsetTop) {
          current = sections[sections.length - 1];
          break;
        }
        if (sections[i].offsetTop <= offset) {
          current = sections[i];
          break;
        }
      }
      if (!current) return;
      const matched = navLinks.find((link) => link.id === current.id);
      if (matched) setActiveSection(matched.title);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="m-1">
      <div>
        {/* Dynamic title */}
        <p className="SectionTitle">{activeSection}</p>

        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
                <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                    e.preventDefault();
                setActiveSection(link.title);
                    gsap.to(window, {
                        scrollTo: `#${link.id}`,
                        duration: 2,
                        ease: "power2.out",
                    });
                    }}
                aria-current={activeSection === link.title ? "page" : undefined}
                className={activeSection === link.title ? "text-white" : "text-gray-400"}
                >
                    {link.title}
                </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
