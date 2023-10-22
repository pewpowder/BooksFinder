import type { Book } from 'types';
import NotFoundImg from 'assets/img/not-found.png';
import styles from './BookDetailsCard.module.scss';

interface BookDetailsCardProps extends Pick<Book, 'volumeInfo'> {}

function BookDetailsCard({ volumeInfo }: BookDetailsCardProps) {
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
    <article className={styles['card']}>
      <h5 className={styles['card-title']}>{title}</h5>
      <img
        className={styles['card-img']}
        src={imageLinks?.thumbnail ?? NotFoundImg}
        alt="cover book"
      />
      <ul className={styles['card-list']}>
        <li className={styles['card-list-item']}>
          <span>Authors:</span> {authors ?? 'unknown'}
        </li>
        <li className={styles['card-list-item']}>
          <span>Published date:</span>
          <time> {publishedDate ?? 'unknown'}</time>
        </li>
        <li className={styles['card-list-item']}>
          <span>Publisher:</span> {publisher ?? 'unknown'}
        </li>
        <li className={styles['card-list-item']}>
          <span>Numbers of page:</span> {pageCount ?? 'unknown'}
        </li>
        <li className={styles['card-list-item']}>
          <span>Language:</span> {language ?? 'unknown'}
        </li>
        <li className={styles['card-list-item']}>
          <span>Categories:</span> {categories ?? 'unknown'}
        </li>
        <li className={styles['card-list-item']}>
          <span>Rating (avg):</span> {averageRating ?? 'unknown'}
        </li>
      </ul>
    </article>
  );
}

export default BookDetailsCard;
