"use client";

import { useRef, useEffect, useState } from "react";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import SplashCursor from "@/components/reactbits/SplashCursor";

export default function App() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);
    const count = 3; // 頁面數量
    const isScrolling = useRef(false); // 防止滾動過快

    // **滾動到指定頁面**
    const gotoNum = (index: number) => {
        if (!pageRef.current || isScrolling.current) return;

        isScrolling.current = true; // 防止短時間內連續滾動

        pageRef.current.style.transform = `translateY(-${index * 100}vh)`;
        pageRef.current.style.transition = "transform 0.8s ease-in-out";

        setCurrent(index);

        // 設定延遲，確保動畫完成後才能再次滾動
        setTimeout(() => {
            isScrolling.current = false;
        }, 850); // 略大於 transition 的 800ms
    };

    // **下一頁**
    const gotoNext = () => {
        if (current < count - 1) {
            gotoNum(current + 1);
        }
    };

    // **上一頁**
    const gotoPrev = () => {
        if (current > 0) {
            gotoNum(current - 1);
        }
    };

    // **處理滾輪事件**
    useEffect(() => {
        const trigger = 20;
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // 阻止預設滾動行為

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
    }, [current]); // 依賴 `current`，確保滾動狀態更新

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
        </div>
    );
}
