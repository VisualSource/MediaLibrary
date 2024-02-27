import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import type { MediaItem } from "@/lib/types";
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";

type FileMetadata = {
    name: string;
    rating: string;
    releaseYear: number;
    thumbnail: string;
}

const EditMetadataDialog: React.FC<{ data: MediaItem }> = ({ data }) => {
    const form = useForm<FileMetadata>({
        defaultValues: data
    });
    const auth = useAuth();

    const onSubmit = async (state: FileMetadata) => {
        try {
            const session = await auth.ctx.getSession();
            if (!session) throw new Error("Failed to get session");

            const update: Record<string, number | string> = {};
            if (state.name !== data.name) {
                update["name"] = state.name;
            }

            if (state.rating !== data.rating) {
                update["rating"] = state.rating;
            }

            if (state.releaseYear !== data.releaseYear) {
                update["releaseYear"] = state.releaseYear;
            }

            if (state.thumbnail !== data.thumbnail) {
                update["thumbnail"] = state.thumbnail;
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/file/${data.uuid}/metadata`, {
                method: "PATCH",
                body: JSON.stringify(update),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`
                }
            });

            if (!response.ok) throw response;

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit media metadata</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="rating" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Rating" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="releaseYear" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Release Year" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="thumbnail" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="thumbnail" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="flex justify-end w-full pt-4">
                            <Button disabled={form.formState.isSubmitting} type="submit" size="sm">
                                <Save className="mr-2" />
                                <span>Save</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditMetadataDialog;