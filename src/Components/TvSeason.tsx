import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TVSeason } from '../api/api';
import { dateFormat, isBeforeAirDate, runtimeFormat } from '../utilities';
import MoreButton from './MoreButton';
import EpisodeImage from './EpisodeImage';

const NoEpisode = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #404040;
  border-bottom: 2px solid #404040;
  h3 {
    font-size: 16px;
  }
`;

const SeasonWapper = styled(motion.div)`
  position: relative;
  margin-top: 10px;
  width: 100%;
`;

const Season = styled(motion.div)<{ seasoncontents: string }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 2px solid #404040;
  padding-top: 20px;
  max-height: ${(props) => props.seasoncontents};
`;

const Episode = styled.div<{ isBeforeAirDate: boolean | undefined }>`
  display: flex;
  opacity: ${(props) => (props.isBeforeAirDate ? 0.6 : 1)};
  @media screen and (max-width: 480px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const EpisodeNumber = styled.div`
  display: flex;
  align-items: center;
  span {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 0px;
  div {
    display: flex;
    justify-content: space-between;
    span {
      font-weight: 600;
      margin-bottom: 5px;
      &:last-child {
        color: rgba(255, 255, 255, 0.7);
        padding-right: 5px;
        flex-shrink: 0;
        padding-left: 5px;
      }
    }
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
  @media screen and (max-width: 480px) {
    padding-left: 20px;
  }
`;

type Props = {
  seasonApi: TVSeason;
};

function TvSeason({ seasonApi }: Props) {
  const [more, setMore] = useState(false);
  const [episodeslength, setEpisodeslength] = useState(false);
  const [height, setHeight] = useState('480px');
  const [positionRef, setPositionRef] = useState(false);
  const seasonRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (positionRef === true) {
      seasonRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [positionRef]);

  useEffect(() => {
    if (seasonApi) {
      if (seasonApi.episodes.length > 3) {
        setEpisodeslength(true);
      } else {
        setEpisodeslength(false);
      }
    }
  }, [seasonApi]);

  useEffect(() => {
    setHeight('480px');
    setMore(false);
  }, [seasonApi]);

  return (
    <>
      {seasonApi.episodes.length > 0 ? (
        <SeasonWapper>
          <Season ref={seasonRef} seasoncontents={height}>
            {seasonApi?.episodes.map((season) => (
              <Episode
                key={season.id}
                isBeforeAirDate={isBeforeAirDate(season.air_date)}
              >
                <EpisodeNumber>
                  <span>{season.episode_number}</span>
                  <EpisodeImage
                    season={season}
                    posterPath={seasonApi.poster_path}
                  />
                </EpisodeNumber>
                <EpisodeInfo>
                  <div>
                    <span>{season.name}</span>
                    {!isBeforeAirDate(season.air_date) && season.runtime ? (
                      <span>{runtimeFormat(season.runtime)}</span>
                    ) : isBeforeAirDate(season.air_date) ? (
                      <span>{dateFormat(season.air_date)} 공개</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <p>{season.overview}</p>
                </EpisodeInfo>
              </Episode>
            ))}
          </Season>

          {episodeslength && (
            <MoreButton
              setHeight={setHeight}
              more={more}
              setMore={setMore}
              setPositionRef={setPositionRef}
            />
          )}
        </SeasonWapper>
      ) : (
        <NoEpisode>
          <h3>아직 정보가 없어요.</h3>
        </NoEpisode>
      )}
    </>
  );
}

export default TvSeason;
