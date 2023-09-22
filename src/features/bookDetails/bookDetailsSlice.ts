import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBook } from 'services/booksServices';
import { Book, BookId } from 'types';

type InitialState = {
	status: 'idle' | 'pending' | 'succeeded' | 'rejected';
	error: string | null;
	book: Book | null;
};

const initialState: InitialState = {
	status: 'idle',
	error: null,
	book: null,
};

export const fetchBook = createAsyncThunk<Book, BookId>(
	'/fetchBookDetails',
	async (bookId: BookId) => {
		const res = await getBook(bookId);
		const { id, volumeInfo } = res;

		return {
			id,
			volumeInfo,
		};
	}
);

const bookDetailsSlice = createSlice({
	name: 'details',
	initialState,
	reducers: {
		clearBookDetails: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBook.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchBook.fulfilled, (state, action) => {
				state.book = action.payload;
				state.status = 'succeeded';
			})
			.addCase(fetchBook.rejected, (state) => {
				state.status = 'rejected';
				state.error = 'Book not found';
			});
	},
});

export const { clearBookDetails } = bookDetailsSlice.actions;

export default bookDetailsSlice.reducer;
