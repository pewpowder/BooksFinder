import { useAppSelector } from 'hooks/redux-hooks';
import BookCard from 'components/BookCard/BookCard';
import Spinner from 'components/Spinner/Spinner';
import {
  selectAllBooks,
  selectBooksError,
  selectBooksStatus,
  selectTotalBooks,
} from 'features/books/booksSelectors';
import { useTypedOutletContext } from 'components/App/App';
import { useEffect } from 'react';
import { throttle } from 'services/services';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    window.scrollTo(0, scrolledY);
  });

  if (status === 'pending') {
    return <Spinner />;
  }

  if (status === 'rejected') {
    return (
      <div>
        <span>status - {error?.status || error?.name || 'unknown'}</span>
        <span>{error?.statusText || 'unknown'}</span>
      </div>
    );
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
