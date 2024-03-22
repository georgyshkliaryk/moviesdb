export interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
}

export interface MoviesListResponse {
  results: Movie[];
  page: number;
}
