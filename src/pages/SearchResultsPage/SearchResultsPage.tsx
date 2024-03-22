import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { getData } from '../../helpers/sendRequest';
import { searchMovieEndpoint } from '../../constants/endpoints';
import { posterPath } from '../../constants/paths';
import { routes } from '../../constants/routes';
import { getReleaseYear } from '../../helpers/getFullYear';
import Rating from '../../components/common/Rating/Rating';
import { MoviesListResponse } from '../MoviesPage/types';
import styles from './SearchResultsPage.module.scss';
import Button from '../../components/common/Button/Button';

const getMoviesList = (endpointUrl: string): Promise<MoviesListResponse> => {
  return getData(endpointUrl);
};

const SearchResultsPage: FC = () => {
  const { value: searchValue } = useParams();
  const { data: moviesList, isLoading } = useFetchData(() =>
    getMoviesList(`${searchMovieEndpoint}?query=${searchValue}`)
  );
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Button text={'Go back'} onClick={() => navigate(-1)} />
        <h1 className={styles.title}>Search results for "{searchValue}"</h1>
      </div>
      {moviesList?.results.length ? (
        <ul className={styles.list}>
          {moviesList.results.map((movie) => (
            <li className={styles.movie} key={movie.id}>
              <img src={`${posterPath}/w185/${movie.poster_path}`} alt={movie.title} className={styles.image} />
              <div className={styles.movieInfo}>
                <Link className={styles.movieTitle} to={`${routes.movie}/${movie.id}`}>
                  {movie.title}
                </Link>
                {movie.release_date && <div className={styles.year}>{getReleaseYear(movie.release_date)}</div>}
                {movie.overview && <div className={styles.movieOverview}>{movie.overview}</div>}
                <Rating rating={movie.vote_average} ratingCount={movie.vote_count} customClassName={styles.rating} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No results</div>
      )}
    </div>
  );
};

export default SearchResultsPage;
