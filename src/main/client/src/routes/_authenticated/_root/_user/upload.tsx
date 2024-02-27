import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import useAuth from "@/hooks/useAuth";

type State = {
    file: FileList,
    rating?: string;
    releaseYear: number;
    type: string;
    name: string;
    thumbnail: string;
}

const Upload: React.FC = () => {
    const auth = useAuth();
    const form = useForm<State>();

    const onSubmit = async (state: State) => {
        try {
            const formData = new FormData();
            const file = state.file.item(0);
            if (!file) throw new Error("No file to upload");
            formData.set("file", file);

            formData.set("metadata", JSON.stringify({
                type: state.type,
                thumbnail: state.thumbnail,
                releaseYear: state.releaseYear,
                rating: state.rating,
                name: state.name
            }));

            const session = await auth.ctx.getSession();
            if (!session) throw new Error("Failed to get session");

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/file/upload`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${session.accessToken}`
                }
            });

            if (!response.ok) {
                throw response;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className='flex flex-col gap-2 py-6 md:py-4 lg:px-2 border-b'>
                <h2 className="text-2xl font-bold tracking-tight">Upload Content</h2>
                <p>Upload content to server</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col container">

                    <FormField rules={{ required: true }} name="type" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content Type</FormLabel>
                            <FormControl>
                                <Select defaultValue="movie" value={field.value} onValueChange={field.onChange} disabled={field.disabled}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="movie">Movie</SelectItem>
                                        <SelectItem value="series">Series</SelectItem>
                                        <SelectItem value="audio">Audio</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                The type of media that will be uploaded.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField rules={{ required: true }} name="file" control={form.control} render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                                <Input {...field} value={value as never} className="dark:file:text-white" onChange={onChange} type="file" multiple={false} accept="video/*,audio/*" />
                            </FormControl>
                            <FormDescription>The file to be uploaded</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField rules={{ required: true }} control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Media name" />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField rules={{ required: true }} control={form.control} name="thumbnail" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Media thumbnail" />
                            </FormControl>
                            <FormDescription>
                                The thumbnail image that will be displayed before a video or audio media is loaded
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />


                    <FormField rules={{ required: true }} control={form.control} name="rating" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="PG" />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField rules={{ required: true }} control={form.control} name="releaseYear" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" placeholder="Release Year" />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <Button disabled={form.formState.isSubmitting} type="submit">Upload</Button>
                </form>
            </Form>

        </div>
    );
}

export const Route = createFileRoute('/_authenticated/_root/_user/upload')({
    component: Upload
});