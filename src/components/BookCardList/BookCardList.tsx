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
import { useEffect, useState } from 'react';
import { useScrolled } from 'pages/HomePage/HomePage';

function BookCardList() {
	// const { top } = useScrolled();
	const books = useAppSelector(selectAllBooks);
	const totalBooks = useAppSelector(selectTotalBooks);
	const status = useAppSelector(selectBooksStatus);
	const error = useAppSelector(selectBooksError);
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		// console.log('Use effect', top);
		// window.scrollTo({ top });
		console.log('UseEffect');
	}, [books]);

	if (error) {
		return <div>{'Render error component if i can get here'}</div>;
	}

	if (status === 'pending') {
		return <Spinner />;
	}

	if (totalBooks === 0 && status === 'succeeded') {
		return <div>Oops, looks like no books were found</div>;
	}

	console.log('Book card list rendered', books);
	// console.log('Book card list rendered', currentBooks);
	console.log('COUNTER', counter);

	return (
		totalBooks !== 0 && (
			<section>
				<span className={styles['books-count']}>
					About {totalBooks} books found
				</span>
				<div className={styles['card-list']}>
					{books.map((book, i) => (
						// Sometimes server sends books with the same id.
						<BookCard key={book.id + i} {...book} setCounter={setCounter} />
					))}
				</div>
			</section>
		)
	);
}

export default BookCardList;
