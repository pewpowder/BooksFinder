import { useEffect } from 'react';
import { useAppSelector } from 'hooks/redux-hooks';
import BookCard from 'components/BookCard/BookCard';
import Spinner from 'components/Spinner/Spinner';
import ErrorFallback from 'components/ErrorFallback/ErrorFallback';
import {
  selectAllBooks,
  selectBooksError,
  selectBooksStatus,
  selectTotalBooks,
} from 'features/books/booksSelectors';
import { useTypedOutletContext } from 'components/App/App';
import { throttle } from 'helpers/helpers';
import styles from './BookCardList.module.scss';

function BookCardList() {
  const books = useAppSelector(selectAllBooks);
  const totalBooks = useAppSelector(selectTotalBooks);
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);
  const { scrolledY, handleScroll } = useTypedOutletContext();

  useEffect(() => {
    const throttledHandleScroll = throttle(() => handleScroll(status), 500);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };

  }, [status, handleScroll]);

  useEffect(() => {
    window.scrollTo(0, scrolledY);
  });

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return <Spinner />;
  }

  if (status === 'rejected') {
    return <ErrorFallback error={error} />;
  }

  if (books.length === 0) {
    return <div>Oops, looks like no books were found</div>;
  }

  return (
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
  );
}

export default BookCardList;
