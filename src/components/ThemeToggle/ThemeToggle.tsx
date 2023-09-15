import styles from './ThemeToggle.module.scss';
import useTheme from 'features/theme/use-theme';

function ThemeToggle() {
	const [theme, toggleTheme] = useTheme();

	return (
		<label className={styles.toggler} htmlFor='themeToggle'>
			<input
				type='checkbox'
				id='themeToggle'
				checked={theme === 'light' ? false : true}
				onChange={(e) => toggleTheme()}
			/>
			<span className={styles.slider}></span>
		</label>
	);
}

export default ThemeToggle;
