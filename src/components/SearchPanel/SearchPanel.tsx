import React from 'react';
import styles from './SearchPanel.module.scss';

interface SearchPanelProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleOnSearch: () => void;
}

function SearchPanel(props: SearchPanelProps) {
  const { query, setQuery, handleOnSearch } = props;

  const handleClick = () => {
    if (query.trim()) {
      handleOnSearch();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      handleOnSearch();
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
