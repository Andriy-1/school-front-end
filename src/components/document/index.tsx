import React, { useCallback } from 'react';
import { baseUrl } from '../../api';

import { HiOutlineArrowSmDown } from 'react-icons/hi';

import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/auth/select';
import { fetchDeleteDoc, fetchDoc, fetchUpdateDoc } from '../../redux/document/thunk';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { selectDocumentCategories } from '../../redux/document/select';

type ct = {
	id: number;
	active?: number;
	handleSwitch: Function;
	index?: number;
	title: string;
	file: string[];
	categories_id: number;
};
const DocumentItem: React.FC<ct> = ({ id, active, handleSwitch, index, title, file, categories_id }) => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectAuth);
	const categories = useAppSelector(selectDocumentCategories);
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
			dispatch(fetchDoc(''));
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

	const [categoriesId, setCategoriesId] = React.useState<number>(categories_id ? categories_id : 0);

	const handleChange = (event: SelectChangeEvent) => {
		dispatch(fetchUpdateDoc({ id, categories_id: +event.target.value }));
		setCategoriesId(+event.target.value);
	};


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
					<>
						<span className="document__select-btn">
							<FormControl className='input-text' fullWidth>
								<InputLabel className='input-text' id="demo-simple-select-label">Категорія</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									className='input-text'
									id="demo-simple-select"
									value={categoriesId?.toString()}
									label="Категорія"
									onChange={handleChange}
								>

									{categories && categories.map((category: any) =>
										<MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
									)}
								</Select>
							</FormControl>
						</span>
						<span onClick={handleClickDel} className="document__btn">
							Видалити документ
						</span>

					</>
				)}
			</div>
			{activeItem && isClicked && file && file.map((filePath, index) => (<div key={index}
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
