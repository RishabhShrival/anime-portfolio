import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { useState, useEffect, startTransition } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export default function Experience() {
  // useGSAP(()=>{
  //   document.querySelectorAll(".card").forEach((el, index) => {
  //   gsap.fromTo(
  //     el,
  //     { scale: 1.2, opacity: 0.5},
  //     { stagger: 0.2, scale: 1, opacity: 1, ease: "power2.in",
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "top bottom",
  //         end: "top 50%",
  //         scrub: 1.5
  //       },
  //      },
  //   );
  //   gsap.fromTo(el, 
  //     { boxShadow: "0 0 0px rgba(255, 255, 255, 0.1)"},
  //     { boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",height: "30", ease: "power2.in",
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "top 50%",
  //         end: "top 30%",
  //         scrub: 1.5,
  //         markers: true
  //       }
  //     }
  //   );
  // })
  // }, []);

  return (
    <section id='experience' className="relative w-screen min-h-screen pb-10 text-white">
        {/* <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-300/70 via-violet-300/40 to-transparent shadow-[0_0_18px_rgba(56,189,248,0.45)] -translate-x-1/2" /> */}
        <div className="sticky h-1/5 w-screen top-20 py-10 text-center z-20">
            <p className="jp-label">経験 • Experience</p>
            <h2 className="text-4xl font-bold mb-4">Experience Timeline</h2>
            <p className="text-lg text-[var(--text-secondary)]">Crafting systems, shipping products, and scaling ideas into real impact.</p>
        </div>
        <div className="flex flex-col w-screen justify-center items-center gap-32">
          <div className="card neo-exp-card sticky top-40 md:top-60 w-11/12 h-96 p-10 rounded-2xl overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">Software Developer Intern</h3>
            <p className="text-lg text-[var(--text-secondary)]">Tech Company | 2025</p>
            <ul className="list-disc list-inside mt-4">
              <li>Built performant internal dashboards for real-time operations.</li>
              <li>Collaborated with product and design on developer tooling.</li>
              <li>Improved API performance and reduced data latency.</li>
              <li>Documented architecture for maintainable handoffs.</li>
            </ul>
          </div>
          <div className="card neo-exp-card sticky top-60 md:top-80 w-11/12 h-96 p-10 rounded-2xl overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">AI/ML Project Engineer</h3>
            <p className="text-lg text-[var(--text-secondary)]">Research Lab | 2024</p>
            <ul className="list-disc list-inside mt-4">
              <li>Designed model pipelines for practical deployment scenarios.</li>
              <li>Automated data-cleaning workflows and feature extraction.</li>
              <li>Built experiment dashboards for transparent model tracking.</li>
            </ul>
          </div>
          <div className="card neo-exp-card sticky top-80 md:top-100 w-11/12 h-96 p-10 rounded-2xl overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">Full Stack Freelancer</h3>
            <p className="text-lg text-[var(--text-secondary)]">Independent | 2023</p>
            <ul className="list-disc list-inside mt-4">
              <li>Delivered modern web products from prototype to production.</li>
              <li>Integrated backend APIs, auth, and analytics.</li>
              <li>Maintained clean UI and smooth micro-interactions.</li>
            </ul>
          </div>
          <div className="card neo-exp-card sticky top-100 md:top-120 w-11/12 h-96 p-10 rounded-2xl overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">Data Science Associate</h3>
            <p className="text-lg text-[var(--text-secondary)]">Consulting Team | 2022</p>
            <ul className="list-disc list-inside mt-4">
              <li>Analyzed datasets to derive strategic business insights.</li>
              <li>Created reporting pipelines for decision-makers.</li>
              <li>Presented findings through clear narratives and visuals.</li>
            </ul>
          </div>
          <div className="card neo-exp-card sticky top-120 md:top-140 w-11/12 h-96 p-10 rounded-2xl overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">Open Source Contributor</h3>
            <p className="text-lg text-[var(--text-secondary)]">Global Community | Ongoing</p>
            <ul className="list-disc list-inside mt-4">
              <li>Contributed fixes and enhancements to community projects.</li>
              <li>Reviewed code for quality and long-term maintainability.</li>
              <li>Collaborated across asynchronous teams worldwide.</li>
            </ul>
          </div>
          <div className="card neo-exp-card sticky top-140 md:top-140 w-11/12 h-20 p-10 rounded-2xl overflow-hidden opacity-0">
          </div>
        </div>
    </section>
  );  
}