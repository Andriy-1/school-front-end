import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { TbSchool } from 'react-icons/tb';
import { BiNews, BiHome } from 'react-icons/bi';
import { TiContacts } from 'react-icons/ti';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsPeople } from 'react-icons/bs';

import Footer from '../components/footer/Footer';
import Header from '../components/header/header';

export const MainLayouts: React.FC = () => {
	return (
		<div className="wrapper">
			<Header />
			<div className="header__row ">
				<div className="header__items items">
					<nav>
						<ul className="items__menu">
							<li className="items__item">
								<Link to={'/'}><span>Головна</span> <BiHome className="global-icon" /></Link>

							</li>
							<li className="items__item">
								<Link to="/about"><span>Про нас</span> <BsPeople className="global-icon" /></Link>

							</li>
							<li className="items__item">
								<Link to={'/news'}>
									<span>Новини</span>
									<BiNews className="global-icon" />
								</Link>
							</li>
							<li className="items__item">
								<Link to="#">
									<span>Освіта</span>
									<TbSchool className="global-icon" />
								</Link>
								<ul className="sub-menu">
									<li className="sub-menu__item">
										<Link to="/education/timetable">Розкалад уроків</Link>
									</li>
									<li className="sub-menu__item">
										<Link to="/education/circle">Гуртки</Link>
									</li>
									{/* <li className="sub-menu__item"> */}
									{/* <Link to="/"> */}
									{/* Дистанційне навчання */}
									{/* <BsArrowDownRight className="arrow-global" /> */}
									{/* </Link> */}
									{/* </li> */}
								</ul>
							</li>
							<li className="items__item">
								<Link to="/document">
									<span>Документи</span>

									<HiOutlineDocumentText className="global-icon" />
								</Link>
								{/* <ul className="sub-menu">
                  <li className="sub-menu__item">
                    <Link to="/">Історія</Link>
                  </li>
                  <li className="sub-menu__item">
                    <Link to="/">Здобутки</Link>
                  </li>
                  <li className="sub-menu__item">
                    <Link to="/">
                      Інші
                      <BsArrowDownRight className="arrow-global" />
                    </Link>
                  </li>
                </ul> */}
							</li>

							<li className="items__item">
								<Link to="/contacts">
									<span>Контакти</span>
									<TiContacts className="global-icon" />
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="content">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
export default MainLayouts;
