import { useAppSelector } from 'redux-hooks';
import BookCard from 'components/BookCard/BookCard';
import Spinner from 'components/Spinner/Spinner';
import {
	selectAllBooks,
	selectBooksError,
	selectBooksStatus,
	selectTotalBooks,
} from 'features/books/books-selectors';
import { useScroll } from 'pages/HomePage/HomePage';
import { useEffect } from 'react';
import styles from './BookCardList.module.scss';

function BookCardList() {
	const books = useAppSelector(selectAllBooks);
	const totalBooks = useAppSelector(selectTotalBooks);
	const status = useAppSelector(selectBooksStatus);
	const error = useAppSelector(selectBooksError);
	const { scrolledY } = useScroll();

	useEffect(() => {
		window.scrollTo(0, scrolledY);
	});

	if (error) {
		return <div>{'Render error component if i can get here'}</div>;
	}

	if (status === 'pending') {
		return <Spinner />;
	}

	if (totalBooks === 0 && status === 'succeeded') {
		return <div>Oops, looks like no books were found</div>;
	}

	console.log('BookCardList', scrolledY);

	return (
		totalBooks !== 0 && (
			<section>
				<span className={styles['books-count']}>
					About {totalBooks} books found
				</span>
				<div className={styles['card-list']}>
					{books.map((book) => (
						<BookCard key={book.etag} {...book} />
					))}
				</div>
			</section>
		)
	);
}

export default BookCardList;
