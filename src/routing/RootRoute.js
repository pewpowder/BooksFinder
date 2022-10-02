import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import React from 'react';

import BookCardList from '../components/BookCardList/BookCardList';
import SingleBookPage from '../components/SingleBookPage/SingleBookPage';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ErrorPage from '../components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				index: true,
				element: (
					<React.Fragment>
						<SearchPanel/>
						<BookCardList/>
					</React.Fragment>)
			},
			{
				path: '/book/:bookId',
				element: <SingleBookPage/>,
				//loader
			}
		]
	},
]);

export default router;
