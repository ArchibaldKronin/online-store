import classNames from 'classnames';
import styles from './Loader.module.scss';

const Loader = () => {
  return <p className={classNames(styles.greenBg)}>...loading...</p>;
};

export default Loader;
