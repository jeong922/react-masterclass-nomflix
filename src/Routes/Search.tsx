import { useQuery } from 'react-query';
import { useLocation, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GetResult, getsearch } from '../api/api';
import Header from '../Components/Header';
import Loader from '../Components/Loader';
import MovieModal from '../Components/Detail';
import SearchItem from '../Components/search/SearchItem';
import React, { Dispatch, SetStateAction, useState } from 'react';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

interface SearchProps {
  id: number;
  setId: Dispatch<SetStateAction<number>>;
}

function Search({ id, setId }: SearchProps) {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const searchMovieId = new URLSearchParams(location.search).get('movie') + '';
  const searchTvId = new URLSearchParams(location.search).get('tv') + '';
  const movieMatch = id === +searchMovieId;
  const tvMatch = id === +searchTvId;
  console.log('tvMatch', tvMatch);
  console.log('movieMatch', movieMatch);
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
      <Header />
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
            <MovieModal
              matchId={searchMovieId}
              mediaType={'movie'}
              where={'search'}
              setId={setId}
            />
          )}

          {tvMatch && (
            <MovieModal
              matchId={searchTvId}
              mediaType={'tv'}
              where={'search'}
              setId={setId}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Search);
