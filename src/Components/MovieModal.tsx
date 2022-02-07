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
  getSeasonTV,
  getSimilarMovies,
  getSimilarTV,
  IGetMoivesDetail,
  IMovieCredit,
  IMovieRecommendations,
  ISeason,
} from "../api";
import { makeImagePath } from "../utilities";
import Reconmend from "./Recomend";

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

const MoreBtnWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120px;
  z-index: 3;
  background: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 1));
  border-bottom: 2px solid #404040;
`;

const MoreBoxBtn = styled(motion.button)`
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 50%;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
`;

const SeasonWapper = styled(motion.div)`
  position: relative;
  top: -50px;
  margin-top: 10px;
  padding: 0px 20px;
  width: 100%;
`;

const Season = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Episode = styled.div`
  display: flex;
`;

const SeasonNumber = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.7);
`;

const EpisodeStill = styled.div<{ bgPhoto: string }>`
  background-color: white;
  height: 100px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  width: 30%;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 5px 0px;
  span {
    &:first-child {
      font-weight: 600;
      margin-bottom: 5px;
    }
    &:last-child {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
    }
  }
`;

const SeasonBtn = styled.button`
  /* width: 80px; */
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.black.lighter};
  background-color: transparent;
  color: ${(props) => props.theme.white.lighter};
  font-size: 15px;
`;

const EpisodeVariants = {
  normal: {
    maxHeight: 480,
  },
  clicked: {
    maxHeight: "none",
  },
  nonClicked: {
    maxHeight: 480,
  },
};

const moreWrapperBtnVariants = {
  btn_position1: {
    top: -120,
  },
  btn_position2: {
    top: -40,
  },
};

const moreBtnVariants = {
  rotate0: {
    rotateZ: 0,
  },
  rotate1: {
    rotateZ: 180,
  },
  rotate2: {
    rotateZ: 0,
  },
  hover: {
    border: "2px solid rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};

function MovieModal() {
  const [more3, setMore3] = useState(false);
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const bigMovieMatchMovie = useMatch("/movies/:Id");
  const matchMovieId = bigMovieMatchMovie?.params.Id;
  const bigMovieMatchTv = useMatch("/tv/:Id");
  const matchTvId = bigMovieMatchTv?.params.Id;
  console.log("bigMovieMatchTv", bigMovieMatchTv);
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

  const { data: detailTv } = useQuery<IGetMoivesDetail>(
    ["tv", "detailTv", matchTvId],
    () => getDetailsTV(matchTvId + "")
  );
  // console.log("detail", detail);

  const { data: creditTv } = useQuery<IMovieCredit>(
    ["tv", "creditTv", matchTvId],
    () => getCreditsTV(matchTvId + "")
  );
  // console.log("credit", credit);

  const { data: recommendationsTv } = useQuery<IMovieRecommendations>(
    ["tv", "recommendationsTv", matchTvId],
    () => getRecommendationsTV(matchTvId + "")
  );
  // console.log("recommendationsTv", recommendationsTv);

  const { data: similarTv } = useQuery<IMovieRecommendations>(
    ["tv", "similarTv", matchTvId],
    () => getSimilarTV(matchTvId + "")
  );
  // console.log("similarTv", similarTv);

  // const seasonNum = detailTv?.number_of_seasons; // 시즌 전부 담는건 일단 보류
  const seasonNum = 1;
  console.log("seasonNum", seasonNum);

  const { data: seasonTV } = useQuery<ISeason>(
    ["tv", "seasonTV", matchTvId, seasonNum],
    () => getSeasonTV(matchTvId + "", seasonNum + "")
  );

  const onOverlayClickM = () => {
    navigate("/movies");
  };
  const onOverlayClickT = () => {
    navigate("/tv");
    setMore3(false);
  };

  const toggleClicked3 = () => setMore3((prev) => !prev);

  return (
    <AnimatePresence>
      {bigMovieMatchMovie && (
        <>
          <Overlay
            onClick={onOverlayClickM}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // layoutId={bigMovieMatchMovie.params.movieId}
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

                {recommendations ? (
                  <Reconmend
                    key="recommendationMovie"
                    recomendApi={recommendations}
                    title="추천 콘텐츠"
                    mediaType="movie"
                  />
                ) : null}

                {similar ? (
                  <Reconmend
                    key="similarMovie"
                    recomendApi={similar}
                    title="비슷한 콘텐츠"
                    mediaType="movie"
                  />
                ) : null}
              </>
            )}
          </BigMovie>
        </>
      )}

      {bigMovieMatchTv && (
        <>
          <Overlay
            onClick={onOverlayClickT}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // layoutId={bigMovieMatch.params.movieId}
          >
            {detailTv && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      detailTv?.backdrop_path || detailTv?.poster_path
                    )})`,
                  }}
                />
                <BigInfo>
                  <BigTitle>{detailTv?.name}</BigTitle>
                  <Informaiton>
                    <BigOriginalTitle>
                      {detailTv?.original_name}
                    </BigOriginalTitle>
                    <BigReleaseDate>
                      <span>|</span>
                      {detailTv?.first_air_date
                        ? detailTv?.first_air_date.replaceAll("-", ".")
                        : null}
                      <span>|</span>
                    </BigReleaseDate>
                    <BigRuntime>
                      시즌 {detailTv?.number_of_seasons}개
                    </BigRuntime>
                  </Informaiton>
                  <BigGenres>
                    <span>장르:</span>
                    {detailTv.genres.map((item) => (
                      <span>{item.name}</span>
                    ))}
                  </BigGenres>
                  <BigCredit>
                    <span>출연:</span>
                    {creditTv?.cast.slice(0, 5).map((item) => (
                      <span>{item.name}</span>
                    ))}
                  </BigCredit>
                  <BigOverview>{detailTv?.overview}</BigOverview>
                </BigInfo>

                <SeasonWapper>
                  <Season
                    variants={EpisodeVariants}
                    initial="normal"
                    animate={more3 ? "clicked" : "nonClicked"}
                  >
                    <SeasonBtn>시즌 1</SeasonBtn>
                    {seasonTV?.episodes.slice(0).map((season) => (
                      <Episode>
                        <SeasonNumber>{season.episode_number}</SeasonNumber>
                        <EpisodeStill
                          key={season.id}
                          bgPhoto={makeImagePath(season.still_path)}
                        ></EpisodeStill>
                        <EpisodeInfo>
                          <span>{season.name}</span>
                          <span>
                            {season.overview.length! > 100
                              ? `${season.overview.slice(0, 100)}...`
                              : season.overview}
                          </span>
                        </EpisodeInfo>
                      </Episode>
                    ))}
                  </Season>
                  <MoreBtnWrapper
                    variants={moreWrapperBtnVariants}
                    initial="btn_position1"
                    animate={more3 ? "btn_position2" : "btn_position1"}
                  >
                    <MoreBoxBtn
                      onClick={toggleClicked3}
                      variants={moreBtnVariants}
                      initial="rotate0"
                      animate={more3 ? "rotate1" : "rotate2"}
                      whileHover="hover"
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
                    </MoreBoxBtn>
                  </MoreBtnWrapper>
                </SeasonWapper>

                {recommendationsTv ? (
                  <Reconmend
                    key="recommendationsTv"
                    recomendApi={recommendationsTv}
                    title="추천 콘텐츠"
                    mediaType="tv"
                  />
                ) : null}

                {similarTv ? (
                  <Reconmend
                    key="similarTv"
                    recomendApi={similarTv}
                    title="비슷한 콘텐츠"
                    mediaType="tv"
                  />
                ) : null}
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
}

export default MovieModal;
