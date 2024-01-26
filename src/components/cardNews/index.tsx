import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import { getThreeItems } from '../../redux/news/select';

import { baseUrl } from '../../api';
import classNames from 'classnames';
import { LuEye } from "react-icons/lu";

const MiniCardNews: React.FC = () => {

	const items = useAppSelector(getThreeItems);
	const truncateText = (text: string, maxWords: number) => {
		const words = text.split('');
		if (words.length > maxWords) {
			const truncatedText = words.slice(0, maxWords).join('');
			return `${truncatedText}...`;
		}
		return text;
	};

	return (
		<section className="card-news">
			<div className="card-news__row news-card">
				{items &&
					items.map((item) => {
						const title = item.title.split(' ', 1).join();
						const titleText = item.title.replace(/^[^\s]+/, '');

						const dateParts = String(item.created_at).split('-');

						const year = parseInt(dateParts[0]);
						const month = parseInt(dateParts[1]) - 1;
						const day = parseInt(dateParts[2]);
						const dateObject = new Date(year, month, day);
						const options: any = { month: 'long', locale: 'uk-UA' };
						const monthName = dateObject.toLocaleString('uk-UA', options);
						const mouthNameBig = monthName.charAt(0).toUpperCase() + monthName.slice(1);
						return (
							<Link to={'/news'} key={item.id}>
								<div className="news-card__block">
									<div className="news-card__background">
										<img src={baseUrl + item.imageUrl} alt="card-news" className="news-card__img" />
									</div>

									<div className="news-card__content">
										<div className="news-card__data">
											<span>{[mouthNameBig, '-', day, '-', year]}</span>
										</div>
										<div>
											<div className="news-card__block-title">
												<h6 className="news-card__title title">
													<span>{title}</span> {truncateText(titleText, 35)

													}
												</h6>
											</div>
											<div className="news-card__blcok-icon">
												<div className="news-card__icon">
													<LuEye className='info-card-news__svg svg-views-news-dims' />
													<span>{item.viewscount}</span>
												</div>
												<div className="news-card__icon">
													<span>{item.likecount}</span>
													<button
														className={classNames('like', { 'unliked': true }, )}>
														<span className="like-icon like-icon-state" aria-label="state">
														</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Link>
						);
					})}
			</div>
			<Link to={'/news'} className="card-news__button btn">
				Читати більше новин
			</Link>
		</section>
	);
};

export default MiniCardNews;
