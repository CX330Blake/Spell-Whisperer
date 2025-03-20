import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
    return (
        <div className="bg-background h-screen w-screen z-50 flex justify-center items-center">
            <div className="font-playwrite text-6xl flex flex-row space-x-10">
                <span>Loading</span>
                <AiOutlineLoading className="animate-spin" />
            </div>
        </div>
    );
}
