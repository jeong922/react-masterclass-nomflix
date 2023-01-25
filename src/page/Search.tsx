import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GetResult, getsearch } from '../api/api';
import Loader from '../Components/Loader';
import SearchItem from '../Components/SearchItem';
import React, { useState } from 'react';
import Detail from '../Components/Detail';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

function Search() {
  const location = useLocation();
  const [id, setId] = useState(Number);
  const keyword = new URLSearchParams(location.search).get('keyword');
  const searchMovieId = new URLSearchParams(location.search).get('movie') + '';
  const searchTvId = new URLSearchParams(location.search).get('tv') + '';
  const movieMatch = id === +searchMovieId || location.state;
  const tvMatch = id === +searchTvId || location.state;

  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<GetResult>(['searchMovie', keyword], () =>
      getsearch('movie', keyword + '')
    );

  const { data: searchTV, isLoading: searchTVLoading } = useQuery<GetResult>(
    ['searchTV', keyword],
    () => getsearch('tv', keyword + '')
  );

  const loading = searchMovieLoading || searchTVLoading;

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchItem
            keyword={keyword}
            searchApi={searchMovie}
            mediaType='movie'
            title='영화'
            setId={setId}
          />
          <SearchItem
            keyword={keyword}
            searchApi={searchTV}
            mediaType='tv'
            title='시리즈'
            setId={setId}
          />

          {movieMatch && (
            <Detail
              matchId={searchMovieId}
              mediaType={'movie'}
              where={'search'}
            />
          )}

          {tvMatch && (
            <Detail matchId={searchTvId} mediaType={'tv'} where={'search'} />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Search);
