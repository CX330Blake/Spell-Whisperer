"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@heroui/navbar";
import Hamburger from "hamburger-react";
import { Link } from "@heroui/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { RxMagicWand } from "react-icons/rx";

export default function MyNavbar() {
    const menuItems = [
        { label: "Home", href: "/" },
        { label: "Challenges", href: "/challenges" },
        {
            label: "Source code",
            href: "https://github.com/CX330Blake/Spell-Whisperer",
        },
        {
            label: "About",
            href: "#",
            onClick: () => alert("I'm working on it...stay tuned!"),
        },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <Navbar
            position="sticky"
            className="font-victor-mono font-bold border-primary h-20 backdrop-blur-sm z-50 border-dashed"
            isBlurred={true}
            isBordered
        >
            <NavbarContent justify="start">
                <NavbarBrand>
                    <Link
                        color="foreground"
                        href="/"
                        className="space-x-4 items-center"
                    >
                        <p className="font-bold text-inherit font-playwrite text-xl">
                            Spell Whisperer
                        </p>

                        {/* <RxMagicWand size={30} /> */}
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="/challenges">
                        Challenges
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="https://github.com/CX330Blake/Spell-Whisperer"
                        isExternal
                    >
                        Source code
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    {/* <Link color="foreground" href="/">
                        About
                    </Link> */}
                    <a
                        href="#"
                        onClick={() => alert("I'm working on it...stay tuned!")}
                    >
                        About
                    </a>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    {/* <Link href="#">Login</Link> */}
                    <a
                        href="#"
                        onClick={() => alert("I'm working on it...stay tuned!")}
                    >
                        Login
                    </a>
                </NavbarItem>
                <NavbarItem>
                    <ThemeToggle />
                </NavbarItem>

                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    icon={<Hamburger />}
                />
            </NavbarContent>

            <NavbarMenu className="font-victor-mono top-20">
                <br />
                <br />
                <br />
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            // color={
                            //     index === 2
                            //         ? "primary"
                            //         : index === menuItems.length - 1
                            //           ? "danger"
                            //           : "foreground"
                            // }
                            href={item.href}
                            isExternal={item.href.startsWith("http")}
                            size="lg"
                            text-xl
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
