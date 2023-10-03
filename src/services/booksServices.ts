import { BookId, BookResponse } from 'types';
import { API_KEY } from '../config';

const BASE_URL = 'https://www.googleapis.com/books/v1';

export async function getBooks(
	query: string,
	startIndex = 0
): Promise<BookResponse> {
	const url = `${BASE_URL}/volumes?q=${query}&startIndex=${startIndex}&maxResults=12&key=${API_KEY}`;
	const response = await fetch(url);
	return await response.json();
}

export async function getBook(id: BookId) {
	const url = `${BASE_URL}/volumes/${id}?key=${API_KEY}`;
	const response = await fetch(url);
	return await response.json();
}

export const throttle = <T extends (...args: any) => any>(
	fn: T,
	delay: number
) => {
	let isRunning = false;
	return function (...args: Parameters<T>) {
		if (!isRunning) {
			isRunning = true;
			fn(args);

			const timeoutId = setTimeout(() => {
				isRunning = false;
				clearTimeout(timeoutId);
			}, delay);
		}
	};
};
