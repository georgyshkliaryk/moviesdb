import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  url?: string;
  onClick?: () => void;
  customClassName?: string;
}

const Button: FC<ButtonProps> = ({ text, url, customClassName, onClick }) => {
  if (!!url) {
    return (
      <Link to={url} className={classNames(styles.button, customClassName)}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classNames(styles.button, customClassName)}>
      {text}
    </button>
  );
};

export default Button;
