import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
	return (
		<div className="container">
			<div style={{height: '100vh'}} className="d-flex justify-content-center align-items-center">
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Page not found 404</h5>
						<p className="card-text">Show error message</p>
						<Link to="/" className="link-primary">Go back to home page</Link>
					</div>
				</div>
			</div>
		</div>
	);
}