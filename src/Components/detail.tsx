import { AnimatePresence, motion, useViewportScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Credit,
  getCredits,
  GetDetail,
  getDetails,
  getRecommendations,
  getSeasonTV,
  getSimilar,
  Recommendations,
  TVSeason,
} from '../api';
import { makeImagePath } from '../utilities';
import Reconmend from './recommendation';
import TvSeason from './tvSeason';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  will-change: opacity;
  z-index: 2;
`;

const CloseBtn = styled(motion.div)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
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
`;

const Wrapper = styled.div<{ scrolly: number }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  overflow-y: scroll;
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

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  min-width: 850px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  z-index: 3;
  overflow: hidden;
  top: 50px;
  will-change: opacity;
  @media screen and (max-width: 48rem) {
    width: 100%;
    min-width: 0px;
    font-size: 0.8rem;
  }
`;

const BigCover = styled.div`
  width: 100%;
  height: 22.5vw;
  min-height: 480px;
  background-size: cover;
  background-position: center center;
  border-radius: 10px 10px 0 0;
  @media screen and (max-width: 48rem) {
    height: 56vw;
    min-height: 0px;
  }
`;

const YoutubeVideo = styled.iframe`
  width: 100%;
  height: 22.5vw;
  min-height: 480px;
  background-size: cover;
  background-position: center center;
  border-radius: 10px 10px 0 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  @media screen and (max-width: 48rem) {
    height: 56vw;
    min-height: 0px;
  }
`;

const BigInfo = styled.div`
  position: relative;
  top: -70px;
  padding: 0 30px;
  margin-bottom: -50px;
`;

const InfoTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 5.188rem;
`;

const ShowImage = styled.div`
  margin-bottom: 10px;
  button {
    min-width: 6.563em;
    font-size: 1em;
    padding: 0.6em;
    background-color: rgb(20, 20, 20, 0.7);
    color: ${(props) => props.theme.white.lighter};
    border: none;
    cursor: pointer;
  }
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 1.75em;
  padding: 20px 0;
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
  font-size: 20px;
  font-weight: 500;
  margin-right: 10px;
`;

const BigReleaseDate = styled.h4`
  color: ${(props) => props.theme.white.lighter};
  margin-right: 10px;
  opacity: 0.7;
  font-size: 1rem;
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
  font-size: 1rem;
`;

const BigGenres = styled.div`
  color: ${(props) => props.theme.white.lighter};
  opacity: 0.7;
  margin-bottom: 15px;
  font-size: 1rem;
  span {
    margin-right: 10px;
  }
`;

const BigCredit = styled.div`
  color: ${(props) => props.theme.white.lighter};
  opacity: 0.7;
  margin-bottom: 15px;
  font-size: 1rem;
  span {
    margin-right: 10px;
  }
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.6;
  margin-bottom: 40px;
  font-size: 1rem;
`;

const SeasonWrapper = styled(motion.div)`
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
  position: relative;
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

const SeasonList = styled(motion.ul)`
  position: absolute;
  max-height: 260px;
  min-width: 200px;
  background-color: rgb(47, 47, 47);
  border: 1.5px solid rgb(77, 77, 77);
  border-radius: 5px;
  padding: 10px 0;
  margin-top: 2px;
  right: 0;
  z-index: 4;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.black.darker};
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
`;

const SeasonSelector = styled(motion.li)`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  div {
    align-items: center;
    font-size: 0.938rem;
    font-weight: 600;
    margin-right: 5px;
  }
`;

const NoContents = styled.div`
  width: 100%;
  min-height: 480px;
