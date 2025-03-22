"use client";

import { useRef, useEffect, useState } from "react";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import SplashCursor from "@/components/reactbits/SplashCursor";
import { ScrollDownHint } from "@/components/ScrollDownHint";

export default function App() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);
    const count = 3; // Pages count
    const isScrolling = useRef(false); // Prevent scrolling too fast

    // Scroll to the specified page
    const gotoNum = (index: number) => {
        if (!pageRef.current || isScrolling.current) return;

        isScrolling.current = true; // Prevent scrolling too fast

        pageRef.current.style.transform = `translateY(-${index * 100}vh)`;
        pageRef.current.style.transition = "transform 0.8s ease-in-out";

        setCurrent(index);

        // Set delay to ensure that scrolling is allowed after the animation is completed
        setTimeout(() => {
            isScrolling.current = false;
        }, 850); // A little longer than the transition duration
    };

    // Next page
    const gotoNext = () => {
        if (current < count - 1) {
            gotoNum(current + 1);
        }
    };

    // Previous page
    const gotoPrev = () => {
        if (current > 0) {
            gotoNum(current - 1);
        }
    };

    // Handle wheel event
    useEffect(() => {
        const trigger = 20;
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // Prevent default scroll behavior

            if (e.deltaY > trigger) {
                gotoNext();
            } else if (e.deltaY < -trigger) {
                gotoPrev();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [current]);

    return (
        <div className="relative h-screen overflow-hidden">
            {/* <SplashCursor /> */}
            {/* Section Container */}
            <div ref={pageRef} className="absolute w-full h-full">
                <section className="h-screen overflow-hidden flex items-center justify-center text-primary text-4xl">
                    <Section1 />
                </section>
                <section className="h-screen overflow-hidden flex items-center justify-center text-primary text-4xl">
                    <Section2 />
                </section>
                <section className="h-screen overflow-hidden flex items-center justify-center text-primary text-4xl">
                    <Section3 />
                </section>
            </div>
            {current < count - 1 ? (
                <div
                    className="absolute bottom-4 right-1/2 left-1/2 hover:cursor-pointer"
                    onClick={gotoNext}
                >
                    <ScrollDownHint />
                </div>
            ) : (
                <div
                    className="absolute bottom-4 right-1/2 left-1/2 hover:cursor-pointer rotate-180"
                    onClick={() => gotoNum(0)}
                >
                    <ScrollDownHint />
                </div>
            )}
        </div>
    );
}
