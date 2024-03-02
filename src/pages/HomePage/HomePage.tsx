import { FC } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { getData } from '../../helpers/sendRequest';
import MovieCard from '../../components/common/MovieCard/MovieCard';
import styles from './HomePage.module.scss';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
}

interface PopularMovies {
  results: Movie[];
  page: number;
}

const getPopular = (): Promise<PopularMovies> => {
  return getData('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
};

const HomePage: FC = () => {
  const popularMovies = useFetchData(getPopular)?.results;

  if (!popularMovies?.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular movies</h1>
      <div className={styles.list}>
        {popularMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterUrl={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.release_date}
            rating={movie.vote_average}
            ratingCount={movie.vote_count}
            isAdult={movie.adult}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
