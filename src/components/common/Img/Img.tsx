import { FC } from 'react';
import classNames from 'classnames';
import imagePlaceholder from '../../../assets/images/no-image.jpg';
import { posterPath } from '../../../constants/paths';
import styles from './Img.module.scss';

export enum ImageWidthTypes {
  w92 = 'w92',
  w154 = 'w154',
  w185 = 'w185',
  w342 = 'w342',
  w500 = 'w500',
  w780 = 'w780',
  original = 'original',
}

interface ImgProps {
  url?: string | null;
  width?: ImageWidthTypes;
  alt?: string;
  customClassName?: string;
}

const Img: FC<ImgProps> = ({ url, alt, width = ImageWidthTypes.w342, customClassName }) => {
  return (
    <img
      src={url ? `${posterPath}/${width}/${url}` : imagePlaceholder}
      alt={alt}
      className={classNames(styles.image, customClassName)}
    />
  );
};

export default Img;
