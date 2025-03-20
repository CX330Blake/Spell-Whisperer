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

    const menuItems = [
        { label: "Home", href: "/" },

        { label: "Challenges", href: "/challenges" },

        {
            label: "Leaderboard",
            href: "/leaderboard",
        },

        {
            label: "GitHub",
            href: "https://github.com/CX330Blake/Spell-Whisperer",
        },
        // ...(!session ? [{ label: "Login", href: "/login" }] : []),
    ];

    return (
        <Navbar
            position="sticky"
            className="absolute font-victor-mono font-bold border-primary h-20 backdrop-blur-sm z-50 border-dashed"
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
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            href={item.href}
                            isExternal={item.href.startsWith("http")}
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarContent>
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
                            <Avatar className="border-primary border-2 hover:cursor-pointer">
                                <AvatarImage src={user?.imageURL} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                            className="border border-primary rounded-xl bg-background"
                        >
                            <DropdownItem
                                key="logout"
                                color="danger"
                                className="text-red-500 font-bold"
                                onPress={() => signOut({ callbackUrl: "/" })}
                            >
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : null}
            </NavbarContent>

            <NavbarMenu className="font-victor-mono top-20">
                <br />
                <NavbarMenuItem>
                    {menuItems.map((item, index) => (
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
