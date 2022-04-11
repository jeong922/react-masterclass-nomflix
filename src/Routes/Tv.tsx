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
  console.log('bigMatchTv', bigMatchTv);
  console.log('matchTvId', matchTvId);
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

  // const scrollData = document.body.style.top;
  // const scrollPosition = +scrollData.replace(/[^0-9]/g, '');

  const loading =
    onTheAirLoading ||
    airingLoading ||
    popularLoading ||
    topRateLoading ||
    latestLoading;
  return (
    <Wrapper>
      <Header />
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
            // scrollPosition={scrollPosition}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
