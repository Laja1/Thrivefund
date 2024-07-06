import { useQuery, QueryKey } from '@tanstack/react-query';
import axios from 'axios';



export default function useFetchHeader<T>(url:string, queryKey:QueryKey, token:any) {
    const { data, isLoading, error } = useQuery<T>({
        queryKey: queryKey,
        queryFn: async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                 console.log(response.data);
                return response.data;
            } catch (error) {
                throw new Error(`Error fetching data: ${error}`);
            }
        }
    });
    
    return { data, isLoading, error };
}
