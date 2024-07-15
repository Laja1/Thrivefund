import { useQuery, QueryKey } from '@tanstack/react-query';
import axios from 'axios';

export default function fundraiseFetch<T>(url: string, queryKey: QueryKey, token: string | null) {
    return useQuery<T>({
        queryKey: queryKey,
        queryFn: async () => {
            if (!token) {
                throw new Error('No token provided');
            }
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new Error(`Error fetching data: ${error.message}`);
                } else {
                    throw new Error('An unexpected error occurred');
                }
            }
        },
        enabled: !!token,
    });
}