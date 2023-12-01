import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { selectBookDetails } from './bookDetailsSelectors';
import { resetBookDetails, fetchBookDetails } from './bookDetailsSlice';
import type { Book, BookId } from 'types';

function useBookDetails(bookId: BookId | undefined): Book | null {
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBookDetails);

  useEffect(() => {
    if (bookId) {
      // const controller = new AbortController();
      dispatch(fetchBookDetails({ bookId, signal: undefined }));

      return () => {
        dispatch(resetBookDetails());
        // controller.abort();
      };
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return book;
}

export default useBookDetails;
