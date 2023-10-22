import { useNavigate } from 'react-router-dom';
import styles from './BookDescription.module.scss';

interface BookDescriptionProps {
  description: string | undefined;
  previewLink: string | undefined;
}

function BookDescription({ description, previewLink }: BookDescriptionProps) {
  const navigate = useNavigate();

  return (
    <div>
      <article className={styles['description']}>
        <h2 className={styles['description-title']}>Book Description</h2>
        <p className={styles['description-text']}>
          {description ?? 'no description'}
        </p>
        <div className={styles['links-wrapper']}>
          <button
            onClick={() => navigate(-1)}
            className={`${styles['link']} ${styles['button-back']}`}
          >
            {'< Back'}
          </button>
          <a
            href={previewLink}
            target="_blank"
            rel="noreferrer"
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
