import { useAppSelector } from 'redux-hooks';
import BookCard from 'components/BookCard/BookCard';
import Spinner from 'components/Spinner/Spinner';
import {
	selectAllBooks,
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
		return <div>{'Render error component if i can get here'}</div>;
	}

	if (status === 'pending') {
		return <Spinner />;
	}

	if (totalBooks === 0 && status === 'succeeded') {
		return <div>Oops, looks like no books were found</div>;
	}

	console.log(books);

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
