import React from 'react';
import { Link } from 'react-router-dom';

const CoverContent: React.FC = () => {
  return (
    <section className="cover-news">
      <div className="cover-news__block ">
        <Link className="cover-news__title text-disable" to={''}>
          Всі новини
        </Link>
        <Link className="cover-news__title text-disable" to={''}>
          Оснанні новини
        </Link>
      </div>
    </section>
  );
};

export default CoverContent;
