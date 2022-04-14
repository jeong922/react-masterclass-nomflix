import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getPopularMovies, IGetMoivesResult } from '../api';
import MovieModal from '../Components/Modal';
import { makeImagePath } from '../utilities';

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  overflow-x: hidden;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled(motion.div)`
  display: flex;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  position: absolute;
  width: 100%;
`;

const Banner = styled(motion.div)<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4.375em;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PopularMovies = styled.h1`
  font-size: 3em;
  font-weight: 600;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  svg {
    height: 0.9em;
    margin-right: 10px;
    fill: #ffae00;
  }
`;

const Title = styled.h2`
  font-size: 2.2em;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Overview = styled.p`
  font-size: 1.3em;
  width: 50%;
  line-height: 1.5;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const SliderBtn = styled(motion.button)`
  position: absolute;
  height: 100%;
  /* padding: 20px; */
  outline: none;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: transparent;
  border: none;
  z-index: 99;
  cursor: pointer;
  svg {
    fill: white;
    height: 30px;
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
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.375em;
  width: 1.375em;
  border: 0.125em solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  margin-right: 5px;
  svg {
    height: 0.813em;
  }
`;

const sliderVariants = {
  hidden: (isback: boolean) => ({
    x: isback ? window.outerWidth : -window.outerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (isback: boolean) => ({
    x: isback ? -window.outerWidth : window.outerWidth,
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
  const bigMatchHome = useMatch('/:Id');
  const matchHomeId = String(bigMatchHome?.params.Id);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setback] = useState(false);
  const { data, isLoading } = useQuery<IGetMoivesResult>(
    ['movies', 'popular'],
    getPopularMovies
  );
  // console.log("bigMovieMatchHome", bigMovieMatchHome);
  // console.log("data", data);
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
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  // const clickedMovie =
  //   bigMatchHome?.params.Id &&
  //   data?.results.find((movie) => String(movie.id) === bigMatchHome.params.Id);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (Id: number) => {
    navigate(`/${Id}`);
  };

  // const scrollData = document.body.style.top;
  // const scrollPosition = +scrollData.replace(/[^0-9]/g, '');

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
                    bgPhoto={makeImagePath(movie.backdrop_path)}
                  >
                    <PopularMovies>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M572.1 82.38C569.5 71.59 559.8 64 548.7 64h-100.8c.2422-12.45 .1078-23.7-.1559-33.02C447.3 13.63 433.2 0 415.8 0H160.2C142.8 0 128.7 13.63 128.2 30.98C127.1 40.3 127.8 51.55 128.1 64H27.26C16.16 64 6.537 71.59 3.912 82.38C3.1 85.78-15.71 167.2 37.07 245.9c37.44 55.82 100.6 95.03 187.5 117.4c18.7 4.805 31.41 22.06 31.41 41.37C256 428.5 236.5 448 212.6 448H208c-26.51 0-47.99 21.49-47.99 48c0 8.836 7.163 16 15.1 16h223.1c8.836 0 15.1-7.164 15.1-16c0-26.51-21.48-48-47.99-48h-4.644c-23.86 0-43.36-19.5-43.36-43.35c0-19.31 12.71-36.57 31.41-41.37c86.96-22.34 150.1-61.55 187.5-117.4C591.7 167.2 572.9 85.78 572.1 82.38zM77.41 219.8C49.47 178.6 47.01 135.7 48.38 112h80.39c5.359 59.62 20.35 131.1 57.67 189.1C137.4 281.6 100.9 254.4 77.41 219.8zM498.6 219.8c-23.44 34.6-59.94 61.75-109 81.22C426.9 243.1 441.9 171.6 447.2 112h80.39C528.1 135.7 526.5 178.7 498.6 219.8z" />
                      </svg>
                      인기 영화 Top 10
                    </PopularMovies>
                    <Title>
                      {index + 1}위 {movie.title}
                    </Title>
                    <Overview>
                      {movie.overview.length! > 200
                        ? `${movie.overview.slice(0, 200)}...`
                        : movie.overview}
                    </Overview>
                    <DetailWrapper>
                      <Detail
                        whileHover={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        }}
                        onClick={() => onBoxClicked(movie.id)}
                      >
                        <IconWrapper>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 192 512"
                            fill="white"
                          >
                            <path d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z" />
                          </svg>
                        </IconWrapper>
                        상세 보기
                      </Detail>
                      <Detail
                        whileHover={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
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
      <MovieModal
        matchId={matchHomeId}
        mediaType={'movie'}
        where={'home'}
        // scrollPosition={scrollPosition}
      />
    </Wrapper>
  );
}

export default Home;
