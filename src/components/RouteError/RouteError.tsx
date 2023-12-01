import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './RouterError.module.scss';

function RouteError() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    throw error;
  }

  const status = error.status;
  const statusText = error.statusText;
  const message = error.error?.message || error.data;

  console.error(error.error?.stack);

  return (
    <div className={styles['container']} role="alert">
      <div>
        <h3 className={styles['error-name']}>{`${status} - ${statusText}`}</h3>
        <pre className={styles['error-message']}>
          {`${message}, please come back to home page`}
        </pre>
        <Link to="/" className={styles['link']}>
          Go back to home page
        </Link>
      </div>
    </div>
  );
}

export default RouteError;
