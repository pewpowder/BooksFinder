import type { BookId } from 'types';
import { API_KEY } from '../config';

const BASE_URL = 'https://www.googleapis.com/books/v1';

export const FETCH_BOOKS = (query: string, startIndex: number) =>
	`${BASE_URL}/volumes?q=${query}&startIndex=${startIndex}&maxResults=12&key=${API_KEY}`;

export const FETCH_SINGLE_BOOK = (id: BookId) =>
	`${BASE_URL}/volumes/${id}?key=${API_KEY}`;
