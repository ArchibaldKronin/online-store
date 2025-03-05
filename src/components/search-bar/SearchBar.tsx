import classNames from 'classnames';
import styles from './SearchBar.module.scss';
import React, { memo, useState } from 'react';
import { getQParamsFromSession } from '../../functions/session-storage-functions/searchQueryParamsInStorage';
import useDebounceCallback from '../../hooks/useDebounceCallback';

export interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchBar = memo(({ onSearch }: SearchFormProps) => {
  const [query, setQuery] = useState(getQParamsFromSession());
  const debouncedOnSearch = useDebounceCallback(onSearch, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedOnSearch(newQuery);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedOnSearch(query);
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
