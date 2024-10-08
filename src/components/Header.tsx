import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';
import ToggleMenu from './ToggleMenu';
import UserMenu from './UserMenu';

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 70px;
  top: 0;
  font-size: 0.875rem;
  padding: 0 3.5em;
  color: white;
  z-index: 2;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 3em;
  width: 5.9rem;
  height: 1.6rem;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled(motion.li)`
  margin-right: 1.25em;
  color: ${(props) => props.theme.white.darker};
  font-weight: 600;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  @media screen and (max-width: 48rem) {
    display: none;
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 10px;
  svg {
    position: absolute;
    z-index: 2;
    right: 0;
    height: 25px;
    cursor: pointer;
  }
`;

const Bar = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 2.5em;
  z-index: 1;
  color: white;
  font-size: 16px;
  background-color: rgb(0, 0, 0, 0.7);
  border: 1px solid ${(props) => props.theme.white.lighter};
  width: 220px;
`;

const LoginButton = styled.button`
  background-color: ${(props) => props.theme.red};
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgba(175, 6, 8, 0.897);
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
};

function Header() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useAuthContext();
  const { scrollY } = useScroll();
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const tvMatch = useMatch('/tv');
  const movieMatch = useMatch('/movies');
  const myListMatch = useMatch('/my-list');
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?keyword=${keyword}`);
  };

  const toggleSearch = useCallback(() => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
      inputRef.current && inputRef.current.focus();
    }
    setSearchOpen((prev) => !prev);
  }, [searchOpen, inputAnimation]);

  useEffect(() => {
    scrollY.on('change', () => {
      if (scrollY.get() > 80) {
        navAnimation.start('scroll');
      } else {
        navAnimation.start('top');
      }
    });
  }, [scrollY, navAnimation]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={'top'}>
      <Col>
        <Link to='/movies'>
          <Logo
            variants={logoVariants}
            whileHover='active'
            initial='normal'
            xmlns='http://www.w3.org/2000/svg'
            width='1024'
            height='276.742'
            viewBox='0 0 1024 276.742'
          >
            <motion.path d='M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z' />
          </Logo>
        </Link>
        <Items>
          <Item>
            <Link to='/movies'>영화 {movieMatch && <Bar layoutId='bar' />}</Link>
          </Item>
          <Item>
            <Link to='/tv'>시리즈 {tvMatch && <Bar layoutId='bar' />}</Link>
          </Item>
          {user && (
            <Item>
              <Link to='/my-list'>내가 찜한 리스트 {myListMatch && <Bar layoutId='bar' />}</Link>
            </Item>
          )}
        </Items>
        <Items>
          <ToggleMenu />
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: 'linear' }}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </motion.svg>
          <Input
            ref={inputRef}
            onChange={onChange}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            placeholder='검색어를 입력하세요.'
            transition={{ type: 'linear' }}
          ></Input>
        </Search>
        <div>
          {!user && <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>}
          {user && <UserMenu user={user} handleLogout={logout} />}
        </div>
      </Col>
    </Nav>
  );
}

export default React.memo(Header);
