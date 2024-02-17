import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";

import useAuth from "@hook/useAuth";
import { cn } from "@/lib/utils";
import Button from "@ui/Button";
import Input from "@ui/Input";
import Label from "@ui/Label";

/*
 Setup X-XSRF-TOKEN
    get token form cookie XSRF-TOKEN

*/
type FormState = {
    username: string;
    email: string;
    password: string;
    checked: string;
}

const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormState>();

    const onSubmit = async (state: FormState) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ password: state.password, email: state.email, username: state.username })
            });

            if (!response.ok) throw response;
            const { accessToken } = await response.json() as { accessToken: string };
            auth.setToken(accessToken);

            navigate({ to: "/" });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-none h-full">
            <div className="bg-slate-900 hidden md:block relative">
                <h2 className="absolute top-4 left-4">Media Library</h2>
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1707853722132-6569cd4f0f06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="background" />
                <div className="absolute bottom-4 right-4 text-sm bg-neutral-400/75 text-center px-1.5 py-1 rounded-md">
                    Photo by <a className="text-blue-600 underline active:text-purple-600" target="_blank" href="https://unsplash.com/@wolfgang_hasselmann?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Wolfgang Hasselmann</a> on <a className="text-blue-600 underline" target="_blank" href="https://unsplash.com/photos/a-tree-in-the-middle-of-a-desert-rclK3HN5QH8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center relative h-full space-y-6">
                <Link className="absolute top-4 right-4 h-9 rounded-md px-3 hover:bg-neutral-700/50 hover:text-neutral-50 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" to="/login">Login</Link>
                <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 w-1/4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="username" className={cn({ "text-red-500": !!errors.username })}>Username</Label>
                        <Input {...register("username", {
                            required: {
                                message: "A username",
                                value: true
                            },
                            minLength: {
                                message: "A username must be more then 5 chars.",
                                value: 5
                            }
                        })} id="username" className="border border-neutral-500" name="username" type="text" placeholder="username" />
                        {errors.username ? (<p role="alert" className="text-sm font-medium text-red-500">{errors.username.message}</p>) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className={cn({ "text-red-500": !!errors.email })}>Email</Label>
                        <Input {...register("email", {
                            required: {
                                message: "A Email is required",
                                value: true
                            }
                        })} id="email" className="border border-neutral-500" name="email" type="email" placeholder="email@example.com" />
                        {errors.email ? (<p role="alert" className="text-sm font-medium text-red-500">{errors.email.message}</p>) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password" className={cn({ "text-red-500": !!errors.password })}>Password</Label>
                        <Input {...register("password", {
                            required: {
                                message: "A password is required",
                                value: true
                            },
                            deps: "checked",
                            minLength: {
                                message: "A password must be more then 8 chars.",
                                value: 8
                            }
                        })} id="password" className="border border-neutral-500" name="password" type={showPassword ? "text" : "password"} placeholder="password" />
                        <button type="button" onClick={() => setShowPassword(e => !e)}>Show</button>
                        {errors.password ? (<p role="alert" className="text-sm font-medium text-red-500">{errors.password.message}</p>) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="check" className={cn({ "text-red-500": !!errors.checked })}>Reenter Password</Label>
                        <Input {...register("checked", {
                            required: {
                                message: "You must reenter your password",
                                value: true
                            },
                            validate: (v, formValues) => v === formValues.password ? true : "Does not match password."
                        })} id="checked" className="border border-neutral-500" name="checked" type="password" placeholder="password" />
                        {errors.checked ? (<p role="alert" className="text-sm font-medium text-red-500">{errors.checked.message}</p>) : null}
                    </div>
                    <Button className="bg-neutral-50 text-neutral-950 hover:bg-neutral-50/90 h-10 px-4 py-2 gap-4" type="submit" disabled={isSubmitting}>
                        Create Account
                        {isSubmitting ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export const Route = createLazyFileRoute("/signup")({
    component: SignUp
});