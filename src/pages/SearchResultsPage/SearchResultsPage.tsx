import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import { getData } from '../../helpers/sendRequest';
import { searchMovieEndpoint } from '../../constants/endpoints';
import { routes } from '../../constants/routes';
import { getReleaseYear } from '../../helpers/getFullYear';
import Loading from '../../components/common/Loading/Loading';
import Button from '../../components/common/Button/Button';
import Img, { ImageWidthTypes } from '../../components/common/Img/Img';
import Rating from '../../components/common/Rating/Rating';
import { MoviesListResponse } from '../MoviesPage/types';
import styles from './SearchResultsPage.module.scss';

const getMoviesList = (endpointUrl: string): Promise<MoviesListResponse> => {
  return getData(endpointUrl);
};

const SearchResultsPage: FC = () => {
  const { value: searchValue } = useParams();
  const navigate = useNavigate();

  const { data: moviesList, isLoading } = useFetchData(() =>
    getMoviesList(`${searchMovieEndpoint}?query=${searchValue}`)
  );

  if (isLoading) {
    return <Loading customClassName={styles.loading} />;
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
              <Img
                url={movie.poster_path}
                width={ImageWidthTypes.w185}
                alt={movie.title}
                customClassName={styles.image}
              />
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
        <div className={styles.noResults}>No results found.</div>
      )}
    </div>
  );
};

export default SearchResultsPage;
