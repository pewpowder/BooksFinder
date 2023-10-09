import { Link, Outlet, useOutletContext } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel/SearchPanel';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import { useRef, useState } from 'react';
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
	const [query, setQuery] = useState('Clean code'); // May be change to ref?
	const [scrolledY, setScrolledY] = useState(0);
	const startIndexRef = useRef(0);

	const requestBooks = () => {
		dispatch(fetchBooks({ query, startIndex: startIndexRef.current }));
	};

	const resetPreviousBooks = () => {
		startIndexRef.current = 0;
		setScrolledY(0);
		resetBooks();
	};

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
				<Outlet
					context={{ scrolledY, setScrolledY, startIndexRef, requestBooks }}
				/>
			</main>
		</div>
	);
}

export const useAppOutletContext = () => useOutletContext<ContextType>();

export default HomePage;
