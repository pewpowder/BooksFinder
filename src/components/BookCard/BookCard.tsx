import { Link } from 'react-router-dom';
import { Book } from 'types';

interface BookCardProps extends Book {}

function BookCard({ id, volumeInfo }: BookCardProps) {
	if (!volumeInfo) {
		throw new Error('No book info');
	}

	const { authors, imageLinks, publishedDate, publisher, title } = volumeInfo;

	return (
		<div className=''>
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
				<div className=''>
					<ul className=''>
						<li className=''>
							<h5 className=''>{title}</h5>
						</li>
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
							<Link to={`/details/${id}`} className={`${id ? '' : 'disabled'}`}>
								{'More >'}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

function DetailsList({ volumeInfo }: Pick<BookCardProps, 'volumeInfo'>) {}

export default BookCard;
