import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FETCH_SINGLE_BOOK } from 'services/api';
import { Book, BookId, ErrorType } from 'types';

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

export const fetchBook = createAsyncThunk<
	Book,
	BookId,
	{ rejectValue: ErrorType }
>('/fetchBookDetails', async (bookId: BookId, { rejectWithValue }) => {
	const res = await fetch(FETCH_SINGLE_BOOK(bookId));

	if (!res.ok) {
		return rejectWithValue({ status: res.status, statusText: res.statusText });
	}

	const { id, volumeInfo } = await res.json();

	return {
		id,
		volumeInfo,
	};
});

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
