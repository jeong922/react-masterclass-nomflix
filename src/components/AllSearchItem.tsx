import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GetContents } from '../api/api';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MediaType } from '../model/type';
import PosterImage from './PosterImage';
import useSearchAll from '../hooks/useSearchAll';
import Spinner from './Spinner';
import Loader from './Loader';

const SearchContents = styled.div`
  padding: 100px 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const All = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.ul`
  display: grid;
  gap: 20px;
  list-style-type: none;
  grid-template-columns: repeat(auto-fill, minmax(12rem, auto));
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

type Props = {
  keyword: string | null;
  mediaType: MediaType;
  title: string;
  setId: Dispatch<SetStateAction<number>>;
};

export default function AllSearchItem({ keyword, mediaType, title, setId }: Props) {
  const navigate = useNavigate();
  const { searchAll, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchAll({
    keyword,
    mediaType,
  });

  const onBoxClick = (Id: number) => {
    navigate(`/search/${mediaType}?keyword=${keyword}&${mediaType}=${Id}`, {
      state: { where: `/search/${mediaType}` },
    });
  };

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!hasNextPage) {
        return;
      }
      fetchNextPage();
    }
  });

  return (
    <SearchContents>
      <ContentsWrapper>
        <TitleWrapper>
          <Title>{`"${keyword}"과(와) 관련 된 ${title}`}</Title>
          <All onClick={() => navigate(`/search?keyword=${keyword}`)}>전체검색결과로 돌아가기</All>
        </TitleWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <Contents>
            {searchAll?.pages.map((group: any, i) => (
              <React.Fragment key={i}>
                {group.results.map((media: GetContents) => (
                  <li key={media.id}>
                    <PosterImage media={media} onBoxClick={onBoxClick} mediaType={mediaType} />
                  </li>
                ))}
              </React.Fragment>
            ))}
            <div ref={moreRef}>{isFetchingNextPage && <Spinner />}</div>
          </Contents>
        )}
      </ContentsWrapper>
    </SearchContents>
  );
}
