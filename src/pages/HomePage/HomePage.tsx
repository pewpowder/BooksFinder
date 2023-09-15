import { Link, Outlet } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel/SearchPanel';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';

import styles from './HomePage.module.scss';

function HomePage() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Link to='/' className={styles.home_link}>
					Jutsu
				</Link>
				<ThemeToggle />
			</div>
			<SearchPanel />
			<Outlet />
		</div>
	);
}

export default HomePage;
