import { useParams } from 'react-router-dom';
import { useAppSelector } from 'redux-hooks';
import useBookDetails from 'features/bookDetails/use-bookDetails';
import { selectBookDetailsStatus } from 'features/bookDetails/bookDetails-selectors';

import BookDetails from 'components/BookDetails/BookDetails';
import Spinner from 'components/Spinner/Spinner';

function BookDetailsPage() {
	const { bookId } = useParams();
	const status = useAppSelector(selectBookDetailsStatus);
	const book = useBookDetails(bookId);

	if (!book || !book.id) {
		return <div>Book with this id was not found. Please try again.</div>;
	}

	let content: JSX.Element | null = null;

	if (status === 'pending') {
		content = <Spinner />;
	} else if (status === 'rejected') {
		content = <div>Book with this id was not found. Please try again.</div>;
	} else {
		content = <BookDetails volumeInfo={book.volumeInfo} />;
	}

	return content;
}

export default BookDetailsPage;
