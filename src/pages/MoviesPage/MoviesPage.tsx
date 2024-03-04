import { FC } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { getData } from '../../helpers/sendRequest';
import { MoviesListResponse } from './types';
import Button from '../../components/common/Button/Button';
import { routes } from '../../constants/routes';
import Loading from '../../components/common/Loading/Loading';
import MoviesList from '../../components/common/MoviesList/MoviesList';
import styles from './MoviesPage.module.scss';

interface MoviesPageProps {
  title: string;
  endpointUrl: string;
}

const getMoviesList = (endpointUrl: string): Promise<MoviesListResponse> => {
  return getData(endpointUrl);
};

const MoviesPage: FC<MoviesPageProps> = ({ endpointUrl, title }) => {
  const { data: moviesList, isLoading } = useFetchData(() => getMoviesList(endpointUrl));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Button text={'Go back home'} url={routes.home} />
        {title}
      </h1>
      {isLoading ? <Loading /> : <MoviesList list={moviesList} />}
    </div>
  );
};

export default MoviesPage;
