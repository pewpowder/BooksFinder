import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUrlFetchSingleBook } from 'helpers/api';
import type { APIResponseError, Book, BookId, StateError, StatusType } from 'types';
import { isError } from 'helpers/helpers';

type InitialState = {
  status: StatusType;
  error: StateError;
  book: Book | null;
};

const initialState: InitialState = {
  status: 'idle',
  error: null,
  book: null,
};

type AsyncThunkProps = {
  bookId: BookId;
  signal?: AbortSignal;
};

export const fetchBookDetails = createAsyncThunk<
  Book,
  AsyncThunkProps,
  { rejectValue: NonNullable<StateError> }
>('/fetchBookDetails', async ({ bookId, signal }, { rejectWithValue }) => {
  const res = await fetch(getUrlFetchSingleBook(bookId), { signal });

  if (!res.ok) {
    const { error }: { error: APIResponseError } = await res.json();

    return rejectWithValue(error);
  }

  const { id, etag, volumeInfo } = await res.json();

  return {
    id,
    etag,
    volumeInfo,
  };
});

const bookDetailsSlice = createSlice({
  name: 'bookDetails',
  initialState,
  reducers: {
    resetBookDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetails.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.book = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.status = 'rejected'
        const { payload, error } = action;
        const defaultError: Error = {
          name: 'Rejected',
          message: 'Something went wrong',
        };

        state.error = payload ? payload : isError(error) ? error : defaultError;
      });
  },
});

export const { resetBookDetails } = bookDetailsSlice.actions;

export default bookDetailsSlice.reducer;
