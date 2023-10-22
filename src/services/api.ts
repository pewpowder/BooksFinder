import type { BookId, FetchBooksParams } from 'types';
import { API_KEY } from '../config';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const getUrlFetchBooks = ({
  query,
  startIndex,
  booksCount,
}: FetchBooksParams) =>
  `${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${booksCount}&key=${API_KEY}`;

export const getUrlFetchSingleBook = (id: BookId) =>
  `${BASE_URL}/${id}?key=${API_KEY}`;
