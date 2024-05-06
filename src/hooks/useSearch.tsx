import { useContentsApi } from '../context/ApiContext';
import { useQuery } from '@tanstack/react-query';
import { GetResult } from '../api/api';

type Props = {
  keyword: string | null;
};

export default function useSearch({ keyword }: Props) {
  const { contentsApi } = useContentsApi();

  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<GetResult>(['searchMovie', keyword], () =>
      contentsApi.search({ mediaType: 'movie', keyword, page: 1 })
    );

  const { data: searchTV, isLoading: searchTVLoading } = useQuery<GetResult>(
    ['searchTV', keyword],
    () => contentsApi.search({ mediaType: 'tv', keyword, page: 1 })
  );

  const loading = searchMovieLoading || searchTVLoading;

  return { searchMovie, searchTV, loading };
}
