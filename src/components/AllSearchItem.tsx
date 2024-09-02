import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GetContents } from '../api/api';
import { useContentsApi } from '../context/ApiContext';
import { useInfiniteQuery } from '@tanstack/react-query';
import PosterImage from './PosterImage';

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
  mediaType: string;
  title: string;
  setId: Dispatch<SetStateAction<number>>;
};

export default function AllSearchItem({ keyword, mediaType, title, setId }: Props) {
  const navigate = useNavigate();
  const { contentsApi } = useContentsApi();
  const pageEnd = useRef<HTMLDivElement | null>(null);
  const onBoxClick = (Id: number) => {
    navigate(`/search/${mediaType}?keyword=${keyword}&${mediaType}=${Id}`, {
      state: { where: `/search/${mediaType}` },
    });
  };

  const { data: all, fetchNextPage } = useInfiniteQuery(
    [mediaType, keyword],
    ({ pageParam = 1 }) => contentsApi.search({ mediaType, keyword, page: pageParam }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < 5) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  console.log(all);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    pageEnd.current && observer.observe(pageEnd.current);
    return () => observer.disconnect();
  }, [fetchNextPage]);

  return (
    <SearchContents>
      <ContentsWrapper>
        <TitleWrapper>
          <Title>{`"${keyword}"과(와) 관련 된 ${title}`}</Title>
          <All onClick={() => navigate(`/search?keyword=${keyword}`)}>전체검색결과로 돌아가기</All>
        </TitleWrapper>
        <Contents>
          {all?.pages.map((group: any, i) => (
            <React.Fragment key={i}>
              {group.results.map((media: GetContents) => (
                <li key={media.id}>
                  <PosterImage media={media} onBoxClick={onBoxClick} mediaType={mediaType} />
                </li>
              ))}
            </React.Fragment>
          ))}
          <div ref={pageEnd}></div>
        </Contents>
      </ContentsWrapper>
    </SearchContents>
  );
}
