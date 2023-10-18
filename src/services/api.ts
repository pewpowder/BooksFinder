import type { BookId, FetchBooksParams } from 'types';
import { API_KEY } from '../config';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const FETCH_BOOKS = ({ query, startIndex }: FetchBooksParams) =>
  `${BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${12}&key=${API_KEY}`;

export const FETCH_SINGLE_BOOK = (id: BookId) =>
  `${BASE_URL}/${id}?key=${API_KEY}`;
