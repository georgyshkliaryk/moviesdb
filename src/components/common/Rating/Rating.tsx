import { FC } from 'react';
import classNames from 'classnames';
import { RatingType, getRatingColor } from '../../../helpers/getRatingColor';
import { ReactComponent as RatingIcon } from '../../../assets/icons/rating.svg';
import styles from './Rating.module.scss';

const mapRatingTypeToClassName = {
  [RatingType.low]: styles.isLow,
  [RatingType.mid]: styles.isMid,
  [RatingType.high]: styles.isHigh,
};

interface RatingProps {
    rating: number;
    ratingCount: number;
    customClassName?: string;
}

const Rating: FC<RatingProps> = ({ rating, ratingCount, customClassName }) => {
  const roundedRating = rating.toFixed(2);
  const votesText = ratingCount === 1 ? 'vote' : 'votes';

  return (
    <div className={classNames(styles.rating, mapRatingTypeToClassName[getRatingColor(rating)], customClassName)}>
      <RatingIcon className={styles.ratingIcon} /> {roundedRating} ({ratingCount} {votesText})
    </div>
  );
};

export default Rating;
