import { FC, useState } from 'react';
import { getSortParamsFromSession } from '../../functions/session-storage-functions/sortingPriceQueryParamsInStorage';

export interface SelectComponentProps {
  onChangeSelect: (q: SortSelectStates) => void;
}

export type SortSelectStates = 'asc' | 'desc' | '';

const SelectSortComponent: FC<SelectComponentProps> = ({ onChangeSelect }) => {
  const [sortOrder, setSortOrder] = useState<SortSelectStates>(
    getSortParamsFromSession() as SortSelectStates,
  );

  const handleSortSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuery = e.target.value as SortSelectStates;
    setSortOrder(newQuery);
    onChangeSelect(newQuery);
  };

  return (
    <div>
      <label htmlFor="sort">Сортировать по цене:</label>
      <select id="sort" value={sortOrder} onChange={handleSortSelectChange}>
        <option value="">Без сортировки</option>
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
      ;
    </div>
  );
};

export default SelectSortComponent;
