import React from 'react';
import { dateFormat, runtimeFormat } from '../utilities';
import { Credit, GetDetail } from '../api/api';
import styled from 'styled-components';
import { MediaType } from '../model/type';

const Informaiton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const BigOriginalTitle = styled.span`
  color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
  font-weight: 500;
  margin-right: 10px;
`;

const BigReleaseDate = styled.div`
  color: ${(props) => props.theme.white.lighter};
  margin-right: 10px;
  opacity: 0.7;
  font-size: 1rem;
  span:first-child {
    margin-right: 10px;
  }
  span:last-child {
    margin-left: 10px;
  }
`;

const BigRuntime = styled.span`
  color: ${(props) => props.theme.white.lighter};
  opacity: 0.7;
  font-size: 1rem;
`;

const BigGenres = styled.div`
  color: ${(props) => props.theme.white.lighter};
  opacity: 0.7;
  margin-bottom: 15px;
  font-size: 1rem;
  span {
    margin-right: 10px;
  }
`;

const BigCredit = styled.div`
  color: ${(props) => props.theme.white.lighter};
  opacity: 0.7;
  margin-bottom: 15px;
  font-size: 1rem;
  span {
    margin-right: 10px;
  }
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.6;
  margin-bottom: 40px;
  font-size: 1rem;
`;

type Props = {
  detail: GetDetail;
  mediaType: MediaType;
  credit: Credit | undefined;
};

export default function VideoInfo({ detail, mediaType, credit }: Props) {
  return (
    <div>
      <Informaiton>
        <BigOriginalTitle>
          {detail?.original_title || detail?.original_name}
        </BigOriginalTitle>
        <BigReleaseDate>
          <span>|</span>
          {detail?.release_date
            ? dateFormat(detail?.release_date)
            : detail?.first_air_date
            ? dateFormat(detail?.first_air_date)
            : detail.status}
          <span>|</span>
        </BigReleaseDate>
        {mediaType === 'movie' && detail.runtime > 0 ? (
          <BigRuntime>{runtimeFormat(detail.runtime)}</BigRuntime>
        ) : mediaType === 'tv' ? (
          <BigRuntime>시즌 {detail?.number_of_seasons}개</BigRuntime>
        ) : null}
      </Informaiton>
      <BigGenres>
        <span>장르:</span>
        {detail.genres.map((item) => (
          <span key={item.id}>{item.name}</span>
        ))}
      </BigGenres>
      <BigCredit>
        <span>출연:</span>
        {credit?.cast.slice(0, 5).map((item) => (
          <span key={item.id}>{item.name}</span>
        ))}
      </BigCredit>
      <BigOverview>{detail?.overview}</BigOverview>
    </div>
  );
}
