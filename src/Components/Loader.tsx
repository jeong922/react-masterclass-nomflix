import styled, { keyframes } from "styled-components";

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50%  {
    border-radius:100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 48px;
    height: 48px;
    color: ${(props) => props.theme.red};
    opacity: 0.5;
    animation: ${rotationAnimation} 1s linear infinite;
  }
`;

function Loader() {
  return (
    <>
      <Wrapper>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="circle-notch"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"
          ></path>
        </svg>
      </Wrapper>
    </>
  );
}

export default Loader;
