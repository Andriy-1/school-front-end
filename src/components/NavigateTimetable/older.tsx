import React, { FC } from 'react'
import DocwithFileComponent from '../fileForm/docFile';

type OlderProps = {
	items: any,
	isActive: boolean,
	handleClickDel: (arg0: number) => void,
	isAuth: boolean,
	baseUrl: string
}

const Older: FC<OlderProps> = ({ items, isActive, handleClickDel, isAuth, baseUrl }) => {
	
	return <>
		<DocwithFileComponent isActive={isActive} />
		{items && items.map((item: any) => {
			return (
				<div key={item.id}>
					{item.seniors && (
						<>
							{isAuth && (
								<span onClick={() => handleClickDel(item.id)} className="document__btn">
									Видалити документ
								</span>
							)}

							{item.file.map((filePath: string,index:number ) => (<div key={index} >
								<iframe title="Document" className="timetable__ifr document__ifr-active ifr" src={baseUrl + filePath}></iframe>
							</div>))}

						</>
					)}
				</div>
			);
		})}
	</>
}

export default Older;