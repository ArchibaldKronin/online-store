import { FC } from 'react';
import SearchBar, { SearchFormProps } from '../search-bar/SearchBar';
import SelectSortComponent, { SelectComponentProps } from '../selectComponent/SelectSortComponent';

export interface ProductListHeaderProps extends SearchFormProps, SelectComponentProps {}

const ProductListHeader: FC<ProductListHeaderProps> = ({ onSearch, onChangeSelect }) => {
  return (
    <>
      <SearchBar onSearch={onSearch} />
      <SelectSortComponent onChangeSelect={onChangeSelect} />
    </>
  );
};

export default ProductListHeader;
