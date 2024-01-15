
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/auth/select';
import { selectDoc } from '../../redux/document/select';

import {
	fetchDeleteDocTimeTable,
	fetchDocTimeTable,
} from '../../redux/document/thunk';
import { baseUrl } from '../../api';
import Younger from './younger';
import Older from './older';

const NavigateTimetable: React.FC = () => {
	const [isActive, setIsActive] = React.useState(false);
	const isAuth = useAppSelector(selectAuth);

	const dispatch = useAppDispatch();
	const { items } = useAppSelector(selectDoc);

	const isHandleClick = () => {
		setIsActive(!isActive);
	};
	

	const handleClickDel = (id: number) => {
		dispatch(fetchDeleteDocTimeTable(id));
		setTimeout(() => {
			dispatch(fetchDocTimeTable());
		}, 100);
	};

	return (
		<section className="timetable">
			<div className="timetable__block-nav">
				
				<nav>
					<ul className="timetable__items">
						<li className="timetable__item">
							<Link
								onClick={isHandleClick}
								to={'#'}
								className={
									isActive ? 'timetable__button btn' : 'timetable__button btn disable-link'
								}>
								Молодші класи
							</Link>
						</li>
						<li className="timetable__item">
							<Link
								onClick={isHandleClick}
								to={'#'}
								className={
									!isActive ? 'timetable__button btn' : 'timetable__button btn disable-link'
								}>
								Старші класи
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="timetable__block-ifr">
				{isActive ? (
					<Older items={items} isActive={isActive} handleClickDel={handleClickDel} isAuth={isAuth} baseUrl={baseUrl}/>
				) : (
					<Younger items={items} isActive={isActive} handleClickDel={handleClickDel} isAuth={isAuth} baseUrl={baseUrl} />

				)}
			</div>
		</section>
	);
};

export default NavigateTimetable;
