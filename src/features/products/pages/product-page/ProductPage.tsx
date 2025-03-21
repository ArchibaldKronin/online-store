import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../api/productsApi';
import Loader from '../../../../components/loader/Loader';
import ErrorPage from '../../../../components/error-page/ErrorPage';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import classNames from 'classnames';
import styles from './ProductPage.module.scss';
import { useEffect, useState } from 'react';
import СhangeQuantityItem from '../../../../components/changeQuantityItem/СhangeQuantityItem';
import Button from '../../../../components/button/Button';
import {
  useGetCartElementByProductIdQuery,
  useLazyGetCartElementByProductIdQuery,
} from '../../../cart/api/cartApi';
import useCartElementMutationsApi from '../../../../hooks/useCartElementMutationsApi';
import useDebounceCallback from '../../../../hooks/useDebounceCallback';

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

  const { data: elementInCart, isLoading: isLoadingGetElementInCart } =
    useGetCartElementByProductIdQuery(String(product?.id), {
      skip: !product?.id,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });

  const [triggerGetElementInCart] = useLazyGetCartElementByProductIdQuery();

  const {
    createElementInCartMutation: [
      createElementInCart,
      { isLoading: isLoadingCreatingElementInCart, error: errorCreateElementInCart },
    ],
    changeCartElementQuantityMutation: [
      changeQuantityInCart,
      { isLoading: isLoadingChangeQuantityInCart, error: errorChangeQuantityInCart },
    ],
    deleteCartElementMutation: [
      deleteElementInCart,
      { isLoading: isLoadingDeleteElementInCart, error: errorDeleteCartElementMutation },
    ],
  } = useCartElementMutationsApi();

  const quantityInCart: number = elementInCart ? elementInCart.quantity : 0;
  const [quantityInCartState, setQuantityInCartState] = useState<number>(quantityInCart);

  const [isOverStockState, setIsOverStockState] = useState(false);

  useEffect(() => {
    if (product) {
      if (quantityInCartState < product.stock) {
        setIsOverStockState(false);
      } else {
        setIsOverStockState(true);
      }
    }
  }, [product, quantityInCartState, setIsOverStockState]);

  useEffect(() => {
    if (elementInCart) {
      setQuantityInCartState(elementInCart.quantity);
    } else {
      setQuantityInCartState(0);
    }
  }, [elementInCart, setQuantityInCartState]);

  const debouncedChangeQuantityInCart = useDebounceCallback(
    async (args: { id: string; count: number }) => {
      const result = await changeQuantityInCart(args);

      if ('data' in result && result.data) {
        triggerGetElementInCart(String(result.data.productId));
      }
    },
    500,
  );

  async function handleAddToCart() {
    const result = await createElementInCart(String(product?.id));
    if ('data' in result && result.data) {
      triggerGetElementInCart(String(result.data.productId));
    }
    setQuantityInCartState(1);
  }

  async function handleDeleteElement() {
    // debouncedDeleteElementInCart();
    const result = await deleteElementInCart(String(elementInCart?.id));
    if ('data' in result && result.data) {
      triggerGetElementInCart(String(result.data.productId));
    }
    setQuantityInCartState(0);
  }

  const handlIncrQuantity = () => {
    setQuantityInCartState((prev) => {
      const newQuantity = prev + 1;
      debouncedChangeQuantityInCart({ id: String(elementInCart?.id), count: newQuantity });
      return newQuantity;
    });
  };

  const handlDecrQuantity = () => {
    setQuantityInCartState((prev) => {
      const newQuantity = prev > 1 ? prev - 1 : 0;
      debouncedChangeQuantityInCart({ id: String(elementInCart?.id), count: newQuantity });
      return newQuantity;
    });
  };

  if (isLoadingProducts) return <Loader />;
  if (errorGetProducts) return <ErrorPage er={errorGetProducts as FetchBaseQueryError} />;
  if (errorCreateElementInCart)
    return <ErrorPage er={errorCreateElementInCart as FetchBaseQueryError} />;
  if (errorChangeQuantityInCart)
    return <ErrorPage er={errorChangeQuantityInCart as FetchBaseQueryError} />;
  if (errorDeleteCartElementMutation)
    return <ErrorPage er={errorDeleteCartElementMutation as FetchBaseQueryError} />;
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
          {quantityInCartState > 0 ? (
            <>
              <СhangeQuantityItem
                onClickMinus={handlDecrQuantity}
                onClickPlus={handlIncrQuantity}
                isLoading={
                  isLoadingChangeQuantityInCart ||
                  isLoadingCreatingElementInCart ||
                  isLoadingDeleteElementInCart
                }
                disablePlusBtn={isOverStockState}
                disableMinusBtn={quantityInCartState < 2}
              >
                {quantityInCartState}
              </СhangeQuantityItem>
              <Button onClick={handleDeleteElement} disabled={isLoadingDeleteElementInCart}>
                Удалить из корзины
              </Button>
            </>
          ) : (
            <Button onClick={handleAddToCart} disabled={isLoadingCreatingElementInCart}>
              Добавить в корзину
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
