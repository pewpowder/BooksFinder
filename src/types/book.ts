export type Book = {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		imageLinks: {
			smallThumbnail: string;
			thumbnail: string;
		};
		publishedDate: string;
		publisher: string;
	};
};

export type BookResponse = {
	items: Book[];
	kind: string;
	totalItems: number;
};
