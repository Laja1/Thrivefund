// customHook/usePatch.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const usePatch = (url: string, queryKey: string[], token:any) => {
  const queryClient = useQueryClient();

    const { mutate, isPending}=useMutation({
      mutationFn: (data: any) => axios.patch(url, data, {
                headers: {
                        Authorization: `Bearer ${token}`,
                    },
      }),
        
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
   });
    return { mutate, isPending}
};

export default usePatch;