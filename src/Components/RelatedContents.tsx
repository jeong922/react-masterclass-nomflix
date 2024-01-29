import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RelatedContent } from '../api/api';
import { makeImagePath } from '../utilities';
import { useIsElementInViewport } from './img_loading/element_in_viewport';
import MoreButton from './MoreButton';
import { MediaType } from '../model/type';

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
  background-color: #4d4d4d;
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

interface Props {
  recommendApi: RelatedContent;
  title: string;
  mediaType: MediaType;
  where: string;
}

function RelatedContents({ recommendApi, title, where, mediaType }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const [isRecommend, setIsRecommend] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [height, setHeight] = useState('480px');
  const [positionRef, setPositionRef] = useState(false);
  const [more, setMore] = useState(false);
  const seasonRef = useRef<null | HTMLDivElement>(null);
  const { elementRef, isVisible } = useIsElementInViewport();
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
      if (mediaType === 'movie') {
        navigate(`/search?keyword=${keyword}&movie=${id}`, { state: id });
      } else {
        navigate(`/search?keyword=${keyword}&tv=${id}`, { state: id });
      }
      return;
    }

    if (where === 'search/movie') {
      navigate(`/search/movie?keyword=${keyword}&movie=${id}`, { state: id });
      return;
    }

    if (where === 'search/tv') {
      navigate(`/search/tv?keyword=${keyword}&tv=${id}`, { state: id });
      return;
    }

    if (where === 'my-list') {
      navigate(`/my-list/${id}`);
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
        <RecommenBoxWrapper recommendDisplay={isRecommend} ref={elementRef}>
          <RecommenBox ref={seasonRef} recommendcontents={height}>
            <BigRecommenMovie>{title}</BigRecommenMovie>
            <BigRecommen>
              {recommendApi?.results.slice(0, 12).map((item) => (
                <Recommen
                  key={item.id}
                  bgphoto={
                    isVisible
                      ? makeImagePath(
                          item.backdrop_path || item.poster_path,
                          'w500'
                        )
                      : ''
                  }
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

export default RelatedContents;
