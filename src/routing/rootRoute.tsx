import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App/App';

import BookCardList from '../components/BookCardList/BookCardList';
import SingleBookPage from '../components/SingleBookPage/SingleBookPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <BookCardList />,
			},
			{
				path: '/book/:bookId',
				element: <SingleBookPage />,
			},
		],
	},
]);

export default router;
