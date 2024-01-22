import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/app/hooks';
import { getThreeItems, selectNewsIsLiked } from '../../redux/news/select';

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
													{/* <svg
														className="info-card-news__svg svg-views-news-dims"
														viewBox="0 0 32 32"
														version="1.1"
														xmlns="http://www.w3.org/2000/svg">
														<title>eye</title>
														<path
															strokeWidth="1.19"

															d="M30.564 15.506c-9.59-10.957-19.543-10.957-29.129 0-0.115 0.131-0.185 0.305-0.185 0.494s0.070 0.363 0.186 0.495l-0.001-0.001c4.793 5.479 9.693 8.256 14.563 8.256h0.001c4.869 0 9.771-2.777 14.564-8.256 0.116-0.131 0.186-0.304 0.186-0.494s-0.070-0.363-0.187-0.495l0.001 0.001zM3.004 16c8.704-9.626 17.291-9.622 25.992 0-8.703 9.621-17.291 9.621-25.992 0zM16 11.25c-2.623 0-4.75 2.127-4.75 4.75s2.127 4.75 4.75 4.75c2.623 0 4.75-2.127 4.75-4.75v0c-0.003-2.622-2.128-4.747-4.75-4.75h-0zM16 19.25c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25c1.795 0 3.25 1.455 3.25 3.25v0c-0.002 1.794-1.456 3.248-3.25 3.25h-0z"></path>
													</svg> */}
													<LuEye className='info-card-news__svg svg-views-news-dims' />
													<span>{item.viewscount}</span>
												</div>
												<div className="news-card__icon">
													<span>{item.likecount}</span>
													<button
														className={classNames('like', { 'liked': true }, )}>
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
