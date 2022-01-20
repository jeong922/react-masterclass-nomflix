const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  original_title: string;
  genre_ids: number;
}
export interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  original_name: string;
  first_air_date: string;
}
export interface IGetMoivesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvsResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface IGetMoivesDetail {
  id: number;
  original_title: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  videos: {
    results: [
      {
        id: string;
        iso_639_1: string;
        iso_3166_1: string;
        key: string;
        name: string;
        official: boolean;
        published_at: string;
        site: string;
        size: number;
        type: string;
      }
    ];
  };
}

export interface IMovieCredit {
  id: number;
  cast: [
    {
      profile_path: string;
      name: string;
      character: string;
    }
  ];
}

export interface IMovieRecommendations {
  page: number;
  results: [
    {
      backdrop_path: string;
      id: number;
      media_type: string;
      title: string;
      poster_path: string;
    }
  ];
  total_pages: number;
  total_results: number;
}

// movie

export function getDetailsMovies(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getCreditsMovies(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getRecommendationsMovies(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getSimilarMovies(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getNowPlayMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getTopRatedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

// Tv
export function getOnTheAirTV() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getPopularTV() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getTopRatedTV() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getAiringTodayTV() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}
