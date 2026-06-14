import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { SplitText } from "gsap/all";
import { listOfProjects } from "../constants";

gsap.registerPlugin(SplitText);

export default function RotatingCarousel() {

  const rotationTween = useRef<gsap.core.Tween | null>(null);
  const titleTimeline3 = useRef<gsap.core.Timeline | null>(null);
  const selectedProjectIndex = useRef(0);
  const [topicTitle, setTopicTitle] = useState("Projects");
  const activeProjectIndex = selectedProjectIndex.current >= 0 ? selectedProjectIndex.current : 0;
  let radius = window.innerWidth < 768 ? 150 : 250;




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
      ".BlurRef",
      {
        zIndex: 10,
        backdropFilter: "blur(8px)",
        opacity: 1,
        duration: 0.5
      }
    );
    titleTimeline3.current.to(
      ".topic",
      {
        y: (window.innerWidth < 768)? -window.innerHeight + window.innerHeight/4 : -window.innerHeight*2/3,
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
      1
    );
    titleTimeline3.current?.to(
      ".project-detail-r",
      {
      x: 0,
      duration: 0.75,
      },
      1
    );
  }

  /* ---------------- EVENTS ---------------- */
  const showProject = (index: number) => {
    if(selectedProjectIndex.current === index){
        reset();
    }
    selectedProjectIndex.current = index;
    setTopicTitle(listOfProjects[index].title);
    // rotationTween.current?.pause();
    showProjectsDetail();

  };

  const reset = () => {
    // rotationTween.current?.resume();
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
    <div className="w-screen h-screen relative">
      <div className="project-detail bottom-0 w-screen absolute p-2 md:p-8 gap-2 md:gap-10 flex justify-between z-20 pointer-events-none">
        <div className="project-detail-l flex-1 flex flex-col justify-between m-0 p-4 md:p-8 transform -translate-x-full">
          <div className="h-[180px] md:h-[260px] w-full text-2xl font-bold flex-1 m-0 mb-4 overflow-hidden p-4 md:p-8 rounded-lg pointer-events-auto" onClick={() => topPannelProject(activeProjectIndex, 0)}>
            <h3 className="text-lg md:text-xl">{listOfProjects[activeProjectIndex].projects[0].title}</h3>
            <p className="mt-2 text-sm md:text-base text-[var(--text-secondary)] line-clamp-4 md:line-clamp-6">{listOfProjects[activeProjectIndex].projects[0].details}</p>
          </div>
          <div className="h-[180px] md:h-[260px] w-full text-2xl font-bold flex-1 m-0 mb-4 overflow-hidden p-4 md:p-8 rounded-lg pointer-events-auto" onClick={() => topPannelProject(activeProjectIndex, 1)}>
            <h3 className="text-lg md:text-xl">{listOfProjects[activeProjectIndex].projects[1].title}</h3>
            <p className="mt-2 text-sm md:text-base text-[var(--text-secondary)] line-clamp-4 md:line-clamp-6">{listOfProjects[activeProjectIndex].projects[1].details}</p>
          </div>
        </div>
        <div className="project-detail-r flex-1 flex flex-col justify-between m-0 p-4 md:p-8 transform translate-x-full">
          <div className="h-[180px] md:h-[260px] w-full text-2xl font-bold flex-1 m-0 mb-4 overflow-hidden p-4 md:p-8 rounded-lg pointer-events-auto" onClick={() => topPannelProject(activeProjectIndex, 2)}>
            <h3 className="text-lg md:text-xl">{listOfProjects[activeProjectIndex].projects[2].title}</h3>
            <p className="mt-2 text-sm md:text-base text-[var(--text-secondary)] line-clamp-4 md:line-clamp-6">{listOfProjects[activeProjectIndex].projects[2].details}</p>
          </div>
          <div className="h-[180px] md:h-[260px] w-full text-2xl font-bold flex-1 m-0 mb-4 overflow-hidden p-4 md:p-8 rounded-lg pointer-events-auto" onClick={() => topPannelProject(activeProjectIndex, 3)}>
            <h3 className="text-lg md:text-xl">{listOfProjects[activeProjectIndex].projects[3].title}</h3>
            <p className="mt-2 text-sm md:text-base text-[var(--text-secondary)] line-clamp-4 md:line-clamp-6">{listOfProjects[activeProjectIndex].projects[3].details}</p>
          </div>
        </div>
      </div>
      
      {/* CAROUSEL */}
      <div className="absolute OriginCenter top-full left-1/2 flex justify-center">
        <div className="BlurRef absolute bottom-1/2 w-screen h-screen bg-[rgba(0,0,0,0.4)] opacity-0 pointer-events-auto"/>
        <h2 className="topic absolute top-2/5 z-10 text-2xl md:text-5xl font-extrabold text-white drop-shadow-lg pointer-events-none">
          {topicTitle}
        </h2>
        <div className="circle-container aspect-square w-screen h-auto md:h-screen md:w-auto rounded-full flex items-center justify-center">

          {listOfProjects.map((project, index) => (
            <div
              key={index}
              className="orbit-item absolute w-20 h-20 md:w-32 md:h-32 cursor-pointer"
              style={{ transform: `rotate(${72 * index}deg)` }}
            >
              <div className="label absolute left-1/2 transform -translate-x-1/2 bg-slate-950/80 pb-10 mb-2 px-2 rounded-tl-md opacity-0 -z-10 pointer-events-none border border-white/10">
                <p className="text-xs md:text-sm text-white whitespace-nowrap">
                  {project.title}
                </p>
              </div>

              <img src={project.icon} alt={project.title} className="hover:scale-110 hover:brightness-110 bg-white/95 transition-transform duration-300 w-full h-full object-contain rounded-full p-2" 
              onClick={() => showProject(index)}
              onMouseEnter={() => {selectedProjectIndex.current=index; labelPop(index);}}
              onMouseLeave={() => {selectedProjectIndex.current=-1; labelHide(index);}}
              />
              
            </div>
          ))}

        </div>
        
      </div>
    </div>
  );
}
