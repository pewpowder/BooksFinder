import BookDescription from './BookDescription/BookDescription';
import BookDetailsCard from './BookDetailsCard/BookDetailsCard';
import { Book } from 'types';
import styles from './BookDetails.module.scss';

interface BookDetailsProps extends Pick<Book, 'volumeInfo'> {}
function BookDetails({ volumeInfo }: BookDetailsProps) {
	const { description, previewLink } = volumeInfo;

	return (
		<article className={styles['container']}>
			<BookDetailsCard volumeInfo={volumeInfo} />
			{description && (
				<BookDescription description={description} previewLink={previewLink} />
			)}
		</article>
	);
}

export default BookDetails;
