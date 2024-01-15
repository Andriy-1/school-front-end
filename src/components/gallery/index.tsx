import React from 'react';
import Pagination from '../pagination';
import SkeletonGallery from './skeleton';

import { baseUrl } from '../../api';

import { selectGallery } from '../../redux/gallery/select';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { fetchDelGallery, fetchGallery } from '../../redux/gallery/thunk';
import { selectAuth } from '../../redux/auth/select';

import GallerywithFileComponent from '../AuthStatus/galleryFile';

const Gallery: React.FC = () => {

	const dispatch = useAppDispatch();
	
	const { items, status, paginationCount } = useAppSelector(selectGallery);
	const isAuth = useAppSelector(selectAuth);

	const [itemOffset, setItemOffset] = React.useState(0);
	const itemsPerPage = 9;
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = status === 'success' && Array.isArray(items) ? items.slice(itemOffset, endOffset) : [];

	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setItemOffset(newOffset);
	};

	const handleClickDel = (id: number) => {
		dispatch(fetchDelGallery(id))
		setTimeout(() => {
			dispatch(fetchGallery());
		}, 100);
	};

	const authSetting = () => {
		return isAuth && (<>
			<div className="container gallery__container-form">
				<div className="f-center">Додавання фото до галереї</div>
				<GallerywithFileComponent />
			</div>
		</>
		)
	}

	const skeleton = () => {
		return <div className="skeleton__container">
			<div id="gallery" className="gallery__container-photo">
				<div className="gallery__block-photo">
					{[...new Array(9)].map((item, index) => (
						<SkeletonGallery key={index} />
					))}
				</div>
			</div>
		</div>
	}

	return items?.length ? <section className="gallery">
		<div className="gallery__block-title">
			<h2 className="gallery__title title">
				<span>ЖИТТЯ</span> І КУЛЬТУРА
			</h2>
		</div>
		{authSetting()}
		{status === 'success'
			? items.length
				? <>
					<div id="gallery" className="gallery__container-photo">
						{currentItems && currentItems.map((item: any, key: number) => (
							<div key={key} className="gallery__block-photo">
								{isAuth && (
									<span onClick={() => handleClickDel(item.id)} className="btn-del btn">
										Видалити фото
									</span>
								)}
								<img className="gallery__photo" src={baseUrl + item.file} alt="1" />
							</div>
						))}
					</div>
					{items.length > itemsPerPage &&
						<Pagination handlePageClick={handlePageClick} pageCount={paginationCount} />}
				</>
				: <></>
			: skeleton()
		}
	</section>
		: isAuth ? (<section className="gallery">
			<div className="gallery__block-title">
				<h2 className="gallery__title title">
					<span>ЖИТТЯ</span> І КУЛЬТУРА
				</h2>
			</div>
			{authSetting()}
		</ section>) : <></>
};

export default Gallery;
