import { useQuery } from '@tanstack/react-query';
import { GetResult } from '../api/api';
import { useContentsApi } from '../context/ApiContext';
import { makeDataArray } from '../utilities';

export default function useTv() {
  const { contentsApi } = useContentsApi();

  const { data: onTheAir1, isLoading: onTheAirLoading } = useQuery<GetResult>(
    ['tvNowPlaying1'],
    () => contentsApi.getOnTheAir(1),
    {
      staleTime: 1000 * 60,
    }
  );
  const { data: onTheAir2, isLoading: onTheAirLoading2 } = useQuery<GetResult>(
    ['tvNowPlaying2'],
    () => contentsApi.getOnTheAir(2),
    {
      staleTime: 1000 * 60,
    }
  );

  const { data: popular1, isLoading: popularLoading } = useQuery<GetResult>(
    ['tvPopular1'],
    () => contentsApi.getPopular('tv', 1),
    {
      staleTime: 1000 * 60,
    }
  );
  const { data: popular2, isLoading: popularLoading2 } = useQuery<GetResult>(
    ['tvPopular2'],
    () => contentsApi.getPopular('tv', 2),
    {
      staleTime: 1000 * 60,
    }
  );

  const { data: airing1, isLoading: airingLoading } = useQuery<GetResult>(
    ['tvUpComing1'],
    () => contentsApi.getAiringToday(1),
    {
      staleTime: 1000 * 60,
    }
  );
  const { data: airing2, isLoading: airingLoading2 } = useQuery<GetResult>(
    ['tvUpComing2'],
    () => contentsApi.getAiringToday(2),
    {
      staleTime: 1000 * 60,
    }
  );

  const { data: topRate1, isLoading: topRateLoading } = useQuery<GetResult>(
    ['tvTopRate1'],
    () => contentsApi.getTopRated('tv', 1),
    {
      staleTime: 1000 * 60,
    }
  );
  const { data: topRate2, isLoading: topRateLoading2 } = useQuery<GetResult>(
    ['tvTopRate2'],
    () => contentsApi.getTopRated('tv', 2),
    {
      staleTime: 1000 * 60,
    }
  );

  const onTheAir = makeDataArray(onTheAir1?.results, onTheAir2?.results);
  const airing = makeDataArray(airing1?.results, airing2?.results);
  const popular = makeDataArray(popular1?.results, popular2?.results);
  const topRating = makeDataArray(topRate1?.results, topRate2?.results);

  const loading =
    onTheAirLoading ||
    onTheAirLoading2 ||
    airingLoading ||
    airingLoading2 ||
    popularLoading ||
    popularLoading2 ||
    topRateLoading ||
    topRateLoading2;

  return { onTheAir1, onTheAir, airing, popular, topRating, loading };
}
