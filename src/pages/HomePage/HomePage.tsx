import { Link, Outlet, useOutletContext } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel/SearchPanel';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import { throttle } from 'services/services';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'redux-hooks';
import { fetchBooks, resetBooks } from 'features/books/booksSlice';
import styles from './HomePage.module.scss';

type OutletContextType = {
	top: number;
	left?: number;
};

function HomePage() {
	const dispatch = useAppDispatch();
	const [query, setQuery] = useState('Clean code');
	const startIndexRef = useRef(0);
	const scrolledRef = useRef(0);
	const isRequestSending = useRef(false);

	const requestBooks = () => {
		dispatch(fetchBooks({ query, startIndex: startIndexRef.current }));
	};
	const resetPreviousBooks = () => {
		startIndexRef.current = 0;
		scrolledRef.current = 0;
		resetBooks();
	};

	useEffect(() => {
		const handleScroll = () => {
			const offsetHeight = document.body.offsetHeight;
			const screenHeight = window.innerHeight;

			const scrolledY = window.scrollY + screenHeight;
			const threshold = offsetHeight - screenHeight / 3;

			if (!isRequestSending.current && scrolledY >= threshold) {
				isRequestSending.current = true;
				startIndexRef.current += 12;
				requestBooks();
			} else if (isRequestSending.current && scrolledY < threshold) {
				isRequestSending.current = false;
			}
		};

		const throttledHandleScroll = throttle<typeof handleScroll>(
			handleScroll,
			500
		);

		window.addEventListener('scroll', throttledHandleScroll);

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/* Rules for pagination: 
			1. I don't want already existing card to be updated;
			2. Make the request not at the very end, but in advance.
			3. Request shouldn't be dispatched when we already made one request.
	*/

	return (
		<div className={styles['container']}>
			<header className={styles['header']}>
				<Link to='/' className={styles['home-link']}>
					JUTSU
				</Link>
				<ThemeToggle />
			</header>
			<main>
				<SearchPanel
					requestBooks={requestBooks}
					query={query}
					setQuery={setQuery}
					resetPreviousBooks={resetPreviousBooks}
				/>
				<Outlet context={{ top: scrolledRef.current }} />
			</main>
		</div>
	);
}

export const useScrolled = () => useOutletContext<OutletContextType>();

export default HomePage;
