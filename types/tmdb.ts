export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
}

export interface TMDBSeries {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBMovieResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBSeriesResponse {
  page: number;
  results: TMDBSeries[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenresResponse {
  genres: TMDBGenre[];
}

export interface TMDBWatchProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface TMDBWatchProvidersResponse {
  id: number;
  results: {
    [countryCode: string]: {
      link: string;
      flatrate?: TMDBWatchProvider[];
      rent?: TMDBWatchProvider[];
      buy?: TMDBWatchProvider[];
    };
  };
}

export interface MovieQueryParams {
  page?: number;
  with_genres?: string;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  with_runtime_lte?: number;
  with_runtime_gte?: number;
  with_original_language?: string;
  certification_country?: string;
  certification?: string;
  sort_by?: string;
  with_watch_providers?: string;
  watch_region?: string;
}

export interface SeriesQueryParams {
  page?: number;
  with_genres?: string;
  first_air_date_gte?: string;
  first_air_date_lte?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  with_status?: string;
  with_original_language?: string;
  with_keywords?: string;
  sort_by?: string;
  with_watch_providers?: string;
  watch_region?: string;
}

export interface ProcessedMovie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseDate: string;
  genres: string[];
  rating: number;
  voteCount: number;
  language: string;
  popularity: number;
}

export interface ProcessedSeries {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  firstAirDate: string;
  genres: string[];
  rating: number;
  voteCount: number;
  language: string;
  popularity: number;
  originCountry: string[];
}
