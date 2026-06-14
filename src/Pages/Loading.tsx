import Gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Loading() {
    const [loading, setLoading] = useState(true);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [sharinganAppear, setSharinganAppear] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Set loading false when page is fully loaded
        function handleLoad() {
            setLoading(false);
        }
        if(window.innerWidth < 768) {
            setLoading(false);
        }
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
    }, []);

    useGSAP(() => {
        const ballSize = 64;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const startX = 0;
        const startY = 0;
        const centerX = (viewportWidth / 2) - (ballSize / 2);
        const bottomY = viewportHeight - ballSize;
        const ballScale = window.innerWidth < 768 ? 4 : 5; // Adjust scale based on screen size


        Gsap.set('#ball', { x: startX, y: startY, scale: 1 });
        Gsap.set('#sharingan', { scale: 0, rotate: 0 });

        const masterTl = Gsap.timeline();

        // Ball X and Y animations
        masterTl.to('#ball', { x: centerX, duration: 3, ease: 'ease.out',delay:2 }, 0);
        masterTl.to('#ball', { y: bottomY / 2, scale: 1.5, duration: 1.5, ease: "bounce.out(5)",delay:2 }, 0);
        masterTl.to('#ball', { scale: ballScale, duration: 1, ease: 'power2.out', onComplete: () => { setSharinganAppear(true); } });
        masterTl.to('#ball', { scale: ballScale*6, duration: 1, delay: 2, ease: 'power2.in', onComplete: () => { setAnimationComplete(true); } });

        masterTl.to('#maskedText', { maskSize: '200%', duration: 1, ease: 'power2.in' }, "<");



    });

    // Add this useEffect after useGSAP
    useEffect(() => {
        if(sharinganAppear) {
            // Sharingan infinite rotation timeline
            const rotateTl = Gsap.timeline({ repeat: -1, yoyo:true});
            rotateTl.to('#sharingan', { rotate: 360, duration: 1, ease: 'power4.out', scale: 1 } );
        }
        if (!loading && animationComplete) {
            // stop rotation & scale
            Gsap.killTweensOf('#sharingan'); 
            Gsap.to('#sharingan', { 
                scale: 0, 
                duration: 1, 
                ease: 'bounce.in',
                onComplete: () => {
                    // route to next page after animation
                    navigate("/app"); // replace "/home" with your route
                    Gsap.killTweensOf('#ball'); // stop ball animation
                }
            });
        }
    }, [loading, sharinganAppear, animationComplete, navigate]);

    
    // Get viewport height for maskPosition in style
    const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    return (
        <div className="relative h-dvh w-screen overflow-hidden bg-[radial-gradient(circle_at_center,rgba(10,10,20,1)_0%,rgba(0,0,0,1)_100%)]">
            {/* Moving ball that acts as mask */}
            <div
                id="ball"
                className="absolute h-16 w-16 bg-[radial-gradient(circle_at_center,rgba(255,36,36,1)_0%,rgba(200,10,10,0.8)_25%,rgba(0,0,0,0.85)_60%,rgba(0,0,0,1)_100%)] rounded-full shadow-lg"
            ></div>

            <div className='absolute OriginCenter top-1/2 left-1/2'>
                <img
                id="sharingan"
                src="./sharingan.png"
                className="aspect-square md:w-64 z-10 bg-cover rounded-full shadow-lg scale-1"
            ></img></div>

            {/* Center loading text */}
            {/* <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-[var(--text-color)]">Loading...</h1>
            </div> */}

            {/* Masked text at bottom */}
            <div className="absolute bottom-20 w-full flex items-center justify-center">
                <h1
                id='maskedText'
                className="text-2xl md:text-4xl font-bold"
                style={{
                    maskImage: 'url("./solid-circle.png")',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: `center -${viewportHeight/2}px`,
                    maskSize: '50%',
                }}
                >
                Welcome to my portfolio
                </h1>
            </div>
        </div>

    )
}