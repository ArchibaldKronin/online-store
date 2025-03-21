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

type CartElementComponentProps = CartElement & {
  onChangeCallback: () => void;
  calculateBillCallback: (quantity: number, price: number, id: string) => void;
  deleteElementFromTotalAccountCallback: (id: string) => void;
};

const CartElementComponent: FC<{ children?: ReactNode } & CartElementComponentProps> = ({
  productId,
  quantity,
  id,
  onChangeCallback,
  calculateBillCallback,
  deleteElementFromTotalAccountCallback,
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

  useEffect(() => {
    if (product) {
      calculateBillCallback(quantity, product.price, String(id));
    }
  }, [product, quantity, id]);

  useEffect(() => {
    if (product) {
      if (quantityState < product.stock) {
        setIsOverStockState(false);
      } else {
        setIsOverStockState(true);
      }
    }
  }, [product, quantityState, setIsOverStockState]);

  const debouncedChangeQuantityInCart = useDebounceCallback(
    async (args: { id: string; count: number }) => {
      const result = await changeQuantityInCart(args);

      if ('data' in result && result.data) {
        onChangeCallback();
      }
    },
    500,
  );

  const handlIncrQuantity = () => {
    setQuantityState((prev) => {
      const newQuantity = prev + 1;
      debouncedChangeQuantityInCart({ id: String(id), count: newQuantity });
      return newQuantity;
    });
  };

  const handlDecrQuantity = () => {
    setQuantityState((prev) => {
      const newQuantity = prev > 1 ? prev - 1 : 0;
      debouncedChangeQuantityInCart({ id: String(id), count: newQuantity });
      return newQuantity;
    });
  };

  const handleDeleteElement = async () => {
    const result = await deleteElementInCart(String(id));

    if ('data' in result && result.data) {
      onChangeCallback();
      deleteElementFromTotalAccountCallback(String(id));
    }
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
          isLoading={isLoadingChangeQuantityInCart || isLoadingDeleteElementInCart}
          onClickMinus={handlDecrQuantity}
          onClickPlus={handlIncrQuantity}
          disableMinusBtn={quantityState < 2}
          disablePlusBtn={isOverStockState}
        >
          {quantityState}
        </СhangeQuantityItem>
        <Button onClick={handleDeleteElement} disabled={isLoadingChangeQuantityInCart}>
          Удалить из корзины
        </Button>
      </div>
      <div>
        <Button onClick={handleToProductClick}>К товару</Button>
      </div>
    </div>
  );
};

export default CartElementComponent;
