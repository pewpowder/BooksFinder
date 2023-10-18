import { useAppSelector } from 'hooks/redux-hooks';
import BookCard from 'components/BookCard/BookCard';
import Spinner from 'components/Spinner/Spinner';
import {
  selectAllBooks,
  selectBooksStatus,
  selectTotalBooks,
} from 'features/books/booksSelectors';
import { useTypedOutletContext } from 'pages/HomePage/HomePage';
import { useEffect } from 'react';
import { throttle } from 'services/services';
import styles from './BookCardList.module.scss';

function BookCardList() {
  const books = useAppSelector(selectAllBooks);
  const totalBooks = useAppSelector(selectTotalBooks);
  const status = useAppSelector(selectBooksStatus);

  const { scrolledY, setScrolledY, requestBooks, startIndexRef } =
    useTypedOutletContext();

  useEffect(() => {
    const handleScroll = () => {
      const offsetHeight = document.body.offsetHeight;
      const screenHeight = window.innerHeight;

      const scrolledTop = window.scrollY + screenHeight;
      const threshold = offsetHeight - screenHeight / 3;

      if (status !== 'pending' && scrolledTop >= threshold) {
        startIndexRef.current += 12;
        setScrolledY(threshold - screenHeight);
        requestBooks();
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
  }, [status]);

  useEffect(() => {
    window.scrollTo(0, scrolledY);
  });

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
