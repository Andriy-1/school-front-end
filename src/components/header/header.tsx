import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { TbSchool } from 'react-icons/tb';
import { BiNews, BiHome } from 'react-icons/bi';
import { TiContacts } from 'react-icons/ti';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsPeople } from 'react-icons/bs';


import { logout } from '../../redux/auth/slice';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth, selectAuthDataUser } from '../../redux/auth/select';

const Header = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectAuth);
	const fullName = useAppSelector(selectAuthDataUser);
	const {pathname} = useLocation();

	const logoutClick = () => {
		dispatch(logout());
		localStorage.removeItem('token');
	};
	console.log(pathname);

	return (
		<header className="header">
			<div className="header__controll controll ">
				<div className="header__logo logo">
					<Link to="/" className="logo__box">
						<svg className="logo__svg" viewBox="0 0 37.23404255319149 41.260343980563064">
							<g transform="translate(-2.1465282340366962, -0.13366743314275273) scale(0.6488700013198418)" className="css-vkoj2a"
								fill="#74dbef">
								<g xmlns="http://www.w3.org/2000/svg">
									<path
										d="M32.213,30.931c1.313,1.742,12.943-2.2,12.943-14.364c0-3.976-3.224-7.199-7.199-7.199c-2.351,0-4.431,1.13-5.744,2.872   c-1.314-1.742-3.394-2.872-5.743-2.872c-3.976,0-7.199,3.223-7.199,7.199C19.271,30.543,30.899,32.672,32.213,30.931z">
									</path>
									<path
										d="M31.572,10.592l1.281,0.303c0.06-0.252,1.4-6.208-3.964-10.689l-0.843,1.01C32.769,5.162,31.624,10.372,31.572,10.592z">
									</path>
									<path d="M45.356,2.743c-10.607-6.119-12.401,1.02-12.401,1.02C38.258,9.636,45.356,2.743,45.356,2.743z">
									</path>
									<path
										d="M58.116,37.004c0.124-2.325-0.004-5.209-0.103-6.849l2.678-2.678l-15.028-5.511c-0.987,3.115-2.705,5.324-4.233,6.773   c-2.81,2.666-6.062,3.86-8.038,3.86c-0.461,0-0.841-0.064-1.153-0.166c-0.478,0.194-1.061,0.293-1.734,0.293   c-2.962,0-8.186-2.084-10.876-7.833L4.997,39.526c0,0-1.77,1.096-1.686,5.058c0.085,3.958,4.298,6.319,4.298,6.319l28.734,12.891   l24.18-24.184C61.075,37.48,58.451,37.049,58.116,37.004z M9.294,48.206c0,0-3.118-0.758-2.949-4.13   c0.118-2.361,1.937-2.779,1.937-2.779l26.416,11.154l0.224,7.479L9.294,48.206z M56.981,38.099L35.945,59.137l-0.203-6.709   L57.018,31.15C57.118,33.168,57.202,36.12,56.981,38.099z">
									</path>
								</g>
							</g>
						</svg>
						<h3 className="logo__text">Копачинці</h3>
					</Link>
				</div>
				<div className="header__row ">
					<div className="header__items items">
						<nav>
							<ul className="items__menu items__white">
								<li className="items__item">
									<Link to={'/'}><span>Головна</span>
										{/* <BiHome className="global-icon" /> */}
									</Link>

								</li>
								<li className="items__item">
									<Link to="/about"><span>Про нас</span>
										{/* <BsPeople className="global-icon" /> */}
									</Link>

								</li>
								<li className="items__item">
									<Link to={'/news'}>
										<span>Новини</span>
										{/* <BiNews className="global-icon" /> */}
									</Link>
								</li>
								<li className="items__item">
									<Link to="#">
										<span>Освіта</span>
										{/* <TbSchool className="global-icon" /> */}
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

										{/* <HiOutlineDocumentText className="global-icon" /> */}
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
										{/* <TiContacts className="global-icon" /> */}
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<div className="controll__box ">
					<a className="controll__phone" href="tel:+38(096)932-40-34">
						Зв'язатись
					</a>
					<div className="controll__sign-in">
						{isAuth ? <span className='controll__sign-in-on'>{fullName}</span> : <Link to="/login">Вхід</Link>}
					</div>
					{isAuth ? (
						<Link onClick={logoutClick} to="/">
							Вихід
						</Link>
					) : (
						''
					)}
				</div>
			</div>

		</header>
	);
};
export default Header;