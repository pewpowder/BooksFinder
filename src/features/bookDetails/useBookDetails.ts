import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import type { Book, BookId } from 'types';
import { clearBookDetails, fetchBook } from './bookDetailsSlice';
import { selectBookDetails } from './bookDetailsSelectors';

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
