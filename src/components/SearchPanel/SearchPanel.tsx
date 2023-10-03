import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SearchPanel.module.scss';

interface SearchPanelProps {
	requestBooks: (query: string, startIndex?: number) => void;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	resetPreviousBooks: () => void;
}

function SearchPanel(props: SearchPanelProps) {
	const { requestBooks, query, setQuery, resetPreviousBooks } = props;
	const navigate = useNavigate();

	const handleClick = () => {
		if (query.trim()) {
			requestBooks(query);
			resetPreviousBooks();
			navigate('/books');
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && query.trim()) {
			requestBooks(query);
			resetPreviousBooks();
			navigate('/books');
		}
	};

	return (
		<section className={styles['wrapper']}>
			<input
				type='search'
				className={`${styles['search-input']}`}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Type title, author or publisher ...'
				onKeyDown={handleKeyDown}
			/>
			<button
				type='button'
				className={styles['search-button']}
				onClick={handleClick}
			>
				<span>search</span>
			</button>
		</section>
	);
}

export default SearchPanel;
