import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
	  <div className="link-error">
		  <Helmet>
				<title>Сторінки не знайдено</title>
			</Helmet>
      <h4 className="link-error__title title">
        <span>Такої</span> сторінки не знайдено <span>404</span>
      </h4>
      <Link to={'/'} className="btn">
        Повернутися назад
      </Link>
    </div>
  );
};

export default NotFound;
