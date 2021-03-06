import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  GetMoivesResult,
  getNowPlayMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
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
    useQuery<GetMoivesResult>(['movies', 'nowPlaying', 1], () =>
      getNowPlayMovies(1)
    );
  const { data: nowPlaying2, isLoading: nowPlayingLoading2 } =
    useQuery<GetMoivesResult>(['movies', 'nowPlaying', 2], () =>
      getNowPlayMovies(2)
    );
  const { data: nowPlaying3, isLoading: nowPlayingLoading3 } =
    useQuery<GetMoivesResult>(['movies', 'nowPlaying', 3], () =>
      getNowPlayMovies(3)
    );
  const { data: upComing1, isLoading: upComingLoading } =
    useQuery<GetMoivesResult>(['movies', 'upComing', 1], () =>
      getUpcomingMovies(1)
    );
  const { data: upComing2, isLoading: upComingLoading2 } =
    useQuery<GetMoivesResult>(['movies', 'upComing', 2], () =>
      getUpcomingMovies(2)
    );
  const { data: upComing3, isLoading: upComingLoading3 } =
    useQuery<GetMoivesResult>(['movies', 'upComing', 3], () =>
      getUpcomingMovies(3)
    );
  const { data: popular1, isLoading: popularLoading } =
    useQuery<GetMoivesResult>(['movies', 'popular', 1], () =>
      getPopularMovies(1)
    );
  const { data: popular2, isLoading: popularLoading2 } =
    useQuery<GetMoivesResult>(['movies', 'popular', 2], () =>
      getPopularMovies(2)
    );
  const { data: popular3, isLoading: popularLoading3 } =
    useQuery<GetMoivesResult>(['movies', 'popular', 3], () =>
      getPopularMovies(3)
    );

  const { data: topRate1, isLoading: topRateLoading } =
    useQuery<GetMoivesResult>(['movies', 'topRate', 1], () =>
      getTopRatedMovies(1)
    );
  const { data: topRate2, isLoading: topRateLoading2 } =
    useQuery<GetMoivesResult>(['movies', 'topRate', 2], () =>
      getTopRatedMovies(2)
    );
  const { data: topRate3, isLoading: topRateLoading3 } =
    useQuery<GetMoivesResult>(['movies', 'topRate', 3], () =>
      getTopRatedMovies(3)
    );
  // ??? ?????? ???????????? ???????????????

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
                title="?????? ?????? ?????? ??????"
                mediaType="movie"
              />
            )}

            {upComingArray && (
              <MovieSlider
                key="upComkey"
                movieApi={upComingArray}
                title="?????? ?????? ??????"
                mediaType="movie"
              />
            )}
            {popularArray && (
              <MovieSlider
                key="popkey"
                movieApi={popularArray}
                title="?????? ?????? ??????"
                mediaType="movie"
              />
            )}
            {topRateingArray && (
              <MovieSlider
                key="topkey"
                movieApi={topRateingArray}
                title="?????? ?????? ??????"
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
