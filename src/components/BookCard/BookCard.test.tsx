import { screen } from '@testing-library/react';
import renderWithReduxAndRouter from 'tests/helpers/renderWithReduxAndRouter';
import NotFoundImg from 'assets/img/not-found.png';
import { type PreloadedRootState } from 'store';
import { testBooks } from 'tests/mock/mockBooks';

describe('BookCard component', () => {
  test('should render BookCard component with data', () => {
    const testBook = testBooks.items[1];
    const preloadedState: PreloadedRootState = {
      books: {
        books: [testBook],
        error: null,
        status: 'succeeded',
        totalBooks: 1,
      },
    };

    const { title, authors, publishedDate, publisher, imageLinks } =
      testBook.volumeInfo;

    renderWithReduxAndRouter({ routes: ['/books'], preloadedState });

    expect(screen.getByRole('img', { name: /book cover/i })).toHaveAttribute(
      'src',
      imageLinks?.smallThumbnail
    );
    expect(screen.getByRole('list')).toHaveTextContent(`${title}`);
    expect(screen.getByRole('list')).toHaveTextContent(
      `Authors: ${authors && authors.join(', ')}`
    );
    expect(screen.getByRole('list')).toHaveTextContent(
      `Published date: ${publishedDate}`
    );
    expect(screen.getByRole('list')).toHaveTextContent(
      `Publisher: ${publisher}`
    );
  });

  test('should render BookCard component without data', () => {
    const testBook = {
      id: '_i6bDeoCQzsC',
      etag: 'EyPb9gT+MfA',
      volumeInfo: {
        title: 'Some special book',
      },
    };
    const preloadedState: PreloadedRootState = {
      books: {
        books: [testBook],
        error: null,
        status: 'succeeded',
        totalBooks: 0,
      },
    };

    renderWithReduxAndRouter({ routes: ['/books'], preloadedState });

    const {
      volumeInfo: { title },
    } = testBook;
    const unknown = 'unknown';
    expect(screen.getByRole('img', { name: /book cover/i })).toHaveAttribute(
      'src',
      NotFoundImg
    );
    expect(screen.getByRole('list')).toHaveTextContent(title);
    expect(screen.getByRole('list')).toHaveTextContent(`Authors: ${unknown}`);
    expect(screen.getByRole('list')).toHaveTextContent(
      `Published date: ${unknown}`
    );
    expect(screen.getByRole('list')).toHaveTextContent(`Publisher: ${unknown}`);
  });
});
