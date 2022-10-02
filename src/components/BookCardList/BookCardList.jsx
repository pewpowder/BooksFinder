import React from 'react';
import BookCard from '../BookCard/BookCard';

export default function BookCardList() {
	return (
		<div className="row">
			<BookCard/>
			<BookCard/>
			<BookCard/>
			<BookCard/>
			<BookCard/>
			<BookCard/>
		</div>
	);
}