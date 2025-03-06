import { FC, useState } from 'react';
import { getStringFromSession } from '../../functions/session-storage-functions/queryStorageFunctions';

export interface SelectComponentProps {
  onChangeSelect: (q: SortSelectStates) => void;
}

export type SortSelectStates = 'asc' | 'desc' | '';

const SelectSortComponent: FC<SelectComponentProps> = ({ onChangeSelect }) => {
  const [sortOrder, setSortOrder] = useState<SortSelectStates>(
    getStringFromSession('sort') as SortSelectStates,
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
