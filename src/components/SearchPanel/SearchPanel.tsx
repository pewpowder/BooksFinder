import React, { useState } from 'react';
import { fetchBooks } from '../../features/books/booksSlice';
import { useAppDispatch } from 'redux-hooks';

import style from './SearchPanel.module.css';

const { input__search } = style;

export default function SearchPanel() {
	const [query, setQuery] = useState('');

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
		<div className='row mb-4'>
			<div className='input-group'>
				<input
					type='search'
					className={`${input__search} form-control bg-transparent`}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder='Type title, author or publisher ...'
					onKeyDown={handleOnKeyDown}
				/>
				<button
					type='button'
					className='btn btn-primary'
					onClick={handleOnClick}
				>
					search
				</button>
			</div>
		</div>
	);
}
