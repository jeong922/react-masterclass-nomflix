import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: black;
  padding: 100px 20px;
  overflow-x: hidden;
`;

export default function MyList() {
  return <Wrapper>내가 찜한 리스트</Wrapper>;
}
