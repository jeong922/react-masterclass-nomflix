import { useEffect } from 'react';
import styled from 'styled-components';
import VideoDetail from '../components/VideoDetail';
import MovieSlider from '../components/Slider';
import { useMatch } from 'react-router-dom';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import ModalPotal from '../components/ModalPotal';
import useMovie from '../hooks/useMovie';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 300px;
  overflow-x: hidden;
`;

const Container = styled.div`
  position: relative;
  top: -100px;
  /* font-size: 1rem;
  width: 100%; */
`;

function Movie() {
  const bigMatchMovie = useMatch('/movies/:Id');
  const matchMovieId = bigMatchMovie?.params.Id + '';
  const { nowPlaying1, nowPlaying, upComing, popular, topRating, loading } = useMovie();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Banner movieApi={nowPlaying1} mediaType='movie' />
          <Container>
            {nowPlaying && (
              <MovieSlider key='nowkey' movieApi={nowPlaying} title='현재 상영 중인 영화' mediaType='movie' />
            )}

            {upComing && <MovieSlider key='upComkey' movieApi={upComing} title='개봉 예정 영화' mediaType='movie' />}
            {popular && <MovieSlider key='popkey' movieApi={popular} title='인기 있는 영화' mediaType='movie' />}
            {topRating && <MovieSlider key='topkey' movieApi={topRating} title='평점 높은 영화' mediaType='movie' />}
          </Container>
        </>
      )}

      {bigMatchMovie && (
        <ModalPotal>
          <VideoDetail matchId={matchMovieId} mediaType='movie' where='movies' />
        </ModalPotal>
      )}
    </Wrapper>
  );
}

export default Movie;
