import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "lh4.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "lh5.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "lh6.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "api.star-history.com",
                pathname: "/svg/**",
            },
        ],
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
