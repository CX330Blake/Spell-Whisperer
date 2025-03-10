import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaPaperPlane } from "react-icons/fa6";

export default function Chat() {
    return (
        <div className="flex flex-col items-center space-y-4 w-auto">
            <div className="flex w-full gap-4 h-60">
                <Textarea
                    placeholder="Type your message here to chat with LLM"
                    className="font-victor-mono w-1/2 h-full text-sm md:text-base lg:text-base border-primary resize-none"
                />
                <Textarea
                    placeholder="The response from LLM will appear here"
                    className="font-victor-mono w-1/2 h-full text-sm md:text-base lg:text-base border-primary resize-none"
                    disabled
                />
            </div>
            <br />
            <Button className="font-playwrite w-1/3 hover:cursor-pointer">
                <div className="flex justify-center space-x-2 items-center">
                    <FaPaperPlane size={30} />
                    <div>Send message</div>
                </div>
            </Button>
        </div>
    );
}
