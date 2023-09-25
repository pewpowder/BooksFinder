import { selectAllBooks } from '../../features/books/booksSlice';
import { useAppSelector } from 'redux-hooks';

import BookCard from '../BookCard/BookCard';
import Spinner from '../Spinner/Spinner';

import styles from './BookCardList.module.scss';
import {
	selectBooksError,
	selectBooksStatus,
	selectTotalBooks,
} from 'features/books/books-selectors';

function BookCardList() {
	const books = useAppSelector(selectAllBooks);
	const totalBooks = useAppSelector(selectTotalBooks);
	const status = useAppSelector(selectBooksStatus);
	const error = useAppSelector(selectBooksError);

	if (error) {
		return <div>{error}</div>;
	}

	if (status === 'pending') {
		return <Spinner />;
	} else if (status === 'rejected') {
		return <div>Oops, sorry something went wrong. Request rejected</div>;
	}

	return (
		<div className={styles['container']}>
			{status === 'succeeded' && (
				<span className={styles['books-count']}>
					About {totalBooks} books found
				</span>
			)}
			<section className={styles['card-list']}>
				{books.map((book) => (
					<BookCard key={book.id} {...book} />
				))}
			</section>
		</div>
	);
}

export default BookCardList;
