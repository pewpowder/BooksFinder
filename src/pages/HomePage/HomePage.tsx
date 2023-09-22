import { Link, Outlet } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel/SearchPanel';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';

import styles from './HomePage.module.scss';

function HomePage() {
	return (
		<div className={styles['container']}>
			<header className={styles['header']}>
				<Link to='/' className={styles['home-link']}>
					JUTSU
				</Link>
				<ThemeToggle />
			</header>
			<SearchPanel />
			<Outlet />
		</div>
	);
}

export default HomePage;
