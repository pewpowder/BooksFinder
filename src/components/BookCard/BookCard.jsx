import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({bookId, bookInfo}) {
	if (!bookInfo) {
		throw new Error('No book info');
	}

	const {authors, imageLinks, publishedDate, publisher, title} = bookInfo;

	return (
		<div className="col-lg-6 col-12 mb-3">
			<div style={{minHeight: '300px'}} className="card flex-row shadow-lg">
				<img className="img-thumbnail"
						 style={{maxWidth: '138px', maxHeight: '293px'}}
						 src={imageLinks?.thumbnail ?? imageLinks?.smallThumbnail ??
							 require('../../assets/img/not-found.png')}
						 alt="cover book"/>
				<div className="card-body">
					<ul className="list-group">
						<li className="list-group-item">
							<h5 className="card-title">
								{title ?? 'unknown'}
							</h5>
						</li>
						<li className="list-group-item">
							<p className="card-text">Authors: {authors ?? 'unknown'}</p>
						</li>
						<li className="list-group-item">
							<p className="card-text">
								Published date: {publishedDate ?? 'unknown'}</p>
						</li>
						<li className="list-group-item">
							<p className="card-text">Publisher: {publisher ?? 'unknown'}</p>
						</li>
						<li className="list-group-item">
							<Link to={`/book/${bookId}`}
										className={`btn btn-primary ${bookId ? '' : 'disabled'}`}>
								{'More'} {'>'}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}