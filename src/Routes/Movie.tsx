import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getNowPlay,
  getPopular,
  GetResult,
  getTopRated,
  getUpcoming,
} from '../api';
import Detail from '../Components/detail';
import MovieSlider from '../Components/slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/loader';
import Banner from '../Components/banner';
import Header from '../Components/header';
import React from 'react';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
  overflow-x: hidden;
`;

const Container = styled.div`
  position: relative;
  top: -100px;
  font-size: 1rem;
`;

function Movie() {
  const bigMatchMovie = useMatch('/movies/:Id');
  const matchMovieId = String(bigMatchMovie?.params.Id);
  const { data: nowPlaying1, isLoading: nowPlayingLoading } =
    useQuery<GetResult>(['movie', 'nowPlaying', 1], () => getNowPlay(1));
  const { data: nowPlaying2, isLoading: nowPlayingLoading2 } =
    useQuery<GetResult>(['movie', 'nowPlaying', 2], () => getNowPlay(2));
  const { data: nowPlaying3, isLoading: nowPlayingLoading3 } =
    useQuery<GetResult>(['movie', 'nowPlaying', 3], () => getNowPlay(3));
  const { data: upComing1, isLoading: upComingLoading } = useQuery<GetResult>(
    ['movie', 'upComing', 1],
    () => getUpcoming(1)
  );
  const { data: upComing2, isLoading: upComingLoading2 } = useQuery<GetResult>(
    ['movie', 'upComing', 2],
    () => getUpcoming(2)
  );
  const { data: upComing3, isLoading: upComingLoading3 } = useQuery<GetResult>(
    ['movie', 'upComing', 3],
    () => getUpcoming(3)
  );
  const { data: popular1, isLoading: popularLoading } = useQuery<GetResult>(
    ['movie', 'popular', 1],
    () => getPopular('movie', 1)
  );
  const { data: popular2, isLoading: popularLoading2 } = useQuery<GetResult>(
    ['movie', 'popular', 2],
    () => getPopular('movie', 2)
  );
  const { data: popular3, isLoading: popularLoading3 } = useQuery<GetResult>(
    ['movie', 'popular', 3],
    () => getPopular('movie', 3)
  );

  const { data: topRate1, isLoading: topRateLoading } = useQuery<GetResult>(
    ['movie', 'topRate', 1],
    () => getTopRated('movie', 1)
  );
  const { data: topRate2, isLoading: topRateLoading2 } = useQuery<GetResult>(
    ['movie', 'topRate', 2],
    () => getTopRated('movie', 2)
  );
  const { data: topRate3, isLoading: topRateLoading3 } = useQuery<GetResult>(
    ['movie', 'topRate', 3],
    () => getTopRated('movie', 3)
  );
  // ❗ 좀더 깔끔하게 만들어보기

  const nowPlayingArray: any = [];
  const upComingArray: any = [];
  const popularArray: any = [];
  const topRateingArray: any = [];
  nowPlaying1?.results.map((item) => nowPlayingArray.push(item));
  nowPlaying2?.results.map((item) => nowPlayingArray.push(item));
  nowPlaying3?.results.map((item) => nowPlayingArray.push(item));

  upComing1?.results.map((item) => upComingArray.push(item));
  upComing2?.results.map((item) => upComingArray.push(item));
  upComing3?.results.map((item) => upComingArray.push(item));

  popular1?.results.map((item) => popularArray.push(item));
  popular2?.results.map((item) => popularArray.push(item));
  popular3?.results.map((item) => popularArray.push(item));

  topRate1?.results.map((item) => topRateingArray.push(item));
  topRate2?.results.map((item) => topRateingArray.push(item));
  topRate3?.results.map((item) => topRateingArray.push(item));

  const loading =
    nowPlayingLoading ||
    nowPlayingLoading2 ||
    nowPlayingLoading3 ||
    upComingLoading ||
    upComingLoading2 ||
    upComingLoading3 ||
    popularLoading ||
    popularLoading2 ||
    popularLoading3 ||
    topRateLoading ||
    topRateLoading2 ||
    topRateLoading3;
  return (
    <Wrapper>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Banner movieApi={nowPlaying1} mediaType="movie" />
          <Container>
            {nowPlayingArray && (
              <MovieSlider
                key="nowkey"
                movieApi={nowPlayingArray}
                title="현재 상영 중인 영화"
                mediaType="movie"
              />
            )}

            {upComingArray && (
              <MovieSlider
                key="upComkey"
                movieApi={upComingArray}
                title="개봉 예정 영화"
                mediaType="movie"
              />
            )}
            {popularArray && (
              <MovieSlider
                key="popkey"
                movieApi={popularArray}
                title="인기 있는 영화"
                mediaType="movie"
              />
            )}
            {topRateingArray && (
              <MovieSlider
                key="topkey"
                movieApi={topRateingArray}
                title="평점 높은 영화"
                mediaType="movie"
              />
            )}
          </Container>
        </>
      )}
      <Detail matchId={matchMovieId} mediaType={'movie'} where={'movies'} />
    </Wrapper>
  );
}

export default React.memo(Movie);
