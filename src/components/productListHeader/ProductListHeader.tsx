import { FC } from 'react';
import SearchBar, { SearchFormProps } from '../search-bar/SearchBar';
import SelectSortComponent, { SelectComponentProps } from '../selectComponent/SelectSortComponent';
import classNames from 'classnames';
import styles from './ProductListHeader.module.scss';

export interface ProductListHeaderProps extends SearchFormProps, SelectComponentProps {}

const ProductListHeader: FC<ProductListHeaderProps> = ({ onSearch, onChangeSelect }) => {
  return (
    <div className={classNames(styles.container)}>
      <SearchBar onSearch={onSearch} />
      <SelectSortComponent onChangeSelect={onChangeSelect} />
    </div>
  );
};

export default ProductListHeader;
