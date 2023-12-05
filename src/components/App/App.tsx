import { Link, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { ErrorBoundary } from 'react-error-boundary';
import SearchPanel from 'components/SearchPanel/SearchPanel';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import ErrorFallback from 'components/ErrorFallback/ErrorFallback';
import { fetchBooks, resetBooks } from 'features/books/booksSlice';
import useSearchParamsAndNavigate from 'hooks/useSearchParamsAndNavigate';
import useScrollY from 'hooks/useScrollY';
import type { ContextType, FetchBooksParams, StatusType } from 'types';
import { BOOKS_COUNT_REQUESTED_DEFAULT } from 'helpers/helpers';
import { selectIsBooksOver } from 'features/books/booksSelectors';
import styles from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const startIndexRef = useRef(0);
  const booksCountRef = useRef(BOOKS_COUNT_REQUESTED_DEFAULT);
  const isBooksOver = useAppSelector(selectIsBooksOver);

  const [scrolledY, setScrolledY] = useScrollY();
  const [searchParams, updateSearchParamsAndNavigate] =
    useSearchParamsAndNavigate('/books');

  useEffect(() => {
    if (searchParams.has('query')) {
      const searchParamsQuery = searchParams.get('query') as string;
      const searchParamsBooksCount = Number(searchParams.get('booksCount'));
      booksCountRef.current =
        searchParamsBooksCount ?? BOOKS_COUNT_REQUESTED_DEFAULT;
      setQuery(searchParamsQuery);

      const fetchParams: FetchBooksParams = {
        query: searchParamsQuery,
        startIndex: startIndexRef.current,
        booksCount: booksCountRef.current,
      };

      const controller = new AbortController();
      dispatch(fetchBooks({ ...fetchParams, signal: controller.signal }));
      updateSearchParamsAndNavigate(fetchParams);

      return () => {
        controller.abort();
        resetPreviousBooks();
        navigate(-1);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestBooks = (fetchParams: FetchBooksParams) => {
    if (!isBooksOver) {
      updateSearchParamsAndNavigate(fetchParams);
      dispatch(fetchBooks(fetchParams));
    }
  };

  const resetPreviousBooks = () => {
    startIndexRef.current = 0;
    booksCountRef.current = BOOKS_COUNT_REQUESTED_DEFAULT;
    setScrolledY(0);
    dispatch(resetBooks());
  };

  const handleOnSearch = () => {
    resetPreviousBooks();
    requestBooks({
      query,
      startIndex: startIndexRef.current,
      booksCount: booksCountRef.current,
    });
  };

  const handleScroll = useCallback(
    (status: StatusType) => {
      const offsetHeight = document.body.offsetHeight;
      const screenHeight = window.innerHeight;

      const scrolledTop = window.scrollY + screenHeight;
      const threshold = offsetHeight - screenHeight / 3;

      if (status !== 'pending' && scrolledTop >= threshold) {
        startIndexRef.current += BOOKS_COUNT_REQUESTED_DEFAULT;
        booksCountRef.current += BOOKS_COUNT_REQUESTED_DEFAULT;
        setScrolledY(threshold - screenHeight);

        requestBooks({
          query,
          startIndex: startIndexRef.current,
          booksCount: booksCountRef.current,
        });
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, setScrolledY, isBooksOver]
  );

  const outletContext = useMemo(() => {
    return {
      scrolledY,
      handleScroll,
    };
  }, [scrolledY, handleScroll]);

  return (
    <div className={styles['container']}>
      <header className={styles['header']}>
        <Link
          to="/"
          className={styles['home-link']}
          onClick={() => {
            setQuery('');
            resetPreviousBooks();
            navigate('/');
          }}
        >
          JUTSU
        </Link>
        <ThemeToggle />
      </header>
      <main>
        <SearchPanel
          query={query}
          setQuery={setQuery}
          handleOnSearch={handleOnSearch}
        />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet context={outletContext} />
        </ErrorBoundary>
        {isBooksOver && (
          <div className={styles['books-over']}>
            The books for this request have ended
          </div>
        )}
      </main>
    </div>
  );
}

export const useTypedOutletContext = () => useOutletContext<ContextType>();

export default App;
