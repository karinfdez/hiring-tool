import {useQuery} from "@tanstack/react-query";

export function useCandidates() {
    return useQuery({
        queryKey: ['candidates'],
        queryFn: async () => {
            const response = await fetch('/api/candidates');

            if(!response.ok) {
                throw new Error('Failed to fetch candidates');
            }
            return response.json();
        },
    })
}