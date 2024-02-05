import { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';

type Props = {
  id: number;
  onBoxClick: (id: number) => void;
};

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
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

export default function DetailButton({ id, onBoxClick }: Props) {
  const [show, setShow] = useState(false);
  return (
    <Wrapper>
      <Button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => onBoxClick(id)}
      >
        <IoIosArrowDown />
      </Button>
      <Text show={show}>상세 정보</Text>
    </Wrapper>
  );
}
