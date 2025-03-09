import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function Chat() {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex w-full gap-4 h-40">
                <Textarea
                    placeholder="Type your message here to chat with LLM"
                    className="font-victor-mono w-1/2 h-full text-sm md:text-base lg:text-base"
                />
                <Textarea
                    placeholder="The response from LLM will appear here"
                    className="font-victor-mono w-1/2 h-full text-sm md:text-base lg:text-base"
                    disabled
                />
            </div>

            <Button className="font-playwrite w-1/3">Send message</Button>
        </div>
    );
}
