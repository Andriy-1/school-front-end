import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchUpdateNewsLikes } from '../../redux/news/thunk';
import { setLikes } from '../../redux/news/slice';
import classNames from 'classnames';
import { AppDispatch } from '../../redux/store';

interface LikeCouterProps {
	id: number;
	likeCount: number;
}

const LikeCouter: React.FC<LikeCouterProps> = ({ id, likeCount }) => {

	const [isLiked, setIsLiked] = React.useState<boolean>(false);

	const dispatch: AppDispatch = useDispatch();


	React.useEffect(() => {
		const likedPosts: number[] = JSON.parse(localStorage.getItem('likedPosts') || '[]');
		const postIsLiked: boolean = likedPosts.includes(id);
		setIsLiked(postIsLiked);
	}, [id]);

	const updateLikes = React.useCallback(
		(id: number, isLiked: boolean): void => {
			dispatch(fetchUpdateNewsLikes({ id, isLiked }))
		},
		[dispatch],
	)

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
	return (
		<div className="section-news-card__info info-card-news">
			<div onClick={() => { handleLikeClick(id) }} className="info-card-news__likes">
				<span>{likeCount ? likeCount : ''}</span>
				<button className={classNames('like', { 'liked': isLiked }, { 'unliked': !isLiked })}>
					<span className="like-icon like-icon-state" aria-label="state">
					</span>
				</button>
			</div>
		</div>
	)
}

export default LikeCouter;