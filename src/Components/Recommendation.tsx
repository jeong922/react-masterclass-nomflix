import e from "express";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMovieRecommendations } from "../api";
import { makeImagePath } from "../utilities";

const RecommenBoxWrapper = styled.div<{ reommendDisplay: boolean }>`
  display: ${(props) => (props.reommendDisplay === true ? "none" : "block")};
  position: relative;
  margin-top: 20px;
  z-index: 3;
`;

const RecommenBox = styled(motion.div)`
  overflow: hidden;
`;

const BigRecommenMovie = styled.div`
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 15px;
`;

const BigRecommen = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  /* position: relative; */
  width: 100%;
`;

const Recommen = styled(motion.div)<{ bgPhoto: string }>`
  position: relative;
  background-color: white;
  height: 150px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  z-index: 5;
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
  z-index: 6;
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
  recommendApi: IMovieRecommendations;
  title: string;
  mediaType: string;
  where: string;
}

function Reconmend({ recommendApi, title, where, mediaType }: IMovieData) {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [recommend, setRecommend] = useState(false);
  const [more, setMore] = useState(false);
  const toggleClicked2 = () => setMore((prev) => !prev);
  const onBigMovieBoxClicked = (id: number) => {
    if (where === "movies") {
      navigate(`/movies/${id}`);
    } else if (where === "tv") {
      navigate(`/tv/${id}`);
    } else {
      mediaType === "movie"
        ? navigate(`/search?keyword=${keyword}&movie=${id}`)
        : navigate(`/search?keyword=${keyword}&tv=${id}`);
    }
    // mediaType === "movie" ? navigate(`/movies/${id}`) : navigate(`/tv/${id}`);
  };
  useEffect(() => {
    if (recommendApi) {
      if (recommendApi.total_results > 0) {
        setRecommend(false);
      } else {
        setRecommend(true);
      }
    }
  }, [recommend]); // 추천콘텐츠나 비슷한 콘텐츠가 없으면 display:none(동작은 되는데 이렇게 하는게 맞는지는..)

  return (
    <>
      <RecommenBoxWrapper reommendDisplay={recommend}>
        <RecommenBox
          variants={EpisodeVariants}
          initial="normal"
          animate={more ? "clicked" : "nonClicked"}
        >
          <BigRecommenMovie>{title}</BigRecommenMovie>
          <BigRecommen>
            {recommendApi?.results.slice(0).map((item) => (
              <Recommen
                key={item.id}
                bgPhoto={makeImagePath(
                  item.backdrop_path || item.poster_path,
                  "w500"
                )}
                onClick={() => onBigMovieBoxClicked(item.id)}
              >
                <Info>{item.title || item.name}</Info>
              </Recommen>
            ))}
          </BigRecommen>
        </RecommenBox>
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
      </RecommenBoxWrapper>
    </>
  );
}

export default Reconmend;
