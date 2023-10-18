import React from 'react';
import useSearchParamsAndNavigate from 'hooks/useSearchParamsAndNavigate';
import type { FetchBooksParams } from 'types';

import styles from './SearchPanel.module.scss';

interface SearchPanelProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  requestBooks: () => void;
  resetPreviousBooks: () => void;
}

function SearchPanel(props: SearchPanelProps) {
  const { requestBooks, query, setQuery, resetPreviousBooks } = props;

  const [_, updateSearchParamsAndNavigate] =
    useSearchParamsAndNavigate('/books');

  const handleRequest = (query: string) => {
    resetPreviousBooks();
    updateSearchParamsAndNavigate({ query, startIndex: 0 });
    requestBooks();
  };

  const handleClick = () => {
    if (query.trim()) {
      handleRequest(query);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      handleRequest(query);
    }
  };

  return (
    <section className={styles['wrapper']}>
      <input
        type="search"
        className={`${styles['search-input']}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type title, author or publisher ..."
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className={styles['search-button']}
        onClick={handleClick}
      >
        <span>search</span>
      </button>
    </section>
  );
}

export default SearchPanel;
