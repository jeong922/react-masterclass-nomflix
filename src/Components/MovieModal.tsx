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
  getPopularMovies,
  getRecommendationsMovies,
  getRecommendationsTV,
  getSeasonTV,
  getSimilarMovies,
  getSimilarTV,
  IGetMoivesDetail,
  IGetMoivesResult,
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

function MovieModal() {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  // const bigMatchHome = useMatch("/:Id");
  const bigMatchMovie = useMatch("/movies/:Id");
  const matchMovieId = String(bigMatchMovie?.params.Id);
  const bigMatchTv = useMatch("/tv/:Id");
  const matchTvId = String(bigMatchTv?.params.Id);
  const bigMatchHome = useMatch("/:Id");
  const matchHomeId = String(bigMatchHome?.params.Id);
  console.log("bigMovieMatchTv", bigMatchTv);
  // console.log("bigMatchMovie", bigMatchMovie);
  console.log("bigMatchHome", bigMatchHome);
  // console.log("matchMovieId", matchMovieId);

  const { data } = useQuery<IGetMoivesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  const { data: detailH } = useQuery<IGetMoivesDetail>(
    ["movies", "detail", matchHomeId],
    () => getDetailsMovies(matchHomeId)
  );
  // console.log("detail", detail);

  const { data: creditH } = useQuery<IMovieCredit>(
    ["movies", "credit", matchHomeId],
    () => getCreditsMovies(matchHomeId)
  );
  // console.log("credit", credit);

  const { data: recommendationsH } = useQuery<IMovieRecommendations>(
    ["movies", "recommendations", matchHomeId],
    () => getRecommendationsMovies(matchHomeId)
  );
  // console.log("recommendations", recommendations);

  const { data: similarH } = useQuery<IMovieRecommendations>(
    ["movies", "similar", matchHomeId],
    () => getSimilarMovies(matchHomeId)
  );

  const { data: detail } = useQuery<IGetMoivesDetail>(
    ["movies", "detail", matchMovieId],
    () => getDetailsMovies(matchMovieId)
  );
  // console.log("detail", detail);

  const { data: credit } = useQuery<IMovieCredit>(
    ["movies", "credit", matchMovieId],
    () => getCreditsMovies(matchMovieId)
  );
  // console.log("credit", credit);

  const { data: recommendations } = useQuery<IMovieRecommendations>(
    ["movies", "recommendations", matchMovieId],
    () => getRecommendationsMovies(matchMovieId)
  );
  // console.log("recommendations", recommendations);

  const { data: similar } = useQuery<IMovieRecommendations>(
    ["movies", "similar", matchMovieId],
    () => getSimilarMovies(matchMovieId)
  );
  // console.log("similar", similar);

  const { data: detailTv } = useQuery<IGetMoivesDetail>(
    ["tv", "detailTv", matchTvId],
    () => getDetailsTV(matchTvId)
  );
  // console.log("detail", detail);

  const { data: creditTv } = useQuery<IMovieCredit>(
    ["tv", "creditTv", matchTvId],
    () => getCreditsTV(matchTvId)
  );
  // console.log("credit", credit);

  const { data: recommendationsTv } = useQuery<IMovieRecommendations>(
    ["tv", "recommendationsTv", matchTvId],
    () => getRecommendationsTV(matchTvId)
  );
  // console.log("recommendationsTv", recommendationsTv);

  const { data: similarTv } = useQuery<IMovieRecommendations>(
    ["tv", "similarTv", matchTvId],
    () => getSimilarTV(matchTvId)
  );
  // console.log("similarTv", similarTv);

  // const clickedMovie =
  //   bigMatchMovie?.params.Id &&
  //   data?.results.find((movie) => movie.id === bigMatchMovie.params.Id);

  const clickedMovie =
    bigMatchMovie?.params.Id && detail?.id === +bigMatchMovie.params.Id;

  const clickedTv =
    bigMatchTv?.params.Id && detailTv?.id === +bigMatchTv.params.Id;

  const clickedHome =
    bigMatchHome?.params.Id &&
    data?.results.find((movie) => String(movie.id) === bigMatchHome.params.Id);
  // console.log("clickedHome", clickedHome);
  // console.log("bigMatchHome?.params.Id", bigMatchHome?.params.Id);

  // const seasonNum = detailTv?.number_of_seasons; // 시즌 전부 담는건 일단 보류

  const seasonNum = 1;
  // console.log("seasonNum", seasonNum);

  const { data: seasonTV } = useQuery<ISeason>(
    ["tv", "seasonTV", matchTvId, seasonNum],
    () => getSeasonTV(matchTvId, seasonNum)
  );

  const season =
    bigMatchTv?.params.Id && seasonTV?.id === +bigMatchTv.params.Id;
  console.log("season", season);
  const onOverlayClickM = () => {
    navigate("/movies");
  };
  const onOverlayClickT = () => {
    navigate("/tv");
  };
  const onOverlayClick = () => {
    navigate("/");
  };

  return (
    <AnimatePresence>
      {clickedHome && (
        <>
          <Overlay
            onClick={clickedMovie ? onOverlayClickM : onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // layoutId={bigMatchMovie.params.Id + ""}
          >
            {detailH && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      detailH?.backdrop_path || detailH?.poster_path
                    )})`,
                  }}
                />

                <BigInfo>
                  <BigTitle>{detailH?.title}</BigTitle>
                  <Informaiton>
                    <BigOriginalTitle>
                      {detailH?.original_title}
                    </BigOriginalTitle>
                    <BigReleaseDate>
                      <span>|</span>
                      {detailH?.release_date
                        ? detailH?.release_date.replaceAll("-", ".")
                        : null}
                      <span>|</span>
                    </BigReleaseDate>
                    <BigRuntime>{`${Math.floor(
                      detailH.runtime / 60
                    )}시간 ${Math.floor(detailH.runtime % 60)}분`}</BigRuntime>
                  </Informaiton>
                  <BigGenres>
                    <span>장르:</span>
                    {detailH.genres.map((item) => (
                      <span>{item.name}</span>
                    ))}
                  </BigGenres>
                  <BigCredit>
                    <span>출연:</span>
                    {creditH?.cast.slice(0, 5).map((item) => (
                      <span>{item.name}</span>
                    ))}
                  </BigCredit>
                  <BigOverview>{detailH?.overview}</BigOverview>
                </BigInfo>
              </>
            )}
          </BigMovie>
        </>
      )}

      {clickedMovie && (
        <>
          <Overlay
            onClick={clickedMovie ? onOverlayClickM : onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // layoutId={bigMatchMovie.params.Id + ""}
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

      {clickedTv && (
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

                {seasonTV && (
                  <TvSeason
                    key="seasonTV"
                    recomendApi={seasonTV}
                    title="시즌"
                    mediaType="tv"
                    season={seasonNum}
                  />
                )}

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
