"use client";

import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <div className="flex-col w-full">
            <div className="flex justify-center items-center">
                <div className="font-playwrite text-md">
                    - Made by CX330 with love -
                </div>
            </div>
            <br />
            <div className="flex justify-center items-center space-x-10">
                <a
                    href="https://x.com/CX330Blake"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                >
                    <FaXTwitter size={30} className="hover:text-primary" />
                </a>
                <a
                    href="https://github.com/CX330Blake"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                >
                    <FaGithub size={30} className="hover:text-primary" />
                </a>
                <a
                    href="https://www.facebook.com/profile.php?id=100011698690769"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                >
                    <FaFacebook size={30} className="hover:text-primary" />
                </a>
                <a
                    href="https://www.linkedin.com/in/%E5%AD%90%E9%9B%8B-%E9%99%B3-11087825b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin size={30} className="hover:text-primary" />
                </a>
            </div>
        </div>
    );
}
