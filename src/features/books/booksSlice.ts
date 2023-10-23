import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Book, BookResponse, ErrorType, FetchBooksParams } from 'types';
import type { RootState } from 'store';
import { generatePromises } from 'services/services';

export type StatusType = 'idle' | 'pending' | 'succeeded' | 'rejected';

type InitialState = {
  books: Book[];
  status: StatusType;
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
  {
    rejectValue: ErrorType;
    state: RootState;
  }
>('books/fetchBooks', async (props, { rejectWithValue, getState }) => {
  const { query, startIndex, booksCount, signal } = props;
  const formattedQuery = query.trim().split(' ').join('+');
  const books = getState().books.books;

  const items: Book[] = [];
  let totalItems = 0;
  const reasons: string[] = [];

  console.log('books.length', books.length);

  const allSettledResult = await Promise.allSettled(
    generatePromises({
      query: formattedQuery,
      booksCount: booksCount - books.length,
      startIndex,
      signal,
    })
  );

  for (let i = 0; i < allSettledResult.length; i++) {
    const response = allSettledResult[i];

    if (response.status === 'fulfilled') {
      const json = await response.value.json();
      items.push(...json.items);
      totalItems = json.totalItems;
    } else {
      reasons.push(`Promise ${i} rejected due to - ${response.reason}`);
    }
  }

  if (reasons.length === allSettledResult.length) {
    let statusText = '';
    reasons.forEach((reason) => {
      statusText += `${reason} \n`;
    });

    return rejectWithValue({
      name: 'Request rejected',
      statusText,
    });
  }

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
