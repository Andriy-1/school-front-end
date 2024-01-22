import React from 'react';

import { selectGallery } from '../../redux/gallery/select';
import { useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/auth/select';

import GallerywithFileComponent from '../AuthStatus/galleryFile';
import CardGaller from './card-gallery';

const Gallery: React.FC = () => {

	const { items, status, paginationCount } = useAppSelector(selectGallery);
	const isAuth = useAppSelector(selectAuth);

	const authSetting = () => {
		return isAuth && (<>
			<div className="container gallery__container-form">
				<div className="f-center">Додавання фото до галереї</div>
				<GallerywithFileComponent />
			</div>
		</>
		)
	}

	return items?.length ? <section className="gallery">
		<div className="gallery__block-title">
			<h2 className="gallery__title title">
				<span>ЖИТТЯ</span> І КУЛЬТУРА
			</h2>
		</div>
		{authSetting()}
		<CardGaller status={status} paginationCount={paginationCount} items={items} isAuth={isAuth} />
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
