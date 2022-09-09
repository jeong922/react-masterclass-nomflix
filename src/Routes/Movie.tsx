import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getNowPlay,
  getPopular,
  GetResult,
  getTopRated,
  getUpcoming,
} from '../api/api';
import Detail from '../Components/detail';
import MovieSlider from '../Components/slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/loader';
import Banner from '../Components/banner';
import Header from '../Components/header';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

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

interface MovieProps {
  setId: Dispatch<SetStateAction<number>>;
}

function Movie({ setId }: MovieProps) {
  const bigMatchMovie = useMatch('/movies/:Id');
  const matchMovieId = bigMatchMovie?.params.Id + '';
  const [nowPlaying, setNowPlaying] = useState();
  const [upComing, setUpComing] = useState();
  const [popular, setPopular] = useState();
  const [topRating, setTopRating] = useState();

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
    const nowPlaying: any = [];
    nowPlaying1?.results.map((item) => nowPlaying.push(item));
    nowPlaying2?.results.map((item) => nowPlaying.push(item));
    setNowPlaying(nowPlaying);
  }, [nowPlaying1?.results, nowPlaying2?.results]);

  useEffect(() => {
    const upComing: any = [];
    upComing1?.results.map((item) => upComing.push(item));
    upComing2?.results.map((item) => upComing.push(item));
    setUpComing(upComing);
  }, [upComing1?.results, upComing2?.results]);

  useEffect(() => {
    const popular: any = [];
    popular1?.results.map((item) => popular.push(item));
    popular2?.results.map((item) => popular.push(item));
    setPopular(popular);
  }, [popular1?.results, popular2?.results]);

  useEffect(() => {
    const topRating: any = [];
    topRate1?.results.map((item) => topRating.push(item));
    topRate2?.results.map((item) => topRating.push(item));
    setTopRating(topRating);
  }, [topRate1?.results, topRate2?.results]);

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
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Banner movieApi={nowPlaying1} mediaType="movie" />
          <Container>
            {nowPlaying && (
              <MovieSlider
                key="nowkey"
                movieApi={nowPlaying}
                title="현재 상영 중인 영화"
                mediaType="movie"
              />
            )}

            {upComing && (
              <MovieSlider
                key="upComkey"
                movieApi={upComing}
                title="개봉 예정 영화"
                mediaType="movie"
              />
            )}
            {popular && (
              <MovieSlider
                key="popkey"
                movieApi={popular}
                title="인기 있는 영화"
                mediaType="movie"
              />
            )}
            {topRating && (
              <MovieSlider
                key="topkey"
                movieApi={topRating}
                title="평점 높은 영화"
                mediaType="movie"
              />
            )}
          </Container>
        </>
      )}
      {bigMatchMovie && (
        <Detail
          matchId={matchMovieId}
          mediaType={'movie'}
          where={'movies'}
          setId={setId}
        />
      )}
    </Wrapper>
  );
}

export default React.memo(Movie);