`;

const seasonVarients = {
  normal: { display: 'none' },
  clicked: { display: 'block' },
  hover: {
    backgroundColor: 'rgb(99, 99, 99)',
  },
  svg0: {
    rotateZ: 0,
  },
  svg180: {
    rotateZ: 180,
  },
};

type Modal = {
  matchId: string;
  mediaType: string;
  where: string;
};

function Detail({ matchId, mediaType, where }: Modal) {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useViewportScroll();
  const [seasonListDisplay, setSeasonListDisplay] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [seasonNum, setSeasonNum] = useState(1);
  const [scrollYData, setScrollYData] = useState(Number);
  const keyword = new URLSearchParams(location.search).get('keyword');
  const bigRef = useRef<HTMLDivElement>(null);
  const { data: detail, isLoading: detailLoading } = useQuery<GetDetail>(
    ['movies', 'detail', mediaType, matchId],
    () => getDetails(mediaType, matchId)
  );

  const { data: credit, isLoading: creditLoading } = useQuery<Credit>(
    ['movies', 'credit', mediaType, matchId],
    () => getCredits(mediaType, matchId)
  );

  const { data: recommendations, isLoading: recommendationsLoading } =
    useQuery<Recommendations>(
      ['movies', 'recommendations', mediaType, matchId],
      () => getRecommendations(mediaType, matchId)
    );

  const { data: similar, isLoading: similarLoading } =
    useQuery<Recommendations>(['movies', 'similar', mediaType, matchId], () =>
      getSimilar(mediaType, matchId)
    );

  const clickedData = (matchId && detail?.id) === +matchId;

  const seasonClicked = (season: number) => {
    setSeasonNum(season);
    setSeasonListDisplay(false);
  };

  const { data: seasonTV } = useQuery<TVSeason>(
    ['tv', 'seasonTV', matchId, seasonNum],
    () => getSeasonTV(matchId, seasonNum)
  );
  const loading =
    detailLoading || creditLoading || recommendationsLoading || similarLoading;

  useEffect(() => {
    setScrollYData(scrollY.get());
  }, [clickedData, scrollY]);

  useEffect(() => {
    if (clickedData) {
      bigRef.current?.scrollTo(0, 0);
    }
  }, [clickedData, matchId]);

  useEffect(() => {
    if (clickedData) {
      console.log('render');
      document.body.style.cssText = `
    position: fixed; 
    top: -${scrollYData}px;
    overflow-y: scroll;
    width: 100%;`;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [scrollYData, clickedData]);

  useEffect(() => {
    setSeasonNum(1);
    setShowImage(true);
  }, [matchId]); // 시즌1로 초기화

  const onOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      if (where === 'home') {
        navigate('/');
        setShowImage(true);
      } else if (where === 'movies') {
        navigate('/movies');
        setShowImage(true);
      } else if (where === 'tv') {
        navigate('/tv');
        setSeasonListDisplay(false);
        setSeasonNum(1);
        setShowImage(true);
      } else {
        navigate(`/search?keyword=${keyword}`);
        setSeasonListDisplay(false);
        setSeasonNum(1);
        setShowImage(true);
      }
    }
  };

  const onCloseBtnClick = () => {
    if (where === 'home') {
      navigate('/');
      setShowImage(true);
    } else if (where === 'movies') {
      navigate('/movies');
      setShowImage(true);
    } else if (where === 'tv') {
      navigate('/tv');
      setSeasonListDisplay(false);
      setSeasonNum(1);
      setShowImage(true);
    } else {
      navigate(`/search?keyword=${keyword}`);
      setSeasonListDisplay(false);
      setSeasonNum(1);
      setShowImage(true);
    }
  };

  const seasonToggleClicked = () => setSeasonListDisplay((prev) => !prev);
  const showContentsImage = () => setShowImage((prev) => !prev);

  return (
    <AnimatePresence>
      {loading ||
        (clickedData && (
          <>
            <Overlay animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <Wrapper
              onClick={(event) => onOverlayClick(event)}
              scrolly={scrollYData}
              ref={bigRef}
            >
              <BigMovie animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CloseBtn onClick={onCloseBtnClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 320 512"
                  >
                    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                  </svg>
                </CloseBtn>

                {detail && (
                  <>
                    {detail.videos.results.length > 0 && showImage === true ? (
                      <YoutubeVideo
                        src={`https://www.youtube.com/embed/${detail.videos.results[0].key}?autoplay=1&mute=0&controls=0&loop=1&rel=0`}
                        allow="autoplay"
                        frameBorder="0"
                      />
                    ) : (
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top,rgb(24, 24, 24), transparent), url(${makeImagePath(
                            detail?.backdrop_path || detail?.poster_path
                          )})`,
                        }}
                      />
                    )}

                    <BigInfo>
                      <InfoTop>
                        {detail.videos.results.length <= 0 ||
                        showImage === false ? (
                          <BigTitle>{detail?.title || detail?.name}</BigTitle>
                        ) : (
                          <BigTitle></BigTitle>
                        )}
                        {detail.videos.results.length > 0 && (
                          <ShowImage>
                            <button onClick={showContentsImage}>
                              {showImage ? '영상 그만보기' : '관련 영상 보기'}
                            </button>
                          </ShowImage>
                        )}
                      </InfoTop>

                      <Informaiton>
                        <BigOriginalTitle>
                          {detail?.original_title || detail?.original_name}
                        </BigOriginalTitle>
                        <BigReleaseDate>
                          <span>|</span>
                          {detail?.release_date
                            ? detail?.release_date.replaceAll('-', '.')
                            : detail?.first_air_date
                            ? detail?.first_air_date.replaceAll('-', '.')
                            : detail.status}
                          <span>|</span>
                        </BigReleaseDate>
                        {mediaType === 'movie' && detail.runtime > 0 ? (
                          <BigRuntime>{`${Math.floor(
                            detail.runtime / 60
                          )}시간 ${Math.floor(
                            detail.runtime % 60
                          )}분`}</BigRuntime>
                        ) : mediaType === 'tv' ? (
                          <BigRuntime>
                            시즌 {detail?.number_of_seasons}개
                          </BigRuntime>
                        ) : null}
                      </Informaiton>
                      <BigGenres>
                        <span>장르:</span>
                        {detail.genres.map((item) => (
                          <span key={item.id}>{item.name}</span>
                        ))}
                      </BigGenres>
                      <BigCredit>
                        <span>출연:</span>
                        {credit?.cast.slice(0, 5).map((item) => (
                          <span key={item.id}>{item.name}</span>
                        ))}
                      </BigCredit>
                      <BigOverview>{detail?.overview}</BigOverview>

                      {mediaType === 'tv' && (
                        <SeasonWrapper>
                          <h3>회차</h3>
                          {detail.number_of_seasons > 1 ? (
                            <SeasonDropDown>
                              <SeasonBtn onClick={seasonToggleClicked}>
                                <span>시즌 {seasonNum}</span>
                                <ToggleWrapper
                                  variants={seasonVarients}
                                  initial="svg0"
                                  animate={
                                    seasonListDisplay ? 'svg180' : 'svg0'
                                  }
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
                                animate={
                                  seasonListDisplay ? 'clicked' : 'normal'
                                }
                              >
                                {detail.seasons.map((season) => (
                                  <SeasonSelector
                                    variants={seasonVarients}
                                    whileHover="hover"
                                    key={season.season_number}
                                    onClick={() =>
                                      seasonClicked(season.season_number)
                                    }
                                  >
                                    <div>{season.name}</div>
                                    <span>
                                      ({season.episode_count}개 에피소드)
                                    </span>
                                  </SeasonSelector>
                                ))}
                              </SeasonList>
                            </SeasonDropDown>
                          ) : (
                            <Season1>시즌 1</Season1>
                          )}
                        </SeasonWrapper>
                      )}

                      {mediaType === 'tv' && (
                        <>
                          <NoContents>
                            {seasonTV && (
                              <TvSeason
                                key="seasonTV"
                                seasonApi={seasonTV}
                                mediaType={mediaType}
                                season={seasonNum}
                              />
                            )}
                          </NoContents>
                        </>
                      )}

                      {recommendations && (
                        <Reconmend
                          key="recommendationMovie"
                          recommendApi={recommendations}
                          title="추천 콘텐츠"
                          mediaType={mediaType}
                          where={where}
                        />
                      )}

                      {similar && (
                        <Reconmend
                          key="similarMovie"
                          recommendApi={similar}
                          title="비슷한 콘텐츠"
                          mediaType={mediaType}
                          where={where}
                        />
                      )}
                    </BigInfo>
                  </>
                )}
              </BigMovie>
            </Wrapper>
          </>
        ))}
    </AnimatePresence>
  );
}

export default React.memo(Detail);
