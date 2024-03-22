import { FC, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../../constants/routes';
import { posterPath } from '../../../../constants/paths';
import { Movie } from '../../../../pages/MoviesPage/types';
import { getReleaseYear } from '../../../../helpers/getFullYear';
import { ReactComponent as Spinner } from '../../../../assets/icons/spinner.svg';
import styles from './SearchResults.module.scss';

const maxResultsLength = 5;

interface SearchResultsProps {
  searchResults: Movie[];
  isLoading: boolean;
  isNoResults: boolean;
  searchValue: string;
}

const SearchResults: FC<SearchResultsProps> = ({ searchResults, isLoading, isNoResults, searchValue }) => {
  const results = useMemo(() => {
    if (isLoading) {
      return (
        <div className={styles.loading}>
          Loading...
          <Spinner className={styles.spinner} />
        </div>
      );
    }

    if (isNoResults) {
      return <div className={styles.noResults}>No movies found.</div>;
    }

    return searchResults.slice(0, maxResultsLength).map((movie) => (
      <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.result}>
        {!!movie.poster_path && (
          <img src={`${posterPath}/w185/${movie.poster_path}`} alt={movie.title} className={styles.image} />
        )}
        <div className={styles.info}>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.year}>{getReleaseYear(movie.release_date)}</div>
          <div className={styles.overview}>{movie.overview}</div>
        </div>
      </Link>
    ));
  }, [isLoading, isNoResults, searchResults]);

  const isShowMoreShown = !isLoading && !isNoResults && searchResults.length > maxResultsLength;

  return (
    <div className={styles.results}>
      {results}
      {isShowMoreShown && (
        <Link to={`${routes.searchResults}/${searchValue}`} className={styles.showMore}>
          Show more results
        </Link>
      )}
    </div>
  );
};
export default SearchResults;
