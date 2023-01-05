import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getAiringToday,
  GetResult,
  getOnTheAir,
  getPopular,
  getTopRated,
} from '../api/api';
import Detail from '../Components/Detail';
import MovieSlider from '../Components/Slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/Loader';
import Banner from '../Components/Banner';
import Header from '../Components/Header';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
  overflow-x: hidden;
`;

const Container = styled.div`
  position: relative;
  top: -100px;
`;

interface TvProps {
  setId: Dispatch<SetStateAction<number>>;
}

function Tv({ setId }: TvProps) {
  const bigMatchTv = useMatch('/tv/:Id');
  const matchTvId = bigMatchTv?.params.Id + '';
  const [onTheAir, setOnTheAir] = useState();
  const [popular, setPopular] = useState();
  const [airing, setAiring] = useState();
  const [topRating, setTopRating] = useState();

  const { data: onTheAir1, isLoading: onTheAirLoading } = useQuery<GetResult>(
    ['tvNowPlaying1'],
    () => getOnTheAir(1)
  );
  const { data: onTheAir2, isLoading: onTheAirLoading2 } = useQuery<GetResult>(
    ['tvNowPlaying2'],
    () => getOnTheAir(2)
  );

  const { data: popular1, isLoading: popularLoading } = useQuery<GetResult>(
    ['tvPopular1'],
    () => getPopular('tv', 1)
  );
  const { data: popular2, isLoading: popularLoading2 } = useQuery<GetResult>(
    ['tvPopular2'],
    () => getPopular('tv', 2)
  );

  const { data: airing1, isLoading: airingLoading } = useQuery<GetResult>(
    ['tvUpComing1'],
    () => getAiringToday(1)
  );
  const { data: airing2, isLoading: airingLoading2 } = useQuery<GetResult>(
    ['tvUpComing2'],
    () => getAiringToday(2)
  );

  const { data: topRate1, isLoading: topRateLoading } = useQuery<GetResult>(
    ['tvTopRate1'],
    () => getTopRated('tv', 1)
  );
  const { data: topRate2, isLoading: topRateLoading2 } = useQuery<GetResult>(
    ['tvTopRate2'],
    () => getTopRated('tv', 2)
  );

  useEffect(() => {
    const onTheAir: any = [];
    onTheAir1?.results.map((item) => onTheAir.push(item));
    onTheAir2?.results.map((item) => onTheAir.push(item));
    setOnTheAir(onTheAir);
  }, [onTheAir1?.results, onTheAir2?.results]);

  useEffect(() => {
    const popular: any = [];
    popular1?.results.map((item) => popular.push(item));
    popular2?.results.map((item) => popular.push(item));
    setPopular(popular);
  }, [popular1?.results, popular2?.results]);

  useEffect(() => {
    const airing: any = [];
    airing1?.results.map((item) => airing.push(item));
    airing2?.results.map((item) => airing.push(item));
    setAiring(airing);
  }, [airing1?.results, airing2?.results]);

  useEffect(() => {
    const topRating: any = [];
    topRate1?.results.map((item) => topRating.push(item));
    topRate2?.results.map((item) => topRating.push(item));
    setTopRating(topRating);
  }, [topRate1?.results, topRate2?.results]);

  const loading =
    onTheAirLoading ||
    onTheAirLoading2 ||
    airingLoading ||
    airingLoading2 ||
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
          <Banner movieApi={onTheAir1} mediaType='tv' />

          <Container>
            {onTheAir && (
              <MovieSlider
                key='airkey'
                movieApi={onTheAir}
                title='현재 방송 중인 TV쇼'
                mediaType='tv'
              />
            )}
            {popular && (
              <MovieSlider
                key='popTkey'
                movieApi={popular}
                title='인기 있는 TV쇼'
                mediaType='tv'
              />
            )}
            {airing && (
              <MovieSlider
                key='airingkey'
                movieApi={airing}
                title='오늘 방송하는 TV쇼'
                mediaType='tv'
              />
            )}
            {topRating && (
              <MovieSlider
                key='topTkey'
                movieApi={topRating}
                title='평점 높은 TV쇼'
                mediaType='tv'
              />
            )}
          </Container>
          {bigMatchTv && (
            <Detail
              matchId={matchTvId}
              mediaType={'tv'}
              where={'tv'}
              setId={setId}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Tv);
