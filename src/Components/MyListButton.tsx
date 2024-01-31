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
  const { updateMyList, deleteMyList } = useMyList();

  const handleClick = () => {
    data ? setData(false) : setData(true);
    !data ? updateMyList.mutate({ media, mediaType }) : deleteMyList.mutate(id);
  };

  useEffect(() => {
    getMatchItem(uid, id).then((data) => setData([...data].length));
  }, [id, uid]);

  return (
    <Button onClick={handleClick}>{!data ? <FaPlus /> : <FaMinus />}</Button>
  );
}
