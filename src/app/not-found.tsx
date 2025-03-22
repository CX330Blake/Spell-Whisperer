"use client";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="bg-background h-screen w-screen z-50 flex justify-center items-center">
            <div className="font-playwrite text-6xl flex-col justify-center space-y-10 text-center">
                <p>404</p>
                <p>Not Found</p>
                <Button
                    className="font-victor-mono text-3xl"
                    onClick={() => {
                        location.href = "/";
                    }}
                >
                    <div className="hover:cursor-pointer">Home</div>
                </Button>
                <p className="text-3xl">Country roads, take me home.</p>
            </div>
        </div>
    );
}
