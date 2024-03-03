import { FC } from 'react';
import { ReactComponent as Spinner } from '../../../assets/icons/spinner.svg';
import styles from './Loading.module.scss';

const Loading: FC = () => {
  return (
    <div className={styles.container}>
      Loading...
      <Spinner className={styles.spinner} />
    </div>
  );
};

export default Loading;
