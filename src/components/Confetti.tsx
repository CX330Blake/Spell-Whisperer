import confetti from "canvas-confetti";

export function Confetti() {
    const defaults = {
        origin: { x: 0.5, y: 0.5 },
        particleCount: 150,
        spread: 100,
        zIndex: 9999,
    };

    confetti({
        ...defaults,
        origin: { x: 0, y: 0.7 },
        particleCount: 200,
    });

    confetti({
        ...defaults,
        origin: { x: 1, y: 0.7 },
        particleCount: 200,
    });
}
