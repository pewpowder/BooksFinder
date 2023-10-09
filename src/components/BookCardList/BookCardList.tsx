import { useAppSelector } from 'redux-hooks';
import BookCard from 'components/BookCard/BookCard';
import Spinner from 'components/Spinner/Spinner';
import {
	selectAllBooks,
	selectBooksError,
	selectBooksStatus,
	selectTotalBooks,
} from 'features/books/books-selectors';
import { useAppOutletContext } from 'pages/HomePage/HomePage';
import { useEffect, useRef } from 'react';
import { throttle } from 'services/services';
import styles from './BookCardList.module.scss';

function BookCardList() {
	const books = useAppSelector(selectAllBooks);
	const totalBooks = useAppSelector(selectTotalBooks);
	const status = useAppSelector(selectBooksStatus);
	const error = useAppSelector(selectBooksError);

	const isRequestSending = useRef(false);
	const { scrolledY, setScrolledY, startIndexRef, requestBooks } =
		useAppOutletContext();

	useEffect(() => {
		const handleScroll = () => {
			const offsetHeight = document.body.offsetHeight;
			const screenHeight = window.innerHeight;

			const scrolledTop = window.scrollY + screenHeight;
			const threshold = offsetHeight - screenHeight / 3;

			console.log('OffsetHeight', offsetHeight);

			if (!isRequestSending.current && scrolledTop >= threshold) {
				isRequestSending.current = true;
				startIndexRef.current += 12;

				setScrolledY(threshold - screenHeight);
				requestBooks();
			} else if (isRequestSending.current && scrolledTop < threshold) {
				isRequestSending.current = false;
			}
		};

		const throttledHandleScroll = throttle<typeof handleScroll>(
			handleScroll,
			500
		);

		window.addEventListener('scroll', throttledHandleScroll);

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
