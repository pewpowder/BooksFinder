import { createBrowserRouter } from 'react-router-dom';
import App from 'components/App/App';
import BookDetails from 'components/BookDetails/BookDetails';
import BookCardList from 'components/BookCardList/BookCardList';
import RouteError from 'components/RouteError/RouteError';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        path: '/books',
        element: <BookCardList />,
      },
      {
        path: '/books/:bookId',
        element: <BookDetails />,
      },
    ],
  },
]);

export default router;
