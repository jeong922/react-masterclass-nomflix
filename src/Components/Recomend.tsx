import { motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  IGetMoivesDetail,
  IGetMoivesResult,
  IMovieRecommendations,
} from "../api";
import { makeImagePath } from "../utilities";

const RecomenBoxWapper = styled.div`
  position: relative;
  top: -50px;
  margin-top: 10px;
  padding: 0px 20px;
`;

const RecomenBox = styled(motion.div)`
  overflow: hidden;
`;

const BigRecomenMovie = styled.div`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 15px;
`;

const BigRecomen = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  /* position: relative; */
  width: 100%;
`;

const Recomen = styled(motion.div)<{ bgPhoto: string }>`
  position: relative;
  background-color: white;
  height: 150px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  z-index: 2;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 16px;
  text-align: center;
`;

const MoreBtnWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120px;
  z-index: 3;
  background: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 1));
  border-bottom: 2px solid #404040;
`;

const MoreBoxBtn = styled(motion.button)`
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 50%;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
`;

const EpisodeVariants = {
  normal: {
    maxHeight: 480,
  },
  clicked: {
    maxHeight: "none",
  },
  nonClicked: {
    maxHeight: 480,
  },
};

const moreWrapperBtnVariants = {
  btn_position1: {
    top: -120,
  },
  btn_position2: {
    top: -40,
  },
};

const moreBtnVariants = {
  rotate0: {
    rotateZ: 0,
  },
  rotate1: {
    rotateZ: 180,
  },
  rotate2: {
    rotateZ: 0,
  },
  hover: {
    border: "2px solid rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};

interface IMovieData {
  recomendApi: IMovieRecommendations;
  title: string;
  mediaType: string;
}

function Reconmend({ recomendApi, title, mediaType }: IMovieData) {
  const navigate = useNavigate();
  const [more, setMore] = useState(false);
  const bigMovieMatchMovie = useMatch("/movies/:movieId");
  const matchMovieId = bigMovieMatchMovie?.params.movieId;
  console.log("bigMovieMatchMovie", bigMovieMatchMovie);
  console.log("matchMovieId", matchMovieId);
  const toggleClicked2 = () => setMore((prev) => !prev);
  const onBigMovieBoxClicked = (id: number) => {
    mediaType === "movie" ? navigate(`/movies/${id}`) : navigate(`/tv/${id}`);
  };
  return (
    <>
      {
        <RecomenBoxWapper>
          <RecomenBox
            variants={EpisodeVariants}
            initial="normal"
            animate={more ? "clicked" : "nonClicked"}
          >
            <BigRecomenMovie>{title}</BigRecomenMovie>
            <BigRecomen>
              {recomendApi?.results.slice(0).map((item) => (
                <Recomen
                  key={item.id}
                  bgPhoto={makeImagePath(
                    item.backdrop_path || item.poster_path,
                    "w500"
                  )}
                  onClick={() => onBigMovieBoxClicked(item.id)}
                >
                  <Info>{mediaType === "movie" ? item.title : item.name}</Info>
                </Recomen>
              ))}
            </BigRecomen>
          </RecomenBox>
          <MoreBtnWrapper
            variants={moreWrapperBtnVariants}
            initial="btn_position1"
            animate={more ? "btn_position2" : "btn_position1"}
            transition={{ type: "tween" }}
          >
            <MoreBoxBtn
              onClick={toggleClicked2}
              variants={moreBtnVariants}
              initial="rotate0"
              animate={more ? "rotate1" : "rotate2"}
              whileHover="hover"
              transition={{ type: "tween" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z"
                  fill="currentColor"
                ></path>
              </svg>
            </MoreBoxBtn>
          </MoreBtnWrapper>
        </RecomenBoxWapper>
      }
    </>
  );
}

export default Reconmend;
