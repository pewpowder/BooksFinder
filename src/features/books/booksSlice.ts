import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import type { Book, BookResponse, FetchBooksParams } from 'types';
import { generatePromises } from 'helpers/services';

export type StatusType = 'idle' | 'pending' | 'succeeded' | 'rejected';

type InitialState = {
  books: Book[];
  status: StatusType;
  error: Error | null;
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
    rejectValue: Error;
    state: RootState;
  }
>('books/fetchBooks', async (props, { rejectWithValue, getState }) => {
  const { query, startIndex, booksCount, signal } = props;
  const formattedQuery = query.trim().split(' ').join('+');
  const books = getState().books.books;

  const items: Book[] = [];
  let totalItems = 0;
  const reasons: string[] = [];

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
      if (json.items) {
        items.push(...json.items);
        totalItems = json.totalItems;
      }
    } else {
      reasons.push(`Promise ${i} rejected due to - ${response.reason}`);
    }
  }

  if (reasons.length === allSettledResult.length) {
    let message = '';
    reasons.forEach((reason) => {
      message += `${reason} \n`;
    });

    return rejectWithValue({
      name: 'Request rejected',
      message,
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
    resetBooks: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        const { items, totalItems } = action.payload;

        return {
          ...state,
          status: 'succeeded',
          books: [...state.books, ...items],
          totalBooks: totalItems,
        };
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = {
            name: 'Rejected',
            message: 'Something went wrong',
          };
        }
      });
  },
});

export const { resetBooks } = booksSlice.actions;

export default booksSlice.reducer;
