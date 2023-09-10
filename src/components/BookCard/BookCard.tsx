import { Link } from 'react-router-dom';
import { Book } from 'types';

interface BookCardProps extends Book {}

export default function BookCard({ id, volumeInfo }: BookCardProps) {
	if (!volumeInfo) {
		throw new Error('No book info');
	}

	const { authors, imageLinks, publishedDate, publisher, title } = volumeInfo;

	return (
		<div className='col-lg-6 col-12 mb-3'>
			<div
				style={{ minHeight: '300px', maxWidth: '600px' }}
				className='card flex-row shadow-lg'
			>
				<img
					className='img-thumbnail'
					style={{ maxWidth: '138px', height: '300px' }}
					src={
						imageLinks?.thumbnail ??
						imageLinks?.smallThumbnail ??
						require('../../assets/img/not-found.png')
					}
					alt='cover book'
				/>
				<div className='card-body' style={{ maxWidth: '70%' }}>
					<ul className='list-group'>
						<li className='list-group-item '>
							<h5 className='card-title text-truncate'>{title}</h5>
						</li>
						<li className='list-group-item'>
							<p className='card-text text-truncate'>
								Authors: {authors ?? 'unknown'}
							</p>
						</li>
						<li className='list-group-item'>
							<p className='card-text text-truncate'>
								Published date: {publishedDate ?? 'unknown'}
							</p>
						</li>
						<li className='list-group-item'>
							<p className='card-text text-truncate'>
								Publisher: {publisher ?? 'unknown'}
							</p>
						</li>
						<li className='list-group-item'>
							<Link
								to={`/book/${id}`}
								className={`btn btn-primary ${id ? '' : 'disabled'}`}
							>
								{'More >'}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
