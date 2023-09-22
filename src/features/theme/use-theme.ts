import { useEffect } from 'react';
import { setTheme, selectTheme, Themes } from './themeSlice';
import { useAppDispatch, useAppSelector } from 'redux-hooks';

function useTheme(): [Themes, () => void] {
	const { theme } = useAppSelector(selectTheme);
	const dispatch = useAppDispatch();

	const toggleTheme = () =>
		dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));

	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme]);

	return [theme, toggleTheme];
}

export default useTheme;
