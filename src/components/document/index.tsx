import React, { useCallback } from 'react';
import { baseUrl } from '../../api';

import { HiOutlineArrowSmDown } from 'react-icons/hi';

import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/auth/select';
import { fetchDeleteDoc, fetchDoc } from '../../redux/document/thunk';


type ct = {
	id: number;
	active?: number;
	handleSwitch: Function;
	index?: number;
	title: string;
	file: string[];
};
const DocumentItem: React.FC<ct> = ({ id, active, handleSwitch, index, title, file }) => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectAuth);
	const [isClicked, setIsClicked] = React.useState(false);
	const [activeItem, setActiveItem] = React.useState(false);

	const handleClick = useCallback((active: any) => {
		if (active === index) {
			setIsClicked(!isClicked);
		} else {
			setIsClicked(false);
		}
	}, [isClicked, index]);


	const handleClickDel = () => {
		dispatch(fetchDeleteDoc(id));
		setTimeout(() => {
			dispatch(fetchDoc());
		}, 100);
	};

	const clickActive = () => {
		if (active === index) {
			setActiveItem(!activeItem);
		} else {
			handleSwitch(index);
			setActiveItem(true);
		}
	};

	React.useEffect(() => {
		handleClick(active);
	}, [active]);

	return (
		<>
			<div className="document__block">
				<div onClick={clickActive} className="document__box-icon">
					<HiOutlineArrowSmDown color='#4a4a4a'
						className={
							activeItem && isClicked ? 'document__icon document__active ' : 'document__icon  '
						}
					/>
				</div>
				<div onClick={clickActive} className="document__title title text ">
					{title}
				</div>
				{isAuth && (
					<span onClick={handleClickDel} className="document__btn">
						Видалити документ
					</span>
				)}
			</div>
			{activeItem && isClicked && file && file.map((filePath,index) => (<div key={index}
				className={`${activeItem && isClicked
					? 'document__ifr-active document__ifr-block'
					: 'document__ifr-block'
					}`}>
				<iframe title='Document' className="document__ifr ifr" src={baseUrl + filePath}></iframe>

			</div>))}


		</>
	);
};

export default DocumentItem;
