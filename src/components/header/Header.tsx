import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import styles from './Header.module.scss';
import classNames from 'classnames';

const Header = () => {
  const navigate = useNavigate();
  const productsClickHandler = () => navigate('products');
  const cartClickHandler = () => navigate('cart');

  return (
    <header>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.nameContainer)}>
          <div>{'ICON '}</div>
          <h1>Peach Online Store</h1>
        </div>
        <div className={classNames(styles.buttonsContainer)}>
          <Button onClick={productsClickHandler}>Каталог</Button>
          <Button onClick={cartClickHandler}>Корзина</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
