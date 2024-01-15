import React, { FC } from 'react'
import DocwithFileComponent from '../fileForm/docFile';

type YoungProps = {
	items: any,
	isActive: boolean,
	handleClickDel: (arg0: number) => void,
	isAuth: boolean,
	baseUrl: string
}

const Younger: FC<YoungProps> = ({ items, isActive, handleClickDel, isAuth, baseUrl }) => {
	return <>
		<DocwithFileComponent isActive={isActive} />
		{items && items.map((item: any) => {
			return (
				<div key={item.id + item.title}>
					{!item.seniors && (
						<>
							{isAuth && (
								<span onClick={() => handleClickDel(item.id)} className="document__btn">
									Видалити документ
								</span>
							)}
							{item.file.map((filePath: string,index:number) => (<div key={index} >
								<iframe title='Document' className="timetable__ifr document__ifr-active ifr" src={baseUrl + filePath}></iframe>
							</div>))}
						</>
					)}
				</div>
			);
		})}
	</>
}

export default Younger;