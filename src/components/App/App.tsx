import { Outlet } from 'react-router-dom';
import SearchPanel from '../SearchPanel/SearchPanel';
import { Link } from 'react-router-dom';

export default function App() {
	return (
		<div className='container'>
			<Link
				to='/'
				className='d-inline-block h1 text-primary fst-italic text-decoration-none mb-2 ms-1'
			>
				Jutsu
			</Link>
			<SearchPanel />
			<Outlet />
		</div>
	);
}
