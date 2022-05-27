import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IGetMoivesResult, IMovie } from '../api';
import { makeImagePath } from '../utilities';

// ✨✨ 나중에 추가적으로 슬라이드 반응형으로 만들것!
// 지금은 크기만 줄어들뿐 화면 크기에 따라 그리드가 변하지 않음

const Slider = styled(motion.div)`
  position: relative;
  /* width: 100vw; */
  /* height: 340px; */
  height: 17vw;
  margin: 0px 56px;
  /* padding-bottom: 320px; */
  &:last-child {
    padding-bottom: 20px;
  }
  @media screen and (max-width: 1660px) {
    font-size: 0.8vw;
  }
`;

const Title = styled.div`
  position: relative;
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 600;
  margin-left: 56px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(9, 1fr);
  position: absolute;
  width: 100%;
`; //❗ 나중에 반응형으로 꼭 수정할것

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  /* height: 300px; */
  height: 16vw;
  /* height: 4em; */
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  /* @media screen and (max-width: 1660px) {
    height: 4em;
  } */
`;

const Info = styled(motion.div)`
  padding: 10px;
  /* background-color: ${(props) => props.theme.black.lighter}; */
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0, 1));
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
`;

const SliderBtn = styled(motion.button)`
  position: absolute;
  /* height: 300px; */
  height: 16vw;
  padding: 1em;
  outline: none;
  background-color: rgba(0, 0, 0, 0.6);
  /* background-color: white; */
  /* background-color: transparent; */
  border: none;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
  svg {
    fill: white;
    height: 30px;
  }
  &:first-child {
    left: -56px;
  }
  &:last-child {
    right: -56px;
  }
`;

const rowVariants = {
  hidden: (isback: boolean) => ({
    x: isback ? window.innerWidth + 5 : -window.innerWidth - 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isback: boolean) => ({
    x: isback ? -window.innerWidth - 5 : window.innerWidth + 5,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -60,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const btnVariants = {
  hover: {
    opacity: 1,
    backgroundColor: 'rgba(20,20,20,0.5)',
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const playOffset = 9;
interface IMovieData {
  // movieApi: IGetMoivesResult;
  movieApi: IMovie[];
  title: string;
  mediaType: string;
  windowSize?: number;
}

function MovieSlider({ movieApi, title, mediaType }: IMovieData) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setback] = useState(false); // 슬라이드 이동 상태
  const increaseIndex = () => {
    if (movieApi) {
      if (leaving) return;
      toggleLeaving();
      setback(false);
      const totalMovies = movieApi.length - 1;
      const maxIndex = Math.floor(totalMovies / playOffset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      console.log('maxIndex', maxIndex);
      console.log('totalMovies', totalMovies);
    }
  };

  const decreaseIndex = () => {
    if (movieApi) {
      if (leaving) return;
      toggleLeaving();
      setback(true);
      const totalMovies = movieApi.length - 1;
      const maxIndex = Math.floor(totalMovies / playOffset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  // const scrolllock = () => {
  //   document.body.style.cssText = `
  //     // position:fixed;
  //     top: -${window.scrollY}px;
  //     overflow-y: scroll;
  //     width: 100%;`;
  // }; // ❗ body 스크롤이 막히면 모달창의 스크롤에도 문제가 생기므로 다른 방법 찾아보기

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (Id: number) => {
    if (mediaType === 'movie') {
      navigate(`/movies/${Id}`);
      // scrolllock();
    } else if (mediaType === 'tv') {
      navigate(`/tv/${Id}`);
      // scrolllock();
    }
  }; // 콘텐츠를 클릭하면 조건에 따라 해당 url로 이동

  return (
    <>
      <Title>{title}</Title>
      <Slider>
        <SliderBtn
          onClick={decreaseIndex}
          variants={btnVariants}
          whileHover="hover"
          key="btn1"
        >
          <motion.svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.324 28.008c.537.577.355 1.433-.326 1.809a1.44 1.44 0 0 1-.72.183c-.398 0-.786-.151-1.048-.438L10.06 18.588a1.126 1.126 0 0 1 0-1.555L20.233 6.09c.438-.468 1.198-.564 1.767-.25.681.377.863 1.23.325 1.808l-9.446 10.164 9.446 10.196zM11.112 17.615a.31.31 0 0 1 0 .391l.182-.195-.182-.196zM21.308 7.094c-.01-.006-.053 0-.029-.027a.07.07 0 0 0 .029.027zm-.025 21.499a.95.95 0 0 1-.006-.008l.006.008z"></path>
          </motion.svg>
        </SliderBtn>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={back}
        >
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={index}
            custom={back}
          >
            {movieApi
              .slice(0)
              .slice(playOffset * index, playOffset * index + playOffset)
              .map((movie) => (
                <Box
                  // layoutId={movie.id + title + ""}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: 'tween' }}
                  bgphoto={makeImagePath(
                    movie.poster_path || movie.backdrop_path,
                    'w500'
                  )}
                  onClick={() => {
                    onBoxClicked(movie.id);
                  }}
                >
                  <Info variants={infoVariants}>
                    <h4>{mediaType === 'movie' ? movie.title : movie.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
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
      </Slider>
    </>
  );
}

export default MovieSlider;
