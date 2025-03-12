import { FC, ReactNode, useState } from 'react';
import { Product } from '../../types';
import styles from './ProductListComponent.module.scss';
import classNames from 'classnames';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import СhangeQuantityItem from '../changeQuantityItem/СhangeQuantityItem';
import {
  useChangeCartElementQuantityMutation,
  useCreateElementInCartMutation,
} from '../../features/cart/api/cartApi';

type ProductListComponentProps = Product & {
  children?: ReactNode;
  isInTheCart: boolean;
  quantityInCart: number;
};

const ProductListComponent: FC<ProductListComponentProps> = ({
  id,
  title,
  price,
  image,
  category,
  description,
  stock,
  isInTheCart = false,
  quantityInCart = 0,
}) => {
  const [quantityInCartState, setQuantityInCartState] = useState(quantityInCart); //исправить естественно получая данные с сервера о товарах в корзине

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
    setQuantityInCartState(1); // ИСПРАВИТЬ ЕСТЕСТВЕННО
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
    changeQuantityInCart({ id: String(elementInCart.id), count: quantityInCartState + 1 });
    //исправить elementInCart.id. Нужно сразу понимать, есть ли товар в корзине. А не в зависимости от добавления
    setQuantityInCartState((prev) => ++prev);
  };

  const handlDecrQuantity = () => {
    if (!elementInCart) return;
    // ПРИ СНИЖЕНИИ ДО НУЛЯ МЕНЯТЬ КНОПКИ
    changeQuantityInCart({ id: String(elementInCart.id), count: quantityInCartState - 1 });
    //исправить elementInCart.id. Нужно сразу понимать, есть ли товар в корзине. А не в зависимости от добавления
    setQuantityInCartState((prev) => --prev);
  };

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
        <h3>{isInTheCart ? 'ЕСТЬ в корзине' : 'НЕТ в корзине'}</h3>
      </div>
      <div className="manualsContainer" onClick={(e) => e.stopPropagation()}>
        {quantityInCartState > 0 ? (
          <СhangeQuantityItem
            onClickMinus={handlDecrQuantity}
            onClickPlus={handlIncrQuantity}
            isLoading={isLoadingChangeQuantityInCart || isLoadingCreatingElementInCart}
          >
            {quantityInCartState}
          </СhangeQuantityItem>
        ) : (
          <Button onClick={() => AddToCart(String(id))} isActive={!isLoadingCreatingElementInCart}>
            Добавить в корзину
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductListComponent;
