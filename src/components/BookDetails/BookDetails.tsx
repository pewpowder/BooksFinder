import { Link } from 'react-router-dom';

import BookDetailsList from 'components/BookDetailsList/BookDetailsList';
import { Book } from 'types';

interface BookDetailsProps extends Pick<Book, 'volumeInfo'> {}
function BookDetails({ volumeInfo }: BookDetailsProps) {
	const { description, previewLink } = volumeInfo;

	return (
		<div>
			{/* <BookDetailsList volumeInfo={volumeInfo} /> */}
			<BookCard volumeInfo={volumeInfo} />
			{description && (
				<BookDescription description={description} previewLink={previewLink} />
			)}
		</div>
	);
}

function BookCard({ volumeInfo }: BookDetailsProps) {
	const {
		authors,
		averageRating,
		categories,
		imageLinks,
		language,
		pageCount,
		publishedDate,
		publisher,
		title,
	} = volumeInfo;

	return (
		<div className=''>
			<div className=''>
				<h5 className=''>{title}</h5>
			</div>
			<div className=''>
				<img
					className=''
					src={
						imageLinks?.thumbnail ??
						imageLinks?.smallThumbnail ??
						require('../../assets/img/not-found.png')
					}
					alt='cover book'
				/>
			</div>
			<div className=''>
				<ul className=''>
					<li className=''>
						<p className=''>Authors: {authors ?? 'unknown'}</p>
					</li>
					<li className=''>
						<p className=''>Published date: {publishedDate ?? 'unknown'}</p>
					</li>
					<li className=''>
						<p className=''>Publisher: {publisher ?? 'unknown'}</p>
					</li>
					<li className=''>
						<p className=''>Numbers of page: {pageCount ?? 'unknown'}</p>
					</li>
					<li className=''>
						<p className=''>Language: {language ?? 'unknown'}</p>
					</li>
					<li className=''>
						<p className=''>Categories: {categories ?? 'unknown'}</p>
					</li>
					<li className=''>
						<p className=''>Rating (avg): {averageRating ?? 'unknown'}</p>
					</li>
				</ul>
			</div>
		</div>
	);
}

interface BookDescriptionProps {
	description: string;
	previewLink: string | undefined;
}

function BookDescription({ description, previewLink }: BookDescriptionProps) {
	return (
		<div className=''>
			<div className=''>
				<div className=''>
					<h2 className=''>Book Description</h2>
					<p className=''>{description ?? 'unknown'}</p>
					<div className=''>
						<Link to='/' className='btn btn-primary'>
							{'<'} {'Back'}
						</Link>
						<a
							href={previewLink}
							target='_blank'
							rel='noreferrer'
							className={`btn btn-primary ${previewLink ? '' : 'disabled'}`}
						>
							Read a sample
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookDetails;
