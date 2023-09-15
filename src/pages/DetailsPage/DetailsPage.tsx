import BookDetails from 'components/BookDetails/BookDetails';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'redux-hooks';
import { selectBookById } from 'features/books/booksSlice';

function DetailsPage() {
	const { bookId } = useParams();

	if (!bookId) {
		throw new Error('Book not found');
	}

	const book = useAppSelector((state) => selectBookById(state, bookId));

	if (!book) {
		throw new Error('Book not found');
	}

	return <BookDetails volumeInfo={book.volumeInfo} />;
}

export default DetailsPage;
