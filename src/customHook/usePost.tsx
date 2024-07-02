import { useQueryClient, useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios';

export default function usePost(url: string, queryKey: string[]) {
  const queryClient = useQueryClient()
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const res = await axios.post(url, data);
        return {
          data: res.data,
          status: res.status,
          ok: res.status >= 200 && res.status < 300,
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          throw {
            data: axiosError.response?.data,
            status: axiosError.response?.status,
            ok: false,
          };
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })

  return { mutate, isPending, isError };
}