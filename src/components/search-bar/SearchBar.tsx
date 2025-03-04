import classNames from 'classnames';
import styles from './SearchBar.module.scss';
import React, { memo, useState } from 'react';
import { getQFromSession } from '../../functions/session-storage-functions/searchQueryStorage';

export interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchBar = memo(({ onSearch }: SearchFormProps) => {
  const [query, setQuery] = useState(getQFromSession());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className={classNames(styles.blueBg)}>
      <form role="search" onSubmit={handleSubmit}>
        <input
          type="search"
          name="q"
          placeholder="Поиск..."
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
});

export default SearchBar;
