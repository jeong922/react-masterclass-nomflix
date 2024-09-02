import { useQuery } from '@tanstack/react-query';
import { GetResult } from '../api/api';
import { useContentsApi } from '../context/ApiContext';
import { makeDataArray } from '../utils/utilities';

export default function useMovie() {
  const { contentsApi } = useContentsApi();

  const { data: nowPlaying1, isLoading: nowPlayingLoading } = useQuery<GetResult>(
    ['movieNowPlaying1'],
    () => contentsApi.getNowPlay(1),
    {
      staleTime: 1000 * 60,
    }
  );

  const { data: nowPlaying2, isLoading: nowPlayingLoading2 } = useQuery<GetResult>(
    ['movieNowPlaying2'],
    () => contentsApi.getNowPlay(2),
    {
      staleTime: 1000 * 60,
    }
  );

  const { data: upComing1, isLoading: upComingLoading } = useQuery<GetResult>(
    ['movieUpComing1'],
    () => contentsApi.getUpcoming(1),
    {
      staleTime: 1000 * 60,
    }
  );
  const { data: upComing2, isLoading: upComingLoading2 } = useQuery<GetResult>(
    ['movieUpComing2'],
    () => contentsApi.getUpcoming(2),
    {
      staleTime: 1000 * 60,
    }
  );

  const { data: popular1, isLoading: popularLoading } = useQuery<GetResult>(
    ['moviePopular1'],
    () => contentsApi.getPopular('movie', 1),
    {
      staleTime: 1000 * 60,
    }
  );
  const { data: popular2, isLoading: popularLoading2 } = useQuery<GetResult>(
    ['moviePopular2'],
    () => contentsApi.getPopular('movie', 2),
    {
      staleTime: 1000 * 60,
    }
  );

  const { data: topRate1, isLoading: topRateLoading } = useQuery<GetResult>(
    ['movieTopRate1'],
    () => contentsApi.getTopRated('movie', 1),
    {
      staleTime: 1000 * 60,
    }
  );

  const { data: topRate2, isLoading: topRateLoading2 } = useQuery<GetResult>(
    ['movieTopRate2'],
    () => contentsApi.getTopRated('movie', 2),
    {
      staleTime: 1000 * 60,
    }
  );

  const nowPlaying = makeDataArray(nowPlaying1?.results, nowPlaying2?.results);
  const upComing = makeDataArray(upComing1?.results, upComing2?.results);
  const popular = makeDataArray(popular1?.results, popular2?.results);
  const topRating = makeDataArray(topRate1?.results, topRate2?.results);

  const loading =
    nowPlayingLoading ||
    nowPlayingLoading2 ||
    upComingLoading ||
    upComingLoading2 ||
    popularLoading ||
    popularLoading2 ||
    topRateLoading ||
    topRateLoading2;

  return { nowPlaying1, nowPlaying, upComing, popular, topRating, loading };
}
