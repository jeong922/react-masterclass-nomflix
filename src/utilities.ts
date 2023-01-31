import { GetContents } from './api/api';

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
}

export const makeDataArray = (
  data1: GetContents[] | undefined,
  data2: GetContents[] | undefined
) => {
  let data;
  if (data1 && data2) {
    const nowPlayingData = [data1, data2].flatMap((item) => item);
    data = nowPlayingData;
  }
  return data;
};

export function runtimeFormat(runtime: number) {
  if (runtime < 60) {
    return `${runtime}분`;
  } else if (runtime >= 60) {
    const hour = Math.floor(runtime / 60);
    const second = runtime % 60;
    return `${hour}시간 ${second}분`;
  }
}

export function dateFormat(date: string) {
  if (date) {
    return date.replaceAll('-', '.');
  }
}

export function isBeforeAirDate(airDate: string) {
  if (airDate) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const now = '' + year + ('' + month).padStart(2, '0') + date;
    const formatedAirDate = airDate.replaceAll('-', '');
    return formatedAirDate !== undefined && +formatedAirDate > +now
      ? true
      : false;
  }
}
