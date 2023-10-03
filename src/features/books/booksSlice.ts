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

export const fetchBooks = createAsyncThunk<
	Omit<BookResponse, 'kind'>,
	{ query: string; startIndex?: number }
>('books/fetchBooks', async ({ query, startIndex }) => {
	const correctValue = query.trim().split(' ').join('+');
	const res = await getBooks(correctValue, startIndex);
	console.log(res);

	const { items, totalItems } = res;

	return {
		items,
		totalItems,
	};
});

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		// newBooksRequest()
	},
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
				// booksAdapter.sor
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
