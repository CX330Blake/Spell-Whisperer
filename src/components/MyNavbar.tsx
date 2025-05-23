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
import {
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
} from "@heroui/dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Hamburger from "hamburger-react";
import { Link } from "@heroui/link";
import { ThemeToggle } from "./ThemeToggle";

import { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import { signOut, useSession } from "next-auth/react";
import { FaChevronDown } from "react-icons/fa6";

interface User {
    username: string;
    imageURL: string;
}

export default function MyNavbar() {
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const initUser = async () => {
            setUser({
                username: session?.user?.name || "User",
                imageURL: session?.user?.image || "https://i.pravatar.cc/150",
            });
        };
        initUser();
    }, [session]);

    const challengesDropdown = [
        { label: "Rules", href: "/rules" },
        { label: "Tutorial", href: "/tutorial" },
        { label: "Challenges", href: "/challenges" },
    ];

    const menuItems = [
        {
            label: "Leaderboard",
            href: "/leaderboard",
        },

        {
            label: "GitHub",
            href: "https://github.com/CX330Blake/Spell-Whisperer",
        },

        { label: "Sponsor", href: "/sponsor" },
        { label: "About", href: "/about" },
        // ...(!session ? [{ label: "Login", href: "/login" }] : []),
    ];

    return (
        <Navbar
            position="sticky"
            className="fixed font-victor-mono font-bold border-primary h-20 backdrop-blur-sm z-50 border-dashed"
            isBlurred={true}
            isBordered
        >
            {/* Start */}
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
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {/* Center */}
            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                <Dropdown className="font-victor-mono">
                    <DropdownTrigger>
                        <div className="hover:cursor-pointer hover:font-playwrite flex gap-2 items-center">
                            Training
                            <FaChevronDown size={10} />
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu className="border border-primary rounded-xl bg-background">
                        {challengesDropdown.map((item, index) => (
                            <DropdownItem
                                key={index}
                                href={item.href}
                                className="text-primary font-bold hover:font-playwrite"
                            >
                                {item.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full hover:font-playwrite"
                            href={item.href}
                            isExternal={item.href.startsWith("http")}
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarContent>

            {/* End */}
            <NavbarContent justify="end">
                {session ? null : (
                    <NavbarItem className="hidden lg:flex">
                        {/* <Link href="#">Login</Link> */}
                        <LoginButton />
                    </NavbarItem>
                )}
                <NavbarItem>
                    <ThemeToggle />
                </NavbarItem>

                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    icon={<Hamburger />}
                />
                {session ? (
                    <Dropdown
                        placement="bottom-end"
                        className="font-victor-mono"
                    >
                        <DropdownTrigger>
                            <Avatar
                                key={user?.imageURL}
                                className="border-primary border-2 hover:cursor-pointer"
                            >
                                <AvatarImage src={user?.imageURL} />
                                <AvatarFallback>?</AvatarFallback>
                            </Avatar>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                            className="border border-primary rounded-xl bg-background"
                        >
                            <DropdownItem
                                key="logout"
                                color="primary"
                                className="text-primary font-bold hover:font-playwrite"
                                href="/settings"
                            >
                                Settings
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                className="text-red-500 font-bold hover:font-playwrite"
                                onPress={() => signOut({ callbackUrl: "/" })}
                            >
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : null}
            </NavbarContent>

            {/* Mobile phone */}
            <NavbarMenu className="font-victor-mono top-20">
                <br />
                <NavbarMenuItem className="flex flex-col gap-4 mt-4">
                    {/* Challenges dropdown */}
                    <Dropdown>
                        <DropdownTrigger className="hover:cursor-pointer">
                            <p>Training</p>
                        </DropdownTrigger>
                        <DropdownMenu className="border border-primary rounded-xl bg-background font-victor-mono">
                            {challengesDropdown.map((item, index) => (
                                <DropdownItem key={index}>
                                    <Link href={item.href}>{item.label}</Link>
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    {menuItems.map((item, index) => (
                        <Link
                            className="w-full text-base"
                            href={item.href}
                            isExternal={item.href.startsWith("http")}
                        >
                            {item.label}
                        </Link>
                    ))}
                    {session ? null : (
                        <Link className="w-full" href="/login">
                            Login
                        </Link>
                    )}
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
