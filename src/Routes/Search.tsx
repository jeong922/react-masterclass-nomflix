import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GetMoivesResult, getsearchMovies, getsearchTV } from '../api';
import Header from '../Components/header';
import Loader from '../Components/loader';
import MovieModal from '../Components/detail';
import SearchItem from '../Components/search/search_item';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

function Search() {
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

  return (
    <Wrapper>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchItem
            keyword={keyword}
            searchApi={searchMovie}
            mediaType={'movie'}
          />
          <SearchItem keyword={keyword} searchApi={searchTV} mediaType={'tv'} />

          {searchMovie && (
            <MovieModal
              matchId={searchMovieId}
              mediaType={'movie'}
              where={'search'}
            />
          )}

          {searchTV && (
            <MovieModal
              matchId={searchTvId}
              mediaType={'tv'}
              where={'search'}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
