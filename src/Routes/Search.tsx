import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetMoivesResult, getsearchMovies, getsearchTV } from '../api';
import Header from '../Components/Header';
import Loader from '../Components/Loader';
import MovieModal from '../Components/Modal';
import { makeImagePath } from '../utilities';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

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
  /* grid-template-columns: repeat(9, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(12rem, auto));
  /* grid-auto-rows: minmax(max-content, auto); */
  /* @media screen and (max-width: 480px) {
    gap: 10px;
  } */
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

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const searchMovieId = new URLSearchParams(location.search).get('movie') + '';
  const searchTvId = new URLSearchParams(location.search).get('tv') + '';

  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<GetMoivesResult>(['movies', 'searchMovie', keyword], () =>
      getsearchMovies(keyword + '')
    );
  const { data: searchTV, isLoading: searchTVLoading } =
    useQuery<GetMoivesResult>(['tv', 'searchTV', keyword], () =>
      getsearchTV(keyword + '')
    );

  const loading = searchMovieLoading || searchTVLoading;

  const onBoxClickedM = (Id: number) => {
    navigate(`/search?keyword=${keyword}&movie=${Id}`);
  };
  const onBoxClickedT = (Id: number) => {
    navigate(`/search?keyword=${keyword}&tv=${Id}`);
  };

  return (
    <Wrapper>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchContents>
            {searchMovie && searchMovie.total_results > 0 ? (
              <ContentsWrapper>
                <Title>{`"${keyword}"과(와) 관련 된 영화`}</Title>
                <Contents>
                  {searchMovie?.results.map((movie) => (
                    <Box
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      bgphoto={makeImagePath(
                        movie.poster_path || movie.backdrop_path,
                        'w500'
                      )}
                      onClick={() => {
                        onBoxClickedM(movie.id);
                      }}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
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

            {searchTV && searchTV.total_results > 0 ? (
              <ContentsWrapper>
                <Title>{`"${keyword}"과(와) 관련 된 시리즈`}</Title>
                <Contents>
                  {searchTV?.results.map((tv) => (
                    <Box
                      key={tv.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      bgphoto={makeImagePath(
                        tv.poster_path || tv.backdrop_path,
                        'w500'
                      )}
                      onClick={() => {
                        onBoxClickedT(tv.id);
                      }}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
                </Contents>
              </ContentsWrapper>
            ) : (
              <ContentsWrapper>
                <Title>{`"${keyword}"과(와) 관련 된 시리즈`}</Title>
                <NoContents>
                  <h3>관련된 정보가 없어요.</h3>
                </NoContents>
              </ContentsWrapper>
            )}
          </SearchContents>
        </>
      )}
      {searchMovie && (
        <MovieModal
          matchId={searchMovieId}
          mediaType={'movie'}
          where={'search'}
        />
      )}
      {searchTV && (
        <MovieModal matchId={searchTvId} mediaType={'tv'} where={'search'} />
      )}
    </Wrapper>
  );
}

export default Search;
