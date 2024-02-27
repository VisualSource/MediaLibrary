import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";

const DeleteMediaDialog: React.FC<{ uuid: string }> = ({ uuid }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const tokens = await auth.ctx.getSession();
            if (!tokens) throw new Error("Unable to make request");
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/file/${uuid}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${tokens.accessToken}`
                }
            });

            if (!response.ok) throw new Error("Failed to delete content");

            navigate({ to: "/" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this media
                        and remove data from the servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isLoading} onClick={onSubmit}>
                        Yes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteMediaDialog;