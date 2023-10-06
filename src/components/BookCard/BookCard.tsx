import { Link } from 'react-router-dom';
import type { Book } from 'types';
import NotFoundImg from 'assets/img/not-found.png';
import styles from './BookCard.module.scss';
import { useEffect } from 'react';

interface BookCardProps extends Book {
	setCounter: React.Dispatch<React.SetStateAction<number>>;
}

function BookCard({ id, volumeInfo, setCounter }: BookCardProps) {
	if (!volumeInfo) {
		throw new Error('No book info');
	}

	useEffect(() => {
		// setCounter((prev) => prev + 1);
	}, []);

	const { authors, imageLinks, publishedDate, publisher, title } = volumeInfo;

	return (
		<article className={styles['card']}>
			<img
				className={styles['card-img']}
				src={imageLinks?.smallThumbnail ?? NotFoundImg}
				alt='book cover'
			/>
			<ul className={styles['card-list']}>
				<li className={styles['card-list-item']}>
					<h5 className={styles['card-title']}>{title}</h5>
				</li>
				<li className={styles['card-list-item']}>
					<span>Authors:</span> {authors ?? 'unknown'}
				</li>
				<li className={styles['card-list-item']}>
					<span>Published date:</span> <time>{publishedDate ?? 'unknown'}</time>
				</li>
				<li className={styles['card-list-item']}>
					<span>Publisher:</span> {publisher ?? 'unknown'}
				</li>
				<li className={styles['card-list-item']}>
					<Link
						to={`/details/${id}`}
						className={`${styles['card-link']} ${id ? '' : styles['disable']}`}
					>
						{'More >'}
					</Link>
				</li>
			</ul>
		</article>
	);
}

export default BookCard;
