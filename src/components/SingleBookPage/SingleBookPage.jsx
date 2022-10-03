import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBookById } from '../../features/books/booksSlice';

export default function SingleBookPage() {
	const {bookId} = useParams();
	const book = useSelector((state) => selectBookById(state, bookId));

	if (!book) {
		throw new Error('Book not found');
	}

	const {
		authors,
		averageRating,
		categories,
		description,
		imageLinks,
		language,
		pageCount,
		previewLink,
		publishedDate,
		publisher,
		title
	} = book.volumeInfo;

	return (
		<div className="row">
			<div className="col mb-3">
				<div className="card mb-xl-0 mb-3 shadow-lg">
					<div className="card-header border-bottom-0">
						<h5 className="card-title text-center">
							{title}
						</h5>
					</div>
					<div className="border border-end-0 border-start-0">
						<img style={{width: '300px'}}
								 className="mx-auto d-block"
								 src={imageLinks?.thumbnail ?? imageLinks?.smallThumbnail ??
									 require('../../assets/img/not-found.png')}
								 alt="cover book"/>
					</div>
					<div className="card-body">
						<ul className="list-group">
							<li className="list-group-item">
								<p className="card-text">Authors: {authors ?? 'unknown'}</p>
							</li>
							<li className="list-group-item">
								<p className="card-text">
									Published date: {publishedDate ?? 'unknown'}
								</p>
							</li>
							<li className="list-group-item">
								<p className="card-text">
									Publisher: {publisher ?? 'unknown'}
								</p>
							</li>
							<li className="list-group-item">
								<p className="card-text">
									Numbers of page: {pageCount ?? 'unknown'}
								</p>
							</li>
							<li className="list-group-item">
								<p className="card-text">
									Language: {language ?? 'unknown'}
								</p>
							</li>
							<li className="list-group-item">
								<p className="card-text">
									Categories: {categories ?? 'unknown'}
								</p>
							</li>
							<li className="list-group-item">
								<p className="card-text">
									Rating (avg): {averageRating ?? 'unknown'}
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="col-xl-8 col-12">
				<div className="bg-light border rounded p-4 shadow-lg">
					<h2 className="h2">Book Description</h2>
					<p className="card-text">
						{description ?? 'unknown'}
					</p>
					<div className="d-flex justify-content-end gap-1">
						<Link to="/" className="btn btn-primary">{'<'} {'Back'}</Link>
						<a href={previewLink}
							 className={`btn btn-primary ${previewLink ? '' : 'disabled'}`}>
							Read a sample
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}