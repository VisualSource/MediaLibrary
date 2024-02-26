import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useAuth from "@/hooks/useAuth";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

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
    const { handleSubmit, register } = useForm<State>();

    const onSubmit = async (state: State) => {
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


    }

    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 flex flex-col container">
                <Input {...register("file", { required: true })} name="file" type="file" multiple={false} accept="video/*,audio/*" />

                <Input {...register("name")} name="name" placeholder="Name" />
                <Input {...register("thumbnail")} placeholder="Thumbnail" />
                <Input {...register("rating")} name="name" placeholder="Rating" />
                <Input {...register("releaseYear", { valueAsNumber: true })} type="number" name="name" placeholder="Release Year" />
                <select {...register("type", { required: true })}>
                    <option value="movie">Movie</option>
                    <option value="series">Serie</option>
                    <option value="audio">Audio</option>
                </select>



                <Button type="submit">Upload</Button>
            </form>
        </div>
    );
}

export const Route = createFileRoute('/_authenticated/_root/upload')({
    component: Upload
});