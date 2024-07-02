import { useQueryClient, useMutation } from '@tanstack/react-query'

export default function usePost(url: string, queryKey: string[]) {
  const queryClient = useQueryClient()
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const responseData = await res.json();
      
      if (!res.ok) {
        throw {
          data: responseData,
          status: res.status,
          ok: res.ok,
        };
      }
      
      return {
        data: responseData,
        status: res.status,
        ok: res.ok,
      };
    
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })

  return { mutate, isPending, isError };
}