import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';
import { getMyList } from '../api/firebase';
import { useEffect, useState } from 'react';
import PosterImage from '../Components/PosterImage';
import { useMatch, useNavigate } from 'react-router-dom';
import ModalPotal from '../Components/ModalPotal';
import VideoDetail from '../Components/VideoDetail';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Components/Loader';
import useMyList from '../hooks/useMyList';

const Wrapper = styled.div`
  background-color: black;
  padding: 100px 20px;
  overflow-x: hidden;
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

const Contents = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(12rem, auto));
  list-style-type: none;
`;

export default function MyList() {
  const navigate = useNavigate();
  const [mediaType, setMediaType] = useState();
  const {
    getList: { data: myList, isLoading },
  } = useMyList();

  const MyListMatch = useMatch('/my-list/:Id');
  const matchMovieId = MyListMatch?.params.Id;

  const onBoxClick = (id: number) => {
    navigate(`/my-list/${id}`);
  };

  console.log('mylist', myList);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {myList && myList.length ? (
            <Contents>
              {myList?.map((media: any) => (
                <li
                  key={media.id}
                  onClick={() => setMediaType(media.mediaType)}
                >
                  <PosterImage
                    media={media}
                    onBoxClick={onBoxClick}
                    mediaType={media.mediaType}
                  />
                </li>
              ))}
            </Contents>
          ) : (
            <ContentsWrapper>
              <NoContents>
                <h3>관련된 정보가 없어요.</h3>
              </NoContents>
            </ContentsWrapper>
          )}
        </>
      )}

      {matchMovieId && mediaType && (
        <ModalPotal>
          <VideoDetail
            matchId={matchMovieId}
            mediaType={mediaType}
            where='my-list'
          />
        </ModalPotal>
      )}
    </Wrapper>
  );
}
