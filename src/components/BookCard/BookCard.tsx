import { Link } from 'react-router-dom';
import NotFoundImg from 'assets/img/not-found.png';
import type { Book } from 'types';
import styles from './BookCard.module.scss';

interface BookCardProps extends Omit<Book, 'etag'> {}

function BookCard({ id, volumeInfo }: BookCardProps) {
  const { authors, imageLinks, publishedDate, publisher, title } = volumeInfo;

  return (
    <article className={styles['card']}>
      <img
        className={styles['card-img']}
        src={imageLinks?.smallThumbnail || NotFoundImg}
        alt="book cover"
      />
      <ul className={styles['card-list']}>
        <li className={styles['card-list-item']}>
          <h5 className={styles['card-title']}>{title + 'dsa'}</h5>
        </li>
        <li className={styles['card-list-item']}>
          <span>Authors:</span> {authors ? authors.join(', ') : 'unknown'}
        </li>
        <li className={styles['card-list-item']}>
          <span>Published date:</span> <time>{publishedDate || 'unknown'}</time>
        </li>
        <li className={styles['card-list-item']}>
          <span>Publisher:</span> {publisher || 'unknown'}
        </li>
        <li className={styles['card-list-item']}>
          <Link
            to={`/books/${id}`}
            className={`${styles['card-link']}`}
          >
            {'More >'}
          </Link>
        </li>
      </ul>
    </article>
  );
}

export default BookCard;
