import { useState } from 'react';

export interface SelectComponentProps {}

const SelectComponent = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  return (
    <div>
      <label htmlFor="sort">Сортировать по цене:</label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
      >
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
      ;
    </div>
  );
};

export default SelectComponent;
