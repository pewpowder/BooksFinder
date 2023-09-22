import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../../features/books/booksSlice';
import { useAppDispatch } from 'redux-hooks';

import styles from './SearchPanel.module.scss';

function SearchPanel() {
	const [query, setQuery] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleOnClick = () => {
		if (query.trim()) {
			dispatch(fetchBooks(query));
			navigate('/');
		}
	};

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && query.trim()) {
			dispatch(fetchBooks(query));
			navigate('/');
		}
	};

	return (
		<div className={styles['wrapper']}>
			<input
				type='search'
				className={`${styles['search-input']}`}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Type title, author or publisher ...'
				onKeyDown={handleOnKeyDown}
			/>
			<button
				type='button'
				className={styles['search-button']}
				onClick={handleOnClick}
			>
				<span>search</span>
			</button>
		</div>
	);
}

export default SearchPanel;
