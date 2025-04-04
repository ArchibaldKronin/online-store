import { FC, ReactNode, useEffect, useState } from 'react';
import { useGetProductByIdQuery } from '../../features/products/api/productsApi';
import Button from '../button/Button';
import ErrorPage from '../error-page/ErrorPage';
import classNames from 'classnames';
import styles from './CartElementComponent.module.scss';
import ChangeQuantityItem from '../changeQuantityItem/ChangeQuantityItem';
import { CartElement } from '../../types';
import useCartElementMutationsApi from '../../hooks/useCartElementMutationsApi';
import useDebounceCallback from '../../hooks/useDebounceCallback';
import { Link } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type CartElementComponentProps = CartElement & {
  onChangeCallback: () => void;
  calculateBillCallback: (quantity: number, price: number, id: string) => void;
  deleteElementFromTotalAccountCallback: (id: string) => void;
  getProductStockCallback: (id: string, stock: number) => void;
  deleteProductStockCallback: (id: string) => void;
};

const CartElementComponent: FC<{ children?: ReactNode } & CartElementComponentProps> = ({
  productId,
  quantity,
  id,
  onChangeCallback,
  calculateBillCallback,
  deleteElementFromTotalAccountCallback,
  getProductStockCallback,
  deleteProductStockCallback,
}) => {
  const {
    data: product,
    error: errorGetProducts,
    isLoading: isLoadingProduct,
  } = useGetProductByIdQuery(String(productId));
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
      getProductStockCallback(String(productId), product.stock);
    }
  }, [product, productId]);

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
      deleteProductStockCallback(String(productId));
    }
  };

  if (isLoadingProduct) return <div>Loading...</div>;

  if (errorGetProducts) return <ErrorPage er={errorGetProducts as FetchBaseQueryError} />;

  if (!product) return <ErrorPage er={new Error('Не удалось получить данные о товаре')} />;
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.mainInfoContainer)}>
        <div className={classNames(styles.imgContainer)}>
          <img src={product.image} alt={`Image of the ${product.title}`} />
        </div>
        <div className={classNames(styles.textInfoContainer)}>
          <h3 className={classNames(styles.title)}>{product.title}</h3>
          <p className={classNames(styles.category)}>Категория: {product.category}</p>
          <p className={classNames(styles.description)}>{product.description}</p>
          <p className={classNames(styles.price)}>{product.price} у.е.</p>
        </div>
      </div>
      <div className={classNames(styles.manualsContainer)}>
        <ChangeQuantityItem
          isLoading={isLoadingChangeQuantityInCart || isLoadingDeleteElementInCart}
          onClickMinus={handlDecrQuantity}
          onClickPlus={handlIncrQuantity}
          disableMinusBtn={quantityState < 2}
          disablePlusBtn={isOverStockState}
        >
          {quantityState}
        </ChangeQuantityItem>
        <div className={classNames(styles.buttonDeleteFromCartContainer)}>
          <Button
            aria-label="Удалить"
            onClick={handleDeleteElement}
            disabled={isLoadingChangeQuantityInCart}
          >
            Удалить
          </Button>
        </div>
        <div className={classNames(styles.buttonGoroProductContainer)}>
          <Link to={`/products/${productId}`}>
            <Button onClick={() => {}}>К товару</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartElementComponent;
