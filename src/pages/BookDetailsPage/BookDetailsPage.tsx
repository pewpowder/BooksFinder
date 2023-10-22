import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
import useBookDetails from 'features/bookDetails/useBookDetails';
import {
  selectBookDetailsError,
  selectBookDetailsStatus,
} from 'features/bookDetails/bookDetailsSelectors';
import BookDetails from 'components/BookDetails/BookDetails';
import Spinner from 'components/Spinner/Spinner';

function BookDetailsPage() {
  const { bookId } = useParams();
  const book = useBookDetails(bookId);
  const status = useAppSelector(selectBookDetailsStatus);
  const error = useAppSelector(selectBookDetailsError);

  if (error) {
    return <div>{error}</div>;
  }

  if (status === 'pending') {
    return <Spinner />;
  } else if (status === 'rejected') {
    return <div>Book with this id was not found. Please try again.</div>;
  }

  if (!book) {
    return <div>Book with this id was not found. Please try again.</div>;
  }

  return <BookDetails volumeInfo={book.volumeInfo} />;
}

export default BookDetailsPage;
