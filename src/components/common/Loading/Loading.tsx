import { FC } from 'react';
import classNames from 'classnames';
import { ReactComponent as Spinner } from '../../../assets/icons/spinner.svg';
import styles from './Loading.module.scss';

interface LoadingProps {
  customClassName?: string;
}

const Loading: FC<LoadingProps> = ({ customClassName }) => {
  return (
    <div className={classNames(styles.container, customClassName)}>
      Loading...
      <Spinner className={styles.spinner} />
    </div>
  );
};

export default Loading;
