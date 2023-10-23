import { createBrowserRouter } from 'react-router-dom';
import App from 'components/App/App';
import BookDetails from 'components/BookDetails/BookDetails';
import BookCardList from 'components/BookCardList/BookCardList';
import ErrorComponent from 'components/ErrorComponent/ErrorComponent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/books',
        element: <BookCardList />,
      },
      {
        path: '/details/:bookId',
        element: <BookDetails />,
      },
    ],
  },
]);

export default router;
