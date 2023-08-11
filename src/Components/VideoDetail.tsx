import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Credit, GetDetail, RelatedContent, TVSeason } from '../api/api';
import { useContentsApi } from '../context/ApiContext';
import { makeImagePath } from '../utilities';
import Loader from './Loader';
import RelatedContents from './RelatedContents';
import TvSeason from './TvSeason';
import VideoInfo from './VideoInfo';
import TvSeasonMenu from './TvSeasonMenu';
import { MediaType, Where } from '../model/type';

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.7);
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

const BigMovie = styled(motion.div)`
  position: relative;
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
  @media screen and (max-width: 870px) {
    width: 100%;
    min-width: 0px;
    font-size: 0.8rem;
  }
`;

const BigCover = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center center;
`;

const YoutubeVideo = styled.iframe`
  width: 100%;
  border: none;
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
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
  min-height: 5rem;
`;

const ShowImage = styled.div`
  margin-bottom: 0.6em;
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
  padding: 1.25em 0;
  font-weight: 600;
  margin-bottom: 10px;
`;

const NoContents = styled.div`
  width: 100%;
  min-height: 480px;
`;

type Props = {
  matchId: string;
  mediaType: MediaType;
  where: Where;
};

function VideoDetail({ matchId, mediaType, where }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { contentsApi } = useContentsApi();
  const [seasonListDisplay, setSeasonListDisplay] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [seasonNum, setSeasonNum] = useState({ season: 1, name: '시즌 1' });
  const [videoList, setVideoList] = useState<any>();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const bigRef = useRef<HTMLDivElement>(null);

  const { data: detail, isLoading: detailLoading } = useQuery<GetDetail>(
    ['detail', mediaType, matchId],
    () => contentsApi.getDetails(mediaType, matchId)
  );

  const clickedData = (matchId && detail?.id) === +matchId;

  const { data: credit, isLoading: creditLoading } = useQuery<Credit>(
    ['credit', mediaType, matchId],
    () => contentsApi.getCredits(mediaType, matchId)
  );

  const { data: recommendations, isLoading: recommendationsLoading } =
    useQuery<RelatedContent>(['recommendations', mediaType, matchId], () =>
      contentsApi.getRecommendations(mediaType, matchId)
    );

  const { data: similar, isLoading: similarLoading } = useQuery<RelatedContent>(
    ['similar', mediaType, matchId],
    () => contentsApi.getSimilar(mediaType, matchId)
  );

  const seasonClicked = useCallback((season: number, name: string) => {
    setSeasonNum({ season, name });
    setSeasonListDisplay(false);
  }, []);

  const { data: seasonTV } = useQuery<TVSeason>(
    ['seasonTV', matchId, seasonNum.season],
    () => contentsApi.getSeasonTV(matchId, seasonNum.season)
  );

  const loading =
    detailLoading || creditLoading || recommendationsLoading || similarLoading;

  const changeWhere = useCallback(() => {
    if (where === 'home') {
      navigate('/');
      setShowImage(true);
      return;
    }
    if (where === 'movies') {
      navigate('/movies');
      setShowImage(true);
      return;
    }
    if (where === 'tv') {
      navigate('/tv');
      setSeasonListDisplay(false);
      setShowImage(true);
      return;
    }
    if (where === 'search') {
      navigate(`/search?keyword=${keyword}`);
      setSeasonListDisplay(false);
      setShowImage(true);
      return;
    }
  }, [where, keyword, navigate]);

  useEffect(() => {
    if (clickedData) {
      bigRef.current?.scrollTo(0, 0);
    }
  }, [clickedData, matchId]);

  useEffect(() => {
    if (clickedData) {
      document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [clickedData]);

  useEffect(() => {
    setShowImage(true);
  }, [matchId]);

  const seasonToggleClicked = useCallback(() => {
    setSeasonListDisplay((prev) => !prev);
  }, []);

  const showContentsImage = useCallback(() => {
    setShowImage((prev) => !prev);
  }, []);

  useEffect(() => {
    if (clickedData && detail && detail?.videos.results.length > 0) {
      const teaser = detail?.videos.results.find(
        (item) => item.type === 'Trailer'
      );
      setVideoList(teaser?.key);
    }
  }, [clickedData, detail]);

  useEffect(() => {
    if (detail?.seasons) {
      const season = detail?.seasons[0].season_number;
      const name = detail?.seasons[0].name;
      setSeasonNum({ season, name });
    }
  }, [detail?.seasons]);

  return (
    <AnimatePresence>
      {loading ? (
        <Loader />
      ) : (
        clickedData && (
          <>
            <Overlay
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  changeWhere();
                }
              }}
              ref={bigRef}
            >
              <BigMovie>
                <CloseBtn onClick={() => changeWhere()}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 320 512'
                  >
                    <path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z' />
                  </svg>
                </CloseBtn>

                {detail && (
                  <>
                    {detail.videos.results.length > 0 && showImage === true ? (
                      <YoutubeVideo
                        src={`https://www.youtube.com/embed/${
                          videoList || detail.videos.results[0].key
                        }?autoplay=1&mute=0&controls=0&loop=1&rel=0`}
                        title='youtube video player'
                        allow='autoplay'
                      />
                    ) : (
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top,rgb(24, 24, 24), transparent), url(${makeImagePath(
                            detail?.backdrop_path || detail?.poster_path,
                            'w780'
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

                      <VideoInfo
                        detail={detail}
                        mediaType={mediaType}
                        credit={credit}
                      />

                      {mediaType === 'tv' && (
                        <TvSeasonMenu
                          detail={detail}
                          seasonListDisplay={seasonListDisplay}
                          seasonNum={seasonNum}
                          seasonToggleClicked={seasonToggleClicked}
                          seasonClicked={seasonClicked}
                        />
                      )}

                      {mediaType === 'tv' && (
                        <NoContents>
                          {seasonTV && <TvSeason seasonApi={seasonTV} />}
                        </NoContents>
                      )}

                      {recommendations && (
                        <RelatedContents
                          key='recommendationMovie'
                          recommendApi={recommendations}
                          title='추천 콘텐츠'
                          mediaType={mediaType}
                          where={where}
                        />
                      )}

                      {similar && (
                        <RelatedContents
                          key='similarMovie'
                          recommendApi={similar}
                          title='비슷한 콘텐츠'
                          mediaType={mediaType}
                          where={where}
                        />
                      )}
                    </BigInfo>
                  </>
                )}
              </BigMovie>
            </Overlay>
          </>
        )
      )}
    </AnimatePresence>
  );
}

export default React.memo(VideoDetail);
