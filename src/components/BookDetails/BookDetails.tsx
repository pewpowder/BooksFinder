import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
import BookDescription from './BookDescription/BookDescription';
import BookDetailsCard from './BookDetailsCard/BookDetailsCard';
import Spinner from 'components/Spinner/Spinner';
import { selectBookDetailsStatus } from 'features/bookDetails/bookDetailsSelectors';
import useBookDetails from 'features/bookDetails/useBookDetails';
import styles from './BookDetails.module.scss';

// interface BookDetailsProps extends Pick<Book, 'volumeInfo'> {}

function BookDetails() {
  const { bookId } = useParams();
  const book = useBookDetails(bookId);
  const status = useAppSelector(selectBookDetailsStatus);

  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'rejected') {
    return <div>Book with this id was not found. Please try again.</div>;
  }

  if (!book) {
    return <div>Book with this id was not found. Please try again.</div>;
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
