import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Chat() {
    return (
        <div className="flex flex-col items-center space-y-4 w-auto">
            <div className="flex w-full gap-4 h-50">
                <Textarea
                    placeholder="Type your message here to chat with LLM"
                    className="font-victor-mono w-1/2 h-full text-sm md:text-base lg:text-base border-primary resize-none"
                />
                <Textarea
                    placeholder="The response from LLM will appear here"
                    className="font-victor-mono w-1/2 h-full text-sm md:text-base lg:text-base border-primary resize-none"
                    readOnly
                />
            </div>
            <br />
            <Button className="font-playwrite w-1/3">Send message</Button>
        </div>
    );
}
