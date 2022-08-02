import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getNowPlay, GetResult } from '../../api';
import Slide from './slide';

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Carousel = () => {
  const { data: nowPlaying1, isLoading: nowPlayingLoading } =
    useQuery<GetResult>(['movie', 'nowPlaying', 1], () => getNowPlay(1));
  const { data: nowPlaying2, isLoading: nowPlayingLoading2 } =
    useQuery<GetResult>(['movie', 'nowPlaying', 2], () => getNowPlay(2));

  const nowPlayingArray: any = [];

  nowPlaying1?.results.map((item) => nowPlayingArray.push(item));
  nowPlaying2?.results.map((item) => nowPlayingArray.push(item));

  const loading = nowPlayingLoading || nowPlayingLoading2;
  return (
    <Container>
      <Slide movieApi={nowPlayingArray} title="개봉예정 영화" />
    </Container>
  );
};

export default Carousel;
