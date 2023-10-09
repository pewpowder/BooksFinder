import BookDescription from './BookDescription/BookDescription';
import BookDetailsCard from './BookDetailsCard/BookDetailsCard';
import { Book } from 'types';
import styles from './BookDetails.module.scss';
import { useScroll } from 'pages/HomePage/HomePage';

interface BookDetailsProps extends Pick<Book, 'volumeInfo'> {}
function BookDetails({ volumeInfo }: BookDetailsProps) {
	const { description, previewLink } = volumeInfo;
	const { scrolledY } = useScroll();

	console.log('BookDetails', scrolledY);

	return (
		<section className={styles['container']}>
			<BookDetailsCard volumeInfo={volumeInfo} />
			<BookDescription description={description} previewLink={previewLink} />
		</section>
	);
}

export default BookDetails;
