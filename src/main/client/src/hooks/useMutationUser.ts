import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_USER } from '@auth/context';
import useAuth, { User } from "./useAuth";

type MutationRequest = {
    username?: string;
    email?: string;
    avatar?: string;
};

const useMutationUser = () => {
    const auth = useAuth();
    const queryClient = useQueryClient();

    const m = useMutation({
        mutationFn: async (data: MutationRequest) => {
            if (!auth.ctx.isAuthenticated()) throw new Error("Unable to update");
            const tokens = await auth.ctx.getSession();

            if (!tokens) throw new Error("Update to make request");

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Authorization": `Bearer ${tokens.accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw response;

            return response.json() as Promise<User>;
        },
        onMutate: async (data: MutationRequest) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_USER] });
            const previous = queryClient.getQueryData([QUERY_USER]);

            queryClient.setQueryData([QUERY_USER], (old: User | undefined) => {
                if (!old) return;

                if (data.avatar) old.avatar = data.avatar
                if (data.email) old.email = data.email;
                if (data.username) old.username = data.username;

                return { ...old };
            });

            return { previous };
        },
        onError: (err, _item, context) => {
            console.error(err);
            queryClient.setQueryData([QUERY_USER], context?.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_USER] });
        }
    });

    return m;
}

export default useMutationUser;