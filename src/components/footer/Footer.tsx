import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__block-row">
				<div className="footer__column column-footer">
					<div className="column-footer__logo logo">
						<Link to={'/'} className="column-footer__box-logo logo__box">
							<h3 className="column-footer__text-logo logo__text">ХХX гімназія</h3>
						</Link>
					</div>
				</div>
				<div className="footer__column column-footer">
					<div className="column-footer__block-title">
						<h4 className="column-footer__title ">
							<span>Швидка</span> Навігація
						</h4>
					</div>
					<nav className="column-footer__block-list">
						<ul className="column-footer__list grid-list">
							<li className="column-footer__item">
								<Link to={'/about'}>Про нас</Link>
							</li>

							<li className="column-footer__item">
								<Link to={'/news'}>Новини школи</Link>
							</li>

							<li className="column-footer__item">
								<Link to={'/about'} >Наші вчителі</Link>
							</li>

							<li className="column-footer__item">
								<Link to={'/education/timetable'}>Розклад</Link>
							</li>
							<li className="column-footer__item">
								<Link to={'/education/circle'}>Гуртки</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div className="footer__column column-footer">
					<div className="column-footer__block-title">
						<h4 className="column-footer__title ">
							<span>Залишайся</span> на зв'язку
						</h4>
					</div>
					<nav className="column-footer__block-list">
						<ul className="column-footer__list">
							<li className="column-footer__item">
								<a
									target={'_blank'}
									rel={'noreferrer'}
									href={
										'https://www.facebook.com/groups/295547330890396/?hoisted_section_header_type=recently_seen&multi_permalinks=1300189803759472'
									}>
									Facebook
								</a>
							</li>
							<li className="column-footer__item">
								<a
									target={'_blank'}
									rel={'noreferrer'}
									href={
										'https://www.instagram.com/kopachynska_gimnaziya/'
									}>
									Instagram
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<div className="footer__column column-footer">
					<div className="column-footer__block-title">
						<h4 className="column-footer__title">
							<span>на</span> зв'язку
						</h4>
					</div>
					<nav className="column-footer__block-list">
						<ul className="column-footer__list list-contact">
							<li className="column-footer__item">вулиця Вільна Україна, 33</li>
							<li className="column-footer__item">
								с. ХХX Коломийський район Івано-Франківська область 78110
							</li>
							<li className="column-footer__item">
								<Link to={''}>(034-30) 67-2-09 </Link>
								<a href="tel:+38(096)932-40-34">+380-969-324-034</a>
							</li>

						</ul>
					</nav>
				</div>
			</div>
			<div className="footer__copyright">
				<span>©Всі права захищено 2023-2024. Solved with 💜 by <Link className='black-color' to={'https://www.linkedin.com/in/andriy-hava-12a937208/'}>AeroHav</Link></span>
			</div>
		</footer>
	);
};
export default Footer;