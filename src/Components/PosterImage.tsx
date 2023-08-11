import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetContents } from '../api/api';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utilities';
import { useIsElementInViewport } from './img_loading/element_in_viewport';

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
`;

const Info = styled(motion.div)`
  padding: 10px;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0, 1));
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -20,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

type Props = {
  media: GetContents;
  keyword: string | null;
  mediaType: string;
  setId: Dispatch<SetStateAction<number>>;
};

export default function PosterImage({
  media,
  keyword,
  mediaType,
  setId,
}: Props) {
  const { elementRef, isVisible } = useIsElementInViewport();
  const navigate = useNavigate();
  const onBoxClick = (Id: number) => {
    navigate(`/search?keyword=${keyword}&${mediaType}=${Id}`);
    setId(Id);
  };
  return (
    <Box
      ref={elementRef}
      whileHover='hover'
      initial='normal'
      variants={boxVariants}
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
      <Info variants={infoVariants}>
        <h4>{media.title || media.name}</h4>
      </Info>
    </Box>
  );
}
