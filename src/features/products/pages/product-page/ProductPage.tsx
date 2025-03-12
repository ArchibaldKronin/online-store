import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../api/productsApi';
import Loader from '../../../../components/loader/Loader';
import ErrorPage from '../../../../components/error-page/ErrorPage';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import classNames from 'classnames';
import styles from './ProductPage.module.scss';
import { useState } from 'react';
import СhangeQuantityItem from '../../../../components/changeQuantityItem/СhangeQuantityItem';
import Button from '../../../../components/button/Button';
import {
  useChangeCartElementQuantityMutation,
  useCreateElementInCartMutation,
} from '../../../cart/api/cartApi';

const ProductPage = () => {
  const { productId } = useParams();

  if (!productId) {
    throw new Error('"productId" отсутствует в URL');
  }

  const {
    data: product,
    error: errorGetProducts,
    isLoading: isLoadingProducts,
  } = useGetProductByIdQuery(productId);

  console.log(product);

  //КОРЗИНА
  const [quantityInCart, setQuantityInCart] = useState(0); //исправить естественно получая данные с сервера о товарах в корзине

  const [
    createElementInCart,
    {
      data: elementInCart,
      isLoading: isLoadingCreatingElementInCart,
      error: errorCreateElementInCart,
    },
  ] = useCreateElementInCartMutation();

  async function AddToCart(id: string) {
    createElementInCart(id);
    setQuantityInCart(1); // ИСПРАВИТЬ ЕСТЕСТВЕННО
  }

  const [
    changeQuantityInCart,
    {
      data: changedElementInCart,
      isLoading: isLoadingChangeQuantityInCart,
      error: errorChangeQuantityInCart,
    },
  ] = useChangeCartElementQuantityMutation();

  const handlIncrQuantity = () => {
    if (!elementInCart) return;
    // НЕЛЬЗЯ ДОБАВИТЬ БОЛЬШЕ СТОКА
    changeQuantityInCart({ id: String(elementInCart.id), count: quantityInCart + 1 });
    //исправить elementInCart.id. Нужно сразу понимать, есть ли товар в корзине. А не в зависимости от добавления
    setQuantityInCart((prev) => ++prev);
  };

  const handlDecrQuantity = () => {
    if (!elementInCart) return;
    // ПРИ СНИЖЕНИИ ДО НУЛЯ МЕНЯТЬ КНОПКИ
    changeQuantityInCart({ id: String(elementInCart.id), count: quantityInCart - 1 });
    //исправить elementInCart.id. Нужно сразу понимать, есть ли товар в корзине. А не в зависимости от добавления
    setQuantityInCart((prev) => --prev);
  };

  if (isLoadingProducts) return <Loader />;
  if (errorGetProducts) return <ErrorPage er={errorGetProducts as FetchBaseQueryError} />;
  if (errorCreateElementInCart)
    return <ErrorPage er={errorCreateElementInCart as FetchBaseQueryError} />;
  if (errorChangeQuantityInCart)
    return <ErrorPage er={errorChangeQuantityInCart as FetchBaseQueryError} />;
  if (!product) return <ErrorPage er={new Error('Не удалось получить данные о товаре')} />;
  return (
    <div className={classNames(styles.productComponentContainer)}>
      <div className={classNames(styles.imgContainer)}>
        <img src={product.image} alt={`Image of the ${product.title}`} />
      </div>
      <div className={classNames(styles.mainInfoContainer)}>
        <h3>{product.title}</h3>
        <p className={classNames(styles.category)}>Категория: {product.category}</p>
        {/* выдели жирным */}
        <p className={classNames(styles.description)}>{product.description}</p>
        {/* описание пусть обрывается с многоточием */}
        <div className={classNames(styles.price)}>{product.price} у.е.</div>
        {/* выдели жирным */}
        <div className="manualsContainer">
          {quantityInCart > 0 ? (
            <СhangeQuantityItem
              onClickMinus={handlDecrQuantity}
              onClickPlus={handlIncrQuantity}
              isLoading={isLoadingChangeQuantityInCart || isLoadingCreatingElementInCart}
            >
              {quantityInCart}
            </СhangeQuantityItem>
          ) : (
            <Button
              onClick={() => AddToCart(String(product.id))}
              isActive={!isLoadingCreatingElementInCart}
            >
              Добавить в корзину
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
