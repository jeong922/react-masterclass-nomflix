const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = 'https://api.themoviedb.org/3';

export type Movie = {
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
};
export type GetMoivesResult = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export type GetMoivesDetail = {
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
  seasons: [{ season_number: number; episode_count: number; name: string }];
  status: string;
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
};

export type Video = {
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
};

export type MovieCredit = {
  id: number;
  cast: [
    {
      id: number;
      profile_path: string;
      name: string;
      character: string;
    }
  ];
};

export type MovieRecommendations = {
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
};

export type Latest = {
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
};
export type TVSeason = {
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
};

// movie
export async function getDetailsMovies(mediaType: string, id: string) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/${id}?api_key=${API_KEY}&language=ko&append_to_response=videos`
  );
  return await response.json();
}

export async function getCreditsMovies(mediaType: string, id: string) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/${id}/credits?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

export async function getRecommendationsMovies(mediaType: string, id: string) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

export async function getSimilarMovies(mediaType: string, id: string) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/${id}/similar?api_key=${API_KEY}&language=ko&page=1`
  );
  return await response.json();
}

export async function getMoviesVideo(mediaType: string, id: string) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

// ---------------------------------------------------------------------------------------------------

export async function getNowPlayMovies(page: number) {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getUpcomingMovies(page: number) {
  const response = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getPopularMovies(page: number) {
  const response = await fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getTopRatedMovies(page: number) {
  const response = await fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getLatestMovies() {
  const response = await fetch(
    `${BASE_PATH}/movie/latest?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

// TV
export async function getOnTheAirTV(page: number) {
  const response = await fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getPopularTV(page: number) {
  const response = await fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getTopRatedTV(page: number) {
  const response = await fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getAiringTodayTV(page: number) {
  const response = await fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getDetailsTV(id: string) {
  const response = await fetch(
    `${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko&append_to_response=videos`
  );
  return await response.json();
}

// ------------------------------------------------------------------------------------------------------

export async function getSeasonTV(id: string, season_number: number) {
  const response = await fetch(
    `${BASE_PATH}/tv/${id}/season/${season_number}?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

export async function getLatestTV() {
  const response = await fetch(
    `${BASE_PATH}/tv/latest?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

export async function getTvVideo(id: string) {
  const response = await fetch(
    `${BASE_PATH}/tv/${id}/videos?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

//....SEARCH ...
export async function getsearchMovies(keyword: string) {
  const response = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=false`
  );
  return await response.json();
}
export async function getsearchTV(keyword: string) {
  const response = await fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}&include_adult=false`
  );
  return await response.json();
}
