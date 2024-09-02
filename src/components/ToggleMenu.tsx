import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Wrapper = styled.div`
  @media screen and (min-width: 48rem) {
    display: none;
    font-size: 0.8rem;
  }
`;

const MenuDropDown = styled(motion.div)`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-weight: 600;
  svg {
    fill: white;
    height: 1rem;
    margin: 5px;
  }
`;

const ToggleMenuBtn = styled(motion.div)``;

const ToggleMenuList = styled.ul`
  position: absolute;
  min-width: 11em;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 0.625rem 0;
  margin-top: 2px;
  border: 1px solid #ffffff5c;
`;

const ToggleMenuListSelector = styled(motion.li)`
  padding: 10px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  div {
    align-items: center;
    font-size: 0.938rem;
    font-weight: 600;
    margin-right: 5px;
  }
`;

const menuVarients = {
  normal: {
    display: 'none',
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: 'tween',
    },
  },
  hover: {
    display: 'block',
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: 'tween',
    },
  },
  change: {
    backgroundColor: 'rgb(99, 99, 99, 0.7)',
  },
};

export default function ToggleMenu() {
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);

  const menuClick = useCallback(() => {
    show ? setShow(false) : setShow(true);
  }, [show]);

  return (
    <Wrapper>
      <MenuDropDown onClick={menuClick} onHoverStart={() => setShow(true)} onHoverEnd={() => setShow(false)}>
        <span>메뉴</span>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
          <path d='M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z' />
        </svg>
      </MenuDropDown>
      <ToggleMenuBtn
        variants={menuVarients}
        initial={'normal'}
        animate={show ? 'hover' : 'normal'}
        onHoverStart={() => setShow(true)}
        onHoverEnd={() => setShow(false)}
      >
        <ToggleMenuList>
          <Link to='/movies' onClick={menuClick}>
            <ToggleMenuListSelector variants={menuVarients} whileHover={'change'}>
              영화
            </ToggleMenuListSelector>
          </Link>
          <Link to='/tv' onClick={menuClick}>
            <ToggleMenuListSelector variants={menuVarients} whileHover={'change'}>
              시리즈
            </ToggleMenuListSelector>
          </Link>
          {user && (
            <Link to='/my-list' onClick={menuClick}>
              <ToggleMenuListSelector variants={menuVarients} whileHover={'change'}>
                내가 찜한 리스트
              </ToggleMenuListSelector>
            </Link>
          )}
        </ToggleMenuList>
      </ToggleMenuBtn>
    </Wrapper>
  );
}
