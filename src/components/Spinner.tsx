import styled, { keyframes } from 'styled-components';

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50%  {
    color : rgba(229, 16, 19,0.2)
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top: 5px solid ${(props) => props.theme.red};
  border-left: 5px solid ${(props) => props.theme.red};
  opacity: 0.5;
  animation: ${rotationAnimation} 0.8s linear infinite;
`;

export default function Spinner() {
  return <LoadingSpinner />;
}
