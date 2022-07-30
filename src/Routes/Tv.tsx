import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getAiringToday,
  GetResult,
  getOnTheAir,
  getPopular,
  getTopRated,
} from '../api';
import Detail from '../Components/detail';
import MovieSlider from '../Components/slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/loader';
import Banner from '../Components/banner';
import Header from '../Components/header';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
  overflow-x: hidden;
`;

const Container = styled.div`
  position: relative;
  top: -100px;
`;

function Tv() {
  const bigMatchTv = useMatch('/tv/:Id');
  const matchTvId = bigMatchTv?.params.Id + '';
  const { data: onTheAir1, isLoading: onTheAirLoading } = useQuery<GetResult>(
    ['tv', 'nowPlaying', 1],
    () => getOnTheAir(1)
  );
  const { data: onTheAir2, isLoading: onTheAirLoading2 } = useQuery<GetResult>(
    ['tv', 'nowPlaying', 2],
    () => getOnTheAir(2)
  );
  const { data: onTheAir3, isLoading: onTheAirLoading3 } = useQuery<GetResult>(
    ['tv', 'nowPlaying', 3],
    () => getOnTheAir(3)
  );
  const { data: popular1, isLoading: popularLoading } = useQuery<GetResult>(
    ['tv', 'popular', 1],
    () => getPopular('tv', 1)
  );
  const { data: popular2, isLoading: popularLoading2 } = useQuery<GetResult>(
    ['tv', 'popular', 2],
    () => getPopular('tv', 2)
  );
  const { data: popular3, isLoading: popularLoading3 } = useQuery<GetResult>(
    ['tv', 'popular', 3],
    () => getPopular('tv', 3)
  );
  const { data: airing1, isLoading: airingLoading } = useQuery<GetResult>(
    ['Tv', 'upComing', 1],
    () => getAiringToday(1)
  );
  const { data: airing2, isLoading: airingLoading2 } = useQuery<GetResult>(
    ['tv', 'upComing', 2],
    () => getAiringToday(2)
  );
  const { data: airing3, isLoading: airingLoading3 } = useQuery<GetResult>(
    ['tv', 'upComing', 3],
    () => getAiringToday(4)
  );
  const { data: topRate1, isLoading: topRateLoading } = useQuery<GetResult>(
    ['tv', 'topRate', 1],
    () => getTopRated('tv', 1)
  );
  const { data: topRate2, isLoading: topRateLoading2 } = useQuery<GetResult>(
    ['tv', 'topRate', 2],
    () => getTopRated('tv', 2)
  );
  const { data: topRate3, isLoading: topRateLoading3 } = useQuery<GetResult>(
    ['tv', 'topRate', 3],
    () => getTopRated('tv', 3)
  );

  const onTheAirArray: any = [];
  const popularArray: any = [];
  const airingArray: any = [];
  const topRateingArray: any = [];
  onTheAir1?.results.map((item) => onTheAirArray.push(item));
  onTheAir2?.results.map((item) => onTheAirArray.push(item));
  onTheAir3?.results.map((item) => onTheAirArray.push(item));

  popular1?.results.map((item) => popularArray.push(item));
  popular2?.results.map((item) => popularArray.push(item));
  popular3?.results.map((item) => popularArray.push(item));

  airing1?.results.map((item) => airingArray.push(item));
  airing2?.results.map((item) => airingArray.push(item));
  airing3?.results.map((item) => airingArray.push(item));

  topRate1?.results.map((item) => topRateingArray.push(item));
  topRate2?.results.map((item) => topRateingArray.push(item));
  topRate3?.results.map((item) => topRateingArray.push(item));

  const loading =
    onTheAirLoading ||
    onTheAirLoading2 ||
    onTheAirLoading3 ||
    airingLoading ||
    airingLoading2 ||
    airingLoading3 ||
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
          <Banner movieApi={onTheAir1} mediaType="tv" />

          <Container>
            {onTheAirArray && (
              <MovieSlider
                key="airkey"
                movieApi={onTheAirArray}
                title="현재 방송 중인 TV쇼"
                mediaType="tv"
              />
            )}
            {popularArray && (
              <MovieSlider
                key="popTkey"
                movieApi={popularArray}
                title="인기 있는 TV쇼"
                mediaType="tv"
              />
            )}
            {airingArray && (
              <MovieSlider
                key="airingkey"
                movieApi={airingArray}
                title="오늘 방송하는 TV쇼"
                mediaType="tv"
              />
            )}
            {topRateingArray && (
              <MovieSlider
                key="topTkey"
                movieApi={topRateingArray}
                title="평점 높은 TV쇼"
                mediaType="tv"
              />
            )}
          </Container>
          <Detail matchId={matchTvId} mediaType={'tv'} where={'tv'} />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
