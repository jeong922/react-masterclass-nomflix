import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getsearchMovies, getsearchTV, IGetMoivesResult } from "../api";
import Loader from "../Components/Loader";
import MovieModal from "../Components/MovieModal";
import { makeImagePath } from "../utilities";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 100px 40px;
`;

const Title = styled.h2`
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  min-height: 300px;
`;

const Contents = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(9, 1fr);
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 300px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
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

const IconWrapper = styled.div`
  display: flex;
  margin: 5px;
`;

const IconBorder = styled(motion.button)`
  position: relative;
  width: 25px;
  height: 25px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  margin-right: 5px;
  margin-top: 5px;
  background-color: transparent;
  cursor: pointer;
  &:first-child {
    svg {
      position: absolute;
      height: 15px;
      top: 3px;
      left: 5px;
    }
  }
  &:nth-child(2) {
    svg {
      position: absolute;
      height: 15px;
      top: 2px;
      right: 3px;
    }
  }
  &:nth-child(3) {
    svg {
      position: absolute;
      height: 15px;
      top: 4px;
      right: 3px;
    }
  }
  &:last-child {
    /* justify-content: flex-end; */
    svg {
      position: absolute;
      height: 15px;
      top: 4px;
      right: 6px;
    }
  }
`;

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
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const IconAnimation = {
  before: {
    opacity: 0,
  },
  hover: {
    border: "1px solid rgba(255, 255, 255, 1)",
  },
  btnHover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
    },
  },
};

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location);
  const keyword = new URLSearchParams(location.search).get("keyword");
  // const bigMovieMatchMovie = useMatch(`/search?keyword=${keyword}/movie/:Id`);
  // const matchMovieId = bigMovieMatchMovie?.params.Id;
  // const bigMovieMatchTv = useMatch("/search/tv/:Id");
  // const matchTvId = bigMovieMatchTv?.params.Id;
  // console.log("bigMovieMatchTv", bigMovieMatchTv);
  // console.log("bigMovieMatchMovie", bigMovieMatchMovie);
  // console.log("matchMovieId", matchMovieId);
  console.log("keyword", keyword);
  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<IGetMoivesResult>(["movies", "searchMovie", keyword], () =>
      getsearchMovies(keyword + "")
    );
  const { data: searchTV, isLoading: searchTVLoading } =
    useQuery<IGetMoivesResult>(["tv", "searchTV", keyword], () =>
      getsearchTV(keyword + "")
    );

  const loading = searchMovieLoading || searchTVLoading;

  const onBoxClickedM = (Id: number) => {
    // navigate(`/search?keyword=${keyword}&movie=${Id}`);
    navigate(`/movies/${Id}`);
  };
  const onBoxClickedT = (Id: number) => {
    // navigate(`/search?keyword=${keyword}&tv=${Id}`);
    navigate(`/tv/${Id}`);
  };
  console.log("searchTV", searchTV);
  console.log("searchMovie", searchMovie);
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ContentsWrapper>
            <Title>{`"${keyword}"과(와) 관련 된 영화`}</Title>
            <Contents>
              {searchMovie?.results.slice(0).map((movie) => (
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
                  // onClick={() => {
                  //   onBoxClickedM(movie.id);
                  // }}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                    <IconWrapper>
                      <IconBorder variants={IconAnimation} whileHover="hover">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="white"
                        >
                          <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                        </svg>
                      </IconBorder>
                      <IconBorder variants={IconAnimation} whileHover="hover">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="white"
                        >
                          <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
                        </svg>
                      </IconBorder>
                      <IconBorder variants={IconAnimation} whileHover="hover">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="white"
                        >
                          <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z" />
                        </svg>
                      </IconBorder>

                      <IconBorder
                        variants={IconAnimation}
                        whileHover="hover"
                        onClick={() => {
                          onBoxClickedM(movie.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="white"
                        >
                          <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
                        </svg>
                      </IconBorder>
                    </IconWrapper>
                  </Info>
                </Box>
              ))}
            </Contents>
          </ContentsWrapper>

          <ContentsWrapper>
            <Title>{`"${keyword}"과(와) 관련 된 TV 쇼`}</Title>
            <Contents>
              {searchTV?.results.slice(0).map((tv) => (
                <Box
                  // layoutId={movie.id + ""}
                  key={tv.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(
                    tv.poster_path || tv.backdrop_path,
                    "w500"
                  )}
                  onClick={() => {
                    onBoxClickedT(tv.id);
                  }}
                >
                  <Info variants={infoVariants}>
                    <h4>{tv.name}</h4>
                    <IconWrapper>
                      <IconBorder variants={IconAnimation} whileHover="hover">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="white"
                        >
                          <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                        </svg>
                      </IconBorder>
                      <IconBorder variants={IconAnimation} whileHover="hover">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="white"
                        >
                          <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
                        </svg>
                      </IconBorder>
                      <IconBorder variants={IconAnimation} whileHover="hover">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="white"
                        >
                          <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z" />
                        </svg>
                      </IconBorder>

                      <IconBorder
                        variants={IconAnimation}
                        whileHover="hover"
                        onClick={() => {
                          onBoxClickedT(tv.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          fill="white"
                        >
                          <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
                        </svg>
                      </IconBorder>
                    </IconWrapper>
                  </Info>
                </Box>
              ))}
            </Contents>
          </ContentsWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
