import { Link } from 'react-router-dom';
import styles from './BookDescription.module.scss';

interface BookDescriptionProps {
	description: string;
	previewLink: string | undefined;
}

function BookDescription({ description, previewLink }: BookDescriptionProps) {
	return (
		<section>
			<div className={styles['description']}>
				<h2 className={styles['description-title']}>Book Description</h2>
				<p className={styles['description-text']}>{description ?? 'unknown'}</p>
				<div className={styles['links-wrapper']}>
					<Link to='/' className={styles['link']}>
						{'< Back'}
					</Link>
					<a
						href={previewLink}
						target='_blank'
						rel='noreferrer'
						className={`${styles['link']} ${previewLink ? '' : 'disabled'}`}
					>
						Read a sample
					</a>
				</div>
			</div>
		</section>
	);
}

export default BookDescription;
