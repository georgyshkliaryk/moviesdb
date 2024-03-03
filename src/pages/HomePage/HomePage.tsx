import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import styles from './HomePage.module.scss';

const HomePage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to MoviesDB</h1>
      <Link to={routes.moviesList.nowPlaying} className={styles.link}>
        Now playing
      </Link>
      <Link to={routes.moviesList.popular} className={styles.link}>
        Popular
      </Link>
      <Link to={routes.moviesList.topRated} className={styles.link}>
        Top rated
      </Link>
    </div>
  );
};

export default HomePage;
