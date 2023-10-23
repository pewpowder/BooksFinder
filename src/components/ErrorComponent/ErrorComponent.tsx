import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './ErrorComponent.module.scss';

// TODO: Validate the error correctly.
function ErrorComponent() {
  const error = useRouteError();

  let statusText = 'Unknown';
  let status = 404;

  if (isRouteErrorResponse(error)) {
    statusText = error.statusText;
    status = error.status;
  }

  return (
    <div className={styles['container']}>
      <div>
        <h5 className={styles['error-status']}>{status}</h5>
        <p className={styles['error-message']}>
          {`${statusText}, please come back to home page`}
        </p>
        <Link to="/" className={styles['link']}>
          Go back to home page
        </Link>
      </div>
    </div>
  );
}

export default ErrorComponent;
