import React from 'react';
import { Link } from 'react-router-dom';

const ButtonBlock = ({ handleClickBtn }: any) => {
  return (
    <div className="f-center">
      <Link onClick={() => handleClickBtn()} to={'/news'} className="info-card-news__button btn">
        Читати більше новин
      </Link>
    </div>
  );
};

export default ButtonBlock;
