import { BookResponse } from 'types';
import { API_KEY } from '../config';

const URL = 'https://www.googleapis.com/books/v1';

export async function getBooks(
	query: string,
	startIndex = 0
): Promise<BookResponse> {
	const response = await fetch(
		`${URL}/volumes?q=${query}&startIndex=${startIndex}&maxResults=12&key=${API_KEY}`
	);
	return await response.json();
}
