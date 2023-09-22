import { Link } from 'react-router-dom';

interface ErrorComponentProps {
	statusText: string;
	status: number;
}

function ErrorComponent({ statusText, status }: ErrorComponentProps) {
	return (
		<div className=''>
			<div className=''>
				<div className=''>
					<div className=''>
						<h5 className=''>
							{statusText} {status}
						</h5>
						<p className=''>
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

export default ErrorComponent;
