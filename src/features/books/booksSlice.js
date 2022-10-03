import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit';

import { getBooks } from '../../services/booksServices';
import { StatusEnum } from '../../services/statusEnum';

const booksAdapter = createEntityAdapter();

const initialState = booksAdapter.getInitialState({
	status: StatusEnum.idle,
	error: null,
	totalBooks: 0,
});

export const fetchBooks = createAsyncThunk('books/fetchBooks',
	async ({query}) => {
		const correctValue = query.trim().split(' ').join('+');
		const res = await getBooks(correctValue);
		const {items, totalItems} = res;
		return {
			items,
			totalItems
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
				state.status = StatusEnum.pending;
				state.error = null;
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				try {
					state.status = StatusEnum.succeeded;
					booksAdapter.setAll(state, action.payload.items);
					state.totalBooks = action.payload.totalItems;
				} catch (err) {
					state.error = err;
				}
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.status = StatusEnum.rejected;
			});
	}
});

export const {
	selectAll: selectAllBooks,
	selectById: selectBookById,
} = booksAdapter.getSelectors((state) => state.books);


export default booksSlice.reducer;