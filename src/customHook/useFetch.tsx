import { useQuery, QueryKey } from '@tanstack/react-query'

type FetchData = {
    url: string;
    queryKey: QueryKey;
}

export default function useFetch<T>({ url, queryKey }: FetchData) {
    const { data, isLoading, error } = useQuery<T>({
        queryKey: queryKey,
        queryFn: () => fetch(url).then((res) => res.json()),
        staleTime: 6000
        
    })
    
    return { data, isLoading, error }
}