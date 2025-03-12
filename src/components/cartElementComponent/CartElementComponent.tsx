import { FC, ReactNode, useEffect, useState } from 'react';
import { useGetProductByIdQuery } from '../../features/products/api/productsApi';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../error-page/ErrorPage';
import classNames from 'classnames';
import styles from './CartElementComponent.module.scss';
import СhangeQuantityItem from '../changeQuantityItem/СhangeQuantityItem';
import { useChangeCartElementQuantityMutation } from '../../features/cart/api/cartApi';
import { CartElement } from '../../types';

const CartElementComponent: FC<{ children?: ReactNode } & CartElement> = ({
  productId,
  quantity,
  id,
}) => {
  const {
    data: product,
    error: errorGetProducts,
    isLoading: isLoadingProduct,
  } = useGetProductByIdQuery(String(productId));

  const [
    changeQuantityInCart,
    {
      data: changedElementInCart,
      isLoading: isLoadingChangeQuantityInCart,
      error: errorChangeQuantityInCart,
    },
  ] = useChangeCartElementQuantityMutation();

  const [quantityState, setQuantityState] = useState(quantity);

  const handlIncrQuantity = () => {
    // НЕЛЬЗЯ ДОБАВИТЬ БОЛЬШЕ СТОКА
    changeQuantityInCart({ id: String(id), count: quantityState + 1 });
    setQuantityState((prev) => ++prev);
  };

  const handlDecrQuantity = () => {
    // ПРИ СНИЖЕНИИ ДО НУЛЯ МЕНЯТЬ КНОПКИ
    changeQuantityInCart({ id: String(id), count: quantityState - 1 });
    setQuantityState((prev) => --prev);
  };

  const navigate = useNavigate();

  const handleToProductClick = () => {
    navigate(`/products/${productId}`);
  };

  // Проверять что количество в корзине не 0. Если 0, то вызывать переданный колбэк из родителя и удалять с сервера,
  // вызывать перезагрузку корзины
  useEffect(() => {}, []);

  if (isLoadingProduct) return <div>Loading...</div>;
  if (!product) return <ErrorPage er={new Error('Не удалось получить данные о товаре')} />;
  return (
    <div>
      <div className={classNames(styles.imgContainer)}>
        <img src={product.image} alt={`Image of the ${product.title}`} />
      </div>
      <div className={classNames(styles.mainInfoContainer)}>
        <h3>{product.title}</h3>
        <p className={classNames(styles.description)}>{product.description}</p>
        <div className={classNames(styles.price)}>{product.price} у.е.</div>
      </div>
      <div>
        <СhangeQuantityItem
          isLoading={isLoadingChangeQuantityInCart}
          onClickMinus={handlDecrQuantity}
          onClickPlus={handlIncrQuantity}
        >
          {quantityState}
        </СhangeQuantityItem>
      </div>
      <div>
        <Button onClick={handleToProductClick}>К товару</Button>
      </div>
    </div>
  );
};

export default CartElementComponent;
