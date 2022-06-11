import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPopularMovies, IGetMoivesResult } from '../api';
import Loader from '../Components/Loader';
import { makeImagePath } from '../utilities';

const Wrapper = styled.div`
  background-color: black;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Slider = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
`;

const Banner = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4.375em;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PopularMovies = styled.div`
  font-weight: 600;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  font-size: 2.8em;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2.2em;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Overview = styled.p`
  font-size: 1.3em;
  width: 50vw;
  line-height: 1.5;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const SliderBtn = styled(motion.button)`
  position: absolute;
  height: 100vh;
  outline: none;
  background-color: transparent;
  border: none;
  z-index: 1;
  cursor: pointer;
  svg {
    fill: white;
    height: 30px;
  }
  &:first-child {
    left: 0px;
  }
  &:last-child {
    right: 0px;
  }
`;

const DetailWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Detail = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  color: ${(props) => props.theme.white.lighter};
  border: none;
  width: 9.375em;
  padding: 0.625em;
  margin-top: 20px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  &:first-child {
    margin-right: 1.25em;
  }
  &:last-child {
    width: 12.5em;
    background-color: ${(props) => props.theme.red};
  }
`;

const sliderVariants = {
  hidden: (isback: boolean) => ({
    x: isback ? window.innerWidth : -window.innerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (isback: boolean) => ({
    x: isback ? -window.innerWidth : window.innerWidth,
  }),
};

const btnVariants = {
  normal: {
    fillOpacity: 1,
  },
  hover: {
    fillOpacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

const playOffset = 1;

function Home() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setback] = useState(false);
  const { data, isLoading } = useQuery<IGetMoivesResult>(
    ['movies', 'popular'],
    () => getPopularMovies(1)
  );
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setback(false);
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / 2) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setback(true);
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / 2) - 1;
      console.log(maxIndex);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SliderBtn
            onClick={decreaseIndex}
            variants={btnVariants}
            whileHover="hover"
            key="btn1"
          >
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.324 28.008c.537.577.355 1.433-.326 1.809a1.44 1.44 0 0 1-.72.183c-.398 0-.786-.151-1.048-.438L10.06 18.588a1.126 1.126 0 0 1 0-1.555L20.233 6.09c.438-.468 1.198-.564 1.767-.25.681.377.863 1.23.325 1.808l-9.446 10.164 9.446 10.196zM11.112 17.615a.31.31 0 0 1 0 .391l.182-.195-.182-.196zM21.308 7.094c-.01-.006-.053 0-.029-.027a.07.07 0 0 0 .029.027zm-.025 21.499a.95.95 0 0 1-.006-.008l.006.008z"></path>
            </svg>
          </SliderBtn>
          <AnimatePresence
            initial={false}
            custom={back}
            onExitComplete={toggleLeaving}
          >
            <Slider
              variants={sliderVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'tween', duration: 1 }}
              key={index}
              custom={back}
            >
              {data?.results
                .slice(0)
                .slice(playOffset * index, playOffset * index + playOffset)
                .map((movie) => (
                  <Banner
                    key={movie.id}
                    bgphoto={makeImagePath(movie.backdrop_path)}
                  >
                    <PopularMovies>🔥인기 영화 Top 10</PopularMovies>
                    <Title>
                      {index + 1}위 {movie.title}
                    </Title>
                    <Overview>
                      {movie.overview.length > 200
                        ? `${movie.overview.slice(0, 200)}...`
                        : movie.overview}
                    </Overview>
                    <DetailWrapper>
                      <Detail
                        whileHover={{
                          backgroundColor: 'rgba(229, 16, 20, 0.3)',
                        }}
                        onClick={() => navigate('/movies')}
                      >
                        더 많은 콘텐츠 보러가기
                      </Detail>
                    </DetailWrapper>
                  </Banner>
                ))}
            </Slider>
          </AnimatePresence>
          <SliderBtn
            onClick={increaseIndex}
            variants={btnVariants}
            whileHover="hover"
            key="btn2"
          >
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.065 7.65c-.538-.578-.355-1.433.325-1.81a1.44 1.44 0 0 1 .72-.182c.398 0 .786.15 1.048.437L25.327 17.07a1.126 1.126 0 0 1 0 1.555L15.155 29.568c-.438.468-1.198.563-1.767.25-.681-.377-.863-1.23-.325-1.809l9.446-10.164L13.065 7.65zm11.211 10.393a.31.31 0 0 1 0-.391l-.181.194.181.197zM14.081 28.564c.01.006.053 0 .028.027a.07.07 0 0 0-.028-.027zm.024-21.5a.95.95 0 0 1 .007.008l-.007-.007z"></path>
            </svg>
          </SliderBtn>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
