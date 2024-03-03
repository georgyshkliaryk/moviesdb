import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  url: string;
  customClassName?: string;
}

const Button: FC<ButtonProps> = ({ text, url, customClassName }) => {
  return (
    <Link to={url} className={classNames(styles.button, customClassName)}>
      {text}
    </Link>
  );
};

export default Button;
