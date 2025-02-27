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
      <h1 className={classNames(styles.redBg)}>Online Store</h1>
      <Button onClick={productsClickHandler}>Каталог</Button>
      <Button onClick={cartClickHandler}>SVG_cart_icon</Button>
    </header>
  );
};

export default Header;
