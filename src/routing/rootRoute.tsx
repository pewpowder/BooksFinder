import { createBrowserRouter } from 'react-router-dom';

import BookCardList from 'components/BookCardList/BookCardList';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import HomePage from 'pages/HomePage/HomePage';
import DetailsPage from 'pages/DetailsPage/DetailsPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />, // HomePage
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <BookCardList />,
			},
		],
	},
	{
		path: '/details/:bookId',
		element: <DetailsPage />,
		errorElement: <ErrorPage />,
	},
]);

export default router;
