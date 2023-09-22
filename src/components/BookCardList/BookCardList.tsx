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

	let content: JSX.Element | undefined;

	if (error) {
		content = (
			<div>
				O ops, sorry something went wrong. Books not found, please try again
			</div>
		);
	}

	if (status === 'pending') {
		content = <Spinner />;
	} else if (status === 'rejected') {
		content = <div>Oops, sorry something went wrong. Request rejected</div>;
	}

	return (
		content ?? (
			<article className={styles['container']}>
				{status === 'succeeded' && (
					<span className={styles['books-count']}>
						About {totalBooks} books found
					</span>
				)}
				<div className={styles['card-list']}>
					{books.map((book) => (
						<BookCard key={book.id} {...book} />
					))}
				</div>
			</article>
		)
	);
}

export default BookCardList;
