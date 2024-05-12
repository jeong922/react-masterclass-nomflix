import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../Components/Loader';

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const MainText = styled.div`
  width: 100%;
  height: 100%;
  max-width: 950px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    font-size: 3rem;
    font-weight: 600;
    @media screen and (max-width: 48rem) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 1rem auto;
    @media screen and (max-width: 48rem) {
      font-size: 1.2rem;
    }
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    padding-bottom: 20px;
    @media screen and (max-width: 48rem) {
      font-size: 1rem;
    }
  }

  button {
    background-color: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white.lighter};
    font-size: 1.625rem;
    text-align: center;
    border: none;
    padding: 0.7rem 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      height: 1.625rem;
      fill: ${(props) => props.theme.white.lighter};
    }

    &:hover {
      background-color: rgba(175, 6, 8, 0.897);
    }

    @media screen and (max-width: 48rem) {
      font-size: 1.2rem;
      padding: 0.4rem 0.7rem;
      svg {
        height: 1.2rem;
      }
    }
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.9) 0,
    transparent 50%,
    rgba(0, 0, 0, 0.9)
  );
  z-index: -1;
`;

function Home() {
  const navigate = useNavigate();

  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoading(true);
    };
    img.src = '/image/background.jpg';
  }, []);

  return (
    <Container>
      {imageLoading ? (
        <>
          {console.log(imageLoading)}
          <BackgroundImage>
            <img src={'/image/background.jpg'} alt='background' />
          </BackgroundImage>
          <MainText>
            <h1>영화와 시리즈의 정보를 확인해 보세요.</h1>
            <h2>확인할 준비가 되셨나요?</h2>
            <button onClick={() => navigate('/movies')}>
              <span>시작하기</span>
              <svg viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
                <path d='M13.065 7.65c-.538-.578-.355-1.433.325-1.81a1.44 1.44 0 0 1 .72-.182c.398 0 .786.15 1.048.437L25.327 17.07a1.126 1.126 0 0 1 0 1.555L15.155 29.568c-.438.468-1.198.563-1.767.25-.681-.377-.863-1.23-.325-1.809l9.446-10.164L13.065 7.65zm11.211 10.393a.31.31 0 0 1 0-.391l-.181.194.181.197zM14.081 28.564c.01.006.053 0 .028.027a.07.07 0 0 0-.028-.027zm.024-21.5a.95.95 0 0 1 .007.008l-.007-.007z'></path>
              </svg>
            </button>
          </MainText>
          <Gradient />
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default Home;
