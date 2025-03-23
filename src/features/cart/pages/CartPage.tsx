import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ErrorPage from '../../../components/error-page/ErrorPage';
import Loader from '../../../components/loader/Loader';
import { useDeleteCartElementMutation, useGetCartQuery, useLazyGetCartQuery } from '../api/cartApi';
import CartElementComponent, {
  CartElementComponentProps,
} from '../../../components/cartElementComponent/CartElementComponent';
import { useEffect, useMemo, useState } from 'react';
import Button from '../../../components/button/Button';
import { useChangeProductStockMutation } from '../../products/api/productsApi';

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
      // Для каждого элемента корзины делать запрос в каталог и менять остаток
      await changeProductStok({
        id: String(elem.productId),
        countInCart: elem.quantity,
        stock: productStockState[elem.productId],
      });
      // В принципе для каждого элемента можно делать 2 запроса подряд: изменить, удалить
      await deleteElementInCart(String(elem.id));
    }
    // const [productStockState, setProductStockState] = useState<Record<string, number>>({});
    // Очищать стейт (может и сам очистится, но лучше лично)
    setProductStockState({});
    setTotalAccountObjectState({});
    // Перезагружать корзину
    triggerGetCart();
  };

  if (!cart) return <ErrorPage er={new Error('Не удалось получить данные о товаре')} />;

  const props: CartElementComponentProps[] = cart?.map((cartItem) => ({
    ...cartItem,
    onChangeCallback: changeElementeHandle,
    calculateBillCallback: calculateElementBill,
    deleteElementFromTotalAccountCallback: deleteElementBill,
    deleteProductStockCallback: deleteElemFromProductStockState,
    getProductStockCallback: getProductStockState,
  }));

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage er={error as FetchBaseQueryError} />;
  return (
    <div>
      <h3>Корзина</h3>
      <div>
        {/* {cart.length === 0 ? 'В корзине пусто' : 'ss'} */}
        <ul>
          {cart.length !== 0
            ? props.map((elem) => (
                <li key={elem.id}>
                  <CartElementComponent {...elem} />
                </li>
              ))
            : 'Корзина пуста'}
        </ul>
      </div>
      <div>Всего к оплате: {billMemo} у.е.</div>
      <div>
        <Button
          onClick={handleBuyCart}
          disabled={cart.length < 1 || isLoadingDeleteElementInCart || isChangeProductStockLoading}
        >
          Купить
        </Button>
      </div>
      <div>
        <Button
          onClick={handleClearCart}
          disabled={cart.length < 1 || isLoadingDeleteElementInCart || isChangeProductStockLoading}
        >
          Очистить корзину
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
