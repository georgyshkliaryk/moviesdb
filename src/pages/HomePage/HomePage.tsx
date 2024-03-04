import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import styles from './HomePage.module.scss';
import Button from '../../components/common/Button/Button';

const HomePage: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to MoviesDB</h1>
      <Button text={'Now playing'} url={routes.moviesList.nowPlaying} />
      <Button text={'Popular'} url={routes.moviesList.popular} />
      <Button text={'Top rated'} url={routes.moviesList.topRated} />
      <Button text={'Coming soon'} url={routes.moviesList.comingSoon} />
    </div>
  );
};

export default HomePage;
