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
            <div className="carosal w-full h-full">
                <RotatingCarousel/>
            </div>
        </section>
    )
}