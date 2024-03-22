import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getReleaseYear } from '../../../helpers/getFullYear';
import { posterPath } from '../../../constants/paths';
import Rating from '../Rating/Rating';
import { ReactComponent as AdultIcon } from '../../../assets/icons/adult.svg';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  isAdult: boolean;
  posterUrl: string;
  releaseDate: string;
  rating: number;
  ratingCount: number;
}

const MovieCard: FC<MovieCardProps> = ({
  id,
  title,
  overview,
  isAdult,
  posterUrl,
  releaseDate,
  rating,
  ratingCount,
}) => {
  return (
    <div className={styles.container}>
      <img src={`${posterPath}/w500/${posterUrl}`} alt={title} className={styles.image} />
      <Link className={styles.title} to={`/movie/${id}`}>
        {title} {releaseDate && `(${getReleaseYear(releaseDate)})`}
      </Link>
      <div className={styles.overview}>{overview}</div>
      <div className={styles.info}>
        {isAdult && <AdultIcon className={styles.adultIcon} />}
        <Rating rating={rating} ratingCount={ratingCount} customClassName={styles.rating} />
      </div>
    </div>
  );
};

export default MovieCard;
