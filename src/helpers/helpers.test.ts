import {
  generatePromises,
  throttle,
  isError,
  isAPIResponseError,
  MAX_BOOKS_PER_REQUEST,
  MAX_BOOKS_COUNT_SEVERAL_REQUESTS,
} from './helpers';
import type { FetchBooksParams } from 'types';

jest.useFakeTimers();

describe('throttle helper', () => {
  let fn: jest.Mock;
  let throttledFn: Function;

  beforeEach(() => {
    fn = jest.fn();
    throttledFn = throttle(fn, 100);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('the wrapped function should be called twice', () => {
    for (let i = 0; i < 100; i++) {
      throttledFn();
    }

    jest.runAllTimers();

    expect(fn).toBeCalledTimes(2);
  });

  test('the wrapped function should be called once', () => {
    throttledFn();

    jest.runAllTimers();

    expect(fn).toBeCalledTimes(1);
  });
});

describe('generatePromises helper', () => {
  test('should return an array containing single promise', () => {
    const input: FetchBooksParams = {
      booksCount: MAX_BOOKS_PER_REQUEST / 2,
      query: 'Test query',
      startIndex: 0,
    };

    const result = generatePromises(input);

    expect(result).toHaveLength(1);
  });

  test('should return an array containing multiple promises', () => {
    const input: FetchBooksParams = {
      booksCount: MAX_BOOKS_COUNT_SEVERAL_REQUESTS + 1,
      query: 'Test query',
      startIndex: 0,
    };

    const requestsCount =
      MAX_BOOKS_COUNT_SEVERAL_REQUESTS / MAX_BOOKS_PER_REQUEST + 1;

    const result = generatePromises(input);

    expect(result).toHaveLength(requestsCount);
  });
});

describe('isError', () => {
  test('should return true', () => {
    const error = {
      message: 'isError test',
      name: 'isError',
    };

    expect(isError(error)).toBeTruthy();
  });
  test('should return false', () => {
    const error = 'some error not object';

    expect(isError(error)).toBeFalsy();
  });
});

describe('isAPIResponseError', () => {
  test('should return true', () => {
    const error = {
      message: 'isAPIResponseError test',
      code: 404,
      errors: [{ message: 'isAPIResponseError test', domain: 'helpers', reason: 'test' }],
    };

    expect(isAPIResponseError(error)).toBeTruthy();
  });

  test('should return false', () => {
    const error = 'some error not object';

    expect(isAPIResponseError(error)).toBeFalsy();
  });
});
