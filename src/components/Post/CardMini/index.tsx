import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { FacebookShareButton, FacebookIcon, ViberShareButton, ViberIcon, TelegramIcon, TelegramShareButton } from 'react-share';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/auth/select';
import { fetchDeleteNews, fetchNews } from '../../../redux/news/thunk';
import { AllData } from '../../types';
import { baseUrl } from '../../../api';
import { Helmet } from 'react-helmet';

import { BsArrowRightCircleFill } from 'react-icons/bs';
import ViewsCouter from '../../viewsCounter';
import LikeCouter from '../../likeCounter';
import useViewsCounter from './hook/useViewsCounter';

const CardMini: React.FC<AllData> = ({ id, text, title, imageUrl, likeCount, viewsCount, isReset, }) => {
	const dispatch = useAppDispatch();
	const [click, setClick] = React.useState(false);
	const isAuth = useAppSelector(selectAuth);
	const [deleteNews, setDeleteNews] = React.useState(false);
	const { isViews, handleViewsFocus } = useViewsCounter(id);




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
						<h4 className="section-news-card__title title">{truncateText(title, 50)}</h4>

						<p className="section-news-card__subtitle">{truncateText(text, 100)}</p>
						<Link to={`${id}`} className='section-news-card__more_btn'> <span> Читати більше <BsArrowRightCircleFill /></span></Link>
						<div className="section-news-card__info info-card-news">
							<ViewsCouter viewsCount={viewsCount ? viewsCount : 0} />
							<LikeCouter likeCount={likeCount ? likeCount : 0} id={id} />
						</div>

					</div>
				</div>
			</div>
		</section>
	);
};

export default CardMini;
