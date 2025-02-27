import { FC, ReactNode } from 'react';

type ProductListComponentProps = {
  children?: ReactNode;
  title: string;
  price: number;
  image: string;
  category: string;
};

const ProductListComponent: FC<ProductListComponentProps> = (props: ProductListComponentProps) => {
  return <>ProductComp</>;
};

export default ProductListComponent;
