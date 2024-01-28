import { GetContents } from '../api/api';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utilities';
import { useIsElementInViewport } from './img_loading/element_in_viewport';
import { FaPlus } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { addMyList } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

const InfoBox = styled.div`
  width: calc(100% - 0.5rem);
  opacity: 0;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  background-color: #4d4d4d;
  aspect-ratio: 1 / 1.5;
  font-size: 66px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-clip: content-box;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:hover {
    ${InfoBox} {
      opacity: 1;
    }
    transform: scale(1.08);
    transform: translateY(-10px);
    z-index: 2;
  }
`;

const Info = styled.div`
  width: 100%;
  display: inline-block;
  position: absolute;
  padding: 20px;
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
  width: 100%;
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

type Props = {
  media: GetContents;
  onBoxClick: (id: number) => void;
};

export default function PosterImage({ media, onBoxClick }: Props) {
  const { elementRef, isVisible } = useIsElementInViewport();
  const { user } = useAuthContext();
  return (
    <Box
      ref={elementRef}
      whileHover='hover'
      initial='normal'
      // variants={boxVariants}
      transition={{ type: 'tween' }}
      bgphoto={
        isVisible
          ? makeImagePath(media.poster_path || media.backdrop_path, 'w500')
          : ''
      }
      onClick={() => {
        onBoxClick(media.id);
      }}
    >
      <InfoBox>
        <Info>
          <span>{media.title || media.name}</span>
        </Info>
        <Buttons>
          {/* TODO:내가 찜한 리스트에 저장 기능 구현 */}
          <button
            onClick={() => {
              addMyList(user.uid, media.id, media);
            }}
          >
            <FaPlus />
          </button>
          <button onClick={() => onBoxClick(media.id)}>
            <IoIosArrowDown />
          </button>
        </Buttons>
      </InfoBox>
    </Box>
  );
}
