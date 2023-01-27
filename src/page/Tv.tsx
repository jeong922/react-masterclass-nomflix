import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { GetResult } from '../api/api';
import VideoDetail from '../Components/VideoDetail';
import MovieSlider from '../Components/Slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/Loader';
import Banner from '../Components/Banner';
import { useContentsApi } from '../context/ApiContext';
import { makeDataArray } from '../utilities';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
  overflow-x: hidden;
`;

const Container = styled.div`
  position: relative;
  top: -100px;
`;

function Tv() {
  const bigMatchTv = useMatch('/tv/:Id');
  const matchTvId = bigMatchTv?.params.Id + '';
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

  // 더 좋은 방법은 없는 것인가..
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

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Banner movieApi={onTheAir1} mediaType='tv' />

          <Container>
            {onTheAir && (
              <MovieSlider
                key='airkey'
                movieApi={onTheAir}
                title='현재 방송 중인 TV쇼'
                mediaType='tv'
              />
            )}
            {popular && (
              <MovieSlider
                key='popTkey'
                movieApi={popular}
                title='인기 있는 TV쇼'
                mediaType='tv'
              />
            )}
            {airing && (
              <MovieSlider
                key='airingkey'
                movieApi={airing}
                title='오늘 방송하는 TV쇼'
                mediaType='tv'
              />
            )}
            {topRating && (
              <MovieSlider
                key='topTkey'
                movieApi={topRating}
                title='평점 높은 TV쇼'
                mediaType='tv'
              />
            )}
          </Container>
          {bigMatchTv && (
            <VideoDetail matchId={matchTvId} mediaType={'tv'} where={'tv'} />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
