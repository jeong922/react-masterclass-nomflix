const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = 'https://api.themoviedb.org/3';

export type GetContents = {
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
export type GetResult = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: GetContents[];
  total_pages: number;
  total_results: number;
};

export type GetDetail = {
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

export type Credit = {
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

export type Recommendations = {
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

export async function getDetails(mediaType: string, id: string) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/${id}?api_key=${API_KEY}&language=ko&append_to_response=videos`
  );
  return await response.json();
}

export async function getCredits(mediaType: string, id: string) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/${id}/credits?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

export async function getRecommendations(mediaType: string, id: string) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=ko`
  );
  return await response.json();
}

export async function getSimilar(mediaType: string, id: string) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/${id}/similar?api_key=${API_KEY}&language=ko&page=1`
  );
  return await response.json();
}

// ---------------------------------------------------------------------------------------------------

export async function getNowPlay(page: number) {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getUpcoming(page: number) {
  const response = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getPopular(mediaType: string, page: number) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/popular?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getTopRated(mediaType: string, page: number) {
  const response = await fetch(
    `${BASE_PATH}/${mediaType}/top_rated?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getOnTheAir(page: number) {
  const response = await fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko&page=${page}`
  );
  return await response.json();
}

export async function getAiringToday(page: number) {
  const response = await fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko&page=${page}`
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

//....SEARCH ...
export async function getsearch(mediaType: string, keyword: string) {
  const response = await fetch(
    `${BASE_PATH}/search/${mediaType}?api_key=${API_KEY}&query=${keyword}&include_adult=false`
  );
  return await response.json();
}
