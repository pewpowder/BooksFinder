import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
import BookDescription from './BookDescription/BookDescription';
import BookDetailsCard from './BookDetailsCard/BookDetailsCard';
import Spinner from 'components/Spinner/Spinner';
import ErrorFallback from 'components/ErrorFallback/ErrorFallback';
import {
  selectBookDetailsError,
  selectBookDetailsStatus,
} from 'features/bookDetails/bookDetailsSelectors';
import useBookDetails from 'features/bookDetails/useBookDetails';
import styles from './BookDetails.module.scss';

function BookDetails() {
  const { bookId } = useParams();
  const book = useBookDetails(bookId);
  const status = useAppSelector(selectBookDetailsStatus);
  const error = useAppSelector(selectBookDetailsError);

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return <Spinner />;
  }

  if (status === 'rejected' || !book) {
    console.log('status REJECTED');

    return <ErrorFallback error={error} />;
  }

  const { volumeInfo } = book;
  const { description, previewLink } = volumeInfo;
  return (
    <section className={styles['container']}>
      <BookDetailsCard volumeInfo={volumeInfo} />
      <BookDescription description={description} previewLink={previewLink} />
    </section>
  );
}

export default BookDetails;
