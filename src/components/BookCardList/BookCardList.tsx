import { selectAllBooks } from '../../features/books/booksSlice';
import { useAppSelector } from 'redux-hooks';
import BookCard from '../BookCard/BookCard';
import Spinner from '../Spinner/Spinner';
import {
	selectBooksError,
	selectBooksStatus,
	selectTotalBooks,
} from 'features/books/books-selectors';
import styles from './BookCardList.module.scss';

function BookCardList() {
	const books = useAppSelector(selectAllBooks);
	const totalBooks = useAppSelector(selectTotalBooks);
	const status = useAppSelector(selectBooksStatus);
	const error = useAppSelector(selectBooksError);

	console.log('Book card list rendered');

	if (error) {
		return <div>{error}</div>;
	}

	if (status === 'pending') {
		return <Spinner />;
	} else if (status === 'rejected') {
		return <div>Oops, sorry something went wrong. Request rejected</div>;
	}

	return (
		totalBooks !== 0 && (
			<section>
				<span className={styles['books-count']}>
					About {totalBooks} books found
				</span>
				<div className={styles['card-list']}>
					{books.map((book) => (
						<BookCard key={book.id} {...book} />
					))}
				</div>
			</section>
		)
	);
}

export default BookCardList;
