import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type PreloadedRootState } from 'store';
import { testBooks } from 'tests/mock/mockBooks';
import renderWithReduxAndRouter from 'tests/helpers/renderWithReduxAndRouter';

var mockContext = {
  handleScroll: jest.fn(),
  scrolledY: 0,
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => mockContext,
}));

describe('BookCardList component', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should return component with books', () => {
    const preloadedState: PreloadedRootState = {
      books: {
        books: testBooks.items,
        totalBooks: testBooks.totalItems,
        status: 'succeeded',
        error: null,
        isBooksOver: false,
      },
    };

    renderWithReduxAndRouter({
      preloadedState,
      routes: ['/books'],
    });

    expect(screen.getAllByRole('article')).toHaveLength(testBooks.items.length);
  });

  test('should navigate to the BookDetailsPage and render component with the book info', async () => {
    const preloadedState: PreloadedRootState = {
      books: {
        books: testBooks.items,
        totalBooks: testBooks.totalItems,
        status: 'succeeded',
        error: null,
        isBooksOver: false,
      },
      bookDetails: {
        book: null,
        error: null,
        status: 'pending',
      },
    };

    renderWithReduxAndRouter({
      preloadedState,
      routes: ['/books', `/books/${testBooks.items[0].id}`],
    });

    userEvent.click(screen.getAllByText(/More/i)[0]);

    expect(await screen.findByRole('status')).toBeInTheDocument();
  });

  test('should return null if the status is "idle"', async () => {
    const test: PreloadedRootState = {
      books: {
        books: [],
        totalBooks: 0,
        status: 'idle',
        error: null,
        isBooksOver: false,
      },
    };

    renderWithReduxAndRouter({
      preloadedState: test,
      routes: ['/books'],
    });

    expect(screen.queryByText(/books found/i)).toBeNull();
  });

  test('should return the spinner if the status is "pending"', () => {
    const preloadedState: PreloadedRootState = {
      books: {
        books: [],
        totalBooks: 0,
        status: 'pending',
        error: null,
        isBooksOver: false,
      },
    };

    renderWithReduxAndRouter({
      preloadedState,
      routes: ['/books'],
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('should return the ErrorFallback component if the status is "rejected"', () => {
    const preloadedState: PreloadedRootState = {
      books: {
        books: [],
        totalBooks: 0,
        status: 'rejected',
        error: null,
        isBooksOver: false,
      },
    };

    renderWithReduxAndRouter({
      preloadedState,
      routes: ['/books'],
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('should return the message if books was not found', () => {
    const preloadedState: PreloadedRootState = {
      books: {
        books: [],
        totalBooks: 0,
        status: 'succeeded',
        error: null,
        isBooksOver: false,
      },
    };

    renderWithReduxAndRouter({
      preloadedState,
      routes: ['/books'],
    });

    expect(
      screen.getByText(/Oops, looks like no books were found/i)
    ).toBeInTheDocument();
  });
});
