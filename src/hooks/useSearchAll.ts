import { useInfiniteQuery } from '@tanstack/react-query';
import { useContentsApi } from '../context/ApiContext';
import { MediaType } from '../model/type';

type Props = {
  keyword: string | null;
  mediaType: MediaType;
};

export default function useSearchAll({ keyword, mediaType }: Props) {
  const { contentsApi } = useContentsApi();

  const {
    data: searchAll,
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [mediaType, keyword],
    queryFn: ({ pageParam = 1 }) => contentsApi.search({ mediaType, keyword, page: pageParam }),
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 5) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  return { searchAll, isLoading, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage };
}
