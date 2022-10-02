import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard() {
	return (
		<div className="col mb-3">
			<div className="card flex-row shadow-lg">
				<img style={{width: '150px'}}
						 src={require('../../assets/img/not-found.png')}
						 alt="cover book"/>
				<div className="card-body">
					<ul className="list-group">
						<li className="list-group-item">
							<h5 className="card-title">
								Чистый код: создание, анализ и рефакторинг. Библиотека программиста
							</h5>
						</li>
						<li className="list-group-item">
							<p className="card-text">Author: Мартин Роберт</p>
						</li>
						<li className="list-group-item">
							<p className="card-text">Publish date: 2013-05-30</p>
						</li>
						<li className="list-group-item">
							<p className="card-text">Publisher: "Издательский дом "Питер"</p>
						</li>
						<li className="list-group-item">
							<Link to="/book/id" className="btn btn-primary">
								More
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

/*
	<ul className="list-group">
		<li className="list-group-item">Title: Чистый код: создание, анализ и рефакторинг. Библиотека программиста</li>
		<li className="list-group-item">Author: Мартин Роберт</li>
		<li className="list-group-item">Publish date: 2013-05-30</li>
		<li className="list-group-item">Publisher: "Издательский дом ""Питер"""</li>
		<li className="list-group-item">
			<Link to="/"
						className="btn btn-warning">More
			</Link>
		</li>
	</ul>
* */