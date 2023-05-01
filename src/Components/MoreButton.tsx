import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useCallback } from 'react';
import styled from 'styled-components';

const MoreBtnWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120px;
  z-index: 6;
  background: linear-gradient(rgba(24, 24, 24, 0), rgba(24, 24, 24, 1));
  border-bottom: 2px solid #404040;
`;

const MoreBoxBtn = styled(motion.button)`
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 50%;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
`;

const moreWrapperBtnVariants = {
  btn_position1: {
    top: -120,
  },
  btn_position2: {
    top: -40,
  },
};

const moreBtnVariants = {
  rotate0: {
    rotateZ: 0,
  },
  rotate1: {
    rotateZ: 180,
  },
  rotate2: {
    rotateZ: 0,
  },
  hover: {
    border: '2px solid rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
};

type Props = {
  setHeight: Dispatch<SetStateAction<string>>;
  more: boolean;
  setMore: Dispatch<SetStateAction<boolean>>;
  setPositionRef: Dispatch<SetStateAction<boolean>>;
};

const MoreButton = ({ setHeight, more, setMore, setPositionRef }: Props) => {
  const toggleClicked = useCallback(() => {
    if (more) {
      setHeight('480px');
      setPositionRef(true);
      setMore(false);
    } else {
      setHeight('');
      setPositionRef(false);
      setMore(true);
    }
  }, [more, setHeight, setPositionRef, setMore]);

  return (
    <MoreBtnWrapper
      variants={moreWrapperBtnVariants}
      initial='btn_position1'
      animate={more ? 'btn_position2' : 'btn_position1'}
      transition={{ type: 'tween' }}
    >
      <MoreBoxBtn
        onClick={toggleClicked}
        variants={moreBtnVariants}
        initial='rotate0'
        animate={more ? 'rotate1' : 'rotate2'}
        whileHover='hover'
        transition={{ type: 'tween' }}
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z'
            fill='currentColor'
          ></path>
        </svg>
      </MoreBoxBtn>
    </MoreBtnWrapper>
  );
};

export default MoreButton;
