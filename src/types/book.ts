export type BookResponse = {
	items: Book[] | undefined;
	totalItems: number;
};

export type BookId = string;

export type Book = {
	id: BookId;
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

export type ErrorType = {
	statusText: string;
	status: number;
};
