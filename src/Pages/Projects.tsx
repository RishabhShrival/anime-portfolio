import { useGSAP } from "@gsap/react";
import Gsap from "gsap";
import { SplitText } from "gsap/all";
import RotatingCarousel from "../component/rotatingCarosal";

export default function Projects(){

    Gsap.registerPlugin(SplitText);

  useGSAP(()=>{
    //exit About page
    const carosalInlarge = Gsap.timeline({
      scrollTrigger: {
        trigger: ".carosal",
        start: "center center",
        end: "bottom top",
        scrub: 1.5
      },
    });
    carosalInlarge.to(".circle-container", {scale:2, ease:"linear.out"}
    );    
  },[])

    return(
        <section id="projects" className="w-screen h-screen relative overflow-hidden">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <p className="jp-label">作品 • Projects</p>
          {/* <h2 className="text-4xl md:text-6xl font-extrabold grad-text">Holographic Reactor</h2> */}
        </div>
            <div className="carosal w-full h-full">
                <RotatingCarousel/>
            </div>
        </section>
    )
}