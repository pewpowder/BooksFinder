import { Link } from 'react-router-dom';
import styles from './ErrorComponent.module.scss';
import { ErrorType } from 'types';
interface ErrorComponentProps extends ErrorType {}

function ErrorComponent({ statusText, status }: ErrorComponentProps) {
	return (
		<div className={styles['container']}>
			<div>
				<h5 className={styles['error-status']}>
					{statusText} {status}
				</h5>
				<p className={styles['error-message']}>
					{`${statusText}, please come back to home page`}
				</p>
				<Link to='/' className={styles['link']}>
					Go back to home page
				</Link>
			</div>
		</div>
	);
}

export default ErrorComponent;
