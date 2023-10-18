import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { FETCH_BOOKS } from 'services/api';
import type { Book, BookResponse, ErrorType, FetchBooksParams } from 'types';

type InitialState = {
  books: Book[];
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  error: ErrorType | null;
  totalBooks: number;
};

const initialState: InitialState = {
  books: [],
  status: 'idle',
  error: null,
  totalBooks: 0,
};

type AsyncThunkProps = {
  signal?: AbortSignal;
} & FetchBooksParams;

export const fetchBooks = createAsyncThunk<
  BookResponse,
  AsyncThunkProps,
  { rejectValue: ErrorType }
>('books/fetchBooks', async (props, { rejectWithValue }) => {
  const { query, startIndex, signal } = props;
  const formattedQuery = query.trim().split(' ').join('+');
  const res = await fetch(FETCH_BOOKS({ query: formattedQuery, startIndex }), {
    signal,
  });

  if (!res.ok) {
    return rejectWithValue({
      status: res.status,
      statusText: res.statusText,
    });
  }

  const { items, totalItems } = await res.json();

  return {
    items,
    totalItems,
  };
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    resetBooks(state) {
      state.books = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { items, totalItems } = action.payload;

        // The server may not return a value
        if (items) {
          state.books = [...state.books, ...items];
        } else {
          state.books = [];
        }

        state.totalBooks = totalItems;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = {
            status: 404,
            statusText: 'Something went wrong',
          };
        }
      });
  },
});

export const { resetBooks } = booksSlice.actions;

export default booksSlice.reducer;
