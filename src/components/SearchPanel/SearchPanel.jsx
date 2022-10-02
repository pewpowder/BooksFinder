import React from 'react';

import style from './SearchPanel.module.css';

const {input__search} = style;

export default function SearchPanel() {
	return (
		<div className="row mb-4">
			<div className="input-group">
				<input type="search" className={`${input__search} form-control bg-transparent`}/>
				<button className="btn btn-primary">search</button>
			</div>
		</div>
	);
}