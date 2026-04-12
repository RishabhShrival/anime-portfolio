import { navLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useState, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);


export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Welcome");

  const titleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
        }
    );

    return () => {};
    }, [activeSection]);

  useGSAP(() => {

    // navbar background animation
    gsap.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(4px)",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "nav",
          start: "bottom top",
        },
      }
    );

    // Use scroll-based detection instead of individual section triggers
    // This approach calculates which section should be active based on scroll progress
    
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Get all sections
        const heroEl = document.getElementById('Hero');
        const aboutEl = document.getElementById('about');
        const experienceEl = document.getElementById('experience');
        const projectsEl = document.getElementById('projects');
        const contactsEl = document.getElementById('contacts');
        
        if (!heroEl || !aboutEl || !experienceEl || !projectsEl || !contactsEl) return;
        
        // Calculate section positions
        // const heroRect = heroEl.getBoundingClientRect();
        const aboutRect = aboutEl.getBoundingClientRect();
        const experienceRect = experienceEl.getBoundingClientRect();
        const projectsRect = projectsEl.getBoundingClientRect();
        const contactsRect = contactsEl.getBoundingClientRect();
        
        // Determine active section with proper first/last page handling
        console.log('ScrollY:', scrollY);
        console.log(contactsRect.top, windowHeight/2);
        // First page (Hero) - active when at top or when hero is most visible
        if (scrollY < windowHeight * 0.2) {
          if (activeSection !== 'Home') {
            console.log('Active: Home');
            setActiveSection('Home');
          }
        } 
        // Last page (Contact) - active when near bottom or when contact section is visible
        else if (contactsRect.top <= document.documentElement.clientHeight/10) {
          if (activeSection !== 'Contact') {
            console.log('Active: Contact');
            setActiveSection('Contact');
          }
          console.log('Active: Contact');
        }
        // About section - special handling for pinned animation
        else if (aboutRect.top <= windowHeight/2 && scrollY < (aboutEl.offsetTop + aboutEl.offsetHeight + windowHeight)) {
          if (activeSection !== 'About') {
            console.log('Active: About');
            setActiveSection('About');
          }
        } 
        // Experience section
        else if (experienceRect.top <= windowHeight/2 && experienceRect.bottom >= windowHeight/2) {
          if (activeSection !== 'Experience') {
            console.log('Active: Experience');
            setActiveSection('Experience');
          }
        } 
        // Projects section
        else if (projectsRect.top <= windowHeight/2 && projectsRect.bottom >= windowHeight/2) {
          if (activeSection !== 'Projects') {
            console.log('Active: Projects');
            setActiveSection('Projects');
          }
        }
      }
    });
  }, []);

  return (
    <nav>
      <div>
        {/* Dynamic title */}
        <p ref={titleRef} className="SectionTitle">{activeSection}</p>

        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
                <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                    e.preventDefault();
                    gsap.to(window, {
                        scrollTo: `#${link.id}`,
                        duration: 1,
                        ease: "power2.out",
                    });
                    }}
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
