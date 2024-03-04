import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getRatingColor, RatingType } from '../../../helpers/getRatingColor';
import { posterPath } from '../../../constants/paths';
import { ReactComponent as AdultIcon } from '../../../assets/icons/adult.svg';
import { ReactComponent as RatingIcon } from '../../../assets/icons/rating.svg';
import styles from './MovieCard.module.scss';

const mapRatingTypeToClassName = {
  [RatingType.low]: styles.isLow,
  [RatingType.mid]: styles.isMid,
  [RatingType.high]: styles.isHigh,
};

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
  const releaseYear = useMemo(() => {
    const movieDate = new Date(releaseDate);
    return movieDate.getFullYear();
  }, [releaseDate]);

  const roundedRating = rating.toFixed(2);
  const votesText = ratingCount === 1 ? 'vote' : 'votes';

  return (
    <div className={styles.container}>
      <img src={`${posterPath}/w500/${posterUrl}`} alt={title} className={styles.image} />
      <Link className={styles.title} to={`/movie/${id}`}>
        {title} ({releaseYear})
      </Link>
      <div className={styles.overview}>{overview}</div>
      <div className={styles.info}>
        {isAdult && <AdultIcon className={styles.adultIcon} />}
        <div className={classNames(styles.rating, mapRatingTypeToClassName[getRatingColor(rating)])}>
          <RatingIcon className={styles.ratingIcon} /> {roundedRating} ({ratingCount} {votesText})
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
