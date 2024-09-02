import styled from 'styled-components';
import Spinner from './Spinner';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}

export default Loader;
