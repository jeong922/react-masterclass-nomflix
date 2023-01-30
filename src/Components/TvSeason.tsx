import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TVSeason } from '../api/api';
import { makeImagePath } from '../utilities';
import MoreButton from './MoreButton';

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

const ImageWrapper = styled.div`
  background-color: #4d4d4d;
  height: 110px;
  aspect-ratio: 16 / 9;
  margin: 0 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const EpisodeStill = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 6;
  border-radius: 5px;
  object-fit: cover;
  object-position: center;
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
  span {
    font-weight: 600;
    margin-bottom: 5px;
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
    margin-left: 20px;
  }
`;

type SeasonData = {
  seasonApi: TVSeason;
  mediaType?: string;
  season?: number;
};

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
                <EpisodeNumber>
                  <span>{season.episode_number}</span>
                  <ImageWrapper>
                    {(season.still_path !== null ||
                      seasonApi?.poster_path !== null) && (
                      <EpisodeStill
                        alt={season.name}
                        loading='lazy'
                        src={makeImagePath(
                          season.still_path || seasonApi?.poster_path,
                          'w500'
                        )}
                      />
                    )}
                  </ImageWrapper>
                </EpisodeNumber>
                <EpisodeInfo>
                  <span>{season.name}</span>
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
