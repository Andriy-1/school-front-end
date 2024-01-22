import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { LuEye } from "react-icons/lu";
import { FacebookShareButton, FacebookIcon, ViberShareButton, ViberIcon, TelegramIcon, TelegramShareButton } from 'react-share';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/auth/select';
import { selectNews } from '../../redux/news/select';
import { setLikes, setViews, setViewsCount } from '../../redux/news/slice';
import { fetchDeleteNews, fetchNews, fetchUpdateNewsLikes } from '../../redux/news/thunk';
import { AllData } from '../types';
import { baseUrl } from '../../api';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

const CardNews: React.FC<AllData> = ({ id, text, title, imageUrl, likecount, viewscount, created_at }) => {
	const dispatch = useAppDispatch();
	const [click, setClick] = React.useState(false);
	const isAuth = useAppSelector(selectAuth);
	const [cursorRemoved, setCursorRemoved] = React.useState(false);
	const [deleteNews, setDeleteNews] = React.useState(false);
	const { views } = useAppSelector(selectNews);

	const dateParts = String(created_at).split('-');

	const year = parseInt(dateParts[0]);
	const month = parseInt(dateParts[1]) - 1;
	const day = parseInt(dateParts[2]);
	const dateObject = new Date(year, month, day);
	const options: any = { month: 'long', locale: 'uk-UA' };
	const monthName = dateObject.toLocaleString('uk-UA', options);
	const mouthNameBig = monthName.charAt(0).toUpperCase() + monthName.slice(1);

	React.useEffect(() => {
		if (cursorRemoved) {
			if (id &&
				localStorage.length &&
				JSON.parse((localStorage as any).getItem('viewsNewsCount'))?.includes(id)
			) {

				return;
			} else {
				if (!views.length || !views.includes(id)) {
					dispatch(setViews({ id }));
				}
			}
		}
	}, [id, cursorRemoved, dispatch, views]);
	React.useEffect(() => {
		return () => {

			if (id && localStorage.length && JSON.parse((localStorage as any).getItem('viewsNewsCount'))?.includes(id)) {
				dispatch(setViewsCount());
			}
		};
	}, [dispatch, id]);



	const onClickShare: any = () => {
		return (
			<div className="share">
				<RiShareForwardLine />
				<FacebookShareButton
					className="share__btn"
					title={title}
					quote={`${text}`}
					url={'kopachyntsi.if.ua'}>
					<FacebookIcon className="share__icon" size={25} round={true} />
				</FacebookShareButton>
				<ViberShareButton className="share__btn" url={'kopachyntsi.if.ua'}
					title={`Заголовок новини : ${title} `}
				>
					<ViberIcon className="share__icon" size={25} round={true} />
				</ViberShareButton>
				<TelegramShareButton className="share__btn" url={'kopachyntsi.if.ua'} title={`Заголовок новини : ${title} `} >
					<TelegramIcon className="share__icon" size={25} round={true} />
				</TelegramShareButton>
			</div>
		);
	};

	const handleClick: any = (id: number): void => {
		dispatch(fetchDeleteNews(id));
		setDeleteNews(!deleteNews);
		setTimeout(() => {
			dispatch(fetchNews());
		}, 100);
	};
	//========================================================================================================================================================
	// Стан лайків
	const [isLiked, setIsLiked] = React.useState<boolean>(false);
	const updateLikes = React.useCallback(
		(id: number, isLiked: boolean): void => {
			dispatch(fetchUpdateNewsLikes({ id, isLiked }))
		},
		[dispatch],
	)
	React.useEffect(() => {
		const likedPosts: number[] = JSON.parse(localStorage.getItem('likedPosts') || '[]');
		const postIsLiked: boolean = likedPosts.includes(id);
		setIsLiked(postIsLiked);
	}, [id]);

	const handleLikeClick = (postId: any) => {
		const likedPosts: number[] = JSON.parse(localStorage.getItem('likedPosts') || '[]');
		const postIsLiked: boolean = likedPosts.includes(postId);
		if (likedPosts.includes(postId)) {
			const updatedLikedPosts: number[] = likedPosts.filter((id) => id !== postId);
			localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
		} else {
			const updatedLikedPosts: number[] = [...likedPosts, postId];
			localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
		}
		setIsLiked(!postIsLiked);
		dispatch(setLikes({ id, isLiked }))
		updateLikes(id, isLiked);
	};

	//bnt likes

	return (
		<section className="section-news-card">
			<Helmet>
				<meta property="og:title" content={title} />
				<meta property="og:description" content={text} />
				<meta property="og:image" content={baseUrl + imageUrl} />
				<meta property="og:url" content="https://kopachyntsi.if.ua/news"></meta>
			</Helmet>
			<div
				id="newsCard"
				onMouseOver={() => (!cursorRemoved ? setCursorRemoved(true) : '')}
				className="section-news-card__row">
				{isAuth && (
					<>
						<Link onClick={() => handleClick(id)} to={'#'} className={'btn-del  btn'}>
							Видалити карточку
						</Link>
					</>
				)}
				<div className="section-news-card__photo">
					<img src={baseUrl + imageUrl} alt="news" className="section-news-card__img" />

				</div>

				<div className="section-news-card__block">
					<div onClick={() => setClick(!click)} className="section-news-card__share">
						<BiDotsVerticalRounded />
						{click ? onClickShare() : ''}
					</div>

					<div className="section-news-card__content">
						<h4 className="section-news-card__title title">{title}</h4>
						<p className="section-news-card__subtitle">{text}</p>

						<div className="section-news-card__info info-card-news">
							<div className="info-card-news__block">
								<div className="news-card__data info-card-news__data">
									<span>{[mouthNameBig, '-', day, '-', year]}</span>
									{/* <span> {[' ', dataHourse]}</span> */}
								</div>
								<div className="info-card-news__views">

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
									<LuEye
										stroke='black'
										className='info-card-news__svg svg-views-news-dims' />
									<span>{viewscount}</span>
								</div>
							</div>
							<div onClick={() => { handleLikeClick(id) }} className="info-card-news__likes">
								<span>{likecount ? likecount : ''}</span>

								{/* <svg
									className={classNames("info-card-news__svg svg-like-news-dims", { 'svg-like-active': isLiked })}
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
								</svg> */}
								<button className={classNames('like',{'liked':isLiked},{'unliked':!isLiked}) }>
									<span className="like-icon like-icon-state" aria-label="state">
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CardNews;
