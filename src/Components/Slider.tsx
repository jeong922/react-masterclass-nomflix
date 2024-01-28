import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetContents } from '../api/api';
import { makeImagePath } from '../utilities';
import { useIsElementInViewport } from './img_loading/element_in_viewport';
import { MediaType } from '../model/type';
import { FaPlus } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { addMyList } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
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
  background-color: ${(props) =>
    props.position ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'};
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
// ❗❗❗

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
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    /* border: 2px solid #ffffff5c; */
    border: 2px solid white;
    border-radius: 50%;
    cursor: pointer;

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

function MovieSlider({ movieApi, title, mediaType }: Props) {
  const { user } = useAuthContext();
  const ITEM_LENGTH = 36;
  const navigate = useNavigate();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [position, setPostion] = useState(0);
  const [itemPerScreen, setItemPerScreen] = useState(6);
  const progressBarItemCount = Math.ceil(ITEM_LENGTH / itemPerScreen);
  const { elementRef, isVisible } = useIsElementInViewport();

  const onClickLeft = () => {
    if (sliderIndex - 1 < 0) {
      return;
    } else {
      setSliderIndex(sliderIndex - 1);
      setPostion(position - 1);
    }
  };

  const onClickRight = () => {
    if (sliderIndex + 1 >= progressBarItemCount) {
      return;
    } else {
      setSliderIndex(sliderIndex + 1);
      setPostion(position + 1);
    }
  };

  const onBoxClicked = (Id: number) => {
    if (mediaType === 'movie') {
      navigate(`/movies/${Id}`);
      return;
    }

    if (mediaType === 'tv') {
      navigate(`/tv/${Id}`);
      return;
    }
  };

  const checkWindowSize = useCallback(() => {
    if (window.innerWidth > 1440) {
      setItemPerScreen(6);
      if (sliderIndex !== 0 && sliderIndex >= ITEM_LENGTH / itemPerScreen) {
        setSliderIndex(progressBarItemCount - 1);
        setPostion(progressBarItemCount - 1);
      }
      return;
    }
    if (window.innerWidth > 768) {
      setItemPerScreen(4);
      if (sliderIndex !== 0 && sliderIndex >= ITEM_LENGTH / itemPerScreen) {
        setSliderIndex(progressBarItemCount - 1);
        setPostion(progressBarItemCount - 1);
      }
      return;
    }
    if (window.innerWidth > 0) {
      setItemPerScreen(2);
      if (sliderIndex !== 0 && sliderIndex >= ITEM_LENGTH / itemPerScreen) {
        setSliderIndex(progressBarItemCount - 1);
        setPostion(progressBarItemCount - 1);
      }
      return;
    }
  }, [itemPerScreen, progressBarItemCount, sliderIndex]);

  useEffect(() => {
    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, [checkWindowSize]);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <>
      <Container ref={elementRef}>
        <Wrapper>
          <Title>{title}</Title>
          <Progress>
            {Array.from({ length: progressBarItemCount }, (_, i) => i).map(
              (item) => (
                <ProgressItem key={item} position={item === position} />
              )
            )}
          </Progress>
        </Wrapper>
        <Row>
          <Button onClick={onClickLeft} aria-label='left button'>
            <svg viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
              <path d='M22.324 28.008c.537.577.355 1.433-.326 1.809a1.44 1.44 0 0 1-.72.183c-.398 0-.786-.151-1.048-.438L10.06 18.588a1.126 1.126 0 0 1 0-1.555L20.233 6.09c.438-.468 1.198-.564 1.767-.25.681.377.863 1.23.325 1.808l-9.446 10.164 9.446 10.196zM11.112 17.615a.31.31 0 0 1 0 .391l.182-.195-.182-.196zM21.308 7.094c-.01-.006-.053 0-.029-.027a.07.07 0 0 0 .029.027zm-.025 21.499a.95.95 0 0 1-.006-.008l.006.008z'></path>
            </svg>
          </Button>
          <Slider sliderIndex={sliderIndex}>
            {movieApi.slice(0, ITEM_LENGTH).map((movie) => (
              <Box
                key={movie.id}
                bgphoto={
                  isVisible
                    ? makeImagePath(
                        movie.backdrop_path || movie.poster_path,
                        'w500'
                      )
                    : ''
                }
                itemperscreen={itemPerScreen}
                // onClick={() => onBoxClicked(movie.id)}
              >
                <InfoBox>
                  <Info>
                    <span>
                      {mediaType === 'movie' ? movie.title : movie.name}
                    </span>
                  </Info>
                  <Buttons>
                    {/* TODO:내가 찜한 리스트에 저장 기능 구현 */}
                    <button
                      onClick={() => {
                        addMyList(user.uid, movie.id, movie);
                      }}
                    >
                      <FaPlus />
                    </button>
                    <button onClick={() => onBoxClicked(movie.id)}>
                      <IoIosArrowDown />
                    </button>
                  </Buttons>
                </InfoBox>
              </Box>
            ))}
          </Slider>
          <Button onClick={onClickRight} aria-label='right button'>
            <svg viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
              <path d='M13.065 7.65c-.538-.578-.355-1.433.325-1.81a1.44 1.44 0 0 1 .72-.182c.398 0 .786.15 1.048.437L25.327 17.07a1.126 1.126 0 0 1 0 1.555L15.155 29.568c-.438.468-1.198.563-1.767.25-.681-.377-.863-1.23-.325-1.809l9.446-10.164L13.065 7.65zm11.211 10.393a.31.31 0 0 1 0-.391l-.181.194.181.197zM14.081 28.564c.01.006.053 0 .028.027a.07.07 0 0 0-.028-.027zm.024-21.5a.95.95 0 0 1 .007.008l-.007-.007z'></path>
            </svg>
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default MovieSlider;
