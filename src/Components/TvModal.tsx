import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  getCreditsTV,
  getDetailsTV,
  getRecommendationsTV,
  getSeasonTV,
  getSimilarTV,
  IGetMoivesDetail,
  IMovieCredit,
  IMovieRecommendations,
  ISeason,
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

const SeasonWapper = styled.div``;
const Season = styled.ul``;

function TvModal() {
  const navigate = useNavigate();
  const [more1, setMore1] = useState(true);
  const [more2, setMore2] = useState(true);
  const [btnRotate, setBtnRotate] = useState(false);
  const { scrollY } = useViewportScroll();
  const bigMovieMatchTv = useMatch("/tv/:tvId");
  const matchTvId = bigMovieMatchTv?.params.tvId;
  console.log("bigMovieMatchTv", bigMovieMatchTv);

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

  // const { data: seasonTV } = useQuery<ISeason>(["tv", "seasonTV"], () =>
  //   getSeasonTV(matchTvId)
  // );

  const onOverlayClick = () => {
    navigate("/tv");
    setMore1(true);
    setMore2(true);
    setBtnRotate(false);
  };
  const onBigMovieBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
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
      {bigMovieMatchTv && (
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
                  <Season></Season>
                </SeasonWapper>

                <RecomenBoxWapper>
                  <BigRecomenMovie>추천 콘텐츠</BigRecomenMovie>
                  <RecomenBox more={more1} key="more1">
                    <BigRecomen>
                      {recommendationsTv?.results.slice(0).map((item) => (
                        <Recomen
                          key={item.id}
                          bgPhoto={makeImagePath(
                            item.backdrop_path || item.poster_path,
                            "w500"
                          )}
                          onClick={() => onBigMovieBoxClicked(item.id)}
                        >
                          <Info>{item.name}</Info>
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
                      {similarTv?.results.slice(0).map((item) => (
                        <Recomen
                          key={item.id}
                          bgPhoto={makeImagePath(
                            item.backdrop_path || item.poster_path,
                            "w500"
                          )}
                          onClick={() => onBigMovieBoxClicked(item.id)}
                        >
                          <Info>{item.name}</Info>
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

export default TvModal;
