import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllBooks } from '../../features/books/booksSlice';

import BookCard from '../BookCard/BookCard';
import Spinner from '../Spinner/Spinner';

export default function BookCardList() {
	const books = useSelector(selectAllBooks);
	const totalBooks = useSelector((state) => state.books.totalBooks);
	const status = useSelector((state) => state.books.status);
	const error = useSelector((state) => state.books.error);

	let content;

	if (error) {
		content = (
			<div>
				O ops, sorry something went wrong. Books not found, please try again
			</div>
		);
	}

	if (status === 'rejected') {
		content = <div>Oops, sorry something went wrong. Request rejected</div>;
	}

	if (status === 'pending') {
		content = <Spinner />;
	}

	return (
		content ?? (
			<div className='row'>
				{totalBooks ? (
					<span style={{ fontSize: '14px' }}>
						About {totalBooks} books found
					</span>
				) : (
					''
				)}
				{books.map((book) => {
					const { id, volumeInfo } = book;
					return <BookCard key={id} bookId={id} bookInfo={volumeInfo} />;
				})}
			</div>
		)
	);
}
