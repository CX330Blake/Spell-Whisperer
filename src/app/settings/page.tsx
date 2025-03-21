"use client";

import Loading from "@/components/Loading";
import BlurText from "@/components/reactbits/BlurText";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    avatar: z.any().optional(),
});

interface User {
    name: string;
    email: string;
    avatar: string | null;
}

export default function Settings() {
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const { data: session, status } = useSession();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            avatar: undefined,
        },
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/login");
        }
    }, [status]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/users/get-data");
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data: User[] = await response.json();
                setUser(data[0]);

                form.setValue("username", data[0]?.name || "");
                form.setValue("email", data[0]?.email || "");
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
        setUpdating(true);
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }

        const response = await fetch("/api/users/update", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        if (!response.ok) {
            console.error("Failed to update user data");

            toast.error("Error", {
                description: result.error,
                action: {
                    label: "Got it",
                    onClick: () => {},
                },
            });
        } else {
            setUser(result);

            toast.success("Success", {
                description: "User info is successfully updated.",
                action: {
                    label: "Yeah",
                    onClick: () => {},
                },
            });
        }

        setUpdating(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col space-y-4 items-center w-4/5 mx-auto mt-[15vh]">
            <span className="font-victor-mono text-4xl md:text-6xl">
                <BlurText text="Settings" />
            </span>
            <span className="font-playwrite justify-center text-base md:text-xl">
                <BlurText text="- Customize your infos in Spell Whisperer -" />
            </span>
            <br />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-2/3 space-y-6"
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                >
                    {/* Username */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-victor-mono text-lg">
                                    Username
                                </FormLabel>
                                <FormControl className="border-primary font-victor-mono">
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email (Read Only) */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-victor-mono text-lg">
                                    Email
                                </FormLabel>
                                <FormControl className="border-primary font-victor-mono">
                                    <Input {...field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Avatar */}
                    {user?.avatar && (
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full"
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-victor-mono text-lg">
                                    Avatar
                                </FormLabel>
                                <FormControl className="border-primary font-victor-mono">
                                    <Input
                                        type="file"
                                        className="hover:cursor-pointer"
                                        ref={fileInputRef}
                                        onChange={(e) =>
                                            form.setValue(
                                                "avatar",
                                                e.target.files?.[0],
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className="font-playwrite hover:cursor-pointer"
                        type="submit"
                    >
                        {updating ? (
                            <AiOutlineLoading className="animate-spin" />
                        ) : (
                            <FaCheck />
                        )}
                        Update
                    </Button>
                </form>
            </Form>
            <br />
            <br />
            <br />
        </div>
    );
}
