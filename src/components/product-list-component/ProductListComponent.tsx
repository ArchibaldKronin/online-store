import { FC, ReactNode, useState } from 'react';
import { Product } from '../../types';
import styles from './ProductListComponent.module.scss';
import classNames from 'classnames';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

type ProductListComponentProps = Product & { children?: ReactNode };

const ProductListComponent: FC<ProductListComponentProps> = ({
  id,
  title,
  price,
  image,
  category,
  description,
  stock,
}) => {
  const [quantityInCart, setQuantityInCart] = useState(0); //исправить естественно получая данные с сервера о товарах в корзине

  const handlIncrQuantity = () => {
    setQuantityInCart((prev) => ++prev);
  };

  const handlDecrQuantity = () => {
    setQuantityInCart((prev) => --prev);
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
      </div>
      <div className="manualsContainer" onClick={(e) => e.stopPropagation()}>
        {quantityInCart > 0 ? (
          <СhangeQuantityItem onClickMinus={handlDecrQuantity} onClickPlus={handlIncrQuantity}>
            {0}
          </СhangeQuantityItem>
        ) : (
          <Button onClick={() => {}}>Добавить в корзину</Button>
        )}
      </div>
    </div>
  );
};

export default ProductListComponent;

const СhangeQuantityItem: FC<{
  children: number;
  onClickPlus: () => void;
  onClickMinus: () => void;
}> = ({ children, onClickPlus, onClickMinus }) => {
  return (
    <>
      <Button onClick={onClickMinus}>-</Button>
      {children}
      <Button onClick={onClickPlus}>+</Button>
    </>
  );
};

// .cover-img {
//   width: 300px;
//   height: 200px;
//   object-fit: cover; // Обрежет изображение, чтобы заполнить контейнер
//   border-radius: 5px;
// }
// 🔹 object-fit: contain; – вписывает изображение внутрь контейнера, сохраняя пропорции.
// 🔹 object-fit: cover; – обрезает части изображения, чтобы заполнить контейнер.
// 🔹 object-fit: fill; – растягивает изображение, может исказить пропорции.
