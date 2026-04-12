
import { useGSAP } from "@gsap/react";
import useLenisGsap from "./lenis"
import Hero from "./Pages/Hero";
import Gsap from "gsap";
import About from "./Pages/About";
import Navbar from "./Pages/Navbar";
import Contact from "./Pages/Contact";
import Projects from "./Pages/Projects";
import Experience from "./Pages/Experience";

function App() {
  useLenisGsap()
  useGSAP(()=>{
    // Remove cover after 2 seconds
    const tl = Gsap.timeline();
    tl.to('#cover', { opacity: 0, duration: 2, ease: 'power2.out' });
  },[])

  return (
    <>
    <div id="cover" className="fixed h-screen w-screen bg-black opacity-100 top-0 left-0 z-50 pointer-events-none"/>
     <Navbar/>
     <Hero />
     <About/>
     <Experience/>
     <Projects/>
     <Contact/>
    </>
  );
}

export default App
