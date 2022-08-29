import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TVSeason } from '../api';
import { makeImagePath } from '../utilities';
import MoreButton from './more_button';

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

const EpisodeStill = styled.div<{ bgphoto: string }>`
  background-color: white;
  height: 100px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  width: 30%;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
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
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
`;

interface SeasonData {
  seasonApi: TVSeason;
  mediaType: string;
  season: number;
}

function TvSeason({ seasonApi }: SeasonData) {
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
      if (seasonApi.episodes.length > 4) {
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
              <Episode key={season.id}>
                <SeasonNumber>{season.episode_number}</SeasonNumber>
                <EpisodeStill
                  bgphoto={makeImagePath(
                    season.still_path || seasonApi?.poster_path
                  )}
                ></EpisodeStill>
                <EpisodeInfo>
                  <span>{season.name}</span>
                  <span>{season.overview}</span>
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
