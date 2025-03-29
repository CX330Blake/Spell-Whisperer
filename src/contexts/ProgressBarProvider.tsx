"use client";

import { ProgressProvider } from "@bprogress/next/app";

export default function ProgressBarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProgressProvider
            height="4px"
            color="var(--primary)"
            options={{ showSpinner: false }}
            shallowRouting={true}
            // startPosition={0.5}
            startOnLoad
        >
            {children}
        </ProgressProvider>
    );
}
