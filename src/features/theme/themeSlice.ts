import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

export type Themes = 'dark' | 'light';

type InitialState = {
	theme: Themes;
};

const initialState: InitialState = {
	theme: (localStorage.getItem('theme') as Themes) || 'light',
};

const theme = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<Themes>) {
			state.theme = action.payload;
		},
	},
});

export const { setTheme } = theme.actions;

export const selectTheme = (state: RootState) => state.theme;

export default theme.reducer;
