import styled from 'styled-components';
import { Episodes } from '../api/api';
import { makeImagePath } from '../utilities';
import { useIsElementInViewport } from './img_loading/element_in_viewport';

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

type Props = {
  season: Episodes;
  posterPath: string;
};

export default function EpisodeImage({ season, posterPath }: Props) {
  const { elementRef, isVisible } = useIsElementInViewport();
  console.log(elementRef);
  return (
    <ImageWrapper ref={elementRef}>
      {(season.still_path !== null || posterPath !== null) && (
        <EpisodeStill
          alt={season.name}
          src={
            isVisible
              ? makeImagePath(season.still_path || posterPath, 'w500')
              : ''
          }
        />
      )}
    </ImageWrapper>
  );
}
