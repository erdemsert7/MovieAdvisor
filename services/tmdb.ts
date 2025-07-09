import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type {
  TMDBMovieResponse,
  TMDBSeriesResponse,
  TMDBGenresResponse,
  TMDBWatchProvidersResponse,
  MovieQueryParams,
  SeriesQueryParams,
  ProcessedMovie,
  ProcessedSeries,
  TMDBGenre,
} from "../types/tmdb";

class TMDBService {
  private readonly baseUrl = "https://api.themoviedb.org/3";
  private readonly imageBaseUrl = "https://image.tmdb.org/t/p";
  private readonly apiKey: string;
  private readonly client: AxiosInstance;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
    if (!this.apiKey) {
      console.warn("TMDB API key is not configured");
    }

    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      params: {
        api_key: this.apiKey,
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        console.log(
          `🎬 TMDB API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("🚨 TMDB Request Error:", error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `✅ TMDB API Response: ${response.status} - ${response.config.url}`
        );
        return response;
      },
      (error) => {
        if (error.response) {
          console.error(
            `🚨 TMDB API Error: ${error.response.status} - ${
              error.response.data?.status_message || error.message
            }`
          );
          throw new Error(
            `TMDB API Error: ${error.response.status} - ${
              error.response.data?.status_message || error.message
            }`
          );
        } else if (error.request) {
          console.error("🚨 TMDB Network Error:", error.message);
          throw new Error("Network error: Unable to reach TMDB API");
        } else {
          console.error("🚨 TMDB Request Setup Error:", error.message);
          throw new Error(`Request error: ${error.message}`);
        }
      }
    );
  }

  private async fetchFromTMDB<T>(
    endpoint: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    try {
      const response = await this.client.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch from TMDB endpoint: ${endpoint}`, error);
      throw error;
    }
  }

  getPosterUrl(
    posterPath: string | null,
    size: "w154" | "w342" | "w500" | "w780" = "w500"
  ): string | null {
    if (!posterPath) return null;
    return `${this.imageBaseUrl}/${size}${posterPath}`;
  }

  getBackdropUrl(
    backdropPath: string | null,
    size: "w300" | "w780" | "w1280" = "w1280"
  ): string | null {
    if (!backdropPath) return null;
    return `${this.imageBaseUrl}/${size}${backdropPath}`;
  }

  private genreCache: Map<number, string> = new Map();

  async getMovieGenres(): Promise<TMDBGenre[]> {
    const response = await this.fetchFromTMDB<TMDBGenresResponse>(
      "/genre/movie/list"
    );

    response.genres.forEach((genre) => {
      this.genreCache.set(genre.id, genre.name);
    });

    return response.genres;
  }

  async getSeriesGenres(): Promise<TMDBGenre[]> {
    const response = await this.fetchFromTMDB<TMDBGenresResponse>(
      "/genre/tv/list"
    );

    response.genres.forEach((genre) => {
      this.genreCache.set(genre.id, genre.name);
    });

    return response.genres;
  }

  private mapGenreIds(genreIds: number[]): string[] {
    return genreIds
      .map((id) => this.genreCache.get(id) || `Genre ${id}`)
      .filter(Boolean);
  }

  async discoverMovies(
    params: MovieQueryParams = {}
  ): Promise<TMDBMovieResponse> {
    return this.fetchFromTMDB<TMDBMovieResponse>("/discover/movie", params);
  }

  async searchMovies(query: string, page = 1): Promise<TMDBMovieResponse> {
    return this.fetchFromTMDB<TMDBMovieResponse>("/search/movie", {
      query,
      page,
    });
  }

  async getPopularMovies(page = 1): Promise<TMDBMovieResponse> {
    return this.fetchFromTMDB<TMDBMovieResponse>("/movie/popular", { page });
  }

  async getTopRatedMovies(page = 1): Promise<TMDBMovieResponse> {
    return this.fetchFromTMDB<TMDBMovieResponse>("/movie/top_rated", { page });
  }

  async discoverSeries(
    params: SeriesQueryParams = {}
  ): Promise<TMDBSeriesResponse> {
    return this.fetchFromTMDB<TMDBSeriesResponse>("/discover/tv", params);
  }

  async searchSeries(query: string, page = 1): Promise<TMDBSeriesResponse> {
    return this.fetchFromTMDB<TMDBSeriesResponse>("/search/tv", {
      query,
      page,
    });
  }

  async getPopularSeries(page = 1): Promise<TMDBSeriesResponse> {
    return this.fetchFromTMDB<TMDBSeriesResponse>("/tv/popular", { page });
  }

  async getTopRatedSeries(page = 1): Promise<TMDBSeriesResponse> {
    return this.fetchFromTMDB<TMDBSeriesResponse>("/tv/top_rated", { page });
  }

  async getMovieWatchProviders(
    movieId: number
  ): Promise<TMDBWatchProvidersResponse> {
    return this.fetchFromTMDB<TMDBWatchProvidersResponse>(
      `/movie/${movieId}/watch/providers`
    );
  }

  async getSeriesWatchProviders(
    seriesId: number
  ): Promise<TMDBWatchProvidersResponse> {
    return this.fetchFromTMDB<TMDBWatchProvidersResponse>(
      `/tv/${seriesId}/watch/providers`
    );
  }

  async processMovies(movies: TMDBMovieResponse): Promise<ProcessedMovie[]> {
    if (this.genreCache.size === 0) {
      await this.getMovieGenres();
    }

    return movies.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterUrl: this.getPosterUrl(movie.poster_path),
      backdropUrl: this.getBackdropUrl(movie.backdrop_path),
      releaseDate: movie.release_date,
      genres: this.mapGenreIds(movie.genre_ids),
      rating: Math.round(movie.vote_average * 10) / 10,
      voteCount: movie.vote_count,
      language: movie.original_language,
      popularity: movie.popularity,
    }));
  }

  async processSeries(series: TMDBSeriesResponse): Promise<ProcessedSeries[]> {
    if (this.genreCache.size === 0) {
      await this.getSeriesGenres();
    }

    return series.results.map((show) => ({
      id: show.id,
      title: show.name,
      overview: show.overview,
      posterUrl: this.getPosterUrl(show.poster_path),
      backdropUrl: this.getBackdropUrl(show.backdrop_path),
      firstAirDate: show.first_air_date,
      genres: this.mapGenreIds(show.genre_ids),
      rating: Math.round(show.vote_average * 10) / 10,
      voteCount: show.vote_count,
      language: show.original_language,
      popularity: show.popularity,
      originCountry: show.origin_country,
    }));
  }
}

export const tmdbService = new TMDBService();
export default tmdbService;
