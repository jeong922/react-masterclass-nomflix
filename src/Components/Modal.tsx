import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  getDetailsTV,
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

interface IModal {
  matchId: string;
  mediaType: string;
  where: String;
}

function MovieModal({ matchId, mediaType, where }: IModal) {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const searchTvId = new URLSearchParams(location.search).get("tv");
  const bigSearch = useMatch(`/search?keyword=${keyword}&tv=${searchTvId}`);

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

  const { data: detailTv } = useQuery<IGetMoivesDetail>(
    ["tv", "detailTv", mediaType, matchId],
    () => getDetailsTV(matchId)
  );

  const clickedData = matchId && detail?.id === +matchId;

  // const seasonNum = detailTv?.number_of_seasons; // 시즌 전부 담는건 일단 보류

  const seasonNum = 1;
  // console.log("seasonNum", seasonNum);

  const { data: seasonTV } = useQuery<ISeason>(
    ["tv", "seasonTV", matchId, seasonNum],
    () => getSeasonTV(matchId, seasonNum)
  );

  const season = mediaType === "tv" && matchId && seasonTV?.id === +matchId;
  // console.log("season", season);

  const onOverlayClick = () => {
    if (where === "Home") {
      navigate("/");
    } else if (where === "movies") {
      navigate("/movies");
    } else if (where === "tv") {
      navigate("/tv");
    }
  };

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
                  <BigTitle>{detail?.title || detailTv?.name}</BigTitle>
                  <Informaiton>
                    <BigOriginalTitle>
                      {detail?.original_title || detailTv?.original_name}
                    </BigOriginalTitle>
                    <BigReleaseDate>
                      <span>|</span>
                      {detail?.release_date
                        ? detail?.release_date.replaceAll("-", ".")
                        : detailTv?.first_air_date.replaceAll("-", ".")}
                      <span>|</span>
                    </BigReleaseDate>
                    {mediaType === "movie" ? (
                      <BigRuntime>{`${Math.floor(
                        detail.runtime / 60
                      )}시간 ${Math.floor(detail.runtime % 60)}분`}</BigRuntime>
                    ) : (
                      <BigRuntime>
                        시즌 {detailTv?.number_of_seasons}개
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
                </BigInfo>

                {mediaType === "tv" && seasonTV ? (
                  <TvSeason
                    key="seasonTV"
                    recomendApi={seasonTV}
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
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
}

export default MovieModal;
