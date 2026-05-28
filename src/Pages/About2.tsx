import { useGSAP } from "@gsap/react";
import Gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useEffect } from "react";


export default function About() {

  Gsap.registerPlugin(SplitText, ScrollTrigger);

  useGSAP(()=>{
    //text appear
    const title = new SplitText("#About-title", { type: "words,chars" });
    
    // Title animation
    const tlTitle = Gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });
    tlTitle.from(title.chars, { duration: 0.5, opacity: 0, y: -50, ease:"linear", stagger: 0.1 },0);
    
    // Get all subtitles and split them into lines
    const subtitles = document.querySelectorAll('.about-subtitle');
    const splitTexts: SplitText[] = [];
    
    // Split each subtitle into lines
    subtitles.forEach((subtitle, index) => {
      const split = new SplitText(subtitle, { type: "lines" });
      splitTexts.push(split);
      
      // Initially hide all subtitles except the first one
      if (index > 0) {
        Gsap.set(subtitle, { display: 'none' });
        Gsap.set(split.lines, { opacity: 0, y: 20 });
      } else {
        Gsap.set(subtitle, { display: 'block' });
        Gsap.set(split.lines, { opacity: 1, y: 0 });
      }
    });
    
    // Create main timeline with pinned section
    const mainTimeline = Gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "+=100%", // Extend scroll distance for smooth transitions
        scrub: 1.5,
        pin: true, // Pin section during animation
        
      }
    });
    
    // Create smooth line-by-line transitions between subtitles
    splitTexts.forEach((currentSplit, index) => {
      if (index < splitTexts.length - 1) {
        const nextSplit = splitTexts[index + 1];
        const currentSubtitle = subtitles[index];
        const nextSubtitle = subtitles[index + 1];
        
        // Fast transitions with longer dwell time
        mainTimeline
          .to(currentSplit.lines, {
            opacity: 0,
            y: -20,
            duration: 0.3, // Faster fade out
            stagger: 0.05, // Quicker line-by-line effect
            ease: "back.out(1.2)" // Snappier easing
          }, (index * 3) + 2) // Increased spacing for longer dwell time
          .set(currentSubtitle, { display: 'none' }, (index * 3) + 2.3)
          .set(nextSubtitle, { display: 'block' }, (index * 3) + 2.3)
          .to(nextSplit.lines, {
            opacity: 1,
            y: 0,
            duration: 0.4, // Fast but smooth fade in
            stagger: 0.05, // Quick stagger
            ease: "back.out(1.2)" // Bouncy entrance for engagement
          }, (index * 3) + 2.3);
      }
    });
    

  },[])

  function CustomCursor() {
    const cursorSize = 16;
    const mouse = {
      x: 0,
      y: 0,
    };


    //set the x,y values when mouse move
    const handleCursor = (e: MouseEvent): void => {
      const { clientX, clientY } = e;

      mouse.x=(clientX - cursorSize / 2 + 5);
      mouse.y=(clientY - cursorSize / 2 - 10);
    };

    //listen and call function when mouse move
    useEffect(() => {
      window.addEventListener("mousemove", handleCursor);

      return () => {
        window.removeEventListener("mousemove", handleCursor);
      };
    }, []);

    return <div className="h-2 w-2 rounded-full bg-white"></div>;
}


  return (
    <section id='about' className="relative w-screen h-full px-30 pt-20 flex flex-col justify-between md:flex-row gap-10 md:gap-30 overflow-hidden">
      <CustomCursor/>
        <div className="flex-3/5 py-30">
            <p id="About-title" className="titleText">Hii, I am Rishabh</p>
            <div className="text-white text-lg md:text-xl min-h-[200px]">
              <p className="about-subtitle w-fit" data-index="0">
                I am a tech-driven person who loves building, experimenting, and figuring out how things work.
                Pretty chill by nature, but I get deeply focused when solving problems or coding.
                I am into software, new technologies, and hands-on projects that challenge me.
                In my free time, you will usually find me coding, learning something new, or tinkering with ideas.
              </p>
              <p className="about-subtitle w-fit" data-index="1">
                <p className="bold text-2xl">School</p>
                Schooling in Jawahar Navodaya Vidhyalaya Khandwa (Madhya Pradesh) where I developed a strong foundation in science and mathematics.
                and Secured 93.2% in 10th and 93% in 12th board exams.
              </p>
              <p className="about-subtitle w-fit" data-index="2">
                <p className="bold text-2xl">College</p>
                Completed my B.Tech in Data Science Engineering from the prestigious Indian Institute of Technology, Mandi.
                Here, I honed my skills in data analysis, machine learning, and software development while engaging in various projects and research.
                Graduated with a CGPA of 8.03 out of 10.
              </p>
              <p className="about-subtitle w-fit" data-index="3">
                <p className="bold text-2xl">Semester Exchange</p>
                Had the incredible opportunity to be a semester exchange student at Kyushu University in Japan.
                This experience broadened my horizons, exposing me to new cultures and academic perspectives.
                It was a transformative period that enriched both my personal and professional growth.
                Secured a GPA of 9.65/10 during my exchange semester.
              </p>
            </div>
        </div>
        <div className="figure flex-2/5">
            <img src="/portfolio-anime.png" alt="anime developer" className="h-lvh"/>
        </div>
    </section>

  );
}


