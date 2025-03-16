import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ErrorPage from '../../../components/error-page/ErrorPage';
import Loader from '../../../components/loader/Loader';
import { useGetCartQuery, useLazyGetCartQuery } from '../api/cartApi';
import CartElementComponent from '../../../components/cartElementComponent/CartElementComponent';

const CartPage = () => {
  const {
    data: cart,
    error,
    isLoading,
  } = useGetCartQuery(undefined, { refetchOnMountOrArgChange: true, refetchOnFocus: true });

  const [triggerGetCart] = useLazyGetCartQuery();

  const deleteElementeHandle = () => {
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
                  <CartElementComponent {...cartItem} onDelete={deleteElementeHandle} />
                </li>
              ))
            : 'Корзина пуста'}
        </ul>
      </div>
    </div>
  );
};

export default CartPage;
