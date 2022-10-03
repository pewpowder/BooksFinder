import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchPanel from '../SearchPanel/SearchPanel';

export default function App() {
	return (
		<div className="container">
			<h1 className="h1 text-primary fst-italic">Jutsu</h1>
			<SearchPanel/>
			<Outlet/>
		</div>
	)
}
