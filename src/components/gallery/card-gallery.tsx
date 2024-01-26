import React from 'react'
import { useAppDispatch } from '../../redux/app/hooks';
import { cardGallery } from './types';
import { fetchDelGallery, fetchGallery } from '../../redux/gallery/thunk';
import SkeletonGallery from './skeleton';
import { baseUrl } from '../../api';
import Pagination from '../pagination';
import classNames from 'classnames';
import { MdOutlineClose } from "react-icons/md";


const CardGaller: React.FC<cardGallery> = ({ status, paginationCount, items, isAuth }) => {
	const dispatch = useAppDispatch();
	const [isPopupOpen, setPopupOpen] = React.useState(false);
	const [currentItem, setCurrentItem] = React.useState<string>("");
	const [itemOffset, setItemOffset] = React.useState(0);
	const itemsPerPage = 9;
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = status === 'success' && Array.isArray(items) ? items.slice(itemOffset, endOffset) : [];


	const openPopup = (photo: string) => {
		setPopupOpen(true);
		setCurrentItem(photo);
	};
  
	const closePopup = () => {
	  setPopupOpen(false);
	};
  
	const handleOverlayClick = (event: any) => {
	  if (event.target.className === 'popup__content') {
		closePopup();
	  }
	};

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
	const skeleton = () => {
		return <div className="skeleton__container">
			<ul id="gallery" className="gallery__container-photo">
				<li className="gallery__block-photo">
					{[...new Array(9)].map((item, index) => (
						<SkeletonGallery key={index} />
					))}
				</li>
			</ul>
		</div>
	}

	return status === 'success'
		? items.length
			? <>
				<ul id="gallery" className="gallery__container-photo">
					{currentItems && currentItems.map((item: any, key: number) => (
						<li key={item.id} onClick={() => openPopup(item.file)} className="gallery__block-photo">
							{isAuth && (
								<span onClick={() => handleClickDel(item.id)} className="btn-del btn">
									Видалити фото
								</span>
							)}
							<img loading="lazy" className="gallery__photo" src={baseUrl + item.file} alt="gallery" />
						</li>

					))}
				</ul>
				{items.length > itemsPerPage &&
					<Pagination handlePageClick={handlePageClick} pageCount={paginationCount} />}
				<div onClick={handleOverlayClick} className={
					classNames("popup", { "_active": isPopupOpen })}>
					<div  className="popup__content">
						<div className="popup__body">
							<MdOutlineClose color='white' onClick={closePopup} className="popup__close" />
							<img loading="lazy" className='popup__img' src={baseUrl + currentItem} alt="gallery" />
						</div>
					</div>

				</div>
			</>
			: <></>
		: skeleton()
}

export default CardGaller;