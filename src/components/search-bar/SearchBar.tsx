import classNames from 'classnames';
import styles from './SearchBar.module.scss';
import React, { memo, useState } from 'react';
import useDebounceCallback from '../../hooks/useDebounceCallback';
import { getStringFromSession } from '../../functions/session-storage-functions/queryStorageFunctions';

export interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchBar = memo(({ onSearch }: SearchFormProps) => {
  // const [query, setQuery] = useState(getQParamsFromSession());
  const [query, setQuery] = useState(getStringFromSession('q'));
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
