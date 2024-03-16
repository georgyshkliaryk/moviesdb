import { FC, ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { posterPath } from '../../../constants/paths';
import { searchMovieEndpoint } from '../../../constants/endpoints';
import { getData } from '../../../helpers/sendRequest';
import { Movie, MoviesListResponse } from '../../../pages/MoviesPage/types';
import styles from './Search.module.scss';

const maxResultsLength = 5;

const getReleaseYear = (releaseDate: string) => {
  const date = new Date(releaseDate);
  return date.getFullYear();
};

const getMoviesList = (endpointUrl: string): Promise<MoviesListResponse> => {
  return getData(endpointUrl);
};

const Search: FC = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const results = (await getMoviesList(`${searchMovieEndpoint}?query=${value}`)).results;
    const trimmedResults = results.slice(0, maxResultsLength);
    setSearchResults(trimmedResults);
  };

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search for a movie" className={styles.input} onChange={handleChange} />
      {!!searchResults.length && (
        <div className={styles.results}>
          {searchResults.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.result}>
              <img src={`${posterPath}/w185/${movie.poster_path}`} alt={movie.title} className={styles.image} />
              <div className={styles.info}>
                <div className={styles.title}>{movie.title}</div>
                <div className={styles.year}>{getReleaseYear(movie.release_date)}</div>
                <div className={styles.overview}>{movie.overview}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
