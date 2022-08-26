import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Recommendations } from '../api';
import { makeImagePath } from '../utilities';
import MoreButton from './more_button';

const RecommenBoxWrapper = styled.div<{ recommendDisplay: boolean }>`
  display: ${(props) => (props.recommendDisplay ? 'none' : 'block')};
  position: relative;
  margin-top: 20px;
  z-index: 3;
  padding-bottom: 20px;
`;

const RecommenBox = styled(motion.div)<{ recommendcontents: string }>`
  overflow: hidden;
  max-height: ${(props) => props.recommendcontents};
`;

const BigRecommenMovie = styled.div`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 15px;
`;

const BigRecommen = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

const Recommen = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  background-color: white;
  height: 150px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  z-index: 5;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 16px;
  text-align: center;
`;

type RecommendData = {
  recommendApi: Recommendations;
  title: string;
  mediaType: string;
  where: string;
};

function Recommend({ recommendApi, title, where, mediaType }: RecommendData) {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const [isRecommend, setIsRecommend] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [height, setHeight] = useState('480px');
  const [positionRef, setPositionRef] = useState(false);
  const [more, setMore] = useState(false);
  const seasonRef = useRef<null | HTMLDivElement>(null);

  const onBigMovieBoxClicked = (id: number) => {
    if (where === 'movies') {
      navigate(`/movies/${id}`);
      return;
    }

    if (where === 'tv') {
      navigate(`/tv/${id}`);
      return;
    }

    if (where === 'home') {
      navigate(`/${id}`);
      return;
    }

    if (where === 'search') {
      mediaType === 'movie'
        ? navigate(`/search?keyword=${keyword}&movie=${id}`)
        : navigate(`/search?keyword=${keyword}&tv=${id}`);
      return;
    }
  };

  useEffect(() => {
    if (recommendApi) {
      recommendApi.total_results > 0
        ? setIsRecommend(false)
        : setIsRecommend(true);
    }
  }, [recommendApi]);

  useEffect(() => {
    setHeight('480px');
    setMore(false);
    if (recommendApi) {
      if (recommendApi.results.length > 4) {
        setShowMoreBtn(true);
      } else {
        setShowMoreBtn(false);
      }
    }
  }, [recommendApi]);

  useEffect(() => {
    if (positionRef) {
      seasonRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [positionRef]);

  return (
    <>
      {recommendApi.results.length > 0 && (
        <RecommenBoxWrapper recommendDisplay={isRecommend}>
          <RecommenBox ref={seasonRef} recommendcontents={height}>
            <BigRecommenMovie>{title}</BigRecommenMovie>
            <BigRecommen>
              {recommendApi?.results.map((item) => (
                <Recommen
                  key={item.id}
                  bgphoto={makeImagePath(
                    item.backdrop_path || item.poster_path,
                    'w500'
                  )}
                  onClick={() => onBigMovieBoxClicked(item.id)}
                >
                  <Info>{item.title || item.name}</Info>
                </Recommen>
              ))}
            </BigRecommen>
          </RecommenBox>

          {showMoreBtn && (
            <MoreButton
              setHeight={setHeight}
              more={more}
              setMore={setMore}
              setPositionRef={setPositionRef}
            />
          )}
        </RecommenBoxWrapper>
      )}
    </>
  );
}

export default Recommend;
