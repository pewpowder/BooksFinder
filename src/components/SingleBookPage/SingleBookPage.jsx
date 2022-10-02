import React from 'react';
import { Link } from 'react-router-dom';

export default function SingleBookPage() {

	return (
		<div className="row">
			<div className="col mb-3">
				<div className="card mb-xl-0 mb-3 shadow-lg">
					<div className="card-header border-bottom-0">
						<h5 className="card-title">
							Чистый код: создание, анализ и рефакторинг. Библиотека
							программиста
						</h5>
					</div>
					<div className="border border-end-0 border-start-0">
						<img style={{width: '300px'}}
								 className="mx-auto d-block"
								 src={require('../../assets/img/not-found.png')}
								 alt="cover book"/>
					</div>
					<div className="card-body">
						<ul className="list-group">
							<li className="list-group-item">
								<p className="card-text">Author: Мартин Роберт</p>
							</li>
							<li className="list-group-item">
								<p className="card-text">Publish date: 2013-05-30</p>
							</li>
							<li className="list-group-item">
								<p className="card-text">
									Publisher: "Издательский дом "Питер"
								</p>
							</li>
							<li className="list-group-item">
								<p className="card-text">Numbers of page: 444</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="col-xl-8 col-12">
				<div className="bg-light border rounded p-4 shadow-lg">
					<h2 className="h2">Book Description</h2>
					<p className="card-text">
						Даже плохой программный код может работать. Однако если код не
						является «чистым», это всегда будет мешать развитию проекта и
						компании-разработчика, отнимая значительные ресурсы на его поддержку
						и «укрощение». Эта книга посвящена хорошему программированию. Она
						полна реальных примеров кода. Мы будем рассматривать код с различных
						направлений: сверху вниз, снизу вверх и даже изнутри. Прочитав
						книгу, вы узнаете много нового о коде. Более того, вы научитесь
						отличать хороший код от плохого. Вы узнаете, как писать хороший код
						и как преобразовать плохой код в хороший. Книга состоит из трех
						частей. В первой части излагаются принципы, паттерны и приемы
						написания чистого кода; приводится большой объем примеров кода.
						Вторая часть состоит из практических сценариев нарастающей
						сложности. Каждый сценарий представляет собой упражнение по чистке
						кода или преобразованию проблемного кода в код с меньшим количеством
						проблем. Третья часть книги — концентрированное выражение ее сути.
						Она состоит из одной главы с перечнем эвристических правил и
						«запахов кода», собранных во время анализа. Эта часть представляет
						собой базу знаний, описывающую наш путь мышления в процессе чтения,
						написания и чистки кода.
					</p>
					<div className="d-flex justify-content-end gap-1">
						<Link to="/" className="btn btn-primary">Back</Link>
						<a href="/" className="btn btn-primary">Read a sample</a>
					</div>
				</div>
			</div>
		</div>
	);
}