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
    tl.from(title.chars, { duration: 0.5, opacity: 0, y: -50,delay:1, ease:"bounce.out", stagger: 0.1 },0);
    tl.from(subtitle.lines, { duration: 0.5, opacity: 0, y: 0,ease:"linear", stagger: 0.1 });

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
        perturbance={0.005}
        resolution={256}
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
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
            <p className="jp-label mb-5 backdrop-blur-md px-2">創造者 • 開発者 • 未来</p>
            <h2 id="hero-subtitle" className="text-xl md:text-3xl text-[var(--text-primary)] drop-shadow-lg max-w-3xl">Building immersive digital experiences with...</h2>
            <h1 id="hero-title" className="titleText grad-text mt-10">Rishabh Shrival</h1>
            {/* <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
              <button className="px-6 py-3 rounded-full neo-card border border-cyan-300/40 hover:shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-shadow">Start Journey</button>
              <button className="px-6 py-3 rounded-full border border-violet-400/60 text-violet-200 hover:bg-violet-500/15 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all" >View Projects</button>
            </div> */}
            <p className="text-xs tracking-[0.3em] text-[var(--japanese-text-color)] font-medium backdrop-blur-md px-2">Creator • Developer • Future</p>
          </div>
          </>
        )}
      </WaterWave>

      
    </section>

  );
}
