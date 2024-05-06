import { useEffect } from 'react';
import styled from 'styled-components';
import VideoDetail from '../Components/VideoDetail';
import MovieSlider from '../Components/Slider';
import { useMatch } from 'react-router-dom';
import Loader from '../Components/Loader';
import Banner from '../Components/Banner';
import ModalPotal from '../Components/ModalPotal';
import useTv from '../hooks/useTv';

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
  const { onTheAir1, onTheAir, airing, popular, topRating, loading } = useTv();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 더 좋은 방법은 없는 것인가..

  return (
    <Wrapper>
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
            <ModalPotal>
              <VideoDetail matchId={matchTvId} mediaType='tv' where='tv' />
            </ModalPotal>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
