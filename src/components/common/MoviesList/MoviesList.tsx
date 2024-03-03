import { FC } from 'react';
import { MoviesListResponse } from '../../../pages/MoviesPage/types';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MoviesList.module.scss';
import Button from '../Button/Button';
import { routes } from '../../../constants/routes';

interface MoviesListProps {
  list: MoviesListResponse | null;
}

const MoviesList: FC<MoviesListProps> = ({ list }) => {
  if (!list?.results?.length) {
    return (
      <div className={styles.notFound}>
        There are currently no movies to display.
        <Button text={'Go back home'} url={routes.home} />
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {list?.results.map((movie) => (
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
  );
};

export default MoviesList;
