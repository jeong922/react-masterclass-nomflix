import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
import { makeImagePath } from '../utilities';
import MovieModal from '../Components/Modal';
import MovieSlider from '../Components/Slider';
import { useMatch, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import Banner from '../Components/Banner';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
`;

// const Banner = styled.div<{ bgPhoto: string }>`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 60px;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.bgPhoto});
//   background-size: cover;
//   background-position: center;
// `;

// const Title = styled.h2`
//   font-size: 58px;
//   margin-bottom: 20px;
//   font-weight: 600;
// `;

// const Overview = styled.p`
//   font-size: 23px;
//   width: 50%;
//   line-height: 1.5;
// `;

// const Detail = styled(motion.button)`
//   background-color: rgba(255, 255, 255, 0.2);
//   color: ${(props) => props.theme.white.lighter};
//   border: none;
//   width: 150px;
//   padding: 10px;
//   margin-top: 20px;
//   cursor: pointer;
// `;

const Container = styled.div`
  position: relative;
  top: -100px;
`;

function Movie() {
  // const navigate = useNavigate();
  const bigMatchMovie = useMatch('/movies/:Id');
  const matchMovieId = String(bigMatchMovie?.params.Id);
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMoivesResult>(['movies', 'nowPlaying'], getNowPlayMovies);
  const { data: upComing, isLoading: upComingLoading } =
    useQuery<IGetMoivesResult>(['movies', 'upComing'], getUpcomingMovies);
  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetMoivesResult>(['movies', 'popular'], getPopularMovies);
  const { data: topRate, isLoading: topRateLoading } =
    useQuery<IGetMoivesResult>(['movies', 'topRate'], getTopRatedMovies);
  const { data: latest, isLoading: latestLoading } = useQuery<ILatest>(
    ['movies', 'latest'],
    getLatestMovies
  );

  const scrollData = document.body.style.top;
  const scrollPosition = +scrollData.replace(/[^0-9]/g, '') + 50;

  const loading =
    nowPlayingLoading ||
    upComingLoading ||
    popularLoading ||
    topRateLoading ||
    latestLoading;
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Banner movieApi={nowPlaying} mediaType="movie" />
          <Container>
            {nowPlaying ? (
              <MovieSlider
                key="nowkey"
                movieApi={nowPlaying}
                title="현재 상영 중인 영화"
                mediaType="movie"
              />
            ) : null}

            {upComing ? (
              <MovieSlider
                key="upComkey"
                movieApi={upComing}
                title="개봉 예정 영화"
                mediaType="movie"
              />
            ) : null}
            {popular ? (
              <MovieSlider
                key="popkey"
                movieApi={popular}
                title="인기 있는 영화"
                mediaType="movie"
              />
            ) : null}
            {topRate ? (
              <MovieSlider
                key="topkey"
                movieApi={topRate}
                title="평점 높은 영화"
                mediaType="movie"
              />
            ) : null}
          </Container>
        </>
      )}
      <MovieModal
        matchId={matchMovieId}
        mediaType={'movie'}
        where={'movies'}
        scrollPosition={scrollPosition}
      />
    </Wrapper>
  );
}

export default Movie;
