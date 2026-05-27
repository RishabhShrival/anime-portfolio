import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { SplitText } from "gsap/all";
import { listOfProjects } from "../constants";

gsap.registerPlugin(SplitText);

export default function RotatingCarousel() {
  const radius = 250;

  const rotationTween = useRef<gsap.core.Tween | null>(null);
  const titleTimeline3 = useRef<gsap.core.Timeline | null>(null);
  const selectedProjectIndex = useRef(0);
  const [topicTitle, setTopicTitle] = useState("Projects");
  const activeProjectIndex = selectedProjectIndex.current >= 0 ? selectedProjectIndex.current : 0;




  /* ---------------- CIRCLE SETUP ---------------- */
  useGSAP(() => {
    const items = gsap.utils.toArray(".orbit-item") as HTMLElement[];
    const total = items.length;

    items.forEach((item, i) => {
      const angle = (360 / total) * i - 90;
      gsap.set(item, {
        x: radius * Math.cos((angle * Math.PI) / 180),
        y: radius * Math.sin((angle * Math.PI) / 180),
        rotate: (360 / total) * i,
      });

    //   // Magnetic hover
    //   item.addEventListener("mousemove", (e) => magneticMove(e, item));
    //   item.addEventListener("mouseleave", () => magneticLeave(item));
    });

    rotationTween.current = gsap.to(".circle-container", {
      rotation: 360,
      duration: 20,
      ease: "linear",
      repeat: -1,
    });
  }, []);



  /*............Detail Of Project Animation...........*/
  const showProjectsDetail = () => {
    if(titleTimeline3.current?.progress()==1){
        titleTimeline3.current?.reverse();
        return;
    }
    titleTimeline3.current?.kill();
    titleTimeline3.current = gsap.timeline();
        // Exit animation (old chars)
    titleTimeline3.current.to(
      ".topic",
      {
        y: -window.innerHeight + 300,
        scale: 1.2,
        duration: 0.75,
        stagger: 0.04,
        ease: "power3.inOut",
      }
    );
    titleTimeline3.current?.to(
      ".project-detail-l",
      {
      x: 0,
      duration: 0.75,
      },
      0
    );
    titleTimeline3.current?.to(
      ".project-detail-r",
      {
      x: 0,
      duration: 0.75,
      },
      0
    );
  }

  /* ---------------- EVENTS ---------------- */
  const showProject = (index: number) => {
    if(selectedProjectIndex.current === index){
        reset();
    }
    selectedProjectIndex.current = index;
    rotationTween.current?.pause();
    showProjectsDetail();

  };

  const reset = () => {
    rotationTween.current?.resume();
    titleTimeline3.current?.reverse();
    setTopicTitle("Projects");
    selectedProjectIndex.current = -1;
  };

  useGSAP(() => {
    const onDocumentClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".orbit-item") && !target.closest(".project-detail-l") && !target.closest(".project-detail-r")) {
        reset();
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  /* ---------------- RENDER ---------------- */
  const topPannelProject = (IndexOfProject: number, projectNo: number) => {
    const project = listOfProjects[IndexOfProject].projects[projectNo];
    window.open(project.link, "_blank");
  }


  /* ---------------- label ---------------- */
const labelPop = (index: number) => {
  const label = document.querySelectorAll(".orbit-item")[index]
    .querySelector(".label") as HTMLElement;
  label.style.opacity = "1";
  label.style.transform = "translateY(-40px)";
  label.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
};

const labelHide = (index: number) => {
  const label = document.querySelectorAll(".orbit-item")[index]
    .querySelector(".label") as HTMLElement;

  label.style.opacity = "0";
  label.style.transform = "translateY(40px)";
  label.style.transition = "transform 0.5s ease-in-out,  opacity 0.5s ease-in-out";
};



  return (
    <div className="w-full h-full relative">
      <div className="project-detail top-1/5 w-full absolute p-8 gap-10 flex justify-between z-10 pointer-events-none">
        <div className="project-detail-l flex flex-col justify-between m-0 p-10 transform -translate-x-full">
          <div className="text-2xl font-bold m-0 mb-4 p-10 rounded-lg pointer-events-auto" onClick={() => topPannelProject(activeProjectIndex, 0)}>
            <h3>{listOfProjects[activeProjectIndex].projects[0].title}</h3>
            <p className="text-base text-[var(--text-secondary)]">{listOfProjects[activeProjectIndex].projects[0].details}</p>
          </div>
          <div className="text-2xl font-bold m-0 mb-4 p-10 rounded-lg pointer-events-auto" onClick={() => topPannelProject(activeProjectIndex, 1)}>
            <h3>{listOfProjects[activeProjectIndex].projects[1].title}</h3>
            <p className="text-base text-[var(--text-secondary)]">{listOfProjects[activeProjectIndex].projects[1].details}</p>
          </div>
        </div>
        <div className="project-detail-r flex flex-col justify-between m-0 p-10 transform translate-x-full">
          <div className="text-2xl font-bold m-0 mb-4 p-10 rounded-lg pointer-events-auto" onClick={() => topPannelProject(activeProjectIndex, 2)}>
            <h3>{listOfProjects[activeProjectIndex].projects[2].title}</h3>
            <p className="text-base text-[var(--text-secondary)]">{listOfProjects[activeProjectIndex].projects[2].details}</p>
          </div>
          <div className="text-2xl font-bold m-0 mb-4 p-10 rounded-lg pointer-events-auto" onClick={() => topPannelProject(activeProjectIndex, 3)}>
            <h3>{listOfProjects[activeProjectIndex].projects[3].title}</h3>
            <p className="text-base text-[var(--text-secondary)]">{listOfProjects[activeProjectIndex].projects[3].details}</p>
          </div>
        </div>
      </div>
      
      {/* CAROUSEL */}
      <div className="absolute bottom-0 w-screen h-1/2 flex justify-center">
          <h2 className="topic absolute z-10 text-2xl md:text-5xl font-extrabold text-white drop-shadow-lg pointer-events-none bottom-10">
                {topicTitle}
          </h2>
        <div className="circle-container aspect-square w-screen md:h-screen md:w-auto rounded-full flex items-center justify-center">

          {listOfProjects.map((project, index) => (
            <div
              key={index}
              className="orbit-item absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer"
              style={{ transform: `rotate(${72 * index}deg)` }}
            >
              <div className="label absolute left-1/2 transform -translate-x-1/2 bg-slate-950/80 pb-10 mb-2 px-3 rounded-tl-md opacity-0 -z-10 pointer-events-none border border-white/10">
                <p className="text-sm text-white whitespace-nowrap">
                  {project.title}
                </p>
              </div>

              <img src={project.icon} alt={project.title} className="hover:scale-110 hover:brightness-110 bg-white/95 transition-transform duration-300 w-full h-full object-contain rounded-full p-2" 
              onClick={() => showProject(index)}
              onMouseEnter={() => {setTopicTitle(project.title); selectedProjectIndex.current=index; labelPop(index);}}
              onMouseLeave={() => {setTopicTitle("Projects"); selectedProjectIndex.current=-1; labelHide(index);}}
              />
              
            </div>
          ))}

        </div>
        
      </div>
    </div>
  );
}
