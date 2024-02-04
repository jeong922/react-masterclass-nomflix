import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from 'react-icons/io';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 100px 20px;
  overflow-x: hidden;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;

  button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #4e4e4e;
    border-radius: 5px;
    padding: 1.2rem;
    margin-bottom: 2rem;
    background-color: transparent;
    color: #a3a3a3;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      border: 1px solid ${(props) => props.theme.white.lighter};
    }

    svg {
      font-size: 1.6rem;
      margin-right: 0.5rem;
    }
  }
`;

export default function Login() {
  return (
    <Wrapper>
      <Buttons>
        <button>
          <FcGoogle />
          <span>Google로 시작하기</span>
        </button>
        <button>
          <IoLogoGithub />
          <span>Github로 시작하기</span>
        </button>
      </Buttons>
    </Wrapper>
  );
}
