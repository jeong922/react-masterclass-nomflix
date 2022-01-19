import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getAiringTodayTV,
  getNowPlayMovies,
  getOnTheAirTV,
  getPopularMovies,
  getPopularTV,
  getTopRatedMovies,
  getTopRatedTV,
  getUpcomingMovies,
  IGetMoivesResult,
  IGetTvsResult,
} from "../api";
import { makeImagePath } from "../utilities";
import MovieModal from "../Components/MovieModal";
import MovieSlider from "../Components/MovieSlider";
import TvSlider from "../Components/TvSlider";

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
`;

const Container = styled.div`
  position: relative;
  top: -100px;
`;

function Tv() {
  const { data: onTheAir, isLoading: onTheAirLoading } =
    useQuery<IGetTvsResult>(["Tv", "nowPlaying"], getOnTheAirTV);
  const { data: popular, isLoading: popularLoading } = useQuery<IGetTvsResult>(
    ["Tv", "popular"],
    getPopularTV
  );
  const { data: airing, isLoading: airingLoading } = useQuery<IGetTvsResult>(
    ["Tv", "upComing"],
    getAiringTodayTV
  );
  const { data: topRate, isLoading: topRateLoading } = useQuery<IGetTvsResult>(
    ["Tv", "topRate"],
    getTopRatedTV
  );

  const loading =
    onTheAirLoading || airingLoading || popularLoading || topRateLoading;
  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(onTheAir?.results[0].backdrop_path || "")}
          >
            <Title>{onTheAir?.results[0].name}</Title>
            <Overview>{onTheAir?.results[0].overview}</Overview>
          </Banner>

          <Container>
            {onTheAir ? (
              <TvSlider
                key="airkey"
                movieApi={onTheAir}
                title="현재 방송 중인 TV쇼"
              />
            ) : null}
            {popular ? (
              <TvSlider
                key="popTkey"
                movieApi={popular}
                title="인기 있는 TV쇼"
              />
            ) : null}
            {airing ? (
              <TvSlider
                key="airingkey"
                movieApi={airing}
                title="오늘 방송하는 TV쇼"
              />
            ) : null}
            {topRate ? (
              <TvSlider
                key="topTkey"
                movieApi={topRate}
                title="평점 높은 TV쇼"
              />
            ) : null}
          </Container>
          {/* <MovieModal /> */}
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
