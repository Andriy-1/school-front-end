import React from 'react';
import classNames from 'classnames';

import TitleBlock from '../global/TitleBlock';

import '../../scss/style.scss';
import { StyleProps } from '../types';

const Card: React.FC<StyleProps> = ({ isAddBolean, photoWebp, photoJpg,text,title }) => {
	const cardReverse = classNames({
		'card-section__block-card': true,
		card: true,
		'card-reverse': isAddBolean,
	});
	return (
		<section className="card-section">
			<div className={cardReverse}>
				<div className="card__photo">
					<picture>
						<source srcSet={photoWebp} type="image/webp" className="card__img" />
						<img src={photoJpg}
							alt="Color day"
							className="card__img"
						/>
					</picture>
				</div>
				<div className="card__content">
					<TitleBlock text={text} title={title} />
				</div>
			</div>
		</section>
	);
};

export default Card;
