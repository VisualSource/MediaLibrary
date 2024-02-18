import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from 'react-hook-form';
import useAuth from "@/hooks/useAuth";

import { cn } from "@/lib/utils";
import Button from "@ui/Button";
import Input from "@ui/Input";
import Label from "@ui/Label";
import { AuthError } from "@/lib/auth/context";

type FormState = {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting }, setError } = useForm<FormState>()
    const navigate = useNavigate();
    const { ctx } = useAuth();

    const onSubmit = async (state: FormState) => {
        try {
            await ctx.login(state);

            navigate({ to: "/" });
        } catch (error) {
            if (error instanceof AuthError && error.cause instanceof Response && error.cause.status === 403) {
                setError("email", { message: "Invalid email" });
                setError("password", { message: "Invalid password" });
            } else {
                console.error(error);
            }
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-none h-full">
            <div className="bg-slate-900 hidden md:block relative">
                <h2 className="absolute top-4 left-4">Media Library</h2>
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1679041006302-cf5e318da08c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="background" />
            </div>

            <div className="flex flex-col justify-center items-center relative h-full space-y-6">
                <Link className="absolute top-4 right-4 h-9 rounded-md px-3 hover:bg-neutral-700/50 hover:text-neutral-50 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" to="/signup">Signup</Link>
                <h1 className="text-2xl font-semibold tracking-tight">Login</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 w-1/4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className={cn({ "text-red-500": !!errors.email })}>Email</Label>
                        <Input aria-invalid={errors.email ? "true" : "false"} id="email" {...register("email", {
                            required: {
                                message: "A email is required.",
                                value: true
                            },
                        })} className="border border-neutral-500" name="email" type="email" placeholder="user@example.com" />
                        {errors.email ? (<p role="alert" className="text-sm font-medium text-red-500">{errors.email.message}</p>) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password" className={cn({ "text-red-500": !!errors.password })}>Password</Label>
                        <Input aria-invalid={errors.password ? "true" : "false"} id="password" {...register("password", {
                            required: {
                                message: "A password is required",
                                value: true
                            }
                        })} className="border border-neutral-500" name="password" type="password" placeholder="password" />
                        {errors.password ? (<p role="alert" className="text-sm font-medium text-red-500">{errors.password.message}</p>) : null}
                    </div>

                    <Button className="bg-neutral-50 text-neutral-950 hover:bg-neutral-50/90 h-10 px-4 py-2 gap-4" type="submit" disabled={isSubmitting}>
                        Login
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

export const Route = createLazyFileRoute("/login")({
    component: Login,
});