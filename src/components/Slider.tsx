import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetContents } from '../api/api';
import { makeImagePath } from '../utils/utilities';
import { useThrottle } from '../hooks/useThrottle';
import { MediaType } from '../model/type';
import { useAuthContext } from '../context/AuthContext';
import { useIsElementInViewport } from './img_loading/element_in_viewport';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import MyListButton from './MyListButton';
import DetailButton from './DetailButton';

const Container = styled.div`
  margin-top: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 3rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  @media screen and (max-width: 48rem) {
    font-size: 1.1rem;
  }
`;

const Progress = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
  @media screen and (max-width: 490px) {
    display: none;
  }
`;

const ProgressItem = styled.div<{ position: boolean }>`
  min-width: 0.6rem;
  height: 0.1rem;
  background-color: ${(props) => (props.position ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)')};
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled(motion.button)`
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0.25rem 0;
  flex-grow: 0;
  border: none;
  z-index: 1;
  cursor: pointer;
  transition: 300ms ease-in;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(70, 70, 70, 0.5);
    svg {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  svg {
    transition: 300ms ease-in;
    opacity: 0;
    height: 2rem;
    fill: white;
  }
`;

const Slider = styled.div<{ sliderIndex: number }>`
  display: flex;
  width: calc(100% - 2 * 5rem);
  margin: 0 0.25rem;
  flex-grow: 1;
  transform: translateX(calc(${(props) => props.sliderIndex} * -100%));
  transition: transform 300ms ease-in;
`;

const InfoBox = styled.div`
  width: calc(100% - 0.5rem);
  opacity: 0;
`;

const Info = styled.div`
  width: calc(100% - 0.5rem);
  display: inline-block;
  position: absolute;
  padding: 20px;
  margin: 0 0.25rem;
  background: linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0, 1));
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 300ms ease-in-out;
  span {
    display: block;
    text-align: center;
    font-size: 0.23em;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const Buttons = styled.div`
  width: calc(100% - 0.5rem);
  background-color: ${(props) => props.theme.black.darker};
  position: absolute;
  display: flex;
  padding: 10px 10px;
  bottom: -40px;
  button {
    &:first-child {
      margin-right: 10px;
    }

    svg {
      fill: white;
    }
  }
`;

const Box = styled(motion.div)<{ bgphoto: string; itemperscreen: number }>`
  position: relative;
  background-color: #4d4d4d;
  flex: 0 0 calc(100% / ${(props) => props.itemperscreen});
  max-width: calc(100% / ${(props) => props.itemperscreen});
  aspect-ratio: 16 / 9;
  padding: 0.25rem;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-clip: content-box;
  font-size: 66px;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    ${InfoBox} {
      opacity: 1;
    }
    transform: scale(1.08);
    transform: translateY(-10px);
  }
`;

type Props = {
  movieApi: GetContents[];
  title: string;
  mediaType: MediaType;
};

const ITEM_LENGTH = 36;
function MovieSlider({ movieApi, title, mediaType }: Props) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { elementRef, isVisible } = useIsElementInViewport();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [position, setPostion] = useState(0);
  const [itemPerScreen, setItemPerScreen] = useState(6);
  const progressBarItemCount = Math.ceil(ITEM_LENGTH / itemPerScreen);

  const onClickLeft = () => {
    if (sliderIndex - 1 < 0) {
      return;
    }
    setSliderIndex(sliderIndex - 1);
    setPostion(position - 1);
  };

  const onClickRight = () => {
    if (sliderIndex + 1 >= progressBarItemCount) {
      return;
    }

    setSliderIndex(sliderIndex + 1);
    setPostion(position + 1);
  };

  const onBoxClick = (id: number) => {
    if (mediaType === 'movie') {
      navigate(`/movies/${id}`);
      return;
    }

    if (mediaType === 'tv') {
      navigate(`/tv/${id}`);
      return;
    }
  };

  const checkWindowSize = useCallback(() => {
    let itemsPerScreen;

    if (window.innerWidth > 1440) {
      itemsPerScreen = 6;
    } else if (window.innerWidth > 768) {
      itemsPerScreen = 4;
    } else {
      itemsPerScreen = 2;
    }

    setItemPerScreen(itemsPerScreen);

    if (sliderIndex !== 0 && sliderIndex >= ITEM_LENGTH / itemsPerScreen) {
      const lastIndex = progressBarItemCount - 1;
      setSliderIndex(lastIndex);
      setPostion(lastIndex);
    }
  }, [progressBarItemCount, sliderIndex]);

  const throttledCheckWindowSize = useThrottle(checkWindowSize, 200);

  useEffect(() => {
    window.addEventListener('resize', throttledCheckWindowSize);

    return () => {
      window.removeEventListener('resize', throttledCheckWindowSize);
    };
  }, [throttledCheckWindowSize]);

  useEffect(() => {
    checkWindowSize();
  }, [checkWindowSize]);

  return (
    <>
      <Container ref={elementRef}>
        <Wrapper>
          <Title>{title}</Title>
          <Progress>
            {Array.from({ length: progressBarItemCount }, (_, i) => i).map((item) => (
              <ProgressItem key={item} position={item === position} />
            ))}
          </Progress>
        </Wrapper>
        <Row>
          <Button onClick={onClickLeft} aria-label='left button'>
            <IoIosArrowBack />
          </Button>
          <Slider sliderIndex={sliderIndex}>
            {movieApi.slice(0, ITEM_LENGTH).map((media) => (
              <Box
                key={media.id}
                bgphoto={isVisible ? makeImagePath(media.backdrop_path || media.poster_path, 'w500') : ''}
                itemperscreen={itemPerScreen}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    onBoxClick(media.id);
                  }
                }}
              >
                <InfoBox>
                  <Info>
                    <span>{mediaType === 'movie' ? media.title : media.name}</span>
                  </Info>
                  <Buttons>
                    {user && <MyListButton id={media.id} media={media} mediaType={mediaType} />}
                    <DetailButton id={media.id} onBoxClick={onBoxClick} />
                  </Buttons>
                </InfoBox>
              </Box>
            ))}
          </Slider>
          <Button onClick={onClickRight} aria-label='right button'>
            <IoIosArrowForward />
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default MovieSlider;
