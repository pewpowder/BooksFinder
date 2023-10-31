import styles from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
  error: Error | null;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  let name = '';
  let message = '';

  if (error) {
    name = error.name;
    message = error.message;

    console.error(error.stack);
  }

  return (
    <div className={styles['container']}>
      <h3 className={styles['error-name']}>{name || 'unknown'}</h3>
      <pre className={styles['error-message']}>
        {message || 'Something went wrong.'}
        {'\nPlease try again!'}
      </pre>
    </div>
  );
}

// export const isErrorType = (error: unknown): error is Error => {
//   if (!error || typeof error !== 'object') {
//     return false;
//   }

//   return 'name' in error && 'message' in error;
// };

export default ErrorFallback;
