"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollDownHint() {
    return (
        <div className="flex flex-col items-center space-y-1 text-gray-500 font-victor-mono">
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: 10 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2,
                }}
            >
                <ChevronDown size={24} />
            </motion.div>
            {/* <span className="text-sm">Scroll</span> */}
        </div>
    );
}
