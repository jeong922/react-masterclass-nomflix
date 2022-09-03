import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GetResult } from '../../api/api';
import { makeImagePath } from '../../utilities';

const SearchContents = styled.div`
  padding: 100px 20px;
`;

const Title = styled.h2`
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const NoContents = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 16px;
  }
`;

const Contents = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(12rem, auto));
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  background-color: white;
  height: 20rem;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  cursor: pointer;
  @media screen and (max-width: 443px) {
    height: 41rem;
  }
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
    y: -60,
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

interface SearchItemType {
  keyword: string | null;
  searchApi: GetResult | undefined;
  mediaType: string;
  title: string;
}

const SearchItem = ({
  keyword,
  searchApi,
  mediaType,
  title,
}: SearchItemType) => {
  const navigate = useNavigate();
  const onBoxClick = (Id: number) => {
    navigate(`/search?keyword=${keyword}&${mediaType}=${Id}`);
  };

  return (
    <SearchContents>
      {searchApi && searchApi.total_results > 0 ? (
        <ContentsWrapper>
          <Title>{`"${keyword}"과(와) 관련 된 ${title}`}</Title>
          <Contents>
            {searchApi?.results.map((media) => (
              <Box
                key={media.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                transition={{ type: 'tween' }}
                bgphoto={makeImagePath(
                  media.poster_path || media.backdrop_path,
                  'w500'
                )}
                onClick={() => {
                  onBoxClick(media.id);
                }}
              >
                <Info variants={infoVariants}>
                  <h4>{media.title || media.name}</h4>
                </Info>
              </Box>
            ))}
          </Contents>
        </ContentsWrapper>
      ) : (
        <ContentsWrapper>
          <Title>{`"${keyword}"과(와) 관련 된 영화`}</Title>
          <NoContents>
            <h3>관련된 정보가 없어요.</h3>
          </NoContents>
        </ContentsWrapper>
      )}
    </SearchContents>
  );
};

export default SearchItem;