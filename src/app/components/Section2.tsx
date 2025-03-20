import CountUp from "@/components/reactbits/CountUp";
import RotatingText from "@/components/reactbits/RotatingText";
import { useState, useEffect, useMemo } from "react";

export default function Section2() {
    const [chalCnt, setChalCnt] = useState(0);
    const [chalNames, setChalNames] = useState<string[]>(["Loading..."]);
    const [levelNames, setLevelNames] = useState<string[]>(["Loading..."]);
    const [userCnt, setUserCnt] = useState(0);

    useEffect(() => {
        const fetchUsersCnt = async () => {
            try {
                const res = await fetch("/api/users/count").then((res) =>
                    res.json(),
                );
                setUserCnt(res.count);
            } catch (error) {
                console.error("Error fetching users count:", error);
            }
        };

        const fetchChalCnt = async () => {
            try {
                const res = await fetch("/api/challenge/count");
                const data = await res.json();
                setChalCnt(data.count);
            } catch (error) {
                console.error("Error fetching challenge count:", error);
            }
        };

        const fetchChalNames = async () => {
            try {
                const res = await fetch("api/challenge/get-names");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setChalNames(data);
                } else {
                    console.error("Invalid data format:", data);
                }
                setChalNames(data);
            } catch (error) {
                console.error("Error fetching challenge names:", error);
            }
        };

        const fetchLevelNames = async () => {
            try {
                const res = await fetch("api/challenge/get-levels");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setLevelNames(data);
                } else {
                    console.error("Invalid data format:", data);
                }
                setLevelNames(data);
            } catch (error) {
                console.error("Error fetching level names:", error);
            }
        };

        fetchUsersCnt();
        fetchChalCnt();
        fetchChalNames();
        fetchLevelNames();
    }, []);

    const countUpUsers = useMemo(
        () => (
            <CountUp
                from={0}
                to={userCnt}
                direction="up"
                duration={2}
                className="text-4xl md:text-6xl"
            />
        ),
        [userCnt], // 只有 userCnt 變化時，才會重新計算
    );

    const countUpChallenges = useMemo(
        () => (
            <CountUp
                from={0}
                to={chalCnt}
                direction="up"
                duration={2}
                className="text-4xl md:text-6xl"
            />
        ),
        [chalCnt], // 只有 chalCnt 變化時，才會重新計算
    );

    const rotatingLogin = useMemo(
        () => (
            <RotatingText
                texts={["Join Now", "Let's Hack", "Get Started"]}
                mainClassName="w-auto font-victor-mono text-bold px-2 sm:px-2 md:px-3 bg-primary text-background overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.05}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                }}
                rotationInterval={2500}
            />
        ),
        [],
    );

    const rotatingChalNames = useMemo(
        () => (
            <RotatingText
                texts={chalNames}
                mainClassName="w-auto font-victor-mono text-bold px-2 sm:px-2 md:px-3 bg-primary text-background overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.05}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                }}
                rotationInterval={2500}
            />
        ),
        [chalNames],
    );

    const rotatingLevelNames = useMemo(
        () => (
            <RotatingText
                texts={levelNames}
                mainClassName="w-auto font-victor-mono text-bold px-2 sm:px-2 md:px-3 bg-primary text-background overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.05}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                }}
                rotationInterval={2500}
            />
        ),
        [levelNames],
    );

    return (
        <div className="w-full h-full flex flex-col justify-around mb-[15vh]">
            <div className="flex flex-col space-y-4 font-victor-mono font-bold mt-[20vh] ml-[10vw] mr-[10vw] break-words text-3xl md:text-5xl leading-normal gap-4">
                <div>
                    {countUpUsers}
                    &nbsp;Registered Users.
                    <a href="/challenges" rel="/">
                        {rotatingLogin}
                    </a>
                </div>
            </div>
            <div className="flex-col space-y-4 font-victor-mono font-bold ml-[10vw] mr-[10vw] break-words text-3xl md:text-5xl leading-normal gap-4">
                <div className="text-right">
                    {countUpChallenges}
                    &nbsp;Challenges Now In Total,
                </div>
                {chalNames.length > 0 && (
                    <a href="/challenges" rel="/">
                        {rotatingChalNames}
                    </a>
                )}
            </div>

            <div className="flex-col space-y-4 font-victor-mono font-bold ml-[10vw] mr-[10vw] break-words text-3xl md:text-5xl leading-normal gap-4">
                <div>From Simple To Hard.</div>
                {chalNames.length > 0 && (
                    <a href="/challenges" target="_blank" rel="/">
                        {rotatingLevelNames}
                    </a>
                )}
            </div>
        </div>
    );
}
