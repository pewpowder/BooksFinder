const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const API_KEY = 'AIzaSyBtnr1RhaMW9jdKt6GlEPuB5jc4HdC0RhE';

export async function getBooks(inputValue) {
	const response = await fetch(`${BASE_URL}${inputValue}+inauthor:keyes&key=${API_KEY}`,);
	return response.json();
}



// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBtnr1RhaMW9jdKt6GlEPuB5jc4HdC0RhE GET
