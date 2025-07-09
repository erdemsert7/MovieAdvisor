import tmdbService from "../services/tmdb";
import type {
  MovieQueryParams,
  SeriesQueryParams,
  ProcessedMovie,
  ProcessedSeries,
} from "../types/tmdb";

export interface UserAnswers {
  [questionId: number]: string | string[];
}

export interface RecommendationParams {
  category: "movie" | "series";
  answers: UserAnswers;
  page?: number;
}

export function convertAnswersToMovieQuery(
  answers: UserAnswers
): MovieQueryParams {
  const params: MovieQueryParams = {
    watch_region: "TR",
  };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const qId = Number.parseInt(questionId);

    switch (qId) {
      case 1:
        if (Array.isArray(answer) && answer.length > 0) {
          const genreIds = answer
            .map((genre) => getMovieGenreId(genre))
            .filter(Boolean);
          if (genreIds.length > 0) {
            params.with_genres = genreIds.join(",");
          }
        }
        break;

      case 2:
        if (typeof answer === "string") {
          params.primary_release_date_gte = getReleaseDateFilter(answer);
        }
        break;

      case 3:
        if (typeof answer === "string") {
          params.vote_average_gte = getRatingFilter(answer);
        }
        break;

      case 4:
        if (typeof answer === "string") {
          params.with_runtime_lte = getRuntimeFilter(answer);
        }
        break;

      case 5:
        if (typeof answer === "string" && answer !== "Farketmez") {
          params.with_original_language = getLanguageCode(answer);
        }
        break;

      case 6:
        if (typeof answer === "string" && answer !== "Farketmez") {
          params.certification_country = "US";
          params.certification = getCertificationCode(answer);
        }
        break;

      case 7:
        if (typeof answer === "string") {
          params.sort_by = getSortByValue(answer);
        }
        break;

      case 8:
        if (Array.isArray(answer) && answer.length > 0) {
          const providerIds = answer
            .map((provider) => getWatchProviderId(provider))
            .filter(Boolean);
          if (providerIds.length > 0) {
            params.with_watch_providers = providerIds.join("|");
          }
        }
        break;
    }
  });

  return params;
}

export function convertAnswersToSeriesQuery(
  answers: UserAnswers
): SeriesQueryParams {
  const params: SeriesQueryParams = {
    watch_region: "TR",
  };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const qId = Number.parseInt(questionId);

    switch (qId) {
      case 1:
        if (Array.isArray(answer) && answer.length > 0) {
          const genreIds = answer
            .map((genre) => getSeriesGenreId(genre))
            .filter(Boolean);
          if (genreIds.length > 0) {
            params.with_genres = genreIds.join(",");
          }
        }
        break;

      case 2:
        if (typeof answer === "string") {
          params.first_air_date_gte = getReleaseDateFilter(answer);
        }
        break;

      case 3:
        if (typeof answer === "string") {
          params.vote_average_gte = getRatingFilter(answer);
        }
        break;

      case 4:
        if (typeof answer === "string" && answer !== "Farketmez") {
          params.with_status = getSeriesStatusCode(answer);
        }
        break;

      case 5:
        if (typeof answer === "string" && answer !== "Farketmez") {
          params.with_original_language = getLanguageCode(answer);
        }
        break;

      case 6:
        if (Array.isArray(answer) && answer.length > 0) {
          const keywordIds = answer
            .map((keyword) => getKeywordId(keyword))
            .filter(Boolean);
          if (keywordIds.length > 0) {
            params.with_keywords = keywordIds.join(",");
          }
        }
        break;

      case 7:
        if (typeof answer === "string") {
          params.sort_by = getSeriesSortByValue(answer);
        }
        break;

      case 8:
        if (Array.isArray(answer) && answer.length > 0) {
          const providerIds = answer
            .map((provider) => getWatchProviderId(provider))
            .filter(Boolean);
          if (providerIds.length > 0) {
            params.with_watch_providers = providerIds.join("|");
          }
        }
        break;
    }
  });

  return params;
}

function getMovieGenreId(genreLabel: string): string | null {
  const genreMap: Record<string, string> = {
    Aksiyon: "28",
    Macera: "12",
    Animasyon: "16",
    Komedi: "35",
    Suç: "80",
    Belgesel: "99",
    Drama: "18",
    Aile: "10751",
    Fantastik: "14",
    Korku: "27",
    Müzik: "10402",
    Gizem: "9648",
    Romantik: "10749",
    "Bilim Kurgu": "878",
    Gerilim: "53",
    Savaş: "10752",
    "Vahşi Batı": "37",
  };
  return genreMap[genreLabel] || null;
}

