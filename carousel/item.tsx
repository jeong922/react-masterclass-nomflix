import React from 'react';
import styled from 'styled-components';
import { GetContents } from '../../api';
import { makeImagePath } from '../../utilities';

const Box = styled.div<{ bgphoto: string; itemPerScreen: number }>`
  background-color: white;
  flex: 0 0 calc(100% / ${(props) => props.itemPerScreen});
  max-width: calc(100% / ${(props) => props.itemPerScreen});
  aspect-ratio: 16 / 9;
  padding: 0.25rem;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  /* border-radius: 0.25rem; */
  background-clip: content-box;
  font-size: 66px;
  cursor: pointer;
`;

type IItem = {
  movie: GetContents;
  itemPerScreen: number;
};

const Item = ({ movie, itemPerScreen }: IItem) => {
  return (
    <Box
      itemPerScreen={itemPerScreen}
      key={movie.id}
      bgphoto={makeImagePath(movie.backdrop_path || movie.poster_path, 'w500')}
    ></Box>
  );
};

export default Item;
