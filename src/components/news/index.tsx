import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { LuEye } from "react-icons/lu";
import { FacebookShareButton, FacebookIcon, ViberShareButton, ViberIcon, TelegramIcon, TelegramShareButton } from 'react-share';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/auth/select';
import { setLikes } from '../../redux/news/slice';
import { fetchDeleteNews, fetchNews, fetchUpdateNewsLikes, fetchUpdateNewsViews } from '../../redux/news/thunk';
import { AllData } from '../types';
import { baseUrl } from '../../api';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { BsArrowRightCircleFill } from 'react-icons/bs';

const CardNews: React.FC<AllData> = ({ id, text, title, imageUrl, likeCount, viewsCount, isReset }) => {
	const dispatch = useAppDispatch();
	const [click, setClick] = React.useState(false);
	const isAuth = useAppSelector(selectAuth);
	const [deleteNews, setDeleteNews] = React.useState(false);

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

	const truncateText = (text: string, maxWords: number) => {
		const words = text.split('');
		if (words.length > maxWords) {
			const truncatedText = words.slice(0, maxWords).join('');
			return `${truncatedText}...`;
		}
		return text;
	};
	//========================================================================================================================================================
	// Стан лайків
	const [isLiked, setIsLiked] = React.useState<boolean>(false);
	const [isViews, setIsViews] = React.useState<boolean>(false);

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
	// Стан переглядів
	React.useEffect(() => {
		const viewsPosts: number[] = JSON.parse(localStorage.getItem('viewsPosts') || '[]');
		const postIsViews: boolean = viewsPosts.includes(id);
		setIsViews(postIsViews);
	}, [id]);

	const updateViews = React.useCallback(
		(id: number, isViews: boolean): void => {
			dispatch(fetchUpdateNewsViews({ id, isViews }))
		},
		[dispatch],
	)
	const handleViewsFocus = (event: any, postId: any) => {
		event.stopPropagation();
		const viewsPosts: number[] = JSON.parse(localStorage.getItem('viewsPosts') || '[]');
		const postIsViews: boolean = viewsPosts.includes(postId);
		if (viewsPosts.includes(postId)) {
			const updatedViewsPosts: number[] = viewsPosts.filter((id) => id !== postId);
			localStorage.setItem('viewsPosts', JSON.stringify(updatedViewsPosts));
		} else {
			const updatedViewsPosts: number[] = [...viewsPosts, postId];
			localStorage.setItem('viewsPosts', JSON.stringify(updatedViewsPosts));
		}
		setIsViews(!postIsViews);
		updateViews(id, isViews);
	};

	//bnt likes

	return (
		<section className="section-news-card">
			<Helmet>
				<meta property="og:title" content={title} />
				<meta property="og:description" content={text} />
				{/* <meta property="og:image" content={baseUrl + imageUrl} /> */}
				{/* {imageUrl && imageUrl.map((img: string) => <meta key={img} property="og:image" content={baseUrl + img} />)} */}
				<meta property="og:url" content="https://kopachyntsi.if.ua/news"></meta>
			</Helmet>
			<div
				id="newsCard"
				onMouseOver={(event) => (!isReset ? !isViews ? handleViewsFocus(event, id) : '' : '')}
				className="section-news-card__row">
				{isAuth && (
					<>
						<Link onClick={() => handleClick(id)} to={'#'} className={'btn-del  btn'}>
							Видалити карточку
						</Link>
					</>
				)}
				{imageUrl && imageUrl.map((img: string) => <div key={img} className="section-news-card__photo">
					<img src={baseUrl + img} alt="news" className="section-news-card__img" />

				</div>)}

				<div className="section-news-card__block">
					<div onClick={() => setClick(!click)} className="section-news-card__share">
						<BiDotsVerticalRounded />
						{click ? onClickShare() : ''}
					</div>

					<div className="section-news-card__content">
						<h4 className="section-news-card__title title">{title}</h4>

						<p className="section-news-card__subtitle">{truncateText(text, 100)}</p>
						<Link to={`${id}`} className='section-news-card__more_btn'> <span> Читати більше <BsArrowRightCircleFill /></span></Link>


						<div className="section-news-card__info info-card-news">
							<div className="info-card-news__block">
								<div className="news-card__data info-card-news__data">
								</div>
								<div className="info-card-news__views">
									<LuEye
										stroke='black'
										className='info-card-news__svg svg-views-news-dims' />
									<span>{viewsCount}</span>
								</div>
							</div>
							<div onClick={() => { handleLikeClick(id) }} className="info-card-news__likes">
								<span>{likeCount ? likeCount : ''}</span>
								<button className={classNames('like', { 'liked': isLiked }, { 'unliked': !isLiked })}>
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
