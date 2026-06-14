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
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Experience Timeline</h2>
            <p className="text-base md:text-lg text-[var(--text-secondary)]">Building AI systems, enterprise applications, and data-driven solutions across research and industry.</p>
        </div>
        <div className="flex flex-col w-screen justify-center items-center gap-32">
          <div className="card neo-exp-card sticky top-60 w-11/12 h-80 md:h-96 p-10 rounded-2xl overflow-hidden">
            <h3 className="text-xl font-bold mb-4">SDE</h3>
            <p className="text-lg text-[var(--text-secondary)]">Accenture • Oct 2025 - Present</p>
            <ul className="list-disc list-inside mt-4">
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Developing enterprise-grade solutions for large-scale SAP migration projects.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Built Agentic AI-powered automation tools to streamline migration workflows.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Designed and developed a full-stack XML testing platform for automated comparison and validation.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Implemented authentication, REST API integrations, database management, logging, and traceability systems.</li>
            </ul>
          </div>
          <div className="card neo-exp-card sticky top-90 w-11/12 h-80 md:h-96 p-10 rounded-2xl overflow-hidden">
            <h3 className="text-xl font-bold mb-2">
              Research Intern
            </h3>
            <p className="text-lg text-[var(--text-secondary)]">
              IIT Mandi • May 2024 - Jul 2024
            </p>

            <ul className="list-disc list-inside mt-4 space-y-2">
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Optimized machine learning models using Python and PyTorch on time-series medical datasets.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Performed feature engineering on data from 552 patient samples.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Developed predictive models for early heart disease detection and non-invasive glucose estimation.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Achieved 98.2% classification accuracy and 25.4 mg/dL RMSE.</li>
            </ul>
          </div>
          <div className="card neo-exp-card sticky top-110 w-11/12 h-80 md:h-96 p-10 rounded-2xl overflow-hidden">
            <h3 className="text-xl font-bold mb-2">
              Internship
            </h3>
            <p className="text-lg text-[var(--text-secondary)]">
              Brainwave Science, Boston USA • Jan 2024 - Jun 2024
            </p>

            <ul className="list-disc list-inside mt-4 space-y-2">
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Built an automated outreach system integrated with ChatGPT for personalized communication.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Scaled outreach operations to over 100 personalized emails per day.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Engaged with 300+ international clients through LinkedIn, email, and calls.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Worked with global stakeholders in security and finance sectors.</li>
            </ul>
          </div>
          <div className="card neo-exp-card sticky top-140 w-11/12 h-80 md:h-96 p-10 rounded-2xl overflow-hidden">
            <h3 className="text-xl font-bold mb-2">
              Fellowship @ iHub
            </h3>
            <p className="text-lg text-[var(--text-secondary)]">
              iHub & HCi Foundation, IIT Mandi • Nov 2022 - Feb 2023
            </p>

            <ul className="list-disc list-inside mt-4 space-y-2">
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Led the design and development of a Wall Climber Bot as Design Head.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Coordinated cross-functional team activities and project execution.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Programmed Arduino-based motion control systems.</li>
              <li className="text-[var(--text-secondary)] text-sm md:text-base">Successfully achieved a wall-climbing elevation of 60°.</li>
            </ul>
          </div>
          <div className="card neo-exp-card sticky top-140 w-11/12 h-20 p-10 rounded-2xl overflow-hidden opacity-0">
          </div>
        </div>
    </section>
  );  
}