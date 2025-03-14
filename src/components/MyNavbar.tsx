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

import { Link } from "@heroui/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

export default function MyNavbar() {
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <Navbar
            position="sticky"
            className="font-victor-mono font-bold border-primary h-20 backdrop-blur-sm z-50"
            isBlurred={true}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                />
                <NavbarBrand>
                    <Link color="foreground" href="/">
                        <p className="font-bold text-inherit font-playwrite text-xl">
                            Spell Whisperer
                        </p>
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
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2
                                    ? "primary"
                                    : index === menuItems.length - 1
                                    ? "danger"
                                    : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
