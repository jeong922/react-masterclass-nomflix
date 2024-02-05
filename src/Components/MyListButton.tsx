import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useMyList from '../hooks/useMyList';
import { GetContents } from '../api/api';
import styled from 'styled-components';
import { getMatchItem } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

type Props = {
  id: number;
  mediaType: string;
  media: GetContents;
};

const Wrapper = styled.div`
  position: relative;
`;

const Text = styled.span<{ show: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -35px;
  padding: 0.2rem;
  border-radius: 0.1rem;
  background-color: ${(props) => props.theme.white.lighter};
  color: black;
  font-size: 0.9rem;
  white-space: nowrap;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

const Button = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  margin-right: 10px;
  align-items: center;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
`;

export default function MyListButton({ id, media, mediaType }: Props) {
  const { uid } = useAuthContext();
  const [data, setData] = useState<any>();
  const [show, setShow] = useState(false);
  const { updateMyList, deleteMyList } = useMyList();

  const handleClick = () => {
    data ? setData(false) : setData(true);
    !data ? updateMyList.mutate({ media, mediaType }) : deleteMyList.mutate(id);
  };

  useEffect(() => {
    getMatchItem(uid, id).then((data) => setData([...data].length));
  }, [id, uid]);

  return (
    <Wrapper>
      <Button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={handleClick}
      >
        {!data ? <FaPlus /> : <FaMinus />}
      </Button>
      <Text show={show}>
        {!data ? '내가 찜한 콘텐츠에 추가' : '내가 찜한 콘텐츠에서 삭제'}
      </Text>
    </Wrapper>
  );
}
