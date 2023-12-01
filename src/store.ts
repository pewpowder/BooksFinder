import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import booksReducer from './features/books/booksSlice';
import themeReducer from './features/theme/themeSlice';
import detailsReducer from './features/bookDetails/bookDetailsSlice';

const rootReducer = combineReducers({
  books: booksReducer,
  theme: themeReducer,
  bookDetails: detailsReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore =  ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;;
export type PreloadedRootState = PreloadedState<RootState>;
export type AppDispatch = AppStore['dispatch'];
