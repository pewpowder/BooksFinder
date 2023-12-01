import { screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { ErrorResponse } from '@remix-run/router';
import { useRouteError } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import renderWithReduxAndRouter from 'tests/helpers/renderWithReduxAndRouter';
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: jest.fn(),
}));

describe('RouteError', () => {
  const errorResponse = new ErrorResponse(
    404,
    'some response error text',
    'some response error data'
  );

  beforeEach(() => {
    (useRouteError as jest.Mock).mockReturnValue(errorResponse);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should render RouteError if an error is "ResponseError"', () => {
    renderWithReduxAndRouter({
      routes: ['/non-existent'],
    });

    const { status, statusText, data } = errorResponse;
    const errorMessage = new RegExp(data, 'i');
    expect(
      screen.getByRole('heading', { name: `${status} - ${statusText}` })
    ).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Go back to home page/i })
    ).toBeInTheDocument();
  });

  test('should navigate to home page after click on link', async () => {
    renderWithReduxAndRouter({
      routes: ['/non-existent', '/'],
    });

    await userEvent.click(
      screen.getByRole('link', { name: /Go back to home page/i })
    );

    expect(screen.getByRole('link', { name: /jutsu/i })).toBeInTheDocument();
  });

  test('should rethrow an error if the error isn`t "ResponseError"', async () => {
    const error: Error = {
      name: 'RouteError',
      message: 'RouteError test',
    };

    const errorRender = () => {
      return (
        <div>
          <h3>{error.name}</h3>
          <pre>{error.message}</pre>
        </div>
      );
    };

    (useRouteError as jest.Mock).mockReturnValue(error);

    renderWithReduxAndRouter({
      routes: ['/non-existent'],
      wrapper: ({ children }: PropsWithChildren) => {
        return (
          <ErrorBoundary fallbackRender={errorRender} children={children} />
        );
      },
    });

    const errorMessage = new RegExp(error.message);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: error.name })
    ).toBeInTheDocument();
  });
});
