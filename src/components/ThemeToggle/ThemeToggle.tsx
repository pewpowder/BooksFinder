import useTheme from 'features/theme/useTheme';
import styles from './ThemeToggle.module.scss';

function ThemeToggle() {
  const [theme, toggleTheme] = useTheme();

  return (
    <label className={styles['toggler']}>
      <input
        type="checkbox"
        checked={theme === 'light' ? false : true}
        onChange={() => toggleTheme()}
      />
      <span className={styles['slider']}></span>
    </label>
  );
}

export default ThemeToggle;
