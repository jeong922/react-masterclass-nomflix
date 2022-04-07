import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getAiringTodayTV,
  getLatestMovies,
  getLatestTV,
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTV,
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

const Container = styled.div`
  position: relative;
  top: -100px;
`;

function Tv() {
  const navigate = useNavigate();
  const bigMatchTv = useMatch('/tv/:Id');
  const matchTvId = String(bigMatchTv?.params.Id);
  const { data: onTheAir, isLoading: onTheAirLoading } =
    useQuery<IGetMoivesResult>(['Tv', 'nowPlaying'], getOnTheAirTV);
  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetMoivesResult>(['Tv', 'popular'], getPopularTV);
  const { data: airing, isLoading: airingLoading } = useQuery<IGetMoivesResult>(
    ['Tv', 'upComing'],
    getAiringTodayTV
  );
  const { data: topRate, isLoading: topRateLoading } =
    useQuery<IGetMoivesResult>(['Tv', 'topRate'], getTopRatedTV);
  const { data: latest, isLoading: latestLoading } = useQuery<ILatest>(
    ['Tv', 'latest'],
    getLatestTV
  );

  const scrollData = document.body.style.top;
  const scrollPosition = +scrollData.replace(/[^0-9]/g, '');

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
          <Banner movieApi={onTheAir} mediaType="tv" />

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
          </Container>
          <MovieModal
            matchId={matchTvId}
            mediaType={'tv'}
            where={'tv'}
            scrollPosition={scrollPosition}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
