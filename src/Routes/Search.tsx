import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GetResult, getsearch } from '../api';
import Header from '../Components/header';
import Loader from '../Components/loader';
import MovieModal from '../Components/detail';
import SearchItem from '../Components/search/search_item';
import { useState } from 'react';

const Wrapper = styled.div<{ isbar: boolean }>`
  overflow-x: hidden;
  padding-right: ${(props) => (props.isbar ? '10px' : '0px')};
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const searchMovieId = new URLSearchParams(location.search).get('movie') + '';
  const searchTvId = new URLSearchParams(location.search).get('tv') + '';
  const [isBar, setIsBar] = useState(false);
  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<GetResult>(['movie', 'searchMovie', keyword], () =>
      getsearch('movie', keyword + '')
    );

  const { data: searchTV, isLoading: searchTVLoading } = useQuery<GetResult>(
    ['tv', 'searchMovie', keyword],
    () => getsearch('tv', keyword + '')
  );

  const loading = searchMovieLoading || searchTVLoading;

  return (
    <Wrapper isbar={isBar}>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchItem
            keyword={keyword}
            searchApi={searchMovie}
            mediaType="movie"
            title="영화"
          />
          <SearchItem
            keyword={keyword}
            searchApi={searchTV}
            mediaType="tv"
            title="시리즈"
          />

          {searchMovie && (
            <MovieModal
              matchId={searchMovieId}
              mediaType={'movie'}
              where={'search'}
              setIsBar={setIsBar}
            />
          )}

          {searchTV && (
            <MovieModal
              matchId={searchTvId}
              mediaType={'tv'}
              where={'search'}
              setIsBar={setIsBar}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
