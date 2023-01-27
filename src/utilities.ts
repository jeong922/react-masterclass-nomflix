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
