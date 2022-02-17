import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMoivesResult } from "../api";
import { makeImagePath } from "../utilities";

const Wrapper = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 58px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Overview = styled.p`
  font-size: 23px;
  width: 50%;
  line-height: 1.5;
`;

const Detail = styled(motion.button)`
  background-color: rgba(255, 255, 255, 0.2);
  color: ${(props) => props.theme.white.lighter};
  border: none;
  width: 150px;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
`;

interface IMovieData {
  movieApi: IGetMoivesResult | undefined;
  mediaType: string;
}

function Banner({ movieApi, mediaType }: IMovieData) {
  const navigate = useNavigate();
  const onBoxClicked = (Id: number) => {
    if (mediaType === "movie") {
      navigate(`/movies/${Id}`);
    } else if (mediaType === "tv") {
      navigate(`/tv/${Id}`);
    }
  };
  return (
    <>
      <Wrapper
        bgPhoto={makeImagePath(movieApi?.results[0].backdrop_path || "")}
      >
        <Title>{movieApi?.results[0].title || movieApi?.results[0].name}</Title>
        <Overview>
          {movieApi?.results[0].overview.length! > 231
            ? `${movieApi?.results[0].overview.slice(0, 231)}...`
            : movieApi?.results[0].overview}
        </Overview>
        <Detail
          whileHover={{
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
          onClick={() => onBoxClicked(movieApi?.results[0].id!)}
        >
          상세 정보
        </Detail>
      </Wrapper>
    </>
  );
}

export default Banner;
