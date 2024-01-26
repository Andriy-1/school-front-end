import React from 'react';
import { Link } from 'react-router-dom';

const ButtonBlock = ({ handleClickBtn,onClickReset }: any) => {
	const onClick = () => {
		handleClickBtn()
		onClickReset()
	}
	
  return (
    <div className="f-center">
      <Link onClick={() => onClick()} to={'/news'} className="info-card-news__button btn">
        Читати більше новин
      </Link>
    </div>
  );
};

export default ButtonBlock;
