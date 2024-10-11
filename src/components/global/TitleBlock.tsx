import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPhone } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

import { StyleProps } from '../types';

const TitleBlock: React.FC<StyleProps> = ({ text, title }) => {
	const location = useLocation();
	if (location.pathname === '/about') {
		return (
			<>
				<h4 className="card__title title">
					<span>{title[0]}</span> {title[0]}
				</h4>
				<p className="card__text" dangerouslySetInnerHTML={{ __html: text || '' }} />
			</>
		);
	} else if (location.pathname === '/contacts') {
		return (
			<>
				<h4 className="card__title title">
					<span>На</span> зв'язку
				</h4>
				<nav >
					<ul className=" list-contact">
						<li className=" list-contact__item">
							<address>вулиця Вільна Україна, 33</address>
						</li>
						<li className=" list-contact__item">
							<address>с. ХХX Коломийський район Івано-Франківська область</address>
							<span>Поштовий індекс: 78110</span>
						</li>
						<li className=" list-contact__item">
							<a
								target={'_blank'}
								rel={'noreferrer'}
								href={
									'https://www.facebook.com/groups/295547330890396/?hoisted_section_header_type=recently_seen&multi_permalinks=1300189803759472'
								}>
								<FaFacebook className="list-contact__icon" />
								Facebook
							</a>
						</li>

						<li className=" list-contact__item">
							<a
								target={'_blank'}
								rel={'noreferrer'}
								href={
									'https://www.instagram.com/kopachynska_gimnaziya/'
								}>
								<FaInstagram className="list-contact__icon" />
								Instagram
							</a>
						</li>
						<li className=" list-contact__item">
							<a target={'_blank'} rel={'noreferrer'} href="mailto:school.kopatchentci@ukr.ukr">
								<HiMail className="list-contact__icon" />
								school.kopachyntsi@ukr.net
							</a>

							<a href="tel:+38(096)932-40-34">
								<FaPhone className="list-contact__icon" />+380-969-324-034
							</a>

						</li>
					</ul>
				</nav>
			</>
		);
	}
	return (
		<>
			<h4 className="card__title title">
				<span>{title[0]}</span> {title[1]}
			</h4>
			<p className="card__text" dangerouslySetInnerHTML={{ __html: text || '' }} />
			{!title.length ? <Link to={'/about'} className="card__button btn">
				Більше інформації
			</Link> : <></>}

		</>
	);
};

export default TitleBlock;
