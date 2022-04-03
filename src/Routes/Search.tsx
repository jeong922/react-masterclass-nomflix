import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getsearchMovies, getsearchTV, IGetMoivesResult } from "../api";
import Loader from "../Components/Loader";
import MovieModal from "../Components/Modal";
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

const NoContents = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 16px;
  }
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
  cursor: pointer;
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

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location", location);
  const keyword = new URLSearchParams(location.search).get("keyword");
  // console.log("keyword", keyword);

  const searchMovieId = new URLSearchParams(location.search).get("movie") + "";
  console.log("searchTvId", typeof searchMovieId);

  const searchTvId = new URLSearchParams(location.search).get("tv") + "";
  console.log("searchTvId", typeof searchTvId);

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
    navigate(`/search?keyword=${keyword}&movie=${Id}`);
  };
  const onBoxClickedT = (Id: number) => {
    navigate(`/search?keyword=${keyword}&tv=${Id}`);
  };
  // console.log("searchTV", searchTV);
  // console.log("searchMovie", searchMovie);
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          {searchMovie && searchMovie.total_results > 0 ? (
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
                    onClick={() => {
                      onBoxClickedM(movie.id);
                    }}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
              </Contents>
            </ContentsWrapper>
          ) : (
            <ContentsWrapper>
              <Title>{`"${keyword}"과(와) 관련 된 영화`}</Title>
              <NoContents>
                <h3>관련된 정보가 없어요.</h3>
              </NoContents>
            </ContentsWrapper>
          )}

          {searchTV && searchTV.total_results > 0 ? (
            <ContentsWrapper>
              <Title>{`"${keyword}"과(와) 관련 된 시리즈`}</Title>
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
                    </Info>
                  </Box>
                ))}
              </Contents>
            </ContentsWrapper>
          ) : (
            <ContentsWrapper>
              <Title>{`"${keyword}"과(와) 관련 된 시리즈`}</Title>
              <NoContents>
                <h3>관련된 정보가 없어요.</h3>
              </NoContents>
            </ContentsWrapper>
          )}

          {searchMovie && (
            <MovieModal
              matchId={searchMovieId}
              mediaType={"movie"}
              where={"search"}
            />
          )}
          {searchTV && (
            <MovieModal
              matchId={searchTvId}
              mediaType={"tv"}
              where={"search"}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
