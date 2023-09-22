import { RootState } from 'store/store';

export const selectBookDetails = (state: RootState) => state.bookDetails.book;
export const selectBookDetailsError = (state: RootState) =>
	state.bookDetails.error;
export const selectBookDetailsStatus = (state: RootState) =>
	state.bookDetails.status;
