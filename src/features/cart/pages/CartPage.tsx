import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ErrorPage from '../../../components/error-page/ErrorPage';
import Loader from '../../../components/loader/Loader';
import { useDeleteCartElementMutation, useGetCartQuery, useLazyGetCartQuery } from '../api/cartApi';
import CartElementComponent, {
  CartElementComponentProps,
} from '../../../components/cartElementComponent/CartElementComponent';
import { useMemo, useState } from 'react';
import Button from '../../../components/button/Button';
import { useChangeProductStockMutation } from '../../products/api/productsApi';
import classNames from 'classnames';
import styles from './CartPage.module.scss';

const CartPage = () => {
  const {
    data: cart,
    error,
    isLoading,
  } = useGetCartQuery(undefined, { refetchOnMountOrArgChange: true, refetchOnFocus: true });

  const [triggerGetCart] = useLazyGetCartQuery();

  const [deleteElementInCart, { isLoading: isLoadingDeleteElementInCart }] =
    useDeleteCartElementMutation();

  const [changeProductStok, { isLoading: isChangeProductStockLoading }] =
    useChangeProductStockMutation();

  const [totalAccountObjectState, setTotalAccountObjectState] = useState<Record<string, number>>(
    {},
  );

  const [productStockState, setProductStockState] = useState<Record<string, number>>({});

  const billMemo = useMemo(() => {
    return Object.values(totalAccountObjectState).reduce((sum, val) => sum + val, 0);
  }, [totalAccountObjectState]);

  const handleClearCart = async () => {
    if (!cart) return;

    for (const elem of cart) {
      await deleteElementInCart(String(elem.id));
    }

    setProductStockState({});
    setTotalAccountObjectState({});
    triggerGetCart();
  };

  const handleBuyCart = async () => {
    if (!cart) return;

    for (const elem of cart) {
      await changeProductStok({
        id: String(elem.productId),
        countInCart: elem.quantity,
        stock: productStockState[elem.productId],
      });
      await deleteElementInCart(String(elem.id));
    }
    setProductStockState({});
    setTotalAccountObjectState({});
    triggerGetCart();
  };

  const calculateElementBill = (quantity: number, price: number, id: string) => {
    setTotalAccountObjectState((prev) => ({ ...prev, [id]: price * quantity }));
  };

  const deleteElementBill = (id: string) => {
    setTotalAccountObjectState((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const changeElementeHandle = () => {
    triggerGetCart();
  };

  const getProductStockState = (id: string, stock: number) => {
    setProductStockState((prev) => ({ ...prev, [id]: stock }));
  };

  const deleteElemFromProductStockState = (id: string) => {
    setProductStockState((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage er={error as FetchBaseQueryError} />;

  if (!cart) return <ErrorPage er={new Error('Не удалось получить данные о товаре')} />;

  const props: CartElementComponentProps[] = cart?.map((cartItem) => ({
    ...cartItem,
    onChangeCallback: changeElementeHandle,
    calculateBillCallback: calculateElementBill,
    deleteElementFromTotalAccountCallback: deleteElementBill,
    deleteProductStockCallback: deleteElemFromProductStockState,
    getProductStockCallback: getProductStockState,
  }));

  return (
    <div className={classNames(styles.container)}>
      <h3>Корзина</h3>
      <div className={classNames(styles.elementsContainer)}>
        {cart.length !== 0 ? (
          <ul>
            {props.map((elem) => (
              <li key={elem.id}>
                <CartElementComponent {...elem} />
              </li>
            ))}
          </ul>
        ) : (
          'Ваша корзина пуста'
        )}
      </div>
      <div className={classNames(styles.billContainer)}>
        Всего к оплате: <span>{billMemo}</span> у.е.
      </div>
      <div className={classNames(styles.manualsContainer)}>
        <div>
          <Button
            onClick={handleBuyCart}
            disabled={
              cart.length < 1 || isLoadingDeleteElementInCart || isChangeProductStockLoading
            }
          >
            Купить
          </Button>
        </div>
        <div className={classNames(styles.clearCartContainer)}>
          <Button
            onClick={handleClearCart}
            disabled={
              cart.length < 1 || isLoadingDeleteElementInCart || isChangeProductStockLoading
            }
          >
            Очистить корзину
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
