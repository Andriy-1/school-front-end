import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth, selectAuthDataUser } from '../../redux/auth/select';

import { logout } from '../../redux/auth/slice';

 const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectAuth);
  const fullName = useAppSelector(selectAuthDataUser);

  const logoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };
  return (
    <header className="header">
      <div className="header__controll controll ">
        <div className="header__logo logo">
          <Link to="/" className="logo__box">
            <h3 className="logo__text">Копачинська гімназія</h3>
          </Link>
        </div>
        <div className="controll__box ">
          <a className="controll__phone" href="tel:+38(096)932-40-34">
            +380-969-324-034
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