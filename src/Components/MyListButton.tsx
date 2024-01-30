import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import useMyList from '../hooks/useMyList';
import { GetContents } from '../api/api';
import styled from 'styled-components';

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
  const [data, setData] = useState<any>();
  const [state, setState] = useState();
  const {
    getList: { data: myList, isLoading },
    updateMyList,
    deleteMyList,
  } = useMyList();

  const getMatchItem = useCallback(
    (id: number) => {
      return data && data.filter((v: { id: number }) => v.id === id).length;
    },
    [data]
  );

  const handleClick = () => {
    setState(getMatchItem(id));
    !state
      ? updateMyList.mutate({ media, mediaType })
      : deleteMyList.mutate(id);
  };

  useEffect(() => {
    myList && setData(myList);
    setState(getMatchItem(id));
  }, [getMatchItem, id, myList]);

  return (
    <Button onClick={handleClick}>{!state ? <FaPlus /> : <FaMinus />}</Button>
  );
}
