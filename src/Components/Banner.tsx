import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetResult } from '../api/api';
import { makeImagePath } from '../utilities';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const BgPhoto = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 3.75em;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Title = styled.h2`
  font-size: 3.3em;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Overview = styled.p`
  font-size: 1.3em;
  width: 50%;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Detail = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  color: ${(props) => props.theme.white.lighter};
  border: none;
  width: 9.375em;
  padding: 0.625em;
  margin-top: 20px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;
  width: 22px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  margin-right: 5px;
  svg {
    height: 13px;
  }
`;

interface MovieData {
  movieApi: GetResult | undefined;
  mediaType: string;
}

function Banner({ movieApi, mediaType }: MovieData) {
  const navigate = useNavigate();
  const onBoxClicked = (Id: number) => {
    if (mediaType === 'movie') {
      navigate(`/movies/${Id}`);
    } else if (mediaType === 'tv') {
      navigate(`/tv/${Id}`);
    }
  };

  return (
    <>
      <Wrapper>
        <BgPhoto
          bgphoto={makeImagePath(movieApi?.results[0].backdrop_path || '')}
        >
          <Title>
            {movieApi?.results[0].title || movieApi?.results[0].name}
          </Title>
          <Overview>{movieApi?.results[0].overview}</Overview>
          <Detail
            whileHover={{
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
            onClick={() => onBoxClicked(movieApi?.results[0].id!)}
          >
            <IconWrapper>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 192 512'
                fill='white'
              >
                <path d='M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z' />
              </svg>
            </IconWrapper>
            상세 정보
          </Detail>
        </BgPhoto>
      </Wrapper>
    </>
  );
}

export default React.memo(Banner);
