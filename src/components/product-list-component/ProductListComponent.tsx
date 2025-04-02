import {
  FC,
  ReactNode,
  // useState
} from 'react';
import { Product } from '../../types';
import styles from './ProductListComponent.module.scss';
import classNames from 'classnames';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
}) => {
  // const navigate = useNavigate();
  // const [isSelecting, setIsSelecting] = useState(false);

  // const handleMouseDown = () => {
  //   setIsSelecting(false);
  // };
  // const handleMouseMove = () => {
  //   setIsSelecting(true);
  // };
  // const handleMouseUp = () => {
  //   if (!isSelecting) {
  //     navigate(`/products/${id}`);
  //   }
  // };

  return (
    <Link to={`/products/${id}`} className={classNames(styles.container)}>
      {/* <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={classNames(styles.productComponentContainer)}
        > */}
      <div className={classNames(styles.imgContainer)}>
        <img src={image} alt={`Image of the ${title}`} />
      </div>
      <div className={classNames(styles.mainInfoContainer)}>
        <h3 className={classNames(styles.title)}>{title}</h3>
        <p className={classNames(styles.category)}>Категория: {category}</p>
        <p className={classNames(styles.description)}>{description}</p>
        <p className={classNames(styles.price)}>Цена: {price} у.е.</p>
      </div>
      {/* </div> */}
    </Link>
  );
};

export default ProductListComponent;
