import { APIResponseError } from "types";

export const responseError: APIResponseError = {
  code: 400,
  errors: [
    {
      message: 'API key not valid',
      domain: 'global',
      reason: 'badRequest',
      location: 'location',
      locationType: 'locationType',
    },
  ],
  details: [
    {
      '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
      domain: 'googleapis.com',
      metadata: {
        service: 'books.googleapis.com',
      },
      reason: 'API_KEY_INVALID',
    },
  ],
  message: 'API key not valid',
};

export const defaultError: Error = {
  message: 'default error instanceof Error',
  name: 'Error',
}
