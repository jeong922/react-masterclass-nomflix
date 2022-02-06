import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import e from "express";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { Item } from "framer-motion/types/components/Reorder/Item";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  getCreditsMovies,
  getCreditsTV,
  getDetailsMovies,
  getDetailsTV,
  getRecommendationsMovies,
  getRecommendationsTV,
  getSimilarMovies,
  getSimilarTV,
  IGetMoivesDetail,
  IMovieCredit,
  IMovieRecommendations,
} from "../api";
import { makeImagePath } from "../utilities";
import TvModal from "./TvModal";

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
  left: 0;
  right: 0;
  margin: 0 auto;
  /* top: 300px; // */
  background-color: ${(props) => props.theme.black.darker};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.8);
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

const RecomenBoxWapper = styled.div`
  position: relative;
  top: -50px;
  margin-top: 10px;
  padding: 0px 20px;
`;

const RecomenBox = styled.div<{ more: boolean }>`
  max-height: ${(props) => (props.more ? "480px" : "none")};
  overflow: hidden;
`;

const BigRecomenMovie = styled.div`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 15px;
`;

const BigRecomen = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  /* position: relative; */
  width: 100%;
`;

const Recomen = styled(motion.div)<{ bgPhoto: string }>`
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
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 16px;
  text-align: center;
`;

const RecomenBoxBtnWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120px;
  top: -70px;
  z-index: 2;
  background: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 1));
  border-bottom: 1px solid ${(props) => props.theme.black.lighter};
`;

const RecomenBoxBtn = styled.button<{ btnRotate: boolean }>`
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 3px solid ${(props) => props.theme.black.lighter};
  padding: 5px;
  border-radius: 50%;
  color: ${(props) => props.theme.black.lighter};
  transform: ${(props) => (props.btnRotate ? "rotateZ(180deg)" : "rotateZ(0)")};
  cursor: pointer;
  &:hover {
    border: 3px solid rgba(224, 224, 224, 0.4);
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

function MovieModal() {
  const navigate = useNavigate();
  const [more1, setMore1] = useState(true);
  const [more2, setMore2] = useState(true);
  const [btnRotate, setBtnRotate] = useState(false);
  const { scrollY } = useViewportScroll();
  const bigMovieMatchMovie = useMatch("/movies/:movieId" || "/:movieId");
  const matchMovieId = bigMovieMatchMovie?.params.movieId;
  console.log("bigMovieMatchMovie", bigMovieMatchMovie);
  console.log("matchMovieId", matchMovieId);
  const { data: detail } = useQuery<IGetMoivesDetail>(
    ["movies", "detail", matchMovieId],
    () => getDetailsMovies(matchMovieId + "")
  );
  // console.log("detail", detail);

  const { data: credit } = useQuery<IMovieCredit>(
    ["movies", "credit", matchMovieId],
    () => getCreditsMovies(matchMovieId + "")
  );
  // console.log("credit", credit);

  const { data: recommendations } = useQuery<IMovieRecommendations>(
    ["movies", "recommendations", matchMovieId],
    () => getRecommendationsMovies(matchMovieId + "")
  );
  // console.log("recommendations", recommendations);

  const { data: similar } = useQuery<IMovieRecommendations>(
    ["movies", "similar", matchMovieId],
    () => getSimilarMovies(matchMovieId + "")
  );
  // console.log("similar", similar);

  const onOverlayClick = () => {
    navigate("/movies");
    setMore1(true);
    setMore2(true);
    setBtnRotate(false);
  };
  const onBigMovieBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    navigate(`/${movieId}`);
  };
  const handleMoreBtn1 = () => {
    setMore1(more1 === false ? true : false);
    setBtnRotate(btnRotate === true ? false : true);
  };

  const handleMoreBtn2 = () => {
    setMore2(more2 === false ? true : false);
    setBtnRotate(btnRotate === true ? false : true);
  };

  return (
    <AnimatePresence>
      {bigMovieMatchMovie && (
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
                      detail?.backdrop_path || detail?.poster_path
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
                      {detail?.release_date
                        ? detail?.release_date.replaceAll("-", ".")
                        : null}
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

                <RecomenBoxWapper>
                  <BigRecomenMovie>추천 콘텐츠</BigRecomenMovie>
                  <RecomenBox more={more1} key="more1">
                    <BigRecomen>
                      {recommendations?.results.slice(0).map((item) => (
                        <Recomen
                          key={item.id}
                          bgPhoto={makeImagePath(
                            item.backdrop_path || item.poster_path,
                            "w500"
                          )}
                          onClick={() => onBigMovieBoxClicked(item.id)}
                        >
                          <Info>{item.title}</Info>
                        </Recomen>
                      ))}
                    </BigRecomen>
                  </RecomenBox>
                  <RecomenBoxBtnWrapper>
                    <RecomenBoxBtn
                      onClick={handleMoreBtn1}
                      btnRotate={btnRotate}
                    >
                      <motion.svg
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
                      </motion.svg>
                    </RecomenBoxBtn>
                  </RecomenBoxBtnWrapper>
                </RecomenBoxWapper>
                <RecomenBoxWapper>
                  <RecomenBox more={more2} key="more2">
                    <BigRecomenMovie>비슷한 콘텐츠</BigRecomenMovie>
                    <BigRecomen>
                      {similar?.results.slice(0).map((item) => (
                        <Recomen
                          key={item.id}
                          bgPhoto={makeImagePath(
                            item.backdrop_path || item.poster_path,
                            "w500"
                          )}
                          onClick={() => onBigMovieBoxClicked(item.id)}
                        >
                          <Info>{item.title}</Info>
                        </Recomen>
                      ))}
                    </BigRecomen>
                  </RecomenBox>
                  <RecomenBoxBtnWrapper>
                    <RecomenBoxBtn
                      onClick={handleMoreBtn2}
                      btnRotate={btnRotate}
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
                    </RecomenBoxBtn>
                  </RecomenBoxBtnWrapper>
                </RecomenBoxWapper>
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
}

export default MovieModal;
