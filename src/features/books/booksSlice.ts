import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type RootState } from 'store';
import type {
  Book,
  BookResponse,
  FetchBooksParams,
  StateError,
  StatusType,
} from 'types';
import { generatePromises, isAPIResponseError, isError } from 'helpers/helpers';

type InitialState = {
  books: Book[];
  status: StatusType;
  error: StateError;
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

const handleBooksRequest = async (
  props: AsyncThunkProps,
  booksState: InitialState
) => {
  const { query, startIndex, booksCount, signal } = props;
  const formattedQuery = query.trim().split(' ').join('+');
  const books = booksState.books;

  const items: Book[] = [];
  let totalItems = 0;
  const reasons: NonNullable<StateError>[] = [];

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
      const { error, ...json } = await response.value.json();

      if (isAPIResponseError(error)) {
        reasons.push(error);
        continue;
      }

      if (json.items) {
        items.push(...json.items);
        totalItems = json.totalItems;
      }
    } else {
      if (isError(response.reason)) {
        reasons.push(response.reason);
      } else {
        const error: Error = await response.reason.json();
        reasons.push(error);
      }
    }
  }

  return {
    items,
   totalItems,
    reasons,
    isAllRequestsRejected: reasons.length === allSettledResult.length,
  };
};

export const fetchBooks = createAsyncThunk<
  BookResponse,
  AsyncThunkProps,
  {
    rejectValue: NonNullable<StateError>;
    state: RootState;
  }
>('books/fetchBooks', async (props, { rejectWithValue, getState }) => {
  const booksState = getState().books;

  const { items, totalItems, reasons, isAllRequestsRejected } =
    await handleBooksRequest(props, booksState);

  if (isAllRequestsRejected) {
    let message = '';
    reasons.forEach((reason, i) => {
      message += `Request ${i} rejected with message: ${reason.message} \n`;
    });

    reasons.forEach((reason) => console.error(reason));

    return rejectWithValue({
      name: 'Requests rejected',
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
        const { error, payload } = action;
        const defaultError: Error = {
          name: 'Rejected',
          message: 'Something went wrong',
        };

        state.error = payload ? payload : isError(error) ? error : defaultError;
      });
  },
});

export const { resetBooks } = booksSlice.actions;

export default booksSlice.reducer;
