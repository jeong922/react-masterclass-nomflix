import styled from 'styled-components';
import { GetResult } from '../api/api';
import { Dispatch, SetStateAction } from 'react';
import PosterImage from './PosterImage';

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

const Contents = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(12rem, auto));
  list-style-type: none;
`;

type Props = {
  keyword: string | null;
  searchApi: GetResult | undefined;
  mediaType: string;
  title: string;
  setId: Dispatch<SetStateAction<number>>;
};

const SearchItem = ({ keyword, searchApi, mediaType, title, setId }: Props) => {
  return (
    <SearchContents>
      {searchApi && searchApi.total_results > 0 ? (
        <ContentsWrapper>
          <Title>{`"${keyword}"과(와) 관련 된 ${title}`}</Title>
          <Contents>
            {searchApi?.results.map((media) => (
              <li key={media.id}>
                <PosterImage
                  media={media}
                  keyword={keyword}
                  mediaType={mediaType}
                  setId={setId}
                />
              </li>
            ))}
          </Contents>
        </ContentsWrapper>
      ) : (
        <ContentsWrapper>
          <Title>{`"${keyword}"과(와) 관련 된 ${title}`}</Title>
          <NoContents>
            <h3>관련된 정보가 없어요.</h3>
          </NoContents>
        </ContentsWrapper>
      )}
    </SearchContents>
  );
};

export default SearchItem;
