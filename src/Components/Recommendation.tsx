import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IMovieRecommendations } from '../api';
import { makeImagePath } from '../utilities';

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

const MoreBtnWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120px;
  z-index: 6;
  background: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 1));
  border-bottom: 2px solid #404040;
`;

const MoreBoxBtn = styled(motion.button)`
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 50%;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
`;

const moreWrapperBtnVariants = {
  btn_position1: {
    top: -120,
  },
  btn_position2: {
    top: -40,
  },
};

const moreBtnVariants = {
  rotate0: {
    rotateZ: 0,
  },
  rotate1: {
    rotateZ: 180,
  },
  rotate2: {
    rotateZ: 0,
  },
  hover: {
    border: '2px solid rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
};

interface IMovieData {
  recommendApi: IMovieRecommendations;
  title: string;
  mediaType: string;
  where: string;
}

function Reconmend({ recommendApi, title, where, mediaType }: IMovieData) {
  const navigate = useNavigate(); // 페이지 이동을 할 수 있게 해주는 함수를 반환
  const location = useLocation(); // 현재 페이지에 대한 정보를 알려줌
  const keyword = new URLSearchParams(location.search).get('keyword');
  const [recommend, setRecommend] = useState(false); // 추천 콘텐츠나 비슷한 콘텐츠 존재 여부 확인용(있으면 false 없으면 true)
  const [recommendlength, setRecommendlength] = useState(false);
  const [isHeight, setIsHeight] = useState('480px');
  const [positionRef, setPositionRef] = useState(false);
  const [more, setMore] = useState(false); // 한번에 많은 콘텐츠를 시각적으로 보여주지 않기 위한 버튼 동작(false면 maxHeight:480px, true면 maxHeight:none)
  const seasonRef = useRef<null | HTMLDivElement>(null);

  const toggleClicked = () => {
    if (more) {
      setIsHeight('480px');
      setPositionRef(true);
    } else {
      setIsHeight('none');
      setPositionRef(false);
    }
    setMore((prev) => !prev);
  };

  const onBigMovieBoxClicked = (id: number) => {
    if (where === 'movies') {
      navigate(`/movies/${id}`);
    } else if (where === 'tv') {
      navigate(`/tv/${id}`);
    } else if (where === 'home') {
      navigate(`/${id}`);
    } else {
      mediaType === 'movie'
        ? navigate(`/search?keyword=${keyword}&movie=${id}`)
        : navigate(`/search?keyword=${keyword}&tv=${id}`);
    }
  }; // where 값에 따라 추천 영화 클릭시 해당 조건에 맞는 url로 이동

  useEffect(() => {
    if (recommendApi) {
      if (recommendApi.total_results > 0) {
        setRecommend(false);
      } else {
        setRecommend(true);
      }
    }
  }, []); // 추천콘텐츠나 비슷한 콘텐츠가 없으면 display:none

  useEffect(() => {
    if (recommendApi) {
      if (recommendApi.results.length > 4) {
        setRecommendlength(true);
      } else {
        setRecommendlength(false);
      }
    }
  }, [recommendApi]);

  useEffect(() => {
    if (positionRef === true) {
      seasonRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [more]);

  return (
    <>
      {recommendApi.results.length > 0 && (
        <RecommenBoxWrapper recommendDisplay={recommend}>
          <RecommenBox ref={seasonRef} recommendcontents={isHeight}>
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

          {recommendlength && (
            <MoreBtnWrapper
              variants={moreWrapperBtnVariants}
              initial="btn_position1"
              animate={more ? 'btn_position2' : 'btn_position1'}
              transition={{ type: 'tween' }}
            >
              <MoreBoxBtn
                onClick={toggleClicked}
                variants={moreBtnVariants}
                initial="rotate0"
                animate={more ? 'rotate1' : 'rotate2'}
                whileHover="hover"
                transition={{ type: 'tween' }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </MoreBoxBtn>
            </MoreBtnWrapper>
          )}
        </RecommenBoxWrapper>
      )}
    </>
  );
}

export default Reconmend;
