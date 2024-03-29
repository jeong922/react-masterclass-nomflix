import React, {
  createElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { arrayBuffer } from 'stream/consumers';
import styled from 'styled-components';
import { GetContents } from '../../api';
import Item from './item';

type MovieData = {
  movieApi: GetContents[];
  title: string;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 3rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Progress = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
`;

const ProgressItem = styled.div<{ position: boolean }>`
  flex: 0 0 1rem;
  min-width: 0.8rem;
  height: 0.1rem;
  background-color: ${(props) =>
    props.position ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'};
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonL = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0.25rem 0;
  z-index: 10;
  flex-grow: 0;
  border: none;
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  cursor: pointer;
  transition: transform 300ms ease-in;
  &:hover {
    background-color: rgba(70, 70, 70, 0.5);
    svg {
      transform: scale(1.1);
    }
  }
  svg {
    height: 2rem;
    fill: white;
  }
`;

const ButtonR = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0.25rem 0;
  z-index: 10;
  flex-grow: 0;
  border: none;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  cursor: pointer;
  transition: transform 300ms ease-in;
  &:hover {
    background-color: rgba(70, 70, 70, 0.5);
    svg {
      transform: scale(1.1);
    }
  }
  svg {
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

const Slide = ({ movieApi, title }: MovieData) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [position, setPostion] = useState(0);
  const [itemPerScreen, setItemPerScreen] = useState(6);
  const progressBarItemCount = Math.ceil(movieApi.length / itemPerScreen);

  const onClickLeft = () => {
    if (sliderIndex - 1 < 0) {
      setSliderIndex(progressBarItemCount - 1);
      setPostion(progressBarItemCount - 1);
    } else {
      setSliderIndex(sliderIndex - 1);
      setPostion(position - 1);
    }
  };

  const onClickRight = () => {
    if (sliderIndex + 1 >= progressBarItemCount) {
      setSliderIndex(0);
      setPostion(0);
    } else {
      setSliderIndex(sliderIndex + 1);
      setPostion(position + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1440) {
        setItemPerScreen(6);
      } else if (window.innerWidth > 1024) {
        setItemPerScreen(5);
      } else if (window.innerWidth > 768) {
        setItemPerScreen(4);
      } else if (window.innerWidth > 480) {
        setItemPerScreen(2);
      }
    });
  }, []);

  if (sliderIndex >= progressBarItemCount) {
    setSliderIndex(progressBarItemCount - 1);
  }

  return (
    <>
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
        <ButtonL onClick={onClickLeft}>
          <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.324 28.008c.537.577.355 1.433-.326 1.809a1.44 1.44 0 0 1-.72.183c-.398 0-.786-.151-1.048-.438L10.06 18.588a1.126 1.126 0 0 1 0-1.555L20.233 6.09c.438-.468 1.198-.564 1.767-.25.681.377.863 1.23.325 1.808l-9.446 10.164 9.446 10.196zM11.112 17.615a.31.31 0 0 1 0 .391l.182-.195-.182-.196zM21.308 7.094c-.01-.006-.053 0-.029-.027a.07.07 0 0 0 .029.027zm-.025 21.499a.95.95 0 0 1-.006-.008l.006.008z"></path>
          </svg>
        </ButtonL>
        <Slider sliderIndex={sliderIndex}>
          {movieApi.length > 0 &&
            movieApi.map((movie) => (
              <Item
                key={movie.id}
                movie={movie}
                itemPerScreen={itemPerScreen}
              />
            ))}
        </Slider>
        <ButtonR onClick={onClickRight}>
          <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.065 7.65c-.538-.578-.355-1.433.325-1.81a1.44 1.44 0 0 1 .72-.182c.398 0 .786.15 1.048.437L25.327 17.07a1.126 1.126 0 0 1 0 1.555L15.155 29.568c-.438.468-1.198.563-1.767.25-.681-.377-.863-1.23-.325-1.809l9.446-10.164L13.065 7.65zm11.211 10.393a.31.31 0 0 1 0-.391l-.181.194.181.197zM14.081 28.564c.01.006.053 0 .028.027a.07.07 0 0 0-.028-.027zm.024-21.5a.95.95 0 0 1 .007.008l-.007-.007z"></path>
          </svg>
        </ButtonR>
      </Row>
    </>
  );
};

export default Slide;
