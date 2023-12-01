import { getUrlFetchBooks, getUrlFetchSingleBook } from './api';
import type { BookId, FetchBooksParams} from 'types'

describe('API', () => {
  test('getUrlFetchBooks: should return URL contained received fetchParams', () => {
    const fetchParams: FetchBooksParams = {
      booksCount: 12,
      query: 'Test query',
      startIndex: 12,
    }

    const result = getUrlFetchBooks(fetchParams);

    expect(result).toContain(`q=${fetchParams.query}`);
    expect(result).toContain(`startIndex=${fetchParams.startIndex}`);
    expect(result).toContain(`maxResults=${fetchParams.booksCount}`);
  })

  test('getUrlFetchSingleBook: should return URL contained received id', () => {
    const id: BookId = '2zjECwAAQBAJ';

    const result = getUrlFetchSingleBook(id);

    expect(result).toContain('/' + id);
  })
})
