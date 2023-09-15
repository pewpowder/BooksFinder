import ErrorComponent from 'components/ErrorComponent/ErrorComponent';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();

	let statusText = 'Unknown';
	let status = 404;

	if (isRouteErrorResponse(error)) {
		statusText = error.statusText;
		status = error.status;
	}

	return <ErrorComponent statusText={statusText} status={status} />;
}
