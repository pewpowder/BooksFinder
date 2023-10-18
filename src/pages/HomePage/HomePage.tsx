import { Link, Outlet, useOutletContext } from 'react-router-dom';
import SearchPanel from 'components/SearchPanel/SearchPanel';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from 'hooks/redux-hooks';
import { fetchBooks, resetBooks } from 'features/books/booksSlice';
import useSearchParamsAndNavigate from 'hooks/useSearchParamsAndNavigate';
import useScrollY from 'hooks/useScrollY';
import type { FetchBooksParams } from 'types';

import styles from './HomePage.module.scss';

type ContextType = {
  scrolledY: number;
  setScrolledY: React.Dispatch<React.SetStateAction<number>>;
  startIndexRef: React.MutableRefObject<number>;
  requestBooks: () => void;
};

function HomePage() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('Clean code');
  /*
		[scrolledY, setScrolledY] defined inside HomePage so that users
		see same client view when they returning from BookDetails component.
	*/
  const [scrolledY, setScrolledY] = useScrollY();
  const startIndexRef = useRef(0);
  const [searchParams, updateSearchParamsAndNavigate] =
    useSearchParamsAndNavigate('/books');

  const requestBooks = () => {
    const fetchParams = { query, startIndex: startIndexRef.current };
    updateSearchParamsAndNavigate(fetchParams);
    dispatch(fetchBooks(fetchParams));
  };

  useEffect(() => {
    if (searchParams.has('query')) {
      const searchParamsQuery = searchParams.get('query') as string;
      const searchParamsStartIndex = Number(searchParams.get('startIndex'));
      setQuery(searchParamsQuery);
      startIndexRef.current = searchParamsStartIndex;

      // In strict mode request is sent twice (If we load the page with search params).
      // We abort first request.
      const controller = new AbortController();
      const signal = controller.signal;
      dispatch(
        fetchBooks({
          query: searchParamsQuery,
          startIndex: searchParamsStartIndex,
          signal,
        })
      );

      return () => {
        controller.abort();
      };
    }
  }, []);

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
    dispatch(resetBooks());
  };

  return (
    <div className={styles['container']}>
      <header className={styles['header']}>
        <Link
          to="/"
          className={styles['home-link']}
          onClick={resetPreviousBooks}
        >
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
