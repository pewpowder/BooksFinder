import { Link, Outlet, useOutletContext } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel/SearchPanel';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import { useMemo, useRef, useState } from 'react';
import { useAppDispatch } from 'redux-hooks';
import { fetchBooks, resetBooks } from 'features/books/booksSlice';
import styles from './HomePage.module.scss';

type ContextType = {
	scrolledY: number;
	setScrolledY: React.Dispatch<React.SetStateAction<number>>;
	startIndexRef: React.MutableRefObject<number>;
	requestBooks: () => void;
};

function HomePage() {
	const dispatch = useAppDispatch();
	const [query, setQuery] = useState('Clean code'); // May be should replace hook with useRef?
	const [scrolledY, setScrolledY] = useState(0);
	const startIndexRef = useRef(0);

	const requestBooks = () => {
		dispatch(fetchBooks({ query, startIndex: startIndexRef.current }));
	};

	const outletContext = useMemo(() => {
		return {
			scrolledY,
			setScrolledY,
			startIndexRef,
			requestBooks,
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrolledY, startIndexRef]);

	const resetPreviousBooks = () => {
		startIndexRef.current = 0;
		setScrolledY(0);
		resetBooks();
	};

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
				<Outlet context={outletContext} />
			</main>
		</div>
	);
}

export const useTypedOutletContext = () => useOutletContext<ContextType>();

export default HomePage;
