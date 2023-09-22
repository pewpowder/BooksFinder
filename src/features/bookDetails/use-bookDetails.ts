import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux-hooks';
import { Book, BookId } from 'types';
import { clearBookDetails, fetchBook } from './bookDetailsSlice';
import { selectBookDetails } from './bookDetails-selectors';

function useBookDetails(id: BookId | undefined): Book | null {
	const dispatch = useAppDispatch();
	const book = useAppSelector(selectBookDetails);

	useEffect(() => {
		if (id) {
			dispatch(fetchBook(id));
		}

		return () => {
			dispatch(clearBookDetails());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return book;
}

export default useBookDetails;
