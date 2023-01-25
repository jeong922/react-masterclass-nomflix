import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const NetflixHeader = styled.div`
  height: 45px;
  margin: 2rem 3.5rem;
`;

const Logo = styled.span`
  svg {
    width: 10.4375rem;
    fill: ${(props) => props.theme.red};
  }
  @media screen and (max-width: 48rem) {
    svg {
      width: 8rem;
    }
  }
`;

const MainText = styled.div`
  width: 100%;
  height: 70%;
  max-width: 950px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    font-size: 4rem;
    font-weight: 600;
    @media screen and (max-width: 48rem) {
      font-size: 3rem;
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
  const onClick = useCallback(() => {
    navigate('/movies');
  }, [navigate]);

  return (
    <Container>
      <NetflixHeader>
        <Logo>
          <svg viewBox='0 0 111 30' aria-hidden='true' focusable='false'>
            <path
              d='M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z'
              id='Fill-14'
            ></path>
          </svg>
        </Logo>
      </NetflixHeader>
      <MainText>
        <h1>영화와 시리즈를 무제한으로.</h1>
        <h2>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</h2>
        <h3>시청할 준비가 되셨나요?</h3>
        <button onClick={onClick}>
          <span>시작하기</span>
          <svg viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
            <path d='M13.065 7.65c-.538-.578-.355-1.433.325-1.81a1.44 1.44 0 0 1 .72-.182c.398 0 .786.15 1.048.437L25.327 17.07a1.126 1.126 0 0 1 0 1.555L15.155 29.568c-.438.468-1.198.563-1.767.25-.681-.377-.863-1.23-.325-1.809l9.446-10.164L13.065 7.65zm11.211 10.393a.31.31 0 0 1 0-.391l-.181.194.181.197zM14.081 28.564c.01.006.053 0 .028.027a.07.07 0 0 0-.028-.027zm.024-21.5a.95.95 0 0 1 .007.008l-.007-.007z'></path>
          </svg>
        </button>
      </MainText>
      <BackgroundImage>
        <img
          src={process.env.PUBLIC_URL + '/image/background.jpg'}
          alt='background'
        />
      </BackgroundImage>
      <Gradient></Gradient>
    </Container>
  );
}

export default Home;
