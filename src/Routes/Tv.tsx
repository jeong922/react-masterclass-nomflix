import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getAiringTodayTV,
  getLatestTV,
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTV,
  IGetMoivesResult,
  ILatest,
} from '../api';
import MovieModal from '../Components/Modal';
import MovieSlider from '../Components/Slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/Loader';
import Banner from '../Components/Banner';
import Header from '../Components/Header';

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
  const bigMatchTv = useMatch('/tv/:Id'); // 매개변수로 url을 넘기면 해당 url과 일치할 경우 url정보 반환, 일치 하지 않으면 null 반환
  const matchTvId = bigMatchTv?.params.Id + ''; // useMatch 매개변수 url이 해당 url 일치할때 id를 받아옴
  // console.log('bigMatchTv', bigMatchTv);
  // console.log('matchTvId', matchTvId);
  const { data: onTheAir1, isLoading: onTheAirLoading } =
    useQuery<IGetMoivesResult>(['Tv', 'nowPlaying', 1], () => getOnTheAirTV(1));
  const { data: onTheAir2, isLoading: onTheAirLoading2 } =
    useQuery<IGetMoivesResult>(['Tv', 'nowPlaying', 2], () => getOnTheAirTV(2));
  const { data: onTheAir3, isLoading: onTheAirLoading3 } =
    useQuery<IGetMoivesResult>(['Tv', 'nowPlaying', 3], () => getOnTheAirTV(3));
  const { data: popular1, isLoading: popularLoading } =
    useQuery<IGetMoivesResult>(['Tv', 'popular', 1], () => getPopularTV(1));
  const { data: popular2, isLoading: popularLoading2 } =
    useQuery<IGetMoivesResult>(['Tv', 'popular', 2], () => getPopularTV(2));
  const { data: popular3, isLoading: popularLoading3 } =
    useQuery<IGetMoivesResult>(['Tv', 'popular', 3], () => getPopularTV(3));
  const { data: airing1, isLoading: airingLoading } =
    useQuery<IGetMoivesResult>(['Tv', 'upComing', 1], () =>
      getAiringTodayTV(1)
    );
  const { data: airing2, isLoading: airingLoading2 } =
    useQuery<IGetMoivesResult>(['Tv', 'upComing', 2], () =>
      getAiringTodayTV(2)
    );
  const { data: airing3, isLoading: airingLoading3 } =
    useQuery<IGetMoivesResult>(['Tv', 'upComing', 3], () =>
      getAiringTodayTV(4)
    );
  const { data: topRate1, isLoading: topRateLoading } =
    useQuery<IGetMoivesResult>(['Tv', 'topRate', 1], () => getTopRatedTV(1));
  const { data: topRate2, isLoading: topRateLoading2 } =
    useQuery<IGetMoivesResult>(['Tv', 'topRate', 2], () => getTopRatedTV(2));
  const { data: topRate3, isLoading: topRateLoading3 } =
    useQuery<IGetMoivesResult>(['Tv', 'topRate', 3], () => getTopRatedTV(3));

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

  // const scrollData = document.body.style.top;
  // const scrollPosition = +scrollData.replace(/[^0-9]/g, '');
  const loading =
    onTheAirLoading || airingLoading || popularLoading || topRateLoading;
  return (
    <Wrapper>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Banner movieApi={onTheAir1} mediaType="tv" />

          <Container>
            {onTheAirArray ? (
              <MovieSlider
                key="airkey"
                movieApi={onTheAirArray}
                title="현재 방송 중인 TV쇼"
                mediaType="tv"
              />
            ) : null}
            {popularArray ? (
              <MovieSlider
                key="popTkey"
                movieApi={popularArray}
                title="인기 있는 TV쇼"
                mediaType="tv"
              />
            ) : null}
            {airingArray ? (
              <MovieSlider
                key="airingkey"
                movieApi={airingArray}
                title="오늘 방송하는 TV쇼"
                mediaType="tv"
              />
            ) : null}
            {topRateingArray ? (
              <MovieSlider
                key="topTkey"
                movieApi={topRateingArray}
                title="평점 높은 TV쇼"
                mediaType="tv"
              />
            ) : null}
          </Container>
          <MovieModal
            matchId={matchTvId}
            mediaType={'tv'}
            where={'tv'}
            // scrollPosition={scrollPosition}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
