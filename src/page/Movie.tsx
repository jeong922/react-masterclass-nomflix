import React, { useEffect } from 'react';
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
  font-size: 1rem;
  width: 100%;
  overflow-x: hidden;
`;

function Movie() {
  const bigMatchMovie = useMatch('/movies/:Id');
  const matchMovieId = bigMatchMovie?.params.Id + '';
  const { contentsApi } = useContentsApi();

  const { data: nowPlaying1, isLoading: nowPlayingLoading } =
    useQuery<GetResult>(['movieNowPlaying1'], () => contentsApi.getNowPlay(1), {
      staleTime: 1000 * 60,
    });
  const { data: nowPlaying2, isLoading: nowPlayingLoading2 } =
    useQuery<GetResult>(['movieNowPlaying2'], () => contentsApi.getNowPlay(2), {
      staleTime: 1000 * 60,
    });

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 더 좋은 방법은 없는 것인가..
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

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Banner movieApi={nowPlaying1} mediaType='movie' />
          <Container>
            {nowPlaying && (
              <MovieSlider
                key='nowkey'
                movieApi={nowPlaying}
                title='현재 상영 중인 영화'
                mediaType='movie'
              />
            )}

            {upComing && (
              <MovieSlider
                key='upComkey'
                movieApi={upComing}
                title='개봉 예정 영화'
                mediaType='movie'
              />
            )}
            {popular && (
              <MovieSlider
                key='popkey'
                movieApi={popular}
                title='인기 있는 영화'
                mediaType='movie'
              />
            )}
            {topRating && (
              <MovieSlider
                key='topkey'
                movieApi={topRating}
                title='평점 높은 영화'
                mediaType='movie'
              />
            )}
          </Container>
        </>
      )}
      {bigMatchMovie && (
        <VideoDetail matchId={matchMovieId} mediaType='movie' where='movies' />
      )}
    </Wrapper>
  );
}

export default Movie;
