import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import themeReducer from '../features/theme/themeSlice';
import detailsReducer from '../features/bookDetails/bookDetailsSlice';

export const store = configureStore({
	reducer: {
		books: booksReducer,
		theme: themeReducer,
		bookDetails: detailsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
