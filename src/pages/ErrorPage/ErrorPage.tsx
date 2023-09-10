import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();

	let statusText = 'Unknown';
	let status = 404;

	if (isRouteErrorResponse(error)) {
		statusText = error.statusText;
		status = error.status;
	}

	return (
		<div className='container'>
			<div
				style={{ height: '100vh' }}
				className='d-flex justify-content-center align-items-center'
			>
				<div className='card'>
					<div className='card-body'>
						<h5 className='card-title'>
							{statusText} {status}
						</h5>
						<p className='card-text'>
							{'Something went wrong, please come back to home page'}
						</p>
						<Link to='/' className='link-primary'>
							Go back to home page
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
