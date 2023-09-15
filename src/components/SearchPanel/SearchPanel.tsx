import React, { useState } from 'react';
import { fetchBooks } from '../../features/books/booksSlice';
import { useAppDispatch } from 'redux-hooks';

import styles from './SearchPanel.module.scss';

function SearchPanel() {
	const [query, setQuery] = useState('clean code');

	const dispatch = useAppDispatch();

	const handleOnClick = () => {
		if (query.trim()) {
			dispatch(fetchBooks(query));
		}
	};

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && query.trim()) {
			dispatch(fetchBooks(query));
		}
	};

	return (
		<div className={styles.wrapper}>
			<input
				type='search'
				className={`${styles.search_input} form-control bg-transparent`}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Type title, author or publisher ...'
				onKeyDown={handleOnKeyDown}
			/>
			<button
				type='button'
				className={styles.search_button}
				onClick={handleOnClick}
			>
				search
			</button>
		</div>
	);
}

export default SearchPanel;
