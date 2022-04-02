import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getValue } from "@testing-library/user-event/dist/utils";
import e from "express";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { Item } from "framer-motion/types/components/Reorder/Item";
import { title } from "process";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  getCreditsMovies,
  getDetailsMovies,
  getRecommendationsMovies,
  getSeasonTV,
  getSimilarMovies,
  IGetMoivesDetail,
  IMovieCredit,
  IMovieRecommendations,
  ISeason,
} from "../api";
import { makeImagePath } from "../utilities";
import Reconmend from "./Recomend";
import TvSeason from "./TvSeason";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 3;
`;

const CloseBtn = styled(motion.div)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 8px;
    background-color: ${(props) => props.theme.black.darker};
    svg {
      fill: ${(props) => props.theme.white.lighter};
    }
  }
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  /* top: 300px; */
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
  padding: 0 30px;
  margin-bottom: -50px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 28px;
  padding: 20px 0;
  /* top: -80px; */
  font-weight: 600;
  margin-bottom: 10px;
`;

const Informaiton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
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
  opacity: 0.7;
`;

const BigGenres = styled.div`
  color: ${(props) => props.theme.white.lighter};
  opacity: 0.7;
  margin-bottom: 15px;
  span {
    margin-right: 10px;
  }
`;

const BigCredit = styled.div`
  color: ${(props) => props.theme.white.lighter};
  opacity: 0.7;
  margin-bottom: 15px;
  span {
    margin-right: 10px;
  }
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.6;
  margin-bottom: 40px;
`;

const SeasonWapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100%;
  h3 {
    font-size: 25px;
    font-weight: 600;
  }
`;

const Season1 = styled.div`
  margin-right: 10px;
  font-size: 16px;
`;

const SeasonDropDown = styled.div`
  div {
    position: relative;
  }
`;

const SeasonBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  position: relative;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1.5px solid rgb(77, 77, 77);
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  span {
    margin-right: 20px;
  }
`;

const ToggleWrapper = styled(motion.div)`
  display: flex;
  svg {
    height: 16px;
    fill: ${(props) => props.theme.white.lighter};
  }
`;
// { seasonListDisplay: boolean }
const SeasonList = styled(motion.ul)`
  position: absolute;
  background-color: rgb(47, 47, 47);
  border: 1.5px solid rgb(77, 77, 77);
  border-radius: 5px;
  padding: 10px 0;
  z-index: 2;
`;

const SeasonSelector = styled(motion.li)`
  padding: 10px;
  display: flex;
  cursor: pointer;
  div {
    align-items: center;
    font-size: 16px;
  }
