import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getLatestMovies,
  getNowPlayMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoivesResult,
  ILatest,
} from '../api';
import MovieModal from '../Components/Modal';
import MovieSlider from '../Components/Slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/Loader';
import Banner from '../Components/Banner';
import Header from '../Components/Header';
import { useEffect, useState } from 'react';

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
  const bigMatchMovie = useMatch('/movies/:Id'); // 매개변수로 url을 넘기면 해당 url과 일치할 경우 url정보 반환, 일치 하지 않으면 null 반환
  const matchMovieId = String(bigMatchMovie?.params.Id); // useMatch 매개변수 url이 해당 url 일치할때 id를 받아옴
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { data: nowPlaying1, isLoading: nowPlayingLoading } =
    useQuery<IGetMoivesResult>(['movies', 'nowPlaying', 1], () =>
      getNowPlayMovies(1)
    );
  const { data: nowPlaying2, isLoading: nowPlayingLoading2 } =
    useQuery<IGetMoivesResult>(['movies', 'nowPlaying', 2], () =>
      getNowPlayMovies(2)
    );
  const { data: nowPlaying3, isLoading: nowPlayingLoading3 } =
    useQuery<IGetMoivesResult>(['movies', 'nowPlaying', 3], () =>
      getNowPlayMovies(3)
    );
  const { data: upComing1, isLoading: upComingLoading } =
    useQuery<IGetMoivesResult>(['movies', 'upComing', 1], () =>
      getUpcomingMovies(1)
    );
  const { data: upComing2, isLoading: upComingLoading2 } =
    useQuery<IGetMoivesResult>(['movies', 'upComing', 2], () =>
      getUpcomingMovies(2)
    );
  const { data: upComing3, isLoading: upComingLoading3 } =
    useQuery<IGetMoivesResult>(['movies', 'upComing', 3], () =>
      getUpcomingMovies(3)
    );
  const { data: popular1, isLoading: popularLoading } =
    useQuery<IGetMoivesResult>(['movies', 'popular', 1], () =>
      getPopularMovies(1)
    );
  const { data: popular2, isLoading: popularLoading2 } =
    useQuery<IGetMoivesResult>(['movies', 'popular', 2], () =>
      getPopularMovies(2)
    );
  const { data: popular3, isLoading: popularLoading3 } =
    useQuery<IGetMoivesResult>(['movies', 'popular', 3], () =>
      getPopularMovies(3)
    );

  const { data: topRate1, isLoading: topRateLoading } =
    useQuery<IGetMoivesResult>(['movies', 'topRate', 1], () =>
      getTopRatedMovies(1)
    );
  const { data: topRate2, isLoading: topRateLoading2 } =
    useQuery<IGetMoivesResult>(['movies', 'topRate', 2], () =>
      getTopRatedMovies(2)
    );
  const { data: topRate3, isLoading: topRateLoading3 } =
    useQuery<IGetMoivesResult>(['movies', 'topRate', 3], () =>
      getTopRatedMovies(3)
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
    nowPlayingLoading && upComingLoading && popularLoading && topRateLoading;
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
                windowSize={windowSize}
              />
            )}

            {upComingArray && (
              <MovieSlider
                key="upComkey"
                movieApi={upComingArray}
                title="개봉 예정 영화"
                mediaType="movie"
                windowSize={windowSize}
              />
            )}
            {popularArray && (
              <MovieSlider
                key="popkey"
                movieApi={popularArray}
                title="인기 있는 영화"
                mediaType="movie"
                windowSize={windowSize}
              />
            )}
            {topRateingArray && (
              <MovieSlider
                key="topkey"
                movieApi={topRateingArray}
                title="평점 높은 영화"
                mediaType="movie"
                windowSize={windowSize}
              />
            )}
          </Container>
        </>
      )}
      <MovieModal
        matchId={matchMovieId}
        mediaType={'movie'}
        where={'movies'}
        // scrollPosition={scrollPosition}
      />
    </Wrapper>
  );
}

export default Movie;
