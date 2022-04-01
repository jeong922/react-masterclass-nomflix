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
  first_air_date: string;
  original_name: string;
  name: string;
  page: number;
  video: boolean;
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
export interface IGetMoivesDetail {
  id: number;
  original_title: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  backdrop_path: string;
  name: string;
  first_air_date: string;
  original_name: string;
  number_of_seasons: number;
  seasons: [{ season_number: number }];
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface IVideo {
  id: number;
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
      name: string;
    }
  ];
  total_pages: number;
  total_results: number;
}

export interface ILatest {
  adult: boolean;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  video: boolean;
  name: string;
}
export interface ISeason {
  episodes: [
    {
      air_date: string;
      episode_number: number;
      id: number;
      name: string;
      overview: string;
      season_number: number;
      still_path: string;
    }
  ];
  season_number: number;
  name: string;
  id: number;
  poster_path: string;
}

// movie

export function getDetailsMovies(mediaType: string, id: string) {
  return fetch(
    `${BASE_PATH}/${mediaType}/${id}?api_key=${API_KEY}&language=ko&append_to_response=videos`
  ).then((response) => response.json());
}

export function getCreditsMovies(mediaType: string, id: string) {
  return fetch(
    `${BASE_PATH}/${mediaType}/${id}/credits?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getRecommendationsMovies(mediaType: string, id: string) {
  return fetch(
    `${BASE_PATH}/${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getSimilarMovies(mediaType: string, id: string) {
  return fetch(
    `${BASE_PATH}/${mediaType}/${id}/similar?api_key=${API_KEY}&language=ko&page=1`
  ).then((response) => response.json());
}

export function getMoviesVideo(mediaType: string, id: string) {
  return fetch(
    `${BASE_PATH}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

// ---------------------------------------------------------------------------------------------------

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

export function getLatestMovies() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

// TV
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

export function getDetailsTV(id: string) {
  return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

// ------------------------------------------------------------------------------------------------------

export function getSeasonTV(id: string, season_number: number) {
  return fetch(
    `${BASE_PATH}/tv/${id}/season/${season_number}?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getLatestTV() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}

export function getTvVideo(id: string) {
  return fetch(
    `${BASE_PATH}/tv/${id}/videos?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

//....SEARCH ...
export function getsearchMovies(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=false`
  ).then((response) => response.json());
}
export function getsearchTV(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}&include_adult=false`
  ).then((response) => response.json());
}
