import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../Components/Loader';
import SearchItem from '../Components/SearchItem';
import React, { useState } from 'react';
import VideoDetail from '../Components/VideoDetail';

import ModalPotal from '../Components/ModalPotal';
import AllSearchItem from '../Components/AllSearchItem';
import useSearch from '../hooks/useSearch';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const { searchMovie, searchTV, loading } = useSearch({ keyword });
  const [id, setId] = useState(Number);
  const searchMovieId = new URLSearchParams(location.search).get('movie') + '';
  const searchTvId = new URLSearchParams(location.search).get('tv') + '';
  const movieMatch = id === +searchMovieId || location.state;
  const tvMatch = id === +searchTvId || location.state;

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          {location.pathname === '/search' && (
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
            </>
          )}

          {location.pathname === '/search/movie' && (
            <AllSearchItem
              keyword={keyword}
              mediaType='movie'
              title='영화'
              setId={setId}
            />
          )}

          {location.pathname === '/search/tv' && (
            <AllSearchItem
              keyword={keyword}
              mediaType='tv'
              title='시리즈'
              setId={setId}
            />
          )}

          {movieMatch && (
            <ModalPotal>
              <VideoDetail
                matchId={searchMovieId}
                mediaType='movie'
                where={location.pathname.replace('/', '')}
              />
            </ModalPotal>
          )}

          {tvMatch && (
            <ModalPotal>
              <VideoDetail
                matchId={searchTvId}
                mediaType='tv'
                where={location.pathname.replace('/', '')}
              />
            </ModalPotal>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Search);
