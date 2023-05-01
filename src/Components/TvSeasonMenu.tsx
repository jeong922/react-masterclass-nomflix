import { motion } from 'framer-motion';
import styled from 'styled-components';
import { GetDetail } from '../api/api';

const SeasonWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.875rem;
  margin-bottom: 1.25rem;
  width: 100%;
  h3 {
    font-size: 1.56rem;
    font-weight: 600;
  }
`;

const Season1 = styled.div`
  margin-right: 10px;
  font-size: 16px;
`;

const SeasonDropDown = styled.div`
  position: relative;
`;

const SeasonBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  position: relative;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1.5px solid rgb(77, 77, 77);
  background-color: ${(props) => props.theme.black.lighter};
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  span {
    margin-right: 20px;
  }
`;

const ToggleWrapper = styled(motion.div)`
  display: flex;
  svg {
    height: 16px;
    fill: ${(props) => props.theme.white.lighter};
  }
`;

const SeasonList = styled(motion.ul)`
  position: absolute;
  max-height: 260px;
  min-width: 200px;
  background-color: rgb(47, 47, 47);
  border: 1.5px solid rgb(77, 77, 77);
  border-radius: 5px;
  padding: 10px 0;
  margin-top: 2px;
  right: 0;
  z-index: 4;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.black.darker};
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
`;

const SeasonSelector = styled(motion.li)`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  div {
    align-items: center;
    font-size: 0.938rem;
    font-weight: 600;
    margin-right: 5px;
  }
`;

const seasonVarients = {
  normal: { display: 'none' },
  clicked: { display: 'block' },
  hover: {
    backgroundColor: 'rgb(99, 99, 99)',
  },
  svg0: {
    rotateZ: 0,
  },
  svg180: {
    rotateZ: 180,
  },
};

type Props = {
  detail: GetDetail;
  seasonListDisplay: boolean;
  seasonNum: { season: number; name: string };
  seasonToggleClicked: () => void;
  seasonClicked: (season: number, name: string) => void;
};

export default function TvSeasonMenu({
  detail,
  seasonListDisplay,
  seasonNum,
  seasonToggleClicked,
  seasonClicked,
}: Props) {
  return (
    <SeasonWrapper>
      <h3>회차</h3>
      {detail.seasons && detail.seasons.length > 1 ? (
        <SeasonDropDown>
          <SeasonBtn onClick={seasonToggleClicked}>
            <span>{seasonNum.name}</span>
            <ToggleWrapper
              variants={seasonVarients}
              initial='svg0'
              animate={seasonListDisplay ? 'svg180' : 'svg0'}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                <path d='M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z' />
              </svg>
            </ToggleWrapper>
          </SeasonBtn>
          <SeasonList
            variants={seasonVarients}
            initial='normal'
            animate={seasonListDisplay ? 'clicked' : 'normal'}
          >
            {detail.seasons.map((season) => (
              <SeasonSelector
                variants={seasonVarients}
                whileHover='hover'
                key={season.season_number}
                onClick={() => seasonClicked(season.season_number, season.name)}
              >
                <div>{season.name}</div>
                <span>({season.episode_count}개 에피소드)</span>
              </SeasonSelector>
            ))}
          </SeasonList>
        </SeasonDropDown>
      ) : (
        <Season1>시즌 1</Season1>
      )}
    </SeasonWrapper>
  );
}
