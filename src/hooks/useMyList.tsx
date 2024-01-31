import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getMyList, addMyList, removeMyList } from '../api/firebase';

type MutationParams = {
  media: any;
  mediaType: string;
};

export default function useMyList() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const getList = useQuery(['my-list'], () => getMyList(uid));

  const updateMyList = useMutation(
    ({ media, mediaType }: MutationParams) =>
      addMyList(uid, media.id, media, mediaType),
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries({ queryKey: ['my-list'] });
        const previous = queryClient.getQueryData(['my-list']);
        queryClient.setQueriesData(['my-list'], (old: any) => [...old, data]);
        return { previous };
      },
      onSuccess: () => queryClient.invalidateQueries(['my-list', uid]),
    }
  );

  const deleteMyList = useMutation((id: number) => removeMyList(uid, id), {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['my-list'] });
      const previous = queryClient.getQueryData(['my-list']);
      queryClient.setQueriesData(['my-list'], (old: any) =>
        old.filter((v: any) => v.id !== data)
      );
      return { previous };
    },
    onSuccess: () => queryClient.invalidateQueries(['my-list', uid]),
  });

  return { getList, updateMyList, deleteMyList };
}
