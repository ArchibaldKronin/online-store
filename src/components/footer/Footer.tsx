import styles from './Footer.module.scss';
import classNames from 'classnames';

const Footer = () => {
  return (
    <div className={classNames(styles.container)}>
      Whatch other projects here:{' '}
      <a target="_blank" href="https://github.com/ArchibaldKronin" rel="noopener noreferrer">
        Github
      </a>
    </div>
  );
};

export default Footer;
