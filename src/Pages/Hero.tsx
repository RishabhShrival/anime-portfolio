import { useGSAP } from "@gsap/react";
import Gsap from "gsap";
import { SplitText } from "gsap/all";
import WaterWave from 'react-water-wave';

export default function Hero() {

  Gsap.registerPlugin(SplitText);

  useGSAP(()=>{
    //text appear
    const title = new SplitText("#hero-title", { type: "words,chars" });
    const subtitle = new SplitText("#hero-subtitle", { type: "lines" });
    const tl = Gsap.timeline();
    tl.from(title.chars, { duration: 0.5, opacity: 0, y: -50,delay:2, ease:"bounce.out", stagger: 0.1 },0);
    tl.from(subtitle.lines, { duration: 0.5, opacity: 0, y: 0,ease:"none", stagger: 0.1 });

    const waterBgtl = Gsap.timeline({
      scrollTrigger: {
        trigger: "#Hero",
        start: "center top",
        end: "bottom top",
        scrub: 1.5
      },
    });
    waterBgtl.to("#circle",
      {ease:"circ.out", maskSize: '200%', borderRadius:'50%',scale:1}
    );

  },[])


  return (
    <section id='Hero' className="h-screen w-screen">
      <WaterWave
        id='circle'
        imageUrl="/anime-night-sky-illustration.jpg"
        dropRadius={20}
        perturbance={0.01}
        resolution={512}
        style={{
          display: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: 'url("./solid-circle.png")',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: `center`,
          maskSize: '200%',
          borderRadius: '0%',
          scale: 1.1,
          width: "100%",
          height: "95%",
        }}
      >
        {() => (
          <>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 id="hero-title" className="titleText">Anime Portfolio</h1>
            <h2 id="hero-subtitle" className="text-2xl md:text-4xl text-white drop-shadow-lg">A showcase of my favorite anime-inspired projects</h2>
          </div>
          </>
        )}
      </WaterWave>

      
    </section>

  );
}
