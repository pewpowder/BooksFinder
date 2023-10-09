import { Link, Outlet, useOutletContext } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel/SearchPanel';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import { throttle } from 'services/services';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'redux-hooks';
import { fetchBooks, resetBooks } from 'features/books/booksSlice';
import styles from './HomePage.module.scss';

type ContextType = {
	scrolledY: number;
};

function HomePage() {
	const dispatch = useAppDispatch();
	const [query, setQuery] = useState('Clean code'); // May be change to ref?
	const [scrolledY, setScrolledY] = useState(0);
	const startIndexRef = useRef(0);
	const isRequestSending = useRef(false);

	const requestBooks = () => {
		dispatch(fetchBooks({ query, startIndex: startIndexRef.current }));
	};

	const resetPreviousBooks = () => {
		startIndexRef.current = 0;
		setScrolledY(0);
		resetBooks();
	};

	useEffect(() => {
		const handleScroll = () => {
			const offsetHeight = document.body.offsetHeight;
			const screenHeight = window.innerHeight;

			const scrolledTop = window.scrollY + screenHeight;
			const threshold = offsetHeight - screenHeight / 3;

			if (!isRequestSending.current && scrolledTop >= threshold) {
				isRequestSending.current = true;
				startIndexRef.current += 12;
				// console.log('Threshold', threshold);
				// console.log('ScreenHeight', screenHeight);

				setScrolledY(threshold - screenHeight);
				requestBooks();
			} else if (isRequestSending.current && scrolledTop < threshold) {
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

	console.log('HomePage rendered');

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
				<Outlet context={{ scrolledY }} />
			</main>
		</div>
	);
}

export const useScroll = () => useOutletContext<ContextType>();

export default HomePage;
