import { Link } from 'react-router-dom';
import styles from './BookDescription.module.scss';

interface BookDescriptionProps {
	description: string | undefined;
	previewLink: string | undefined;
}

function BookDescription({ description, previewLink }: BookDescriptionProps) {
	return (
		<div>
			<article className={styles['description']}>
				<h2 className={styles['description-title']}>Book Description</h2>
				<p className={styles['description-text']}>
					{description ?? 'no description'}
				</p>
				<div className={styles['links-wrapper']}>
					<Link to='/' className={styles['link']}>
						{'< Back'}
					</Link>
					<a
						href={previewLink}
						target='_blank'
						rel='noreferrer'
						className={`
							${styles['link']} 
							${previewLink ? '' : styles['disabled']}
						`}
					>
						Read a sample
					</a>
				</div>
			</article>
		</div>
	);
}

export default BookDescription;