function getSeriesGenreId(genreLabel: string): string | null {
  const genreMap: Record<string, string> = {
    Aksiyon: "10759",
    Macera: "10759",
    Animasyon: "16",
    Komedi: "35",
    Suç: "80",
    Belgesel: "99",
    Drama: "18",
    Aile: "10751",
    Çocuk: "10762",
    Gizem: "9648",
    Haber: "10763",
    Reality: "10764",
    "Bilim Kurgu": "10765",
    "Pembe Dizi": "10766",
    "Talk Show": "10767",
    Savaş: "10768",
  };
  return genreMap[genreLabel] || null;
}

function getReleaseDateFilter(period: string): string {
  const dateMap: Record<string, string> = {
    "2024": "2024-01-01",
    "2020-2023": "2020-01-01",
    "2010-2019": "2010-01-01",
    "2000-2009": "2000-01-01",
    "1990-1999": "1990-01-01",
    Klasikler: "1900-01-01",
  };
  return dateMap[period] || "1900-01-01";
}

function getRatingFilter(rating: string): number {
  const ratingMap: Record<string, number> = {
    Mükemmel: 9.0,
    "Çok yüksek": 8.0,
    Yüksek: 7.0,
    İyi: 6.0,
    Orta: 5.0,
    Farketmez: 0,
  };
  return ratingMap[rating] || 0;
}

function getRuntimeFilter(runtime: string): number | undefined {
  const runtimeMap: Record<string, number> = {
    "Çok kısa": 60,
    Kısa: 90,
    Orta: 120,
    Uzun: 150,
    "Çok uzun": 300,
  };
  return runtimeMap[runtime];
}

function getLanguageCode(language: string): string {
  const languageMap: Record<string, string> = {
    İngilizce: "en",
    Türkçe: "tr",
    Fransızca: "fr",
    İspanyolca: "es",
    Japonca: "ja",
    Korece: "ko",
    İtalyanca: "it",
    Almanca: "de",
  };
  return languageMap[language] || "en";
}

function getCertificationCode(certification: string): string {
  const certMap: Record<string, string> = {
    "Genel izleyici": "G",
    "Aile dostu": "PG",
    "13 yaş üstü": "PG-13",
    Yetişkin: "R",
  };
  return certMap[certification] || "";
}

function getSortByValue(sortBy: string): string {
  const sortMap: Record<string, string> = {
    "En popüler": "popularity.desc",
    "En yüksek puan": "vote_average.desc",
    "En yeni": "release_date.desc",
    "En çok oy alan": "vote_count.desc",
    "Gelir sıralaması": "revenue.desc",
  };
  return sortMap[sortBy] || "popularity.desc";
}

function getSeriesSortByValue(sortBy: string): string {
  const sortMap: Record<string, string> = {
    "En popüler": "popularity.desc",
    "En yüksek puan": "vote_average.desc",
    "En yeni": "first_air_date.desc",
    "En çok oy alan": "vote_count.desc",
  };
  return sortMap[sortBy] || "popularity.desc";
}

function getSeriesStatusCode(status: string): string {
  const statusMap: Record<string, string> = {
    "Devam eden": "0",
    Tamamlanmış: "5",
    "İptal edilmiş": "4",
    Planlanıyor: "1",
  };
  return statusMap[status] || "";
}

function getKeywordId(keyword: string): string | null {
  const keywordMap: Record<string, string> = {
    Polis: "6149",
    Hastane: "11424",
    Okul: "9840",
    Aile: "818",
    Fantastik: "3205",
    Uzay: "1612",
    Vampir: "12377",
    Zombi: "12377",
  };
  return keywordMap[keyword] || null;
}

function getWatchProviderId(provider: string): string | null {
  const providerMap: Record<string, string> = {
    Netflix: "8",
    "Amazon Prime": "119",
    "Disney+": "337",
    "HBO Max": "384",
    Puhutv: "423",
    "TV+": "69",
    Tabii: "564",
    "Apple TV+": "350",
  };
  return providerMap[provider] || null;
}

export async function getRecommendations(
  params: RecommendationParams
): Promise<ProcessedMovie[] | ProcessedSeries[]> {
  const { category, answers, page = 1 } = params;

  try {
    if (category === "movie") {
      const queryParams = convertAnswersToMovieQuery(answers);
      queryParams.page = page;

      const response = await tmdbService.discoverMovies(queryParams);
      return await tmdbService.processMovies(response);
    } else {
      const queryParams = convertAnswersToSeriesQuery(answers);
      queryParams.page = page;

      const response = await tmdbService.discoverSeries(queryParams);
      return await tmdbService.processSeries(response);
    }
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw new Error("Failed to get recommendations");
  }
}
