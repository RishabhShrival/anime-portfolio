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
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
  gsap.to(".mobile-menu", {
    opacity: menuOpen ? 1 : 0,
    x: menuOpen ? 0 : 20,
    duration: 0.35,
    ease: "power3.out",
    pointerEvents: menuOpen ? "auto" : "none",
  });
}, [menuOpen]);

  return (
  <nav className="navbar">
    <div className="nav-container !flex-row">
      <p className="SectionTitle">{activeSection}</p>

      {/* Desktop Menu */}
      <ul className="desktop-menu">
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
              aria-current={
                activeSection === link.title ? "page" : undefined
              }
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault();

              setMenuOpen(false);
              setActiveSection(link.title);

              gsap.to(window, {
                scrollTo: `#${link.id}`,
                duration: 1.5,
                ease: "power2.out",
              });
            }}
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  </nav>
);
}