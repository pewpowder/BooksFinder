import type { Book, BookResponse, StateError } from 'types';

export function mockRejectedFetch(error: NonNullable<StateError>) {
  return (jest.spyOn(global, 'fetch') as jest.Mock).mockImplementation(() =>
    Promise.reject({
      json: jest.fn(() => Promise.resolve(error)),
      ok: false,
    })
  );
}

export function mockResolvedWithErrorFetch(error: NonNullable<StateError>) {
  return (jest.spyOn(global, 'fetch') as jest.Mock).mockImplementation(() =>
    Promise.resolve({
      json: jest.fn(() => Promise.resolve({ error })),
      ok: false,
    })
  );
}

export function mockResolvedFetch(data: Book | BookResponse) {
  return (jest.spyOn(global, 'fetch') as jest.Mock).mockImplementation(() =>
    Promise.resolve({
      json: jest.fn(() => Promise.resolve(data)),
      ok: true,
    })
  );
}

// We return books only once so that if several promises are generated
// we don't render the same books (see the generatePromises function).
export function mockResolvedOnceFetch(
  firstData: Book | BookResponse,
  secondData: Book | BookResponse
) {
  return (jest.spyOn(global, 'fetch') as jest.Mock)
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: jest.fn(() => Promise.resolve(firstData)),
        ok: true,
      })
    )
    .mockImplementation(() => {
      Promise.resolve({
        json: jest.fn(() => Promise.resolve(secondData)),
        ok: true,
      });
    });
}
