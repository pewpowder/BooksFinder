import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit';
import { getBooks } from '../../services/BooksServices';

export const StatusEnum = {
	idle: 'idle',
	pending: 'pending',
	succeeded: 'succeeded',
	rejected: 'rejected',
};

const booksAdapter = createEntityAdapter();

const initialState = booksAdapter.getInitialState({
	status: StatusEnum.idle,
	error: null,
});

export const fetchBooks = createAsyncThunk('books/fetchBooks',
	async (inputValue) => {
		const correctValue = inputValue.trim().replaceAll(' ', '+');
		const res = await getBooks(correctValue);
		console.log(res);
		return res.items;
	});

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooks.pending, (state) => {
				state.status = StatusEnum.pending;
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.status = StatusEnum.succeeded;
				booksAdapter.setAll(state, action.payload)
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.status = StatusEnum.rejected;
			});
	}
});

export const {
	selectAll: selectAllBooks,
	selectById: selectBookById,
	selectIds: selectBooksIds,
} = booksAdapter.getSelectors((state) => state.books);


export default booksSlice.reducer;