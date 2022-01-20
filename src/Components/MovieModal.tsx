import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { Item } from "framer-motion/types/components/Reorder/Item";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getCreditsMovies,
  getDetailsMovies,
  getNowPlayMovies,
  getRecommendationsMovies,
  getSimilarMovies,
  IGetMoivesDetail,
  IGetMoivesResult,
  IMovieCredit,
  IMovieRecommendations,
} from "../api";
import { makeImagePath } from "../utilities";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 3;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  /* height: 100vh; */
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  /* overflow: hidden; */
  /* overflow-y: scroll; */
  /* overflow-x: hidden; */
  border-radius: 10px;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: 1px solid rgba(225, 255, 255, 0.2);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
  border-radius: 10px 10px 0 0;
`;

const BigInfo = styled.div`
  position: relative;
  top: -70px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 28px;
  position: relative;
  padding: 20px;
  /* top: -80px; */
  font-weight: 600;
  margin-bottom: 10px;
`;

const Informaiton = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
`;

const BigOriginalTitle = styled.span`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  font-size: 20px;
  font-weight: 500;
  margin-right: 10px;
`;

const BigReleaseDate = styled.h4`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  margin-right: 10px;
  opacity: 0.7;
  span:first-child {
    margin-right: 10px;
  }
  span:last-child {
    margin-left: 10px;
  }
`;

const BigRuntime = styled.span`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  opacity: 0.7;
`;

const BigGenres = styled.div`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  padding: 0 20px;
  opacity: 0.7;
  margin-bottom: 10px;
  span {
    margin-right: 10px;
  }
`;

const BigCredit = styled.div`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  padding: 0 20px;
  opacity: 0.7;
  span {
    margin-right: 10px;
  }
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  line-height: 1.6;
`;

const RecomenBox = styled.div`
  position: relative;
  top: -50px;
  margin-top: 10px;
  /* max-height: 500px; */
`;

const BigRecomenMovie = styled.span`
  margin-left: 20px;
  font-weight: 600;
  font-size: 25px;
`;

const BigRecomen = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  /* position: relative; */
  width: 100%;
  padding: 20px;
`;

const Recomen = styled.div<{ bgPhoto: string }>`
  position: relative;
  background-color: white;
  height: 150px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  z-index: 2;
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
  background-color: ${(props) => props.theme.black.darker};
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 16px;
  text-align: center;
`;

function MovieModal() {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const matchId = bigMovieMatch?.params.movieId;
  console.log("bigMovieMatch", bigMovieMatch);
  const { data: detail } = useQuery<IGetMoivesDetail>(
    ["movies", "detail", matchId],
    () => getDetailsMovies(matchId + "")
  );
  console.log("detail", detail);

  const { data: credit } = useQuery<IMovieCredit>(
    ["movies", "credit", matchId],
    () => getCreditsMovies(matchId + "")
  );
  console.log("credit", credit);

  const { data: recommendations } = useQuery<IMovieRecommendations>(
    ["movies", "recommendations", matchId],
    () => getRecommendationsMovies(matchId + "")
  );
  console.log("recommendations", recommendations);

  const { data: similar } = useQuery<IMovieRecommendations>(
    ["movies", "similar", matchId],
    () => getSimilarMovies(matchId + "")
  );
  console.log("recommendations", recommendations);

  const onOverlayClick = () => navigate("/movies");
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  // const clickedMovie =
  //   matchId && data?.results.find(
  //     (movie) => String(movie.id) === bigMovieMatch.params.movieId
  //   );
  // console.log(clickedMovie);
  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // layoutId={bigMovieMatch.params.movieId}
          >
            {detail && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      detail?.backdrop_path || detail?.poster_path,
                      "w500"
                    )})`,
                  }}
                />

                <BigInfo>
                  <BigTitle>{detail?.title}</BigTitle>
                  <Informaiton>
                    <BigOriginalTitle>
                      {detail?.original_title}
                    </BigOriginalTitle>
                    <BigReleaseDate>
                      <span>|</span>
                      {detail?.release_date.replaceAll("-", ".")}
                      <span>|</span>
                    </BigReleaseDate>
                    <BigRuntime>{`${Math.floor(
                      detail.runtime / 60
                    )}시간 ${Math.floor(detail.runtime % 60)}분`}</BigRuntime>
                  </Informaiton>
                  <BigGenres>
                    <span>장르:</span>
                    {detail.genres.map((item) => (
                      <span>{item.name}</span>
                    ))}
                  </BigGenres>
                  <BigCredit>
                    <span>출연:</span>
                    {credit?.cast.slice(0, 5).map((item) => (
                      <span>{item.name}</span>
                    ))}
                  </BigCredit>
                  <BigOverview>{detail?.overview}</BigOverview>
                </BigInfo>
                <RecomenBox>
                  <BigRecomenMovie>추천 콘텐츠</BigRecomenMovie>
                  <BigRecomen>
                    {recommendations?.results.slice(0).map((item) => (
                      <Recomen
                        key={item.id}
                        bgPhoto={makeImagePath(
                          item.backdrop_path || item.poster_path,
                          "w500"
                        )}
                        onClick={() => onBoxClicked(item.id)}
                      >
                        <Info>{item.title}</Info>
                      </Recomen>
                    ))}
                  </BigRecomen>
                </RecomenBox>
                <RecomenBox>
                  <BigRecomenMovie>비슷한 콘텐츠</BigRecomenMovie>
                  <BigRecomen>
                    {similar?.results.slice(0).map((item) => (
                      <Recomen
                        key={item.id}
                        bgPhoto={makeImagePath(
                          item.backdrop_path || item.poster_path,
                          "w500"
                        )}
                        onClick={() => onBoxClicked(item.id)}
                      >
                        <Info>{item.title}</Info>
                      </Recomen>
                    ))}
                  </BigRecomen>
                </RecomenBox>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default MovieModal;
