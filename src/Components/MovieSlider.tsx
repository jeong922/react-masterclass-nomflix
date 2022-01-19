import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoivesResult, IMovie } from "../api";
import { makeImagePath } from "../utilities";
import MovieModal from "./MovieModal";

const Slider = styled(motion.div)`
  position: relative;
  margin: 0 20px;
  padding-bottom: 320px;
  &:last-child {
    padding-bottom: 20px;
  }
`;

const Title = styled.div`
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(9, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 300px;
  background-image: url(${(props) => props.bgPhoto});
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
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const SliderBtn = styled(motion.button)`
  position: absolute;
  height: 320px;
  padding: 20px;
  outline: none;
  background-color: rgba(0, 0, 0, 0.6);
  /* background-color: transparent; */
  border: none;
  z-index: 2;
  opacity: 0;
  &:last-child {
    right: -15px;
  }
`;

const rowVariants = {
  hidden: (isback: boolean) => ({
    x: isback ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isback: boolean) => ({
    x: isback ? -window.outerWidth - 5 : window.outerWidth + 5,
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
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const btnVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const playOffset = 9;

interface IMovieData {
  movieApi: IGetMoivesResult;
  title: string;
}

function MovieSlider({ movieApi, title }: IMovieData) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setback] = useState(false);
  const increaseIndex = () => {
    if (movieApi) {
      if (leaving) return;
      toggleLeaving();
      setback(false);
      const totalMovies = movieApi.results.length - 1; // 19
      const maxIndex = Math.floor(totalMovies / playOffset) - 1; // 1
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      // console.log("maxIndex", maxIndex);
      // console.log("totalMovies", totalMovies);
    }
  };
  const decreaseIndex = () => {
    if (movieApi) {
      if (leaving) return;
      toggleLeaving();
      setback(true);
      const totalMovies = movieApi.results.length - 1;
      const maxIndex = Math.floor(totalMovies / playOffset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <>
      <Slider>
        <Title>{title}</Title>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={back}
        >
          <SliderBtn
            onClick={decreaseIndex}
            variants={btnVariants}
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
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
            custom={back}
          >
            {movieApi?.results
              .slice(0)
              .slice(playOffset * index, playOffset * index + playOffset)
              .map((movie) => (
                <Box
                  // layoutId={movie.id + ""}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(
                    movie.poster_path || movie.backdrop_path,
                    "w500"
                  )}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <img />
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <SliderBtn
            onClick={increaseIndex}
            variants={btnVariants}
            whileHover="hover"
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
        </AnimatePresence>
      </Slider>
    </>
  );
}

export default MovieSlider;
