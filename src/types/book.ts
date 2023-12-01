export type BookResponse = {
  items: Book[];
  totalItems: number;
};

export type BookId = string;

export type Book = {
  id: BookId;
  etag: string;
  volumeInfo: VolumeInfo;
};

type VolumeInfo = {
  title: string;
  authors?: string[];
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  publishedDate?: string;
  publisher?: string;
  averageRating?: number;
  pageCount?: number;
  language?: string;
  previewLink?: string;
  categories?: string[];
  description?: string;
};

export type FetchBooksParams = {
  query: string;
  startIndex: number;
  booksCount: number;
};

export type StatusType = 'idle' | 'pending' | 'succeeded' | 'rejected';

export type ContextType = {
  scrolledY: number;
  handleScroll: (status: StatusType) => void;
};

type APIErrorErrors = {
  message: string;
  domain: string;
  reason: string;
  locationType: string,
  location: string,
};

type APIErrorDetails = {
  '@type': string;
  reason: string;
  domain: string;
  metadata: {
    service: string;
  };
};

export type APIResponseError = {
  code: number;
  message: string;
  errors: APIErrorErrors[];
  details: APIErrorDetails[];
  status?: string;
};

export type StateError = Error | APIResponseError | null;
