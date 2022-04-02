import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { getDetailsTV, getSeasonTV, IGetMoivesDetail, ISeason } from "../api";
import { makeImagePath } from "../utilities";

const NoEpisode = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #404040;
  border-bottom: 2px solid #404040;
  h3 {
    font-size: 16px;
  }
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

const SeasonWapper = styled(motion.div)`
  position: relative;
  margin-top: 10px;
  width: 100%;
`;

const Season = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 2px solid #404040;
  padding-top: 20px;
`;

const Episode = styled.div`
  display: flex;
`;

const SeasonNumber = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.7);
`;

const EpisodeStill = styled.div<{ bgPhoto: string }>`
  background-color: white;
  height: 100px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  width: 30%;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 5px 0px;
  span {
    &:first-child {
      font-weight: 600;
      margin-bottom: 5px;
    }
    &:last-child {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
    }
  }
`;

// const SeasonBtn = styled.button`
//   /* width: 80px; */
//   padding: 10px;
//   margin-bottom: 20px;
//   border-radius: 5px;
//   border: 2px solid ${(props) => props.theme.black.lighter};
//   background-color: transparent;
//   color: ${(props) => props.theme.white.lighter};
//   font-size: 15px;
// `;

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
    top: -80,
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
  seasonApi: ISeason;
  title: string;
  mediaType: string;
  season: number;
}

function TvSeason({ seasonApi, season, title, mediaType }: IMovieData) {
  const [more3, setMore3] = useState(false);
  const toggleClicked3 = () => setMore3((prev) => !prev);
  return (
    <>
      {seasonApi.episodes.length > 0 ? (
        <SeasonWapper>
          <Season
            variants={EpisodeVariants}
            initial="normal"
            animate={more3 ? "clicked" : "nonClicked"}
          >
            {/* <SeasonBtn>시즌 1</SeasonBtn> */}
            {seasonApi?.episodes.slice(0).map((season) => (
              <Episode>
                <SeasonNumber>{season.episode_number}</SeasonNumber>
                <EpisodeStill
                  key={season.id}
                  bgPhoto={makeImagePath(
                    season.still_path || seasonApi?.poster_path
                  )}
                ></EpisodeStill>
                <EpisodeInfo>
                  <span>{season.name}</span>
                  <span>
                    {season.overview.length! > 100
                      ? `${season.overview.slice(0, 100)}...`
                      : season.overview}
                  </span>
                </EpisodeInfo>
              </Episode>
            ))}
          </Season>
          <MoreBtnWrapper
            variants={moreWrapperBtnVariants}
            initial="btn_position1"
            animate={more3 ? "btn_position2" : "btn_position1"}
            transition={{ type: "tween" }}
          >
            <MoreBoxBtn
              onClick={toggleClicked3}
              variants={moreBtnVariants}
              initial="rotate0"
              animate={more3 ? "rotate1" : "rotate2"}
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
        </SeasonWapper>
      ) : (
        <NoEpisode>
          <h3>아직 정보가 없어요.</h3>
        </NoEpisode>
      )}
    </>
  );
}

export default TvSeason;
