import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  GetContents,
  getNowPlay,
  getPopular,
  GetResult,
  getTopRated,
  getUpcoming,
} from '../api/api';
import VideoDetail from '../Components/VideoDetail';
import MovieSlider from '../Components/Slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/Loader';
import Banner from '../Components/Banner';
import React, { useEffect, useState } from 'react';

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
  const [nowPlaying, setNowPlaying] = useState<undefined | GetContents[]>();
  const [upComing, setUpComing] = useState<undefined | GetContents[]>();
  const [popular, setPopular] = useState<undefined | GetContents[]>();
  const [topRating, setTopRating] = useState<undefined | GetContents[]>();

  const { data: nowPlaying1, isLoading: nowPlayingLoading } =
    useQuery<GetResult>(['movieNowPlaying1', getNowPlay], () => getNowPlay(1));
  const { data: nowPlaying2, isLoading: nowPlayingLoading2 } =
    useQuery<GetResult>(['movieNowPlaying2', getNowPlay], () => getNowPlay(2));

  const { data: upComing1, isLoading: upComingLoading } = useQuery<GetResult>(
    ['movieUpComing1'],
    () => getUpcoming(1)
  );
  const { data: upComing2, isLoading: upComingLoading2 } = useQuery<GetResult>(
    ['movieUpComing2'],
    () => getUpcoming(2)
  );

  const { data: popular1, isLoading: popularLoading } = useQuery<GetResult>(
    ['moviePopular1'],
    () => getPopular('movie', 1)
  );
  const { data: popular2, isLoading: popularLoading2 } = useQuery<GetResult>(
    ['moviePopular2'],
    () => getPopular('movie', 2)
  );

  const { data: topRate1, isLoading: topRateLoading } = useQuery<GetResult>(
    ['movieTopRate1'],
    () => getTopRated('movie', 1)
  );

  const { data: topRate2, isLoading: topRateLoading2 } = useQuery<GetResult>(
    ['movieTopRate2'],
    () => getTopRated('movie', 2)
  );

  // 더 좋은 방법은 없는 것인가..
  useEffect(() => {
    if (nowPlaying1?.results && nowPlaying2?.results) {
      const nowPlayingData = [
        nowPlaying1?.results,
        nowPlaying2?.results,
      ].flatMap((item) => item);
      setNowPlaying(nowPlayingData);
    }
  }, [nowPlaying1?.results, nowPlaying2?.results]);

  useEffect(() => {
    if (upComing1 && upComing2) {
      const upComingData = [upComing1?.results, upComing2?.results].flatMap(
        (item) => item
      );
      setUpComing(upComingData);
    }
  }, [upComing1, upComing2]);

  useEffect(() => {
    if (popular1 && popular2) {
      const popularData = [popular1?.results, popular2?.results].flatMap(
        (item) => item
      );
      setPopular(popularData);
    }
  }, [popular1, popular2]);

  useEffect(() => {
    if (topRate1 && topRate2) {
      const topRateData = [topRate1?.results, topRate2?.results].flatMap(
        (item) => item
      );
      setTopRating(topRateData);
    }
  }, [topRate1, topRate2]);

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
        <VideoDetail
          matchId={matchMovieId}
          mediaType={'movie'}
          where={'movies'}
        />
      )}
    </Wrapper>
  );
}

export default Movie;
