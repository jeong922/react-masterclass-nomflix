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
import MovieModal from '../Components/Modal';
import MovieSlider from '../Components/Slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/Loader';
import Banner from '../Components/Banner';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
  overflow-x: hidden;
`;

const Container = styled.div`
  position: relative;
  top: -100px;
`;

function Movie() {
  // const navigate = useNavigate();
  const bigMatchMovie = useMatch('/movies/:Id'); // 매개변수로 url을 넘기면 해당 url과 일치할 경우 url정보 반환, 일치 하지 않으면 null 반환
  const matchMovieId = String(bigMatchMovie?.params.Id); // useMatch 매개변수 url이 해당 url 일치할때 id를 받아옴
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

  // const scrollData = document.body.style.top;
  // const scrollPosition = +scrollData.replace(/[^0-9]/g, '') + 50;

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
        // scrollPosition={scrollPosition}
      />
    </Wrapper>
  );
}

export default Movie;