`;

const seasonVarients = {
  normal: { display: "none" },
  clicked: { display: "block" },
  hover: {
    backgroundColor: "rgb(99, 99, 99)",
  },
  svg0: {
    rotateZ: 0,
  },
  svg180: {
    rotateZ: 180,
  },
};

interface IModal {
  matchId: string;
  mediaType: string;
  where: string;
}

function MovieModal({ matchId, mediaType, where }: IModal) {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  // const location = useLocation();
  const [seasonListDisplay, setSeasonListDisplay] = useState(false);
  const [seasonNum, setSeasonNum] = useState(1);
  // const keyword = new URLSearchParams(location.search).get("keyword");
  // const searchTvId = new URLSearchParams(location.search).get("tv");
  // const bigSearch = useMatch(`/search?keyword=${keyword}&tv=${searchTvId}`);

  const { data: detail } = useQuery<IGetMoivesDetail>(
    ["movies", "detail", mediaType, matchId],
    () => getDetailsMovies(mediaType, matchId)
  );
  // console.log("detail", detail);

  const { data: credit } = useQuery<IMovieCredit>(
    ["movies", "credit", mediaType, matchId],
    () => getCreditsMovies(mediaType, matchId)
  );
  // console.log("credit", credit);

  const { data: recommendations } = useQuery<IMovieRecommendations>(
    ["movies", "recommendations", mediaType, matchId],
    () => getRecommendationsMovies(mediaType, matchId)
  );
  // console.log("recommendations", recommendations);

  const { data: similar } = useQuery<IMovieRecommendations>(
    ["movies", "similar", mediaType, matchId],
    () => getSimilarMovies(mediaType, matchId)
  );
  // console.log("similar", similar);

  const clickedData = matchId && detail?.id === +matchId;
  // ❗동작은 되는 이렇게만 해도 문제가 없는지 모르겠음..

  const seasonList = [];

  if (detail) {
    for (let i = 0; i < detail?.number_of_seasons; i++) {
      seasonList.push(i);
    }
  }
  // console.log("seasonList", seasonList);

  const seasonClicked = (season: number) => {
    setSeasonNum(season + 1);
    setSeasonListDisplay(false);
  };
  // console.log("seasonNum", seasonNum);

  const { data: seasonTV } = useQuery<ISeason>(
    ["tv", "seasonTV", matchId, seasonNum],
    () => getSeasonTV(matchId, seasonNum)
  );
  // console.log("seasonTV", seasonTV);

  const onOverlayClick = () => {
    if (where === "Home") {
      navigate("/");
    } else if (where === "movies") {
      navigate("/movies");
    } else if (where === "tv") {
      navigate("/tv");
      setSeasonListDisplay(false);
      setSeasonNum(1);
    }
  };

  const seasonToggleClicked = () => setSeasonListDisplay((prev) => !prev);

  return (
    <AnimatePresence>
      {clickedData && (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 50 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // layoutId={bigMatchMovie.params.Id + ""}
          >
            <CloseBtn onClick={onOverlayClick}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 320 512"
                >
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              </div>
            </CloseBtn>
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
                  <BigTitle>{detail?.title || detail?.name}</BigTitle>
                  <Informaiton>
                    <BigOriginalTitle>
                      {detail?.original_title || detail?.original_name}
                    </BigOriginalTitle>
                    <BigReleaseDate>
                      <span>|</span>
                      {detail?.release_date
                        ? detail?.release_date.replaceAll("-", ".")
                        : detail?.first_air_date.replaceAll("-", ".")}
                      <span>|</span>
                    </BigReleaseDate>
                    {mediaType === "movie" ? (
                      <BigRuntime>{`${Math.floor(
                        detail.runtime / 60
                      )}시간 ${Math.floor(detail.runtime % 60)}분`}</BigRuntime>
                    ) : (
                      <BigRuntime>
                        시즌 {detail?.number_of_seasons}개
                      </BigRuntime>
                    )}
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

                  {mediaType === "tv" ? (
                    <SeasonWapper>
                      <h3>회차</h3>
                      {seasonList.length > 1 ? (
                        <SeasonDropDown>
                          <div>
                            <SeasonBtn onClick={seasonToggleClicked}>
                              <span>시즌 {seasonNum}</span>
                              <ToggleWrapper
                                variants={seasonVarients}
                                initial="svg0"
                                animate={seasonListDisplay ? "svg180" : "svg0"}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 320 512"
                                >
                                  <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
                                </svg>
                              </ToggleWrapper>
                            </SeasonBtn>
                            <SeasonList
                              variants={seasonVarients}
                              initial="normal"
                              animate={seasonListDisplay ? "clicked" : "normal"}
                            >
                              {seasonList.map((season, index) => (
                                <SeasonSelector
                                  variants={seasonVarients}
                                  whileHover="hover"
                                  key={index}
                                  onClick={() => seasonClicked(season)}
                                >
                                  <div>시즌 {season + 1}</div>
                                </SeasonSelector>
                              ))}
                            </SeasonList>
                          </div>
                        </SeasonDropDown>
                      ) : (
                        <Season1>시즌 1</Season1>
                      )}
                    </SeasonWapper>
                  ) : null}

                  {mediaType === "tv" && seasonTV ? (
                    <TvSeason
                      key="seasonTV"
                      seasonApi={seasonTV}
                      title="시즌"
                      mediaType={mediaType}
                      season={seasonNum}
                    />
                  ) : null}
                  {where !== "Home" && recommendations && (
                    <Reconmend
                      key="recommendationMovie"
                      recomendApi={recommendations}
                      title="추천 콘텐츠"
                      mediaType={mediaType}
                    />
                  )}
                  {where !== "Home" && similar && (
                    <Reconmend
                      key="similarMovie"
                      recomendApi={similar}
                      title="비슷한 콘텐츠"
                      mediaType={mediaType}
                    />
                  )}
                </BigInfo>
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
}

export default MovieModal;
