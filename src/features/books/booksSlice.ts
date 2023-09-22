import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';

import { getBooks } from '../../services/booksServices';
import { Book, BookResponse } from 'types';
import { RootState } from 'store/store';

const booksAdapter = createEntityAdapter<Book>();

type InitialState = {
	status: 'idle' | 'pending' | 'succeeded' | 'rejected';
	error: string | null;
	totalBooks: number;
};

const initialState = booksAdapter.getInitialState<InitialState>({
	status: 'idle',
	error: null,
	totalBooks: 0,
});

export const fetchBooks = createAsyncThunk<Omit<BookResponse, 'kind'>, string>(
	'books/fetchBooks',
	async (query) => {
		const correctValue = query.trim().split(' ').join('+');

		const res = await getBooks(correctValue);
		const { items, totalItems } = res;

		return {
			items,
			totalItems,
		};
	}
);

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooks.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// The server may not be able to return the books
				booksAdapter.setAll(state, action.payload.items ?? {});
				state.totalBooks = action.payload.totalItems;
			})
			.addCase(fetchBooks.rejected, (state) => {
				state.status = 'rejected';
			});
	},
});

export const { selectAll: selectAllBooks, selectById: selectBookById } =
	booksAdapter.getSelectors((state: RootState) => state.books);

export default booksSlice.reducer;
