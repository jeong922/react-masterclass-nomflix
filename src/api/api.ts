import axios from 'axios';

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

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: { api_key: process.env.REACT_APP_API_KEY },
});

export async function getDetails(mediaType: string, id: string) {
  const response = await instance.get(`${mediaType}/${id}`, {
    params: {
      language: 'ko',
      append_to_response: 'videos',
    },
  });
  return await response.data;
}

export async function getCredits(mediaType: string, id: string) {
  const response = await instance.get(`${mediaType}/${id}/credits`, {
    params: {
      language: 'ko',
    },
  });
  return await response.data;
}

export async function getRecommendations(mediaType: string, id: string) {
  const response = await instance.get(`${mediaType}/${id}/recommendations`, {
    params: {
      language: 'ko',
      page: 1,
    },
  });
  return await response.data;
}

export async function getSimilar(mediaType: string, id: string) {
  const response = await instance.get(`${mediaType}/${id}/similar`, {
    params: {
      language: 'ko',
      page: 1,
    },
  });
  return await response.data;
}

// ---------------------------------------------------------------------------------------------------

export async function getNowPlay(page: number) {
  const response = await instance.get('movie/now_playing', {
    params: {
      language: 'ko',
      page: page,
    },
  });
  return await response.data;
}

export async function getUpcoming(page: number) {
  const response = await instance.get('movie/upcoming', {
    params: {
      language: 'ko',
      page: page,
    },
  });
  return await response.data;
}

export async function getPopular(mediaType: string, page: number) {
  const response = await instance.get(`${mediaType}/popular`, {
    params: {
      language: 'ko',
      page: page,
    },
  });
  return await response.data;
}

export async function getTopRated(mediaType: string, page: number) {
  const response = await instance.get(`${mediaType}/top_rated`, {
    params: {
      language: 'ko',
      page: page,
    },
  });
  return await response.data;
}

export async function getOnTheAir(page: number) {
  const response = await instance.get('tv/on_the_air', {
    params: {
      language: 'ko',
      page: page,
    },
  });
  return await response.data;
}

export async function getAiringToday(page: number) {
  const response = await instance.get('tv/airing_today', {
    params: {
      language: 'ko',
      page: page,
    },
  });
  return await response.data;
}

// ------------------------------------------------------------------------------------------------------

export async function getSeasonTV(id: string, season_number: number) {
  const response = await instance.get(`tv/${id}/season/${season_number}`, {
    params: {
      language: 'ko',
    },
  });
  return await response.data;
}

//....SEARCH ...
export async function getsearch(mediaType: string, keyword: string) {
  const response = await instance.get(`search/${mediaType}`, {
    params: {
      language: 'ko',
      query: keyword,
      include_adult: false,
    },
  });
  return await response.data;
}
