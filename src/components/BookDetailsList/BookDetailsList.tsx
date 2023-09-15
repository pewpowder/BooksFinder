import { VolumeInfo } from 'types';

interface BookDetailsListProps {
	volumeInfo: VolumeInfo;
}

function BookDetailsList({ volumeInfo }: BookDetailsListProps) {
	const isBookDetailsKey = (key: string): key is keyof VolumeInfo => {
		// Crete the obj that assert only allowed keys.
		const displayedProperties: VolumeInfo = {
			title: '',
			authors: [],
			averageRating: 0,
			categories: [],
			description: '',
			imageLinks: {},
			language: '',
			pageCount: 0,
			previewLink: '',
			publishedDate: '',
			publisher: '',
		};

		return key in displayedProperties;
	};

	const filteredInfo = Object.entries(volumeInfo).filter(
		([key]) => isBookDetailsKey(key) && key !== 'imageLinks' && key !== 'title'
	);

	return (
		<ul className='list'>
			{filteredInfo.map(([key, value]) => {
				if (key === 'previewLink') {
					return <li key={key} className='list_item'></li>;
				}
				return <li key={key} className='list_item'>{`${key}: ${value}`}</li>;
			})}
		</ul>
	);
}

export default BookDetailsList;
