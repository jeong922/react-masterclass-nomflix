import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getAiringTodayTV,
  getLatestMovies,
  getLatestTV,
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTV,
  IGetMoivesResult,
  ILatest,
} from "../api";
import { makeImagePath } from "../utilities";
import MovieModal from "../Components/MovieModal";
import MovieSlider from "../Components/MovieSlider";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import TvModal from "../Components/TvModal";
import MovieSliderLatest from "../Components/MovieSliderLatest";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
`;

// const Loader = styled.div`
//   height: 20vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

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

const Detail = styled(motion.button)`
  background-color: rgba(255, 255, 255, 0.2);
  color: ${(props) => props.theme.white.lighter};
  border: none;
  width: 150px;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
`;

function Tv() {
  const navigate = useNavigate();
  const { data: onTheAir, isLoading: onTheAirLoading } =
    useQuery<IGetMoivesResult>(["Tv", "nowPlaying"], getOnTheAirTV);
  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetMoivesResult>(["Tv", "popular"], getPopularTV);
  const { data: airing, isLoading: airingLoading } = useQuery<IGetMoivesResult>(
    ["Tv", "upComing"],
    getAiringTodayTV
  );
  const { data: topRate, isLoading: topRateLoading } =
    useQuery<IGetMoivesResult>(["Tv", "topRate"], getTopRatedTV);
  const { data: latest, isLoading: latestLoading } = useQuery<ILatest>(
    ["Tv", "latest"],
    getLatestTV
  );

  const onBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
  };

  const loading =
    onTheAirLoading ||
    airingLoading ||
    popularLoading ||
    topRateLoading ||
    latestLoading;
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(onTheAir?.results[0].backdrop_path || "")}
          >
            <Title>{onTheAir?.results[0].name}</Title>
            <Overview>
              {onTheAir?.results[0].overview.length! > 231
                ? `${onTheAir?.results[0].overview.slice(0, 231)}...`
                : onTheAir?.results[0].overview}
            </Overview>
            <Detail
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              onClick={() => onBoxClicked(onTheAir?.results[0].id!)}
            >
              상세 정보
            </Detail>
          </Banner>

          <Container>
            {onTheAir ? (
              <MovieSlider
                key="airkey"
                movieApi={onTheAir}
                title="현재 방송 중인 TV쇼"
                mediaType="tv"
              />
            ) : null}
            {popular ? (
              <MovieSlider
                key="popTkey"
                movieApi={popular}
                title="인기 있는 TV쇼"
                mediaType="tv"
              />
            ) : null}
            {airing ? (
              <MovieSlider
                key="airingkey"
                movieApi={airing}
                title="오늘 방송하는 TV쇼"
                mediaType="tv"
              />
            ) : null}
            {topRate ? (
              <MovieSlider
                key="topTkey"
                movieApi={topRate}
                title="평점 높은 TV쇼"
                mediaType="tv"
              />
            ) : null}
            {latest ? (
              <MovieSliderLatest
                key="latestTkey"
                movieApi={latest}
                title="최신 TV쇼"
                mediaType="tv"
              />
            ) : null}
          </Container>
          <TvModal />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
