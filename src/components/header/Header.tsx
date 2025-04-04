import Button from '../button/Button';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.nameContainer)}>
          <h1>Peach Online Store</h1>
        </div>
        <div className={classNames(styles.buttonsContainer)}>
          <Link to={'/products'}>
            <Button onClick={() => {}}>Каталог</Button>
          </Link>
          <Link to={'/cart'}>
            <Button onClick={() => {}}>Корзина</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
