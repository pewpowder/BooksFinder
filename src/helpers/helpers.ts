import { FetchBooksParams } from 'types';
import { getUrlFetchBooks } from './api';
import type { APIResponseError } from 'types'

export const throttle = <T extends (...args: Parameters<T>) => any>(
  fn: T,
  delay: number
) => {
  let isRunning = false;
  let savedCall: (() => void) | null = null;

  return function (...args: Parameters<T>) {
    if (isRunning) {
      savedCall = () => fn(...args);
      return;
    }

    fn(...args);

    isRunning = true;

    const timerId = setTimeout(() => {
      if (savedCall) {
        savedCall();
        savedCall = null;
      }
      isRunning = false;
      clearTimeout(timerId);
    }, delay);
  };
};

export const MAX_BOOKS_PER_REQUEST = 40; // 40 is the max value the server can return

export const BOOKS_COUNT_REQUESTED_DEFAULT = 12;

export const MAX_BOOKS_COUNT_SEVERAL_REQUESTS = 200; // When sending too many requests google books api limits the requests (P.S. 200 is a random value).

type FetchParams = {
  signal?: AbortSignal;
} & FetchBooksParams;

export const generatePromises = (fetchParams: FetchParams) => {
  const { query, booksCount, startIndex, signal } = fetchParams;

  let startFrom = startIndex;
  let currentRequestBooksCount =
    booksCount > 40 ? MAX_BOOKS_PER_REQUEST : booksCount;
  let booksRemain =
    booksCount > MAX_BOOKS_COUNT_SEVERAL_REQUESTS
      ? MAX_BOOKS_COUNT_SEVERAL_REQUESTS
      : booksCount;

  const promises: Promise<Response>[] = [];
  const requestsCount = Math.ceil(booksCount / MAX_BOOKS_PER_REQUEST);
  for (let i = 0; i < requestsCount; i++) {
    promises[i] = fetch(
      getUrlFetchBooks({
        query,
        startIndex: startFrom,
        booksCount: currentRequestBooksCount,
      }),
      {
        signal,
      }
    );

    startFrom += currentRequestBooksCount;
    booksRemain -= currentRequestBooksCount;
    currentRequestBooksCount =
      booksRemain >= MAX_BOOKS_PER_REQUEST
        ? MAX_BOOKS_PER_REQUEST
        : booksRemain;
  }

  return promises;
};

export const isError = (error: unknown): error is Error => {
  if(!error || typeof error !== 'object') {
    return false;
  }

  return 'message' in error && 'name' in error;
}

export const isAPIResponseError = (error: unknown): error is APIResponseError => {
  if(!error || typeof error !== 'object') {
    return false;
  }

  return 'code' in error && 'message' in error && 'errors' in error;
}
