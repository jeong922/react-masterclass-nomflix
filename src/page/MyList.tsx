import styled from 'styled-components';
import { useAuthContext } from '../context/AuthContext';
import { getMyList } from '../api/firebase';
import { useEffect, useState } from 'react';
import PosterImage from '../Components/PosterImage';
import { useNavigate } from 'react-router-dom';
import { GetContents } from '../api/api';

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
  const { user } = useAuthContext();
  const [data, setData] = useState<any>([]);

  const onBoxClick = (Id: number) => {
    navigate(`/my-list/${Id}`);
  };

  useEffect(() => {
    user.uid && getMyList(user.uid).then((data) => setData(data));
  }, [user.uid]);

  console.log(data);

  return (
    <Wrapper>
      {data && data.length ? (
        <Contents>
          {data?.map((media: any) => (
            <li key={media.id}>
              <PosterImage media={media} onBoxClick={() => {}} />
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
    </Wrapper>
  );
}
