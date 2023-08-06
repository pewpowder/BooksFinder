import { API_KEY } from '../config';

const URL = 'https://www.googleapis.com/books/v1';

export async function getBooks(query, startIndex = 0) {
	const response = await fetch(
		`${URL}/volumes?q=${query}&startIndex=${startIndex}&maxResults=12&key=${API_KEY}`
	);
	return response.json();
}
