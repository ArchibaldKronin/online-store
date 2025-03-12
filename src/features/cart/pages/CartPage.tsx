import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ErrorPage from '../../../components/error-page/ErrorPage';
import Loader from '../../../components/loader/Loader';
import { useGetCartQuery } from '../api/cartApi';
import CartElementComponent from '../../../components/cartElementComponent/CartElementComponent';

const CartPage = () => {
  const {
    data: cart,
    error,
    isLoading,
  } = useGetCartQuery(undefined, { refetchOnMountOrArgChange: true });

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage er={error as FetchBaseQueryError} />;
  if (!cart) return <ErrorPage er={new Error('Не удалось получить данные о товаре')} />;
  return (
    <div>
      <h3>Корзина</h3>
      <div>
        <ul>
          {/* Засылай в элемент корзины колбэк, чтобы знать, если предмет из корзины будет удален */}
          {/*  И удалять его из списка*/}
          {/*  */}
          {cart
            ? cart.map((cartItem) => (
                <li key={cartItem.id}>
                  {/* <p>ID товара в каталоге: {cartItem.productId}</p>
                  <p>Количество в корзине: {cartItem.quantity}</p>
                  ////////////////////////////////////////////////// */}
                  <CartElementComponent {...cartItem} />
                </li>
              ))
            : 'Корзина пуста'}
        </ul>
      </div>
    </div>
  );
};

export default CartPage;
