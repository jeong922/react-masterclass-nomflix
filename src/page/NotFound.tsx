import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  span {
    padding: 0.5rem;
    margin-bottom: 3rem;
    font-size: 3rem;
    font-weight: 600;
  }
  div {
    button {
      color: white;
      background-color: #e51013;
      padding: 0.5rem;
      margin-right: 0.75rem;
      transition: all 300ms ease-in-out;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: rgba(175, 6, 8, 0.897);
      }
    }
  }
`;

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <span>Page Not Found😱</span>
      <div>
        <button
          className='p-2 mr-3 duration-300 ease-in-out transform rounded-lg bg-lightGray hover:bg-purple-100'
          onClick={() => navigate('/movies')}
        >
          메인 페이지로 가기
        </button>
        <button
          className='p-2 duration-300 ease-in-out transform rounded-lg bg-lightGray hover:bg-purple-100'
          onClick={() => navigate(-1)}
        >
          이전 페이지로 가기
        </button>
      </div>
    </Wrapper>
  );
}
