export type BookResponse = {
	items: Book[];
	kind: string;
	totalItems: number;
};

export type Book = {
	id: BookId;
	volumeInfo: VolumeInfo;
};

export type VolumeInfo = {
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

export type BookId = string;
