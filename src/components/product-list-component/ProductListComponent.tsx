import { FC, ReactNode, useEffect, useState } from 'react';
import { CartElement, Product } from '../../types';
import styles from './ProductListComponent.module.scss';
import classNames from 'classnames';
import Button from '../button/Button';
import { data, useNavigate } from 'react-router-dom';
import СhangeQuantityItem from '../changeQuantityItem/СhangeQuantityItem';
import {
  useChangeCartElementQuantityMutation,
  useCreateElementInCartMutation,
  useDeleteCartElementMutation,
  useGetCartElementByProductIdQuery,
  useLazyGetCartElementByProductIdQuery,
} from '../../features/cart/api/cartApi';
import useDebounceCallback from '../../hooks/useDebounceCallback';
import useCartElementMutationsApi from '../../hooks/useCartElementMutationsApi';

type ProductListComponentProps = Product & {
  children?: ReactNode;
};

const ProductListComponent: FC<ProductListComponentProps> = ({
  id,
  title,
  price,
  image,
  category,
  description,
  // stock,
}) => {
  // const { data: elementInCart, isLoading: isLoadingGetElementInCart } =
  //   useGetCartElementByProductIdQuery(String(id), {
  //     refetchOnMountOrArgChange: true,
  //     refetchOnFocus: true,
  //   });

  // const [triggerGetElementInCart] = useLazyGetCartElementByProductIdQuery();

  // const {
  //   createElementInCartMutation: [
  //     createElementInCart,
  //     { isLoading: isLoadingCreatingElementInCart },
  //   ],
  //   changeCartElementQuantityMutation: [
  //     changeQuantityInCart,
  //     { isLoading: isLoadingChangeQuantityInCart },
  //   ],
  //   deleteCartElementMutation: [deleteElementInCart, { isLoading: isLoadingDeleteElementInCart }],
  // } = useCartElementMutationsApi();

  // const quantityInCart: number = elementInCart ? elementInCart.quantity : 0;
  // const [quantityInCartState, setQuantityInCartState] = useState<number>(quantityInCart);

  // const [isOverStockState, setIsOverStockState] = useState(false);

  // useEffect(() => {
  //   if (quantityInCartState < stock) {
  //     setIsOverStockState(false);
  //   } else {
  //     setIsOverStockState(true);
  //   }
  // }, [quantityInCartState, setIsOverStockState]);

  // useEffect(() => {
  //   if (elementInCart) {
  //     setQuantityInCartState(elementInCart.quantity);
  //   } else {
  //     setQuantityInCartState(0);
  //   }
  // }, [elementInCart, setQuantityInCartState]);

  // async function AddToCart(id: string) {
  //   const result = await createElementInCart(id);
  //   if ('data' in result && result.data) {
  //     triggerGetElementInCart(id);
  //   }
  //   setQuantityInCartState(1);
  // }

  // const debounceChangeQuantityInCart = useDebounceCallback(
  //   async (args: { id: string; count: number }) => {
  //     const result = await changeQuantityInCart(args);

  //     if ('data' in result && result.data) {
  //       triggerGetElementInCart(String(result.data.productId));
  //     }
  //   },
  //   500,
  // );

  // const handlIncrQuantity = () => {
  //   if (elementInCart) {
  //     setQuantityInCartState((prev) => {
  //       const newQuantity = prev + 1;
  //       debounceChangeQuantityInCart({ id: String(elementInCart.id), count: newQuantity });
  //       return newQuantity;
  //     });
  //   }
  // };

  // const handlDecrQuantity = () => {
  //   if (elementInCart) {
  //     setQuantityInCartState((prev) => {
  //       const newQuantity = prev > 1 ? prev - 1 : 0;
  //       if (newQuantity < 1) {
  //         deleteElementInCart(String(elementInCart.id));
  //         return 0;
  //       } else {
  //         debounceChangeQuantityInCart({ id: String(elementInCart.id), count: newQuantity });
  //         return newQuantity;
  //       }
  //     });
  //   }
  // };

  const navigate = useNavigate();
  const [isSelecting, setIsSelecting] = useState(false);

  const handleMouseDown = () => {
    setIsSelecting(false);
  };
  const handleMouseMove = () => {
    setIsSelecting(true);
  };
  const handleMouseUp = () => {
    if (!isSelecting) {
      navigate(`/products/${id}`);
    }
  };

  return (
    <div className={classNames(styles.productComponentContainer)}>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={classNames(styles.productMainInfoContainer)}
      >
        <div className={classNames(styles.imgContainer)}>
          <img src={image} alt={`Image of the ${title}`} />
          {/* Маленький размер. Для мобильных экранов еще меньше */}
        </div>
        <div className={classNames(styles.mainInfoContainer)}>
          <h3>{title}</h3>
          <p className={classNames(styles.category)}>Категория: {category}</p>
          {/* выдели жирным */}
          <p className={classNames(styles.description)}>{description}</p>
          {/* описание пусть обрывается с многоточием */}
          <div className={classNames(styles.price)}>{price} у.е.</div>
          {/* выдели жирным */}
        </div>
        {/* <h3>{elementInCartState ? 'ЕСТЬ в корзине' : 'НЕТ в корзине'}</h3> */}
        {/* <h3>{quantityInCartState > 0 ? 'ЕСТЬ в корзине' : 'НЕТ в корзине'}</h3> */}
      </div>
      <div className="manualsContainer" onClick={(e) => e.stopPropagation()}>
        {/* {quantityInCartState > 0 ? (
          <СhangeQuantityItem
            onClickMinus={handlDecrQuantity}
            onClickPlus={handlIncrQuantity}
            isLoading={
              isLoadingChangeQuantityInCart ||
              isLoadingCreatingElementInCart ||
              isLoadingDeleteElementInCart
            }
            disablePlusBtn={isOverStockState}
            disableMinusBtn={quantityInCartState < 1}
          >
            {quantityInCartState}
          </СhangeQuantityItem>
        ) : (
          <Button onClick={() => AddToCart(String(id))} disabled={isLoadingCreatingElementInCart}>
            Добавить в корзину
          </Button>
        )} */}
      </div>
    </div>
  );
};

export default ProductListComponent;
