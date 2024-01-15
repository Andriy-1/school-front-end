import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/app/hooks';
import { getThreeItems } from '../../redux/news/select';

import { baseUrl } from '../../api';

const MiniCardNews: React.FC = () => {

	const items = useAppSelector(getThreeItems);
	const truncateText = (text:string, maxWords:number) => {
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
													
													<span>{item.viewsCount}</span>
												</div>
												<div className="news-card__icon">
													<span>{item.likeCount}</span>
													<svg
														className="news-card__svg svg-like-news-dims"
														viewBox="0 -3.71 75.17 75.17"
														xmlns="http://www.w3.org/2000/svg">
														<path
															className="svg-like-news-path"
															id="Path_1"
															data-name="Path 1"
															d="M117.606,280.375s22.263-15.459,31.959-30.318c9.6-14.708.354-31.054-10.533-33.8-14.457-3.65-21.426,10.478-21.426,10.478s-6.968-14.128-21.425-10.478c-10.888,2.748-20.132,19.094-10.534,33.8C95.343,264.916,117.606,280.375,117.606,280.375Z"
															transform="translate(-80.021 -214.131)"
															fill="none"
															stroke="#0c2c67"
															strokeLinejoin="round"
															strokeWidth="3"
														/>
													</svg>
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
