import { FC } from 'react';
import SearchBar, { SearchFormProps } from '../search-bar/SearchBar';
import SelectComponent, { SelectComponentProps } from '../selectComponent/SelectComponent';

export interface ProductListHeaderProps extends SearchFormProps, SelectComponentProps {}

const ProductListHeader: FC<ProductListHeaderProps> = ({ onSearch }) => {
  return (
    <>
      <SearchBar onSearch={onSearch} />
      <SelectComponent />
    </>
  );
};

export default ProductListHeader;
