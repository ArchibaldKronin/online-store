import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ErrorPage from '../../../components/error-page/ErrorPage';
import Loader from '../../../components/loader/Loader';
import { useGetCartQuery, useLazyGetCartQuery } from '../api/cartApi';
import CartElementComponent from '../../../components/cartElementComponent/CartElementComponent';
import { useEffect, useMemo, useState } from 'react';

const CartPage = () => {
  const {
    data: cart,
    error,
    isLoading,
  } = useGetCartQuery(undefined, { refetchOnMountOrArgChange: true, refetchOnFocus: true });

  const [triggerGetCart] = useLazyGetCartQuery();

  const [totalAccountObjectState, setTotalAccountObjectState] = useState<Record<string, number>>(
    {},
  );

  const billMemo = useMemo(() => {
    return Object.values(totalAccountObjectState).reduce((sum, val) => sum + val, 0);
  }, [totalAccountObjectState]);

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

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage er={error as FetchBaseQueryError} />;
  if (!cart) return <ErrorPage er={new Error('Не удалось получить данные о товаре')} />;
  return (
    <div>
      <h3>Корзина</h3>
      <div>
        <ul>
          {cart
            ? cart.map((cartItem) => (
                <li key={cartItem.id}>
                  <CartElementComponent
                    {...cartItem}
                    onChangeCallback={changeElementeHandle}
                    calculateBillCallback={calculateElementBill}
                    deleteElementFromTotalAccountCallback={deleteElementBill}
                  />
                </li>
              ))
            : 'Корзина пуста'}
        </ul>
      </div>
      <div>Всего к оплате: {billMemo} у.е.</div>
    </div>
  );
};

export default CartPage;
