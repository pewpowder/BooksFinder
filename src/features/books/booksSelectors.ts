import { RootState } from 'store';

export const selectAllBooks = (state: RootState) => state.books.books;
export const selectTotalBooks = (state: RootState) => state.books.totalBooks;
export const selectBooksStatus = (state: RootState) => state.books.status;
export const selectBooksError = (state: RootState) => state.books.error;
export const selectIsBooksOver = (state: RootState) => state.books.isBooksOver;
