import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getNowPlayMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoivesResult,
} from "../api";
import { makeImagePath } from "../utilities";
import MovieModal from "../Components/MovieModal";
import MovieSlider from "../Components/MovieSlider";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 58px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Overview = styled.p`
  font-size: 23px;
  width: 50%;
  line-height: 1.5;
`;

const Detail = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: ${(props) => props.theme.white.lighter};
  border: none;
  width: 150px;
  padding: 10px;
  margin-top: 20px;
  &:hover {
    transform: scale(1.1);
  }
`;

const Container = styled.div`
  position: relative;
  top: -100px;
`;

function Movie() {
  const navigate = useNavigate();
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMoivesResult>(["movies", "nowPlaying"], getNowPlayMovies);
  const { data: upComing, isLoading: upComingLoading } =
    useQuery<IGetMoivesResult>(["movies", "upComing"], getUpcomingMovies);
  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetMoivesResult>(["movies", "popular"], getPopularMovies);
  const { data: topRate, isLoading: topRateLoading } =
    useQuery<IGetMoivesResult>(["movies", "topRate"], getTopRatedMovies);
  const loading =
    nowPlayingLoading || upComingLoading || popularLoading || topRateLoading;

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>
              {nowPlaying?.results[0].overview.length! > 231
                ? `${nowPlaying?.results[0].overview.slice(0, 231)}...`
                : nowPlaying?.results[0].overview}
            </Overview>
            <Detail onClick={() => onBoxClicked(nowPlaying?.results[0].id!)}>
              상세 정보
            </Detail>
          </Banner>

          <Container>
            {nowPlaying ? (
              <MovieSlider
                key="nowkey"
                movieApi={nowPlaying}
                title="현재 상영 중인 영화"
              />
            ) : null}

            {upComing ? (
              <MovieSlider
                key="upComkey"
                movieApi={upComing}
                title="개봉 예정 영화"
              />
            ) : null}
            {popular ? (
              <MovieSlider
                key="popkey"
                movieApi={popular}
                title="인기 있는 영화"
              />
            ) : null}
            {topRate ? (
              <MovieSlider
                key="topkey"
                movieApi={topRate}
                title="평점 높은 영화"
              />
            ) : null}
          </Container>
          <MovieModal />
        </>
      )}
    </Wrapper>
  );
}

export default Movie;
