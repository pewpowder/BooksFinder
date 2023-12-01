import { StateError } from 'types';
import styles from './ErrorFallback.module.scss';
import { isError, isAPIResponseError } from 'helpers/helpers';

interface ErrorFallbackProps {
  error: StateError;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  let name = 'unknown';
  let message = 'Something went wrong.';

  if (isError(error)) {
    name = error.name;
    message = error.message;

    console.error(error.stack);
  }

  if(isAPIResponseError(error)) {
    name = error.status || 'unknown';
    message = error.message;

    console.error(error.code, error.errors);
  }

  return (
    <div className={styles['container']} role="alert">
      <h3 className={styles['error-name']}>{name}</h3>
      <pre className={styles['error-message']}>
        {message}
        {'\nPlease try again!'}
      </pre>
    </div>
  );
}

export default ErrorFallback;
