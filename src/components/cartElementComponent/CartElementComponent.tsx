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
import useCartElementMutationsApi from '../../hooks/useCartElementMutationsApi';
import useDebounceCallback from '../../hooks/useDebounceCallback';

type CartElementComponentProps = CartElement & { onDelete: () => void };

const CartElementComponent: FC<{ children?: ReactNode } & CartElementComponentProps> = ({
  productId,
  quantity,
  id,
  onDelete,
}) => {
  const {
    data: product,
    error: errorGetProducts,
    isLoading: isLoadingProduct,
  } = useGetProductByIdQuery(String(productId));
  //ВСЕ ДЕЙСТВИЯ С КОРЗИНОЙ
  const {
    changeCartElementQuantityMutation: [
      changeQuantityInCart,
      { isLoading: isLoadingChangeQuantityInCart },
    ],
    deleteCartElementMutation: [deleteElementInCart, { isLoading: isLoadingDeleteElementInCart }],
  } = useCartElementMutationsApi();

  const [quantityState, setQuantityState] = useState(quantity);

  const [isOverStockState, setIsOverStockState] = useState(false);

  const handleDeleteElement = async () => {
    await deleteElementInCart(String(id));
    onDelete();
  };

  useEffect(() => {
    if (product) {
      if (quantityState < product.stock) {
        setIsOverStockState(false);
      } else {
        setIsOverStockState(true);
      }
    }
  }, [product, quantityState, setIsOverStockState]);

  const debounceChangeQuantityInCart = useDebounceCallback(
    async (args: { id: string; count: number }) => {
      const result = await changeQuantityInCart(args);

      if ('data' in result && result.data) {
        setQuantityState(args.count);
      }
    },
    500,
  );

  const handlIncrQuantity = () => {
    setQuantityState((prev) => {
      const newQuantity = prev + 1;
      debounceChangeQuantityInCart({ id: String(id), count: newQuantity });
      return newQuantity;
    });
  };

  const handlDecrQuantity = () => {
    setQuantityState((prev) => {
      const newQuantity = prev > 1 ? prev - 1 : 0;
      if (newQuantity < 1) {
        handleDeleteElement();
        return 0;
      } else {
        debounceChangeQuantityInCart({ id: String(id), count: newQuantity });
        return newQuantity;
      }
    });
  };

  const navigate = useNavigate();

  const handleToProductClick = () => {
    navigate(`/products/${productId}`);
  };

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
        <Button onClick={handleDeleteElement}>Удалить из корзины</Button>
      </div>
      <div>
        <Button onClick={handleToProductClick}>К товару</Button>
      </div>
    </div>
  );
};

export default CartElementComponent;
