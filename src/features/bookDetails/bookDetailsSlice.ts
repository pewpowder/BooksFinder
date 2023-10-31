import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUrlFetchSingleBook } from 'helpers/api';
import type { Book, BookId } from 'types';

type InitialState = {
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  error: Error | null;
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
  { rejectValue: Error }
>('/fetchBookDetails', async ({ bookId, signal }, { rejectWithValue }) => {
  const res = await fetch(getUrlFetchSingleBook(bookId), { signal });

  if (!res.ok) {
    return rejectWithValue({
      name: res.status.toString(),
      message: res.statusText,
    });
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

export const { resetBookDetails } = bookDetailsSlice.actions;

export default bookDetailsSlice.reducer;
