import { selectAllBooks } from '../../features/books/booksSlice';
import { useAppSelector } from 'redux-hooks';

import BookCard from '../BookCard/BookCard';
import Spinner from '../Spinner/Spinner';

export default function BookCardList() {
	const books = useAppSelector(selectAllBooks);
	const totalBooks = useAppSelector((state) => state.books.totalBooks);
	const status = useAppSelector((state) => state.books.status);
	const error = useAppSelector((state) => state.books.error);

	let content: JSX.Element | undefined;

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
				{status === 'succeeded' ? (
					<span style={{ fontSize: '14px' }}>
						About {totalBooks} books found
					</span>
				) : (
					''
				)}
				{books.map((book) => (
					<BookCard key={book.id} {...book} />
				))}
			</div>
		)
	);
}
