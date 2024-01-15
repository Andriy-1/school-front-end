import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { StyleProps } from '../types';

const Title: React.FC<StyleProps> = ({ isAddBolean, items, status }) => {
	
	const location = useLocation();

	const currentTegs = () => {
		if (isAddBolean) {
			return 'news__block-title';
		} else {
			return 'block-title__column';
		}
	};
	if (location.pathname === '/about') {
		return (
			<>
				<section id='teacher' className="block-title container">
					<div className="block-title__column">
						{isAddBolean ? (
							<>
								<h2 className="block-title__title title">
									<span>Учителі</span> Гімназії
								</h2>
								<p className="block-title__text">
								це ті, хто кожного дня вкладає своє серце та знання у навчання і виховання молодого покоління. Наш педагогічний колектив - це команда відданих фахівців, які відчувають велику відповідальність перед майбутніми лідерами суспільства. Ми пишаємося нашими вчителями, які вкладають неоціненний труд у формування майбутнього суспільства. Вони - ключові фігури, що відображають важливість та цінність освіти.
								</p>
							</>
						) : (
							<>
								<h2 className="block-title__title title">
									<span>НАША</span> Гімназія
								</h2>
								<p className="block-title__text">
								це місце, де діти не просто набувають знань, але й розвивають свої таланти та інтереси. Ми пишаємося нашим педагогічним колективом, який складається з висококваліфікованих та талановитих вчителів. Вони не лише передають знання, а й надихають учнів на досягнення великих висот.
								</p>
							</>
						)}
					</div>
				</section>
			</>
		);
	}
	if (location.pathname === '/news') {

		return (
			<>
				<section className="block-title container">
					<div className="block-title__column">
						{items?.length ? <h2 className="block-title__title title">
							<span>Основні</span> новини
						</h2> : status === 'success' ? <h2 className="block-title__title title"><span>Немає</span> новин 🔎 </h2> : <></>
						}
						<p className={classNames('block-title__text', { 'text-disable': isAddBolean })}>
							професіонали своєї справи, небайдужі, чуйні до проблем дитини, завжди готові до
							діалогу
						</p>
					</div>
				</section>
			</>
		);
	} else if (location.pathname === '/education/timetable') {
		return (
			<>
				<section className="block-title container">
					<div className="block-title__column">
						{items?.length ? <h2 className="block-title__title title white">
							<span>Розклад</span> уроків
						</h2> : status === 'success' && <h2 className="block-title__title title white"><span>Немає</span> розкладу уроків 🙁 </h2>
						}
						<p className={classNames('block-title__text', { 'text-disable': isAddBolean })}>
							професіонали своєї справи, небайдужі, чуйні до проблем дитини, завжди готові до
							діалогу
						</p>
					</div>
				</section>
			</>
		);
	} else if (location.pathname === '/education/circle') {
		return (
			<>
				<section className="block-title container">
					<div className="block-title__column">
						{items?.length ? <h2 className="block-title__title title white">
							<span>Розклад</span> гуртків
						</h2> : status === 'success' && <h2 className="block-title__title title white"><span>Немає</span> розкладу гуртків 🙁 </h2>
						}
						<p className={classNames('block-title__text white', { 'text-disable': isAddBolean })}>
							професіонали своєї справи, небайдужі, чуйні до проблем дитини, завжди готові до
							діалогу
						</p>
					</div>
				</section>
			</>
		);
	} else if (location.pathname === '/contacts') {
		return (
			<>
				<section className="block-title container">
					<div className="block-title__column">
						<h2 className="block-title__title title">
							<span>Контактні</span> дані
						</h2>

						<p className={classNames('block-title__text', { 'text-disable': isAddBolean })}>
							професіонали своєї справи, небайдужі, чуйні до проблем дитини, завжди готові до
							діалогу професіонали своєї справи, небайдужі, чуйні до проблем дитини, завжди готові
							до діалогу
						</p>
					</div>
				</section>
			</>
		);
	} else if (location.pathname === '/login') {
		return (
			<>
				<section className="block-title container">
					<div className="block-title__column">
						<h2 className="block-title__title title">
							<span>Вхід</span> на сайт
						</h2>
					</div>
				</section>
			</>
		);
	} else if (location.pathname === '/document') {
		return (
			<>
				<section className="block-title container">
					<div className="block-title__column">
						<h2 className="block-title__title title">
							<span>Немає</span> документів 🙁
						</h2>

					</div>
				</section>
			</>
		);
	}

	return (
		<>
			<section className="block-title container">
				<div className={classNames(currentTegs())}>
					{isAddBolean ? (
						<h2 className="block-title__title title">
							<span>Основні</span> новини
						</h2>
					) : (
						<h2 className="block-title__title title">
							<span >Зростаємо</span> разом 
						</h2>
					)}
					<p className={classNames('block-title__text', { 'text-disable': isAddBolean })}>
					У Копачинській гімназії наша діяльність спрямована на впровадження і підтримку цінностей, що відіграють важливу роль у формуванні наших учнів як морально зрілих, відповідальних та громадянських особистостей. Наші цінності відображаються в кожному аспекті нашої освітньої діяльності і взаємодії з учнями, батьками та громадою.
					</p>
				</div>
			</section>
		</>
	);
};

export default Title;
