import styled from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';

type Props = {
  user: any;
  handleLogout: () => void;
};

const Wrapper = styled.div`
  position: relative;
  height: 70px;
  display: flex;
  svg {
    transition: all 300ms ease-in;
  }
  &:hover {
    svg {
      transform: rotateZ(180deg);
    }
  }
`;

const AccountDropDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    height: 30px;
    border-radius: 5px;
    margin-right: 5px;
  }
`;

const User = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  margin-top: 10px;
  padding: 5px 0;
  border: 1px solid #ffffff5c;
  border-radius: 5px;
  background-color: rgb(0, 0, 0, 0.7);

  button {
    width: 100%;
    padding: 10px 0;
    margin-top: 5px;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: rgb(99, 99, 99, 0.7);
    }
  }
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  border-bottom: 1px solid #ffffff5c;
  padding-bottom: 10px;
  img {
    height: 25px;
    margin-right: 5px;
    border-radius: 50%;
  }
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

export default function UserMenu({ user, handleLogout }: Props) {
  const [show, setShow] = useState(false);
  return (
    <Wrapper
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => (show ? setShow(false) : setShow(true))}
    >
      <AccountDropDown>
        <img
          src={user.photoURL}
          alt={user.displayName ?? user.email.split('@')[0]}
        />
        <IoMdArrowDropdown />
      </AccountDropDown>
      {show && (
        <User>
          <UserInfo>
            <img
              src={user.photoURL}
              alt={user.displayName ?? user.email.split('@')[0]}
            />
            <span>{user.displayName ?? user.email.split('@')[0]}</span>
          </UserInfo>
          <button onClick={handleLogout}>로그아웃</button>
        </User>
      )}
    </Wrapper>
  );
}
