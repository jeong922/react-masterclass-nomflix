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
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 58px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Overview = styled.p`
  font-size: 21px;
  width: 50%;
  line-height: 1.5;
`;

const SliderBtn = styled(motion.button)`
  position: absolute;
  height: 100%;
  padding: 20px;
  outline: none;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: transparent;
  border: none;
  z-index: 99;
  cursor: pointer;
  &:last-child {
    right: -15px;
  }
`;

const DetailWrapper = styled.div`
  display: flex;
`;

const Detail = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  color: ${(props) => props.theme.white.lighter};
  border: none;
  width: 150px;
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:first-child {
    margin-right: 20px;
  }
  &:last-child {
    width: 200px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;
  width: 22px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  margin-right: 5px;
  svg {
    height: 13px;
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

const playOffset = 1;

function Home() {
  const navigate = useNavigate();
  const bigMatchHome = useMatch('/:Id');
  const matchHomeId = String(bigMatchHome?.params.Id);
  const { data, isLoading } = useQuery<IGetMoivesResult>(
    ['movies', 'popular'],
    getPopularMovies
  );
  // console.log("bigMovieMatchHome", bigMovieMatchHome);
  // console.log("data", data);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setback] = useState(false);

  // useEffect(() => {
  //   document.body.style.cssText = `
  //   position: fixed;
  //   top: -${window.scrollY}px;
  //   overflow-y: scroll;
  //   width: 100%;`;
  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = '';
  //     window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  //   };
  // }, []);

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

  const scrollData = document.body.style.top;
  const scrollPosition = +scrollData.replace(/[^0-9]/g, '');
  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SliderBtn
            onClick={decreaseIndex}
            // variants={btnVariants}
            whileHover="hover"
            key="btn1"
          >
            <svg
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              fill="white"
            >
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
                    <Title>
                      {index + 1}위 {movie.title}
                    </Title>
                    <Overview>{movie.overview}</Overview>
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
                        // onClick={() => onBoxClicked(movie.id)}
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
            // variants={btnVariants}
            // whileHover="hover"
            key="btn2"
          >
            <svg
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              width="30px"
              fill="white"
            >
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
