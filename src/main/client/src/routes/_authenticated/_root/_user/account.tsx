import { Link, createFileRoute } from "@tanstack/react-router";
import { Save, User2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import useMutationUser from "@/hooks/useMutationUser";
import { Button, buttonVariants } from '@ui/button';
import { Input } from "@/components/ui/Input";
import useAuth from "@/hooks/useAuth";

const Account: React.FC = () => {
    const form = useForm<{ username: string; email: string; avatar: string }>();
    const auth = useAuth();
    const mutate = useMutationUser();

    const onSubmit = async (state: { username: string; email: string; avatar: string }) => {

        if (auth.user?.avatar === state.avatar && auth.user.username === state.username && auth.user.email === state.email) {
            return;
        }

        await mutate.mutateAsync(state);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full relative">

            <div className="absolute top-0 right-4 flex gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Edit Account</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Account</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="username" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Username" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="avatar" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="avatar" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <div className="w-full flex justify-end">
                                    <Button disabled={form.formState.isSubmitting} type="submit" size="icon">
                                        <Save />
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <Link className={buttonVariants({ variant: "ghost", })} to="/signup">Logout</Link>
            </div>


            <Avatar className="h-36 w-36 border-2 border-white">
                <AvatarImage src={auth.user?.avatar} />
                <AvatarFallback>
                    <User2 />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center p-2">
                <h1 className="font-bold text-xl">{auth.user?.username}</h1>
                <p className="text-neutral-600 text-sm leading-4 tracking-tight">{auth.user?.email}</p>
            </div>

        </div>
    );
}

export const Route = createFileRoute("/_authenticated/_root/_user/account")({
    component: Account
});